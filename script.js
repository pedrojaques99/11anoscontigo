document.addEventListener('DOMContentLoaded', () => {
    // Contador
    const counter = document.querySelector('.counter');
    const loveButton = document.querySelector('.love-button');
    const introScreen = document.querySelector('.intro-screen');
    const mainContent = document.querySelector('.main-content');
    let count = 0;
    const targetCount = 11;
    const duration = 2000; // 2 segundos
    const interval = duration / targetCount;

    function updateCounter() {
        if (count < targetCount) {
            count++;
            counter.textContent = count;
            setTimeout(updateCounter, interval);
        }
    }

    // Iniciar contador
    updateCounter();

    // Botão de amor
    loveButton.addEventListener('click', () => {
        introScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
    });

    // Intersection Observer for chapter animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all chapters
    document.querySelectorAll('.chapter').forEach(chapter => {
        observer.observe(chapter);
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add touch feedback for mobile
    document.querySelectorAll('.gallery-item, .chapter').forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });

        element.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });

    // Add subtle parallax effect to header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        const scrolled = window.pageYOffset;
        header.style.transform = `translateY(${scrolled * 0.1}px)`;
    });

    // Modal for images
    const modal = document.querySelector('.modal');
    const modalImg = modal.querySelector('img');
    const closeModal = document.querySelector('.close-modal');

    // Open modal by clicking on images
    document.querySelectorAll('.gallery-item img, .polaroid img').forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modal.classList.add('active');
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Card flipping effect
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const cardInner = item.querySelector('.card-inner');
            cardInner.style.transform = cardInner.style.transform === 'rotateY(180deg)' 
                ? 'rotateY(0deg)' 
                : 'rotateY(180deg)';
        });
    });

    // Música de fundo
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');
    let isPlaying = true;

    function updateMusicIcon() {
        musicIcon.innerHTML = isPlaying ? '&#x1F50A;' : '&#x1F507;';
    }

    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            isPlaying = true;
        } else {
            bgMusic.pause();
            isPlaying = false;
        }
        updateMusicIcon();
    });

    // Atualiza ícone ao iniciar
    updateMusicIcon();
}); 