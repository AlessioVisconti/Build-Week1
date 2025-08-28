(function () {
  // Chiave per salvare i dati nel localStorage
  const STORE_KEY = "epicode-feedback";

  // Seleziona tutte le stelle, il campo di input per i commenti e il pulsante info
  const stars = Array.from(document.querySelectorAll(".star"));
  const commentInput = document.querySelector(".input-wrap input");
  const infoBtn = document.querySelector(".info");

  // Funzione per salvare il rating e il commento nel localStorage
  const save = (rating, comment) => {
    const data = { rating, comment, savedAt: new Date().toISOString() };
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(data));
    } catch (_) {}
  };

  // Funzione per caricare i dati salvati dal localStorage
  const load = () => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  };

  // Funzione per ottenere il rating corrente (indice dell'ultima stella attiva)
  const getCurrentRating = () => stars.findLastIndex((btn) => btn.classList.contains("active"));

  // Funzione per impostare il rating (attivare/disattivare le stelle)
  const setRating = (n) => {
    stars.forEach((btn, i) => {
      if (i <= n) btn.classList.add("active");
      else btn.classList.remove("active");
      btn.setAttribute("aria-pressed", i <= n ? "true" : "false");
    });
  };

  // --- Configura le stelle ---
  stars.forEach((btn, index) => {
    // Migliora l'accessibilità
    btn.setAttribute("role", "button");
    btn.setAttribute("tabindex", "0");
    btn.setAttribute("aria-label", `Rate ${index} out of 10`);

    // Funzione per scegliere il rating
    const choose = () => {
      setRating(index);
      save(index, commentInput?.value ?? "");
    };

    // Aggiungi eventi per il click e la pressione di tasti (Enter o Spazio)
    btn.addEventListener("click", choose);
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        choose();
      }
    });
  });

  // --- Salva il commento mentre l'utente digita ---
  if (commentInput) {
    const onInput = () => save(getCurrentRating(), commentInput.value);
    commentInput.addEventListener("input", onInput);
    commentInput.addEventListener("change", onInput);
  }

  // (Opzionale) Mostra i dati salvati quando si preme il pulsante info
  if (infoBtn) {
    infoBtn.addEventListener("click", () => {
      const data = load() || { rating: getCurrentRating(), comment: commentInput?.value ?? "" };
      alert(`Your rating: ${data.rating}/9\nComment: ${data.comment || "(empty)"}`);
    });
  }

  // --- Ripristina i dati salvati al caricamento della pagina ---
  const saved = load();
  if (saved && Number.isFinite(saved.rating)) setRating(saved.rating);
  if (saved && commentInput && typeof saved.comment === "string") {
    commentInput.value = saved.comment;
  }
})();
