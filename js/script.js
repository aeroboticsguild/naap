// ===== PRELOADER =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 800);
});

// ===== NAVBAR TOGGLE (Mobile) =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== COUNTER ANIMATION (Hero Stats) =====
const stats = document.querySelectorAll('.stat-number');

const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 2000;
    const step = Math.max(1, Math.floor(target / 60));
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current >= target) {
            el.textContent = target;
            return;
        }
        el.textContent = current;
        requestAnimationFrame(updateCounter);
    };

    updateCounter();
};

// Intersection Observer for counters
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            if (!el.classList.contains('animated')) {
                el.classList.add('animated');
                animateCounter(el);
            }
        }
    });
}, observerOptions);

stats.forEach(stat => observer.observe(stat));

// ===== SMOOTH SCROLL (for all anchor links) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== NAVBAR SHADOW ON SCROLL =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.25)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    }
});

// ===== FAQ TOGGLE =====
function toggleFAQ(element) {
    const item = element.parentElement;
    const isActive = item.classList.contains('active');

    // Close all other FAQs
    document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('active');
    });

    if (!isActive) {
        item.classList.add('active');
    }
}

// ===== NOTIFICATION =====
const notification = document.getElementById('notification');

setTimeout(() => {
    notification.classList.add('show');
}, 1500);

setTimeout(() => {
    notification.classList.remove('show');
}, 6000);

// ===== PROGRESS BAR ANIMATION =====
const progressBars = document.querySelectorAll('.progress-fill');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        }
    });
}, { threshold: 0.3 });

progressBars.forEach(bar => progressObserver.observe(bar));

// ===== KEYBOARD ACCESSIBILITY =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navLinks.classList.remove('open');
    }
});

// ===== PARALLAX HERO (optional) =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;
    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
    }
});

console.log('🚀 AeroBotics Guild · Ready for takeoff!');
console.log('📋 Members: 20+ | Projects: 1');

// ===== COUNTDOWN TIMER (Membership Drive) =====
function updateCountdown() {
    const targetDate = new Date('2026-03-31T23:59:59').getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById('countdown-days').textContent = '00';
        document.getElementById('countdown-hours').textContent = '00';
        document.getElementById('countdown-minutes').textContent = '00';
        document.getElementById('countdown-seconds').textContent = '00';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('countdown-days').textContent = String(days).padStart(2, '0');
    document.getElementById('countdown-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('countdown-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('countdown-seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);
