/* =============================================
   COSINE TECHNOLOGIES — site behavior
   - Mobile nav toggle
   - Close mobile menu on link click
   - Contact form handling (front-end only by default)
   ============================================= */

(function () {
  'use strict';

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector('.nav-mobile-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close the menu after tapping a link (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Contact form ----
     By default this just shows a success state in the browser.
     To send real emails, follow "Part 5" in the README to wire up Formspree.
  */
  var formBtn = document.querySelector('.contact-form-card .btn-primary');

  if (formBtn) {
    formBtn.addEventListener('click', function (e) {
      e.preventDefault();

      var name = (document.getElementById('name') || {}).value || '';
      var email = (document.getElementById('email') || {}).value || '';

      if (!name.trim() || !email.trim()) {
        alert('Please enter your name and work email so we can get back to you.');
        return;
      }

      formBtn.textContent = '✓ Request Received — We\'ll be in touch!';
      formBtn.style.background = '#10B981';
      formBtn.disabled = true;
    });
  }
})();
