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

// Handle window resize for responsiveness
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

// Force redraw on elements that might have rendering issues
function forceRedraw(element) {
    element.style.display = 'none';
    element.offsetHeight; // Trigger reflow
    element.style.display = '';
}

// Call this function on elements that have rendering issues
window.addEventListener('load', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        forceRedraw(section);
    });
});

function adjustElementPositions() {
    // Get the viewport height
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    
    // Adjust hero section if it's taking too much space
    const hero = document.getElementById('hero');
    if (hero) {
        const heroHeight = hero.offsetHeight;
        if (heroHeight > vh * 0.7) {
            hero.style.minHeight = 'auto';
            hero.style.paddingTop = '20px';
            hero.style.paddingBottom = '30px';
        }
    }
    
    // Ensure content is visible in the viewport
    const firstContent = document.querySelector('h1, .hero-content');
    if (firstContent) {
        firstContent.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
}

// Run on document load and resize
document.addEventListener('DOMContentLoaded', adjustElementPositions);
window.addEventListener('resize', adjustElementPositions);

// Additional check after images load
window.addEventListener('load', function() {
    setTimeout(adjustElementPositions, 100);
});

// Run on document load
document.addEventListener('DOMContentLoaded', fixTextRendering);
window.addEventListener('load', fixTextRendering);

// Also run after a short delay to catch any dynamic rendering
setTimeout(fixTextRendering, 1000);

// Force redraw of elements with rendering issues
function forceTextRedraw() {
    const elements = document.querySelectorAll('p, h1, h2, h3, h4, span');
    elements.forEach(el => {
        // Temporarily change display to force redraw
        const originalDisplay = el.style.display;
        el.style.display = 'none';
        void el.offsetHeight; // Trigger reflow
        el.style.display = originalDisplay;
    });
}

// Apply after page load
window.addEventListener('load', function() {
    setTimeout(forceTextRedraw, 500);
});

// Fix for mobile scroll jumping
let scrollPosition = 0;
let ticking = false;

function preventScrollJump() {
    // Get current scroll position
    const newScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // If we detect a large jump (likely due to URL bar resize)
    if (Math.abs(newScrollPosition - scrollPosition) > 100) {
        // Restore previous scroll position
        window.scrollTo(0, scrollPosition);
    } else {
        // Update our stored position
        scrollPosition = newScrollPosition;
    }
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(preventScrollJump);
        ticking = true;
    }
}

// Listen to scroll events
window.addEventListener('scroll', requestTick, { passive: true });

// Additional fix for resize events (when URL bar hides/shows)
window.addEventListener('resize', function() {
    // Maintain scroll position after resize
    window.scrollTo(0, scrollPosition);
});

// Initialize scroll position
document.addEventListener('DOMContentLoaded', function() {
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
});

// Fix for bottom bounce effect on iOS
document.body.addEventListener('touchmove', function(e) {
    // Prevent scrolling beyond boundaries
    if (e.touches.length > 0) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        
        // If at bottom and trying to scroll down further, prevent it
        if (scrollTop + clientHeight >= scrollHeight && e.touches[0].clientY < 0) {
            e.preventDefault();
        }
        
        // If at top and trying to scroll up further, prevent it
        if (scrollTop <= 0 && e.touches[0].clientY > 0) {
            e.preventDefault();
        }
    }
}, { passive: false });

// Comprehensive mobile scroll fix
(function() {
    'use strict';
    
    let scrollPosition = 0;
    let windowHeight = window.innerHeight;
    
    // Store initial dimensions
    function storeDimensions() {
        windowHeight = window.innerHeight;
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    }
    
    // Check if we need to stabilize scroll
    function stabilizeScroll() {
        const newWindowHeight = window.innerHeight;
        const newScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        // If window height changed significantly (URL bar resized)
        if (Math.abs(newWindowHeight - windowHeight) > 40) {
            // Restore scroll position
            window.scrollTo(0, scrollPosition);
            windowHeight = newWindowHeight;
        } else {
            // Update stored position
            scrollPosition = newScrollPosition;
        }
    }
    
    // Set up event listeners
    window.addEventListener('load', storeDimensions);
    window.addEventListener('resize', stabilizeScroll);
    window.addEventListener('scroll', function() {
        requestAnimationFrame(stabilizeScroll);
    });
    
    // Initial call
    storeDimensions();
})();