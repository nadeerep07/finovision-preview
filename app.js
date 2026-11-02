/**
 * Finovision Business Solutions LLC — Client-Side Application Script
 * 
 * Features:
 * - Active navigation link highlighting for clean URLs (no .html extensions)
 * - Accessible mobile navigation drawer with keyboard and focus handling
 * - Viewport intersection observer for smooth scroll-reveal animations
 * - Client consultation request form handling and feedback states
 *
 * @version 1.1.0
 * @license Proprietary
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 0. MINIMAL LOGO PRELOADER (ONLY ON OPEN & REFRESH)
  // ==========================================
  const isReload = (performance.getEntriesByType('navigation')[0] || {}).type === 'reload';
  const isPageSwitch = sessionStorage.getItem('finovision_is_page_switch') === 'true';

  // Mark internal page switch so subsequent screens render immediately with zero loader
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (
      href &&
      !href.startsWith('#') &&
      !href.startsWith('mailto:') &&
      !href.startsWith('tel:') &&
      !href.startsWith('javascript:') &&
      anchor.target !== '_blank' &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.shiftKey
    ) {
      sessionStorage.setItem('finovision_is_page_switch', 'true');
    }
  });

  const preloader = document.getElementById('site-preloader');
  if (preloader) {
    if (isPageSwitch && !isReload) {
      // Switching between screens: remove immediately with zero delay
      preloader.remove();
    } else {
      // First open or refresh: show clean logo briefly and fade out
      sessionStorage.removeItem('finovision_is_page_switch');
      const startTime = performance.now();
      const DISPLAY_MS = 650;

      const dismissPreloader = () => {
        const elapsed = performance.now() - startTime;
        const delay = Math.max(0, DISPLAY_MS - elapsed);

        setTimeout(() => {
          preloader.classList.add('loaded');
          setTimeout(() => {
            if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
          }, 350);
        }, delay);
      };

      if (document.readyState === 'complete') {
        dismissPreloader();
      } else {
        window.addEventListener('load', dismissPreloader);
        setTimeout(dismissPreloader, 1500);
      }
    }
  }

  // ==========================================
  // 1. ACTIVE NAVIGATION LINK MATCHING
  // ==========================================
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  const navAnchors = document.querySelectorAll('.nav-links a:not(.button-finoza)');

  navAnchors.forEach((link) => {
    const linkHref = link.getAttribute('href');
    if (!linkHref) return;

    const normalizedHref = linkHref.replace(/\/$/, '') || '/';
    // Match exact path, or match without .html
    const cleanHref = normalizedHref.replace(/\.html$/, '');

    if (
      currentPath === cleanHref ||
      (currentPath === '/' && cleanHref === '/') ||
      (cleanHref !== '/' && currentPath.endsWith(cleanHref))
    ) {
      navAnchors.forEach((a) => a.classList.remove('active'));
      link.classList.add('active');
    }
  });

  // ==========================================
  // 2. FLOATING NAVIGATION ON SCROLL
  // ==========================================
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const onScroll = () => {
      if (window.scrollY > 25) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Run immediately on page load
  }

  // ==========================================
  // 3. MOBILE NAVIGATION DRAWER
  // ==========================================
  const menuButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuButton && navLinks) {
    const toggleNavigation = (forceClose = false) => {
      const isCurrentlyOpen = menuButton.getAttribute('aria-expanded') === 'true';
      const nextState = forceClose ? false : !isCurrentlyOpen;

      menuButton.setAttribute('aria-expanded', String(nextState));
      menuButton.setAttribute('aria-label', nextState ? 'Close navigation' : 'Open navigation');
      navLinks.classList.toggle('open', nextState);
      document.body.style.overflow = nextState ? 'hidden' : '';
    };

    menuButton.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleNavigation();
    });

    // Close navigation when a link is clicked
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggleNavigation(true);
      });
    });

    // Close navigation when 'Escape' key is pressed
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        toggleNavigation(true);
        menuButton.focus();
      }
    });

    // Close navigation when clicking outside of the drawer
    document.addEventListener('click', (e) => {
      if (
        menuButton.getAttribute('aria-expanded') === 'true' &&
        !navLinks.contains(e.target) &&
        !menuButton.contains(e.target)
      ) {
        toggleNavigation(true);
      }
    });
  }

  // ==========================================
  // 3. UNIFIED MODERN SCROLL & REVEAL ENGINE
  // ==========================================
  if ('IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver support
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('visible');
    });
  }

  // Subtle Executive Hero Scroll Depth (60fps requestAnimationFrame)
  const heroSection = document.querySelector('.finoza-hero');
  const heroLeft = document.querySelector('.hero-left');
  const heroCalcWrap = document.querySelector('.finoza-calculator-wrap');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (heroSection && heroLeft && heroCalcWrap && !prefersReducedMotion && window.innerWidth > 900) {
    let ticking = false;
    let heroVisible = true;

    const heroObserver = new IntersectionObserver((entries) => {
      heroVisible = entries[0].isIntersecting;
    }, { threshold: 0 });
    heroObserver.observe(heroSection);

    window.addEventListener('scroll', () => {
      if (!heroVisible || ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        if (scrolled < 700) {
          const textShift = (scrolled * 0.08).toFixed(1);
          const calcShift = (scrolled * 0.04).toFixed(1);
          const opacity = Math.max(0, 1 - scrolled / 980).toFixed(3);
          heroLeft.style.transform = `translate3d(0, ${textShift}px, 0)`;
          heroLeft.style.opacity = opacity;
          heroCalcWrap.style.transform = `translate3d(0, ${calcShift}px, 0)`;
        } else {
          heroLeft.style.transform = '';
          heroLeft.style.opacity = '';
          heroCalcWrap.style.transform = '';
        }
        ticking = false;
      });
    }, { passive: true });
  }

  // ==========================================
  // 4. CONSULTATION REQUEST FORM HANDLING (PRODUCTION DISPATCH)
  // ==========================================
  const forms = document.querySelectorAll('.contact-form');

  forms.forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const statusElement = form.querySelector('.form-status');
      const nameInput = form.querySelector('input[name="fullName"], input[type="text"]');
      const emailInput = form.querySelector('input[name="email"], input[type="email"]');
      const phoneInput = form.querySelector('input[name="phone"], input[type="tel"]');

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';

      // Basic validation
      if (!nameVal || !emailVal) {
        if (statusElement) {
          statusElement.textContent = 'Please fill in your name and corporate email address.';
          statusElement.style.color = '#ef4444';
          statusElement.style.fontWeight = '600';
        }
        return;
      }

      // Email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        if (statusElement) {
          statusElement.textContent = 'Please provide a valid corporate email format.';
          statusElement.style.color = '#ef4444';
          statusElement.style.fontWeight = '600';
        }
        return;
      }

      const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.75';
        submitBtn.innerHTML = '<span>Sending Message...</span>';
      }

      if (statusElement) {
        statusElement.textContent = 'Transmitting your inquiry securely to our team...';
        statusElement.style.color = '#a6d8c1';
        statusElement.style.fontWeight = '500';
      }

      const targetAction = form.getAttribute('action') && form.getAttribute('action') !== '#'
        ? form.getAttribute('action')
        : 'https://api.web3forms.com/submit';

      const formData = new FormData(form);
      if (!formData.has('access_key')) {
        formData.append('access_key', 'badaddf1-74ef-4956-9963-e1232f17048f');
      }
      if (!formData.has('subject')) {
        formData.append('subject', 'New Finovision UAE Client Consultation Inquiry');
      }
      if (!formData.has('from_name')) {
        formData.append('from_name', 'Finovision Web Portal');
      }

      try {
        const response = await fetch(targetAction, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok && data.success !== false) {
          if (statusElement) {
            statusElement.innerHTML = 'Consultation request received. A qualified Finovision specialist will contact you within 1 business day.<br><span style="font-size: 0.85em; opacity: 0.9;">Urgent assistance? <a href="https://wa.me/971503010675?text=Hello%20Finovision,%20I%20just%20submitted%20a%20consultation%20request%20on%20your%20website" target="_blank" rel="noopener noreferrer" style="color: #69f0ae; font-weight: 700; text-decoration: underline;">Direct line WhatsApp: +971 50 301 0675 &rarr;</a></span>';
            statusElement.style.color = '#10b981';
            statusElement.style.fontWeight = '600';
          }
          form.reset();
        } else {
          throw new Error('Server returned ' + response.status);
        }
      } catch (err) {
        // Fallback: Open prefilled mail client so lead is never lost
        const mailtoSubject = encodeURIComponent('Finovision Consultation Request - ' + nameVal);
        const mailtoBody = encodeURIComponent(
          'Dear Finovision Team,\n\nI would like to request a corporate consultation.\n\n' +
          'Name: ' + nameVal + '\n' +
          'Email: ' + emailVal + '\n' +
          'Phone: ' + (phoneVal || 'N/A') + '\n\n' +
          'Sent via Finovision UAE Web Portal'
        );
        const mailtoUrl = 'mailto:info@finovision.net?subject=' + mailtoSubject + '&body=' + mailtoBody;

        if (statusElement) {
          statusElement.innerHTML = 'Direct email dispatch opened. <a href="' + mailtoUrl + '" style="color: #69f0ae; font-weight: 700; text-decoration: underline;">Click here to send directly to info@finovision.net</a> or WhatsApp <a href="https://wa.me/971503010675" target="_blank" style="color: #69f0ae; font-weight: 700; text-decoration: underline;">+971 50 301 0675</a>.';
          statusElement.style.color = '#34d399';
        }
        window.location.href = mailtoUrl;
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
          submitBtn.innerHTML = originalBtnHTML;
        }
      }
    });
  });

  // ==========================================
  // 5. INTERACTIVE UAE CORPORATE TAX & VAT SIMULATOR
  // ==========================================
  const calcWrap = document.querySelector('.finoza-calculator-wrap');
  if (calcWrap) {
    const revenueSlider = calcWrap.querySelector('#calc-revenue-slider');
    const revenueDisplay = calcWrap.querySelector('#revenue-val-display');
    const profitDisplay = calcWrap.querySelector('#profit-val-display');
    const taxAmountDisplay = calcWrap.querySelector('#tax-amount-display');
    const taxStatusBadge = calcWrap.querySelector('#tax-status-badge');
    const taxNoteDisplay = calcWrap.querySelector('#tax-note-display');
    const vatStatusDisplay = calcWrap.querySelector('#vat-status-display');
    const vatNoteDisplay = calcWrap.querySelector('#vat-note-display');
    const einvStatusDisplay = calcWrap.querySelector('#einv-status-display');
    const einvNoteDisplay = calcWrap.querySelector('#einv-note-display');
    const jurisdictionBtns = calcWrap.querySelectorAll('.calc-toggle-btn');
    const presetBtns = calcWrap.querySelectorAll('.preset-pill');
    const marginBtns = calcWrap.querySelectorAll('.margin-pill');

    let currentJurisdiction = 'mainland';
    let currentRevenue = 1500000;
    let currentMargin = 0.20;

    const formatAED = (num) => {
      return 'AED ' + Math.round(num).toLocaleString('en-US');
    };

    const updateCalculator = () => {
      // 1. Calculate Profit
      const estimatedProfit = currentRevenue * currentMargin;

      // Update input displays
      if (revenueDisplay) revenueDisplay.textContent = formatAED(currentRevenue);
      if (profitDisplay) {
        profitDisplay.textContent = `${formatAED(estimatedProfit)} (${Math.round(currentMargin * 100)}%)`;
      }

      // 2. Calculate UAE Corporate Tax
      // Standard UAE CT Threshold: AED 375,000 at 0%, excess at 9%
      const THRESHOLD = 375000;
      let taxLiability = 0;

      if (currentJurisdiction === 'freezone') {
        // Designated Free Zone Qualifying Income Relief (0%)
        taxLiability = 0;
        if (taxAmountDisplay) taxAmountDisplay.textContent = 'AED 0';
        if (taxStatusBadge) {
          taxStatusBadge.className = 'result-status-badge freezone-relief';
          taxStatusBadge.textContent = '0% Qualifying Income Relief';
        }
        if (taxNoteDisplay) {
          const potentialTax = Math.max(0, (estimatedProfit - THRESHOLD) * 0.09);
          if (potentialTax > 0) {
            taxNoteDisplay.textContent = `Free Zone relief saves ${formatAED(potentialTax)}.`;
          } else {
            taxNoteDisplay.textContent = 'Qualifying Free Zone Persons enjoy 0% CT.';
          }
        }
      } else {
        // Mainland LLC
        if (estimatedProfit <= THRESHOLD) {
          taxLiability = 0;
          if (taxAmountDisplay) taxAmountDisplay.textContent = 'AED 0';
          if (taxStatusBadge) {
            taxStatusBadge.className = 'result-status-badge under-threshold';
            taxStatusBadge.textContent = '0% Under AED 375K Threshold';
          }
          if (taxNoteDisplay) {
            taxNoteDisplay.textContent = 'Statutory 0% profit threshold applied.';
          }
        } else {
          taxLiability = (estimatedProfit - THRESHOLD) * 0.09;
          if (taxAmountDisplay) taxAmountDisplay.textContent = formatAED(taxLiability);
          if (taxStatusBadge) {
            taxStatusBadge.className = 'result-status-badge taxable';
            taxStatusBadge.textContent = 'Standard 9% Corporate Tax';
          }
          if (taxNoteDisplay) {
            taxNoteDisplay.textContent = `Taxable excess: ${formatAED(estimatedProfit - THRESHOLD)}.`;
          }
        }
      }

      // 3. UAE VAT Threshold Rules
      if (currentRevenue >= 375000) {
        if (vatStatusDisplay) vatStatusDisplay.textContent = 'Mandatory Registration';
        if (vatNoteDisplay) vatNoteDisplay.textContent = 'Quarterly returns required via EmaraTax.';
      } else if (currentRevenue >= 187500) {
        if (vatStatusDisplay) vatStatusDisplay.textContent = 'Voluntary Eligible';
        if (vatNoteDisplay) vatNoteDisplay.textContent = 'Optional registration to reclaim input VAT.';
      } else {
        if (vatStatusDisplay) vatStatusDisplay.textContent = 'Registration Exempt';
        if (vatNoteDisplay) vatNoteDisplay.textContent = 'Below mandatory AED 375K turnover threshold.';
      }

      // 4. E-Invoicing Phase 2 Status
      if (einvStatusDisplay) einvStatusDisplay.textContent = 'Phase 2 Preparation';
      if (einvNoteDisplay) einvNoteDisplay.textContent = 'PEPPOL / XML format readiness for B2B.';
    };

    const resultsCard = calcWrap.querySelector('.calc-results-card');
    let calcTransitionTimer = null;

    const triggerRecalculation = (immediate = false) => {
      // Immediate calculation ensures values update cleanly with zero lag
      updateCalculator();

      if (immediate || !resultsCard) {
        if (resultsCard) resultsCard.classList.remove('is-calculating');
        return;
      }

      if (calcTransitionTimer) clearTimeout(calcTransitionTimer);
      resultsCard.classList.add('is-calculating');

      calcTransitionTimer = setTimeout(() => {
        resultsCard.classList.remove('is-calculating');
        calcTransitionTimer = null;
      }, 240);
    };

    // Event: Jurisdiction buttons
    jurisdictionBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetJurisdiction = btn.getAttribute('data-jurisdiction') || 'mainland';
        // PREVENT GLITCH: Do nothing if clicking already selected jurisdiction
        if (targetJurisdiction === currentJurisdiction && btn.classList.contains('active')) {
          return;
        }

        jurisdictionBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        currentJurisdiction = targetJurisdiction;
        triggerRecalculation(false);
      });
    });

    // Event: Revenue Slider
    if (revenueSlider) {
      revenueSlider.addEventListener('input', (e) => {
        currentRevenue = parseFloat(e.target.value) || 0;
        presetBtns.forEach((p) => {
          const val = parseFloat(p.getAttribute('data-preset'));
          p.classList.toggle('active', Math.abs(val - currentRevenue) < 25000);
        });
        triggerRecalculation(true);
      });

      revenueSlider.addEventListener('change', () => {
        triggerRecalculation(false);
      });
    }

    // Event: Preset Pills
    presetBtns.forEach((pill) => {
      pill.addEventListener('click', () => {
        const val = parseFloat(pill.getAttribute('data-preset')) || 1500000;
        if (val === currentRevenue && pill.classList.contains('active')) {
          return;
        }
        presetBtns.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        currentRevenue = val;
        if (revenueSlider) revenueSlider.value = String(val);
        triggerRecalculation(false);
      });
    });

    // Event: Profit Margin Pills
    marginBtns.forEach((pill) => {
      pill.addEventListener('click', () => {
        const val = parseFloat(pill.getAttribute('data-margin')) || 0.20;
        if (Math.abs(val - currentMargin) < 0.001 && pill.classList.contains('active')) {
          return;
        }
        marginBtns.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        currentMargin = val;
        triggerRecalculation(false);
      });
    });

    // Initial calculation run
    updateCalculator();
  }

  // -------------------------------------------------------------
  // Legal Document Table of Contents Smooth Jump
  // -------------------------------------------------------------
  const legalTocLinks = document.querySelectorAll('.legal-toc-grid a');
  legalTocLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      if (hash && hash.startsWith('#')) {
        const target = document.getElementById(hash.slice(1));
        if (target) {
          e.preventDefault();
          const offsetTop = target.getBoundingClientRect().top + window.scrollY - 110;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          if (history.pushState) {
            history.pushState(null, '', hash);
          }
        }
      }
    });
  });
});


