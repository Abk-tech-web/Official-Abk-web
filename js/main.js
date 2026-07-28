/* ==========================================================================
   ABK Tech NG — Main
   Nav scroll state, scroll-reveal, portfolio filter, and form submission.
   Loaded on every page — each block guards for the elements it needs,
   so it's safe to include site-wide.
   ========================================================================== */

// ── Header blur-on-scroll ───────────────────────────────────────────────
const header = document.getElementById('site-header');
if(header){
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ── Mobile menu ─────────────────────────────────────────────────────────
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
if(menuToggle && mobileMenu){
  function closeMenu(){
    mobileMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }
  function openMenu(){
    mobileMenu.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  }
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if(window.innerWidth > 720) closeMenu(); });
}

// ── Scroll reveal ───────────────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
if(revealEls.length){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
}

// ── Portfolio filter (portfolio.html only) ─────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const caseCards = document.querySelectorAll('.case-card');
if(filterBtns.length && caseCards.length){
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      caseCards.forEach(card => {
        card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
      });
    });
  });
}

// ── Forms: Formspree submission with mailto fallback ───────────────────
// SETUP:
// 1. Create a free account at https://formspree.io
// 2. Create a form pointed at abktechng@gmail.com
// 3. Copy the endpoint (looks like https://formspree.io/f/xxxxxxxx) and
//    paste it below, replacing FORM_ENDPOINT's value.
// Both the contact form and the newsletter signup post to the same
// endpoint — a hidden "form_type" field tells them apart in your inbox.
// Until FORM_ENDPOINT is set, submissions fall back to opening a
// pre-filled email to abktechng@gmail.com, so neither form dead-ends.
const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

function mailtoFallback(formData, subjectPrefix){
  const subject = encodeURIComponent(subjectPrefix + ' — ' + (formData.get('name') || formData.get('email') || ''));
  const lines = [];
  formData.forEach((value, key) => {
    if(key !== 'form_type') lines.push(`${key}: ${value}`);
  });
  const body = encodeURIComponent(lines.join('\n'));
  window.location.href = `mailto:abktechng@gmail.com?subject=${subject}&body=${body}`;
}

async function submitForm(formData){
  if(FORM_ENDPOINT.includes('YOUR_FORM_ID')){
    return { ok: false, notConfigured: true };
  }
  try{
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });
    return { ok: res.ok };
  } catch(err){
    return { ok: false };
  }
}

// Contact form (contact.html)
const contactForm = document.getElementById('contact-form');
if(contactForm){
  const successState = document.getElementById('success-state');
  const submitBtn = document.getElementById('submit-btn');

  function validateField(fieldEl){
    const input = fieldEl.querySelector('input, select, textarea');
    const name = fieldEl.dataset.field;
    let valid = true;
    if(name === 'name') valid = input.value.trim().length > 1;
    if(name === 'email') valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
    if(name === 'service') valid = input.value !== '';
    if(name === 'message') valid = input.value.trim().length > 8;
    fieldEl.classList.toggle('invalid', !valid);
    return valid;
  }

  contactForm.addEventListener('submit', async function(e){
    e.preventDefault();
    const requiredFields = contactForm.querySelectorAll(
      '.field[data-field="name"], .field[data-field="email"], .field[data-field="service"], .field[data-field="message"]'
    );
    let allValid = true;
    requiredFields.forEach(f => { if(!validateField(f)) allValid = false; });
    if(!allValid) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    const formData = new FormData(contactForm);
    const result = await submitForm(formData);

    if(result.ok){
      contactForm.style.display = 'none';
      successState.classList.add('show');
    } else {
      mailtoFallback(formData, 'New project enquiry');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message →';
    }
  });

  contactForm.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('blur', () => {
      const fieldEl = el.closest('.field');
      if(fieldEl.dataset.field !== 'company') validateField(fieldEl);
    });
  });
}

// Newsletter form (blog.html)
const newsletterForm = document.getElementById('newsletter-form');
if(newsletterForm){
  newsletterForm.addEventListener('submit', async function(e){
    e.preventDefault();
    const btn = newsletterForm.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    const formData = new FormData(newsletterForm);
    const result = await submitForm(formData);

    if(result.ok){
      btn.textContent = 'Subscribed ✓';
      newsletterForm.reset();
    } else {
      mailtoFallback(formData, 'Newsletter signup');
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
}
