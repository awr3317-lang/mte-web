document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuPanel = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenuPanel) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileMenuPanel.classList.toggle('is-open');
      if (isOpen) {
        mobileMenuPanel.classList.remove('hidden');
      } else {
        setTimeout(() => {
          if (!mobileMenuPanel.classList.contains('is-open')) {
            mobileMenuPanel.classList.add('hidden');
          }
        }, 300); // match transition duration
      }
    });
  }

  // --- ⌘K Command Palette ---
  const cmdk = document.getElementById('cmdk');
  const cmdkInput = document.getElementById('cmdk-input');
  const cmdkItems = Array.from(document.querySelectorAll('.cmdk__item'));
  const searchPill = document.getElementById('searchpill');
  let activeIndex = 0;

  function openCmdk() {
    if (!cmdk) return;
    cmdk.classList.add('is-open');
    cmdk.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => cmdkInput && cmdkInput.focus(), 50);
    updateActiveItem(0);
  }

  function closeCmdk() {
    if (!cmdk) return;
    cmdk.classList.remove('is-open');
    cmdk.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function updateActiveItem(index) {
    const visibleItems = cmdkItems.filter(item => item.style.display !== 'none');
    if (visibleItems.length === 0) return;

    // Boundary check
    if (index < 0) index = visibleItems.length - 1;
    if (index >= visibleItems.length) index = 0;

    activeIndex = index;

    cmdkItems.forEach(item => item.classList.remove('is-active'));
    visibleItems[activeIndex].classList.add('is-active');
    visibleItems[activeIndex].scrollIntoView({ block: 'nearest' });
  }

  // Bind Open Triggers
  if (searchPill) {
    searchPill.addEventListener('click', openCmdk);
  }

  // Close when clicking backdrops or close elements
  if (cmdk) {
    cmdk.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-close') || e.target.classList.contains('cmdk__backdrop')) {
        closeCmdk();
      }
    });
  }

  // Search filter logic
  if (cmdkInput) {
    cmdkInput.addEventListener('input', () => {
      const query = cmdkInput.value.toLowerCase().trim();
      cmdkItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
      updateActiveItem(0);
    });
  }

  // Keyboard controls
  window.addEventListener('keydown', (e) => {
    // ⌘K or Ctrl+K
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (cmdk && cmdk.classList.contains('is-open')) {
        closeCmdk();
      } else {
        openCmdk();
      }
    }

    // Escape
    if (e.key === 'Escape' && cmdk && cmdk.classList.contains('is-open')) {
      closeCmdk();
    }

    // Arrow keys / Enter when open
    if (cmdk && cmdk.classList.contains('is-open')) {
      const visibleItems = cmdkItems.filter(item => item.style.display !== 'none');

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        updateActiveItem(activeIndex + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        updateActiveItem(activeIndex - 1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (visibleItems[activeIndex]) {
          visibleItems[activeIndex].click();
        }
      }
    }
  });

  // --- Scroll Header Style ---
  const header = document.querySelector('.mte-nav-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.style.background = 'rgba(248, 250, 253, 0.95)';
        header.style.boxShadow = '0 4px 20px -10px oklch(24% 0.02 258 / 0.08)';
      } else {
        header.style.background = 'rgba(248, 250, 253, 0.85)';
        header.style.boxShadow = 'none';
      }
    });
  }

  // --- IntersectionObserver Scroll Reveal ---
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if no observer
    revealElements.forEach(el => el.classList.add('is-in'));
  }
});
