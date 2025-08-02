document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
});

// === 1. Завантаження header.html та ініціалізація ===
function loadHeader() {
  fetch("components/header.html")
    .then(res => res.text())
    .then(data => {
      document.querySelector("#header-placeholder").innerHTML = data;

      fadeInHeader();                  // Плавна поява
      highlightActiveLink();          // Активне меню
      preventSamePageNavigation();    // Блокування переходу
      loadLogoSvg();                  // SVG логотип
      loadArrowSvg();                 // SVG стрілка + мова
    })
    .catch(err => {
      console.error("Помилка завантаження header.html:", err);
    });
}

// === 2. Плавна поява шапки ===
function fadeInHeader() {
  const header = document.querySelector(".header-fadein");
  if (header) {
    setTimeout(() => {
      header.classList.add("visible");
    }, 100);
  }
}

// === 3. Активне меню ===
function highlightActiveLink() {
  const currentPage = location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-list a");

  navLinks.forEach(link => {
    const href = link.getAttribute("href").replace(/^\.\/|\/$/g, "");
    const current = currentPage.replace(/^\.\/|\/$/g, "");

    if (href === current) {
      link.classList.add("active");
    }
  });
}

function preventSamePageNavigation() {
  const navLinks = document.querySelectorAll(".nav-list a");

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href").replace(/^\.\/|\/$/g, "");
      const currentPage = location.pathname.split("/").pop() || "index.html";
      const current = currentPage.replace(/^\.\/|\/$/g, "");

      if (href === current) {
        e.preventDefault();
      }
    });
  });
}

// === 4. Завантаження логотипу ===
function loadLogoSvg() {
  fetch("./assets/img/logo/logo2.svg")
    .then(res => res.text())
    .then(svg => {
      const logoContainer = document.querySelector("#logo-header");
      if (logoContainer) {
        logoContainer.innerHTML = svg;
      }
    });
}

// === 5. Завантаження стрілки та мови ===
function loadArrowSvg() {
  fetch("./assets/img/icons/arrow-down.svg")
    .then(res => res.text())
    .then(svg => {
      const arrowContainer = document.querySelector("#down-arrow-language");
      if (arrowContainer) {
        arrowContainer.innerHTML = svg;
      }

      highlightActiveLanguage();   // Після вставки SVG
      setupLanguageSwitcher();     // Ініціалізація логіки
    });
}

// === 6. Активна мова ===
function highlightActiveLanguage() {
  const pathParts = location.pathname.split("/");
  const isInEnFolder = pathParts.includes("en");
  const activeLang = isInEnFolder ? "en" : "ua";

  document.querySelectorAll('.language-switcher__dropdown button[data-lang]').forEach(btn => {
    btn.classList.remove("active");
  });

  const activeBtn = document.querySelector(`.language-switcher__dropdown button[data-lang="${activeLang}"]`);
  if (activeBtn) {
    activeBtn.classList.add("active");
  }
}

// === 7. Поведінка перемикача мови ===
function setupLanguageSwitcher() {
  const switcher = document.querySelector(".language-switcher");
  const button = switcher?.querySelector(".language-switcher__button");
  const dropdown = switcher?.querySelector(".language-switcher__dropdown");

  if (!switcher || !button || !dropdown) return;

  button.addEventListener("click", () => {
    const isOpen = dropdown.classList.toggle("open");
    const arrowSvg = document.querySelector(".down-arrow-language svg");
    if (arrowSvg) arrowSvg.classList.toggle("rotated", isOpen);
    button.setAttribute("aria-expanded", isOpen);
  });

  dropdown.querySelectorAll("button[data-lang]").forEach(langButton => {
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
    // Закриття меню при кліку поза перемикачем
  document.addEventListener("click", (e) => {
    if (!switcher.contains(e.target)) {
      dropdown.classList.remove("open");
      button.setAttribute("aria-expanded", "false");

      const arrowSvg = document.querySelector(".down-arrow-language svg");
      if (arrowSvg) arrowSvg.classList.remove("rotated");
    }
  });

  // Закриття меню при скролі
  window.addEventListener("scroll", () => {
    dropdown.classList.remove("open");
    button.setAttribute("aria-expanded", "false");

    const arrowSvg = document.querySelector(".down-arrow-language svg");
    if (arrowSvg) arrowSvg.classList.remove("rotated");
  });

}









// фіксація висовування шапки

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header-father");
  const body = document.body; // або інший контейнер, якщо треба
  let lastScroll = window.scrollY;
  let visibleAmount = 0;
  let isSticky = false;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    const scrollDiff = lastScroll - currentScroll;

    if (currentScroll <= 10) {
      header.classList.remove("header-sticky");
      header.style.transform = "translateY(0)";
      body.style.paddingTop = "0";  // прибираємо відступ
      visibleAmount = 0;
      isSticky = false;
    }

    if (currentScroll <= 300) {
      lastScroll = currentScroll;
      return;
    }

    if (scrollDiff > 0) {
      if (!isSticky) {
        header.classList.add("header-sticky");
        body.style.paddingTop = `${header.offsetHeight}px`;  // додаємо відступ зверху
        visibleAmount = 0;
        isSticky = true;
      }

      // Ділимо scrollDiff на 2, щоб повільніше "вилазила"
      visibleAmount += scrollDiff / 2;
      if (visibleAmount > header.offsetHeight) visibleAmount = header.offsetHeight;
    }

    if (scrollDiff < 0 && isSticky) {
      visibleAmount += scrollDiff / 2; // scrollDiff < 0 → зменшуємо також повільніше
      if (visibleAmount < 0) visibleAmount = 0;
    }

    if (isSticky) {
      const translateY = -(header.offsetHeight - visibleAmount);
      header.style.transform = `translateY(${translateY}px)`;
    }

    lastScroll = currentScroll;
  });
});





function loadHeader() {
  fetch("components/header.html")
    .then(res => res.text())
    .then(data => {
      document.querySelector("#header-placeholder").innerHTML = data;

      // Після вставки header-а в DOM
      fadeInHeader();                  
      highlightActiveLink();          
      preventSamePageNavigation();    
      loadLogoSvg();                  
      loadArrowSvg();                 
      setupBurgerMenu();  // ← додаємо бургер тільки ТУТ
      loadMobileMenuIcons(); // ← додай сюди
    })
    .catch(err => {
      console.error("Помилка завантаження header.html:", err);
    });
}

function setupBurgerMenu() {
  const hamburger = document.getElementById("hamburger");
  const navList = document.getElementById("nav");
  const headerFather = document.querySelector(".header-father");

  if (!hamburger || !navList) return;

  hamburger.addEventListener("click", () => {
    const isActive = hamburger.classList.toggle("active");
    navList.classList.toggle("active");
    headerFather.classList.toggle("active");

    // Заборона прокрутки, якщо меню активне
    if (isActive) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  });
}


function loadMobileMenuIcons() {
  insertSvg('#github-logo-mobile-menu', './assets/img/logo/github.svg');
  insertSvg('.dribbble-logo-mobile-menu', './assets/img/logo/dribble.svg');
  insertSvg('#figma-logo-mobile-menu', './assets/img/logo/figma.svg');
}

function insertSvg(selector, path) {
  fetch(path)
    .then(res => res.text())
    .then(svg => {
      const container = document.querySelector(selector);
      if (container) {
        container.innerHTML = svg;
      }
    })
    .catch(err => {
      console.error(`Не вдалося завантажити SVG з ${path}`, err);
    });
}

