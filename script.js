/* =========================================
   걍골라! Landing Page — script.js
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV SCROLL BEHAVIOR ── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });


  /* ── MOBILE BURGER MENU ── */
  const burger = document.getElementById('burger');

  // create mobile menu dynamically
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';
  mobileMenu.innerHTML = `
    <a href="#brand" data-mobile>Brand</a>
    <a href="#characters" data-mobile>Characters</a>
    <a href="#product" data-mobile>Collection</a>
    <a href="#contact" data-mobile>방문</a>
  `;
  document.body.appendChild(mobileMenu);

  burger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen);
    // animate burger → X
    const spans = burger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(8px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // close menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      const spans = burger.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });


  /* ── CHARACTER LIST INTERACTION ── */
  const items = document.querySelectorAll('.meet__item');
  const displayChar = document.getElementById('displayChar');
  const displayName = document.getElementById('displayName');
  const displayDesc = document.getElementById('displayDesc');
  const charNumber  = document.querySelector('.meet__char-number');

  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      // animate out
      displayChar.style.transform = 'scale(0.7)';
      displayChar.style.opacity = '0';
      displayName.style.opacity = '0';
      displayDesc.style.opacity = '0';

      setTimeout(() => {
        displayChar.textContent = item.dataset.icon;
        displayName.textContent = item.dataset.name;
        displayDesc.textContent = item.dataset.desc;
        charNumber.textContent  = item.dataset.num;

        displayChar.style.transform = 'scale(1.15)';
        displayChar.style.opacity = '1';
        displayName.style.opacity = '1';
        displayDesc.style.opacity = '1';

        setTimeout(() => {
          displayChar.style.transform = 'scale(1)';
        }, 120);
      }, 180);
    });
  });

  // CSS transitions for the character display
  [displayChar, displayName, displayDesc].forEach(el => {
    el.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
  });


  /* ── SCROLL REVEAL ── */
  // Add .reveal class to elements we want to animate in
  const revealTargets = [
    '.brand__left',
    '.brand__right',
    '.meet__left',
    '.meet__right',
    '.product__header',
    '.product__card',
    '.cta__content',
    '.footer__brand',
    '.footer__nav',
  ];

  revealTargets.forEach((selector, si) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      if (i > 0 || si % 2 === 1) el.classList.add(`reveal-delay-${Math.min(i + 1, 3)}`);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


  /* ── HERO CHARACTERS HOVER TOOLTIP ── */
  const chars = document.querySelectorAll('.char');
  chars.forEach(char => {
    char.addEventListener('mouseenter', () => {
      char.style.zIndex = '10';
    });
    char.addEventListener('mouseleave', () => {
      char.style.zIndex = '';
    });
  });


  /* ── CATCHPHRASE MARQUEE (duplicate for seamless loop) ── */
  const marquee = document.querySelector('.catchphrase__marquee');
  if (marquee) {
    const original = marquee.innerHTML;
    // triple it so animation is seamless
    marquee.innerHTML = original + original + original;
  }


  /* ── BRAND BIG BTN INTERACTION ── */
  const bigBtn = document.querySelector('.brand__big-btn');
  if (bigBtn) {
    bigBtn.addEventListener('click', () => {
      bigBtn.style.transform = 'scale(0.92)';
      bigBtn.style.boxShadow = '2px 2px 0 var(--black)';
      setTimeout(() => {
        bigBtn.style.transform = '';
        bigBtn.style.boxShadow = '';
        // scroll to characters
        document.getElementById('characters')?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    });
  }


  /* ── PRODUCT CARD HOVER TILT ── */
  const cards = document.querySelectorAll('.product__card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translate(-4px, -4px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  /* ── CURSOR CUSTOM (desktop) ── */
  if (window.matchMedia('(hover: hover)').matches) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      width: 10px; height: 10px;
      background: #FFD000;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: transform 0.1s, opacity 0.2s;
      mix-blend-mode: multiply;
    `;
    document.body.appendChild(dot);

    document.addEventListener('mousemove', e => {
      dot.style.left = e.clientX + 'px';
      dot.style.top  = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .char, .meet__item, .brand__big-btn').forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.style.transform = 'translate(-50%, -50%) scale(3.5)';
        dot.style.opacity = '0.5';
      });
      el.addEventListener('mouseleave', () => {
        dot.style.transform = 'translate(-50%, -50%) scale(1)';
        dot.style.opacity = '1';
      });
    });
  }


  /* ── AUTO-CYCLE CHARACTERS every 3s ── */
  let currentIndex = 0;
  const itemsArr = Array.from(items);

  setInterval(() => {
    // only auto-cycle if user's mouse isn't over the character list
    const next = (currentIndex + 1) % itemsArr.length;
    itemsArr[next].click();
    currentIndex = next;
  }, 3000);

  // reset cycle on manual click
  items.forEach((item, i) => {
    item.addEventListener('click', () => { currentIndex = i; });
  });

});
