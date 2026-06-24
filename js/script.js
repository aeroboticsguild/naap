// ============================================================
// ===== SPLASH SCREEN =====
// ============================================================
const splashScreen = document.getElementById('splashScreen');

// Create splash particles
function createSplashParticles() {
    const container = document.getElementById('splashParticles');
    if (!container) return;
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
    if (!container) return;
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
    if (splashScreen) {
        splashScreen.classList.add('hidden');
    }
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
    document.querySelectorAll('.mission-card, .benefit-card, .officer-card, .process-card, .resource-card, .faq-item').forEach((el, index) => {
        el.classList.add('scroll-reveal');
        el.style.transitionDelay = (index * 0.05) + 's';
        revealObserver.observe(el);
    });
});

// ===== PRELOADER =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800);
    }
});

// ===== NAVBAR TOGGLE (Mobile) =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        if (navLinks) navLinks.classList.toggle('open');
    });
}

if (navLinks) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
}

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
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
}

// ===== COUNTER ANIMATION (Hero Stats) =====
const stats = document.querySelectorAll('.stat-number');

const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'));
    if (isNaN(target)) return;
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

// ===== SMOOTH SCROLL =====
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

if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.25)';
        } else {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        }
    });
}

// ===== FAQ TOGGLE =====
function toggleFAQ(element) {
    if (!element) return;
    const item = element.parentElement;
    if (!item) return;
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('active');
    });

    if (!isActive) {
        item.classList.add('active');
    }
}

// ===== NOTIFICATION =====
const notification = document.getElementById('notification');

if (notification) {
    setTimeout(() => {
        notification.classList.add('show');
    }, 1500);

    setTimeout(() => {
        notification.classList.remove('show');
    }, 6000);
}

// ===== KEYBOARD ACCESSIBILITY =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks) {
        navLinks.classList.remove('open');
    }
});

console.log('🚀 AeroBotics Guild · Ready for takeoff!');
console.log('📋 Members: 20+ | Projects: 1');
console.log('✨ Innovate. Automate. Elevate.');

