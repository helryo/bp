// =====================
// FV ビフォーアフター（左右にスライドするやつ）
// =====================
function initBeforeAfterSlider() {
  const inner = document.getElementById("ba-inner");
  const overlay = document.getElementById("ba-overlay");
  const handle = document.getElementById("ba-handle");

  // FV がないページでは何もしない
  if (!inner || !overlay || !handle) return;

  function setPosition(percent) {
    // 0〜100% にクランプ
    percent = Math.min(100, Math.max(0, percent));
    overlay.style.width = percent + "%";
    handle.style.left = percent + "%";
  }

  function pointerPos(e) {
    const rect = inner.getBoundingClientRect();
    const clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
    if (clientX == null) return;
    const percent = ((clientX - rect.left) / rect.width) * 100;
    setPosition(percent);
  }

  let isDragging = false;

  inner.addEventListener("pointerdown", function (e) {
    isDragging = true;
    pointerPos(e);
  });

  window.addEventListener("pointermove", function (e) {
    if (!isDragging) return;
    pointerPos(e);
  });

  window.addEventListener("pointerup", function () {
    isDragging = false;
  });

  // 初期位置：中央
  setPosition(50);
}

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
