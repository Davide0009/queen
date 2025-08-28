// Main JavaScript for Birthday Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize everything when page loads
    initBackgroundMusic();
    createConfetti();
    initSlideshow();
    initRevealButton();
    initGalleryHover();
    initImageLoading();
    addFloatingHearts();
    initSmoothScrolling();
});

// Background Music
function initBackgroundMusic() {
    const audio = new Audio('audio/simi-happy-birthday-ft.-adekunle-gold-dija.mp3');
    audio.loop = true;
    audio.volume = 0.3;

    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false;

    // Try to autoplay with user gesture
    document.addEventListener('click', function firstClick() {
        if (!isPlaying) {
            audio.play().catch(() => {
                console.log('Autoplay prevented');
            });
            isPlaying = true;
            musicToggle.textContent = '🔇 Pause Music';
        }
        document.removeEventListener('click', firstClick);
    });

    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            musicToggle.textContent = '🔊 Play Music';
        } else {
            audio.play().catch(() => {
                console.log('Play failed');
            });
            musicToggle.textContent = '🔇 Pause Music';
        }
        isPlaying = !isPlaying;
    });
}

// Confetti Animation
function createConfetti() {
    const colors = ['#e8c4c4', '#d8bfd8', '#87ceeb', '#f8f4e6', '#d4a5a5'];
    const container = document.body;

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'confetti';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animation = `confetti ${2 + Math.random() * 3}s linear forwards`;
        container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 5000);
    }

    // Create confetti periodically
    setInterval(createParticle, 300);
    
    // Initial burst
    for (let i = 0; i < 50; i++) {
        setTimeout(createParticle, i * 50);
    }
}

// Photo Slideshow
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(n) {
        slides.forEach(slide => slide.style.display = 'none');
        slides[n].style.display = 'block';
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Show first slide
    showSlide(0);
    
    // Auto-advance slides
    setInterval(nextSlide, 4000);
}

// Click to Reveal Personal Letter
function initRevealButton() {
    const revealButton = document.querySelector('.reveal-button');
    const revealContent = document.querySelector('.reveal-content');

    if (revealButton && revealContent) {
        revealButton.addEventListener('click', function() {
            if (revealContent.style.display === 'block') {
                revealContent.style.display = 'none';
                revealButton.textContent = '📜 Click to Read My Letter';
            } else {
                revealContent.style.display = 'block';
                revealButton.textContent = '📜 Hide Letter';
                
                // Add confetti burst when revealing
                for (let i = 0; i < 30; i++) {
                    setTimeout(() => {
                        const particle = document.createElement('div');
                        particle.className = 'confetti';
                        particle.style.left = (Math.random() * 100) + 'vw';
                        particle.style.background = '#e8c4c4';
                        particle.style.animation = `confetti ${2 + Math.random() * 2}s linear forwards`;
                        document.body.appendChild(particle);
                        
                        setTimeout(() => particle.remove(), 3000);
                    }, i * 100);
                }
            }
        });
    }
}

// Gallery Hover Effects
function initGalleryHover() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Smooth Scrolling for Navigation
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Parallax Effect for Hero Section
function initParallax() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.backgroundPosition = `center ${rate}px`;
        });
    }
}

// Initialize everything
initParallax();

// Add some interactive balloons
function addBalloons() {
    const balloonContainer = document.querySelector('.hero');
    if (balloonContainer) {
        for (let i = 0; i < 8; i++) {
            const balloon = document.createElement('div');
            balloon.style.cssText = `
                position: absolute;
                width: 40px;
                height: 50px;
                background: ${i % 2 === 0 ? '#e8c4c4' : '#87ceeb'};
                border-radius: 50%;
                animation: float ${3 + Math.random() * 2}s ease-in-out infinite;
                left: ${Math.random() * 100}%;
                top: ${70 + Math.random() * 20}%;
                opacity: 0.7;
                z-index: -1;
            `;
            balloonContainer.appendChild(balloon);
        }
    }
}

addBalloons();

// Typewriter effect for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typewriter on hero text
const heroText = document.querySelector('.hero h1');
if (heroText) {
    const originalText = heroText.textContent;
    setTimeout(() => {
        typeWriter(heroText, originalText, 150);
    }, 1000);
}

// Image Loading Optimization
function initImageLoading() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.addEventListener('load', function() {
                this.style.transition = 'opacity 0.5s ease-in';
                this.style.opacity = '1';
            });
        }
    });
}

// Floating Hearts Animation
function addFloatingHearts() {
    const colors = ['#e8c4c4', '#d8bfd8', '#ff6b6b', '#ff9ff3', '#f368e0'];
    const container = document.body;
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: fixed;
            font-size: ${20 + Math.random() * 15}px;
            color: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -50px;
            left: ${Math.random() * 100}vw;
            pointer-events: none;
            z-index: 9999;
            opacity: ${0.6 + Math.random() * 0.4};
            animation: floatHeart ${3 + Math.random() * 2}s ease-in forwards;
        `;
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
    
    // Add CSS for heart animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatHeart {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(${Math.random() > 0.5 ? 360 : -360}deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Create hearts periodically
    setInterval(createHeart, 2000);
    
    // Initial hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(createHeart, i * 300);
    }
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Birthday Countdown (for August 28th)
function initBirthdayCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const birthday = new Date(currentYear, 7, 28); // August is month 7 (0-indexed)
    
    // If birthday has passed this year, show next year's
    if (now > birthday) {
        birthday.setFullYear(currentYear + 1);
    }
    
    const diff = birthday - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    // You could add a countdown display if desired
    console.log(`Days until birthday: ${days}`);
}
