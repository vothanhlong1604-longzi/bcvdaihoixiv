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
    "66": "Thưa đồng chí, đối với Nghị quyết 66 về Nhà nước pháp quyền, Trường Đại học Cảnh sát nhân dân mang sứ mệnh rèn luyện những sĩ quan Cảnh sát tinh thông pháp luật, kiên quyết chống tội phạm nhưng luôn bảo vệ tuyệt đối quyền con người.",
    "68": "Thưa đồng chí, Nghị quyết 68 khẳng định kinh tế tư nhân là mũi nhọn. Nhiệm vụ cốt lõi của Trường Đại học Cảnh sát nhân dân là đào tạo cán bộ Cảnh sát Kinh tế nhạy bén, tinh thông để bảo vệ môi trường kinh doanh minh bạch.",
    "70": "Thưa đồng chí, Nghị quyết 70 hướng tới Net Zero. Từ góc độ đào tạo, Trường Đại học Cảnh sát nhân dân chú trọng bồi dưỡng kiến thức phòng chống tội phạm môi trường, bảo vệ an ninh tại các công trình năng lượng trọng điểm.",
    "71": "Thưa đồng chí, bám sát Nghị quyết 71 về thực học thực tài, Trường Đại học Cảnh sát nhân dân quyết liệt đổi mới phương pháp giảng dạy, triệt tiêu bệnh thành tích, nhằm đào tạo ra những sĩ quan tinh nhuệ nhất.",
    "72": "Thưa đồng chí, quán triệt Nghị quyết 72, Trường Đại học Cảnh sát nhân dân đặc biệt chú trọng chăm sóc y tế, đảm bảo thể lực sung mãn, tinh thần thép cho học viên để sẵn sàng hoàn thành xuất sắc nhiệm vụ giữ gìn trật tự an toàn xã hội.",
    "79": "Thưa đồng chí, Nghị quyết 79 định vị vai trò của Doanh nghiệp Nhà nước. Nhiệm vụ của Trường Đại học Cảnh sát nhân dân là trang bị kiến thức pháp luật sắc bén cho học viên, trở thành thanh bảo kiếm phòng chống tham nhũng, bảo vệ tài sản quốc gia.",
    "80": "Thưa đồng chí, Nghị quyết 80 khẳng định văn hóa là sức mạnh. Trường Đại học Cảnh sát nhân dân tự hào là điểm sáng gìn giữ văn hóa ứng xử chuẩn mực của người chiến sĩ Công an 'Vì nước quên thân, vì dân phục vụ'.",
    "generic": "Thưa đồng chí, Trường Đại học Cảnh sát nhân dân luôn sẵn sàng. Xin đồng chí vui lòng chọn một chủ đề cụ thể để tôi báo cáo."
  };


