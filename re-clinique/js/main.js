// fv のビフォーアフター
$(window).on('load', function () {
  $('.fv-twentytwenty').twentytwenty({
    default_offset_pct: 0.5, // 初期位置（0.5でど真ん中）
    no_overlay: true         // 「Before / After」の黒帯を消す
  });
});

// =====================
// 症例一覧スライダー
// =====================
function initCasesSlider() {
  const slider = document.querySelector('[data-cases-slider]');
  if (!slider) return;

  const track = slider.querySelector('.cases-track');
  const slides = Array.from(slider.querySelectorAll('.cases-slide'));
  const prevBtn = slider.querySelector('.cases-arrow--prev');
  const nextBtn = slider.querySelector('.cases-arrow--next');

  let current = 0;

  function update() {
    track.style.transform = 'translateX(-' + current * 100 + '%)';
    // 端まで行ったら矢印をグレーアウト（任意）
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === slides.length - 1;
  }

  prevBtn.addEventListener('click', function () {
    if (current > 0) {
      current--;
      update();
    }
  });

  nextBtn.addEventListener('click', function () {
    if (current < slides.length - 1) {
      current++;
      update();
    }
  });

  update();
}

// ここから追加
function initCasesSlider() {
  ...（さっきの中身）...
}

document.addEventListener('DOMContentLoaded', function () {
  initCasesSlider();
  // 既存の初期化があればここに追記してもOK
});

