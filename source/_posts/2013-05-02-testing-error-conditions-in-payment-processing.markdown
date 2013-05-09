---
layout: post
title: "Testing Error Conditions in Payment Processing"
date: 2013-05-02 00:01
comments: true
categories: 
keywords: 
published: false
description: 
---

<p>
Suppose you've created the super-duper Rails storefront application that takes
online payments. You may even have some unit tests that verify the code. Then
you get the dreaded call that customers are being charged twice and their
orders are not processed. WTF?
</p>

<div id="table-of-contents">
<h2>Table of Contents</h2>
<div id="text-table-of-contents">
<ul>
<li><a href="#sec-1">1 Your Code Depends on Outside Systems (that Might Raise Errors)</a></li>
<li><a href="#sec-2">2 Verification of Error Handling Strategy</a></li>
<li><a href="#sec-3">3 Payment Processing is Like a 2-Phase Commit</a></li>
<li><a href="#sec-4">4 Brute Force Methodology</a></li>
<li><a href="#sec-5">5 RSpec Testing of Errors</a></li>
<li><a href="#sec-6">6 RSpec Capybara Tests of UI Errors</a></li>
</ul>
</div>
</div>

<div id="outline-container-1" class="outline-2">
<h2 id="sec-1">Your Code Depends on Outside Systems (that Might Raise Errors)</h2>
<div class="outline-text-2" id="text-1">

<p>It's not entirely obvious how to verify proper error handling when outside
systems fail, or even when odd errors are raised from your own code. Payment
processing deserves some special attention because it's a dependency on an
outside service (the payment processor) and will probably require updating
several tables. Once you process a payment, order fulfillment is next. You'll
probably be updating several tables, so you'll want to use a transaction to
ensure that all or nothing saves. While code review and manual testing are good
first steps, you should consider a few extra steps with error handling for
sensitive parts of your application.
</p>

</div>

</div>

<div id="outline-container-2" class="outline-2">
<h2 id="sec-2">Verification of Error Handling Strategy</h2>
<div class="outline-text-2" id="text-2">

<p>Typically, error handling code is not well tested. It's much more common to test
the "happy path" of everything going right.
</p>
<p>
Let's look at hypothetical example and some tests that can flush out some
errors.
</p>


{% codeblock lang:ruby %}
class Order
  def purchase_cart
    error_message = nil
    Order.transaction do
      # user has charge info, returns either error_message if failed or charge_details if success
      error_message, charge_details = PaymentGateway.charge user, total 
      set_charge_fields_and_save user, charge_details unless error_message # update the order to indicated purchased
      fulfill_order # do lots of complicated stuff to fulfill the order
    end
    error_message # return any error message if there is one
  end
end
{% endcodeblock %}

</div>

</div>

<div id="outline-container-3" class="outline-2">
<h2 id="sec-3">Payment Processing is Like a 2-Phase Commit</h2>
<div class="outline-text-2" id="text-3">

<p>Payment processing like a 2-phase commit, except one has to handle all the
what-ifs to be sure that it's handled correctly.
</p>
<p>
In general, you want the whole processing of an order to take place within a
transaction. The steps are something like this:
</p><ol>
<li>Connect to outside resource to make charge
</li>
<li>Update database records indicating charge successful
</li>
<li>Fulfill the order
</li>
</ol>


<p>
Rails transactions work such than any exception in the block will cause the
transaction to be rolled back. The problem with the above code is what happens
if fulfill_order throws an exception? The customer has been charged, the order
was updated to reflect payment, but then <b>ka-boom</b> and an exception is raised,
and any database updates to the order are rolled back, <b>but the payment is not refunded</b>. The customer is confused as there is a charge but nothing else.
</p>
</div>

</div>

<div id="outline-container-4" class="outline-2">
<h2 id="sec-4">Brute Force Methodology</h2>
<div class="outline-text-2" id="text-4">

<p>You can simulate error conditions by manually placing <code>raise StandardError</code>
statements in your code, and then testing, say in the UI manually. This is a
good first step to verify that your error handling is working correctly.
</p>
<p>
For the above example, the different methods referenced, such as
<code>process_order</code> can get modified with a single line at the beginning, which
would be:
</p>


{% codeblock lang:ruby %}
def process_order
  raise "Any error message"
  # Lots of other code that can be commented out
end
{% endcodeblock %}

<p>
Then go into the UI and test placing an order. Consider the following questions:
</p><ol>
<li>Was the right error message displayed to the user?
</li>
<li>Was the right information logged at the correct log level?
</li>
<li>Was an automatic email sent regarding the error?
</li>
</ol>


<p>
(Numbers 2 and 3 will be addressed in an upcoming article on error logging
setup.)
</p>
<p>
By applying this technique to each of the components of completing a purchase,
one can flush out (and handle) nearly all of the different possible errors that
could affect a purchase. Give this technique a try in some critical section of
the code. You'll be surprised how well it works.
</p>
</div>

