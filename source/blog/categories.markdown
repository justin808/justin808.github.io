---
layout: page
title: "categories"
date: 2013-05-12 23:53
comments: false
sharing: true
footer: true
---
<ul>
{% for item in site.categories %}
    <li><a href="/blog/categories/{{ item[0] }}/">{{ item[0] | capitalize }}</a> [ {{ item[1].size }} ]</li>
{% endfor %}
</ul>
