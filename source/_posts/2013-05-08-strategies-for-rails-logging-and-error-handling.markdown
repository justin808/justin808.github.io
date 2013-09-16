---
layout: post
title: "Strategies for Rails Logging and Error Handling"
alias: /blog/2013/05/08/saner-rails-logging/index.html
date: 2013-05-08 17:41
comments: true
categories: [rails, error-handling ] 
keywords: Ruby on Rails, Exceptions, Logging
description: Clean logging and error handling is a critical aspect of a RoR app. 
published: true
---

<p>
TLDR: Clean logging and error handling is a critical aspect of a RoR app.
What's a good strategy? Why does this matter?
</p>
<p>
A Rails app can have awesome unit and functional tests, and then in production,
something goes wrong and the right error handling does not happen, making
a bad situation worse. By this, I mean, it's bad enough that something went
wrong in production. It's even worse if:
</p><ol>
<li>You don't have clear log messages that identify exactly what went wrong.
</li>
<li>You didn't get automatically notified via email that something went wrong.
   Instead, the customer told the customer service rep that there's an issue.
   Ideally, when an error happens, the responsible developers should be
   notified.
</li>
</ol>


<p>
Here's some tips on logging setup and error handling, including a utility
method to log the stack trace and send an email.
</p>
<p>
The next article,
<a href="http://www.railsonmaui.com/blog/2013/05/11/testing-error-handling/">Testing Error Handling</a>, will show you how to verify that your error handling strategy
is properly implemented, includind with rspec tests.
</p>


<!-- more -->


<div id="outline-container-1" class="outline-2">
<h2 id="sec-1">Log Setup</h2>
<div class="outline-text-2" id="text-1">


</div>

<div id="outline-container-1-1" class="outline-3">
<h3 id="sec-1-1">Notification of any Exceptions via Email with Gem exception_notification</h3>
<div class="outline-text-3" id="text-1-1">

<p>Check out the gem <a href="http://smartinez87.github.io/exception_notification/">exception_notification</a>. It works great. One things the docs
don't point out is that it works great with <a href="http://mailcatcher.me/">MailCatcher</a>. This allows you to
"test" that your exception notification emails are being sent as expected
without using a real mail account. Thus, <i>do</i> enable exception logging in
development mode, contrary to the basic setup. Here's a config example at this
post on <a href="http://www.mikeperham.com/2012/12/09/12-gems-of-christmas-4-mailcatcher-and-mail_view/">MailCatcher and mail_view</a>.
</p>
</div>

</div>

<div id="outline-container-1-2" class="outline-3">
<h3 id="sec-1-2">Log the Browser Details with Gem 'browser_details'</h3>
<div class="outline-text-3" id="text-1-2">

<p>The gem <a href="https://github.com/gshutler/browser_details">browser_details</a> will tell you what type of browser was used, which
can be very important when errors occur. I cracked up when I read this from the
gem info page: 
</p><blockquote>

<p>Have you ever had the conversation:
</p>
<p>
Your site doesn't work.
What browser are you using and do you have Javascript enabled?
</p>
<p>
What's a browser?
</p>
</blockquote>



</div>

</div>

<div id="outline-container-1-3" class="outline-3">
<h3 id="sec-1-3">Control Rails Log Verbosity with Gem lograge</h3>
<div class="outline-text-3" id="text-1-3">

<p>Sometimes too much of a good thing (log info) is a bad thing, and that's true
with Rails default logging. Check out the gem '<a href="https://github.com/roidrage/lograge">lograge</a>'. The big difference is
that a single request will take a single line. To quote the README, instead of
logs like this:
</p>


<pre class="example">Started GET "/" for 127.0.0.1 at 2012-03-10 14:28:14 +0100
Processing by HomeController#index as HTML
  Rendered text template within layouts/application (0.0ms)
  Rendered layouts/_assets.html.erb (2.0ms)
  Rendered layouts/_top.html.erb (2.6ms)
  Rendered layouts/_about.html.erb (0.3ms)
  Rendered layouts/_google_analytics.html.erb (0.4ms)
Completed 200 OK in 79ms (Views: 78.8ms | ActiveRecord: 0.0ms)
</pre>


<p>
After installing lograge, you'll have one line for the request:
</p>


<pre class="example">method=GET path=/jobs/833552.json format=json controller=jobs action=show status=200 duration=58.33 view=40.43 db=15.26
</pre>


