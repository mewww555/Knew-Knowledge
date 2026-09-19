---
layout: default
title: High Hrothgar
permalink: /high-hrothgar/
robots: noindex, nofollow
searchable: false
---
<section class="breath-chamber" aria-labelledby="dragon-title">
  <p class="eyebrow">A quiet place above the clouds</p>

  <figure class="paarthurnax-figure">
    <img src="{{ '/assets/images/paarthurnax.svg' | relative_url }}" alt="Paarthurnax resting among the snowy peaks">
  </figure>

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
