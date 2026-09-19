(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector("[data-theme-toggle]");
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const searchDialog = document.getElementById("site-search");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const items = Array.isArray(window.KNEW_SEARCH) ? window.KNEW_SEARCH : [];

  const currentTheme = () => root.dataset.theme === "midnight" ? "midnight" : "day";

  function syncThemeButton() {
    if (!themeButton) return;
    const midnight = currentTheme() === "midnight";
    themeButton.textContent = midnight ? "Daylight" : "Midnight";
    themeButton.setAttribute("aria-pressed", String(midnight));
    if (themeMeta) themeMeta.content = midnight ? "#100b19" : "#f8f4f2";
  }

  function setTheme(theme) {
    root.dataset.theme = theme;
    try { localStorage.setItem("knew-theme", theme); } catch (e) {}
    syncThemeButton();
  }

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      setTheme(currentTheme() === "midnight" ? "day" : "midnight");
    });
  }
  syncThemeButton();

  function renderResults(query) {
    if (!searchResults) return;
    searchResults.replaceChildren();
    const q = query.trim().toLowerCase();
    if (!q) return;

    const matches = items
      .filter(item => (item.title + " " + (item.text || "")).toLowerCase().includes(q))
      .slice(0, 8);

    if (!matches.length) {
      const empty = document.createElement("p");
      empty.className = "search-empty";
      empty.textContent = "Nothing here yet.";
      searchResults.append(empty);
      return;
    }

    matches.forEach(item => {
      const a = document.createElement("a");
      a.href = item.url;
      const kind = document.createElement("span");
      kind.textContent = item.kind || "Archive";
      const title = document.createElement("strong");
      title.textContent = item.title;
      a.append(kind, title);
      searchResults.append(a);
    });
  }

  function openSearch(term = "") {
    if (!searchDialog || !searchInput) return;
    if (!searchDialog.open && typeof searchDialog.showModal === "function") searchDialog.showModal();
    searchInput.value = term;
    renderResults(term);
    requestAnimationFrame(() => searchInput.focus());
  }

  document.querySelectorAll("[data-search-toggle]").forEach(el => el.addEventListener("click", () => openSearch()));
  document.querySelectorAll("[data-search-close]").forEach(el => el.addEventListener("click", () => searchDialog && searchDialog.close()));
  if (searchInput) searchInput.addEventListener("input", e => renderResults(e.target.value));

  document.querySelectorAll("[data-search-term]").forEach(el => {
    el.addEventListener("click", () => openSearch(el.dataset.searchTerm || el.textContent));
  });

  document.querySelectorAll("[data-rabbit]").forEach(el => {
    el.addEventListener("click", () => {
      const here = window.location.pathname.replace(/\/$/, "");
      const choices = items.filter(item => item.url && item.url.replace(/\/$/, "") !== here);
      if (!choices.length) return;
      const pick = choices[Math.floor(Math.random() * choices.length)];
      window.location.href = pick.url;
    });
  });

  const dial = document.getElementById("reality-dial");
  const dialOutput = document.getElementById("reality-output");
  if (dial && dialOutput) {
    const updateDial = () => {
      const v = Number(dial.value);
      const label = v < 34 ? "Closer to proof" : v > 66 ? "Closer to feeling" : "Between the two";
      dialOutput.value = label;
      dialOutput.textContent = label;
      dial.setAttribute("aria-valuetext", label);
    };
    dial.addEventListener("input", updateDial);
    updateDial();
  }

  const notesTab = document.querySelector("[data-notes-toggle]");
  const notesPanel = document.getElementById("reader-notes");
  const notesText = document.getElementById("reader-notes-text");
  const notesStatus = document.getElementById("notes-status");
  const notesHandle = document.querySelector("[data-notes-drag]");
  const noteKey = "knew-note:" + window.location.pathname;
  const positionKey = "knew-note-position";

  function loadNote() {
    if (!notesText) return;
    try { notesText.value = localStorage.getItem(noteKey) || ""; } catch (e) {}
  }

  function openNotes() {
    if (!notesPanel || !notesTab) return;
    notesPanel.hidden = false;
    notesTab.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => notesText && notesText.focus());
  }

  function closeNotes() {
    if (!notesPanel || !notesTab) return;
    notesPanel.hidden = true;
    notesTab.setAttribute("aria-expanded", "false");
  }

  if (notesTab) notesTab.addEventListener("click", openNotes);
  document.querySelectorAll("[data-notes-close]").forEach(el => el.addEventListener("click", closeNotes));
  document.querySelectorAll("[data-notes-clear]").forEach(el => {
    el.addEventListener("click", () => {
      if (!notesText) return;
      notesText.value = "";
      try { localStorage.removeItem(noteKey); } catch (e) {}
      if (notesStatus) notesStatus.textContent = "Cleared";
    });
  });

  if (notesText) {
    loadNote();
    notesText.addEventListener("input", () => {
      try { localStorage.setItem(noteKey, notesText.value); } catch (e) {}
      if (notesStatus) {
        notesStatus.textContent = "Saved";
        clearTimeout(notesText._statusTimer);
        notesText._statusTimer = setTimeout(() => notesStatus.textContent = "Saved on this device", 900);
      }
    });
  }

  if (notesPanel) {
    try {
      const saved = JSON.parse(localStorage.getItem(positionKey) || "null");
      if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y)) {
        notesPanel.style.left = saved.x + "px";
        notesPanel.style.top = saved.y + "px";
        notesPanel.style.right = "auto";
      }
    } catch (e) {}
  }

  if (notesHandle && notesPanel) {
    let drag = null;

    notesHandle.addEventListener("pointerdown", e => {
      if (e.target.closest("button")) return;
      const rect = notesPanel.getBoundingClientRect();
      drag = { dx: e.clientX - rect.left, dy: e.clientY - rect.top };
      notesHandle.setPointerCapture(e.pointerId);
      notesPanel.classList.add("is-dragging");
      e.preventDefault();
    });

    notesHandle.addEventListener("pointermove", e => {
      if (!drag) return;
      const rect = notesPanel.getBoundingClientRect();
      const maxX = Math.max(8, window.innerWidth - rect.width - 8);
      const maxY = Math.max(8, window.innerHeight - rect.height - 8);
      const x = Math.min(Math.max(8, e.clientX - drag.dx), maxX);
      const y = Math.min(Math.max(8, e.clientY - drag.dy), maxY);
      notesPanel.style.left = x + "px";
      notesPanel.style.top = y + "px";
      notesPanel.style.right = "auto";
    });

    const finishDrag = e => {
      if (!drag) return;
      drag = null;
      notesPanel.classList.remove("is-dragging");
      const rect = notesPanel.getBoundingClientRect();
      try { localStorage.setItem(positionKey, JSON.stringify({ x: rect.left, y: rect.top })); } catch (err) {}
      try { notesHandle.releasePointerCapture(e.pointerId); } catch (err) {}
    };

    notesHandle.addEventListener("pointerup", finishDrag);
    notesHandle.addEventListener("pointercancel", finishDrag);
  }

  document.addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openSearch();
    }
    if (e.key === "Escape" && searchDialog && searchDialog.open) searchDialog.close();
  });
})();
