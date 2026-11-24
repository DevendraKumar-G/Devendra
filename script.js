// Dynamic Year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme Toggle with localStorage
// const htmlEl = document.documentElement;
// const themeToggle = document.getElementById('themeToggle');
// const themeIcon = document.getElementById('themeIcon');

// function applyTheme(theme) {
//   if (theme === 'dark') {
//     htmlEl.classList.add('dark');
//     themeIcon.classList.replace('fa-moon', 'fa-sun');
//   } else {
//     htmlEl.classList.remove('dark');
//     themeIcon.classList.replace('fa-sun', 'fa-moon');
//   }
//   localStorage.setItem('portfolio-theme', theme);
// }

// const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
// applyTheme(savedTheme);

// themeToggle.addEventListener('click', () => {
//   const isDark = htmlEl.classList.contains('dark');
//   applyTheme(isDark ? 'light' : 'dark');
// });

// // Mobile Menu Toggle
// const mobileMenuBtn = document.getElementById('mobileMenuBtn');
// const mobileMenu = document.getElementById('mobileMenu');

// mobileMenuBtn.addEventListener('click', () => {
//   mobileMenu.classList.toggle('hidden');
// });

// document.querySelectorAll('#mobileMenu a').forEach((link) => {
//   link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
// });

// fored to light

const htmlEl = document.documentElement;

// Force Light Mode permanently
htmlEl.classList.remove('dark');
localStorage.removeItem('portfolio-theme');

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

document.querySelectorAll('#mobileMenu a').forEach((link) => {
  link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// Typing Effect
const roles = [
  'FrontEnd Developer',
  'Application Developer',
  'Web Developer',
  'Structured Workflow Builder',
  'Detail-Oriented Problem Solver',
];
const typedTextEl = document.getElementById('typedText');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentRole = roles[roleIndex];
  if (!isDeleting) {
    typedTextEl.textContent = currentRole.slice(0, ++charIndex);
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    typedTextEl.textContent = currentRole.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, isDeleting ? 45 : 85);
}
typeLoop();

// Toast Helper
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
let toastTimeout;

function showToast(msg) {
  toastMessage.textContent = msg;
  toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
  }, 2800);
}

// Copy Email Buttons
function copyEmail() {
  const email = document.getElementById('emailText').textContent.trim();
  navigator.clipboard.writeText(email).then(() => {
    showToast(`Copied ${email} to clipboard!`);
  });
}
document.getElementById('copyEmailBtn').addEventListener('click', copyEmail);
document.getElementById('copyEmailHero').addEventListener('click', copyEmail);

// Intersection Observer for Reveal, Counters, and Skill Bars
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');

      // Animate counters inside visible element
      entry.target.querySelectorAll('.counter').forEach((counter) => {
        if (counter.dataset.animated) return;
        counter.dataset.animated = 'true';
        const target = +counter.dataset.target;
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            counter.textContent = target + (target === 100 ? '%' : '+');
            clearInterval(timer);
          } else {
            counter.textContent = current;
          }
        }, 30);
      });

      // Animate skill bars inside visible element
      entry.target.querySelectorAll('.skill-bar').forEach((bar) => {
        bar.style.width = bar.dataset.width;
      });
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Project Category Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => {
      b.classList.remove('active', 'bg-indigo-600', 'text-white');
      b.classList.add('bg-slate-200/80', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
    });
    btn.classList.add('active', 'bg-indigo-600', 'text-white');
    btn.classList.remove('bg-slate-200/80', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');

    const filter = btn.dataset.filter;
    projectCards.forEach((card) => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});

const modal = document.getElementById('projectModal');
const modalCategory = document.getElementById('modalCategory');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalHighlights = document.getElementById('modalHighlights');

document.querySelectorAll('.open-modal').forEach((btn) => {
  btn.addEventListener('click', () => {
    const data = projectDetails[btn.dataset.project];
    if (!data) return;
    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalHighlights.innerHTML = data.highlights.map((item) => `<li>${item}</li>`).join('');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  });
});

function closeModal() {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('closeModalBtn').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Contact Form Validation & Web3Forms Submission
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  let valid = true;

  const toggleError = (input, show) => {
    const err = input.parentElement.querySelector('.error-msg');
    err.classList.toggle('hidden', !show);
    input.classList.toggle('border-rose-500', show);
    if (show) valid = false;
  };

  toggleError(nameInput, nameInput.value.trim().length < 2);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
  toggleError(emailInput, !emailValid);
  toggleError(messageInput, messageInput.value.trim().length < 5);

  if (!valid) return;

  const originalBtnHTML = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Sending...';

  try {
    const formData = new FormData(contactForm);
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();

    if (result.success) {
      contactForm.reset();
      showToast('Message has been successfully sent!');
    } else {
      showToast(result.message || 'Could not send message.');
    }
  } catch (error) {
    showToast('Network error. Please try again.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnHTML;
  }
});