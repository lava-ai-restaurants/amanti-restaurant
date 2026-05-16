const header = document.querySelector('[data-header]');
const tabs = [...document.querySelectorAll('[data-menu-tab]')];
const panels = [...document.querySelectorAll('[data-menu-panel]')];

const updateHeader = () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
};

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

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
