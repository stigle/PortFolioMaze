// ===== Typing effect =====
const typingText = "Développeur web & créateur de contenu";
const typingElement = document.getElementById('typing-text');
let i = 0;

function typeWriter() {
    if (i < typingText.length) {
        typingElement.textContent += typingText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// ===== Compétences animées =====
const skills = document.querySelectorAll('.skill-fill');

function animateSkills() {
    skills.forEach(skill => {
        const width = skill.getAttribute('data-width');
        skill.style.width = width;
    });
}

// ===== Fade-in sections =====
const sections = document.querySelectorAll('section');

function checkSections() {
    const triggerBottom = window.innerHeight * 0.85;
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if(sectionTop < triggerBottom) {
            section.classList.add('visible');
        }
    });
}

// ===== Projets clic =====
const projects = document.querySelectorAll('.project-card');
projects.forEach(project => {
    project.addEventListener('click', () => {
        alert(`Projet sélectionné : ${project.textContent}`);
    });
});

// ===== Dark/Light Mode =====
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
});

// ===== Particles background =====
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if(this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
    }
    draw() {
        ctx.fillStyle = '#4CAF50';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for(let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

initParticles();
animateParticles();

// ===== Contact form =====
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    status.textContent = `Merci ${name}, ton message a été envoyé !`;
    form.reset();
});

// ===== Event listeners =====
window.addEventListener('scroll', checkSections);
window.addEventListener('load', () => {
    animateSkills();
    checkSections();
    typeWriter();
});
