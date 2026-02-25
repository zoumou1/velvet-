/* ============================================
   VELVET — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky Header Shadow on Scroll ---
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // --- Mobile Navigation ---
  const hamburger = document.querySelector('.header__hamburger');
  const nav = document.querySelector('.header__nav');
  const overlay = document.querySelector('.nav-overlay');

  function closeNav() {
    hamburger?.classList.remove('active');
    nav?.classList.remove('open');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openNav() {
    hamburger?.classList.add('active');
    nav?.classList.add('open');
    overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  hamburger?.addEventListener('click', () => {
    if (nav?.classList.contains('open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  overlay?.addEventListener('click', closeNav);

  // Close nav on link click (mobile)
  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // --- Scroll-Triggered Fade-In Animations ---
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));
  }

  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item__question');

  faqItems.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const isActive = item.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.faq-item.active').forEach(activeItem => {
        activeItem.classList.remove('active');
      });

      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Custom Order — Send Description to WhatsApp ---
  const customOrderBtn = document.getElementById('custom-order-send');
  const customOrderText = document.getElementById('custom-order-text');

  if (customOrderBtn && customOrderText) {
    customOrderBtn.addEventListener('click', () => {
      const text = customOrderText.value.trim();
      if (!text) {
        customOrderText.style.borderColor = '#e74c3c';
        customOrderText.setAttribute('placeholder', 'Veuillez décrire votre produit personnalisé...');
        customOrderText.focus();
        setTimeout(() => {
          customOrderText.style.borderColor = '';
        }, 2000);
        return;
      }
      const message = encodeURIComponent(text);
      window.open(`https://wa.me/21693064637?text=${message}`, '_blank');
    });
  }

  // --- Scroll to Top on Page Load ---
  window.scrollTo(0, 0);

  // --- Mobile Deep Linking (Force App Open) ---
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    document.querySelectorAll('a').forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      // WhatsApp: Force app scheme
      if (href.includes('wa.me/')) {
        try {
          const url = new URL(href);
          const phone = url.pathname.replace('/', '');
          const text = url.searchParams.get('text');
          link.href = `whatsapp://send?phone=${phone}&text=${text ? encodeURIComponent(text) : ''}`;
        } catch (e) {
          // Log error or ignore
        }
      }

      // Instagram Profile: Force app scheme
      if (href.includes('instagram.com/velvetlight2026')) {
        link.href = 'instagram://user?username=velvetlight2026';
      }

      // Facebook Profile: Force app scheme
      if (href.includes('facebook.com/profile.php?id=61587530817712')) {
        link.href = 'fb://profile/61587530817712';
      }

      // Messenger: Force app scheme
      if (href.includes('m.me/61587530817712')) {
        link.href = 'fb-messenger://user-thread/61587530817712';
      }
    });
  }

});
