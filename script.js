const root = document.documentElement;
const progress = document.querySelector('.progress span');
const header = document.querySelector('[data-header]');
let lastY = 0;

const onScroll = () => {
  const y = window.scrollY;
  const max = root.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  header.classList.toggle('is-hidden', y > lastY && y > 180);
  lastY = Math.max(0, y);
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  observer.observe(element);
});