<p>
The one issue with <code>lograge</code> is that the default configuration does not log
request parameters, which can be useful for debugging. This blog post, <a href="http://ionrails.com/2013/03/26/how-to-add-the-request-parameters-along-with-full-url-request-in-lograge-outputted-files/">How to add request parameters to lograge logs</a>, addresses that shortcoming.
</p>
</div>

</div>

<div id="outline-container-1-4" class="outline-3">
<h3 id="sec-1-4">Utility Method to Log Exceptions</h3>
<div class="outline-text-3" id="text-1-4">

<p>This sample method <code>Utility.log_exception</code> takes care of logging an exception along with sending out an
email notification.
</p>
<p>
Example of calling <code>Utility.log_exception</code>:
</p>


{% codeblock lang:ruby %}
def my_method_with_error foobar
  do_something_that_raises foobar
rescue => e # catches StandardError (don't use rescue Esception => e)
  Utility.log_exception e, info: "called do_something_that_raises wihh #{foobar}"
end
{% endcodeblock %}

<p>
Definition of <code>Utility.log_exception</code>:
</p>


{% codeblock lang:ruby %}
class Utility
  # Logs and emails exception
  # Optional args:
  # request: request Used for the ExceptionNotifier
  # info: "A descriptive messsage"
  def self.log_exception e, args
    extra_info = args[:info]

    Rails.logger.error extra_info if extra_info
    Rails.logger.error e.message
    st = e.backtrace.join("\n")
    Rails.logger.error st

    extra_info ||= "<NO DETAILS>"
    request = args[:request]
    env = request ? request.env : nil
    if env
      ExceptionNotifier::Notifier.exception_notification(env, e, :data => {:message => "Exception: #{extra_info}"}).deliver
    else
      ExceptionNotifier::Notifier.background_exception_notification(e, :data => {:message => "Exception: #{extra_info}"}).deliver
     end
  end
end
{% endcodeblock %}

</div>
</div>

</div>

<div id="outline-container-2" class="outline-2">
<h2 id="sec-2">Strategy: Error Handling and Logging</h2>
<div class="outline-text-2" id="text-2">

<ol>
<li>Avoid rescuing/catching if you can't do anything with the exception. For
   example, in a model method, you might be calling that from a controller, but
   you also might be calling that from some scheduled job. Thus, it's hard to
   say what the right action should be. A special case is calling <code>raise</code> without
   arguments: sometimes it is reasonable to catch all exceptions, logging the
   exception, and then re-raising it like it was never caught.
</li>
<li>If you catch an exception, consider if you should re-throw the exception
   because code at a different level will be able to handle the exception more
   properly.
</li>
<li>Consider how the code is being invoked, such as from a call to generate
   HTML or an ajax request, or maybe a batch job. All of these cases have very
   different needs for how the error should be handled.
</li>
<li>Be sure you understand the order of your rescue clauses matter. This article
   <a href="http://blog.rubybestpractices.com/posts/rklemme/003-The_Universe_between_begin_and_end.html">The Universe between <code>begin</code> and <code>end</code></a> provides a good explanation.
   Basically put the most specific exception types first and something like
   <code>rescue =&gt; e</code> last.
</li>
<li>Ruby does not support the concept of a "cause" with an exception. Thus, if
   you catch an exception and are going to rethrow a different exception, then
   it's important to log the stack of the original exception, or else that
   information will be lost.
</li>
<li>Test the logging of the exception in both development and production mode.
   You want to ensure that any exception prints clearly regardless of Rails
   environment.
</li>
<li>A good way to test error handling is to temporarily put in <code>raise    ArgumentError</code> (or whatever other error), and see how the exception is
   handled, both by the logger and the UI.
</li>
<li>The worst scenario is catching an exception and failing to log any messages.
   This can make troubleshooting a problem very tricky.
</li>
</ol>


</div>

</div>

<div id="outline-container-3" class="outline-2">
<h2 id="sec-3">Verification and Testing</h2>
<div class="outline-text-2" id="text-3">

<p>The next article,
<a href="http://www.railsonmaui.com/blog/2013/05/11/testing-error-handling/">Testing Error Handling</a>, will show you how to verify that your error handling strategy
is properly implemented, and how to add rspec unit and functional tests on error
handling.
</p>
</div>
</div>
