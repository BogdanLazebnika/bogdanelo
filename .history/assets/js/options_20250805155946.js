// Додаткові колірні налаштування

// applyUserSettings вже викликається раніше — просто розширимо його підтримкою тексту і фону
function applyUserSettings() {
  const settings = JSON.parse(localStorage.getItem('siteSettings')) || {};

  // Акцент
  if (settings.accentColor) {
    document.documentElement.style.setProperty('--accent-color', settings.accentColor);
  } else {
    document.documentElement.style.removeProperty('--accent-color');
  }

  // Текст
  if (settings.textColor) {
    document.documentElement.style.setProperty('--text-color', settings.textColor);
  } else {
    document.documentElement.style.removeProperty('--text-color');
  }

  // Фон
  if (settings.backgroundColor) {
    document.documentElement.style.setProperty('--background-color', settings.backgroundColor);
  } else {
    document.documentElement.style.removeProperty('--background-color');
  }
}

// Розширення updateActiveButtons для інших пікерів
function updateColorPickers() {
  const settings = JSON.parse(localStorage.getItem('siteSettings')) || {};

  const accentColor = settings.accentColor || '#C778DD';
  const textColor = settings.textColor || '#ffffff';
  const backgroundColor = settings.backgroundColor || '#121212';

  const accentInput = document.getElementById('accentColorPicker');
  const textInput = document.getElementById('textColorPicker');
  const backgroundInput = document.getElementById('backgroundColorPicker');

  if (accentInput) accentInput.value = accentColor;
  if (textInput) textInput.value = textColor;
  if (backgroundInput) backgroundInput.value = backgroundColor;

  const accentReset = document.getElementById('accentColorResetBtn');
  const textReset = document.getElementById('textColorResetBtn');
  const backgroundReset = document.getElementById('backgroundColorResetBtn');

  if (accentReset) {
    if (!settings.accentColor) {
      accentReset.classList.add('active');
    } else {
      accentReset.classList.remove('active');
    }
  }

  if (textReset) {
    if (!settings.textColor) {
      textReset.classList.add('active');
    } else {
      textReset.classList.remove('active');
    }
  }

  if (backgroundReset) {
    if (!settings.backgroundColor) {
      backgroundReset.classList.add('active');
    } else {
      backgroundReset.classList.remove('active');
    }
  }
}

function initColorPickerEvents() {
  const accentInput = document.getElementById('accentColorPicker');
  const textInput = document.getElementById('textColorPicker');
  const backgroundInput = document.getElementById('backgroundColorPicker');

  const accentReset = document.getElementById('accentColorResetBtn');
  const textReset = document.getElementById('textColorResetBtn');
  const backgroundReset = document.getElementById('backgroundColorResetBtn');

  if (accentInput) {
    accentInput.addEventListener('input', () => {
      updateUserSetting('accentColor', accentInput.value);
    });
  }

  if (textInput) {
    textInput.addEventListener('input', () => {
      updateUserSetting('textColor', textInput.value);
    });
  }

  if (backgroundInput) {
    backgroundInput.addEventListener('input', () => {
      updateUserSetting('backgroundColor', backgroundInput.value);
    });
  }

  if (accentReset) {
    accentReset.onclick = () => updateUserSetting('accentColor', undefined);
  }

  if (textReset) {
    textReset.onclick = () => updateUserSetting('textColor', undefined);
  }

  if (backgroundReset) {
    backgroundReset.onclick = () => updateUserSetting('backgroundColor', undefined);
  }
}

// Запуск при готовому DOM
document.addEventListener('DOMContentLoaded', () => {
  updateColorPickers();
  initColorPickerEvents();
});
