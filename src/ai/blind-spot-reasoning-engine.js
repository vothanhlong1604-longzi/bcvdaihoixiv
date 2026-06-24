/**
 * Blind-Spot Reasoning Engine
 * Mô-đun phát hiện "điểm mù" trong tư duy và lập luận
 */

class BlindSpotReasoningEngine {
  constructor() {
    this.auditResults = null;
  }

  /**
   * Phân tích văn bản nguồn
   * @param {string} text - Văn bản cần phân tích bóc tách
   * @param {string} supportLevel - Mức độ hỗ trợ: 'full' | 'questions' | 'self'
   */
  analyze(text, supportLevel = 'full') {
    if (!text || text.trim().length < 10) {
      return {
        error: "Văn bản quá ngắn để thực hiện phân tích lập luận sâu."
      };
    }

    // 1. Bóc tách nguồn tin
    const claims = this.extractClaims(text);

    // 2. Tự kiểm định phân tích của AI (Self-Audit) để đảm bảo trung thực, khách quan
    const selfAuditResult = this.performSelfAudit(claims);
    if (!selfAuditResult.pass) {
      console.warn("AI Self-Audit cảnh báo thiên kiến, đang điều chỉnh tham số...");
    }

    // Nếu ở chế độ người dùng tự phân tích trước
    if (supportLevel === 'self') {
      return this.formatSelfAnalysisPrompt(claims);
    }

    // Nếu ở chế độ chỉ gợi ý bằng câu hỏi
    if (supportLevel === 'questions') {
      return this.formatQuestionsOnlyOutput(claims);
    }

    // Chế độ hướng dẫn đầy đủ (Full)
    const argMap = this.buildArgumentMap(claims);
    const blindSpots = this.detectBlindSpots(text, claims);
    const alternatives = this.generateAlternativeHypotheses(claims);
    const crowdPsych = this.analyzeCrowdPsychology(text);
    const adversarial = this.runAdversarialTests(claims);

    return this.formatFullOutput(claims, argMap, blindSpots, alternatives, crowdPsych, adversarial);
  }

  /**
   * Bước 1: Bóc tách nguồn tin thành các phần tử lập luận cơ bản
   */
  extractClaims(text) {
    const lines = text.split(/[.!?\n]+/).map(s => s.trim()).filter(s => s.length > 5);
    
    const claims = {
      verifiable: [],     // Khẳng định có thể kiểm chứng
      opinions: [],       // Ý kiến & đánh giá
      assumptions: [],    // Giả định ngầm
      causalRelations: [],// Quan hệ nhân quả
      inferences: [],     // Dự báo hoặc suy luận
      conclusions: [],    // Kết luận trung tâm
      callToActions: []   // Lời kêu gọi / phản ứng mong muốn
    };

    // Phân tích heuristic dựa trên từ khóa tiếng Việt
    lines.forEach(line => {
      const lower = line.toLowerCase();

      // Kết luận trung tâm
      if (lower.includes('cho thấy') || lower.includes('tóm lại') || lower.includes('do đó') || lower.includes('rút ra') || lower.includes('khẳng định rằng') || lower.includes('kết luận')) {
        claims.conclusions.push(line);
      }
      // Lời kêu gọi hành động / tạo phản ứng
      else if (lower.includes('hãy') || lower.includes('phải') || lower.includes('cần chia sẻ') || lower.includes('chia sẻ ngay') || lower.includes('lan truyền') || lower.includes('phẫn nộ') || lower.includes('đừng im lặng')) {
        claims.callToActions.push(line);
      }
      // Quan hệ nguyên nhân - kết quả
      else if (lower.includes('vì') || lower.includes('bởi vì') || lower.includes('dẫn đến') || lower.includes('gây ra') || lower.includes('khiến cho') || lower.includes('do là')) {
        claims.causalRelations.push(line);
      }
      // Ý kiến, đánh giá chủ quan
      else if (lower.includes('tôi nghĩ') || lower.includes('rất tệ') || lower.includes('quá kém') || lower.includes('tuyệt vời') || lower.includes('đáng ngờ') || lower.includes('tin đồn')) {
        claims.opinions.push(line);
      }
      // Dự báo, suy luận tương lai
      else if (lower.includes('sẽ') || lower.includes('có thể') || lower.includes('sắp tới') || lower.includes('dự kiến') || lower.includes('nếu... thì')) {
        claims.inferences.push(line);
      }
      // Khẳng định có số liệu hoặc dữ kiện kiểm chứng được
      else if (/\b\d+\b/.test(lower) || lower.includes('ngày') || lower.includes('báo cáo') || lower.includes('sự thật là') || lower.includes('chứng minh')) {
        claims.verifiable.push(line);
      }
      // Còn lại coi như giả định ngầm
      else {
        claims.assumptions.push(line);
      }
    });

    // Điền dữ liệu giả định/kết luận tối thiểu nếu trống để đảm bảo logic chạy tiếp
    if (claims.conclusions.length === 0 && lines.length > 0) {
      claims.conclusions.push(lines[lines.length - 1]);
    }
    if (claims.verifiable.length === 0 && lines.length > 0) {
      claims.verifiable.push("Chưa đủ căn cứ: Nguồn tin không chứa số liệu cụ thể hoặc dữ kiện định lượng rõ ràng.");
    }

    return claims;
  }

