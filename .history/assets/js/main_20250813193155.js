document.addEventListener("DOMContentLoaded", function () {
const animatedElements = document.querySelectorAll(
    '.animate-from-bottom, .animate-from-left, .animate-from-right'
);

// Початковий стан: прихований
animatedElements.forEach(el => el.classList.add('invisible'));

// Сюди будемо зберігати таймери по кожному елементу
const hideTimers = new Map();

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    const el = entry.target;

    if (entry.isIntersecting) {
        // Стає видимим — показуємо і скасовуємо таймер зникнення
        el.classList.add('visible');
        el.classList.remove('invisible');

        // Якщо був таймер на приховування — зупини його
        if (hideTimers.has(el)) {
        clearTimeout(hideTimers.get(el));
        hideTimers.delete(el);
        }
    } else {
        // Не в полі зору — запускаємо таймер на 5 секунд
        const timer = setTimeout(() => {
        el.classList.remove('visible');
        el.classList.add('invisible');
        hideTimers.delete(el);
        }, 1000); // 5 секунд

        // Зберігаємо таймер для елемента
        hideTimers.set(el, timer);
    }
    });
}, {
    threshold: 0.1 // Частина елемента має бути видимою
});

animatedElements.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.01}s`;
    observer.observe(el);
});
});



window.addEventListener('load', () => { // чекаємо, поки весь контент завантажиться
      const main = document.getElementById('main');
      const SVGS = [
        `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#FF6B6B"/></svg>`,
        `<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="12" fill="#4D96FF"/></svg>`,
        `<svg viewBox="0 0 120 60"><ellipse cx="60" cy="30" rx="60" ry="30" fill="#3DDC84"/></svg>`,
        `<svg viewBox="0 0 100 100"><polygon points="0,100 50,0 100,100" fill="#FFD166"/></svg>`
      ];

      const GUTTER = 80;
      const PER_SIDE = 10;
      const SIZE_MIN = 24;
      const SIZE_MAX = 80;

      function rnd(min,max){return Math.random()*(max-min)+min;}
      function pick(arr){return arr[Math.floor(Math.random()*arr.length)];}

      // Отримуємо фактичну висоту контенту
      const contentHeight = main.scrollHeight;

      ['left','right'].forEach(side=>{
        for(let i=0;i<PER_SIDE;i++){
          const div = document.createElement('div');
          div.style.position='absolute';
          div.style[side]='0px';
          div.style.width= rnd(SIZE_MIN,SIZE_MAX)+'px';
          div.style.top = rnd(0, contentHeight)+'px'; // по всій висоті контенту
          div.style.transform = `translateX(0) rotate(${rnd(-25,25)}deg)`;
          div.style.opacity = rnd(0.15,0.35);
          div.style.pointerEvents = 'none';
          div.style.zIndex = 2;
          div.innerHTML = pick(SVGS);
          main.appendChild(div); // вставляємо всередину main
        }
      });
    });