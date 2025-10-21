document.addEventListener("DOMContentLoaded", function () {
  // === 🟢 Анімації при скролі ===
  const animatedElements = document.querySelectorAll(
    ".animate-from-bottom, .animate-from-left, .animate-from-right"
  );

  animatedElements.forEach((el) => el.classList.add("invisible"));

  const hideTimers = new Map();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;

        if (entry.isIntersecting) {
          el.classList.add("visible");
          el.classList.remove("invisible");

          if (hideTimers.has(el)) {
            clearTimeout(hideTimers.get(el));
            hideTimers.delete(el);
          }
        } else {
          const timer = setTimeout(() => {
            el.classList.remove("visible");
            el.classList.add("invisible");
            hideTimers.delete(el);
          }, 1000); // час зникнення

          hideTimers.set(el, timer);
        }
      });
    },
    { threshold: 0.1 }
  );

  animatedElements.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.01}s`;
    observer.observe(el);
  });

  // === 🟣 Модальне вікно для зображень ===
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".image-modal .close");

  if (modal && modalImg && closeBtn) {
    document.querySelectorAll(".zoomable").forEach((img) => {
      img.addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = img.src;
      });
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
  }
});

// === 🟡 SVG-декорації при повному завантаженні ===
window.addEventListener("load", () => {
  if (window.innerWidth < 800) return;

  const main = document.getElementById("main");
  if (!main) return;

  const SVGS = [
    `<svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="85" height="85" stroke="var(--nav-color)"/>
     </svg>`,
    `<svg viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="2" cy="2" r="2" fill="var(--nav-color)"/>
        <circle cx="22" cy="2" r="2" fill="var(--nav-color)"/>
        <circle cx="42" cy="2" r="2" fill="var(--nav-color)"/>
        <circle cx="62" cy="2" r="2" fill="var(--nav-color)"/>
        <circle cx="82" cy="2" r="2" fill="var(--nav-color)"/>
        <circle cx="2" cy="22" r="2" fill="var(--nav-color)"/>
        <circle cx="22" cy="22" r="2" fill="var(--nav-color)"/>
        <circle cx="42" cy="22" r="2" fill="var(--nav-color)"/>
        <circle cx="62" cy="22" r="2" fill="var(--nav-color)"/>
        <circle cx="82" cy="22" r="2" fill="var(--nav-color)"/>
        <circle cx="2" cy="42" r="2" fill="var(--nav-color)"/>
        <circle cx="22" cy="42" r="2" fill="var(--nav-color)"/>
        <circle cx="42" cy="42" r="2" fill="var(--nav-color)"/>
        <circle cx="62" cy="42" r="2" fill="var(--nav-color)"/>
        <circle cx="82" cy="42" r="2" fill="var(--nav-color)"/>
        <circle cx="2" cy="62" r="2" fill="var(--nav-color)"/>
        <circle cx="22" cy="62" r="2" fill="var(--nav-color)"/>
        <circle cx="42" cy="62" r="2" fill="var(--nav-color)"/>
        <circle cx="62" cy="62" r="2" fill="var(--nav-color)"/>
        <circle cx="82" cy="62" r="2" fill="var(--nav-color)"/>
        <circle cx="2" cy="82" r="2" fill="var(--nav-color)"/>
        <circle cx="22" cy="82" r="2" fill="var(--nav-color)"/>
        <circle cx="42" cy="82" r="2" fill="var(--nav-color)"/>
        <circle cx="62" cy="82" r="2" fill="var(--nav-color)"/>
        <circle cx="82" cy="82" r="2" fill="var(--nav-color)"/>
     </svg>`
  ];

  const PER_SIDE = 5;
  const SIZE_MIN = 24;
  const SIZE_MAX = 80;

  function rnd(min, max) {
    return Math.random() * (max - min) + min;
  }
  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const contentHeight = main.scrollHeight;

  ["left", "right"].forEach((side) => {
    for (let i = 0; i < PER_SIDE; i++) {
      const div = document.createElement("div");
      div.style.position = "absolute";
      div.style[side] = "0px";
      div.style.width = rnd(SIZE_MIN, SIZE_MAX) + "px";
      div.style.top = rnd(0, contentHeight) + "px";
      div.style.opacity = rnd(0.15, 0.35);
      div.style.pointerEvents = "none";
      div.style.zIndex = 2;
      div.innerHTML = pick(SVGS);
      main.appendChild(div);
    }
  });
});
