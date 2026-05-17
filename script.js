const header = document.querySelector('[data-header]');
const tabs = [...document.querySelectorAll('[data-menu-tab]')];
const panels = [...document.querySelectorAll('[data-menu-panel]')];
const tableChoices = [...document.querySelectorAll('[data-table-choice]')];
const tableImage = document.querySelector('[data-table-image]');
const tableKicker = document.querySelector('[data-table-kicker]');
const tableTitle = document.querySelector('[data-table-title]');
const tableCopy = document.querySelector('[data-table-copy]');
const plateFrame = document.querySelector('.plate-frame');
const moodChoices = [...document.querySelectorAll('[data-mood-choice]')];
const moodImages = [...document.querySelectorAll('[data-mood-image]')];
const moodHeading = document.querySelector('[data-mood-heading]');
const moodCopy = document.querySelector('[data-mood-copy]');
const nightChoices = [...document.querySelectorAll('[data-night-choice]')];
const nightImage = document.querySelector('[data-night-image]');
const nightKicker = document.querySelector('[data-night-kicker]');
const nightTitle = document.querySelector('[data-night-title]');
const nightCopy = document.querySelector('[data-night-copy]');
const consoleStage = document.querySelector('.console-stage');

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
  document.documentElement.style.setProperty('--cursor-page-x', Math.round((event.clientX / window.innerWidth) * 100) + '%');
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

if (moodImages.length) {
  document.body.dataset.mood = 'day';
  moodImages[0].classList.add('active');
}

moodChoices.forEach((choice) => {
  choice.addEventListener('click', () => {
    const mood = choice.dataset.moodChoice;
    document.body.dataset.mood = mood;
    moodChoices.forEach((item) => item.classList.toggle('active', item === choice));
    moodImages.forEach((image) => image.classList.toggle('active', image.dataset.moodImage === mood));
    if (moodHeading && moodCopy) {
      moodHeading.textContent = choice.dataset.heading;
      moodCopy.textContent = choice.dataset.copy;
    }
  });
});

nightChoices.forEach((choice) => {
  choice.addEventListener('click', () => {
    nightChoices.forEach((item) => item.classList.toggle('active', item === choice));
    consoleStage?.classList.add('changing');
    window.setTimeout(() => {
      if (nightImage) nightImage.src = choice.dataset.image;
      if (nightKicker) nightKicker.textContent = choice.dataset.kicker;
      if (nightTitle) nightTitle.textContent = choice.dataset.title;
      if (nightCopy) nightCopy.textContent = choice.dataset.copy;
      consoleStage?.classList.remove('changing');
    }, 120);
  });
});
