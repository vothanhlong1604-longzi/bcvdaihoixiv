/**
 * Screen Context Store
 * Trạng thái trung tâm cho Screen-on Awareness 2.0
 */

class ScreenContextStore {
  constructor() {
    this.state = {
      page: {
        type: 'home', // 'home' | 'detail'
        route: '',    // hash route e.g. '#nghi-quyet/70'
        resolutionId: null, // e.g. '70'
      },
      viewport: {
        primaryContextId: null, // Context ID được tập trung nhiều nhất
        visibleContextIds: [],   // Danh sách các Context ID đang hiển thị
        visibilityRatio: {},     // { contextId: ratio }
      },
      interaction: {
        lastClickedContextId: null,
        selectedText: '',
        selectedContextId: null,
        lightboxContextId: null,
      },
      presentation: {
        enabled: false,
        activeSectionId: null,
        activeItemIndex: null,
      },
      visual: {
        activeImageContextId: null,
        requiresVision: false,
      },
      updatedAt: Date.now()
    };
    this.listeners = new Set();
  }

  getState() {
    // Trả về bản sao shallow-nested để tránh ghi đè trực tiếp trạng thái store
    return {
      page: { ...this.state.page },
      viewport: {
        ...this.state.viewport,
        visibleContextIds: [...this.state.viewport.visibleContextIds],
        visibilityRatio: { ...this.state.viewport.visibilityRatio }
      },
      interaction: { ...this.state.interaction },
      presentation: { ...this.state.presentation },
      visual: { ...this.state.visual },
      updatedAt: this.state.updatedAt
    };
  }

  updateState(updates) {
    let changed = false;

    // Duyệt qua các nhánh chính để merge
    for (const key in updates) {
      if (typeof updates[key] === 'object' && updates[key] !== null && this.state[key] !== undefined) {
        for (const subKey in updates[key]) {
          const val = updates[key][subKey];
          // Kiểm tra xem giá trị có thực sự thay đổi không
          const currentVal = this.state[key][subKey];
          if (JSON.stringify(currentVal) !== JSON.stringify(val)) {
            this.state[key][subKey] = val;
            changed = true;
          }
        }
      } else if (this.state[key] !== undefined) {
        if (JSON.stringify(this.state[key]) !== JSON.stringify(updates[key])) {
          this.state[key] = updates[key];
          changed = true;
        }
      }
    }

    if (changed) {
      this.state.updatedAt = Date.now();
      this.notify();
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.unsubscribe(listener);
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);
  }

  notify() {
    const currentState = this.getState();
    this.listeners.forEach(listener => {
      try {
        listener(currentState);
      } catch (e) {
        console.error("Lỗi khi chạy listener của ScreenContextStore:", e);
      }
    });
  }
}

// Khởi tạo global instance
window.screenContextStore = new ScreenContextStore();
