// ===================== NAVBAR SCROLL =====================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===================== MOBILE MENU =====================
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const icon = menuBtn.querySelector('i');
  if (navLinks.classList.contains('active')) {
    icon.classList.replace('fa-bars', 'fa-times');
  } else {
    icon.classList.replace('fa-times', 'fa-bars');
  }
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const icon = menuBtn.querySelector('i');
    icon.classList.replace('fa-times', 'fa-bars');
  });
});

// ===================== TYPING EFFECT =====================
const subtitleEl = document.getElementById('heroSubtitle');
const phrases = [
  'Expert dental care by Dr. Kamlesh Sharma & Dr. Surendra.',
  'Painless treatments with advanced technology.',
  'Rated 5.0★ by 45+ happy patients in Vaishali Nagar.',
  'Your trusted dental clinic in Jaipur.'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 50;

function typeWriter() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    subtitleEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 25;
  } else {
    subtitleEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 45;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    typeSpeed = 2500; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 400; // Small pause before next phrase
  }

  setTimeout(typeWriter, typeSpeed);
}

typeWriter();

// ===================== INTERSECTION OBSERVER (Scroll Animations) =====================
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.12
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
  observer.observe(el);
});

// ===================== COUNTER ANIMATION =====================
const counters = document.querySelectorAll('.counter');
let countersAnimated = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersAnimated) {
      countersAnimated = true;
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.ceil(current);
            setTimeout(updateCounter, stepTime);
          } else {
            counter.textContent = target;
          }
        };

        updateCounter();
      });
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  counterObserver.observe(statsSection);
}

// ===================== HERO CARD STAT COUNTERS =====================
const heroStatNumbers = document.querySelectorAll('.hero-card .stat-number');
heroStatNumbers.forEach(stat => {
  const target = +stat.getAttribute('data-target');
  const duration = 2000;
  const stepTime = 40;
  const steps = duration / stepTime;
  const increment = target / steps;
  let current = 0;

  const updateStat = () => {
    current += increment;
    if (current < target) {
      stat.textContent = Math.ceil(current);
      setTimeout(updateStat, stepTime);
    } else {
      stat.textContent = target;
    }
  };

  // Delay start slightly
  setTimeout(updateStat, 800);
});

// ===================== DUPLICATE REVIEWS FOR INFINITE SCROLL =====================
const reviewsTrack = document.getElementById('reviewsTrack');
if (reviewsTrack) {
  // Clone all review cards and append to create seamless loop
  const reviewCards = reviewsTrack.querySelectorAll('.review-card');
  reviewCards.forEach(card => {
    const clone = card.cloneNode(true);
    reviewsTrack.appendChild(clone);
  });
}

// ===================== SMOOTH SCROLL FOR ANCHOR LINKS =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const position = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: position,
        behavior: 'smooth'
      });
    }
  });
});
