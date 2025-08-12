const words = ['Цікаве', 'Новеньке', 'Корисне', 'Своє', 'Інтерактивне', 'Дизайнерське'];
        const target = document.getElementById('typewriter');

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
        const currentWord = words[wordIndex];
        const visibleText = currentWord.substring(0, charIndex);
        target.textContent = `"${visibleText}"`;

        if (!isDeleting) {
            if (charIndex < currentWord.length) {
            charIndex++;
            setTimeout(typeEffect, 100); // Швидкість набору
            } else {
            isDeleting = true;
            setTimeout(typeEffect, 1500); // Пауза перед стиранням
            }
        } else {
            if (charIndex > 0) {
            charIndex--;
            setTimeout(typeEffect, 50); // Швидкість стирання
            } else {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 300); // Пауза перед новим словом
            }
        }
        }

        typeEffect();