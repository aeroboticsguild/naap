// ===== SPLASH SCREEN =====
const splashScreen = document.getElementById('splashScreen');

// Create splash particles
function createSplashParticles() {
    const container = document.getElementById('splashParticles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 6 + 2) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
        particle.style.animationDelay = (Math.random() * 5) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        container.appendChild(particle);
    }
}
createSplashParticles();

// ===== HERO PARTICLES =====
function createHeroParticles() {
    const container = document.getElementById('heroParticles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('hero-particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 8 + 2) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (Math.random() * 20 + 15) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        container.appendChild(particle);
    }
}
createHeroParticles();

// ===== SPLASH SCREEN AUTO-DISMISS =====
setTimeout(() => {
    splashScreen.classList.add('hidden');
    // Trigger scroll reveal after splash
    setTimeout(() => {
        document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right').forEach(el => {
            el.classList.add('visible');
        });
    }, 300);
}, 3200);

// ===== SCROLL REVEAL OBSERVER =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

document.addEventListener('DOMContentLoaded', () => {
    // Add scroll-reveal classes to elements
    document.querySelectorAll('.mission-card, .benefit-card, .officer-card, .process-card, .resource-card, .faq-item').forEach((el, index) => {
        el.classList.add('scroll-reveal');
        el.style.transitionDelay = (index * 0.05) + 's';
        revealObserver.observe(el);
    });
});

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
            el.classList.add('animated');
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

// ===== KEYBOARD ACCESSIBILITY =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navLinks.classList.remove('open');
    }
});

console.log('🚀 AeroBotics Guild · Ready for takeoff!');
console.log('📋 Members: 20+ | Projects: 1');
console.log('✨ Innovate. Automate. Elevate.');

// ===== COUNTDOWN TIMER (Membership Drive) =====
function updateCountdown() {
    const targetDate = new Date('2026-07-31T23:59:59').getTime();
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

// ===== PARALLAX ON MOUSE MOVE (Hero Card) =====
const heroCard = document.querySelector('.hero-card');
if (heroCard) {
    document.querySelector('.hero-image').addEventListener('mousemove', (e) => {
        const rect = heroCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = -(x - centerX) / 20;
        heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    document.querySelector('.hero-image').addEventListener('mouseleave', () => {
        heroCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
}
// ===== AUTH STATE OBSERVER =====
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('memberDashboard').style.display = 'block';
        document.getElementById('loginNavBtn').style.display = 'none';
        document.getElementById('dashboardNavBtn').style.display = 'inline-block';
        
        // Update user info
        document.getElementById('userName').textContent = user.displayName || 'Member';
        document.getElementById('userEmail').textContent = user.email;
        
        // 🔥 LOAD MEMBER DATA FROM FIRESTORE
        loadMemberData(user.uid);
        
    } else {
        // User is signed out
        document.getElementById('loginContainer').style.display = 'block';
        document.getElementById('memberDashboard').style.display = 'none';
        document.getElementById('loginNavBtn').style.display = 'inline-block';
        document.getElementById('dashboardNavBtn').style.display = 'none';
        document.getElementById('forgotContainer').style.display = 'none';
        document.getElementById('loginContainer').querySelector('.auth-box').style.display = 'block';
    }
});

// ===== LOAD MEMBER DATA FROM FIRESTORE =====
async function loadMemberData(uid) {
    try {
        console.log('📊 Loading member data for UID:', uid);
        
        // Get member document from Firestore
        const doc = await firebase.firestore().collection('members').doc(uid).get();
        
        if (doc.exists) {
            const data = doc.data();
            console.log('✅ Member data loaded:', data);
            
            // Safely get values with fallbacks
            const points = data.points !== undefined ? data.points : 0;
            const rank = data.rank || 'F';
            const projects = data.projects || [];
            const modules = data.modules || [];
            const name = data.name || 'Member';
            
            // Update UI
            document.getElementById('userName').textContent = name;
            document.getElementById('userPoints').textContent = points;
            document.getElementById('userRank').textContent = rank;
            document.getElementById('userRankBadge').textContent = 'Rank: ' + rank;
            document.getElementById('userProjects').textContent = projects.length;
            document.getElementById('userModules').textContent = modules.length;
            
            console.log('✅ Dashboard updated successfully!');
            
        } else {
            console.warn('⚠️ No member document found for UID:', uid);
            // Set default values
            document.getElementById('userPoints').textContent = '0';
            document.getElementById('userRank').textContent = 'F';
            document.getElementById('userRankBadge').textContent = 'Rank: F';
            document.getElementById('userProjects').textContent = '0';
            document.getElementById('userModules').textContent = '0';
        }
        
    } catch (error) {
        console.error('❌ Error loading member data:', error);
        // Set fallback values
        document.getElementById('userPoints').textContent = '0';
        document.getElementById('userRank').textContent = 'F';
        document.getElementById('userRankBadge').textContent = 'Rank: F';
        document.getElementById('userProjects').textContent = '0';
        document.getElementById('userModules').textContent = '0';
    }
}

// ===== LOGIN =====
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const message = document.getElementById('loginMessage');
    
    try {
        message.textContent = '⏳ Signing in...';
        message.className = 'auth-message loading';
        message.style.display = 'block';
        
        await firebase.auth().signInWithEmailAndPassword(email, password);
        
        message.textContent = '✅ Login successful!';
        message.className = 'auth-message success';
        
        // Clear form
        document.getElementById('loginPassword').value = '';
        
    } catch (error) {
        message.textContent = '❌ ' + error.message;
        message.className = 'auth-message error';
        message.style.display = 'block';
    }
});

