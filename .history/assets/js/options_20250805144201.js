// Зберігання й застосування налаштувань
function updateUserSetting(key, value) {
  const settings = JSON.parse(localStorage.getItem('siteSettings')) || {};

  if (value === undefined) {
    delete settings[key];
  } else {
    settings[key] = value;
  }

  localStorage.setItem('siteSettings', JSON.stringify(settings));
  applyUserSettings(settings); // Передаємо явно
}

// Застосування всіх збережених налаштувань
function applyUserSettings(loadedSettings = null) {
  const settings = loadedSettings || JSON.parse(localStorage.getItem('siteSettings')) || {};

  if (settings.themeColor) {
    document.documentElement.style.setProperty('--theme-color', settings.themeColor);
  }

  if (settings.backgroundColor) {
    document.documentElement.style.setProperty('--background-color', settings.backgroundColor);
  }

  if (settings.textColor) {
    document.documentElement.style.setProperty('--text-color', settings.textColor);
  }

  if (settings.accentColor) {
    document.documentElement.style.setProperty('--accent-color', settings.accentColor);
  }

  // 🔄 Якщо маєш ще якісь стилі — додай їх тут
}

// Функція, що ставить клас active кнопкам, які відповідають localStorage
function updateActiveButtons() {
  const settings = JSON.parse(localStorage.getItem('siteSettings')) || {};

  // Всі кнопки в опціях
  const buttons = document.querySelectorAll('.button-open-options-list-list-two-level button');

  buttons.forEach(button => {
    const onclick = button.getAttribute('onclick');
    if (!onclick) {
      // Можливо input або інші елементи — пропускаємо
      return;
    }

    // Парсимо key і value з рядка onclick, наприклад:
    // onclick="updateUserSetting('fixedHeader', true)"
    const match = onclick.match(/updateUserSetting\(['"](.+?)['"],\s*([^\)]+)\)/);
    if (!match) return;

    const key = match[1];
    let value = match[2].trim();

    // Приводимо value до JS типу (true, false, string, undefined)
    if (value === 'true') value = true;
    else if (value === 'false') value = false;
    else if (value === 'undefined') value = undefined;
    else if (value.startsWith("'") || value.startsWith('"')) {
      value = value.slice(1, -1); // прибрати лапки
    }

    // Порівнюємо з налаштуваннями, додаємо або прибираємо клас active
    if (settings[key] === undefined && value === undefined) {
      // Кнопка "Стандарт" активна, якщо налаштування немає
      button.classList.add('active');
    } else if (settings[key] === value) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
     

  });

  // Обробка для input color
  const accentColor = settings.accentColor || '#C778DD'; // стандартний акцент
  const colorPicker = document.getElementById('accentColorPicker');
  const resetBtn = document.getElementById('accentColorResetBtn');
  if (colorPicker) {
    colorPicker.value = accentColor;
  }
  if (resetBtn) {
    if (!settings.accentColor) {
      resetBtn.classList.add('active');
    } else {
      resetBtn.classList.remove('active');
    }

    resetBtn.onclick = () => {
      updateUserSetting('accentColor', undefined);
    };
  }
}

// Ініціалізація після завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
  updateActiveButtons();

  // Для color picker — щоб при зміні оновлювалось налаштування
  const colorPicker = document.getElementById('accentColorPicker');
  if (colorPicker) {
    colorPicker.addEventListener('input', () => {
      updateUserSetting('accentColor', colorPicker.value);
    });
  }
});




const svgInsertions = [
  { containerId: 'button-open-options-button-icon', svgPath: './assets/img/icons/options.svg' },
  { containerId: 'button-hide-button-options-icon', svgPath: './assets/img/icons/arrow.svg' },
];

svgInsertions.forEach(({ containerId, svgPath }) => {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Контейнер з id="${containerId}" не знайдено`);
    return;
  }

  fetch(svgPath)
    .then(response => {
      if (!response.ok) throw new Error(`Помилка завантаження SVG з ${svgPath}`);
      return response.text();
    })
    .then(svgContent => {
      container.innerHTML = svgContent;
      container.querySelector('svg')?.classList.add('svg-inserted');
    })
    .catch(error => console.error(`Не вдалося вставити SVG:`, error));
});









document.querySelector('.button-open-options-button').onclick = function () {
    document.querySelector('.button-open-options-list').classList.toggle('open');
  };


  // Показати панель
document.querySelector('.button-open-options-button').onclick = function () {
  document.getElementById('draggable-options').classList.remove('hidden');
};

// Сховати панель
function closeSettingsPanel() {
  document.getElementById('draggable-options').classList.add('hidden');
}

// Draggable
const dragTarget = document.getElementById('draggable-options');
const dragHeader = dragTarget.querySelector('.settings-panel-header');
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

dragHeader.addEventListener('mousedown', (e) => {
  isDragging = true;
  const rect = dragTarget.getBoundingClientRect();
  dragOffsetX = e.clientX - rect.left;
  dragOffsetY = e.clientY - rect.top;
  dragTarget.style.transition = 'none';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  dragTarget.style.left = `${e.clientX - dragOffsetX}px`;
  dragTarget.style.top = `${e.clientY - dragOffsetY}px`;
  dragTarget.style.bottom = 'auto';
  dragTarget.style.transform = 'translateX(0)';
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});


const openBtn = document.querySelector('.button-open-options-button');
const openBtnContainer = document.querySelector('.button-options-container');
const settingsPanel = document.getElementById('draggable-options');
const closeBtn = settingsPanel.querySelector('button[onclick="closeSettingsPanel()"]');

// Відкрити меню — сховати кнопку, показати меню
openBtn.addEventListener('click', () => {
  settingsPanel.classList.remove('hidden'); // показати меню
  openBtnContainer.classList.add('hidden'); // сховати кнопку разом з контейнером
});

// Закрити меню — сховати меню, показати кнопку
function closeSettingsPanel() {
  settingsPanel.classList.add('hidden');     // сховати меню
  openBtnContainer.classList.remove('hidden'); // показати кнопку
}
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

let mouseDownInside = false;

window.addEventListener('resize', () => {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
});

// Слідкуємо за натисканням
document.addEventListener('mousedown', (event) => {
  const panel = document.getElementById('draggable-options');
  if (panel.contains(event.target)) {
    mouseDownInside = true;
  } else {
    mouseDownInside = false;
  }
});

// Слідкуємо за кліком
document.addEventListener('click', (event) => {
  const panel = document.getElementById('draggable-options');
  const openBtn = document.querySelector('.button-open-options-button');

  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  const resized = newWidth !== windowWidth || newHeight !== windowHeight;

  const clickedOutside = !panel.contains(event.target) && !openBtn.contains(event.target);

  if (
    !panel.classList.contains('hidden') && // Панель відкрита
    clickedOutside &&
    !resized &&
    !mouseDownInside // Не почали натискати всередині
  ) {
    closeSettingsPanel();
  }

  // Оновлюємо розміри після кліку
  windowWidth = newWidth;
  windowHeight = newHeight;
});





function initOptionsLogic() {
  const container = document.querySelector(".button-options-container");
  const hideButton = document.querySelector(".button-hide-button-options-icon");

  if (!container || !hideButton) {
    console.warn("Options elements not found yet");
    return false;
  }

  const STORAGE_KEY = "hideOptionsBlock";

  // Початковий стан
  const isHidden = localStorage.getItem(STORAGE_KEY) === "true";
  if (isHidden) {
    container.classList.add("hidden-options");
  }

  // Тепер одна кнопка — toggle
  hideButton.addEventListener("click", () => {
    const nowHidden = container.classList.toggle("hidden-options");
    localStorage.setItem(STORAGE_KEY, nowHidden);
  });

  return true;
}


// Чекаємо, поки елементи з'являться у DOM
function waitForOptionsElements(retries = 10) {
  const ok = initOptionsLogic();
  if (!ok && retries > 0) {
    setTimeout(() => waitForOptionsElements(retries - 1), 100);
  }
}

waitForOptionsElements();




updateActiveButtons(); // Вже одразу зараз, якщо DOM готовий (або викличи після перевірки)

document.addEventListener('DOMContentLoaded', () => {
  updateActiveButtons();
});




const resetBtn = document.getElementById('resetAllSettingsBtn');
const modal = document.getElementById('confirmResetModal');
const yesBtn = document.getElementById('confirmResetYes');
const noBtn = document.getElementById('confirmResetNo');

resetBtn.addEventListener('click', () => {
  modal.classList.remove('hidden'); // Показати модалку
});

noBtn.addEventListener('click', () => {
  modal.classList.add('hidden'); // Закрити модалку без дій
});

yesBtn.addEventListener('click', () => {
  // Скинути налаштування
  localStorage.removeItem('siteSettings');
  applyUserSettings();
  updateActiveButtons();

  modal.classList.add('hidden'); // Закрити модалку
});
