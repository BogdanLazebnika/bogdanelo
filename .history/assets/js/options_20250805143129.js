function initCustomImageLogic() {
  const input = document.getElementById('customImageInput');
  const preview = document.getElementById('customImagePreview');
  const resetBtn = document.getElementById('resetCustomImageBtn');

  const STORAGE_KEY = 'customImageData';

  // Функція для рендеру зображення
  function renderImage(dataURL) {
    if (dataURL) {
      preview.innerHTML = `<img src="${dataURL}" alt="Custom Image" style="max-width: 100%; border-radius: 8px; margin-top: 10px;">`;
    } else {
      preview.innerHTML = '<span style="color: gray;">Зображення не вибране</span>';
    }
  }

  // Завантажити з localStorage при старті
  const savedImage = localStorage.getItem(STORAGE_KEY);
  if (savedImage) {
    renderImage(savedImage);
  }

  // Обробка вибору зображення
  input.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      const dataURL = e.target.result;
      localStorage.setItem(STORAGE_KEY, dataURL);
      renderImage(dataURL);
    };
    reader.readAsDataURL(file);
  });

  // Обробка кнопки скидання
  resetBtn.addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    renderImage(null);
    input.value = ''; // Очистити вибране
  });
}

// Запускаємо після завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
  initCustomImageLogic();
});
