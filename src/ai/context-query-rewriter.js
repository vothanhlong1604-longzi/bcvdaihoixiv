/**
 * Context Query Rewriter
 * Viết lại câu hỏi thô dựa trên các kết quả phân tích tham chiếu và Store để tối ưu hóa truy xuất RAG
 */

class ContextQueryRewriter {
  static rewrite(rawQuery, resolvedRef, storeSnapshot, convContext) {
    let rewritten = rawQuery;
    let targetResolutionId = resolvedRef.resolutionId || storeSnapshot.page.resolutionId;
    let targetContextId = resolvedRef.contextId;

    // 1. Phục hồi thông tin từ Context ID nếu có
    let contextText = '';
    if (targetContextId) {
      const el = document.querySelector(`[data-context-id="${targetContextId}"]`);
      if (el) {
        // Lấy text sạch của thẻ
        contextText = el.innerText.trim();
      }
    }

    // 2. Viết lại câu hỏi cho các trường hợp cụ thể
    if (resolvedRef.intent === 'SHORTEN') {
      const lastTurn = convContext.getLastTurn();
      const lastAnswer = lastTurn ? lastTurn.answer : '';
      rewritten = `Tóm tắt ngắn gọn nội dung sau đây (đáp án trước đó) trong ${resolvedRef.requestedLength ? resolvedRef.requestedLength + ' câu' : 'khoảng 3 câu ngắn'}: ${lastAnswer}`;
    } 
    else if (resolvedRef.intent === 'EXPLAIN_DEEPER' && contextText) {
      rewritten = `Giải thích, phân tích sâu và làm rõ nội dung cốt lõi của ý sau đây thuộc Nghị quyết ${targetResolutionId}: "${contextText}"`;
    } 
    else if (resolvedRef.intent === 'GET_SOURCE') {
      const lastTurn = convContext.getLastTurn();
      const lastAnswer = lastTurn ? lastTurn.answer : '';
      rewritten = `Cung cấp nguồn gốc, căn cứ tài liệu chính thống hoặc điều khoản pháp lý cụ thể cho luận điểm sau: "${contextText || lastAnswer}"`;
    } 
    else if (resolvedRef.intent === 'VISUAL_DESCRIBE') {
      // Hỏi về ảnh
      let imgMeta = null;
      if (targetContextId) {
        imgMeta = window.visualContextAdapter.getImageMetadata(targetContextId);
      } else {
        imgMeta = window.visualContextAdapter.getActiveImageContext();
      }
      
      if (imgMeta) {
        rewritten = `Phân tích và giải thích nội dung, biểu đồ, infographic hoặc số liệu được thể hiện trong hình ảnh minh họa về "${imgMeta.caption || imgMeta.alt || 'hình ảnh'}" thuộc Nghị quyết ${targetResolutionId}. (Chú thích ảnh: ${imgMeta.caption || ''}. Tóm tắt ngữ cảnh liên quan: ${imgMeta.summary || ''}).`;
      }
    }
    else if (resolvedRef.intent === 'GET_UNCOVERED' && targetResolutionId) {
      // Tìm các điểm chưa thảo luận trong nghị quyết hoặc section
      rewritten = `Các điểm trọng tâm khác, các nhiệm vụ giải pháp hoặc điểm mới đột phá khác của Nghị quyết ${targetResolutionId} chưa được nêu là gì?`;
    }
    else if (contextText && resolvedRef.intent === 'GENERIC' && (rawQuery.includes('nội dung này') || rawQuery.includes('ý này') || rawQuery.includes('phần này'))) {
      rewritten = `Giải thích và phân tích nội dung sau: "${contextText}" của Nghị quyết ${targetResolutionId}`;
    }

    // 3. Ràng buộc tìm kiếm theo Nghị quyết đang mở
    // Nếu câu hỏi không chỉ rõ nghị quyết nào khác, nhưng màn hình đang hiển thị nghị quyết cụ thể,
    // bổ sung thông tin nghị quyết vào truy vấn để thu hẹp kết quả RAG.
    if (targetResolutionId && !this.mentionsOtherResolution(rawQuery, targetResolutionId)) {
      if (!rewritten.toLowerCase().includes(`nghị quyết ${targetResolutionId}`)) {
        rewritten += ` (Nghị quyết ${targetResolutionId})`;
      }
    }

    return {
      query: rewritten,
      targetResolutionId: targetResolutionId,
      targetContextId: targetContextId,
      contextText: contextText
    };
  }

  /**
   * Kiểm tra xem câu hỏi có đề cập đến một nghị quyết khác với nghị quyết hiện hành trên màn hình không
   */
  static mentionsOtherResolution(query, currentResId) {
    if (!query) return false;
    const norm = query.toLowerCase();
    
    // Tìm tất cả số nghị quyết được nhắc tới trong câu hỏi
    const resNumbers = ['57', '59', '66', '68', '70', '71', '72', '79', '80'];
    const mentioned = resNumbers.filter(num => norm.includes(`nghị quyết ${num}`) || norm.includes(`nq ${num}`) || norm.includes(`nq${num}`));
    
    if (mentioned.length > 0) {
      // Có nhắc tới nghị quyết khác
      return !mentioned.includes(String(currentResId));
    }
    return false;
  }
}

window.contextQueryRewriter = ContextQueryRewriter;
