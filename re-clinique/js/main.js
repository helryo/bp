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

  // どれか欠けていたら何もしない
  if (!track || slides.length === 0 || !prevBtn || !nextBtn) return;

  let current = 0; // 0,1,2,... 何枚目か

  function update() {
    // current 番目が見える位置まで移動
    track.style.transform = "translateX(-" + current * 100 + "%)";
  }

  // ← ボタン：1つ前へ（先頭 → 最後 にループ）
  prevBtn.addEventListener("click", function () {
    current = (current - 1 + slides.length) % slides.length;
    update();
  });

  // → ボタン：1つ次へ（最後 → 先頭 にループ）
  nextBtn.addEventListener("click", function () {
    current = (current + 1) % slides.length;
    update();
  });

  // 初期表示
  update();
}

// =====================
// ページ読み込み後にまとめて初期化
// =====================
document.addEventListener("DOMContentLoaded", function () {
  initBeforeAfterSlider(); // FVのビフォーアフター
  initCasesSlider();       // 症例スライダー
});
