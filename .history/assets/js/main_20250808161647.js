document.addEventListener("DOMContentLoaded", function () {
    const animatedElements = document.querySelectorAll(
      '.animate-from-bottom, .animate-from-left, .animate-from-right'
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // прибрати, якщо хочеш повторну анімацію
        }
      });
    }, {
      threshold: 0.2
    });

    animatedElements.forEach((el, i) => {
      // Можна додати ефект затримки
      el.style.transitionDelay = `${i * 0.15}s`;
      observer.observe(el);
    });
  });