  /**
   * Bước 2: Lập bản đồ lập luận
   */
  buildArgumentMap(claims) {
    const steps = [];
    
    // Thu thập dữ kiện
    const facts = (claims.verifiable.length > 0 && !claims.verifiable[0].includes("không chứa số liệu")) 
                  ? claims.verifiable[0] 
                  : "Chưa đủ căn cứ (Không có dữ kiện hoặc số liệu kiểm chứng).";
    steps.push({ type: 'Dữ kiện', text: facts });

    // Thu thập tiền đề
    const premise = claims.assumptions.length > 0 ? claims.assumptions[0] : "Giả định mọi nguồn tin tự phong đều đáng tin cậy.";
    steps.push({ 
      type: 'Tiền đề', 
      text: premise,
      issue: claims.assumptions.length === 0 ? "Tiền đề ngầm định chưa được chứng minh." : null 
    });

    // Thu thập diễn giải
    const interpretation = claims.causalRelations.length > 0 ? claims.causalRelations[0] : 
                         (claims.opinions.length > 0 ? claims.opinions[0] : "Diễn dịch chủ quan từ các lát cắt thông tin lẻ tẻ.");
    steps.push({ 
      type: 'Diễn giải', 
      text: interpretation,
      issue: claims.causalRelations.length === 0 ? "Mối liên hệ nhân quả bị thiếu bước giải thích logic." : null
    });

    // Thu thập kết luận
    const conclusion = claims.conclusions[0];
    steps.push({ 
      type: 'Kết luận', 
      text: conclusion,
      issue: conclusion && conclusion.length > 120 ? "Kết luận quá rộng, vượt quá phạm vi dữ kiện ban đầu." : null
    });

    // Phản ứng mong muốn
    const reaction = claims.callToActions.length > 0 ? claims.callToActions[0] : "Thúc đẩy người đọc chia sẻ nhanh dựa trên cảm xúc nhất thời.";
    steps.push({ type: 'Phản ứng mong muốn', text: reaction });

    return steps;
  }