// ===== COUNTDOWN TIMER =====
function updateCountdown() {
    const targetDate = new Date('2026-07-31T23:59:59').getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    if (diff <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== PARALLAX ON MOUSE MOVE =====
const heroCard = document.querySelector('.hero-card');
const heroImage = document.querySelector('.hero-image');

if (heroCard && heroImage) {
    heroImage.addEventListener('mousemove', (e) => {
        const rect = heroCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = -(x - centerX) / 20;
        heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    heroImage.addEventListener('mouseleave', () => {
        heroCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
}

// ============================================================
// ===== FIREBASE AUTHENTICATION & MEMBER MANAGEMENT =====
// ============================================================

// ===== CREATE MEMBER DOCUMENT =====
async function createMemberDocument(uid, email, displayName) {
    try {
        console.log('📝 Creating member document for UID:', uid, 'Email:', email);
        
        const memberData = {
            name: displayName || 'Member',
            email: email || 'unknown@email.com',
            rank: 'F',
            points: 0,
            tracks: ['Not Assigned'],
            modules: [],
            projects: [],
            joinDate: new Date().toISOString(),
            role: 'student'
        };
        
        console.log('📝 Member data to save:', memberData);
        
        await firebase.firestore().collection('members').doc(uid).set(memberData);
        
        console.log('✅ Member document created successfully!');
        return true;
        
    } catch (error) {
        console.error('❌ Error creating member document:', error);
        return false;
    }
}

// ===== UPDATE DASHBOARD UI =====
function updateDashboardUI(data) {
    console.log('📊 Updating dashboard UI with data:', data);
    
    // Get all elements
    const userNameEl = document.getElementById('userName');
    const userEmailEl = document.getElementById('userEmail');
    const userPointsEl = document.getElementById('userPoints');
    const userRankEl = document.getElementById('userRank');
    const userRankBadgeEl = document.getElementById('userRankBadge');
    const userProjectsEl = document.getElementById('userProjects');
    const userModulesEl = document.getElementById('userModules');
    
    // Safely extract values with proper defaults
    const name = data?.name || 'Member';
    const email = data?.email || 'member@aerobotics.com';
    const points = typeof data?.points === 'number' ? data.points : 0;
    const rank = data?.rank || 'F';
    const projects = Array.isArray(data?.projects) ? data.projects : [];
    const modules = Array.isArray(data?.modules) ? data.modules : [];
    
    // Update UI elements
    if (userNameEl) userNameEl.textContent = name;
    if (userEmailEl) userEmailEl.textContent = email;
    if (userPointsEl) userPointsEl.textContent = points;
    if (userRankEl) userRankEl.textContent = rank;
    if (userRankBadgeEl) userRankBadgeEl.textContent = 'Rank: ' + rank;
    if (userProjectsEl) userProjectsEl.textContent = projects.length;
    if (userModulesEl) userModulesEl.textContent = modules.length;
    
    console.log('✅ Dashboard UI updated successfully!');
    console.log('   Name:', name);
    console.log('   Points:', points);
    console.log('   Rank:', rank);
    console.log('   Projects:', projects.length);
    console.log('   Modules:', modules.length);
}

// ===== LOAD MEMBER DATA FROM FIRESTORE =====
async function loadMemberData(uid) {
    try {
        console.log('📊 Loading member data for UID:', uid);
        
        // Check if UID is valid
        if (!uid) {
            console.error('❌ Invalid UID provided');
            updateDashboardUI(null);
            return;
        }
        
        const doc = await firebase.firestore().collection('members').doc(uid).get();
        
        if (doc.exists) {
            const data = doc.data();
            console.log('✅ Member data loaded from Firestore:', data);
            updateDashboardUI(data);
        } else {
            console.warn('⚠️ No member document found for UID:', uid);
            
            // Try to create the document
            const user = firebase.auth().currentUser;
            if (user) {
                const email = user.email || 'unknown@email.com';
                const name = user.displayName || 'Member';
                
                const created = await createMemberDocument(uid, email, name);
                if (created) {
                    // Reload the data after creation
                    const newDoc = await firebase.firestore().collection('members').doc(uid).get();
                    if (newDoc.exists) {
                        updateDashboardUI(newDoc.data());
                    } else {
                        // Fallback: set default values
                        updateDashboardUI({
                            name: name,
                            email: email,
                            rank: 'F',
                            points: 0,
                            projects: [],
                            modules: []
                        });
                    }
                } else {
                    // Fallback: set default values
                    updateDashboardUI({
                        name: name,
                        email: email,
                        rank: 'F',
                        points: 0,
                        projects: [],
                        modules: []
                    });
                }
            } else {
                // No user logged in, set defaults
                updateDashboardUI(null);
            }
        }
        
    } catch (error) {
        console.error('❌ Error loading member data:', error);
        // Set fallback values
        updateDashboardUI({
            name: 'Member',
            email: 'error@aerobotics.com',
            rank: 'F',
            points: 0,
            projects: [],
            modules: []
        });
    }
}

// ===== AUTH STATE OBSERVER =====
firebase.auth().onAuthStateChanged((user) => {
    console.log('🔐 Auth state changed:', user ? 'Logged in' : 'Logged out');
    
    const loginContainer = document.getElementById('loginContainer');
    const memberDashboard = document.getElementById('memberDashboard');
    const loginNavBtn = document.getElementById('loginNavBtn');
    const dashboardNavBtn = document.getElementById('dashboardNavBtn');
    
    if (user) {
        // User is signed in
        if (loginContainer) loginContainer.style.display = 'none';
        if (memberDashboard) memberDashboard.style.display = 'block';
        if (loginNavBtn) loginNavBtn.style.display = 'none';
        if (dashboardNavBtn) dashboardNavBtn.style.display = 'inline-block';
        
        // Update user info in header
        const userNameEl = document.getElementById('userName');
        const userEmailEl = document.getElementById('userEmail');
        if (userNameEl) userNameEl.textContent = user.displayName || 'Member';
        if (userEmailEl) userEmailEl.textContent = user.email;
        
        // Load member data from Firestore
        loadMemberData(user.uid);
        
    } else {
        // User is signed out
        if (loginContainer) loginContainer.style.display = 'block';
        if (memberDashboard) memberDashboard.style.display = 'none';
        if (loginNavBtn) loginNavBtn.style.display = 'inline-block';
        if (dashboardNavBtn) dashboardNavBtn.style.display = 'none';
        
        const forgotContainer = document.getElementById('forgotContainer');
        if (forgotContainer) forgotContainer.style.display = 'none';
        
        const authBox = loginContainer?.querySelector('.auth-box');
        if (authBox) authBox.style.display = 'block';
    }
});

// ===== LOGIN =====
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail')?.value;
        const password = document.getElementById('loginPassword')?.value;
        const message = document.getElementById('loginMessage');
        
        if (!email || !password) {
            if (message) {
                message.textContent = '❌ Please enter email and password.';
                message.className = 'auth-message error';
                message.style.display = 'block';
            }
            return;
        }
        
        try {
            if (message) {
                message.textContent = '⏳ Signing in...';
                message.className = 'auth-message loading';
                message.style.display = 'block';
            }
            
            await firebase.auth().signInWithEmailAndPassword(email, password);
            
            if (message) {
                message.textContent = '✅ Login successful!';
                message.className = 'auth-message success';
            }
            
            const passwordInput = document.getElementById('loginPassword');
            if (passwordInput) passwordInput.value = '';
            
        } catch (error) {
            console.error('Login error:', error);
            if (message) {
                message.textContent = '❌ ' + error.message;
                message.className = 'auth-message error';
                message.style.display = 'block';
            }
        }
    });
}

// ===== LOGOUT =====
function logoutUser() {
    firebase.auth().signOut();
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const message = document.getElementById('loginMessage');
    
    if (emailInput) emailInput.value = '';
    if (passwordInput) passwordInput.value = '';
    if (message) message.style.display = 'none';
}

// ===== TOGGLE PASSWORD VISIBILITY =====
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const icon = input.nextElementSibling?.querySelector('i');
    if (!icon) return;
    
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
    const loginContainer = document.getElementById('loginContainer');
    const forgotContainer = document.getElementById('forgotContainer');
    if (loginContainer) {
        const authBox = loginContainer.querySelector('.auth-box');
        if (authBox) authBox.style.display = 'none';
    }
    if (forgotContainer) forgotContainer.style.display = 'block';
}

function showLogin() {
    const loginContainer = document.getElementById('loginContainer');
    const forgotContainer = document.getElementById('forgotContainer');
    const resetMessage = document.getElementById('resetMessage');
    
    if (forgotContainer) forgotContainer.style.display = 'none';
    if (loginContainer) {
        const authBox = loginContainer.querySelector('.auth-box');
        if (authBox) authBox.style.display = 'block';
    }
    if (resetMessage) resetMessage.style.display = 'none';
}

// ===== FORGOT PASSWORD =====
const forgotForm = document.getElementById('forgotForm');
if (forgotForm) {
    forgotForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('resetEmail')?.value;
        const message = document.getElementById('resetMessage');
        
        if (!email) {
            if (message) {
                message.textContent = '❌ Please enter your email.';
                message.className = 'auth-message error';
                message.style.display = 'block';
            }
            return;
        }
        
        try {
            if (message) {
                message.textContent = '⏳ Sending reset link...';
                message.className = 'auth-message loading';
                message.style.display = 'block';
            }
            
            await firebase.auth().sendPasswordResetEmail(email);
            
            if (message) {
                message.textContent = '✅ Reset link sent to your email!';
                message.className = 'auth-message success';
            }
            
            const resetEmailInput = document.getElementById('resetEmail');
            if (resetEmailInput) resetEmailInput.value = '';
            
        } catch (error) {
            console.error('Password reset error:', error);
            if (message) {
                message.textContent = '❌ ' + error.message;
                message.className = 'auth-message error';
                message.style.display = 'block';
            }
        }
    });
}

