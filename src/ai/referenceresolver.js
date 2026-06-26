/**
 * Reference Resolver (Bộ giải quyết tham chiếu tiếng Việt)
 * Giải mã các câu nói vắn tắt và từ chỉ định trong tiếng Việt thành ngữ cảnh cấu trúc cụ thể
 */

class ReferenceResolver {
  static resolve(query, storeSnapshot, convContext) {
    const norm = this.normalize(query);
    const result = {
      resolutionId: storeSnapshot.page.resolutionId,
      sectionId: null,
      contextId: null,
      intent: 'GENERIC',
      responseDepth: 'normal',
      requestedLength: null,
      sourceAnchors: [],
      confidence: 0.5
    };

    // 0. Kiểm tra xem câu hỏi có nhắc tới nghị quyết cụ thể nào không
    const resNumbers = ['57', '59', '66', '68', '70', '71', '72', '79', '80'];
    for (const num of resNumbers) {
      if (norm.includes(`nghi quyet ${num}`) || norm.includes(`nq ${num}`) || norm.includes(`nq${num}`)) {
        result.resolutionId = num;
        result.confidence = 0.95;
        break;
      }
    }

    // 1. Phân tích độ sâu câu trả lời / yêu cầu về độ dài
    if (this.matchesAny(norm, ['ngắn hơn', 'rút ngắn', 'tóm tắt lại', 'ngắn gọn', 'ba câu', '3 câu'])) {
      result.responseDepth = 'short';
      result.intent = 'SHORTEN';
      if (this.matchesAny(norm, ['ba câu', '3 câu'])) {
        result.requestedLength = 3;
      }
      result.confidence = 0.9;
    } else if (this.matchesAny(norm, ['sâu hơn', 'phân tích sâu', 'nói rõ hơn', 'giải thích thêm', 'làm rõ'])) {
      result.responseDepth = 'deep';
      result.intent = 'EXPLAIN_DEEPER';
      result.confidence = 0.9;
    }

    // 2. Phân tích yêu cầu tìm căn cứ / nguồn
    if (this.matchesAny(norm, ['căn cứ ở đâu', 'căn cứ vào đâu', 'căn cứ của kết luận', 'lấy số liệu từ', 'trích từ đâu'])) {
      result.intent = 'GET_SOURCE';
      result.confidence = 0.9;
    }

    // 3. Phân tích yêu cầu so sánh
    if (this.matchesAny(norm, ['so sánh', 'khác biệt', 'đối chiếu'])) {
      result.intent = 'COMPARE';
      result.confidence = 0.8;
    }

    // 4. Giải quyết "ý vừa rồi", "phần vừa nêu", "quay lại ý ban đầu"
    const lastTurn = convContext && convContext.getLastTurn ? convContext.getLastTurn() : null;
    if (this.matchesAny(norm, ['ý vừa rồi', 'phần vừa nêu', 'nội dung vừa rồi', 'vấn đề vừa nêu', 'ý vừa nói'])) {
      if (lastTurn && lastTurn.snapshot) {
        result.resolutionId = lastTurn.snapshot.page.resolutionId || result.resolutionId;
        result.contextId = lastTurn.snapshot.viewport.primaryContextId;
        result.confidence = 0.85;
      }
    } else if (this.matchesAny(norm, ['quay lại ý ban đầu', 'nội dung ban đầu', 'ý đầu tiên'])) {
      const firstTurn = convContext && convContext.history ? convContext.history[0] : null;
      if (firstTurn && firstTurn.snapshot) {
        result.resolutionId = firstTurn.snapshot.page.resolutionId || result.resolutionId;
        result.contextId = firstTurn.snapshot.viewport.primaryContextId;
        result.confidence = 0.85;
      }
    } else if (this.matchesAny(norm, ['còn điểm nào chưa nói', 'còn điểm nào khác', 'còn gì nữa không'])) {
      result.intent = 'GET_UNCOVERED';
      if (lastTurn && lastTurn.snapshot) {
        result.resolutionId = lastTurn.snapshot.page.resolutionId || result.resolutionId;
        result.contextId = lastTurn.snapshot.viewport.primaryContextId;
      }
      result.confidence = 0.8;
    }

    // 5. Giải quyết tham chiếu hình ảnh
    if (this.matchesAny(norm, ['hình ảnh này', 'bức hình này', 'ảnh này thể hiện', 'xem hình này', 'hình này nói về'])) {
      result.intent = 'VISUAL_DESCRIBE';
      const activeImage = window.visualContextAdapter.getActiveImageContext();
      if (activeImage) {
        result.contextId = activeImage.contextId;
        result.confidence = 0.95;
      } else {
        result.confidence = 0.6;
      }
    }

    // 6. Giải quyết chỉ định vị trí: "ý thứ nhất", "ý thứ hai", "ý thứ ba", "ý thứ hai"
    const ordinalIndex = this.extractOrdinalIndex(norm);
    if (ordinalIndex !== null) {
      result.confidence = 0.9;
      let targetSection = null;
      let primaryId = storeSnapshot.viewport.primaryContextId;
      
      if (primaryId) {
        const el = document.querySelector(`[data-context-id="${primaryId}"]`);
        if (el) targetSection = el.getAttribute('data-section-id');
      }

      if (!targetSection && storeSnapshot.viewport.visibleContextIds.length > 0) {
        const firstVisibleEl = document.querySelector(`[data-context-id="${storeSnapshot.viewport.visibleContextIds[0]}"]`);
        if (firstVisibleEl) targetSection = firstVisibleEl.getAttribute('data-section-id');
      }

      if (targetSection && result.resolutionId) {
        result.sectionId = targetSection;
        const secMap = {
          'coreIdeas': 'core-ideas',
          'core-ideas': 'core-ideas',
          'generalGoals': 'general-goals',
          'general-goals': 'general-goals',
          'goals2030': 'goals-2030',
          'goals-2030': 'goals-2030',
          'vision2045': 'vision-2045',
          'vision-2045': 'vision-2045',
          'tasks': 'tasks',
          'newPoints': 'new-points',
          'new-points': 'new-points',
          'responsibilities': 'responsibilities',
          'quoteBlocks': 'quotes',
          'quotes': 'quotes'
        };
        const mappedSec = secMap[targetSection] || targetSection;
        result.contextId = `nq${result.resolutionId}.${mappedSec}.${ordinalIndex}`;
      }
    }

    // 7. Giải quyết chỉ định chung: "nội dung này", "phần này", "nghị quyết này"
    if (this.matchesAny(norm, ['nội dung này', 'phần này', 'đoạn này', 'nghị quyết này']) && !result.contextId) {
      if (storeSnapshot.interaction.selectedContextId) {
        result.contextId = storeSnapshot.interaction.selectedContextId;
        result.confidence = 0.95;
      }
      else if (storeSnapshot.interaction.lastClickedContextId) {
        result.contextId = storeSnapshot.interaction.lastClickedContextId;
        result.confidence = 0.9;
      }
      else if (storeSnapshot.viewport.primaryContextId) {
        result.contextId = storeSnapshot.viewport.primaryContextId;
        result.confidence = 0.85;
      }
    }

    return result;
  }

  static normalize(text) {
    if (!text) return '';
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
  }

  static matchesAny(normText, keywords) {
    return keywords.some(kw => normText.includes(kw));
  }

  static extractOrdinalIndex(normText) {
    if (this.matchesAny(normText, ['thu nhat', 'y dau', 'y thu nhat', 'y mot', 'y 1', 'thu 1'])) return 1;
    if (this.matchesAny(normText, ['thu hai', 'y hai', 'y thu hai', 'y 2', 'thu 2', 'y so 2', 'y so hai'])) return 2;
    if (this.matchesAny(normText, ['thu ba', 'y ba', 'y thu ba', 'y 3', 'thu 3', 'y so 3', 'y so ba'])) return 3;
    if (this.matchesAny(normText, ['thu tu', 'y bon', 'y thu tu', 'y 4', 'thu 4', 'y so 4', 'y so bon'])) return 4;
    if (this.matchesAny(normText, ['thu nam', 'y nam', 'y thu nam', 'y 5', 'thu 5', 'y so 5', 'y so nam'])) return 5;
    return null;
  }
}

window.referenceResolver = ReferenceResolver;
