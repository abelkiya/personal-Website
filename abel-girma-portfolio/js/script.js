(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  const savedTheme = localStorage.getItem('abel-portfolio-theme');
  if (savedTheme === 'light' || savedTheme === 'dark') root.dataset.theme = savedTheme;
  const updateThemeButton = () => {
    const light = root.dataset.theme === 'light';
    themeToggle.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    themeIcon.textContent = light ? '☾' : '☼';
  };
  updateThemeButton();
  themeToggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('abel-portfolio-theme', root.dataset.theme);
    updateThemeButton();
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const closeMenu = () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  };
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navLinks.classList.toggle('open', open);
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  const phrases = ['Software Developer', 'AI Developer', 'Intelligent Systems Builder', 'Automation Developer', 'Problem Solver'];
  const typed = document.querySelector('.typed');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) {
    let phraseIndex = 0, charIndex = phrases[0].length, deleting = false;
    const type = () => {
      const phrase = phrases[phraseIndex];
      charIndex += deleting ? -1 : 1;
      typed.textContent = phrase.slice(0, charIndex);
      let delay = deleting ? 42 : 78;
      if (!deleting && charIndex === phrase.length) { deleting = true; delay = 1550; }
      else if (deleting && charIndex === 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; delay = 330; }
      window.setTimeout(type, delay);
    };
    window.setTimeout(type, 1700);
  }

  document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      document.querySelectorAll('.filter-button').forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      document.querySelectorAll('.project-card').forEach(card => {
        card.hidden = category !== 'all' && card.dataset.category !== category;
      });
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealItems.forEach(item => revealObserver.observe(item));
  } else revealItems.forEach(item => item.classList.add('visible'));

  const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const activeObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach(anchor => anchor.classList.toggle('active', anchor.getAttribute('href') === `#${entry.target.id}`));
    }), { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(section => activeObserver.observe(section));
  }

  const header = document.querySelector('.site-header');
  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 8);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  document.querySelector('#year').textContent = new Date().getFullYear();

  const form = document.querySelector('.contact-form');
  const feedback = form.querySelector('.form-feedback');
  const validation = {
    name: value => value.trim().length >= 2 ? '' : 'Please enter at least 2 characters.',
    email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'Please enter a valid email address.',
    projectType: value => value ? '' : 'Please choose a project type.',
    message: value => value.trim().length >= 10 ? '' : 'Please enter a message of at least 10 characters.'
  };
  const validateField = field => {
    const error = validation[field.name](field.value);
    const errorNode = document.getElementById(`${field.name}-error`);
    errorNode.textContent = error;
    field.setAttribute('aria-invalid', String(Boolean(error)));
    return !error;
  };
  form.querySelectorAll('input, textarea, select[required]').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validateField(field);
      feedback.textContent = '';
    });
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const fields = [...form.querySelectorAll('input[required], textarea[required], select[required]')];
    const valid = fields.map(validateField).every(Boolean);
    if (!valid) {
      feedback.textContent = 'Please check the highlighted fields and try again.';
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    feedback.textContent = 'Your details are valid. Connect a delivery service to send this message.';
  });
})();
