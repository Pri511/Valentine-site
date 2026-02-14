// ---------- Fix NO button / hints (only if you still use noBtn as button) ----------
(function(){
  const noBtn = document.getElementById("noBtn");
  const hint = document.getElementById("hint");
  if(!noBtn) return;

  const messages = [
    "I'm sorry did you just click on NO 😭 Try again.",
  ];
  noBtn.addEventListener("click", () => {
    if(hint) hint.textContent = messages[Math.floor(Math.random()*messages.length)];
  });
})();

// ---------- Start music reliably + slideshow ----------
(function(){
  const audio = document.getElementById("bgMusic");
  const playBtn = document.getElementById("playBtn");
  const status = document.getElementById("audioStatus");

  // Slideshow
  const slides = Array.from(document.querySelectorAll(".slide"));
  const dotsWrap = document.getElementById("dots");

  if (dotsWrap && slides.length) {
    dotsWrap.innerHTML = slides.map((_, i) => `<span class="dot ${i===0?'active':''}" data-i="${i}"></span>`).join("");
  }

  let idx = 0;
  const setSlide = (i) => {
    idx = i;
    slides.forEach((s, k) => s.classList.toggle("active", k === idx));
    const dots = document.querySelectorAll(".dot");
    dots.forEach((d, k) => d.classList.toggle("active", k === idx));
  };

  if (slides.length) {
    setInterval(() => setSlide((idx + 1) % slides.length), 3500);
    document.addEventListener("click", (e) => {
      const dot = e.target.closest(".dot");
      if(dot) setSlide(Number(dot.dataset.i));
    });
  }

  // Music
  if (!audio) return;

  const tryPlay = async () => {
    try {
      await audio.play();
      if (status) status.textContent = "Playing ❤️";
      if (playBtn) playBtn.style.display = "none";
    } catch {
      if (status) status.textContent = "Tap Play Music ▶";
      if (playBtn) playBtn.style.display = "inline-flex";
    }
  };

  if (playBtn) {
    playBtn.addEventListener("click", tryPlay);
  }

  // If we came from a user click (Next), attempt play on load
  window.addEventListener("load", () => {
    // Try to auto-start (may be blocked)
    tryPlay();
  });
})();
