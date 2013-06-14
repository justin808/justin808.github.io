---
layout: page
title: "Renaming, Redating Blog Posts"
date: 2013-05-10 22:20
keywords: Jekyll, Octopress, Renaming
description: Here's a few tips regarding renaming and redating posts and pages in Octopress.
comments: true
sharing: true
footer: true
---

<p>
Here's a few tips regarding renaming and redating posts and pages in Octopress.
</p>

<div id="outline-container-1" class="outline-2">
<h2 id="sec-1">How file names and metadata work in Octopress</h2>
<div class="outline-text-2" id="text-1">

<ul>
<li>Metadata, <code>title</code> and <code>date</code>, in the post headers affects how the page
  displays on the website, and is used for deployment.
</li>
<li>The actual filename is for the author's convenience and is what goes into github.
</li>
<li>You can change the filename any time. The generator does not care. Git will
  pick up the changes automatically.
</li>
<li>However, if you change the <code>title</code> or <code>date</code>, then you need to worry about
  whether one of these conditions exists where you need to create an alias for
  the old link.
<ul>
<li>You posted the article, such as Twitter, or you emailed somebody a link to
    it.
</li>
<li>You have other articles that reference the article being changed.
</li>
</ul>

</li>
<li>If you don't put in an alias, you'll get a 404 error and an unhappy reader.
</li>
</ul>


</div>

</div>

<div id="outline-container-2" class="outline-2">
<h2 id="sec-2">Blogs vs. Pages</h2>
<div class="outline-text-2" id="text-2">

<ul>
<li>Blog articles are created in a directory structure based on the <code>date</code>
  metadata.
</li>
<li>Pages are created where you put them.
</li>
</ul>


</div>

</div>

<div id="outline-container-3" class="outline-2">
<h2 id="sec-3">Moving a post/page that you already published</h2>
<div class="outline-text-2" id="text-3">


<ol>
<li>Install the <a href="http://github.com/tsmango/jekyll_alias_generator">AliasGenerator</a> plugin. I.e., put the <code>.rb</code> file in the plugins directory.
</li>
<li>For any post/page that moves, simply put in this info info in the header of
   the post. A couple points:
<ol>
<li>You need to put in the <code>/index.html</code> at the end. If you don't do that,
      nothing happens in terms of generating an alias.
</li>
<li>Use the path within the website, such as this example.
</li>
</ol>

</li>
</ol>




<pre class="example">alias: /blog/2013/05/08/saner-rails-logging/index.html
</pre>


<p>
I had tweeted about the following post so I wanted to make sure the old link
still worked. I added the above alias to the blog post for the old link.
</p><ul>
<li>Here's the old link: <a href="http://www.railsonmaui.com/blog/2013/05/08/saner-rails-logging/">http://www.railsonmaui.com/blog/2013/05/08/saner-rails-logging/</a>
</li>
<li>Here's the new link: <a href="http://www.railsonmaui.com/blog/2013/05/08/strategies-for-rails-logging-and-error-handling/">http://www.railsonmaui.com/blog/2013/05/08/strategies-for-rails-logging-and-error-handling/</a>
</li>
</ul>


<p>
You can click on the old link to see that it takes you to the new link. Ha! No 404!
</p>
</div>

</div>

<div id="outline-container-4" class="outline-2">
<h2 id="sec-4">Redate Rake Task</h2>
<div class="outline-text-2" id="text-4">


<p>
Here's an addition to an Octopress Rakefile to rename blog postings to
correspond to dates. This rake task does not change the title part. You can do
that manually by changing both the title metadata and the name of the file.
Note, be sure to comment out line 12 if you are using org-mode.
</p>

<p>
{% gist 5559479 %}
</p>

</div>
</div>
