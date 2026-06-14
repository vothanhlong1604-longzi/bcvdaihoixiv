/**
 * Apple Intelligence Co-Presenter Module
 * Siri Edge Glow UI & Local Screen-on Awareness (RAG)
 */

const AICopilot = (() => {
  let currentState = 'IDLE'; // IDLE, LISTENING, PROCESSING, SPEAKING
  let currentAudio = null;
  let synth = window.speechSynthesis;
  // Ép trình duyệt tải danh sách giọng nói ngay khi mở trang
  function preloadVoices() {
      synth.getVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
          speechSynthesis.onvoiceschanged = () => {
              synth.getVoices();
              getFixedVietnameseVoice(); // Thử khóa giọng ngay khi tải xong
          };
      }
  }
  preloadVoices();

  let typeWriterInterval = null;
  let recognition = null;
  let simulatedProcessingTimer = null;
  let lastHighlightedElement = null;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = 'vi-VN';
    recognition.continuous = false;
    recognition.interimResults = true;
  }

  // Pre-recorded MP3 Scripts (Tú Trinh voice)
  const scripts = {
    "57": "Thưa đồng chí, Nghị quyết 57 xác định chuyển đổi số là đột phá. Quán triệt tinh thần này, Trường Đại học Cảnh sát nhân dân đặt nhiệm vụ trọng tâm là xây dựng Đại học thông minh, tiên phong ứng dụng Trí tuệ nhân tạo (AI) vào huấn luyện nghiệp vụ.",
    "59": "Thưa đồng chí, Nghị quyết 59 nhấn mạnh ngoại giao chủ động. Trường Đại học Cảnh sát nhân dân không ngừng mở rộng hợp tác quốc tế, giao lưu học hỏi kinh nghiệm phòng chống tội phạm xuyên quốc gia, thiết lập vành đai an ninh từ xa.",
    "66": "Thưa đồng chí, đối với Nghị quyết 66 về Nhà nước pháp quyền, Trường Đại học Cảnh sát nhân dân mang sứ mệnh rèn luyện những sĩ quan Cảnh sát thượng tôn pháp luật, kiên quyết chống tội phạm nhưng luôn bảo vệ tuyệt đối quyền con người.",
    "68": "Thưa đồng chí, Nghị quyết 68 khẳng định kinh tế tư nhân là mũi nhọn. Nhiệm vụ cốt lõi của Trường Đại học Cảnh sát nhân dân là đào tạo cán bộ Cảnh sát Kinh tế nhạy bén, tinh thông để bảo vệ môi trường kinh doanh minh bạch.",
    "70": "Thưa đồng chí, Nghị quyết 70 hướng tới Net Zero. Từ góc độ đào tạo, Trường Đại học Cảnh sát nhân dân chú trọng bồi dưỡng kiến thức phòng chống tội phạm môi trường, bảo vệ an ninh tại các công trình năng lượng trọng điểm.",
    "71": "Thưa đồng chí, bám sát Nghị quyết 71 về thực học thực tài, Trường Đại học Cảnh sát nhân dân quyết liệt đổi mới phương pháp giảng dạy, triệt tiêu bệnh thành tích, nhằm đào tạo ra những sĩ quan tinh nhuệ nhất.",
    "72": "Thưa đồng chí, quán triệt Nghị quyết 72, Trường Đại học Cảnh sát nhân dân đặc biệt chú trọng chăm sóc y tế, đảm bảo thể lực sung mãn, tinh thần thép cho học viên để sẵn sàng hoàn thành xuất sắc nhiệm vụ giữ gìn trật tự an toàn xã hội.",
    "79": "Thưa đồng chí, Nghị quyết 79 định vị vai trò của Doanh nghiệp Nhà nước. Nhiệm vụ của Trường Đại học Cảnh sát nhân dân là trang bị kiến thức pháp luật sắc bén cho học viên, trở thành thanh bảo kiếm phòng chống tham nhũng, bảo vệ tài sản quốc gia.",
    "80": "Thưa đồng chí, Nghị quyết 80 khẳng định văn hóa là sức mạnh. Trường Đại học Cảnh sát nhân dân tự hào là điểm sáng gìn giữ văn hóa ứng xử chuẩn mực của người chiến sĩ Công an 'Vì nước quên thân, vì dân phục vụ'.",
    "generic": "Thưa đồng chí, Trường Đại học Cảnh sát nhân dân luôn sẵn sàng. Xin đồng chí vui lòng chọn một chủ đề cụ thể để tôi báo cáo."
  };

  
  let selectedVoice = null;

  function getFixedVietnameseVoice() {
    if (selectedVoice && selectedVoice.lang.toLowerCase().includes('vi')) {
        return selectedVoice;
    }
    
    let voices = synth.getVoices();
    if (voices.length === 0) return null;
    
    // Ưu tiên 1: Cố gắng tìm đích danh giọng Hoài My hoặc các giọng tiếng Việt Online tốt nhất
    let bestVoice = voices.find(v => v.name.includes('HoaiMy') || (v.name.includes('Natural') && v.name.includes('Vietnamese')) || (v.name.includes('Online') && v.name.includes('Vietnamese')));
    
    // Ưu tiên 2: Giọng tiếng Việt của Google / Microsoft An
    if (!bestVoice) bestVoice = voices.find(v => (v.lang.toLowerCase().includes('vi') || v.name.toLowerCase().includes('vietnam')) && (v.name.includes('Google') || v.name.includes('An')));
    
    // Ưu tiên 3: Bất kỳ giọng nào có thẻ tiếng Việt
    if (!bestVoice) bestVoice = voices.find(v => v.lang.toLowerCase().includes('vi') || v.name.toLowerCase().includes('vietnam'));
    
    if (bestVoice) {
        selectedVoice = bestVoice;
        console.log("Đã khóa giọng TTS:", selectedVoice.name);
        return selectedVoice;
    }
    
    console.warn("Chưa tìm thấy giọng tiếng Việt. Trình duyệt sẽ tự chọn dựa trên lang='vi-VN'");
    return null;
  }

  const RESOLUTION_MAP = {
    "57": {
      id: "57",
      title: "Nghị quyết 57",
      topic: "Khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số",
      relationLevel: "rất trực tiếp",
      schoolFocus: "chuyển đổi số trong giáo dục, học liệu số, AI, năng lực số cho học viên Cảnh sát",
      answer: "Đối với Nghị quyết 57, có thể liên hệ <b>rất trực tiếp</b> với Trường Đại học Cảnh sát nhân dân. Với tư cách là cơ sở giáo dục đại học trong Công an nhân dân, Nhà trường cần cụ thể hóa nghị quyết bằng:<br><br><ul><li>Chuyển đổi số trong giáo dục, phát triển học liệu số, bài giảng số.</li><li>Xây dựng ngân hàng câu hỏi số, thư viện số.</li><li>Ứng dụng AI trong giảng dạy, kiểm tra, đánh giá.</li></ul><br><b>=> Điểm quan trọng là:</b> chuyển đổi số không chỉ làm cho bài giảng hiện đại hơn, mà còn góp phần hình thành năng lực số, tư duy dữ liệu và khả năng thích ứng cho học viên Cảnh sát nhân dân. Đây là yêu cầu thiết thực để xây dựng lực lượng CAND <b>chính quy, tinh nhuệ, hiện đại</b>."
    },
    "59": {
      id: "59",
      title: "Nghị quyết 59",
      topic: "Hội nhập quốc tế trong tình hình mới",
      relationLevel: "trực tiếp ở phương diện đào tạo, nghiên cứu, hợp tác học thuật",
      schoolFocus: "ngoại ngữ, hội nhập quốc tế, tri thức về tội phạm xuyên quốc gia, an ninh phi truyền thống, giữ vững bản lĩnh chính trị",
      answer: "Đối với Nghị quyết 59, có thể liên hệ với Trường Đại học Cảnh sát nhân dân ở phương diện <b>đào tạo, nghiên cứu và hội nhập học thuật</b>. Nhà trường cần:<br><br><ul><li>Nâng cao năng lực ngoại ngữ, kỹ năng hội nhập, tư duy toàn cầu cho học viên.</li><li>Cập nhật tri thức về tội phạm xuyên quốc gia, tội phạm công nghệ cao, an ninh phi truyền thống và quản trị xã hội hiện đại.</li></ul><br><b>Tuy nhiên,</b> hội nhập trong môi trường giáo dục CAND phải là hội nhập có chọn lọc, tiếp thu tri thức tiến bộ nhưng luôn giữ vững bản lĩnh chính trị, bản sắc CAND Việt Nam và lợi ích quốc gia – dân tộc."
    },
    "66": {
      id: "66",
      title: "Nghị quyết 66",
      topic: "Đổi mới công tác xây dựng và thi hành pháp luật",
      relationLevel: "rất trực tiếp",
      schoolFocus: "đào tạo tư duy pháp lý, ý thức thượng tôn pháp luật, kỹ năng xử lý tình huống, thực thi pháp luật đúng quy trình",
      answer: "Đối với Nghị quyết 66, mối liên hệ với Trường Đại học Cảnh sát nhân dân là <b>rất trực tiếp</b>. Nhà trường là nơi đào tạo đội ngũ cán bộ Cảnh sát trực tiếp thực thi pháp luật trong tương lai, vì vậy cần:<br><br><ul><li><b>Đổi mới giảng dạy:</b> pháp luật, nghiệp vụ, kỹ năng xử lý tình huống.</li><li><b>Giáo dục ý thức:</b> thượng tôn pháp luật cho học viên.</li></ul><br><b>=> Mục tiêu:</b> hình thành người cán bộ Cảnh sát có tư duy pháp lý vững vàng, hành động đúng pháp luật, đúng quy trình, tôn trọng Nhân dân và bảo vệ quyền, lợi ích hợp pháp của tổ chức, cá nhân."
    },
    "68": {
      id: "68",
      title: "Nghị quyết 68",
      topic: "Phát triển kinh tế tư nhân",
      relationLevel: "gián tiếp, liên hệ chọn lọc",
      schoolFocus: "đào tạo cán bộ Cảnh sát có năng lực bảo đảm an ninh, trật tự, phòng chống tội phạm kinh tế, tài chính, thương mại, công nghệ cao",
      answer: "Nghị quyết 68 liên hệ với Trường Đại học Cảnh sát nhân dân ở mức <b>gián tiếp</b>, cần trình bày chọn lọc, tránh gượng ép.<br><br>Nhà trường không phải là chủ thể trực tiếp phát triển kinh tế tư nhân, nhưng có vai trò:<br><ul><li>Đào tạo cán bộ Cảnh sát có nhận thức đúng về kinh tế thị trường định hướng XHCN.</li><li>Xây dựng năng lực bảo đảm an ninh, trật tự, phòng chống tội phạm kinh tế, tài chính, thương mại và công nghệ cao.</li></ul><br><b>=> Như vậy,</b> Nhà trường góp phần thực hiện nghị quyết bằng việc chuẩn bị đội ngũ cán bộ Cảnh sát có khả năng bảo vệ môi trường kinh doanh an toàn, minh bạch, đúng pháp luật."
    },
    "70": {
      id: "70",
      title: "Nghị quyết 70",
      topic: "Bảo đảm an ninh năng lượng quốc gia",
      relationLevel: "gián tiếp, ngắn gọn",
      schoolFocus: "giáo dục nhận thức về an ninh năng lượng, sử dụng năng lượng tiết kiệm, xây dựng môi trường học đường xanh, kỷ luật, an toàn",
      answer: "Nghị quyết 70 liên hệ với Trường Đại học Cảnh sát nhân dân ở phương diện giáo dục nhận thức và xây dựng môi trường học đường tiết kiệm, kỷ luật, an toàn:<br><br><ul><li><b>Về nhận thức:</b> Cần giúp học viên hiểu rằng an ninh năng lượng là bộ phận quan trọng của an ninh quốc gia, gắn với ổn định kinh tế - xã hội.</li><li><b>Về hành động:</b> Việc thực hiện nghị quyết bắt đầu từ sử dụng tiết kiệm điện, nước, tài sản công; xây dựng campus xanh, an toàn, kỷ luật.</li></ul><br>Qua đó hình thành ý thức trách nhiệm của người cán bộ Cảnh sát nhân dân tương lai."
    },
    "71": {
      id: "71",
      title: "Nghị quyết 71",
      topic: "Đột phá phát triển giáo dục và đào tạo",
      relationLevel: "trực tiếp nhất",
      schoolFocus: "đổi mới chương trình, giáo trình, phương pháp dạy học, chuẩn đầu ra, đội ngũ giảng viên, năng lực tự học, năng lực số của học viên",
      answer: "Trong các nghị quyết chuyên đề, Nghị quyết 71 là nội dung có liên hệ <b>trực tiếp và sâu sắc nhất</b> với Trường Đại học Cảnh sát nhân dân. Việc thực hiện nghị quyết cần cụ thể hóa qua 2 tiêu điểm:<br><br><ul><li><b>1. Đổi mới toàn diện:</b> chương trình, giáo trình, phương pháp dạy học, chuẩn đầu ra, kiểm tra đánh giá và nâng cao chất lượng giảng viên.</li><li><b>2. Đào tạo đặc thù:</b> xây dựng người cán bộ Cảnh sát vừa có bản lĩnh chính trị, đạo đức cách mạng, vừa có tri thức pháp luật, nghiệp vụ, năng lực số và khả năng thích ứng.</li></ul><br><b>Nói ngắn gọn,</b> Nghị quyết 71 đi vào Nhà trường bằng đổi mới từng bài giảng, từng giờ học, từng tình huống thực hành và từng chuẩn đầu ra của người học."
    },
    "72": {
      id: "72",
      title: "Nghị quyết 72",
      topic: "Bảo vệ, chăm sóc và nâng cao sức khỏe nhân dân",
      relationLevel: "gián tiếp nhưng hợp lý",
      schoolFocus: "giáo dục thể chất, rèn luyện thể lực, chăm sóc sức khỏe tinh thần, xây dựng môi trường học tập lành mạnh cho học viên CAND",
      answer: "Đối với Nghị quyết 72, có thể liên hệ với Trường Đại học Cảnh sát nhân dân ở phương diện:<br><br><ul><li>Giáo dục thể chất, rèn luyện thể lực.</li><li>Chăm sóc sức khỏe tinh thần.</li><li>Xây dựng môi trường học tập lành mạnh cho học viên.</li></ul><br>Với lực lượng CAND, sức khỏe không chỉ là yêu cầu cá nhân, mà còn là <b>điều kiện nghề nghiệp</b> để sẵn sàng nhận và hoàn thành nhiệm vụ. Nhà trường góp phần thực hiện nghị quyết bằng việc nâng cao thể chất, tinh thần, ý chí, sức bền và khả năng thích ứng cho học viên."
    },
    "79": {
      id: "79",
      title: "Nghị quyết 79",
      topic: "Phát triển kinh tế nhà nước",
      relationLevel: "gián tiếp, rất ngắn hoặc có thể bỏ qua",
      schoolFocus: "quản trị hiệu quả nguồn lực công, tài sản công, cơ sở vật chất, thư viện, phòng học, thao trường, hệ thống công nghệ thông tin",
      answer: "Nghị quyết 79 không phải là nghị quyết gắn trực tiếp với chức năng đào tạo của Trường Đại học Cảnh sát nhân dân. Nếu liên hệ, chỉ nên tập trung ở phương diện <b>quản trị hiệu quả nguồn lực công</b> trong môi trường giáo dục CAND.<br><br>Điều đó có nghĩa là Nhà trường cần sử dụng:<br><ul><li>Tiết kiệm, minh bạch, hiệu quả ngân sách, tài sản công.</li><li>Khai thác tối đa cơ sở vật chất, phòng học, thao trường, thư viện, học liệu và hệ thống CNTT.</li></ul><br><b>=> Mục tiêu:</b> Phục vụ tốt nhất cho nhiệm vụ đào tạo, nghiên cứu khoa học và xây dựng lực lượng Cảnh sát nhân dân."
    },
    "80": {
      id: "80",
      title: "Nghị quyết 80",
      topic: "Phát triển văn hóa Việt Nam",
      relationLevel: "rất trực tiếp ở phương diện văn hóa CAND, văn hóa học đường, giáo dục chính trị tư tưởng",
      schoolFocus: "văn hóa học đường CAND, văn hóa pháp luật, văn hóa ứng xử, văn hóa đọc, văn hóa số, vai trò của Khoa LLCT&KHXHNV",
      answer: "Đối với Nghị quyết 80, có thể liên hệ rất rõ với Trường Đại học Cảnh sát nhân dân ở phương diện <b>xây dựng văn hóa học đường CAND</b>:<br><br><ul><li>Đó là văn hóa chính trị, pháp luật, ứng xử, văn hóa đọc, văn hóa số, văn hóa nêu gương, kỷ luật và tinh thần vì Nhân dân phục vụ.</li><li><b>Khoa Lý luận chính trị và Khoa học xã hội nhân văn</b> có vai trò nòng cốt trong giáo dục chủ nghĩa Mác – Lênin, tư tưởng Hồ Chí Minh, lịch sử Đảng, đạo đức cách mạng và lý tưởng cống hiến.</li></ul><br>Có thể nói, phát triển văn hóa trong Trường Đại học Cảnh sát nhân dân chính là xây dựng người học viên Cảnh sát có <b>bản lĩnh, nhân văn, kỷ luật, trách nhiệm</b> và giàu khát vọng cống hiến."
    }
  };

  const INTENT_TYPES = {
    "QUOTE_DOCUMENT": "Trích dẫn văn kiện, nghị quyết",
    "SUMMARY": "Khái quát nội dung chính",
    "SCHOOL_RELATION": "Liên hệ với Trường Đại học CSND",
    "POLICE_RELATION": "Liên hệ với lực lượng CAND hoặc lực lượng CSND nói chung",
    "AI_ROLE": "Vai trò của AI trong hỗ trợ báo cáo viên",
    "CONCLUSION": "Thông điệp kết luận",
    "COMPARE": "So sánh, phân biệt các nghị quyết hoặc phân biệt Trường với đơn vị khác",
    "CLARIFY": "Giải thích lại cho rõ",
    "UNKNOWN": "Chưa xác định rõ ý định"
  };
