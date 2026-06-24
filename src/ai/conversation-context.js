/**
 * Conversation Context Manager
 * Quản lý lịch sử hội thoại nhiều lượt và chuyển đổi chủ đề liên tục
 */

class ConversationContext {
  constructor() {
    this.history = []; // Danh sách các lượt hội thoại: { query, answer, snapshot }
    this.topicStack = []; // Ngăn xếp các chủ đề đã nói
    this.activeTopic = null;
    this.activeResolutionId = null;
    this.activeSectionId = null;
    this.activeContextId = null;
    this.lastAnswerContextIds = [];
    this.lastSourceAnchors = [];
    this.coveredClaims = new Set();
  }

  addTurn(query, answer, snapshot) {
    const turn = {
      query: query,
      answer: answer,
      snapshot: snapshot,
      timestamp: Date.now()
    };

    this.history.push(turn);
    if (this.history.length > 10) {
      this.history.shift(); // Giữ tối đa 10 lượt gần nhất
    }

    // Cập nhật trạng thái hội thoại hiện hành
    if (snapshot.page.resolutionId) {
      this.activeResolutionId = snapshot.page.resolutionId;
    }
    if (snapshot.viewport.primaryContextId) {
      this.activeContextId = snapshot.viewport.primaryContextId;
      
      const el = document.querySelector(`[data-context-id="${snapshot.viewport.primaryContextId}"]`);
      if (el) {
        this.activeSectionId = el.getAttribute('data-section-id');
      }
    }

    // Ghi nhận chủ đề
    if (snapshot.page.type === 'home') {
      this.pushTopic('Trang chủ / Sơ đồ 9 nghị quyết');
    } else if (snapshot.page.resolutionId) {
      this.pushTopic(`Nghị quyết ${snapshot.page.resolutionId}`);
    }
  }

  pushTopic(topic) {
    if (topic && this.activeTopic !== topic) {
      this.activeTopic = topic;
      this.topicStack.push(topic);
      if (this.topicStack.length > 5) {
        this.topicStack.shift();
      }
    }
  }

  getRecentTurns(count = 3) {
    return this.history.slice(-count);
  }

  getLastTurn() {
    return this.history[this.history.length - 1] || null;
  }

  clear() {
    this.history = [];
    this.topicStack = [];
    this.activeTopic = null;
    this.activeResolutionId = null;
    this.activeSectionId = null;
    this.activeContextId = null;
    this.lastAnswerContextIds = [];
    this.lastSourceAnchors = [];
    this.coveredClaims.clear();
  }
}

window.conversationContext = new ConversationContext();
