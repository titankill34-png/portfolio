(() => {
  'use strict';

  const BASE_WIDTH = 1366;
  const BASE_HEIGHT = 768;
  const slides = [...document.querySelectorAll('.slide')];
  const total = slides.length;
  const deck = document.getElementById('deck');
  const progressBar = document.getElementById('progress-bar');
  const currentSlide = document.getElementById('current-slide');
  const announcer = document.getElementById('slide-announcer');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const previewMode = new URLSearchParams(location.search).has('preview');
  let index = 0;
  let previousIndex = 0;
  let revealTimers = [];
  let animationFrame = 0;
  let flowTimer = 0;
  let scenarioTimers = [];
  let flowStep = 1;
  let touchStart = { x: 0, y: 0 };

  const pad = value => String(value).padStart(2, '0');

  function fitDeck() {
    const viewport = window.visualViewport;
    const width = viewport ? viewport.width : window.innerWidth;
    const height = viewport ? viewport.height : window.innerHeight;
    const scale = Math.min(width / BASE_WIDTH, height / BASE_HEIGHT);
    deck.style.setProperty('--deck-scale', String(scale));
  }

  function clearTimedWork() {
    revealTimers.forEach(window.clearTimeout);
    scenarioTimers.forEach(window.clearTimeout);
    revealTimers = [];
    scenarioTimers = [];
    window.cancelAnimationFrame(animationFrame);
    window.clearInterval(flowTimer);
  }

  function revealSlide(slide) {
    const items = [...slide.querySelectorAll('[data-reveal]')];
    items.forEach(item => item.classList.remove('is-revealed'));
    items.forEach((item, itemIndex) => {
      if (reducedMotion.matches || previewMode) {
        item.classList.add('is-revealed');
      } else {
        revealTimers.push(window.setTimeout(() => item.classList.add('is-revealed'), 90 + itemIndex * 105));
      }
    });
  }

  function animateCounts(slide) {
    const counters = [...slide.querySelectorAll('.count-up')];
    if (!counters.length) return;
    const start = performance.now();
    const duration = reducedMotion.matches || previewMode ? 0 : 1300;
    const tick = now => {
      const ratio = duration ? Math.min(1, (now - start) / duration) : 1;
      const eased = 1 - Math.pow(1 - ratio, 4);
      counters.forEach(counter => {
        const target = Number(counter.dataset.value);
        const decimals = Number(counter.dataset.decimals || 0);
        counter.textContent = (target * eased).toFixed(decimals);
      });
      if (ratio < 1) animationFrame = window.requestAnimationFrame(tick);
    };
    animationFrame = window.requestAnimationFrame(tick);
  }

  function setFlowStep(step) {
    flowStep = step > 5 ? 1 : Math.max(1, step);
    document.querySelectorAll('[data-flow] li').forEach((item, itemIndex) => {
      const number = itemIndex + 1;
      item.classList.toggle('is-current', number === flowStep);
      item.classList.toggle('is-done', number < flowStep);
    });
  }

  function startFlow() {
    setFlowStep(1);
    if (reducedMotion.matches || previewMode) {
      document.querySelectorAll('[data-flow] li').forEach(item => item.classList.add('is-done'));
      return;
    }
    flowTimer = window.setInterval(() => setFlowStep(flowStep + 1), 1550);
  }

  function startScenario() {
    const scenes = [...document.querySelectorAll('[data-scenario] [data-scene]')];
    scenes.forEach(scene => scene.classList.remove('is-live'));
    if (reducedMotion.matches || previewMode) {
      scenes.forEach(scene => scene.classList.add('is-live'));
      return;
    }
    scenes.forEach((scene, sceneIndex) => {
      scenarioTimers.push(window.setTimeout(() => scene.classList.add('is-live'), 350 + sceneIndex * 780));
    });
  }

  function activateSlide(nextIndex, direction = 1, replaceHash = true) {
    const bounded = Math.max(0, Math.min(total - 1, nextIndex));
    if (bounded === index && slides[bounded].classList.contains('is-active')) return;
    clearTimedWork();
    previousIndex = index;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('was-active', slideIndex === previousIndex && direction > 0);
      slide.classList.toggle('is-active', slideIndex === bounded);
      slide.setAttribute('aria-hidden', String(slideIndex !== bounded));
    });
    index = bounded;
    currentSlide.textContent = pad(index + 1);
    progressBar.style.width = `${((index + 1) / total) * 100}%`;
    announcer.textContent = `สไลด์ ${index + 1} จาก ${total}: ${slides[index].dataset.title}`;
    revealSlide(slides[index]);
    animateCounts(slides[index]);
    if (slides[index].querySelector('[data-flow]')) startFlow();
    if (slides[index].querySelector('[data-scenario]')) startScenario();
    if (replaceHash) history.replaceState(null, '', `#slide-${index + 1}`);
  }

  const next = () => activateSlide(index + 1, 1);
  const previous = () => activateSlide(index - 1, -1);

  function isInteractiveTarget(target) {
    return Boolean(target.closest('[data-no-nav], button, input, label, a, select, textarea'));
  }

  document.getElementById('next-slide').addEventListener('click', event => { event.stopPropagation(); next(); });
  document.getElementById('prev-slide').addEventListener('click', event => { event.stopPropagation(); previous(); });

  document.addEventListener('keydown', event => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) && !['Escape', 'f', 'F', 'h', 'H'].includes(event.key)) return;
    if (document.activeElement?.matches('button') && (event.key === ' ' || event.key === 'Enter')) return;
    const forwardKeys = ['ArrowRight', 'ArrowDown', 'PageDown', ' '];
    const backwardKeys = ['ArrowLeft', 'ArrowUp', 'PageUp'];
    if (forwardKeys.includes(event.key)) { event.preventDefault(); next(); }
    if (backwardKeys.includes(event.key)) { event.preventDefault(); previous(); }
    if (event.key === 'Home') { event.preventDefault(); activateSlide(0, -1); }
    if (event.key === 'End') { event.preventDefault(); activateSlide(total - 1, 1); }
    if (event.key.toLowerCase() === 'f') { event.preventDefault(); toggleFullscreen(); }
    if (event.key.toLowerCase() === 'h') { event.preventDefault(); togglePresenterUI(); }
  });

  deck.addEventListener('click', event => {
    if (isInteractiveTarget(event.target)) return;
    const rect = deck.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width;
    relativeX < .38 ? previous() : next();
  });

  deck.addEventListener('touchstart', event => {
    const touch = event.changedTouches[0];
    touchStart = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });

  deck.addEventListener('touchend', event => {
    if (isInteractiveTarget(event.target)) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    if (Math.abs(deltaX) > 55 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      deltaX < 0 ? next() : previous();
    }
  }, { passive: true });

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
      else await document.exitFullscreen();
    } catch (_) {
      announcer.textContent = 'เบราว์เซอร์นี้ไม่อนุญาตโหมดเต็มหน้าจอ';
    }
  }

  function togglePresenterUI(forceVisible = false) {
    if (forceVisible) deck.classList.remove('ui-hidden');
    else deck.classList.toggle('ui-hidden');
  }

  document.getElementById('fullscreen').addEventListener('click', event => { event.stopPropagation(); toggleFullscreen(); });
  document.getElementById('toggle-ui').addEventListener('click', event => { event.stopPropagation(); togglePresenterUI(); });
  document.getElementById('restore-ui').addEventListener('click', event => { event.stopPropagation(); togglePresenterUI(true); });
  document.querySelector('[data-flow-next]')?.addEventListener('click', event => {
    event.stopPropagation();
    window.clearInterval(flowTimer);
    setFlowStep(flowStep + 1);
  });
  document.querySelector('[data-scenario-replay]')?.addEventListener('click', event => {
    event.stopPropagation();
    scenarioTimers.forEach(window.clearTimeout);
    scenarioTimers = [];
    startScenario();
  });

  if (!reducedMotion.matches) {
    document.addEventListener('pointermove', event => {
      const x = (event.clientX / window.innerWidth - .5) * 2;
      const y = (event.clientY / window.innerHeight - .5) * 2;
      slides[index].querySelectorAll('[data-product-view]').forEach((view, viewIndex) => {
        const image = view.querySelector('img');
        if (image) image.style.translate = `${x * (viewIndex + 1) * 4}px ${y * (viewIndex + 1) * 3}px`;
      });
    }, { passive: true });
  }

  window.addEventListener('resize', fitDeck, { passive: true });
  window.visualViewport?.addEventListener('resize', fitDeck, { passive: true });
  reducedMotion.addEventListener?.('change', () => activateSlide(index, 1, false));
  window.addEventListener('hashchange', () => {
    const requested = Number(location.hash.replace('#slide-', ''));
    if (Number.isInteger(requested) && requested >= 1 && requested <= total) activateSlide(requested - 1, requested > index ? 1 : -1, false);
  });

  const requested = Number(location.hash.replace('#slide-', ''));
  index = Number.isInteger(requested) && requested >= 1 && requested <= total ? requested - 1 : 0;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('is-active', slideIndex === index);
    slide.setAttribute('aria-hidden', String(slideIndex !== index));
  });
  currentSlide.textContent = pad(index + 1);
  progressBar.style.width = `${((index + 1) / total) * 100}%`;
  fitDeck();
  if (previewMode) deck.classList.add('ui-hidden', 'preview-mode');
  revealSlide(slides[index]);
  animateCounts(slides[index]);
  if (slides[index].querySelector('[data-flow]')) startFlow();
  if (slides[index].querySelector('[data-scenario]')) startScenario();
})();
