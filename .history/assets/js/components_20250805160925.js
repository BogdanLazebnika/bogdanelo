function initColorSettings() {
  const STORAGE_KEY = 'customColorSettings';

  const defaultColors = {
    accentColor: '#C778DD',
    textColor: '#000000',
    backgroundColor: '#ffffff',
  };

  function loadColors() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return { ...defaultColors };
  }

  function saveColors(colors) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(colors));
  }

  function applyColors(colors) {
    const root = document.documentElement;
    root.style.setProperty('--custom-accent-color', colors.accentColor);
    root.style.setProperty('--custom-text-color', colors.textColor);
    root.style.setProperty('--custom-background-color', colors.backgroundColor);
  }

  const colors = loadColors();

  const accentInput = document.getElementById('accentColorPicker');
  const textInput = document.getElementById('textColorPicker');
  const backgroundInput = document.getElementById('backgroundColorPicker');

  if (!accentInput || !textInput || !backgroundInput) {
    console.warn('Колірні пікери не знайдені!');
    return;
  }

  accentInput.value = colors.accentColor;
  textInput.value = colors.textColor;
  backgroundInput.value = colors.backgroundColor;

  applyColors(colors);

  accentInput.addEventListener('input', () => {
    colors.accentColor = accentInput.value;
    saveColors(colors);
    applyColors(colors);
  });

  textInput.addEventListener('input', () => {
    colors.textColor = textInput.value;
    saveColors(colors);
    applyColors(colors);
  });

  backgroundInput.addEventListener('input', () => {
    colors.backgroundColor = backgroundInput.value;
    saveColors(colors);
    applyColors(colors);
  });

  const accentResetBtn = document.getElementById('accentColorResetBtn');
  if (accentResetBtn) {
    accentResetBtn.addEventListener('click', () => {
      colors.accentColor = defaultColors.accentColor;
      saveColors(colors);
      accentInput.value = defaultColors.accentColor;
      applyColors(colors);
    });
  }

  const textResetBtn = document.getElementById('textColorResetBtn');
  if (textResetBtn) {
    textResetBtn.addEventListener('click', () => {
      colors.textColor = defaultColors.textColor;
      saveColors(colors);
      textInput.value = defaultColors.textColor;
      applyColors(colors);
    });
  }

  const backgroundResetBtn = document.getElementById('backgroundColorResetBtn');
  if (backgroundResetBtn) {
    backgroundResetBtn.addEventListener('click', () => {
      colors.backgroundColor = defaultColors.backgroundColor;
      saveColors(colors);
      backgroundInput.value = defaultColors.backgroundColor;
      applyColors(colors);
    });
  }
}
