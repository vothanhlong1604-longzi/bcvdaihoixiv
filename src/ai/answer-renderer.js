/**
 * Answer Renderer
 * Trực quan hóa cấu trúc câu trả lời của AI Agent thành giao diện tương tác cao cấp (Liquid Glass)
 */

class AnswerRenderer {
  /**
   * Chuyển đổi đối tượng câu trả lời (AnswerSchema) thành HTML hoàn chỉnh
   */
  static render(answer, resColor = '#4facfe') {
    const validated = window.answerSchema.validate(answer);
    
    let html = `
      <div class="structured-ai-response" style="--res-theme-color: ${resColor};" data-answer-id="${validated.answerId}">
        
        <!-- 1. Trả lời trực tiếp -->
        <div class="ai-direct-answer readable-text">
          ${validated.directAnswer}
        </div>
    `;

    // 2. Điểm tin cậy / Ghi chú nếu có
    if (validated.confidenceNotes && validated.confidenceNotes.length > 0) {
      html += `
        <div class="ai-confidence-banner">
          <span class="ai-conf-icon">⚠️</span>
          <span class="ai-conf-text">${validated.confidenceNotes.join(', ')}</span>
        </div>
      `;
    }

    // 3. Luận điểm trọng tâm (3 - 5 ý)
    if (validated.keyPoints && validated.keyPoints.length > 0) {
      html += `
        <div class="ai-keypoints-section">
          <h4 class="ai-section-hdr"><span class="ai-hdr-decor"></span>Luận điểm trọng tâm</h4>
          <div class="ai-keypoints-list">
            ${validated.keyPoints.map((kp, idx) => {
              const anchorBtn = kp.sourceAnchors && kp.sourceAnchors.length > 0 && kp.sourceAnchors[0] ? `
                <button class="ai-anchor-nav-btn" onclick="AICopilot.openSourceAnchor('${kp.sourceAnchors[0]}')" title="Cuộn và làm nổi đoạn nội dung này trong văn kiện">
                  <i class="fas fa-search-location"></i> Căn cứ
                </button>
              ` : '';
              
              return `
                <div class="ai-keypoint-card">
                  <div class="ai-kp-index">${idx + 1}</div>
                  <div class="ai-kp-content">
                    <div class="ai-kp-title">${kp.title}</div>
                    <div class="ai-kp-desc">${kp.content}</div>
                  </div>
                  ${anchorBtn}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    // 4. Trực quan hóa dữ liệu (Visualization)
    if (validated.visualization && validated.visualization.type !== 'none') {
      html += `
        <div class="ai-visualization-section">
          <h4 class="ai-section-hdr"><span class="ai-hdr-decor"></span>Trực quan hóa cấu trúc</h4>
          <div class="ai-viz-container">
            ${this.renderVisualization(validated.visualization.type, validated.visualization.data, resColor)}
          </div>
        </div>
      `;
    }

    // 5. Căn cứ kiểm chứng & Trích dẫn chính thức
    if ((validated.officialQuotes && validated.officialQuotes.length > 0) || (validated.sources && validated.sources.length > 0)) {
      html += `
        <div class="ai-sources-section">
          <h4 class="ai-section-hdr"><span class="ai-hdr-decor"></span>Căn cứ văn kiện chính thức</h4>
          
          ${validated.officialQuotes.map(q => {
            const quoteText = typeof q === 'object' ? q.quote : q;
            const speaker = typeof q === 'object' ? q.speaker : 'Trích văn kiện';
            const context = typeof q === 'object' && q.context ? `(${q.context})` : '';
            return `
              <blockquote class="ai-official-blockquote">
                <span class="ai-quote-mark">“</span>
                <div class="ai-blockquote-text">${quoteText}</div>
                <cite class="ai-blockquote-cite">— ${speaker} ${context}</cite>
              </blockquote>
            `;
          }).join('')}

          ${validated.sources.length > 0 ? `
            <div class="ai-sources-list">
              <span class="ai-src-title">Tài liệu tham khảo:</span>
              ${validated.sources.map(src => {
                const srcName = typeof src === 'object' ? src.documentTitle || src.sourceId : src;
                const anchor = typeof src === 'object' ? src.sourceId : '';
                const clickAttr = anchor ? `onclick="AICopilot.openSourceAnchor('${anchor}')" style="cursor:pointer; text-decoration:underline;"` : '';
                return `
                  <span class="ai-source-tag" ${clickAttr}>
                    <i class="fas fa-file-contract"></i> ${srcName}
                  </span>
                `;
              }).join(' ')}
            </div>
          ` : ''}
        </div>
      `;
    }

    // 6. Liên hệ thực tiễn (Đại học CSND / CAND)
    if (validated.practicalApplication && validated.practicalApplication.length > 0) {
      html += `
        <div class="ai-application-section">
          <h4 class="ai-section-hdr"><span class="ai-hdr-decor"></span>Liên hệ thực tiễn CAND / Học viên</h4>
          <div class="ai-application-list">
            ${validated.practicalApplication.map(app => {
              const appTitle = typeof app === 'object' ? app.title : 'Nhiệm vụ cán bộ, học viên';
              const appContent = typeof app === 'object' ? app.content : app;
              const appIcon = typeof app === 'object' && app.icon ? app.icon : '<i class="fas fa-user-shield"></i>';
              return `
                <div class="ai-app-card">
                  <div class="ai-app-icon">${appIcon}</div>
                  <div class="ai-app-content">
                    <div class="ai-app-title">${appTitle}</div>
                    <div class="ai-app-desc">${appContent}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    // 7. Điểm dễ hiểu sai (Misconceptions)
    if (validated.misconceptions && validated.misconceptions.length > 0) {
      html += `
        <div class="ai-misconceptions-section">
          <h4 class="ai-section-hdr"><span class="ai-hdr-decor" style="background:#ff5e62;"></span>Điểm dễ hiểu sai</h4>
          <div class="ai-misconceptions-list">
            ${validated.misconceptions.map(mis => {
              const wrong = typeof mis === 'object' ? mis.wrong : mis;
              const right = typeof mis === 'object' ? mis.right : '';
              return `
                <div class="ai-mis-card">
                  <div class="ai-mis-wrong"><i class="fas fa-times-circle"></i> <b>Hiểu sai:</b> ${wrong}</div>
                  ${right ? `<div class="ai-mis-right"><i class="fas fa-check-circle"></i> <b>Giải thích đúng:</b> ${right}</div>` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    // 8. Ghi nhớ nhanh
    if (validated.memoryMessage) {
      html += `
        <div class="ai-memory-message">
          <i class="fas fa-brain"></i>
          <span class="ai-mem-text"><b>Ghi nhớ nhanh:</b> ${validated.memoryMessage}</span>
        </div>
      `;
    }

    html += `</div>`;
    return html;
  }

  /**
   * Trực quan hóa dữ liệu theo loại cấu trúc cụ thể
   */
  static renderVisualization(type, data, resColor) {
    if (!data || typeof data !== 'object') return '';

    switch (type) {
      case 'cards':
        // Grid cards
        const items = data.items || [];
        return `
          <div class="viz-grid-cards">
            ${items.map(item => `
              <div class="viz-glass-card" style="border-left-color: ${resColor}">
                <div class="viz-card-title">${item.title || ''}</div>
                <div class="viz-card-desc">${item.desc || item.content || ''}</div>
              </div>
            `).join('')}
          </div>
        `;

      case 'comparison':
        // Bảng đối chiếu
        const headers = data.headers || ['Tiêu chí', 'Nội dung 1', 'Nội dung 2'];
        const rows = data.rows || [];
        return `
          <div class="viz-table-wrapper">
            <table class="viz-comparison-table">
              <thead>
                <tr>
                  ${headers.map(h => `<th>${h}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${rows.map(row => `
                  <tr>
                    ${row.map((cell, idx) => `
                      <td class="${idx === 0 ? 'viz-table-criteria' : ''}">${cell}</td>
                    `).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;

      case 'flow':
        // Lưu đồ / Các bước
        const steps = data.steps || [];
        return `
          <div class="viz-flow-container">
            ${steps.map((step, idx) => `
              <div class="viz-flow-step">
                <div class="viz-flow-circle" style="background: ${resColor}">
                  <span>${idx + 1}</span>
                </div>
                <div class="viz-flow-content">
                  <div class="viz-flow-title">${step.title || ''}</div>
                  <div class="viz-flow-desc">${step.desc || ''}</div>
                </div>
              </div>
              ${idx < steps.length - 1 ? `
                <div class="viz-flow-arrow">
                  <i class="fas fa-chevron-down"></i>
                </div>
              ` : ''}
            `).join('')}
          </div>
        `;

      case 'timeline':
        // Dòng thời gian
        const events = data.events || [];
        return `
          <div class="viz-timeline-container">
            ${events.map(ev => `
              <div class="viz-timeline-item">
                <div class="viz-time-badge" style="background: ${resColor}22; color: ${resColor}">${ev.time || ''}</div>
                <div class="viz-time-content">
                  <div class="viz-time-title">${ev.title || ''}</div>
                  <div class="viz-time-desc">${ev.desc || ''}</div>
                </div>
              </div>
            `).join('')}
          </div>
        `;

      case 'matrix':
        // Ma trận nhận thức - hành động - kết quả
        const cells = data.cells || [];
        return `
          <div class="viz-matrix-container">
            ${cells.map(c => `
              <div class="viz-matrix-cell">
                <div class="viz-matrix-header" style="background: ${resColor}15; color: ${resColor}">
                  <span class="viz-matrix-icon">${c.icon || '📌'}</span>
                  <span class="viz-matrix-title">${c.header || ''}</span>
                </div>
                <div class="viz-matrix-body">
                  ${c.content || ''}
                </div>
              </div>
            `).join('')}
          </div>
        `;

      case 'argument_evidence':
        // Luận điểm - Căn cứ phản biện
        const list = data.pairs || [];
        return `
          <div class="viz-arg-ev-container">
            ${list.map(p => `
              <div class="viz-arg-ev-row">
                <div class="viz-arg-box">
                  <div class="viz-row-badge label-arg">Luận điểm</div>
                  <div class="viz-row-text">${p.argument || ''}</div>
                </div>
                <div class="viz-ev-box">
                  <div class="viz-row-badge label-ev" style="color: ${resColor}">Minh chứng</div>
                  <div class="viz-row-text">${p.evidence || ''}</div>
                </div>
              </div>
            `).join('')}
          </div>
        `;

      default:
        return '';
    }
  }
}

window.answerRenderer = AnswerRenderer;
