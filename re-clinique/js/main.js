// =====================
// FV ビフォーアフター（左右にスライドするやつ）
// =====================
// fv のビフォーアフター
$(window).on('load', function () {
  $('.fv-twentytwenty').twentytwenty({
    default_offset_pct: 0.5, // 初期位置（0.5でど真ん中）
    no_overlay: true         // 「Before / After」の黒帯を消す
  });
});

// =====================
// 症例一覧スライダー（左右ループ＋スワイプ対応）
// =====================
function initCasesSlider() {
  const slider = document.querySelector("[data-cases-slider]");
  if (!slider) return;

  const track = slider.querySelector(".cases-track");
  const slides = Array.from(slider.querySelectorAll(".cases-slide"));
  const prevBtn = slider.querySelector(".cases-arrow--prev");
  const nextBtn = slider.querySelector(".cases-arrow--next");

  if (!track || slides.length === 0 || !prevBtn || !nextBtn) return;

  let current = 0;

  function update() {
    track.style.transform = "translateX(-" + current * 100 + "%)";
  }

  function goPrev() {
    current = (current - 1 + slides.length) % slides.length;
    update();
  }

  function goNext() {
    current = (current + 1) % slides.length;
    update();
  }

  // ボタン操作
  prevBtn.addEventListener("click", goPrev);
  nextBtn.addEventListener("click", goNext);

  // ------- スワイプ操作（スマホ用） -------
  let startX = 0;
  let startY = 0;
  let isTouching = false;
  const SWIPE_THRESHOLD = 40; // 何px以上動いたら「スワイプ」とみなすか

  slider.addEventListener(
    "touchstart",
    function (e) {
      if (!e.touches || e.touches.length === 0) return;
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      isTouching = true;
    },
    { passive: true }
  );

  slider.addEventListener(
    "touchend",
    function (e) {
      if (!isTouching) return;
      isTouching = false;

      if (!e.changedTouches || e.changedTouches.length === 0) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;

      // 横方向の動きが大きく、かつ一定距離以上ならスワイプと判定
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
        if (dx < 0) {
          // 左にスワイプ → 次へ
          goNext();
        } else {
          // 右にスワイプ → 前へ
          goPrev();
        }
      }
    },
    { passive: true }
  );

  // 初期表示
  update();
}

document.addEventListener("DOMContentLoaded", function () {
  initCasesSlider(); // ← これだけ
});

