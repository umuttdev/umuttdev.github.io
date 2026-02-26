/* =====================
   CUSTOM CURSOR
===================== */
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

document.addEventListener('mousemove', e => {
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';
    cursorTrail.style.top = e.clientY + 'px';
    cursorTrail.style.left = e.clientX + 'px';
});

document.addEventListener('mousedown', () => cursor.style.transform = 'translate(-50%, -50%) scale(1.6)');
document.addEventListener('mouseup', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');

/* =====================
   NAVBAR SCROLL
===================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* =====================
   HAMBURGER MENU
===================== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* =====================
   SCROLL REVEAL
===================== */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-section').forEach(section => {
    revealObserver.observe(section);
});

/* =====================
   TYPING EFFECT
===================== */
const texts = [
    "Web Sitesi Geliştiricisiyim.",
    "Backend Geliştiricisiyim.",
    "IoT Geliştiricisiyim.",
    "UI / UX Geliştiricisiyim."
];

const typingEl = document.getElementById("typing");
let textIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
    const currentText = texts[textIndex];

    if (!isDeleting) {
        typingEl.textContent = currentText.slice(0, charIndex++);
        if (charIndex > currentText.length) {
            setTimeout(() => isDeleting = true, 1600);
        }
    } else {
        typingEl.textContent = currentText.slice(0, charIndex--);
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
    }
    setTimeout(typeEffect, isDeleting ? 38 : 65);
}

typeEffect();

/* =====================
   SMOOTH SCROLL + HERO BTNS
===================== */
document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener('click', e => {
        const id = link.getAttribute('href');
        if (id === '#contact-popup') return; // popup ile ayrı handle
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

/* =====================
   CONTACT POPUP
===================== */
const contactPopup = document.getElementById('contactPopup');

function openContactPopup(e) {
    if (e) e.preventDefault();
    contactPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeContactPopup() {
    contactPopup.classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('contactTrigger')?.addEventListener('click', openContactPopup);
document.getElementById('mobileContactTrigger')?.addEventListener('click', openContactPopup);

// Navbar footer iletişim link
document.querySelectorAll('a[href="#contact"]').forEach(a => {
    a.addEventListener('click', openContactPopup);
});

contactPopup.querySelector('.popup-close').addEventListener('click', closeContactPopup);

contactPopup.addEventListener('click', e => {
    if (e.target === contactPopup) closeContactPopup();
});

/* =====================
   PROJECT MODAL
===================== */
const projectModal = document.getElementById('projectModal');

function openModal(button) {
    document.getElementById("modalImg1").src = button.dataset.img1;
    document.getElementById("modalImg2").src = button.dataset.img2;
    document.getElementById("modalImg3").src = button.dataset.img3;
    document.getElementById("modalText").innerText = button.dataset.text;
    document.getElementById("modalLink").href = button.dataset.link;

    projectModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    projectModal.classList.remove('open');
    document.body.style.overflow = '';
    document.querySelectorAll('.modal-images img').forEach(img => img.classList.remove('active-img'));
}

projectModal.addEventListener('click', e => {
    if (e.target === projectModal) closeModal();
});

document.querySelectorAll('.modal-images img').forEach(img => {
    img.addEventListener('click', () => {
        const isActive = img.classList.contains('active-img');
        document.querySelectorAll('.modal-images img').forEach(i => i.classList.remove('active-img'));
        if (!isActive) img.classList.add('active-img');
    });
});

/* =====================
   ESC KEY
===================== */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeModal();
        closeContactPopup();
    }
});

/* =====================
   SKILL CARD INDICES
===================== */
document.querySelectorAll('.skill-card').forEach((card, i) => {
    card.style.setProperty('--card-index', i);
});
