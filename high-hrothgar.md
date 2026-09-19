---
layout: default
title: High Hrothgar
permalink: /high-hrothgar/
robots: noindex, nofollow
searchable: false
---
<section class="breath-chamber" aria-labelledby="dragon-title">
  <p class="eyebrow">A quiet place above the clouds</p>

  <div class="dragon-mark" aria-hidden="true">
    <svg viewBox="0 0 620 210" role="presentation">
      <path d="M309 118 C275 77 231 45 177 40 C198 60 209 80 208 99 C158 77 111 79 65 101 C116 103 149 115 174 139 C132 145 102 162 80 184 C134 172 181 174 223 190 C240 157 267 136 309 118 Z"/>
      <path d="M311 118 C345 77 389 45 443 40 C422 60 411 80 412 99 C462 77 509 79 555 101 C504 103 471 115 446 139 C488 145 518 162 540 184 C486 172 439 174 397 190 C380 157 353 136 311 118 Z"/>
      <path d="M274 116 C291 96 329 96 346 116 C334 125 324 134 310 151 C296 134 286 125 274 116 Z"/>
      <path d="M299 151 L310 188 L321 151"/>
    </svg>
  </div>

  <h1 id="dragon-title">Paarthurnax</h1>
  <p class="breath-copy">No lesson. Just breath.</p>

  <div class="breath-orb" id="breath-orb" aria-live="polite">
    <span id="breath-phase">Ready</span>
  </div>

  <button class="breath-start" type="button" id="breath-start">Begin</button>
  <p class="breath-count" id="breath-count">Three slow rounds.</p>

  <p class="breath-whisper" id="breath-whisper">Breathe as though the mountain has all the time in the world.</p>

  <a class="return-from-mountain" href="{{ '/' | relative_url }}">Return ↓</a>
</section>

<script>
(() => {
  const start = document.getElementById("breath-start");
  const orb = document.getElementById("breath-orb");
  const phase = document.getElementById("breath-phase");
  const count = document.getElementById("breath-count");
  const whisper = document.getElementById("breath-whisper");
  if (!start || !orb || !phase || !count || !whisper) return;

  let running = false;
  const rounds = 3;
  const sequence = [
    { label: "Inhale", ms: 4000, cls: "inhale" },
    { label: "Hold", ms: 2000, cls: "hold" },
    { label: "Exhale", ms: 6000, cls: "exhale" }
  ];
  const whispers = [
    "Let the breath arrive before you try to control it.",
    "Keep the shoulders quiet. Let the exhale be longer.",
    "Again. Nothing to prove."
  ];

  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function breathe() {
    if (running) return;
    running = true;
    start.disabled = true;
    start.textContent = "Breathing";

    for (let round = 1; round <= rounds; round++) {
      count.textContent = "Round " + round + " of " + rounds;
      whisper.textContent = whispers[round - 1];

      for (const step of sequence) {
        phase.textContent = step.label;
        orb.className = "breath-orb " + step.cls;
        await wait(step.ms);
      }
    }

    phase.textContent = "Still";
    orb.className = "breath-orb still";
    count.textContent = "Done.";
    whisper.textContent = "Carry the quiet down the mountain.";
    start.textContent = "Again";
    start.disabled = false;
    running = false;
  }

  start.addEventListener("click", breathe);
})();
</script>
