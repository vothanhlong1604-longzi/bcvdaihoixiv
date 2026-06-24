/**
 * Viewport Focus Engine
 * Theo dõi vị trí hiển thị của các khối nội dung, tính điểm tập trung và cập nhật Store
 */

(function() {
  let io = null;
  let scrollTimeout = null;
  let observedElements = new Set();
  
  // Lưu thời điểm bắt đầu xuất hiện trong viewport để tính dwell time
  const elementDwellStarts = new Map();

  function initObserver() {
    if (io) {
      io.disconnect();
      observedElements.clear();
    }

    const options = {
      root: null, // Viewport
      rootMargin: '0px',
      threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    };

    io = new IntersectionObserver((entries) => {
      const now = Date.now();
      const visibilityRatio = { ...window.screenContextStore.getState().viewport.visibilityRatio };
      
      entries.forEach(entry => {
        const el = entry.target;
        const contextId = el.getAttribute('data-context-id');
        if (!contextId) return;

        visibilityRatio[contextId] = entry.intersectionRatio;

        if (entry.isIntersecting) {
          if (!elementDwellStarts.has(contextId)) {
            elementDwellStarts.set(contextId, now);
          }
        } else {
          elementDwellStarts.delete(contextId);
          delete visibilityRatio[contextId];
        }
      });

      const visibleContextIds = Object.keys(visibilityRatio).filter(id => visibilityRatio[id] > 0.05);

      window.screenContextStore.updateState({
        viewport: {
          visibleContextIds: visibleContextIds,
          visibilityRatio: visibilityRatio
        }
      });

      triggerDebouncedUpdate();
    }, options);

    observeElements();
  }

  function observeElements() {
    const elements = document.querySelectorAll('[data-ai-context="true"]');
    console.log(`[FocusEngine] observeElements querySelectorAll count: ${elements.length}`);
    elements.forEach(el => {
      const contextId = el.getAttribute('data-context-id');
      if (contextId && !observedElements.has(el)) {
        io.observe(el);
        observedElements.add(el);
      }
    });
  }

  function triggerDebouncedUpdate() {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(calculatePrimaryFocus, 700);
  }

  function calculatePrimaryFocus() {
    const state = window.screenContextStore.getState();
    const visibleIds = state.viewport.visibleContextIds;
    const ratioMap = state.viewport.visibilityRatio;

    const isPresenter = document.body.classList.contains('presenter-mode');

    if (visibleIds.length === 0) {
      window.screenContextStore.updateState({
        viewport: { primaryContextId: null },
        presentation: {
          enabled: isPresenter,
          activeSectionId: null,
          activeItemIndex: null
        }
      });
      return;
    }

    const viewportHeight = window.innerHeight;
    const viewportCenterY = viewportHeight / 2;
    const now = Date.now();

    let bestScore = -1;
    let bestId = null;

    visibleIds.forEach(id => {
      const el = document.querySelector(`[data-context-id="${id}"]`);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const elCenterY = rect.top + rect.height / 2;
      
      const distFromCenter = Math.abs(elCenterY - viewportCenterY);
      const normalizedDist = Math.max(0, 1 - distFromCenter / (viewportHeight || 1));

      const ratio = ratioMap[id] || 0;

      const dwellStart = elementDwellStarts.get(id) || now;
      const dwellTime = Math.min((now - dwellStart) / 1000, 5);
      const dwellBonus = dwellTime * 0.1;

      const isLastClicked = state.interaction.lastClickedContextId === id;
      const clickBonus = isLastClicked ? 1.0 : 0.0;

      const score = (normalizedDist * 0.5) + (ratio * 0.5) + dwellBonus + clickBonus;

      if (score > bestScore) {
        bestScore = score;
        bestId = id;
      }
    });

    let activeSecId = null;
    let activeIdx = null;

    if (isPresenter && bestId) {
      const bestEl = document.querySelector(`[data-context-id="${bestId}"]`);
      if (bestEl) {
        activeSecId = bestEl.getAttribute('data-section-id');
        const idxStr = bestEl.getAttribute('data-item-index');
        if (idxStr !== null) {
          activeIdx = parseInt(idxStr, 10);
        }
      }
    }

    window.screenContextStore.updateState({
      viewport: {
        primaryContextId: bestId
      },
      presentation: {
        enabled: isPresenter,
        activeSectionId: activeSecId,
        activeItemIndex: activeIdx
      }
    });
  }

  function setupMutationObserver() {
    const appContainer = document.getElementById('app');
    if (!appContainer) {
      setTimeout(setupMutationObserver, 500);
      return;
    }

    const observer = new MutationObserver((mutations) => {
      let shouldObserve = false;
      mutations.forEach(m => {
        if (m.type === 'childList') shouldObserve = true;
        if (m.type === 'attributes' && m.attributeName === 'class') {
          shouldObserve = true;
        }
      });
      console.log(`[FocusEngine] MutationObserver triggered, shouldObserve: ${shouldObserve}`);
      if (shouldObserve && io) {
        observeElements();
        setTimeout(calculatePrimaryFocus, 100);
      }
    });

    observer.observe(appContainer, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });
  }

  // Theo dõi đổi class của body để nhận biết chế độ trình chiếu lập tức
  function setupBodyClassObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'class') {
          calculatePrimaryFocus();
        }
      });
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

  // Khởi động
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initObserver();
      setupMutationObserver();
      setupBodyClassObserver();
    });
  } else {
    initObserver();
    setupMutationObserver();
    setupBodyClassObserver();
  }

  window.addEventListener('scroll', triggerDebouncedUpdate, { capture: true, passive: true });
  window.viewportFocusEngine = { calculatePrimaryFocus, observedElements };
})();
