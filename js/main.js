/**
 * AHMED SMAILI - ACADEMIC & ENGINEERING PORTFOLIO
 * Main Interactive Engine & UI Controller
 * Zero external runtime dependencies. Production-ready.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initActiveNavSpy();
  initCertificateModal();
  initContactActions();
});

/**
 * Mobile Navigation Toggle and Smooth Scrolling
 */
function initNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Navbar elevation and background intensity on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.backgroundColor = 'rgba(11, 15, 25, 0.95)';
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
      navbar.style.backgroundColor = 'rgba(11, 15, 25, 0.85)';
      navbar.style.boxShadow = 'none';
    }
  }, { passive: true });
}

/**
 * Scrollspy to highlight active section in navigation bar
 */
function initActiveNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/**
 * Certificate Lightbox Modal Inspector
 */
function initCertificateModal() {
  const modal = document.getElementById('cert-modal');
  const modalClose = document.getElementById('modal-close');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalVerifyBtn = document.getElementById('modal-verify-btn');
  const modalPdfBtn = document.getElementById('modal-pdf-btn');
  const certCards = document.querySelectorAll('.cert-card');

  if (!modal || !modalImg || !modalTitle) return;

  function openModal(card) {
    const title = card.getAttribute('data-cert-title');
    const imgSrc = card.getAttribute('data-cert-img');
    const pdfSrc = card.getAttribute('data-cert-pdf');
    const verifySrc = card.getAttribute('data-cert-verify');

    modalTitle.textContent = title || 'Certificate Inspection';
    modalImg.src = imgSrc || '';
    modalImg.alt = title || 'Certificate Preview';

    if (modalVerifyBtn) {
      modalVerifyBtn.href = verifySrc || '#';
    }
    if (modalPdfBtn) {
      modalPdfBtn.href = pdfSrc || '#';
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  certCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't intercept clicks on inner links
      if (e.target.closest('a')) return;
      openModal(card);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/**
 * Contact Actions: Copy Email to Clipboard & Feedback
 */
function initContactActions() {
  const copyBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-btn-text');
  const emailTextEl = document.getElementById('academic-email-text');

  if (!copyBtn || !emailTextEl) return;

  copyBtn.addEventListener('click', async () => {
    const email = emailTextEl.textContent.trim();
    try {
      await navigator.clipboard.writeText(email);
      if (copyText) {
        copyText.textContent = 'Copied!';
        copyBtn.style.borderColor = 'var(--accent-emerald)';
        copyBtn.style.color = '#34d399';
      }
      setTimeout(() => {
        if (copyText) {
          copyText.textContent = 'Copy Address';
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
        }
      }, 2500);
    } catch (err) {
      // Fallback if clipboard API is restricted
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      if (copyText) {
        copyText.textContent = 'Copied!';
      }
      setTimeout(() => {
        if (copyText) {
          copyText.textContent = 'Copy Address';
        }
      }, 2500);
    }
  });
}
