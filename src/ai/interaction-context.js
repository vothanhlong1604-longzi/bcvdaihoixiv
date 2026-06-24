/**
 * Interaction Context Tracker
 * Theo dõi click, chạm, bôi chọn văn bản và tương tác khác để lưu lại tiêu điểm tạm thời
 */

(function() {
  function handleDocumentClick(e) {
    // Tìm phần tử gần nhất có chứa thông tin ngữ cảnh
    const contextEl = e.target.closest('[data-ai-context="true"]');
    if (contextEl) {
      const contextId = contextEl.getAttribute('data-context-id');
      if (contextId) {
        window.screenContextStore.updateState({
          interaction: {
            lastClickedContextId: contextId
          }
        });
      }
    }
  }

  let selectionTimeout = null;

  function handleSelectionChange() {
    // Debounce xử lý selection để không làm chậm luồng chính
    if (selectionTimeout) clearTimeout(selectionTimeout);
    
    selectionTimeout = setTimeout(() => {
      const selection = window.getSelection();
      const selectedText = selection.toString().trim();

      if (selectedText.length > 0) {
        // Tìm element chứa điểm bắt đầu của vùng bôi chọn
        let anchorNode = selection.anchorNode;
        if (anchorNode) {
          let parentEl = anchorNode.nodeType === 3 ? anchorNode.parentElement : anchorNode;
          const contextEl = parentEl.closest('[data-ai-context="true"]');
          const contextId = contextEl ? contextEl.getAttribute('data-context-id') : null;

          window.screenContextStore.updateState({
            interaction: {
              selectedText: selectedText,
              selectedContextId: contextId
            }
          });
          return;
        }
      }

      // Nếu không có selection hoặc selection trống
      const currentState = window.screenContextStore.getState();
      if (currentState.interaction.selectedText) {
        window.screenContextStore.updateState({
          interaction: {
            selectedText: '',
            selectedContextId: null
          }
        });
      }
    }, 200);
  }

  // Lắng nghe sự kiện click trên toàn trang
  document.addEventListener('click', handleDocumentClick, { passive: true });
  document.addEventListener('touchend', handleDocumentClick, { passive: true });

  // Lắng nghe sự kiện bôi chọn văn bản
  document.addEventListener('selectionchange', handleSelectionChange, { passive: true });
})();
