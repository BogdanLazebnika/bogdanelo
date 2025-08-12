document.addEventListener("DOMContentLoaded", function () {
    const animatedElements = document.querySelectorAll(
      '.animate-from-bottom, .animate-from-left, .animate-from-right'
    );

    // Початковий стан
    animatedElements.forEach(el => el.classList.add('invisible'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.classList.remove('invisible');
        } else {
          entry.target.classList.remove('visible');
          entry.target.classList.add('invisible');
        }
      });
    }, {
      threshold: 0.1 // можна збільшити, якщо хочеш повну появу
    });

    animatedElements.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.1}s`; // затримка для ефекту черги
      observer.observe(el);
    });
  });