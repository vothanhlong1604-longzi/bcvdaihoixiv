/**
 * Screen Context Collector
 * Thu thập và đồng bộ trạng thái trang, route và lightbox sang Store
 */

(function() {
  function getRouteInfo() {
    const hash = window.location.hash || '';
    let pageType = 'home';
    let resolutionId = null;

    if (hash.includes('nghi-quyet/')) {
      pageType = 'detail';
      const match = hash.match(/nghi-quyet\/([\w-]+)/);
      if (match) {
        resolutionId = match[1];
      }
    }

    return {
      type: pageType,
      route: hash,
      resolutionId: resolutionId
    };
  }

  function syncRoute() {
    const routeInfo = getRouteInfo();
    window.screenContextStore.updateState({
      page: routeInfo
    });
  }

  function setupLightboxObserver() {
    const lb = document.getElementById('lightbox');
    if (!lb) {
      // Thử lại sau nếu DOM chưa sẵn sàng
      setTimeout(setupLightboxObserver, 500);
      return;
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isActive = lb.classList.contains('active');
          if (isActive) {
            // Lightbox đang mở, lấy ảnh đang hiển thị
            const lbImg = document.getElementById('lightbox-img');
            if (lbImg && lbImg.src) {
              // Tìm ảnh gốc trong page có cùng src
              const srcUrl = lbImg.src;
              // So khớp src tương đối hoặc tuyệt đối
              const originalImgs = Array.from(document.querySelectorAll('img[data-ai-context="true"]'));
              const originalImg = originalImgs.find(img => {
                try {
                  return new URL(img.src).pathname === new URL(srcUrl).pathname;
                } catch(e) {
                  return img.getAttribute('src') === lbImg.getAttribute('src');
                }
              });

              if (originalImg) {
                const contextId = originalImg.getAttribute('data-context-id');
                window.screenContextStore.updateState({
                  interaction: { lightboxContextId: contextId },
                  visual: { activeImageContextId: contextId }
                });
              } else {
                window.screenContextStore.updateState({
                  interaction: { lightboxContextId: 'unknown-image' },
                  visual: { activeImageContextId: 'unknown-image' }
                });
              }
            }
          } else {
            // Lightbox đóng
            window.screenContextStore.updateState({
              interaction: { lightboxContextId: null },
              visual: { activeImageContextId: null }
            });
          }
        }
      });
    });

    observer.observe(lb, { attributes: true, attributeFilter: ['class'] });
  }

  // Khởi động lắng nghe
  window.addEventListener('hashchange', syncRoute);
  
  // Đồng bộ trạng thái ban đầu khi load trang
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      syncRoute();
      setupLightboxObserver();
    });
  } else {
    syncRoute();
    setupLightboxObserver();
  }
})();
