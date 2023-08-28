---
layout: page
title: Archive
---

<!-- Search posts -->
{% for post in site.posts %}
  <small>{{ post.date | date: '%m/%d/%Y' }}</small>
  <span style="font-size:16px;"> [ {{ post.title }} ]({{ site.baseurl }}/{{ post.url }})</span>
{% endfor %}