// ===== CHANGE PASSWORD =====
function showChangePassword() {
    const modal = document.getElementById('changePasswordModal');
    if (!modal) return;
    modal.style.display = 'flex';
    
    const currentInput = document.getElementById('currentPassword');
    const newInput = document.getElementById('newPassword');
    const confirmInput = document.getElementById('confirmPassword');
    const msg = document.getElementById('passwordMessage');
    
    if (currentInput) currentInput.value = '';
    if (newInput) newInput.value = '';
    if (confirmInput) confirmInput.value = '';
    if (msg) msg.style.display = 'none';
}

function hideChangePassword() {
    const modal = document.getElementById('changePasswordModal');
    if (modal) modal.style.display = 'none';
}

const changePasswordForm = document.getElementById('changePasswordForm');
if (changePasswordForm) {
    changePasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const currentPwd = document.getElementById('currentPassword')?.value;
        const newPwd = document.getElementById('newPassword')?.value;
        const confirmPwd = document.getElementById('confirmPassword')?.value;
        const message = document.getElementById('passwordMessage');
        
        if (!currentPwd || !newPwd || !confirmPwd) {
            if (message) {
                message.textContent = '❌ Please fill in all fields.';
                message.className = 'auth-message error';
                message.style.display = 'block';
            }
            return;
        }
        
        if (newPwd.length < 6) {
            if (message) {
                message.textContent = '❌ Password must be at least 6 characters.';
                message.className = 'auth-message error';
                message.style.display = 'block';
            }
            return;
        }
        
        if (newPwd !== confirmPwd) {
            if (message) {
                message.textContent = '❌ Passwords do not match.';
                message.className = 'auth-message error';
                message.style.display = 'block';
            }
            return;
        }
        
        try {
            if (message) {
                message.textContent = '⏳ Updating password...';
                message.className = 'auth-message loading';
                message.style.display = 'block';
            }
            
            const user = firebase.auth().currentUser;
            if (!user) {
                throw new Error('No user logged in');
            }
            
            const credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPwd);
            await user.reauthenticateWithCredential(credential);
            await user.updatePassword(newPwd);
            
            if (message) {
                message.textContent = '✅ Password updated successfully!';
                message.className = 'auth-message success';
            }
            
            const currentInput = document.getElementById('currentPassword');
            const newInput = document.getElementById('newPassword');
            const confirmInput = document.getElementById('confirmPassword');
            
            if (currentInput) currentInput.value = '';
            if (newInput) newInput.value = '';
            if (confirmInput) confirmInput.value = '';
            
            setTimeout(hideChangePassword, 2000);
            
        } catch (error) {
            console.error('Password change error:', error);
            if (message) {
                message.textContent = '❌ ' + error.message;
                message.className = 'auth-message error';
                message.style.display = 'block';
            }
        }
    });
}
