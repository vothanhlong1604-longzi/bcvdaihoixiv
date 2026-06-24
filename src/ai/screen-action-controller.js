/**
 * Screen Action Controller
 * Thực thi các lệnh điều khiển giao diện do AI yêu cầu (cuộn, highlight, mở ảnh)
 */

class ScreenActionController {
  static lastHighlighted = null;

  static execute(actions) {
    // Xác thực an toàn các hành động
    const validated = window.contextValidator.validateActions(actions);

    validated.forEach(action => {
      try {
        switch (action.type) {
          case 'focus_context':
          case 'highlight_context':
            this.highlightAndScroll(action.contextId);
            break;
          case 'open_image':
            this.openImage(action.contextId);
            break;
          case 'clear_highlight':
            this.clearHighlight();
            break;
          case 'show_suggestions':
            // Sẽ được xử lý bởi Suggestion Chips UI
            break;
        }
      } catch (e) {
        console.error(`Lỗi khi thực thi hành động ${action.type}:`, e);
      }
    });
  }

  static highlightAndScroll(contextId) {
    if (!contextId) return;
    const el = document.querySelector(`[data-context-id="${contextId}"]`);
    if (!el) {
      console.warn(`Không tìm thấy phần tử để cuộn/highlight: ${contextId}`);
      return;
    }

    // Xóa highlight cũ
    this.clearHighlight();

    // Thêm highlight mới
    el.classList.add('apple-ai-highlight');
    this.lastHighlighted = el;

    // Cuộn mượt mà đưa phần tử vào giữa màn hình
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }

  static openImage(contextId) {
    if (!contextId) return;
    const imgEl = document.querySelector(`img[data-context-id="${contextId}"]`);
    if (!imgEl) return;

    // Kích hoạt sự kiện click của ảnh để mở Lightbox gốc
    imgEl.click();
  }

  static clearHighlight() {
    if (this.lastHighlighted) {
      this.lastHighlighted.classList.remove('apple-ai-highlight');
      this.lastHighlighted = null;
    }
  }
}

window.screenActionController = ScreenActionController;
