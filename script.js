const menuButton = document.querySelector('.mobile-menu-button');
const navLinks = document.querySelector('.nav-links');
if (menuButton) {
  menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      history.pushState(null, null, targetId);
    }
  });
});
const observeElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {threshold: 0.1});
  document.querySelectorAll('.process-step, .specialty-card, .gallery-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
};
document.addEventListener('DOMContentLoaded', () => {
  observeElements();
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 300)) {
        current = section.getAttribute('id');
      }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});