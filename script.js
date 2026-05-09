/* ─── TYPING EFFECT ─── */
const texts = [
  'Flutter Developer',
  'Dart Enthusiast',
  'Firebase Expert',
  'Mobile Architect',
  
];
let tIdx = 0, cIdx = 0, isDeleting = false;
const el = document.getElementById('typedText');

function type() {
  const current = texts[tIdx];
  if (isDeleting) {
    el.textContent = current.slice(0, --cIdx);
  } else {
    el.textContent = current.slice(0, ++cIdx);
  }
  let speed = isDeleting ? 60 : 100;
  if (!isDeleting && cIdx === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && cIdx === 0) {
    isDeleting = false;
    tIdx = (tIdx + 1) % texts.length;
    speed = 400;
  }
  setTimeout(type, speed);
}
type();

/* ─── NAVBAR SCROLL ─── */
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 50);
  backTop.classList.toggle('visible', y > 400);
});

/* ─── MOBILE MENU ─── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
function closeMobile() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

/* ─── FADE IN OBSERVER ─── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ─── PROJECT FILTER ─── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const tags = card.dataset.tags || '';
      const show = filter === 'all' || tags.includes(filter);
      card.classList.toggle('hidden', !show);
    });
  });
});

/* ─── CONTACT FORM ─── */
function handleFormSubmit() {
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!name || !email || !message) {
    alert('Please fill in all required fields.');
    return;
  }
  const mailto = `mailto:prafulkadam8697@gmail.com?subject=${encodeURIComponent(subject||'Portfolio Inquiry')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
  window.location.href = mailto;
}

/* ─── SMOOTH ACTIVE NAV ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const ioNav = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + e.target.id
          ? 'var(--accent-cyan)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });
sections.forEach(s => ioNav.observe(s));