function initUI() {
    if (document.getElementById('apple-ai-overlay')) return;

    // Remove old overlay if exists
    const oldOverlay = document.getElementById('ai-copilot-overlay');
    if (oldOverlay) oldOverlay.remove();

    const overlay = document.createElement('div');
    overlay.id = 'apple-ai-overlay';
    overlay.className = 'apple-ai-overlay';
    overlay.style.display = 'none'; // BULLETPROOF FIX: hidden by default
    overlay.style.pointerEvents = 'none'; // BULLETPROOF FIX: never capture clicks
    overlay.innerHTML = `
      <button id="apple-ai-close" style="position: absolute; top: 20px; right: 20px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.2); color: white; width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10000; pointer-events: auto; backdrop-filter: blur(10px); font-size: 1.2rem; transition: all 0.3s;">✕</button>
      <div class="apple-edge-glow" style="pointer-events: none;"></div>
      <div class="apple-ai-content" style="pointer-events: auto;">
        <p id="apple-ai-text"></p>
        <input type="text" id="apple-ai-input" placeholder="Hỏi AI (Hoặc nói vào Micro)..." autocomplete="off" style="width: 100%; max-width: 600px; padding: 12px 20px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.5); color: #fff; font-size: 1.1rem; margin-top: 15px; outline: none; display: none; align-self: center;">
        <div class="apple-ai-hint" style="align-self: center; margin-top: 10px;"><strong>Trợ lý XIV</strong></div>
      </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById('apple-ai-close').addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof stopAI === 'function') stopAI();
        else {
           document.getElementById('apple-ai-overlay').style.display = 'none';
           document.body.classList.remove('apple-ai-active');
        }
    });

    // Thêm nút nổi (FAB) cho thiết bị di động
    const fab = document.createElement('button');
    fab.id = 'apple-ai-fab';
        fab.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="22"></line>
      </svg>
      <span style="font-weight: 600; font-size: 14px; white-space: nowrap;">Trợ lý AI</span>
    `;
    // Thêm CSS keyframes cho hiệu ứng nháy (pulse)
    if (!document.getElementById('ai-fab-style')) {
      const style = document.createElement('style');
      style.id = 'ai-fab-style';
      style.textContent = `
        @keyframes ai-fab-pulse {
          0% { box-shadow: 0 0 0 0 rgba(88, 86, 214, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(88, 86, 214, 0); }
          100% { box-shadow: 0 0 0 0 rgba(88, 86, 214, 0); }
        }
      `;
      document.head.appendChild(style);
    }

        fab.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      padding: 12px 24px;
      border-radius: 30px;
      background: rgba(88, 86, 214, 0.95);
      border: 2px solid rgba(255,255,255,0.4);
      backdrop-filter: blur(10px);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10000;
      box-shadow: 0 8px 25px rgba(88, 86, 214, 0.6);
      transition: all 0.3s ease;
      animation: ai-fab-pulse 2s infinite;
    `;
    
    fab.onmouseenter = () => {
      fab.style.transform = 'scale(1.1)';
      fab.style.boxShadow = '0 12px 30px rgba(88, 86, 214, 0.8)';
      fab.style.border = '2px solid rgba(255,255,255,0.8)';
    };
    fab.onmouseleave = () => {
      fab.style.transform = 'scale(1)';
      fab.style.boxShadow = '0 8px 25px rgba(88, 86, 214, 0.6)';
      fab.style.border = '2px solid rgba(255,255,255,0.4)';
    };

    fab.onclick = () => {
      if (currentState === 'IDLE') {
        startInteraction();
      } else if (currentState === 'LISTENING') {
        // Chủ động ngắt ghi âm để trả lời ngay lập tức (Bỏ qua 1.5s chờ của trình duyệt)
        if (recognition) {
          try { recognition.stop(); } catch(e){}
        }
      } else {
        stopAI();
      }
    };
    document.body.appendChild(fab);

    // Bắt sự kiện Enter cho input
    const inputEl = document.getElementById('apple-ai-input');
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = inputEl.value.trim();
        if (val) {
          if (recognition) { try { recognition.stop(); } catch(err){} }
          setUIState('PROCESSING');
          inputEl.style.display = 'none';
          playResponse(val);
            inputEl.value = '';
        }
      }
    });
  }

  function setUIState(state, text = '') {
    currentState = state;
    const overlay = document.getElementById('apple-ai-overlay');
    const textEl = document.getElementById('apple-ai-text');
    const inputEl = document.getElementById('apple-ai-input');
    
    if (!overlay || !textEl) return;

    // Reset classes
    overlay.className = 'apple-ai-overlay';
    
    if (state === 'IDLE') { 
      overlay.style.display = 'none';
      document.body.classList.remove('apple-ai-active');
      textEl.innerHTML = '';
      if(inputEl) { inputEl.style.display = 'none'; inputEl.value = ''; }
      clearHighlight();
    } 
    else if (state === 'LISTENING') { 
      overlay.style.display = 'flex';
      document.body.classList.add('apple-ai-active');
      overlay.classList.add('active', 'listening');
      textEl.innerHTML = text || '<em>Tôi đang nghe...</em>';
      if(inputEl) { 
        inputEl.style.display = 'block'; 
        setTimeout(() => inputEl.focus(), 100); 
      }
    } 
    else if (state === 'PROCESSING') {
      overlay.style.display = 'flex';
      overlay.classList.add('active', 'processing');
      textEl.innerHTML = ''; // Không hiển thị text khi đang xử lý (Apple style)
      if(inputEl) inputEl.style.display = 'block';
    } 
    else if (state === 'SPEAKING') {
      overlay.style.display = 'flex';
      overlay.classList.add('active', 'speaking');
      textEl.innerHTML = '';
      if(inputEl) {
        inputEl.style.display = 'block';
        setTimeout(() => inputEl.focus(), 100); 
      }
    }
  }

  function typeWriterEffect(text, elementId, speed = 40) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.innerHTML = '';
    let i = 0;
    
    if (typeWriterInterval) clearInterval(typeWriterInterval);
    
    typeWriterInterval = setInterval(() => {
      if (i < text.length) {
        // Xử lý render tức thì nếu gặp thẻ HTML (giúp in đậm, gạch đầu dòng, etc.)
        if (text.charAt(i) === '<') {
          let tag = '';
          while (i < text.length && text.charAt(i) !== '>') {
            tag += text.charAt(i);
            i++;
          }
          tag += '>';
          el.innerHTML += tag;
          i++;
        } else {
          el.innerHTML += text.charAt(i);
          i++;
        }
      } else {
        clearInterval(typeWriterInterval);
      }
    }, speed);
  }

  function clearHighlight() {
    if (lastHighlightedElement) {
      lastHighlightedElement.classList.remove('apple-ai-highlight');
      lastHighlightedElement = null;
    }
  }

  // --- LOCAL RAG: SCREEN-ON AWARENESS ---
  function analyzeScreenContext(transcript) {
    if (!transcript || transcript.trim().length < 5) return null;

    // Xử lý từ khóa
    const stopwords = ['là','gì','có','không','như','thế','nào','tại','sao','của','các','những','hãy','cho','tôi','biết','đồng','chí','ai','về'];
    const rawWords = transcript.toLowerCase().replace(/[?,.!]/g, '').split(' ');
    const keywords = rawWords.filter(w => w.length > 1 && !stopwords.includes(w));
    
    if (keywords.length === 0) return null;

    // Tìm trong detail content
    const detailView = document.getElementById('detail-view');
    if (!detailView || detailView.style.display === 'none') return null;

    // Quét các thẻ chứa text
    const elements = detailView.querySelectorAll('p, li, h2, h3, h4');
    let bestMatch = null;
    let maxScore = 0;

    elements.forEach(el => {
      const text = el.innerText.toLowerCase();
      if (!text) return;
      
      let score = 0;
      keywords.forEach(kw => {
        if (text.includes(kw)) score++;
      });

      // Tăng điểm nếu có cụm từ liền nhau
      if (text.includes(keywords.join(' '))) score += 5;

      if (score > maxScore && score > 0) {
        maxScore = score;
        bestMatch = el;
      }
    });

    return bestMatch;
  }

  // Xử lý văn bản trước khi đọc để tránh lỗi giọng Anh xen lẫn giọng Việt trên Chrome/Edge
  function sanitizeTextForTTS(text) {
    return text
      .replace(/<[^>]*>?/gm, '') // Xóa toàn bộ thẻ HTML trước khi đọc
      .replace(/\bAI\b/g, 'Ay Ai')
      .replace(/\bFDI\b/g, 'Ép Đê Y')
      .replace(/\bIT\b/g, 'Ai Ti')
      .replace(/\bInternet\b/g, 'In tơ nét')
      .replace(/\bSmartphone\b/g, 'Sờ mát phôn')
      .replace(/\bWTO\b/g, 'Vê kép tê ô')
      .replace(/\bCPTPP\b/g, 'Xê Pê Tê Pê Pê')
      .replace(/\bEVFTA\b/g, 'E Vê Ép Tê A')
      .replace(/\bCNTT\b/g, 'Công nghệ thông tin')
      .replace(/\bCách mạng công nghiệp 4\.0\b/gi, 'Cách mạng công nghiệp bốn chấm không')
      .replace(/\b4\.0\b/g, 'bốn chấm không')
      .replace(/\bApp\b/g, 'Áp')
      .replace(/\bBig Data\b/gi, 'Bích Đa ta')
      .replace(/\bBlockchain\b/gi, 'Bờ lốc chain')
      .replace(/\bCloud\b/gi, 'Cờ lau')
      .replace(/\bWeb\b/gi, 'Goép');
  }

  function speakDynamicText(text) {
    synth.cancel();
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const cleanText = sanitizeTextForTTS(text);
    
    // Split into chunks to prevent clipping (Web Speech API limits ~200 chars)
    const rawChunks = cleanText.match(/[^.!?\n]+[.!?\n]*/g) || [cleanText];
    const chunks = [];
    rawChunks.forEach(chunk => {
        if (chunk.length <= 180) {
            chunks.push(chunk);
        } else {
            const subChunks = chunk.match(/[^,;:]+[,;:]*/g) || [chunk];
            let tempChunk = "";
            subChunks.forEach(sub => {
                if ((tempChunk + sub).length <= 180) {
                    tempChunk += sub;
                } else {
                    if (tempChunk.trim()) chunks.push(tempChunk.trim());
                    if (sub.length > 180) {
                        const words = sub.split(' ');
                        let wordTemp = "";
                        words.forEach(w => {
                            if ((wordTemp + " " + w).length <= 180) wordTemp += (wordTemp ? " " : "") + w;
                            else {
                                if (wordTemp) chunks.push(wordTemp);
                                wordTemp = w;
                            }
                        });
                        if (wordTemp) tempChunk = wordTemp;
                    } else {
                        tempChunk = sub;
                    }
                }
            });
            if (tempChunk.trim()) chunks.push(tempChunk.trim());
        }
    });

    let currentChunk = 0;

    const playNextChunk = () => {
      if (currentChunk >= chunks.length || currentState !== 'SPEAKING') {
        return;
      }

      let chunkText = chunks[currentChunk].trim();
      if (!chunkText) {
        currentChunk++;
        playNextChunk();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(chunkText);
      utterance.lang = 'vi-VN';
      utterance.rate = 1.0; 
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      const viVoice = getFixedVietnameseVoice();
      
      if (viVoice) {
         utterance.voice = viVoice;
         utterance.onend = () => {
            currentChunk++;
            playNextChunk();
         };
         utterance.onerror = (e) => {
            console.warn("TTS Error", e);
            currentChunk++;
            playNextChunk();
         };
         synth.speak(utterance);
      } else {
         console.warn("Không tìm được giọng Web Speech vi-VN. Kích hoạt Google Translate TTS API dự phòng.");
         
         // Nếu có preload từ trước thì tái sử dụng để phát ngay lập tức
         let audio;
         if (window.__nextAudioPreload && window.__nextAudioPreload.dataset.chunkIndex == currentChunk) {
             audio = window.__nextAudioPreload;
         } else {
             const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=vi&q=${encodeURIComponent(chunkText)}`;
             audio = new Audio(url);
         }
         
         currentAudio = audio;
         audio.onended = () => {
             currentChunk++;
             playNextChunk();
         };
         audio.onerror = () => {
             console.error("Lỗi mạng khi tải Google TTS API");
             currentChunk++;
             playNextChunk();
         };
         audio.play().catch(e => {
             console.error("Audio blocked by browser:", e);
             currentChunk++;
             playNextChunk();
         });
         
         // Preload audio cho chunk tiếp theo để loại bỏ hoàn toàn độ trễ mạng
         if (currentChunk + 1 < chunks.length) {
             const nextText = chunks[currentChunk + 1].trim();
             if (nextText) {
                 const nextUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=vi&q=${encodeURIComponent(nextText)}`;
                 const nextAudio = new Audio(nextUrl);
                 nextAudio.preload = 'auto';
                 nextAudio.dataset.chunkIndex = currentChunk + 1;
                 window.__nextAudioPreload = nextAudio;
             }
         }
      }
    };

    playNextChunk();
  }

  function playResponse(transcript = '') {
    if (currentState === 'IDLE') return;
    
    setUIState('PROCESSING');

    setTimeout(() => {
      if (currentState === 'IDLE') return;
      
      let finalAnswerText = "";
      let normText = transcript.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[?,.!]/g, '');
      
      let detectedResolutionId = null;
      let isAskingAboutThis = normText.includes("cai nay") || normText.includes("nghi quyet nay") || normText.includes("hien tai") || normText.includes("o day") || normText.includes("trang nay");
      
      for (const key in RESOLUTION_MAP) {
         if (transcript.includes(key)) {
             detectedResolutionId = key;
             break;
         }
      }

      if (!detectedResolutionId) {
         if (normText.includes("hoi nhap") || normText.includes("quoc te")) detectedResolutionId = "59";
         else if (normText.includes("chuyen doi so") || normText.includes("cong nghe") || normText.includes("so hoa")) detectedResolutionId = "57";
         else if (normText.includes("giao duc") || normText.includes("dao tao") || normText.includes("hoc tap")) detectedResolutionId = "71";
         else if (normText.includes("van hoa")) detectedResolutionId = "80";
         else if (normText.includes("phap luat") || normText.includes("nha nuoc phap quyen") || normText.includes("thi hanh phap luat")) detectedResolutionId = "66";
         else if (normText.includes("nang luong") || normText.includes("tiet kiem")) detectedResolutionId = "70";
         else if (normText.includes("suc khoe") || normText.includes("y te")) detectedResolutionId = "72";
         else if (normText.includes("kinh te tu nhan") || normText.includes("doanh nghiep tu nhan")) detectedResolutionId = "68";
         else if (normText.includes("kinh te nha nuoc") || normText.includes("doanh nghiep nha nuoc") || normText.includes("nguon luc cong")) detectedResolutionId = "79";
      }

      const currentId = window.APP && APP.getCurrentResolutionId ? APP.getCurrentResolutionId() : null;
      let screenAwareId = currentId ? currentId.replace(/\D/g, '') : null;
      if (!detectedResolutionId && (isAskingAboutThis || screenAwareId)) {
          detectedResolutionId = screenAwareId;
      }

      let intent = "UNKNOWN";
      if (normText.includes("lien he") || normText.includes("truong") || normText.includes("nha truong") || normText.includes("csnd") || normText.includes("canh sat nhan dan") || normText.includes("khoa") || normText.includes("giang vien") || normText.includes("giang duong") || normText.includes("hoc vien")) {
          intent = "SCHOOL_RELATION";
      } else if (normText.includes("khac biet") || normText.includes("so voi") || normText.includes("don vi khac") || normText.includes("dac thu") || normText.includes("nghiep vu")) {
          intent = "COMPARE";
      } else if (normText.includes("ket luan") || normText.includes("tom lai") || normText.includes("chot lai")) {
          intent = "CONCLUSION";
      } else if (normText.includes("chinh quy") || normText.includes("tinh nhue") || normText.includes("hien dai")) {
          intent = "POLICE_RELATION";
      } else if (normText.includes("ai ") || normText.includes("tro ly") || normText.includes("thay the") || normText.includes("vai tro")) {
          intent = "AI_ROLE";
      } else if (normText.includes("tom tat") || normText.includes("noi chinh") || normText.includes("cot loi") || normText.includes("noi dung") || normText.includes("lam ro") || normText.includes("cu the") || normText.includes("nhu the nao") || normText.includes("gi")) {
          intent = "SUMMARY";
      } else if (normText.includes("guong ep")) {
          intent = "CLARIFY";
      } else if (normText.includes("doc lai")) {
          intent = "READ_LAST";
      }


      // --- KỊCH BẢN NÂNG CAO NĂNG LỰC LÃNH ĐẠO (ĐẠI HỘI XIV) ---
      
      // Ý định 1: Mở đầu / Chào hỏi
      if (normText.includes("xin chao") || normText.includes("chao tro ly") || normText.includes("bat dau")) {
          finalAnswerText = "<b>Xin chào đồng chí báo cáo viên, xin kính chào Ban Giám khảo và quý vị đại biểu!</b><br><br>Tôi là trợ lý AI đồng hành trong phần trình bày hôm nay. Nhiệm vụ của tôi là hỗ trợ tra cứu, hệ thống hóa, diễn giải và chuyển hóa nội dung nghị quyết thành thông điệp:<br><ul style=\"margin-left: 20px; margin-top: 10px;\"><li>Ngắn gọn, chính xác</li><li>Dễ hiểu, dễ nhớ</li><li>Phục vụ hiệu quả công tác tuyên truyền</li></ul>";
      }
      // Ý định 2: Trích dẫn văn kiện (Trang 383)
      else if (normText.includes("trich") || normText.includes("trang 383") || (normText.includes("van kien") && normText.includes("suc chien dau"))) {
          finalAnswerText = "Theo nội dung đồng chí cung cấp từ Văn kiện Đại hội đại biểu toàn quốc lần thứ XIV, Đảng ta khẳng định: “Tiếp tục đẩy mạnh xây dựng, chỉnh đốn Đảng trong sạch, vững mạnh toàn diện; nâng cao năng lực lãnh đạo, cầm quyền và sức chiến đấu của Đảng. Tăng cường xây dựng, chỉnh đốn, tự đổi mới để Đảng ta thật sự là đạo đức, là văn minh”.\n\nĐoạn trích này được dẫn từ Văn kiện Đại hội đại biểu toàn quốc lần thứ XIV, tập II, Nxb. Chính trị quốc gia Sự thật, Hà Nội, 2026, tr.383.\n\nNội dung trên thể hiện yêu cầu có ý nghĩa chiến lược: muốn đất nước phát triển nhanh, bền vững, Đảng phải không ngừng tự đổi mới, tự chỉnh đốn, nâng cao bản lĩnh chính trị, trí tuệ lãnh đạo, năng lực cầm quyền và sức chiến đấu trong mọi điều kiện, hoàn cảnh.";
      }
      // Ý định 3: Khái quát 5 nội dung cơ bản
      else if (normText.includes("khai quat") || normText.includes("may diem") || normText.includes("nhom van de") || normText.includes("co ban")) {
          finalAnswerText = "Có thể khái quát thành 5 nội dung cơ bản:\n\nMột là, tiếp tục đẩy mạnh xây dựng, chỉnh đốn Đảng và hệ thống chính trị trong sạch, vững mạnh toàn diện; nâng cao chất lượng công tác xây dựng Đảng về chính trị, tư tưởng, đạo đức, tổ chức và cán bộ.\n\nHai là, xây dựng đội ngũ cán bộ, nhất là cán bộ lãnh đạo, quản lý và người đứng đầu các cấp có đủ phẩm chất, năng lực, uy tín, ngang tầm nhiệm vụ.\n\nBa là, đổi mới đồng bộ phương thức lãnh đạo của Đảng, nâng cao năng lực lãnh đạo, năng lực cầm quyền và hiệu quả tổ chức thực hiện các chủ trương, nghị quyết của Đảng.\n\nBốn là, tăng cường kiểm soát quyền lực; đẩy mạnh phòng, chống tham nhũng, lãng phí, tiêu cực; kiên quyết đấu tranh ngăn chặn, đẩy lùi suy thoái về tư tưởng chính trị, đạo đức, lối sống và các biểu hiện “tự diễn biến”, “tự chuyển hóa” trong nội bộ.\n\nNăm là, tăng cường bảo vệ nền tảng tư tưởng của Đảng; đấu tranh phản bác các quan điểm sai trái, thù địch.\n\nTựu trung lại, đây là quá trình làm cho Đảng mạnh hơn về chính trị, vững hơn về tư tưởng, trong hơn về đạo đức, chặt chẽ hơn về tổ chức và hiệu quả hơn trong lãnh đạo thực tiễn.";
      }
      // Ý định 4: Tóm tắt từ khóa / dễ nhớ
      else if (normText.includes("tom tat") || normText.includes("tu khoa") || normText.includes("de nho") || normText.includes("ngan gon")) {
          finalAnswerText = "Có thể ghi nhớ bằng 5 cụm từ khóa:\n\nXây dựng Đảng trong sạch – Cán bộ ngang tầm – Phương thức lãnh đạo đổi mới – Quyền lực được kiểm soát – Nền tảng tư tưởng được bảo vệ.\n\nNói ngắn gọn, nâng cao năng lực lãnh đạo, cầm quyền và sức chiến đấu của Đảng là làm cho Đảng thật sự trong sạch, vững mạnh, trí tuệ, bản lĩnh, gắn bó mật thiết với Nhân dân và đủ năng lực lãnh đạo đất nước phát triển trong giai đoạn mới.";
      }
      // Ý định 5: Ý nghĩa đối với công tác tuyên truyền
      else if (normText.includes("y nghia") || normText.includes("tuyen truyen") || normText.includes("bao cao vien can nam")) {
          finalAnswerText = "Nội dung này có ý nghĩa <b>rất quan trọng</b> đối với công tác tuyên truyền nghị quyết hiện nay:<br><br><ul style=\"margin-left: 20px; line-height: 1.6;\"><li style=\"margin-bottom: 8px;\"><b>Thứ nhất (Trọng tâm tuyên truyền):</b> Tuyên truyền không chỉ là truyền đạt văn bản, mà là làm cho quần chúng hiểu đúng, tin tưởng, đồng thuận và hành động.</li><li style=\"margin-bottom: 8px;\"><b>Thứ hai (Yêu cầu nêu gương):</b> Năng lực lãnh đạo và sức chiến đấu phải được thể hiện bằng hành động cụ thể và hiệu quả công tác của người đứng đầu.</li><li style=\"margin-bottom: 8px;\"><b>Thứ ba (Đổi mới phương thức):</b> Báo cáo viên cần kết hợp lý luận với thực tiễn, ứng dụng công nghệ số và trí tuệ nhân tạo (AI) để bài trình bày sinh động, trực quan hơn.</li></ul>";
      }
      // Ý định 6: Vai trò của AI / Công nghệ
      else if (normText.includes("ai giup") || normText.includes("cong nghe") || normText.includes("ai ho tro")) {
          finalAnswerText = "AI có thể hỗ trợ báo cáo viên trên 4 phương diện.\n\nThứ nhất, hỗ trợ tra cứu và hệ thống hóa tài liệu. Khi được cung cấp nguồn dữ liệu chính thống, AI có thể giúp tìm nhanh nội dung liên quan, lập dàn ý, xây dựng sơ đồ tư duy và gợi ý các luận điểm cần nhấn mạnh.\n\nThứ hai, hỗ trợ chuyển hóa nội dung nghị quyết thành ngôn ngữ phù hợp với từng đối tượng. Cùng một nội dung, AI có thể gợi ý bản trình bày đầy đủ, bản hỏi – đáp, bản tóm tắt, bản infographic hoặc thông điệp ngắn cho truyền thông số.\n\nThứ ba, hỗ trợ nâng cao tính trực quan và sức thuyết phục của bài báo cáo. AI có thể gợi ý bố cục slide, ví dụ thực tiễn, câu hỏi tương tác, bảng so sánh và thông điệp kết luận.\n\nThứ tư, hỗ trợ báo cáo viên tự rèn luyện. AI có thể đóng vai người nghe phản biện, đặt câu hỏi giả định, phát hiện chỗ diễn đạt chưa rõ và gợi ý cách trình bày mạch lạc hơn.\n\nTuy nhiên, AI chỉ là công cụ hỗ trợ. Bản lĩnh chính trị, năng lực chuyên môn, trách nhiệm tuyên truyền và sự nhạy bén trước thực tiễn vẫn thuộc về báo cáo viên.";
      }
      // Ý định 7: AI có thay thế báo cáo viên không?
      else if (normText.includes("thay the") || normText.includes("giam vai tro") || normText.includes("lan at")) {
          finalAnswerText = "<b>KHÔNG!</b> Nếu sử dụng đúng định hướng, AI không hề làm giảm vai trò của báo cáo viên mà còn là \"trợ lý\" đắc lực.<br><br><b>Sự phân vai rõ ràng:</b><br><ul style=\"margin-left: 20px; line-height: 1.6;\"><li style=\"margin-bottom: 8px;\"><b>Báo cáo viên:</b> Là chủ thể chính trị, định hướng tư tưởng, truyền cảm hứng, xử lý tình huống và chịu trách nhiệm tuyệt đối.</li><li style=\"margin-bottom: 8px;\"><b>Trợ lý AI:</b> Chỉ là công cụ xử lý thông tin, tự động hóa tác vụ cơ bản và gợi ý phương pháp trình bày.</li></ul><br><b>▶ Tóm lại:</b> AI giúp báo cáo viên <i>nhanh hơn, sâu hơn, sinh động hơn</i>; nhưng AI <b>không bao giờ thay thế được</b> bản lĩnh, niềm tin và sức thuyết phục chính trị của con người.";
      }
      // Ý định 8: Thông điệp kết luận
      else if (normText.includes("ket luan") || normText.includes("thong diep") || normText.includes("ket lai") || normText.includes("doan ket")) {
          finalAnswerText = "<b>THÔNG ĐIỆP KẾT LUẬN:</b><br><br><ul style=\"margin-left: 20px; line-height: 1.6;\"><li style=\"margin-bottom: 8px;\"><b>Về nội dung cốt lõi:</b> Nâng cao năng lực lãnh đạo của Đảng là yêu cầu sống còn. Đây là quá trình xây dựng Đảng trong sạch, đội ngũ cán bộ uy tín, kiểm soát quyền lực và kiên quyết bảo vệ nền tảng tư tưởng.</li><li style=\"margin-bottom: 8px;\"><b>Về phương thức tuyên truyền:</b> Trong thời đại số, AI là công cụ hỗ trợ đắc lực giúp báo cáo viên nghiên cứu sâu hơn, trình bày sinh động hơn và lan tỏa nhanh hơn.</li></ul><br><div style=\"padding: 10px; border-left: 4px solid #e53935; background-color: rgba(229,57,53,0.05); border-radius: 4px;\"><b>▶ Lời khẳng định:</b> Trên hết, con người vẫn là trung tâm! Báo cáo viên chính là linh hồn của buổi tuyên truyền, là cầu nối biến nghị quyết của Đảng thành nhận thức, niềm tin và hành động trong thực tiễn.</div>";
      }
      else if (intent === "READ_LAST" && window.lastFinalAnswerText) {

          finalAnswerText = window.lastFinalAnswerText;
      }
      else if (intent === "AI_ROLE") {
          finalAnswerText = "Thưa đồng chí, Trợ lý AI chỉ là công cụ hỗ trợ để làm sinh động bài báo cáo, giúp lưu trữ và tra cứu thông tin nhanh chóng. Trợ lý không thể và không bao giờ thay thế được tư duy chính trị, bản lĩnh, cảm xúc và kỹ năng sư phạm của người báo cáo viên.";
      }
      else if (intent === "COMPARE") {
          finalAnswerText = "Điểm khác biệt của Trường Đại học Cảnh sát nhân dân so với các đơn vị nghiệp vụ trực tiếp chiến đấu là Nhà trường không triển khai nghị quyết bằng chiến công trên địa bàn, mà cụ thể hóa nghị quyết thông qua đào tạo con người, phát triển tri thức, bồi dưỡng bản lĩnh chính trị, xây dựng văn hóa CAND.<br><br><b>Nói ngắn gọn</b>, Nhà trường đưa nghị quyết vào giảng đường, biến tri thức chính trị thành bản lĩnh, kỹ năng và hành động của người cán bộ Cảnh sát nhân dân tương lai.";
      }
      else if (intent === "CONCLUSION") {
          finalAnswerText = "<b>Có thể khẳng định</b>, điểm nhấn riêng của Trường Đại học Cảnh sát nhân dân trong thực hiện Nghị quyết Đại hội XIV và các nghị quyết chuyên đề là đưa nghị quyết vào môi trường giáo dục, đào tạo, nghiên cứu và rèn luyện.<br><br>Nhà trường cụ thể hóa nghị quyết bằng từng chương trình đào tạo, từng bài giảng, từng chuẩn đầu ra. Qua đó, đào tạo đội ngũ cán bộ Cảnh sát nhân dân chính quy, tinh nhuệ, hiện đại, có bản lĩnh chính trị vững vàng, pháp luật vững chắc, nghiệp vụ tinh thông.";
      }
      else if (intent === "POLICE_RELATION" && (normText.includes("chinh quy") || normText.includes("tinh nhue") || normText.includes("hien dai"))) {
          finalAnswerText = "Đào tạo cán bộ Cảnh sát nhân dân trong giai đoạn mới phải hướng đến chuẩn mực <b>chính quy, tinh nhuệ, hiện đại</b>.<br><br><ul><li><b>Chính quy</b> là vững về kỷ luật, pháp luật.</li><li><b>Tinh nhuệ</b> là giỏi về chuyên môn, sắc bén về tư duy.</li><li><b>Hiện đại</b> là làm chủ công nghệ và ngoại ngữ.</li></ul><br>Tinh thần đó phải được thể hiện trong từng bài giảng và phương pháp đào tạo của Trường Đại học Cảnh sát nhân dân.";
      }
      else if (intent === "CLARIFY" && normText.includes("guong ep")) {
          if (detectedResolutionId === "68" || detectedResolutionId === "79" || detectedResolutionId === "70") {
              finalAnswerText = `Đối với Nghị quyết ${detectedResolutionId}, sự liên hệ với Nhà trường là gián tiếp và cần chọn lọc. Chúng ta không gán ghép khiên cưỡng, mà chỉ liên hệ ở phương diện giáo dục nhận thức và đào tạo năng lực bảo vệ pháp luật, quản trị nguồn lực cho học viên, như vậy sẽ hợp lý và không bị gượng ép.`;
          } else {
              finalAnswerText = `Thưa đồng chí, Nghị quyết ${detectedResolutionId} có sự liên hệ trực tiếp và tự nhiên với chức năng đào tạo, nghiên cứu của Nhà trường, hoàn toàn không gượng ép.`;
          }
      }
      else if (detectedResolutionId) {
          const resObj = RESOLUTION_MAP[detectedResolutionId];
          
          if (intent === "SCHOOL_RELATION" || intent === "SUMMARY" || intent === "UNKNOWN") {
              finalAnswerText = resObj.answer;
          }
      } 
      else {
          if (normText.includes("59") && normText.includes("chuyen doi so")) {
             finalAnswerText = "Không, chuyển đổi số gắn với Nghị quyết 57; Nghị quyết 59 gắn với hội nhập quốc tế trong tình hình mới.";
          } else {
             finalAnswerText = "Để trả lời chính xác hơn, đồng chí vui lòng cho biết đang muốn hỏi về nghị quyết nào:<br><br><div style=\"display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; margin-left: 10px;\"><b>• NQ 57</b><b>• NQ 59</b><b>• NQ 66</b><b>• NQ 68</b><b>• NQ 70</b><b>• NQ 71</b><b>• NQ 72</b><b>• NQ 79</b><b>• NQ 80</b></div>";
          }
      }

      if (detectedResolutionId && finalAnswerText) {
          let hasConflict = false;
          Object.keys(RESOLUTION_MAP).forEach(id => {
              if (id !== detectedResolutionId && finalAnswerText.includes("Nghị quyết " + id)) {
                  hasConflict = true;
              }
          });
          
          if (hasConflict && !(normText.includes("59") && normText.includes("chuyen doi so"))) {
              finalAnswerText = RESOLUTION_MAP[detectedResolutionId].answer;
          }
          
          if (detectedResolutionId === "57" && finalAnswerText.toLowerCase().includes("hội nhập quốc tế")) {
              finalAnswerText = RESOLUTION_MAP["57"].answer;
          }
          if (detectedResolutionId === "59" && finalAnswerText.toLowerCase().includes("chuyển đổi số")) {
              finalAnswerText = RESOLUTION_MAP["59"].answer;
          }
      }

      window.lastFinalAnswerText = finalAnswerText;

      setUIState('SPEAKING');
      typeWriterEffect(finalAnswerText, 'apple-ai-text', 12);
      speakDynamicText(finalAnswerText);

    }, 50); 
  }

  function startInteraction() {
    if (currentState !== 'IDLE') return;

    // Luôn hiển thị giao diện và bật LISTENING
    setUIState('LISTENING');

    if (recognition) {
      try {
        let micErrorOccurred = false;
        
        // Khắc phục UX cấp quyền Micro: Nhắc nhở người dùng chọn "Cho phép" giống ứng dụng di động
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const textEl = document.getElementById('apple-ai-text');
            let isMicReady = false;
            
            // Nếu sau 300ms mà chưa có kết quả (tức là trình duyệt đang hiện Popup hỏi quyền),
            // thì hiển thị dòng chữ hướng dẫn người dùng bấm nút "Cho phép"
            const promptTimer = setTimeout(() => {
                if (!isMicReady && textEl) {
                    textEl.innerHTML = '<span style="color: rgba(255,255,255,0.9); font-size: 1.1rem; animation: ai-fab-pulse 2s infinite;">Đang chờ cấp quyền... Vui lòng chọn <b>"Cho phép" (Allow)</b> trên thông báo của trình duyệt!</span>';
                }
            }, 300);

            navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function(stream) {
                isMicReady = true;
                clearTimeout(promptTimer);
                if (textEl) textEl.innerHTML = ''; // Xóa chữ chờ cấp quyền
                
                // LƯU Ý QUAN TRỌNG: KHÔNG ĐƯỢC ĐÓNG STREAM NGAY LẬP TỨC!
                window.__globalMicStream = stream; // Giữ kết nối phần cứng mở
                try { recognition.start(); } catch(e) { console.warn(e); }
            })
            .catch(function(err) {
                isMicReady = true;
                clearTimeout(promptTimer);
                console.error("Lỗi xin quyền Micro:", err);
                micErrorOccurred = true;
                if (textEl) textEl.innerHTML = '<span style="color: #ff5e62">Truy cập Micro bị từ chối. Vui lòng gõ phím hoặc mở khóa trong cài đặt trình duyệt!</span>';
            });
        } else {
            try { recognition.start(); } catch(e) { console.warn(e); }
        }
        
        let finalTranscript = '';
        recognition.onresult = (event) => {
          let tempTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            tempTranscript += event.results[i][0].transcript;
          }
          finalTranscript = tempTranscript;
          const textEl = document.getElementById('apple-ai-text');
          if (textEl) {
            textEl.innerHTML = `<em>"${finalTranscript}"</em>`;
          }
        };

        recognition.onend = () => {
          // Giải phóng phần cứng sau khi nghe xong
          if (window.__globalMicStream) {
              window.__globalMicStream.getTracks().forEach(track => track.stop());
              window.__globalMicStream = null;
          }

          if (currentState !== 'LISTENING' || micErrorOccurred) return;
          
          setUIState('PROCESSING');
          playResponse(finalTranscript);
        };

        recognition.onerror = (event) => {
          console.error("Mic Error:", event.error);
          micErrorOccurred = true;
          
          if (window.__globalMicStream) {
              window.__globalMicStream.getTracks().forEach(track => track.stop());
              window.__globalMicStream = null;
          }

          const textEl = document.getElementById('apple-ai-text');
          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
             if (textEl) textEl.innerHTML = '<span style="color: #ff5e62">Bị chặn bởi trình duyệt. Vui lòng gõ phím!</span>';
          } else if (event.error === 'network') {
             if (textEl) textEl.innerHTML = '<span style="color: #ff5e62">Lỗi máy chủ Google Voice. Vui lòng gõ phím!</span>';
          } else {
             if (textEl) textEl.innerHTML = '<span style="color: #ff5e62">Mất kết nối Micro. Vui lòng gõ phím!</span>';
          }
          // Giữ nguyên trạng thái LISTENING để người dùng có thể Gõ Phím
        };
      } catch (err) {
        const textEl = document.getElementById('apple-ai-text');
        if (textEl) textEl.innerHTML = '<span style="color: #ff5e62">Micro không khả dụng. Vui lòng nhập câu hỏi vào ô bên dưới!</span>';
      }
    } else {
      const textEl = document.getElementById('apple-ai-text');
      if (textEl) textEl.innerHTML = '<span style="color: #ff5e62">Trình duyệt không hỗ trợ Mic. Vui lòng nhập câu hỏi vào ô bên dưới!</span>';
    }
  }

  function stopAI() {
    if (recognition) {
      try { recognition.stop(); } catch(e){}
    }
    if (simulatedProcessingTimer) clearTimeout(simulatedProcessingTimer);
    if (typeWriterInterval) clearInterval(typeWriterInterval);
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    synth.cancel();
    setUIState('IDLE');
  }

  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setup);
    } else {
      setup();
    }
    
    function setup() {
      initUI();

      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.code === 'Space') {
          e.preventDefault();
          startInteraction();
        }
        if (e.code === 'Escape') {
          stopAI();
        }
      });
      
      // Init voices for dynamic text fallback
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => synth.getVoices();
      }
    }
  }

  return { init, startInteraction, stopAI };
})();

AICopilot.init();

