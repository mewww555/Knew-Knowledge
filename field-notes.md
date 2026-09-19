---
layout: default
title: Field Notes
permalink: /field-notes/
---
<section class="page-head">
  <p class="eyebrow">Notebook</p>
  <h1>Field Notes</h1>
  <p>Smaller observations, questions, reading fragments, and ideas in progress.</p>
</section>

{% if site.notes.size > 0 %}
<section class="post-list archive-list">
{% assign notes = site.notes | reverse %}
{% for note in notes %}
  <article class="post-row">
    <div>
      <p class="eyebrow">Field Note</p>
      <h3><a href="{{ note.url | relative_url }}">{{ note.title }}</a></h3>
    </div>
  </article>
{% endfor %}
</section>
{% else %}
<p class="empty-state">No field notes yet. Your first one can be tiny.</p>
{% endif %}
