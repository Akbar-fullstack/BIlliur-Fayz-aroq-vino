  const burger = document.getElementById('burgerBtn');
const nav = document.getElementById('mainNav');

if (burger && nav) {
  const setMenuState = (isOpen) => {
    nav.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  };

  burger.addEventListener('click', () => {
    setMenuState(!nav.classList.contains('open'));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) {
      setMenuState(false);
    }
  });
}

const header = document.getElementById('siteHeader');
if (header) {
  const updateHeader = () => {
    header.style.boxShadow = window.scrollY > 20 ? '0 10px 30px -20px rgba(0,0,0,.25)' : 'none';
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el) => io.observe(el));
}

const productCards = document.querySelectorAll('.product-card');
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

if (productCards.length && !isTouchDevice) {
  productCards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 8;
      const rotateX = ((y / rect.height) - 0.5) * -8;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