// ===== LOGOUT =====
function logoutUser() {
    firebase.auth().signOut();
    // Reset UI
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
    const message = document.getElementById('loginMessage');
    message.style.display = 'none';
}

// ===== TOGGLE PASSWORD VISIBILITY =====
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

// ===== SHOW FORGOT PASSWORD =====
function showForgotPassword() {
    document.getElementById('loginContainer').querySelector('.auth-box').style.display = 'none';
    document.getElementById('forgotContainer').style.display = 'block';
}

function showLogin() {
    document.getElementById('forgotContainer').style.display = 'none';
    document.getElementById('loginContainer').querySelector('.auth-box').style.display = 'block';
    document.getElementById('resetMessage').style.display = 'none';
}

// ===== FORGOT PASSWORD =====
document.getElementById('forgotForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('resetEmail').value;
    const message = document.getElementById('resetMessage');
    
    try {
        message.textContent = '⏳ Sending reset link...';
        message.className = 'auth-message loading';
        message.style.display = 'block';
        
        await firebase.auth().sendPasswordResetEmail(email);
        
        message.textContent = '✅ Reset link sent to your email!';
        message.className = 'auth-message success';
        document.getElementById('resetEmail').value = '';
        
    } catch (error) {
        message.textContent = '❌ ' + error.message;
        message.className = 'auth-message error';
        message.style.display = 'block';
    }
});

// ===== CHANGE PASSWORD =====
function showChangePassword() {
    document.getElementById('changePasswordModal').style.display = 'flex';
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    const msg = document.getElementById('passwordMessage');
    msg.style.display = 'none';
}

function hideChangePassword() {
    document.getElementById('changePasswordModal').style.display = 'none';
}

document.getElementById('changePasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const currentPwd = document.getElementById('currentPassword').value;
    const newPwd = document.getElementById('newPassword').value;
    const confirmPwd = document.getElementById('confirmPassword').value;
    const message = document.getElementById('passwordMessage');
    
    // Validate
    if (newPwd.length < 6) {
        message.textContent = '❌ Password must be at least 6 characters.';
        message.className = 'auth-message error';
        message.style.display = 'block';
        return;
    }
    
    if (newPwd !== confirmPwd) {
        message.textContent = '❌ Passwords do not match.';
        message.className = 'auth-message error';
        message.style.display = 'block';
        return;
    }
    
    try {
        message.textContent = '⏳ Updating password...';
        message.className = 'auth-message loading';
        message.style.display = 'block';
        
        const user = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPwd);
        await user.reauthenticateWithCredential(credential);
        await user.updatePassword(newPwd);
        
        message.textContent = '✅ Password updated successfully!';
        message.className = 'auth-message success';
        
        // Clear form
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
        
        setTimeout(hideChangePassword, 2000);
        
    } catch (error) {
        message.textContent = '❌ ' + error.message;
        message.className = 'auth-message error';
        message.style.display = 'block';
    }
});
