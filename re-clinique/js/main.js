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
// 症例一覧スライダー（左右にループ）
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

  prevBtn.addEventListener("click", function () {
    current = (current - 1 + slides.length) % slides.length;
    update();
  });

  nextBtn.addEventListener("click", function () {
    current = (current + 1) % slides.length;
    update();
  });

  update();
}

document.addEventListener("DOMContentLoaded", function () {
  initCasesSlider(); // ← これだけ
});

