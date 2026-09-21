---
layout: default
title: Album Analysis
permalink: /albums/
---
<section class="page-head">
  <p class="eyebrow">Listening archive</p>
  <h1>Album Analysis</h1>
  <p>Close listening, track notes, production details, references, themes, and whatever becomes clearer after the first listen.</p>
</section>

<section class="album-archive">
  {% assign albums = site.albums | sort: "release_date" | reverse %}
  {% for album in albums %}
  <article class="album-card">
    <a class="album-card-cover" href="{{ album.url | relative_url }}" aria-label="Open {{ album.title }}"></a>
    <div>
      <p class="eyebrow">{{ album.status | default: "Analysis" }}</p>
      <h2><a href="{{ album.url | relative_url }}">{{ album.title }}</a></h2>
      <p class="album-card-artist">{{ album.artist }}</p>
    </div>
    <div class="album-card-meta">
      {% if album.release_date %}{{ album.release_date | date: "%Y" }}{% endif %}
      {% if album.track_count %}<br>{{ album.track_count }} tracks{% endif %}
    </div>
  </article>
  {% endfor %}
</section>