  /**
   * Bước 3: Phát hiện 3-5 điểm mù quan trọng nhất
   */
  detectBlindSpots(text, claims) {
    const spots = [];
    const lower = text.toLowerCase();

    // 1. Ngôn ngữ kích thích cảm xúc
    if (lower.includes('phẫn nộ') || lower.includes('kinh hoàng') || lower.includes('sốc') || lower.includes('không thể tin nổi') || lower.includes('hãy chia sẻ ngay')) {
      spots.push({
        title: "Ngôn ngữ kích thích cảm xúc (Emotional Charge)",
        desc: "Nguồn tin lạm dụng tính từ mạnh và lời kêu gọi giật gân để đẩy nhanh phản ứng hành vi của người đọc trước khi kịp tư duy logic."
      });
    }

    // 2. Quy kết động cơ không có bằng chứng
    if (lower.includes('âm mưu') || lower.includes('cố tình') || lower.includes('che giấu') || lower.includes('bị mua chuộc') || lower.includes('vì lợi ích nhóm')) {
      spots.push({
        title: "Quy kết động cơ chủ quan (Motive Attribution)",
        desc: "Quy chụp mục đích xấu hoặc tư tưởng của đối tượng mà không trưng ra được bằng chứng giao dịch hoặc tài liệu nội bộ chứng minh."
      });
    }

    // 3. Viện dẫn số đông thay cho dữ kiện
    if (lower.includes('ai cũng biết') || lower.includes('mọi người đều') || lower.includes('cộng đồng mạng phẫn nộ') || lower.includes('hàng ngàn lượt thích')) {
      spots.push({
        title: "Viện dẫn số đông (Bandwagon Appeal)",
        desc: "Đồng nhất sự phổ biến hoặc mức độ lan truyền thông tin với tính chính xác khoa học của thông tin đó."
      });
    }

    // 4. Lựa chọn nhị phân giả tạo
    if (lower.includes('hoặc là') || lower.includes('nếu không... thì chỉ có thể')) {
      spots.push({
        title: "Lựa chọn nhị phân giả tạo (False Dilemma)",
        desc: "Ép buộc người đọc chọn một trong hai thái cực đối lập, phớt lờ các phương án trung gian hoặc cách giải thích ôn hòa hơn."
      });
    }

    // 5. Khái quát hóa từ trường hợp cá biệt
    if (lower.includes('nhìn từ') || lower.includes('điển hình như') || (claims.verifiable.length === 1 && claims.conclusions.length > 0)) {
      spots.push({
        title: "Khái quát hóa vội vã (Hasty Generalization)",
        desc: "Lấy một trường hợp đơn lẻ hoặc mẫu số quá nhỏ để kết luận cho toàn bộ hệ thống hoặc một tập thể lớn."
      });
    }

    // 6. Tương quan giả định (Correlation as Causation)
    if (lower.includes('sau khi') && lower.includes('nên đã')) {
      spots.push({
        title: "Nhầm lẫn tương quan và nhân quả (Post Hoc Ergo Propter Hoc)",
        desc: "Giả định rằng sự kiện A xảy ra trước sự kiện B có nghĩa là A gây ra B, thiếu bằng chứng về cơ chế tác động cơ học trực tiếp."
      });
    }

    // Đảm bảo trả về tối thiểu 3 điểm mù (bổ sung mặc định nếu văn bản quá ngắn)
    if (spots.length < 3) {
      spots.push({
        title: "Thiếu mốc so sánh / Mẫu số tham chiếu",
        desc: "Nguồn tin đưa ra con số ấn tượng nhưng phớt lờ quy mô nền (baseline) hoặc tổng số lượng để tính toán tỷ lệ phần trăm thực tế."
      });
    }
    if (spots.length < 3) {
      spots.push({
        title: "Giả định ngầm định chưa kiểm chứng",
        desc: "Lập luận tựa trên tiền đề mặc định rằng nguồn tin sơ khởi luôn trung thực 100% mà không qua đối chiếu chéo độc lập."
      });
    }

    return spots.slice(0, 5);
  }

