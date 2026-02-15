/* =========================================================
   Valentine site scripts (FINAL)
   - Gallery page: single video + optional background music
   - NO page: autoplay music after clicking NO
   ========================================================= */

(function () {
  // -------------------------
  // GALLERY PAGE: video + music
  // -------------------------
  const reelVideo = document.getElementById("reelVideo");
  const bgMusic = document.getElementById("bgMusic");

  const playBtn = document.getElementById("playBtn");
  const status = document.getElementById("mediaStatus");

  // Run this block only on gallery.html (where reelVideo exists)
  if (reelVideo || bgMusic) {
    const playAll = async () => {
      let videoOk = true;
      let musicOk = true;

      // Try play video
      if (reelVideo) {
        try { await reelVideo.play(); }
        catch { videoOk = false; }
      }

      // Try play music
      if (bgMusic) {
        try { await bgMusic.play(); }
        catch { musicOk = false; }
      }

      const ok = videoOk && musicOk;

      if (status) status.textContent = ok ? "Playing ❤️" : "Tap Play ▶";
      if (playBtn) playBtn.style.display = ok ? "none" : "inline-flex";
    };

    if (playBtn) playBtn.addEventListener("click", playAll);
    window.addEventListener("load", playAll);
  }

  // -------------------------
  // NO PAGE: autoplay music after clicking NO
  // -------------------------
  const noMusic = document.getElementById("noMusic");
  if (noMusic) {
    const startNoMusic = async () => {
      try { await noMusic.play(); }
      catch { console.log("NO music autoplay blocked by browser."); }
    };

    window.addEventListener("load", () => {
      if (sessionStorage.getItem("playNoMusic") === "true") {
        startNoMusic();
        sessionStorage.removeItem("playNoMusic");
      }
    });
  }
})();
