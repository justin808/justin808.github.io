---
layout: post
title: "Migrating from Capybara-Webkit to Poltergeist-PhantomJs"
date: 2013-08-06 21:38
comments: true
categories: [testing, rails]
keywords: capybara, capybara-webkit, poltergeist, phantomjs, rspec, rails
description: Tips for efficiently migrating a test rspec test suite from capybara-webkit to poltergeist-phantomjs
---

<div id="outline-container-1" class="outline-2">
<h2 id="sec-1">Motivation</h2>
<div class="outline-text-2" id="text-1">

<p>Today I migrated a medium size test suite from <a href="https://github.com/thoughtbot/capybara-webkit">capybara-webkit</a> to <a href="https://github.com/jonleighton/poltergeist">Poltergeist</a>
with <a href="http://phantomjs.org/index.html">PhantomJS</a>. I had two main motivations for switching:
</p><ol>
<li>PhantomJS is more sensitive to avoiding false positives. For example, in the
   past, one could click on non-visible DOM elements with capybara-webkit.
   While this may not currently be true with the latest Capybara, I've had good
   luck wit
</li>
</ol>

</div>
</div>