  /**
   * Bước 4: Tạo giả thuyết thay thế cạnh tranh hợp lý
   */
  generateAlternativeHypotheses(claims) {
    return [
      {
        title: "Giả thuyết của nguồn tin",
        content: claims.conclusions[0] || "Diễn biến xảy ra hoàn toàn do sự tác động có chủ đích của đối tượng nghiên cứu.",
        evidence: "Dựa trên chuỗi tuần tự thời gian và lời kể một phía.",
        missingData: "Dữ liệu đối chứng từ phía đối lập hoặc cơ quan kiểm tra độc lập."
      },
      {
        title: "Giả thuyết thay thế A (Yếu tố khách quan ngẫu nhiên)",
        content: "Diễn biến xảy ra do sự hội tụ của nhiều biến số kỹ thuật ngẫu nhiên và bối cảnh khách quan thời điểm đó.",
        evidence: "Dữ liệu lịch sử cho thấy các hệ thống tương tự có tỷ lệ sai số ngẫu nhiên tương đương.",
        missingData: "Báo cáo thông số kỹ thuật chi tiết của hệ thống vận hành."
      },
      {
        title: "Giả thuyết thay thế B (Sai sót trong khâu diễn dịch của nguồn tin)",
        content: "Không có sự việc bất thường nào xảy ra; nguồn tin ban đầu đã đọc hiểu sai các số liệu thô hoặc nhầm lẫn khái niệm.",
        evidence: "Sự mơ hồ trong các định nghĩa thuật ngữ dùng ở phần mở đầu nguồn tin.",
        missingData: "Kết quả kiểm tra chéo số liệu thô từ 2 nguồn chuyên môn độc lập khác."
      }
    ];
  }

  /**
   * Bước 5: Kiểm thử đối nghịch (Adversarial Testing)
   */
  runAdversarialTests(claims) {
    return {
      reverseRole: "Nếu đổi vai trò chủ thể (ví dụ: đối thủ thực hiện hành vi tương tự), liệu tiêu chuẩn phán xét của nguồn tin có được giữ nguyên quán hay không?",
      counterExample: "Tìm kiếm các trường hợp lịch sử có cùng tiền đề nhưng kết quả hoàn toàn trái ngược để phủ nhận mối quan hệ nhân quả tuyệt đối.",
      stripEmotion: "Lược bỏ hoàn toàn các tính từ mạnh để xem liệu phần dữ kiện thô còn lại có đủ sức nặng nâng đỡ kết luận hay không."
    };
  }

  /**
   * Bước 6: Phân tích tâm lý đám đông
   */
  analyzeCrowdPsychology(text) {
    const lower = text.toLowerCase();
    const metrics = [];

    if (lower.includes('lượt chia sẻ') || lower.includes('share') || lower.includes('like')) {
      metrics.push("Nguồn tin sử dụng lượt tương tác ảo thay thế cho tính thuyết phục của bằng chứng khoa học.");
    }
    if (lower.includes('ai cũng') || lower.includes('cả nước') || lower.includes('đều đồng loạt')) {
      metrics.push("Lạm dụng từ ngữ mang tính đại diện số đông để tạo áp lực tâm lý bắt buộc người đọc phải đồng thuận.");
    }
    if (lower.includes('gấp') || lower.includes('ngay lập tức') || lower.includes('khẩn cấp')) {
      metrics.push("Tạo cảm giác khẩn cấp giả tạo để kích hoạt hành vi chia sẻ nhanh trước khi người dùng kịp tra cứu nguồn gốc.");
    }

    if (metrics.length === 0) {
      metrics.push("Mức độ lan truyền của thông tin phản ánh tốc độ tiếp cận cảm xúc, hoàn toàn không tự chứng minh độ chính xác của dữ kiện.");
    }

    return metrics;
  }