const STUDIO_VIDEO_MAP = {
    "lời chào": "./data/video/studio_greeting.mp4",
    "bản đồ tri thức": "./data/video/studio_mindmap.mp4",
    "đại học csnd": "./data/video/studio_csnd.mp4",
    "nghị quyết 71": "./data/video/studio_nq71.mp4",
    "đoạn trích nghị quyết": "./data/video/studio_qa1.mp4",
    "5 nội dung cơ bản": "./data/video/studio_qa2.mp4"
};
const STUDIO_VOICE_MAP = {
    "lời chào": "./data/audio/studio_greeting.mp3",
    "bản đồ tri thức": "./data/audio/studio_mindmap.mp3",
    "đại học csnd": "./data/audio/studio_csnd.mp3",
    "nghị quyết 71": "./data/audio/studio_nq71.mp3",
    "đoạn trích nghị quyết": "./data/audio/studio_qa1.mp3",
    "5 nội dung cơ bản": "./data/audio/studio_qa2.mp3"
};

  function getFixedVietnameseVoice() {
    const voices = synth.getVoices();
    const preferred = [
      'Google Tiếng Việt', 'Microsoft HoaiMy Online', 'Microsoft Nam Online',
      'vi-VN-Standard-A', 'vi-VN'
    ];
    for (const name of preferred) {
      const v = voices.find(v => v.name.includes(name) || v.lang === name);
      if (v) return v;
    }
    return voices.find(v => v.lang === 'vi-VN') || null;
  }

  function getCurrentResolutionId() {
    const hash = window.location.hash || '';
    const match = hash.match(/nghi-quyet\/([\w-]+)/);
    if (match) return match[1];
    const activeEl = document.querySelector('[data-res-id]');
    return activeEl ? activeEl.dataset.resId : null;
  }

  function playVideoAvatar(keyword, text, onComplete) {
    const videoUrl = STUDIO_VIDEO_MAP[keyword];
    const audioUrl = STUDIO_VOICE_MAP[keyword];
    const videoEl = document.getElementById('ai-avatar-video');
    const imgEl = document.getElementById('ai-avatar-img');
    if (!videoEl && !audioUrl) return false;
    const audio = audioUrl ? new Audio(audioUrl) : null;
    if (audio) {
      currentAudio = audio;
      audio.onended = () => {
        if (videoEl && imgEl) { videoEl.style.display = 'none'; imgEl.style.display = 'block'; }
        if (onComplete) onComplete();
      };
    }
    
    if (videoUrl && videoEl && imgEl) {
        videoEl.src = videoUrl;
        videoEl.style.display = 'block';
        imgEl.style.display = 'none';
        
        // If there's no audio, video onended should trigger onComplete
        if (!audioUrl) {
            videoEl.onended = () => {
                videoEl.style.display = 'none';
                imgEl.style.display = 'block';
                if (onComplete) onComplete();
            };
        }
        
        videoEl.play().then(() => {
            isVideoPlaying = true;
        }).catch(e => {
            console.error("Video failed to play:", e);
            videoEl.style.display = 'none';
            imgEl.style.display = 'block';
        });
    }
    
    if (audio) {
        audio.play().catch(e => {
            console.error("Audio failed to play:", e);
            if (!isVideoPlaying && videoEl && imgEl) {
                videoEl.style.display = 'none';
                imgEl.style.display = 'block';
            }
            typeWriterEffect(text, 'apple-ai-text', 12);
            speakDynamicText(text);
        });
    } else if (!videoUrl) {
        return false;
    }
    
    return true;
  }

  function playStudioVoice(keyword, text, onComplete) {
    const audioUrl = STUDIO_VOICE_MAP[keyword];
    if (!audioUrl) return false;
    const audio = new Audio(audioUrl);
    currentAudio = audio;
    typeWriterEffect(text, 'apple-ai-text', 12);
    audio.play().catch(e => {
      console.error('Studio voice failed:', e);
      speakDynamicText(text);
    });
    audio.onended = () => { if (onComplete) onComplete(); };
    return true;
  }

  function setUIState(state) {
    const overlay = document.getElementById('apple-ai-overlay');
    if (!overlay) return;
    const textEl = document.getElementById('apple-ai-text');
    const inputEl = document.getElementById('apple-ai-input');
    overlay.className = 'apple-ai-overlay';
    currentState = state;
    if (state === 'IDLE') {
      overlay.style.display = 'none';
      document.body.classList.remove('apple-ai-active');
      clearHighlight();
      const vis = document.getElementById('ai-audio-visualizer');
      if (vis) { vis.style.opacity = '0'; vis.classList.remove('visualizer-anim'); }
      if (inputEl) inputEl.style.display = 'none';
    } else if (state === 'LISTENING') {
      overlay.style.display = 'flex';
      document.body.classList.add('apple-ai-active');
      overlay.classList.add('active', 'listening');
      if (textEl) textEl.innerHTML = '<em style="color:rgba(255,255,255,0.7);">🎤 Đang lắng nghe... Hãy đặt câu hỏi!</em>';
      if (inputEl) { 
        inputEl.style.display = 'block'; 
        setTimeout(() => inputEl.focus(), 150); 
      }
    } 
    else if (state === 'PROCESSING') {
      overlay.style.display = 'flex';
      const avatarImg = document.getElementById('ai-avatar-img');
      if (avatarImg) {
        avatarImg.classList.remove('avatar-bootup');
        void avatarImg.offsetWidth;
        avatarImg.classList.add('avatar-bootup');
      }
      overlay.classList.add('active', 'processing');
      if (textEl) textEl.innerHTML = '<em style="color:rgba(255,255,255,0.5);">⏳ Đang phân tích...</em>';
      if (inputEl) inputEl.style.display = 'block';
    } 
    else if (state === 'SPEAKING') {
      const vis = document.getElementById('ai-audio-visualizer');
      if (vis) {
        vis.style.opacity = '1';
        vis.classList.add('visualizer-anim');
      }
      overlay.style.display = 'flex';
      const avatarImg = document.getElementById('ai-avatar-img');
      if (avatarImg) {
        avatarImg.classList.remove('avatar-bootup');
        void avatarImg.offsetWidth;
        avatarImg.classList.add('avatar-bootup');
      }
      overlay.classList.add('active', 'speaking');
      if (inputEl) {
        inputEl.style.display = 'block';
        setTimeout(() => inputEl.focus(), 150); 
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
      if (i <= text.length) {
        while (i < text.length && text.charAt(i) === '<') {
          while (i < text.length && text.charAt(i) !== '>') {
            i++;
          }
          i++;
        }
        el.innerHTML = text.slice(0, i);
        i++;
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
         
         const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=vi&q=${encodeURIComponent(chunkText)}`;
         
         // Bắt buộc phải tái sử dụng global audio player đã được unlock bằng User Gesture trên Safari/iOS
         let audio = window.__ttsAudioPlayer || new Audio();
         audio.src = url;
         
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
      }
    };

    playNextChunk();
  }

  // ==========================================
  // AI SCENARIO STATE & NLP LOGIC (Đại hội XIV)
  // ==========================================
  const defaultScenarioState = {
    currentDocument: "van-kien-dai-hoi-xiv",
    currentTopic: "nang-cao-nang-luc-lanh-dao-suc-chien-dau-cua-dang",
    currentSection: null,
    lastIntent: null,
    lastQuestion: null,
    lastAnswer: null,
    lastSourceChunks: [],
    lastQuote: null,
    lastAnswerMode: null,
    scenarioStep: 0,
    awaitingFollowUp: false,
    conversationMode: "presentation-plus"
  };

  function getScenarioState() {
    try {
      const stored = sessionStorage.getItem("daiHoiXIVAssistantState") || sessionStorage.getItem("aiScenarioState");
      return stored ? JSON.parse(stored) : { ...defaultScenarioState };
    } catch(e) { return { ...defaultScenarioState }; }
  }

  function saveScenarioState(state) {
    try {
      sessionStorage.setItem("daiHoiXIVAssistantState", JSON.stringify(state));
    } catch(e) {}
  }

  const ANSWER_01_TEXT = "Xin trân trọng thông tin tới quý vị. Nghị quyết Đại hội đại biểu toàn quốc lần thứ XIV của Đảng khẳng định: “Tiếp tục đẩy mạnh xây dựng, chỉnh đốn Đảng trong sạch, vững mạnh toàn diện; nâng cao năng lực lãnh đạo, cầm quyền và sức chiến đấu của Đảng. Tăng cường xây dựng, chỉnh đốn, tự đổi mới để Đảng ta thật sự là đạo đức, là văn minh”.";

  const ANSWER_02_TEXT = "Có thể khái quát việc nâng cao năng lực lãnh đạo, cầm quyền và sức chiến đấu của Đảng thành năm nội dung cơ bản sau đây:<br><br>Thứ nhất, tiếp tục đẩy mạnh xây dựng, chỉnh đốn Đảng và hệ thống chính trị trong sạch, vững mạnh toàn diện; nâng cao chất lượng xây dựng Đảng về chính trị, tư tưởng, đạo đức và tổ chức.<br><br>Thứ hai, xây dựng đội ngũ cán bộ, nhất là cán bộ lãnh đạo, quản lý và người đứng đầu các cấp, có đủ phẩm chất, năng lực, uy tín, ngang tầm nhiệm vụ.<br><br>Thứ ba, đổi mới đồng bộ phương thức lãnh đạo; nâng cao năng lực lãnh đạo, năng lực cầm quyền và hiệu quả tổ chức thực hiện các chủ trương, nghị quyết của Đảng.<br><br>Thứ tư, tăng cường kiểm soát quyền lực; kiên quyết, kiên trì phòng, chống tham nhũng, lãng phí, tiêu cực; ngăn chặn, đẩy lùi suy thoái về tư tưởng chính trị, đạo đức, lối sống và những biểu hiện “tự diễn biến”, “tự chuyển hóa” trong nội bộ.<br><br>Thứ năm, tăng cường bảo vệ nền tảng tư tưởng của Đảng; chủ động đấu tranh phản bác các quan điểm sai trái, thù địch, góp phần củng cố niềm tin của Nhân dân đối với Đảng, Nhà nước và chế độ xã hội chủ nghĩa.<br><br>Đó là những nội dung có quan hệ chặt chẽ, thống nhất, góp phần xây dựng Đảng thật sự trong sạch, vững mạnh, nâng cao hiệu lực, hiệu quả lãnh đạo, cầm quyền trong kỷ nguyên phát triển mới.";

  const FALLBACK_TEXT = "Báo cáo đồng chí, hiện tại kho tri thức chưa ghi nhận dữ liệu trùng khớp hoàn toàn cho câu hỏi này. Xin đồng chí vui lòng cung cấp thêm từ khóa hoặc diễn đạt lại câu hỏi để tôi được hỗ trợ chính xác hơn.";

  function normalizeText(text) {
    let t = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    t = t.replace(/đ/g, "d");
    t = t.replace(/\b14\b/g, "xiv"); 
    t = t.replace(/[?,.!]/g, ' ').replace(/\s+/g, ' ');
    t = t.replace(/\b(a|vay thi|xin|giup chung toi|cho toi hoi|ua|nhe|ha)\b/gi, ' ');
    t = t.replace(/dai hoi muoi bon|dai hoi thu muoi bon|dai hoi lan thu muoi bon/g, 'dai hoi xiv');
    t = t.replace(/dang cong san viet nam/g, 'dang');
    t = t.replace(/nam noi dung/g, '5 noi dung');
    t = t.replace(/tom tat|neu nhung diem chinh|cho biet noi dung co ban/g, 'khai quat');
    return t.trim().replace(/\s+/g, ' ');
  }

  function scoreIntent(normText, intentType, state) {
    let score = 0;
    if (intentType === 'QUOTE_PARTY_LEADERSHIP') {
      const kwCore = ['trich dan', 'doan trich', 'noi gi', 'neu the nao', 'doc doan', 'cho biet doan trich', 'de cap the nao'];
      const kwTopic = ['xay dung dang', 'chinh don dang', 'nang luc lanh dao', 'nang luc cam quyen', 'suc chien dau', 'dao duc la van minh'];
      
      let hasCore = kwCore.some(k => normText.includes(k.replace(/ /g, ''))); 
      hasCore = hasCore || kwCore.some(k => normText.includes(k));
      let hasTopic = kwTopic.some(k => normText.includes(k));
      
      let semanticSim = (hasCore ? 0.5 : 0) + (hasTopic ? 0.5 : 0);
      let kwCov = (hasTopic && hasCore) ? 1.0 : (hasTopic || hasCore ? 0.5 : 0);
      let stepMatch = (state.scenarioStep === 0) ? 1.0 : 0.0;
      
      score = (semanticSim * 0.45) + (kwCov * 0.25) + (stepMatch * 0.10);
    } 
    else if (intentType === 'SUMMARIZE_PARTY_LEADERSHIP') {
      const kwCore = ['khai quat', 'noi dung co ban', '5 noi dung', 'cac diem chinh', 'tom tat', 'nhiem vu chu yeu', 'phuong dian nao'];
      const kwFollowUp = ['vay', 'noi dung do', 'van de nay', 'cu persecution', 'cu the', 'gom nhung gi', 'van de vua neu'];
      
      let hasCore = kwCore.some(k => normText.includes(k));
      let hasFollowUp = kwFollowUp.some(k => normText.includes(k));
      
      let semanticSim = hasCore ? 1.0 : (hasFollowUp && state.awaitingFollowUp ? 1.0 : 0);
      let kwCov = hasCore ? 1.0 : 0;
      let ctxCont = (state.scenarioStep === 1) ? 1.0 : 0;
      let stepMatch = (state.scenarioStep === 1) ? 1.0 : 0;
      
      score = (semanticSim * 0.45) + (kwCov * 0.25) + (ctxCont * 0.20) + (stepMatch * 0.10);
    }
    return score;
  }

  function formatCANDReporterResponse(item, query) {
    let topicName = item.topic || "Văn kiện Đại hội XIV";
    let content = item.content || "";
    
    // If the content already has a formal greeting or is structured, return it directly
    let hasGreeting = content.includes("Báo cáo đồng chí") || content.includes("Xin trân trọng") || content.includes("Dạ vâng") || content.includes("Kính thưa");
    if (hasGreeting) {
      return content;
    }

    let normQuery = normalizeText(query);
    let isQuoteRequest = normQuery.includes("trich") || normQuery.includes("nguyen van") || normQuery.includes("doc doan") || normQuery.includes("viet nhu the nao");

    let intro = "";
    if (isQuoteRequest) {
      intro = `Báo cáo đồng chí, bám sát văn bản chính thống và các văn kiện chỉ đạo, tôi xin trích dẫn nguyên văn tinh thần chỉ đạo về <b>${topicName}</b> như sau:<br><br>`;
    } else {
      const intros = [
        `Báo cáo đồng chí, liên quan đến nội dung quán triệt chỉ đạo về <b>${topicName}</b>, tôi xin được khái quát và trình bày theo đúng tôn chỉ xây dựng lực lượng Công an nhân dân cách mạng, chính quy, tinh nhuệ, hiện đại như sau:<br><br>`,
        `Báo cáo đồng chí, về tinh thần cốt lõi của <b>${topicName}</b> nhằm đáp ứng yêu cầu phát triển đất nước trong kỷ nguyên mới, tôi xin tóm lược các định hướng và nội dung trọng tâm như sau:<br><br>`,
        `Báo cáo đồng chí, triển khai thực hiện thắng lợi các chủ trương của Đại hội XIV đối với chuyên đề <b>${topicName}</b>, hệ thống tri thức ghi nhận định hướng chiến lược như sau:<br><br>`
      ];
      let index = content.length % intros.length;
      intro = intros[index];
    }

    let outro = "";
    if (!isQuoteRequest) {
      const outros = [
        `<br><br>Định hướng nêu trên là kim chỉ nam quan trọng giúp lực lượng Công an nhân dân nói chung và cán bộ, giảng viên, học viên Trường Đại học Cảnh sát nhân dân nói riêng nhận thức sâu sắc, ra sức học tập và quyết tâm chuyển hóa nghị quyết thành hành động thực tiễn.`,
        `<br><br>Đây là định hướng chính trị quan trọng, làm cơ sở lý luận và thực tiễn để cán bộ, chiến sĩ, đảng viên CAND vận dụng sáng tạo, góp phần xây dựng lực lượng chính quy, tinh nhuệ, hiện đại, bảo vệ vững chắc Tổ quốc trong tình hình mới.`,
        `<br><br>Nội dung chỉ đạo này là yêu cầu thiết thực để cán bộ, đảng viên nghiên cứu học tập, nâng cao bản lĩnh chính trị thép và chuyên môn nghiệp vụ tinh thông nhằm hoàn thành xuất sắc nhiệm vụ chính trị được giao.`
      ];
      let indexOut = (content.length + query.length) % outros.length;
      outro = outros[indexOut];
    }

    return intro + content + outro;
  }

  function playResponse(transcript = '') {
    if (currentState === 'IDLE') return;
    setUIState('PROCESSING');

    setTimeout(() => {
      if (currentState === 'IDLE') return;
      
      let finalAnswerText = "";
      window.isMindmapIntent = false;
      window.lastCitationText = null;
      const mmContainer = document.getElementById('apple-ai-mindmap');
      if (mmContainer) { mmContainer.style.display = 'none'; mmContainer.style.opacity = '0'; mmContainer.innerHTML = ''; }
      const topSec = document.querySelector('.ai-top-section');
      if (topSec) topSec.classList.remove('mindmap-active');
      
      const normText = normalizeText(transcript);
      let state = getScenarioState();
      
      const hasKnowledgeBase = typeof VANKIEN_DB !== 'undefined';
      if (!hasKnowledgeBase) {
         console.warn("Không tìm thấy nguồn tri thức “VĂN KIỆN ĐẠI HỘI XIV”. Trợ lý đang hoạt động ở chế độ kịch bản có sẵn.");
      }

      // Check for repeat intent
      if (normText.includes("doc lai") || normText.includes("noi lai")) {
         if (state.lastAnswer) finalAnswerText = state.lastAnswer;
         else if (state.lastAnswerId === "ANSWER_01") finalAnswerText = ANSWER_01_TEXT;
         else if (state.lastAnswerId === "ANSWER_02") finalAnswerText = ANSWER_02_TEXT;
         else finalAnswerText = FALLBACK_TEXT;
      } 
      // Check for dynamic CSND responsibility intent
      else if (state.conversationMode !== "scripted-presentation" && 
               (normText.includes("truong") || normText.includes("csnd") || normText.includes("dai hoc canh sat") || normText.includes("lien he") || normText.includes("trach nhiem")) &&
               (state.lastAnswerId === "ANSWER_01" || state.lastAnswerId === "ANSWER_02" || (state.currentTopic && state.currentTopic.includes("nang-cao-nang-luc-lanh-dao")))) {
         
         finalAnswerText = "Từ định hướng nêu trên, đối với cán bộ, đảng viên Trường Đại học CSND, có thể xác định một số trách nhiệm trọng tâm sau đây:<br><br><b>1. Quán triệt và nêu gương</b>: Cán bộ, đảng viên Nhà trường, đặc biệt là người đứng đầu, gương mẫu thực hiện việc tự soi, tự sửa, nâng cao tính tiên phong, gương mẫu.<br><br><b>2. Đổi mới giáo dục, đào tạo</b>: Đưa các quan điểm chỉ đạo của Đại hội XIV về xây dựng Đảng vào giảng dạy chính xác, sinh động, kịp thời chuyển hóa nghị quyết thành nhận thức cho học viên.<br><br><b>3. Nâng cao chất lượng nghiên cứu khoa học</b>: Tập trung tổng kết thực tiễn, nghiên cứu làm sáng tỏ các luận điểm mới về xây dựng Đảng và bảo vệ nền tảng tư tưởng của Đảng.<br><br><b>4. Đẩy mạnh chuyển đổi số, đổi mới sáng tạo</b>: Tiên phong ứng dụng trí tuệ nhân tạo và công nghệ số vào cải cách phương pháp giảng dạy lý luận chính trị và công tác quản lý giáo dục.<br><br><b>5. Gắn đào tạo với xây dựng lực lượng và thực tiễn bảo đảm an ninh, trật tự</b>: Đào tạo đội ngũ sĩ quan Cảnh sát nhân dân có bản lĩnh chính trị thép, tinh thông nghiệp vụ, trung thành tuyệt đối với Đảng, vì nước quên thân, vì dân phục vụ.";
         state.lastIntent = 'UNIVERSITY_APPLICATION';
         state.lastAnswerMode = 'official-document-assistant';
      }
      // Check for multi-part question
      else if (state.conversationMode !== "scripted-presentation" &&
               normText.includes("trich") && normText.includes("khai quat") && (normText.includes("lien he") || normText.includes("trach nhiem"))) {
         finalAnswerText = "<b>1. Đoạn trích từ văn kiện Đại hội XIV:</b><br>“<i>" + ANSWER_01_TEXT.replace("Xin trân trọng thông tin tới quý vị. Nghị quyết Đại hội đại biểu toàn quốc lần thứ XIV của Đảng khẳng định: ", "").replace("“", "").replace("”", "") + "</i>”<br><br><b>2. Nội dung khái quát:</b><br>" + ANSWER_02_TEXT + "<br><br><b>3. Liên hệ trách nhiệm cán bộ, đảng viên Trường Đại học CSND:</b><br>Cán bộ, đảng viên Trường Đại học CSND xác định rõ 5 trách nhiệm trọng tâm:<br>1. Quán triệt và nêu gương.<br>2. Đổi mới giáo dục, đào tạo.<br>3. Nâng cao chất lượng nghiên cứu khoa học.<br>4. Đẩy mạnh chuyển đổi số, đổi mới sáng tạo.<br>5. Gắn đào tạo với xây dựng lực lượng và thực tiễn bảo đảm an ninh, trật tự.";
         state.lastIntent = 'SCRIPTED_QA';
         state.lastAnswerMode = 'official-document-assistant';
      }
      else {
         let matchedPriority = false;
         
         // 1. First priority: Check Q1 and Q2 via score_intent
         let scoreQuote = scoreIntent(normText, 'QUOTE_PARTY_LEADERSHIP', state);
         let scoreSumm = scoreIntent(normText, 'SUMMARIZE_PARTY_LEADERSHIP', state);
         
         if (scoreQuote >= 0.55 || scoreSumm >= 0.55) {
             matchedPriority = true;
             if (scoreQuote >= 0.55 && scoreSumm >= 0.55) {
                 finalAnswerText = ANSWER_01_TEXT + "<br><br>Và sau đây, có thể khái quát việc nâng cao năng lực lãnh đạo, cầm quyền và sức chiến đấu của Đảng thành năm nội dung cơ bản:<br><br>" + ANSWER_02_TEXT.replace("Dạ vâng. Có thể khái quát việc nâng cao năng lực lãnh đạo, cầm quyền và sức chiến đấu của Đảng thành năm nội dung cơ bản sau đây:<br><br>", "");
                 state.lastIntent = 'SUMMARIZE_PARTY_LEADERSHIP';
                 state.lastAnswerId = 'ANSWER_02';
                 state.scenarioStep = 2;
                 state.awaitingFollowUp = false;
             } else if (scoreQuote >= 0.55 && scoreQuote >= scoreSumm) {
                 finalAnswerText = ANSWER_01_TEXT;
                 state.lastIntent = 'QUOTE_PARTY_LEADERSHIP';
                 state.lastAnswerId = 'ANSWER_01';
                 state.scenarioStep = 1;
                 state.awaitingFollowUp = true;
             } else if (scoreSumm >= 0.55) {
                 finalAnswerText = ANSWER_02_TEXT;
                 state.lastIntent = 'SUMMARIZE_PARTY_LEADERSHIP';
                 state.lastAnswerId = 'ANSWER_02';
                 state.scenarioStep = 2;
                 state.awaitingFollowUp = false;
             }
         }
         
         // 2. Second priority: Other exact script items in VANKIEN_DB
         if (!matchedPriority && hasKnowledgeBase) {
             let scriptResults = [];
             for (let item of VANKIEN_DB) {
                 if (item.exactResponse) {
                     let score = 0.0;
                     let kwMatchCount = 0;
                     if (item.keywords) {
                         item.keywords.forEach(kw => {
                             let normKw = normalizeText(kw);
                             if (normText.includes(normKw)) kwMatchCount++;
                         });
                         score += Math.min(kwMatchCount * 0.25, 0.55);
                     }
                     let synMatchCount = 0;
                     if (item.synonyms) {
                         item.synonyms.forEach(syn => {
                             let normSyn = normalizeText(syn);
                             if (normText.includes(normSyn)) synMatchCount++;
                         });
                         if (synMatchCount > 0) score += 0.25;
                     }
                     let words = normText.split(' ');
                     let importantWords = words.filter(w => w.length > 2);
                     let matchWords = 0;
                     if (importantWords.length > 0) {
                         importantWords.forEach(w => {
                             let normTopic = normalizeText(item.topic);
                             let normContent = normalizeText(item.content);
                             if (normTopic.includes(w) || normContent.includes(w)) matchWords += 1.0;
                         });
                         score += (matchWords / importantWords.length) * 0.25;
                     }
                     if (score >= 0.55) {
                         scriptResults.push({ item, score });
                     }
                 }
             }
             scriptResults.sort((a, b) => b.score - a.score);
             if (scriptResults.length > 0) {
                 let bestMatch = scriptResults[0];
                 matchedPriority = true;
                 finalAnswerText = bestMatch.item.content;
                 state.lastIntent = 'SCRIPTED_QA';
                 state.lastAnswerId = null;
                 if (bestMatch.item.source) {
                     window.lastCitationText = "Nguồn: " + bestMatch.item.source;
                 } else {
                     window.lastCitationText = null;
                 }
             }
         }
         
          // 3. Third priority: RAG document chunks in VANKIEN_DB (where exactResponse is not true)
          if (!matchedPriority && hasKnowledgeBase && state.conversationMode !== "scripted-presentation") {
              let searchResults = [];
              for (let item of VANKIEN_DB) {
                  if (!item.exactResponse) {
                      let score = 0.0;
                      let kwMatchCount = 0;
                      if (item.keywords) {
                          item.keywords.forEach(kw => {
                              let normKw = normalizeText(kw);
                              if (normText.includes(normKw)) kwMatchCount++;
                          });
                          score += Math.min(kwMatchCount * 0.2, 0.5);
                      }
                      let synMatchCount = 0;
                      if (item.synonyms) {
                          item.synonyms.forEach(syn => {
                              let normSyn = normalizeText(syn);
                              if (normText.includes(normSyn)) synMatchCount++;
                          });
                          if (synMatchCount > 0) score += 0.2;
                      }
                      let words = normText.split(' ');
                      let importantWords = words.filter(w => w.length > 2);
                      let matchWords = 0;
                      if (importantWords.length > 0) {
                          importantWords.forEach(w => {
                              let normTopic = normalizeText(item.topic);
                              let normContent = normalizeText(item.content);
                              if (normTopic.includes(w)) matchWords += 1.5;
                              else if (normContent.includes(w)) matchWords += 1.0;
                          });
                          score += (matchWords / importantWords.length) * 0.35;
                      }
                      if (score > 0) {
                          searchResults.push({ item, score });
                      }
                  }
              }
              searchResults.sort((a, b) => b.score - a.score);
              let bestMatch = searchResults.length > 0 ? searchResults[0] : null;
              if (bestMatch && bestMatch.score >= 0.62) {
                  matchedPriority = true;
                  finalAnswerText = formatCANDReporterResponse(bestMatch.item, transcript);
                  state.lastIntent = 'SUMMARIZE_CONTENT';
                  state.currentTopic = bestMatch.item.topic;
                  state.lastAnswerMode = 'official-document-assistant';
                  if (bestMatch.item.source) {
                      window.lastCitationText = "Nguồn: " + bestMatch.item.source;
                  } else {
                      window.lastCitationText = null;
                  }
              } else if (bestMatch && bestMatch.score >= 0.45) {
                  matchedPriority = true;
                  finalAnswerText = "Báo cáo đồng chí, hệ thống chưa tìm thấy đoạn thông tin trùng khớp hoàn toàn với câu hỏi. Tuy nhiên, liên quan đến các từ khóa đồng chí đề cập, tôi xin đề xuất nội dung học tập về <b>" + bestMatch.item.topic + "</b> dưới đây:<br><br>" + formatCANDReporterResponse(bestMatch.item, transcript);
                  state.lastIntent = 'SUGGEST_CONTENT';
                  state.currentTopic = bestMatch.item.topic;
                  state.lastAnswerMode = 'official-document-assistant';
                  if (bestMatch.item.source) {
                      window.lastCitationText = "Nguồn (đề xuất): " + bestMatch.item.source;
                  } else {
                      window.lastCitationText = null;
                  }
              }
          }
         // 4. Fourth priority: Fallback
         if (!matchedPriority) {
             if (normText.includes('ban do tri thuc') || normText.includes('so do')) {
                 finalAnswerText = "Báo cáo đồng chí. Hệ thống đang trích xuất Bản đồ Tri thức kết nối Nghị quyết 71 với công tác đào tạo tại Đại học Cảnh sát Nhân dân.\n\nTừ cốt lõi Đổi mới giáo dục của Nghị quyết 71.\n\nNhà trường đẩy mạnh phát triển kỹ năng số cho học viên.\n\nNhằm tạo ra lực lượng Cảnh sát chính quy tinh nhuệ.\n\nĐáp ứng xuất sắc yêu cầu tác chiến an ninh mạng trong thời kỳ mới.";
                 window.isMindmapIntent = true;
             } else {
                 if (hasKnowledgeBase) {
                     finalAnswerText = "Trong nguồn Văn kiện Đại hội XIV hiện được tích hợp, tôi chưa tìm thấy nội dung đủ rõ để trả lời chính xác câu hỏi này. Xin đồng chí cung cấp thêm từ khóa hoặc xác định cụ thể nội dung cần trao đổi.";
                 } else {
                     finalAnswerText = FALLBACK_TEXT;
                 }
             }
         }
      }

      state.lastQuestion = transcript;
      state.lastAnswer = finalAnswerText;
      saveScenarioState(state);
      window.lastFinalAnswerText = finalAnswerText;

      setUIState('SPEAKING');
      
      // Render text and citation
      const textEl = document.getElementById('apple-ai-text');
      if (textEl) {
         let renderedHTML = finalAnswerText;
         if (window.lastCitationText) {
            renderedHTML += `<div style="margin-top: 15px; font-size: 0.75rem; color: rgba(255,255,255,0.4); border-top: 1px dashed rgba(255,255,255,0.15); padding-top: 5px; text-align: right;">${window.lastCitationText}</div>`;
         }
         typeWriterEffect(renderedHTML, 'apple-ai-text', 12);
      }
      
      // Speak (exclude citation line from TTS)
      if (window.isMindmapIntent && playVideoAvatar('bản đồ tri thức', finalAnswerText, null)) {
         // handled by video avatar
      } else {
         speakDynamicText(finalAnswerText);
      }

    }, 50); 
  }
  function startInteraction() {
    if (currentState !== 'IDLE') return;

    // iOS/Mobile Audio Unlock workaround
    if (!window.__audioUnlocked) {
        window.__audioUnlocked = true;
        try {
            // Khởi tạo một global audio player duy nhất để tái sử dụng (Bắt buộc cho Safari/iOS)
            window.__ttsAudioPlayer = new Audio("data:audio/mp3;base64,//OExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
            window.__ttsAudioPlayer.play().catch(()=>{});
            
            const unlockSpeech = new SpeechSynthesisUtterance('');
            unlockSpeech.volume = 0;
            window.speechSynthesis.speak(unlockSpeech);
        } catch (e) {}
    }


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

  function resetConversation() {
    let state = getScenarioState();
    state.currentTopic = "nang-cao-nang-luc-lanh-dao-suc-chien-dau-cua-dang";
    state.lastIntent = null;
    state.lastQuestion = null;
    state.lastAnswer = null;
    state.lastSourceChunks = [];
    state.lastQuote = null;
    state.lastAnswerMode = null;
    state.scenarioStep = 0;
    state.awaitingFollowUp = false;
    saveScenarioState(state);
    
    const textEl = document.getElementById('apple-ai-text');
    if (textEl) {
      textEl.innerHTML = '<span style="color: rgba(255,255,255,0.7); font-size: 0.95rem;">Đã đặt lại hội thoại (Giữ nguyên chế độ hoạt động).</span>';
    }
  }

  function resetScript() {
    let state = getScenarioState();
    state.scenarioStep = 0;
    state.awaitingFollowUp = false;
    saveScenarioState(state);
    
    const textEl = document.getElementById('apple-ai-text');
    if (textEl) {
      textEl.innerHTML = '<span style="color: rgba(255,255,255,0.7); font-size: 0.95rem;">Đã đặt lại kịch bản trình diễn về bước đầu tiên.</span>';
    }
  }

  function clearSession() {
    sessionStorage.removeItem("daiHoiXIVAssistantState");
    sessionStorage.removeItem("aiScenarioState");
    
    const textEl = document.getElementById('apple-ai-text');
    if (textEl) {
      textEl.innerHTML = '<span style="color: rgba(255,255,255,0.7); font-size: 0.95rem;">Đã xóa toàn bộ ngữ cảnh phiên làm việc.</span>';
    }
  }

  function initUI() {
    if (document.getElementById('apple-ai-overlay')) return;
    const overlayHTML = `
      <div id="apple-ai-overlay" class="apple-ai-overlay" style="display:none;">
        <div class="apple-edge-glow"></div>
        <div class="apple-ai-content">
          <div class="ai-avatar-section">
            <div class="ai-avatar-wrapper">
              <img id="ai-avatar-img" src="./images/csnd_avatar.png" alt="Trợ lý AI"
                   style="width:100%;height:100%;object-fit:cover;border-radius:50%;"
                   onerror="this.src='';this.style.display='none'" />
              <video id="ai-avatar-video" style="display:none;width:100%;height:100%;object-fit:cover;border-radius:50%;" muted playsinline></video>
            </div>
            <div id="ai-audio-visualizer" class="ai-audio-visualizer" style="opacity:0;">
              <span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>
          <div id="apple-ai-text" class="apple-ai-text" style="min-height:3em; width:100%;"></div>
          <div id="apple-ai-mindmap" style="display:none;opacity:0;width:100%;height:280px;"></div>
          <input id="apple-ai-input" class="apple-ai-input" type="text"
                 placeholder="⌨️ Nhập câu hỏi và nhấn Enter (hoặc nói bằng Ctrl+Space)..."
                 style="display:none;" />
          <div class="apple-ai-hint" style="margin-top:12px; font-size:0.8rem; color:rgba(255,255,255,0.4); text-align:center;">
            Ctrl+Space • Hỏi bằng giọng nói &nbsp;|&nbsp; Esc • Đóng &nbsp;|&nbsp; Enter • Gửi câu hỏi
          </div>
          <div class="apple-ai-admin-actions" style="margin-top:15px; display:flex; justify-content:center; gap:10px; flex-wrap:wrap;">
            <button id="ai-btn-reset-conv" class="ai-admin-btn" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.85); padding:5px 12px; border-radius:14px; font-size:0.75rem; font-family:inherit; cursor:pointer; transition:all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.18)'" onmouseout="this.style.background='rgba(255,255,255,0.08)'">Đặt lại hội thoại</button>
            <button id="ai-btn-reset-script" class="ai-admin-btn" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.85); padding:5px 12px; border-radius:14px; font-size:0.75rem; font-family:inherit; cursor:pointer; transition:all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.18)'" onmouseout="this.style.background='rgba(255,255,255,0.08)'">Đặt lại kịch bản</button>
            <button id="ai-btn-clear-session" class="ai-admin-btn" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.85); padding:5px 12px; border-radius:14px; font-size:0.75rem; font-family:inherit; cursor:pointer; transition:all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.18)'" onmouseout="this.style.background='rgba(255,255,255,0.08)'">Xóa ngữ cảnh phiên</button>
          </div>
          <div id="ai-admin-warning" style="display:none; margin-top:8px; font-size:0.72rem; color:#ffb300; text-align:center; padding: 4px 8px; border-radius: 8px; background: rgba(255, 179, 0, 0.08); border: 1px solid rgba(255,179,0,0.15); line-height: 1.3;"></div>
        </div>
        <button class="apple-ai-close-btn" id="apple-ai-close" aria-label="Đóng trợ lý AI">✕</button>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', overlayHTML);

    // Show warning if database is missing
    const hasKnowledgeBase = typeof VANKIEN_DB !== 'undefined';
    if (!hasKnowledgeBase) {
      const warningEl = document.getElementById('ai-admin-warning');
      if (warningEl) {
        warningEl.innerText = "Không tìm thấy nguồn tri thức “VĂN KIỆN ĐẠI HỘI XIV”. Trợ lý đang hoạt động ở chế độ kịch bản có sẵn.";
        warningEl.style.display = 'block';
      }
    }

    // Wire up close button
    const closeBtn = document.getElementById('apple-ai-close');
    if (closeBtn) closeBtn.addEventListener('click', stopAI);

    // Wire up admin buttons
    const btnResetConv = document.getElementById('ai-btn-reset-conv');
    if (btnResetConv) btnResetConv.addEventListener('click', resetConversation);

    const btnResetScript = document.getElementById('ai-btn-reset-script');
    if (btnResetScript) btnResetScript.addEventListener('click', resetScript);

    const btnClearSession = document.getElementById('ai-btn-clear-session');
    if (btnClearSession) btnClearSession.addEventListener('click', clearSession);

    // Wire up text input
    const inputEl = document.getElementById('apple-ai-input');
    if (inputEl) {
      inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const query = inputEl.value.trim();
          if (query) {
            inputEl.value = '';
            setUIState('PROCESSING');
            setTimeout(() => playResponse(query), 50);
          }
        }
        if (e.key === 'Escape') stopAI();
      });
    }

    // Wire up FAB button
    const btn = document.getElementById('ai-copilot-btn');
    if (btn) {
      btn.removeAttribute('onclick');
      btn.addEventListener('click', startInteraction);
    }
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

  function drawMindmapStep(step) {
      const container = document.getElementById('apple-ai-mindmap');
      if (!container) return;
      
      if (step === 0) {
          container.style.display = 'block';
          setTimeout(() => container.style.opacity = '1', 50);
          const topSec = document.querySelector('.ai-top-section');
          if (topSec) topSec.classList.add('mindmap-active');
          // Initialize SVG
          container.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 600 350">
                <!-- Lines -->
                <path class="mm-line" id="mm-line-1" d="M 300,175 L 150,80" />
                <path class="mm-line" id="mm-line-2" d="M 300,175 L 450,80" />
                <path class="mm-line" id="mm-line-3" d="M 300,175 L 150,270" />
                <path class="mm-line" id="mm-line-4" d="M 300,175 L 450,270" />
                
                <!-- Nodes -->
                <g class="mm-node mm-center-node" id="mm-node-0" transform="translate(300,175)">
                    <circle r="0" cx="0" cy="0" />
                    <text x="0" y="5" text-anchor="middle">NQ 71</text>
                </g>
                <g class="mm-node" id="mm-node-1" transform="translate(150,80)">
                    <circle r="0" cx="0" cy="0" />
                    <text x="0" y="5" text-anchor="middle">Đổi mới Giáo dục</text>
                </g>
                <g class="mm-node" id="mm-node-2" transform="translate(450,80)">
                    <circle r="0" cx="0" cy="0" />
                    <text x="0" y="5" text-anchor="middle">Kỹ năng Số</text>
                </g>
                <g class="mm-node" id="mm-node-3" transform="translate(150,270)">
                    <circle r="0" cx="0" cy="0" />
                    <text x="0" y="5" text-anchor="middle">Lực lượng Tinh nhuệ</text>
                </g>
                <g class="mm-node" id="mm-node-4" transform="translate(450,270)">
                    <circle r="0" cx="0" cy="0" />
                    <text x="0" y="5" text-anchor="middle">An ninh Mạng</text>
                </g>
            </svg>
          `;
          
          setTimeout(() => {
              const node0 = document.querySelector('#mm-node-0 circle');
              if(node0) node0.setAttribute('r', '50');
              document.getElementById('mm-node-0').classList.add('active');
          }, 100);
      }
      else if (step >= 1 && step <= 4) {
          // Draw line
          const line = document.getElementById('mm-line-' + step);
          if (line) line.classList.add('drawn');
          
          // Pop node
          setTimeout(() => {
              const nodeCircle = document.querySelector('#mm-node-' + step + ' circle');
              if (nodeCircle) nodeCircle.setAttribute('r', '40');
              document.getElementById('mm-node-' + step).classList.add('active');
          }, 500); // delay node activation slightly after line starts drawing
      }
  }

  return { init, startInteraction, stopAI, drawMindmapStep, resetConversation, resetScript, clearSession };
})();

AICopilot.init();
