document.addEventListener('DOMContentLoaded', () => {
    // --- SETUP FOR ALL PAGE FUNCTIONS ---

    // 1. IntersectionObserver to trigger animations on individual elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    animatedElements.forEach(el => observer.observe(el));

    // 2. Countdown timer logic
    const countdownDate = new Date("October 10, 2025 17:00:00").getTime();
    const x = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("days").innerHTML = String(days).padStart(2, '0');
        document.getElementById("hours").innerHTML = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerHTML = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerHTML = String(seconds).padStart(2, '0');
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "ՄԻՋՈՑԱՌՈՒՄԸ ՍԿՍՎԵԼ Է!";
        }
    }, 1000);

    // 3. Particles.js configuration
    particlesJS('particles-js', {
        "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#d9af7f" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": false }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#d9af7f", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out" } },
        "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" } }, "modes": { "repulse": { "distance": 100 }, "push": { "particles_nb": 4 } } },
        "retina_detect": true
    });

    // 4. Parallax scrolling
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.body.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    });

    // 5. Falling hearts
    const heartsBtn = document.getElementById('hearts-btn');
    const heartsContainer = document.getElementById('hearts-container');
    heartsBtn.addEventListener('click', () => { for (let i = 0; i < 30; i++) createHeart(); });
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 2 + 3 + 's';
        heartsContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }

    // 6. SLIDESHOW LOGIC WITH RANDOM START
    let slideTimer;
    let slides = document.getElementsByClassName("photo-slide");
    let dots = document.getElementsByClassName("thumbnail-dot");

    // KEY CHANGE: Determine a random starting slide index
    let slideIndex = Math.floor(Math.random() * slides.length) + 1;

    function showSlide(n) {
        if (slides.length === 0) return;
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }

    function autoShowSlides() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('no-animation');
        }
        slideIndex++;
        showSlide(slideIndex);
        slideTimer = setTimeout(autoShowSlides, 3000);
    }

    function currentSlide(n) {
        clearTimeout(slideTimer);
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.add('no-animation');
        }
        showSlide(slideIndex = n);
        slideTimer = setTimeout(autoShowSlides, 3000);
    }

    window.currentSlide = currentSlide;
    
    // Initial call to start the slideshow from the random index
    showSlide(slideIndex);
    autoShowSlides();
});