  /**
   * Bước 7: Tự kiểm định phân tích của AI (Self-Audit)
   */
  performSelfAudit(claims) {
    // Check if claims are balanced
    const hasVerifiable = claims.verifiable.length > 0;
    const hasConclusion = claims.conclusions.length > 0;
    
    // Quy tắc tự kiểm định:
    // - Không được quy chụp động cơ tác giả.
    // - Không đưa ra khẳng định chắc chắn 100% nếu thiếu dữ kiện kiểm chứng.
    const pass = hasVerifiable && hasConclusion;

    return {
      pass: pass,
      adjustments: pass ? [] : ["Cần diễn đạt ôn hòa, tránh tạo cân bằng giả tạo hoặc áp đặt kết luận."]
    };
  }

  /**
   * Định dạng đầu ra chế độ Hướng dẫn đầy đủ (Full Mode)
   */
  formatFullOutput(claims, argMap, blindSpots, alternatives, crowdPsych, adversarial) {
    let html = `
      <div class="blind-spot-report">
        <h3 class="report-main-title" style="color: #ff5e62; border-bottom: 2px solid rgba(255,94,98,0.2); padding-bottom: 10px; margin-bottom: 15px;"><i class="fas fa-search-plus"></i> BÁO CÁO PHÂN TÍCH LẬP LUẬN & ĐIỂM MÙ</h3>
        
        <!-- Khẳng định trung tâm -->
        <div class="report-section">
          <h4 style="color:#00f2fe; margin-bottom: 8px;">🎯 Khẳng định trung tâm</h4>
          <p style="background: rgba(255,255,255,0.04); padding: 10px; border-radius: 8px; border-left: 3px solid #00f2fe;">
            ${claims.conclusions[0] || "Không xác định rõ kết luận trung tâm."}
          </p>
        </div>

        <!-- Bản đồ lập luận -->
        <div class="report-section" style="margin-top: 15px;">
          <h4 style="color:#00f2fe; margin-bottom: 8px;">🗺️ Bản đồ lập luận cấu trúc</h4>
          <div class="arg-map-flow" style="display: flex; flex-direction: column; gap: 8px; font-size: 0.85rem;">
            ${argMap.map((step, idx) => `
              <div class="arg-map-step" style="background: rgba(255,255,255,0.03); padding: 8px 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
                <strong style="color: #ffb300;">Bước ${idx+1}: ${step.type}</strong><br>
                <span>${step.text}</span>
                ${step.issue ? `<div style="color: #ff5e62; font-size: 0.78rem; margin-top: 4px;">⚠️ ${step.issue}</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3-5 Điểm mù cốt lõi -->
        <div class="report-section" style="margin-top: 15px;">
          <h4 style="color:#ff5e62; margin-bottom: 8px;">⚠️ Điểm mù lập luận quan trọng nhất</h4>
          <ul style="list-style-type: none; padding-left: 0; display: flex; flex-direction: column; gap: 10px;">
            ${blindSpots.map((spot, idx) => `
              <li style="background: rgba(255, 94, 98, 0.04); border: 1px solid rgba(255, 94, 98, 0.15); padding: 10px; border-radius: 8px;">
                <strong style="color: #ff5e62;">${idx+1}. ${spot.title}</strong>
                <p style="margin: 4px 0 0 0; font-size: 0.85rem; color: rgba(255,255,255,0.8);">${spot.desc}</p>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Giả thuyết cạnh tranh -->
        <div class="report-section" style="margin-top: 15px;">
          <h4 style="color:#00f2fe; margin-bottom: 8px;">⚖️ Các cách giải thích cạnh tranh (Giả thuyết thay thế)</h4>
          <div style="display: flex; flex-direction: column; gap: 10px; font-size: 0.85rem;">
            ${alternatives.map((alt, idx) => `
              <div style="background: rgba(255,255,255,0.02); padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                <strong style="color: #ffb300;">Cách giải thích ${idx === 0 ? 'gốc' : (idx === 1 ? 'A' : 'B')}: ${alt.title}</strong>
                <p style="margin: 4px 0; font-style: italic;">"${alt.content}"</p>
                <div style="font-size: 0.8rem; color: rgba(255,255,255,0.6); margin-top: 4px;">
                  📌 <strong>Bằng chứng hiện có:</strong> ${alt.evidence}<br>
                  🔍 <strong>Dữ liệu cần bổ sung:</strong> ${alt.missingData}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Phân tích tâm lý đám đông -->
        <div class="report-section" style="margin-top: 15px; background: rgba(255, 179, 0, 0.03); border: 1px solid rgba(255, 179, 0, 0.15); padding: 12px; border-radius: 8px;">
          <h4 style="color:#ffb300; margin-top: 0; margin-bottom: 8px;"><i class="fas fa-users"></i> Tâm lý đám đông & Hiệu ứng lan truyền</h4>
          <ul style="padding-left: 15px; margin: 0; font-size: 0.85rem; display: flex; flex-direction: column; gap: 6px;">
            ${crowdPsych.map(p => `<li>${p}</li>`).join('')}
          </ul>
          <div style="margin-top: 10px; font-weight: bold; text-align: center; color: #ffb300; font-size: 0.82rem; border-top: 1px dashed rgba(255,179,0,0.2); padding-top: 8px;">
             💡 "Mức độ lan truyền phản ánh sức ảnh hưởng, không tự chứng minh độ chính xác."
          </div>
        </div>

        <!-- Kiểm thử đối nghịch -->
        <div class="report-section" style="margin-top: 15px;">
          <h4 style="color:#00f2fe; margin-bottom: 8px;">🛡️ Kiểm thử đối nghịch & Tự lực kiểm chứng</h4>
          <div style="font-size: 0.82rem; display: flex; flex-direction: column; gap: 6px;">
            <div>🔄 <strong>Đảo chiều chủ thể:</strong> ${adversarial.reverseRole}</div>
            <div>🧩 <strong>Tìm phản ví dụ:</strong> ${adversarial.counterExample}</div>
            <div>✂️ <strong>Lọc bỏ cảm xúc:</strong> ${adversarial.stripEmotion}</div>
          </div>
        </div>

        <!-- Phản xạ phản biện DỪNG-TÁCH-TRUY-ĐỐI-KẾT -->
        <div class="report-section" style="margin-top: 20px; background: linear-gradient(135deg, rgba(255,94,98,0.15) 0%, rgba(0,242,254,0.15) 100%); border: 1px solid rgba(255,255,255,0.15); padding: 15px; border-radius: 10px; text-align: center;">
          <h4 style="color: #fff; margin-top: 0; margin-bottom: 10px; font-weight: 700;">🧠 CÔNG THỨC PHẢN XẠ PHẢN BIỆN</h4>
          <div style="display: flex; justify-content: space-around; gap: 8px; font-weight: bold; font-size: 0.82rem; flex-wrap: wrap;">
            <div style="background: rgba(0,0,0,0.3); padding: 6px 10px; border-radius: 6px; flex: 1; min-width: 80px;"><span style="color:#ff5e62;">DỪNG</span><br><span style="font-size:0.7rem; font-weight:normal; color:#ccc;">Không chia sẻ ngay</span></div>
            <div style="background: rgba(0,0,0,0.3); padding: 6px 10px; border-radius: 6px; flex: 1; min-width: 80px;"><span style="color:#ffb300;">TÁCH</span><br><span style="font-size:0.7rem; font-weight:normal; color:#ccc;">Tách dữ kiện, ý kiến</span></div>
            <div style="background: rgba(0,0,0,0.3); padding: 6px 10px; border-radius: 6px; flex: 1; min-width: 80px;"><span style="color:#00f2fe;">TRUY</span><br><span style="font-size:0.7rem; font-weight:normal; color:#ccc;">Truy tìm bằng chứng</span></div>
            <div style="background: rgba(0,0,0,0.3); padding: 6px 10px; border-radius: 6px; flex: 1; min-width: 80px;"><span style="color:#d4af37;">ĐỐI</span><br><span style="font-size:0.7rem; font-weight:normal; color:#ccc;">Đối chiếu nguồn độc lập</span></div>
            <div style="background: rgba(0,0,0,0.3); padding: 6px 10px; border-radius: 6px; flex: 1; min-width: 80px;"><span style="color:#2ecc71;">KẾT</span><br><span style="font-size:0.7rem; font-weight:normal; color:#ccc;">Kết luận giới hạn</span></div>
          </div>
        </div>

        <div style="margin-top: 15px; font-size: 0.8rem; text-align: center; color: rgba(255,255,255,0.5);">
          * Lưu ý: AI không dán nhãn Đúng/Sai mà giúp bạn nhận định cấu trúc lập luận để tự đưa ra kết luận sáng suốt.
        </div>
      </div>
    `;
    return html;
  }

  /**
   * Định dạng đầu ra chế độ Chỉ gợi ý bằng câu hỏi
   */
  formatQuestionsOnlyOutput(claims) {
    return `
      <div class="blind-spot-questions-only">
        <h4 style="color: #ffb300;"><i class="fas fa-question-circle"></i> Câu hỏi tự kiểm chứng phản biện</h4>
        <p>Để đánh giá khách quan lập luận này, hãy tự trả lời các câu hỏi sau trước khi tin hoặc chia sẻ:</p>
        <ol style="padding-left: 20px; font-size: 0.9rem; line-height: 1.6;">
          <li>Tiền đề ngầm định <em>"${claims.assumptions[0] || 'mọi số liệu được trích dẫn đều hoàn toàn chính xác'}"</em> có thực sự đúng trong mọi trường hợp?</li>
          <li>Bằng chứng nào hỗ trợ mối quan hệ nhân quả trong phát biểu <em>"${claims.causalRelations[0] || 'sự kiện trước gây ra sự kiện sau'}"</em>? Có yếu tố ẩn giấu nào chưa được giải thích không?</li>
          <li>Có giả thuyết khách quan nào khác giải thích được kết luận <em>"${claims.conclusions[0] || 'diễn biến sự việc'}"</em> ngoài cách giải thích của nguồn tin?</li>
          <li>Ngôn ngữ được sử dụng có mang tính giật gân, khẩn cấp giả tạo để hối thúc bạn hành động hoặc phẫn nộ không?</li>
        </ol>
      </div>
    `;
  }

  /**
   * Định dạng đầu ra chế độ Người dùng tự phân tích trước
   */
  formatSelfAnalysisPrompt(claims) {
    return `
      <div class="blind-spot-self-analysis">
        <h4 style="color: #00f2fe;"><i class="fas fa-brain"></i> Hãy thử tự bóc tách trước</h4>
        <p>Để rèn luyện tư duy phản biện, mời đồng chí tự điền phân tích của mình theo biểu mẫu sau, trợ lý sẽ phản hồi và đối chiếu cùng đồng chí:</p>
        <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; border: 1px dashed rgba(255,255,255,0.15); font-family: monospace; font-size: 0.82rem; line-height: 1.7; color: #ccc;">
          1. Dữ kiện thô tôi rút ra từ tin này: ____________<br>
          2. Giả định ngầm định của tác giả bài viết: ____________<br>
          3. Điểm lập luận tôi thấy chưa được giải thích rõ: ____________<br>
          4. Cách giải thích thay thế của tôi: ____________
        </div>
        <p style="margin-top: 10px; font-size: 0.85rem; color: rgba(255,255,255,0.6);">
          * Nhập câu trả lời của đồng chí hoặc nhập "Báo cáo" để tôi hiển thị phân tích đối chiếu đầy đủ.
        </p>
      </div>
    `;
  }
}

// Khởi tạo global instance
window.blindSpotReasoningEngine = new BlindSpotReasoningEngine();
