const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const applyTheme = () => {
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    themeToggle.innerHTML = '<span>🌙</span>';
  } else if (savedTheme === 'light') {
    body.classList.remove('dark');
    themeToggle.innerHTML = '<span>☀️</span>';
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add('dark');
    themeToggle.innerHTML = '<span>🌙</span>';
  }
};

applyTheme();

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  themeToggle.innerHTML = isDark ? '<span>🌙</span>' : '<span>☀️</span>';
});

const counters = document.querySelectorAll('[data-target]');
const animateCounter = (element) => {
  const target = Number(element.dataset.target);
  const duration = 1200;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * target);
    element.textContent = `${value}${target === 98 ? '%' : '+'}`;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = target === 98 ? '98%' : `${target}+`;
    }
  };

  requestAnimationFrame(step);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => observer.observe(counter));


