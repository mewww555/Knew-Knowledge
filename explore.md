---
layout: default
title: Explore
permalink: /explore/
---
<section class="page-head compact-head">
  <p class="eyebrow">Explore</p>
  <h1>Follow an idea.</h1>
</section>

<nav class="explore-actions" aria-label="Explore Knew Knowledge">
  <button type="button" data-rabbit>Rabbit hole</button>
  <a href="{{ '/questions/' | relative_url }}">Questions</a>
  <a href="{{ '/curiosities/' | relative_url }}">Cabinet</a>
</nav>

<section class="idea-map-wrap" aria-labelledby="idea-map-title">
  <div class="section-kicker"><span id="idea-map-title">Map of ideas</span></div>
  <div class="idea-map">
    <svg class="idea-lines" viewBox="0 0 1000 560" preserveAspectRatio="none" aria-hidden="true">
      <path d="M500 280 L190 105 M500 280 L800 105 M500 280 L145 330 M500 280 L850 330 M500 280 L280 500 M500 280 L720 500 M190 105 L145 330 M800 105 L850 330 M280 500 L145 330 M720 500 L850 330"/>
    </svg>
    <button class="idea-node center" type="button" data-search-term="meaning">Meaning</button>
    <button class="idea-node n1" type="button" data-search-term="consciousness">Consciousness</button>
    <button class="idea-node n2" type="button" data-search-term="virtual">Virtual worlds</button>
    <button class="idea-node n3" type="button" data-search-term="ritual">Ritual</button>
    <button class="idea-node n4" type="button" data-search-term="identity">Identity</button>
    <button class="idea-node n5" type="button" data-search-term="objects">Objects</button>
    <button class="idea-node n6" type="button" data-search-term="reality">Reality</button>
  </div>
</section>

<section class="small-experiment">
  <div>
    <p class="eyebrow">A tiny experiment</p>
    <h2>Reality dial</h2>
  </div>
  <div class="dial-wrap">
    <div class="dial-labels"><span>Provable</span><span>Felt</span></div>
    <input id="reality-dial" type="range" min="0" max="100" value="50" aria-label="Reality dial from provable to felt">
    <output id="reality-output" for="reality-dial">Between the two</output>
  </div>
</section>
