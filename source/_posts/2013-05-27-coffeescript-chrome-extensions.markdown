---
layout: post
title: "CoffeeScript Chrome Extensions"
date: 2013-05-27 17:16
comments: true
categories: coffeescript
keywords: coffeescript
description: Useful tools for Chrome with CoffeeScript 
published: true
---

<p>
Here's 3 useful tools for using <a href="http://coffeescript.org/">CoffeeScript</a> for web development, possibly with
Rails and EmberJs. All 3 tools are useful for different purposes. 
</p>

<div id="outline-container-1" class="outline-2">
<h2 id="sec-1">CoffeeScript Source Maps: Debugging CoffeeScript Directly</h2>
<div class="outline-text-2" id="text-1">

<p>With Source Maps, you don't have to mentally convert your CoffeeScript code into
JavaScript code in the debugger. Instead, you can now see your CoffeeScript
code, even with correct line numbers. This rails gem, <a href="https://github.com/markbates/coffee-rails-source-maps">coffee-rails-source-maps</a>,
makes it easy to include CoffeeScript source maps as part of your rails
application. Note, the <code>Rails.env.development?</code> is hard coded, so this only works
when you use that specific environment. You can also do it manually, by using
the <code>-m</code> flag with the <code>coffee</code> command. {% img
/images/2013-05-27-coffeescript-chrome-extensions/coffeescript-source-map.png %}
</p>
</div>

</div>

<div id="outline-container-2" class="outline-2">
<h2 id="sec-2">Try CoffeeScript Chrome Extension: Converting between CoffeeScript and JavaScript</h2>
<div class="outline-text-2" id="text-2">

<p>The <a href="https://chrome.google.com/webstore/detail/try-coffeescript-enhanced/fldhkfldchaibgaheaogapecjmnkaepe?hl=en">Try CoffeeScript Enhanced</a> Chrome extension is pretty nice for converting
between JavaScript and CoffeeScript. The main advantage over
<a href="http://js2coffee.org">http://js2coffee.org</a> is that the you don't have to open a new browser tab, and
you can enter either CoffeeScript or JavaScript.
</p>
<p>
{% img /images/2013-05-27-coffeescript-chrome-extensions/try-coffeescript.png %}
</p>
</div>

</div>

<div id="outline-container-3" class="outline-2">
<h2 id="sec-3">Coffee Console Developer Tool: Executing CoffeeScript in Chrome</h2>
<div class="outline-text-2" id="text-3">

<p>"<a href="http://snook.ca/archives/browsers/coffeeconsole">Coffeeconsole: A Chrome Extension</a>" provides a place to execute CoffeeScript in
the Web Inspector.
{% img /images/2013-05-27-coffeescript-chrome-extensions/coffee-console.png %}
</p>


</div>
</div>
