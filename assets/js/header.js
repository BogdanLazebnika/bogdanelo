// === 📌 Вставка SVG ===
function insertSVG(url, containerId, callback) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      const container = document.getElementById(containerId);
      container.innerHTML = data;
      if (callback) callback(container);
    })
    .catch(error => {
      console.error(`Помилка завантаження SVG (${url}):`, error);
    });
}

// === 📌 Використання SVG ===
insertSVG('./assets/img/logo/logo2.svg', 'logo-header');
insertSVG('./assets/img/icons/arrow-down.svg', 'down-arrow-language', () => {
  const downArrow = document.querySelector('#down-arrow-language svg');
  const languageSwitcherButton = document.querySelector('.language-switcher__button');
  const languageSwitcher = document.querySelector('.language-switcher');
  const languageDropdown = document.querySelector('.language-switcher__dropdown');

  function closeLanguageMenu() {
    languageSwitcher.classList.remove('open');
    languageDropdown.classList.remove('open');
    if (downArrow) downArrow.classList.remove('rotated');
    languageSwitcherButton.setAttribute('aria-expanded', 'false');
  }

  languageSwitcherButton.addEventListener('click', function (event) {
    event.stopPropagation();
    const isOpen = languageSwitcher.classList.contains('open');
    if (isOpen) {
      closeLanguageMenu();
    } else {
      languageSwitcher.classList.add('open');
      languageDropdown.classList.add('open');
      if (downArrow) downArrow.classList.add('rotated');
      languageSwitcherButton.setAttribute('aria-expanded', 'true');
    }
  });

  // === 📌 Закриття меню мови при кліку поза елементом
  document.addEventListener('click', (e) => {
    if (!languageSwitcher.contains(e.target)) {
      closeLanguageMenu();
    }
  });

  // === 📌 Закриття меню мови при скролі
  window.addEventListener('scroll', () => {
    closeLanguageMenu();
  });

  // === 📌 Логіка перемикання мови
  languageDropdown.querySelectorAll("button[data-lang]").forEach(langButton => {
    langButton.addEventListener("click", () => {
      const lang = langButton.getAttribute("data-lang");
      const pathParts = location.pathname.split("/");
      const currentFile = pathParts.pop() || "index.html";
      const isInEnFolder = pathParts.includes("en");

      let newPath;
      if (lang === "en" && !isInEnFolder) {
        newPath = "/en/" + currentFile;
      } else if (lang === "ua" && isInEnFolder) {
        newPath = "/" + currentFile;
      } else {
        return;
      }

      window.location.href = newPath;
    });
  });
});


// === 📌 Підсвічування активного пункту меню
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-list a').forEach(link => {
  const linkPath = link.getAttribute('href').split('/').pop();
  if (linkPath === currentPath) {
    link.classList.add('active');
    link.addEventListener('click', e => {
      e.preventDefault();
    });
  } else {
    link.classList.remove('active');
  }
});


// === 📌 Логіка бургер-меню
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const header = document.querySelector('.header'); // Перенесено сюди

hamburger.addEventListener('click', () => {
  const isActive = nav.classList.toggle('active');
  hamburger.classList.toggle('active');

  // Додаємо/знімаємо клас для фіксованого хедера
  if (isActive) {
    header.classList.add('fixed-header');
    document.body.classList.add('no-scroll'); // щоб за потреби блокувати прокрутку
  } else {
    header.classList.remove('fixed-header');
    document.body.classList.remove('no-scroll');
  }
});


// === 📌 Логіка приховування хедера при скролі
let lastScrollTop = 0;
let headerPosition = 0;

window.addEventListener('scroll', function () {
  if (nav.classList.contains('active')) return; // Якщо меню відкрите — нічого не робимо

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    headerPosition = Math.min(headerPosition + (scrollTop - lastScrollTop), 100);
  } else {
    headerPosition = Math.max(headerPosition - (lastScrollTop - scrollTop), 0);
  }

  header.style.top = -headerPosition + 'px';
  lastScrollTop = scrollTop;
});




// вставка зображень в mobile-social-list"
const githubLogo = document.getElementById('github-logo-mobile-menu');
const dribbbleLogo = document.getElementById('dribble-logo-mobile-menu');
const figmaLogo = document.getElementById('figma-logo-mobile-menu');

const svgFiles = [
  './assets/img/logo/github.svg',
  './assets/img/logo/dribble.svg',
  './assets/img/logo/figma.svg'
];

const logos = [githubLogo, dribbbleLogo, figmaLogo];

logos.forEach((logo, index) => {
  const svgFile = svgFiles[index];
  fetch(svgFile)
    .then(response => response.text())
    .then(svgContent => {
      logo.innerHTML = svgContent;
    });
});
