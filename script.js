const header = document.querySelector('[data-header]');
const tabs = [...document.querySelectorAll('[data-menu-tab]')];
const panels = [...document.querySelectorAll('[data-menu-panel]')];
const tableChoices = [...document.querySelectorAll('[data-table-choice]')];
const tableImage = document.querySelector('[data-table-image]');
const tableKicker = document.querySelector('[data-table-kicker]');
const tableTitle = document.querySelector('[data-table-title]');
const tableCopy = document.querySelector('[data-table-copy]');
const plateFrame = document.querySelector('.plate-frame');

const updateHeader = () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? window.scrollY / max : 0;
  document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
};

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

window.addEventListener('pointermove', (event) => {
  document.documentElement.style.setProperty('--cursor-x', (event.clientX - 140) + 'px');
  document.documentElement.style.setProperty('--cursor-y', (event.clientY - 140) + 'px');
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('section, figure, .menu-panel article, .path-grid article').forEach((node) => {
  node.setAttribute('data-reveal', '');
  revealObserver.observe(node);
});

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.menuTab;
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    panels.forEach((panel) => {
      panel.classList.toggle('active', panel.dataset.menuPanel === target);
    });
  });
});

tableChoices.forEach((choice) => {
  choice.addEventListener('click', () => {
    tableChoices.forEach((item) => item.classList.toggle('active', item === choice));
    plateFrame?.classList.add('changing');
    window.setTimeout(() => {
      tableImage.src = choice.dataset.image;
      tableKicker.textContent = choice.dataset.kicker;
      tableTitle.textContent = choice.dataset.title;
      tableCopy.textContent = choice.dataset.copy;
      plateFrame?.classList.remove('changing');
    }, 140);
  });
});
