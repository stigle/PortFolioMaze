/* ================= Typing effect avancé ================= */
const phrases = [
    "Développeur web & créateur de contenu",
    "Passionné par les jeux et la tech",
    "Toujours en quête de nouveaux défis 🚀"
];
const typingElement = document.getElementById('typing-text');
let phraseIndex = 0;
let letterIndex = 0;
let typingDelay = 100;
let erasingDelay = 50;
let newPhraseDelay = 1500;

function type() {
    if(letterIndex < phrases[phraseIndex].length) {
        typingElement.textContent += phrases[phraseIndex].charAt(letterIndex);
        letterIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newPhraseDelay);
    }
}

function erase() {
    if(letterIndex > 0) {
        typingElement.textContent = phrases[phraseIndex].substring(0, letterIndex-1);
        letterIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, typingDelay);
    }
}

/* ================= Dark/Light Mode ================= */
const themeBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';
document.body.classList.add(currentTheme);
themeBtn.textContent = currentTheme === 'light' ? "🌙" : "☀️";

themeBtn.addEventListener('click', () => {
    if(document.body.classList.contains('light')) {
        document.body.classList.replace('light','dark');
        themeBtn.textContent = "☀️";
        localStorage.setItem('theme','dark');
    } else {
        document.body.classList.replace('dark','light');
        themeBtn.textContent = "🌙";
        localStorage.setItem('theme','light');
    }
});

/* ================= Compétences animées ================= */
const skills = document.querySelectorAll('.skill-fill');
function animateSkills() {
    skills.forEach(skill => {
        const width = skill.getAttribute('data-width');
        skill.style.width = width;
    });
}

/* ================= Fade-in sections ================= */
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

/* ================= Projets filtrables ================= */
const filterButtons = document.querySelectorAll('.filters button');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
            if(filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'inline-block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        alert(`Projet sélectionné : ${card.textContent}`);
    });
});

/* ================= Particles interactives ================= */
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
        this.color = getComputedStyle(document.body).backgroundColor === 'rgb(18, 18, 18)' ? '#4CAF50' : '#121212';
    }
    update(mouse) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Collision avec bords
        if(this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if(this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

        // Suivi souris
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < 100) {
            this.x -= dx*0.01;
            this.y -= dy*0.01;
        }
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for(let i =0;i<100;i++){
        particlesArray.push(new Particle());
    }
}

let mouse = {x: null, y: null};
window.addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
});

function animateParticles() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particlesArray.forEach(p => {p.update(mouse); p.draw();});
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

initParticles();
animateParticles();

/* ================= Formulaire contact ================= */
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
    // Formspree gère l'envoi, ici on peut afficher un message local
    status.textContent = "Merci, ton message a été envoyé !";
});

/* ================= Event listeners ================= */
window.addEventListener('scroll', checkSections);
window.addEventListener('load', () => {
    animateSkills();
    checkSections();
    type();
});
