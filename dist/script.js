const root = document.documentElement;
const progress = document.querySelector('.progress span');

// Keep the current section when moving between the two language editions.
document.querySelectorAll('[data-language-link]').forEach((link) => {
  link.addEventListener('click', () => {
    const target = new URL(link.href);
    target.hash = window.location.hash;
    link.href = target.href;
  });
});

const onScroll = () => {
  const y = window.scrollY;
  const max = root.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
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

const numberElements = document.querySelectorAll('[data-type-number]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion) {
  const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const value = element.dataset.typeNumber;
      element.setAttribute('aria-label', value);
      element.textContent = '';
      element.classList.add('is-typing');

      let index = 0;
      window.setTimeout(() => {
        const timer = window.setInterval(() => {
          element.textContent += value[index];
          index += 1;

          if (index === value.length) {
            window.clearInterval(timer);
            window.setTimeout(() => element.classList.remove('is-typing'), 420);
          }
        }, 260);
      }, 180);

      numberObserver.unobserve(element);
    });
  }, { threshold: 0.55 });

  numberElements.forEach((element) => numberObserver.observe(element));
}
