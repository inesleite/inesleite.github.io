---
layout: page
title: Categories
---

<div id="tags">
  <ul class="tags">
  <div class="tags-expo-list">
    <small> Tags:</small>
    {% for tag in site.tags %}
      <a href="#{{ tag[0] | slugify }}" class="post-tag" style="font-size:16px;">
        {{ tag[0] }} ({{ tag[1].size }})
      </a>
    {% endfor %}
  </div>
  
  <hr/>
    	{% for tag in site.tags %}
			<div>
                <h3 id="{{ tag[0] | slugify }}"><span style="font-size:20px;"> {{ tag | first }} </span></h3>
                <!-- List tag posts -->
                <ul class="tag-list">
                    {% for post in tag[1] %}
                    <li>
                        <small> {{ post.date | date: '%m/%d/%Y' }} </small>
                        <a href="{{ site.baseurl }}{{ post.url }}" style="font-size:16px;">{{ post.title }}</a>
                    </li>
                    {% endfor %}
                </ul>
			</div>
			{% endfor %}
  </ul>
</div>
