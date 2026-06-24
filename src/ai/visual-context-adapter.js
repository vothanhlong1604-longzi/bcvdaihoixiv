/**
 * Visual Context Adapter
 * Cầu nối dữ liệu hình ảnh: Trích xuất metadata ảnh và nhận biết các câu hỏi liên quan đến thị giác
 */

class VisualContextAdapter {
  static VISUAL_KEYWORDS = [
    'hình ảnh', 'bức ảnh', 'hình này', 'ảnh này', 'biểu đồ', 'sơ đồ', 
    'bản đồ', 'minh họa', 'ảnh minh họa', 'chụp', 'nhìn thấy', 'màu sắc',
    'bố cục', 'pixel', 'đồ họa', 'infographic'
  ];

  /**
   * Kiểm tra xem câu hỏi có thực sự yêu cầu thông tin thị giác không
   */
  static isVisualQuery(query) {
    if (!query) return false;
    const lowerQuery = query.toLowerCase();
    return this.VISUAL_KEYWORDS.some(kw => lowerQuery.includes(kw));
  }

  /**
   * Lấy siêu dữ liệu của một ảnh theo contextId
   */
  static getImageMetadata(contextId) {
    if (!contextId) return null;
    const imgEl = document.querySelector(`img[data-context-id="${contextId}"]`);
    if (!imgEl) return null;

    const parentFigure = imgEl.closest('figure');
    let captionText = '';
    if (parentFigure) {
      const figcaption = parentFigure.querySelector('figcaption');
      if (figcaption) captionText = figcaption.innerText.trim();
    }

    const summary = imgEl.getAttribute('data-context-summary') || '';
    const relatedContext = imgEl.getAttribute('data-related-context') || '';
    const altText = imgEl.getAttribute('alt') || '';
    
    // Tìm tiêu đề section chứa hình ảnh này
    let sectionTitle = '';
    const section = imgEl.closest('.content-section');
    if (section) {
      const titleEl = section.querySelector('.content-section-title, h2');
      if (titleEl) sectionTitle = titleEl.innerText.trim();
    }

    return {
      contextId: contextId,
      alt: altText,
      caption: captionText,
      summary: summary,
      relatedContext: relatedContext,
      sectionTitle: sectionTitle,
      src: imgEl.src
    };
  }

  /**
   * Lấy thông tin ảnh đang hoạt động (Lightbox hoặc ảnh gần tiêu điểm nhất)
   */
  static getActiveImageContext() {
    const state = window.screenContextStore.getState();
    const contextId = state.visual.activeImageContextId || state.viewport.primaryContextId;
    
    // Kiểm tra xem contextId đó có trỏ đến một ảnh không
    if (contextId) {
      const imgEl = document.querySelector(`img[data-context-id="${contextId}"]`);
      if (imgEl) {
        return this.getImageMetadata(contextId);
      }
    }

    // Nếu không, tìm ảnh đầu tiên đang hiển thị trong viewport
    const visibleIds = state.viewport.visibleContextIds;
    for (const id of visibleIds) {
      const imgEl = document.querySelector(`img[data-context-id="${id}"]`);
      if (imgEl) {
        return this.getImageMetadata(id);
      }
    }

    return null;
  }
}

window.visualContextAdapter = VisualContextAdapter;