</div>

<div id="outline-container-5" class="outline-2">
<h2 id="sec-5">RSpec Testing of Errors</h2>
<div class="outline-text-2" id="text-5">

<p>It turns out that with stubbing in <code>rspec</code>, it's easy to test error handling!
<a href="https://www.relishapp.com/rspec/rspec-mocks/v/2-13/docs/method-stubs">RSpec provides a nice mocking library</a>. The test code would look something like
this. Pay attention to the call to <b>stub</b>.
</p>


{% codeblock lang:ruby %}
describe Order do
  describe "#purchase_cart" do
    context "process_order fails" do
      let(:order) { create :order } # factory_girl creation of order and related objects
      before do
        Order.any_instance.stub(:fulfill_order) { raise ArgumentError, "test error" }
        PaymentGateway.should_receive(:charge).and_return([nil, "charge_details"])
        PaymentGateway.should_receive(:refund).and_return("refund_details")
      end
      it "should throw an error" do
        expect {
          order.purchase_cart
        }.to raise_error
        order.reload 
        order.purchased.should_not be   
        # charge refunded verified in mock
      end
    end
{% endcodeblock %}

<p>
The main problem is that if fulfill_order raises an exception, then the
customer is charged, yet due to the transaction, there's no record in the
database that any order took place.
</p>
<p>
Instead, what is needed is something like this:
{% codeblock lang:ruby %}
class Order
  def purchase_cart
    error_message = nil
    begin
      Order.transaction do
        # user has a credit card info, returns either error_message if failed or charge_details if success
        error_message, charge_details = PaymentGateway.charge user, total 
        set_charge_fields_and_save user, charge_details unless error_message # update the order to indicated purchased
      end
      fulfill_order # do lots of complicated stuff to process the order
    rescue => e
      Utility.log_exception e # Unified strategy for error handling including email notification
      refund_charge if charge_details
      throw e
    end
    error_message # return any error message if there is one
  end
end
{% endcodeblock %}

Here are the key points to the improved code:
</p><ol>
<li>There's a block to catch the exception and properly handle the case of an a
   charge being made and needing to be refunded. <code>Utility.log_exception</code> can
   ensure that all the right things happen with this sort of error.
</li>
<li>fulfill<sub>order</sub> is moved outside of the transaction block. This allows the
   transaction to complete, and then the order_fulfillment takes place. If
   there's an issue in fulfilling the order, that can be dealt with separately
   from the original charge. 
</li>
</ol>



</div>

</div>

<div id="outline-container-6" class="outline-2">
<h2 id="sec-6">RSpec Capybara Tests of UI Errors</h2>
<div class="outline-text-2" id="text-6">

<p>It's possibly more important and sometimes easier to do the verification at the
integration level in RSpec feature specs using Capybara. The secret sauce is
the use of stubbing to replace some key methods such that they throw an
exception. This sort of technique works amazingly well.
I find that the best way to develop such a test is to:
</p><ol>
<li>Make sure you've got tests on the "happy" case where the script goes as
   planned.
</li>
<li>Then introduce test cases where have bits of code like this that will raise
   an error at an opportune time.
</li>
</ol>


{% codeblock lang:ruby %}
     Order.any_instance.stub(:fulfill_order) { raise ArgumentError, "test error" }
{% endcodeblock %}
<ol>
<li>Allow the test cases to fail, and put in screen shots (in Capybara with
   phantomjs, that looks like this:
</li>
</ol>


{% codeblock lang:ruby %}
   render_page "a-descriptive-name"
{% endcodeblock %}
<p>
   And you've got this method setup in a spec helper file:
{% codeblock lang:ruby %}
   def render_page name
     path = File.join Rails.application.config.integration_test_render_dir, "#{name}.png"
     page.driver.render(path)
   end 
{% endcodeblock %}
</p><ol>
<li>Put in some assertions that the page shows the right error and the records
   in the database have the right values.
</li>
</ol>








{% codeblock lang:ruby %}
  scenario "Purchase cart, strip", :vcr do
    error_content = "Testing error handling exception message in Stripe"
    PaymentGateway.stub(:charge) { raise Stripe::InvalidRequestError.new(error_content, 'id') }
    place_order "stripe-failure"
    should have_content error_content
    should have_content "Error purchasing"
    order.reload
    order.purchased.should_not be
  end

{% endcodeblock %}



{% codeblock lang:ruby %}
  def validate_error_emailed
    email = ActionMailer::Base.deliveries.last
    email.should_not be_nil
    email.to.should_not include(order.user.email)
    email.to.should include('justin@blinkinc.com')
  end
{% endcodeblock %}
</div>
</div>
