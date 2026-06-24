/**
 * Context Validator
 * Xác thực và lọc mã độc/Prompt Injection trong dữ liệu màn hình
 * Đảm bảo chỉ thực hiện các hành động nằm trong whitelist an toàn.
 */

class ContextValidator {
  static ACTION_WHITELIST = [
    'focus_context',
    'highlight_context',
    'open_source',
    'open_image',
    'clear_highlight',
    'show_suggestions'
  ];

  /**
   * Xác thực và làm sạch các lệnh điều khiển màn hình do AI phản hồi
   */
  static validateActions(actions) {
    if (!Array.isArray(actions)) return [];

    return actions.filter(action => {
      // 1. Kiểm tra hành động có nằm trong whitelist không
      if (!this.ACTION_WHITELIST.includes(action.type)) {
        console.warn(`Hành động bị chặn do không thuộc whitelist: ${action.type}`);
        return false;
      }

      // 2. Kiểm tra tính hợp lệ của contextId (nếu có)
      if (action.contextId) {
        if (typeof action.contextId !== 'string' || action.contextId.length > 100) {
          console.warn(`ContextId không hợp lệ: ${action.contextId}`);
          return false;
        }
        // Chỉ cho phép ký tự chữ, số, dấu chấm, gạch ngang dưới
        const pattern = /^[a-zA-Z0-9.\-_]+$/;
        if (!pattern.test(action.contextId)) {
          console.warn(`ContextId chứa ký tự đặc biệt đáng ngờ: ${action.contextId}`);
          return false;
        }
      }

      // 3. Kiểm tra tính hợp lệ của các tham số khác
      if (action.type === 'open_image' && action.src) {
        // Chỉ cho phép ảnh nội bộ hoặc từ nguồn đã xác thực
        if (!action.src.startsWith('./images/') && !action.src.startsWith('./data/') && !action.src.startsWith('images/')) {
          console.warn(`Đường dẫn hình ảnh không hợp lệ: ${action.src}`);
          return false;
        }
      }

      return true;
    });
  }

  /**
   * Làm sạch văn bản trích xuất từ màn hình để tránh script injection
   */
  static sanitizeScreenText(text) {
    if (!text) return '';
    return text
      .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '') // Xóa thẻ script
      .replace(/on\w+\s*=\s*"[^"]*"/gi, '')               // Xóa inline event handlers
      .replace(/javascript\s*:\s*/gi, '')                 // Xóa javascript: protocols
      .replace(/<\/?[^>]+(>|$)/g, '');                    // Xóa tất cả các thẻ HTML khác để an toàn tuyệt đối
  }
}

window.contextValidator = ContextValidator;
