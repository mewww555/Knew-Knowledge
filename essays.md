---
layout: default
title: Essays
permalink: /essays/
---
<section class="page-head">
  <p class="eyebrow">Long-form writing</p>
  <h1>Essays</h1>
  <p>Interdisciplinary writing on consciousness, culture, games, meaning, and reality.</p>
</section>

<section class="post-list archive-list">
{% for post in site.posts %}
  <article class="post-row">
    <div>
      <p class="eyebrow">{{ post.categories | first | default: "Essay" }}</p>
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      {% if post.subtitle %}<p>{{ post.subtitle }}</p>{% endif %}
    </div>
    <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %-d, %Y" }}</time>
  </article>
{% endfor %}
</section>
