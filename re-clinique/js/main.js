// fv のビフォーアフター
$(window).on('load', function () {
  $('.fv-twentytwenty').twentytwenty({
    default_offset_pct: 0.5, // 初期位置（0.5でど真ん中）
    no_overlay: true         // 「Before / After」の黒帯を消す
  });
});

// =====================
// 症例一覧スライダー本体
// =====================
function initCasesSlider() {
  const slider = document.querySelector('[data-cases-slider]');
  if (!slider) return;

  const track = slider.querySelector('.cases-track');
  const slides = Array.from(slider.querySelectorAll('.cases-slide'));
  const prevBtn = slider.querySelector('.cases-arrow--prev');
  const nextBtn = slider.querySelector('.cases-arrow--next');

  let current = 0; // 0,1,2,... = 何枚目か

  function update() {
    // current 番目のスライドが見えるように移動
    track.style.transform = 'translateX(-' + current * 100 + '%)';
  }

  // ← ボタン：1つ前へ（先頭なら最後へループ）
  prevBtn.addEventListener('click', function () {
    current = (current - 1 + slides.length) % slides.length;
    update();
  });

  // → ボタン：1つ次へ（最後なら先頭へループ）
  nextBtn.addEventListener('click', function () {
    current = (current + 1) % slides.length;
    update();
  });

  // 初期表示
  update();
}


// =====================
// ページ読み込み後に実行
// =====================
document.addEventListener('DOMContentLoaded', function () {
  initCasesSlider();
});


