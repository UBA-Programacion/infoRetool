// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');

mobileMenuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// Close sidebar when clicking outside on mobile
mainContent.addEventListener('click', () => {
  if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
  }
});

// Navigation Link Activation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.content-section');

// Smooth scroll and active state
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      // Add active class to clicked link
      link.classList.add('active');
      
      // Close mobile menu after clicking
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
      }
    }
  });
});

// Intersection Observer for active navigation
const observerOptions = {
  root: null,
  rootMargin: '-100px 0px -66%',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});

// Progress Bar
const progressBar = document.getElementById('progressBar');

function updateProgressBar() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  const scrolled = window.scrollY;
  const progress = (scrolled / documentHeight) * 100;
  
  progressBar.style.setProperty('--progress', `${progress}%`);
  progressBar.querySelector('::after');
}

// Add CSS variable support for progress
const style = document.createElement('style');
style.textContent = `
  .progress-bar::after {
    width: var(--progress, 0%);
  }
`;
document.head.appendChild(style);

window.addEventListener('scroll', () => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  const scrolled = window.scrollY;
  const progress = (scrolled / documentHeight) * 100;
  
  document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
  progressBar.style.setProperty('width', `${progress}%`);
});

// Update on load
window.addEventListener('load', updateProgressBar);

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Copy Code Functionality
function copyCode(button) {
  const codeBlock = button.nextElementSibling.querySelector('code');
  const code = codeBlock.textContent;
  
  navigator.clipboard.writeText(code).then(() => {
    const originalText = button.textContent;
    button.textContent = '¡Copiado!';
    button.classList.add('copied');
    
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('Error al copiar:', err);
    button.textContent = 'Error';
    setTimeout(() => {
      button.textContent = 'Copiar';
    }, 2000);
  });
}

// Make copyCode function globally available
window.copyCode = copyCode;

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  // Press 'Escape' to close mobile menu
  if (e.key === 'Escape' && sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
  }
  
  // Press 'Home' to scroll to top
  if (e.key === 'Home' && e.ctrlKey) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// Update progress bar style dynamically
const progressStyle = document.createElement('style');
progressStyle.id = 'progress-style';
document.head.appendChild(progressStyle);

function updateProgress() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  const scrolled = window.scrollY;
  const progress = (scrolled / documentHeight) * 100;
  
  progressStyle.textContent = `
    .progress-bar::after {
      width: ${progress}% !important;
    }
  `;
}

window.addEventListener('scroll', updateProgress);
window.addEventListener('resize', updateProgress);
window.addEventListener('load', updateProgress);

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
  document.head.appendChild(script);
}

// Add animation to cards on scroll
const cards = document.querySelectorAll('.card');

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1
});

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  cardObserver.observe(card);
});

// Initialize Prism for syntax highlighting
if (typeof Prism !== 'undefined') {
  Prism.highlightAll();
}

console.log('🚀 Guía Completa de Retool y Firestore cargada exitosamente!');