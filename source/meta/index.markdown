---
layout: page
title: "meta"
date: 2013-05-07 23:43
comments: true
sharing: true
footer: true
---

<p>
Here's a list of customizations that I applied to Octopress.
</p>
<p>
Initial setup: <a href="../blog/2013/04/27/octopress-setup-with-github-and-org-mode/index.html">Octopress Setup With Github, Org Mode, and LiveReload</a>.
</p>


<div id="outline-container-1" class="outline-2">
<h2 id="sec-1">Plugins Installed</h2>
<div class="outline-text-2" id="text-1">

<ul>
<li><a href="https://github.com/optikfluffel/octopress-responsive-video-embed">octopress-responsive-video-embed</a>: No issues. Easy to embed youtube video.
</li>
</ul>



</div>

</div>

<div id="outline-container-2" class="outline-2">
<h2 id="sec-2">Option Configured</h2>
<div class="outline-text-2" id="text-2">

<ul>
<li>Kramdown
<ul>
<li>Considering using Kramdown instead of rdiscount to enable links.
</li>
<li>Details: <a href="http://jason.the-graham.com/2010/11/21/kramdown_support_for_jekyll/">Kramdown Support for Jekyll</a>
</li>
<li><code>parse_block_html</code> is not passed to kramdown. <a href="https://github.com/mojombo/jekyll/issues/1095">Issue on Github</a>
</li>
</ul>

</li>
</ul>


{% codeblock lang:yaml %}
  markdown: kramdown
  kramdown:
    parse_block_html: true # default for kramdown is false. This will enable using Markdown links
{% endcodeblock %}
<ul>
<li>Kramdown option for parse_block_html
</li>
</ul>

</div>
</div>
