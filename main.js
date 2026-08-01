(() => {
  const header = document.getElementById('siteHeader');
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  const backToTop = document.getElementById('backToTop');

  const closeMenu = () => {
    if (!toggle || !nav) return;
    toggle.classList.remove('open');
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  }

  const handleScroll = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 60);
    if (backToTop) backToTop.classList.toggle('show', window.scrollY > 600);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

  const counters = document.querySelectorAll('.counter');
  if ('IntersectionObserver' in window && counters.length) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.target || 0);
        const duration = 1500;
        const start = performance.now();
        const update = now => {
          const progress = Math.min((now - start) / duration, 1);
          const value = Math.floor(target * (1 - Math.pow(1 - progress, 3)));
          el.textContent = target >= 1000 ? value.toLocaleString() + '+' : value + '+';
          if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
        obs.unobserve(el);
      });
    }, { threshold: .6 });
    counters.forEach(counter => counterObserver.observe(counter));
  }

  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));
      button.classList.add('active');
      const panel = document.getElementById(button.dataset.tab);
      if (panel) panel.classList.add('active');
    });
  });

  document.querySelectorAll('.faq-item button').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('open');
        const btn = faq.querySelector('button');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', event => {
      event.preventDefault();
      const email = document.getElementById('newsletterEmail');
      const message = document.getElementById('newsletterMessage');
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      message.className = 'form-message ' + (valid ? 'success' : 'error');
      message.textContent = valid ? 'Thank you. You are now subscribed.' : 'Please enter a valid email address.';
      if (valid) newsletterForm.reset();
    });
  }
})();