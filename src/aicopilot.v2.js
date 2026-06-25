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
   
   // RAG global variables and helpers
   let vectorIndex = [];
 
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
         const stopBtn = document.getElementById('apple-ai-stop-btn');
         if (stopBtn) stopBtn.style.display = 'none';
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
                 const stopBtn = document.getElementById('apple-ai-stop-btn');
                 if (stopBtn) stopBtn.style.display = 'none';
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
     const stopBtn = document.getElementById('apple-ai-stop-btn');
     const wrapperEl = overlay.querySelector('.apple-ai-input-wrapper');
     overlay.className = 'apple-ai-overlay';
     currentState = state;
     if (state === 'IDLE') {
       overlay.style.display = 'none';
       document.body.classList.remove('apple-ai-active');
       clearHighlight();
       const vis = document.getElementById('ai-audio-visualizer');
       if (vis) { vis.style.opacity = '0'; vis.classList.remove('visualizer-anim'); }
       if (inputEl) inputEl.style.display = 'none';
       if (wrapperEl) wrapperEl.style.display = 'none';
       if (stopBtn) stopBtn.style.display = 'none';
     } else if (state === 'LISTENING') {
       overlay.style.display = 'flex';
       document.body.classList.add('apple-ai-active');
       overlay.classList.add('active', 'listening');
       if (textEl) textEl.innerHTML = '<em style="color:rgba(255,255,255,0.7);">🎤 Đang lắng nghe... Hãy đặt câu hỏi!</em>';
       if (inputEl) { 
         inputEl.style.display = 'block'; 
         setTimeout(() => inputEl.focus(), 150); 
       }
       if (wrapperEl) wrapperEl.style.display = 'block';
       if (stopBtn) stopBtn.style.display = 'none';
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
       if (wrapperEl) wrapperEl.style.display = 'block';
       if (stopBtn) stopBtn.style.display = 'flex';
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
       if (wrapperEl) wrapperEl.style.display = 'block';
       if (stopBtn) stopBtn.style.display = 'flex';
     }
   }
 
    function typeWriterEffect(text, elementId, speed = 40) {
      const el = document.getElementById(elementId);
      if (!el) return;
      if (window.__TEST_MODE__) {
        el.innerHTML = text;
        return;
      }
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
  if (window.viewportFocusEngine && window.viewportFocusEngine.calculatePrimaryFocus) {
    window.viewportFocusEngine.calculatePrimaryFocus();
  }

  const storeSnapshot = window.screenContextStore.getState();
  const resolvedRef = window.referenceResolver.resolve(transcript, storeSnapshot, window.conversationContext);
  const rewritten = window.contextQueryRewriter.rewrite(transcript, resolvedRef, storeSnapshot, window.conversationContext);

  return {
    snapshot: storeSnapshot,
    resolvedRef: resolvedRef,
    rewritten: rewritten
  };
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
       .replace(/\bWeb\b/gi, 'Goép')
       .replace(/Nghị quyết\s+(?:số\s+)?(\d+)-NQ\/TW/g, 'Nghị quyết số $1')
       .replace(/(\d+)-NQ\/TW/g, 'Nghị quyết số $1 của Trung ương')
       .replace(/\bNQ\/TW\b/g, 'Nghị quyết Trung ương')
       .replace(/\bNQ(\d+)\b/g, 'Nghị quyết số $1')
       .replace(/\bNQ\b/g, 'Nghị quyết')
       .replace(/\bTW\b/g, 'Trung ương');
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
          const stopBtn = document.getElementById('apple-ai-stop-btn');
          if (stopBtn) stopBtn.style.display = 'none';
          document.querySelectorAll('.ai-speaking-highlight').forEach(el => el.classList.remove('ai-speaking-highlight'));
          return;
        }
  
        let chunkText = chunks[currentChunk].trim();
        if (!chunkText) {
          currentChunk++;
          playNextChunk();
          return;
        }

        // Highlight matching visual cards during speech output
        try {
          document.querySelectorAll('.ai-speaking-highlight').forEach(el => el.classList.remove('ai-speaking-highlight'));
          const cards = document.querySelectorAll('.ai-keypoint-card, .ai-app-card, .ai-official-blockquote, .ai-direct-answer');
          let bestCard = null;
          let maxOverlap = 0;
          const chunkWords = chunkText.toLowerCase().split(/\s+/).filter(w => w.length > 3);
          cards.forEach(card => {
            const cardText = card.innerText.toLowerCase();
            let overlap = 0;
            chunkWords.forEach(w => {
              if (cardText.includes(w)) overlap++;
            });
            if (overlap > maxOverlap && overlap > 2) {
              maxOverlap = overlap;
              bestCard = card;
            }
          });
          if (bestCard) {
            bestCard.classList.add('ai-speaking-highlight');
            bestCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        } catch(e) {
          console.warn("Lỗi đồng bộ giọng nói thẻ:", e);
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
 
   const ANSWER_01_TEXT = "Nghị quyết Đại hội đại biểu toàn quốc lần thứ XIV của Đảng khẳng định: “Tiếp tục đẩy mạnh xây dựng, chỉnh đốn Đảng trong sạch, vững mạnh toàn diện; nâng cao năng lực lãnh đạo, cầm quyền và sức chiến đấu của Đảng. Tăng cường xây dựng, chỉnh đốn, tự đổi mới để Đảng ta thật sự là đạo đức, là văn minh”.";
 
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

    // --- RAG PIPELINE HELPER FUNCTIONS ---
    async function loadVectorIndex() {
      try {
        const response = await fetch('./src/data/vector_index.json');
        if (response.ok) {
          vectorIndex = await response.json();
          console.log("RAG Vector Index loaded successfully. Chunks:", vectorIndex.length);
        } else {
          console.warn("Could not find static vector index file. RAG running in mock/keyword fallback.");
        }
      } catch (e) {
        console.warn("Failed loading vector_index.json. Falling back to local retriever.", e);
      }
    }

    function calculateDotProduct(v1, v2) {
      let dot = 0;
      const len = Math.min(v1.length, v2.length);
      for (let i = 0; i < len; i++) {
        dot += v1[i] * v2[i];
      }
      return dot;
    }

    function retrieveLocalChunks(queryVector, topK = 3) {
      if (!vectorIndex || vectorIndex.length === 0) return [];
      
      const scored = vectorIndex.map(chunk => {
        if (!chunk.embedding || chunk.embedding.length === 0) return { chunk, score: 0 };
        const score = calculateDotProduct(queryVector, chunk.embedding);
        return { chunk, score };
      });
      
      scored.sort((a, b) => b.score - a.score);
      
      if (scored.length > 0 && scored[0].score === 0) return [];
      
      return scored.slice(0, topK).map(s => s.chunk);
    }

    async function getQueryEmbedding(text, apiKey) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "models/text-embedding-004",
          content: {
            parts: [{ text: text }]
          }
        })
      });
      
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Embedding request failed: ${response.status}. Details: ${errText}`);
      }
      
      const data = await response.json();
      if (data.embedding && data.embedding.values) {
        return data.embedding.values;
      }
      throw new Error("No embedding values returned from Gemini API");
    }

    async function generateGeminiCompletion(query, context, apiKey) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      
      const systemInstruction = `Bạn là Trợ lý AI tuyên truyền về Đại hội XIV của Đảng Cộng sản Việt Nam và 9 nghị quyết chiến lược trong lực lượng Công an nhân dân (CAND), cụ thể tại Trường Đại học Cảnh sát nhân dân (CSND). Nhiệm vụ của bạn là giải đáp chính xác, trung thực câu hỏi của người dùng dựa trên Ngữ cảnh (retrieved chunks) cung cấp dưới đây.

Nguyên tắc bắt buộc:
1. Chỉ trả lời dựa trên thông tin có trong Ngữ cảnh. Không tự ý bịa đặt (hallucinate) hay suy diễn ngoài văn bản.
2. Nếu Ngữ cảnh không chứa đủ thông tin để trả lời câu hỏi, bạn phải trả về một đối tượng JSON có directAnswer là: "Trong nguồn văn kiện Đại hội XIV hiện được tích hợp, tôi chưa tìm thấy nội dung đủ rõ để trả lời chính xác câu hỏi này. Xin đồng chí cung cấp thêm từ khóa hoặc xác định cụ thể nội dung cần trao đổi." và các trường khác trống hoặc mặc định.
3. Câu trả lời của bạn phải là một đối tượng JSON hợp lệ duy nhất, tuân thủ nghiêm ngặt cấu trúc sau:
{
  "answerId": "rag_response",
  "resolutionId": "số hiệu nghị quyết tương ứng từ 57, 59, 66, 68, 70, 71, 72, 79, 80 nếu câu hỏi thuộc nghị quyết đó, ngược lại để rỗng",
  "directAnswer": "Báo cáo đồng chí, ... [nội dung trả lời trực tiếp ngắn gọn, súc tích, văn phong báo cáo viên CAND]",
  "keyPoints": [
     { "title": "Tiêu đề luận điểm 1", "content": "Nội dung tóm tắt chi tiết của luận điểm 1" },
     { "title": "Tiêu đề luận điểm 2", "content": "Nội dung tóm tắt chi tiết của luận điểm 2" }
  ],
  "visualization": {
     "type": "flow" | "cards" | "comparison" | "timeline" | "matrix" | "argument_evidence" | "none",
     "data": { ... cấu trúc dữ liệu tương ứng với type }
  },
  "officialQuotes": [
     { "quote": "Trích dẫn nguyên văn câu quan trọng trong văn kiện", "speaker": "Nguồn trích dẫn (ví dụ: Nghị quyết số 57-NQ/TW)" }
  ],
  "practicalApplication": [
     { "title": "Nêu gương & Học tập", "content": "Cán bộ, giảng viên, đảng viên Trường Đại học CSND gương mẫu nghiên cứu..." }
  ],
  "misconceptions": [
     { "wrong": "Hiểu lầm thường gặp", "right": "Cách hiểu đúng theo văn kiện" }
  ],
  "memoryMessage": "Thông điệp cốt lõi để ghi nhớ nhanh",
  "sources": [
     { "documentTitle": "Tên văn kiện/nghị quyết chính thức làm căn cứ" }
  ],
  "confidenceNotes": ["Thông tin truy xuất từ văn kiện chính thống"]
}
4. Bắt đầu directAnswer bằng cụm từ "Báo cáo đồng chí, ..." để giữ văn phong chuẩn mực của lực lượng Công an nhân dân.
5. Nghiêm cấm bình luận ý kiến cá nhân, tuyệt đối không phỏng đoán nhân sự, lãnh đạo Đảng, Nhà nước.`;

      const promptText = `Ngữ cảnh hỗ trợ trích từ tài liệu chính thống:
${context}

Câu hỏi của người dùng:
${query}`;

      const payload = {
        contents: [{
          parts: [{ text: promptText }]
        }],
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json"
        }
      };
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Generation API request failed: ${response.status}. Details: ${errText}`);
      }
      
      const data = await response.json();
      if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content) {
        throw new Error("Empty candidate response returned from Gemini Generation API");
      }
      
      const textResponse = data.candidates[0].content.parts[0].text;
      try {
        return JSON.parse(textResponse);
      } catch(e) {
        console.error("Invalid JSON from LLM: ", textResponse);
        return {
          answerId: "rag_response_fallback",
          directAnswer: "Báo cáo đồng chí, tôi gặp lỗi khi phân tích cấu trúc câu trả lời của mô hình. Dưới đây là câu trả lời dạng văn bản:\n\n" + textResponse,
          confidenceNotes: ["Lỗi chuyển đổi JSON từ API"]
        };
      }
    }

    function getApiKey() {
      return localStorage.getItem('GEMINI_API_KEY') || 'MOCK';
    }

    function checkGuardrails(query) {
      const norm = normalizeText(query);
      
      const sensitiveKeywords = [
        "nhan su", "tong bi thu", "bau ai", "bầu ai", "chu tich nuoc", "chủ tịch nước", "thu tuong", "thủ tướng",
        "phe phai", "phe phái", "noi bo", "nội bộ", "tham nhung", "tham nhũng", "chong pha", "chống phá",
        "da dang", "đa đảng", "tu ban", "tư bản", "trung quoc", "trung quốc", "my", "mỹ", "nga", "ukraine",
        "chien tranh", "chiến tranh", "bien dong", "biển đông", "doi tu", "đời tư", "gia dinh", "gia đình",
        "tai san", "tài sản", "luong", "lương", "thu nhap", "thu nhập", "kich dong", "kích động",
        "bieu tinh", "biểu tình"
      ];
      
      const offTopicKeywords = [
        "thoi tiet", "thời tiết", "bong da", "bóng đá", "lap trinh", "lập trình", "python", "javascript",
        "game", "tro choi", "trò chơi", "nhac", "nhạc", "phim", "giai tri", "giải trí", "nau an", "nấu ăn",
        "du lich", "du lịch", "thoi trang", "thời trang", "mua sam", "mua sắm"
      ];

      const matchedSensitive = sensitiveKeywords.find(kw => norm.includes(kw));
      if (matchedSensitive) {
        return {
          answerId: "guardrail_sensitive_rejection",
          directAnswer: "Báo cáo đồng chí, chủ đề đồng chí hỏi liên quan đến các vấn đề nhạy cảm chính trị, tổ chức nhân sự hoặc nằm ngoài phạm vi tài liệu chính thống của Đại hội XIV mà tôi được cung cấp. Tôi chỉ có tôn chỉ giải đáp các định hướng chiến lược, mục tiêu và chỉ tiêu phát triển đất nước trong văn kiện chính thống của Đại hội XIV.",
          confidenceNotes: ["Bộ lọc bảo vệ thông tin chính trị kích hoạt"],
          sources: [{ documentTitle: "Tôn chỉ hoạt động của Trợ lý AI" }]
        };
      }

      const isRelated = [
        "nghi quet", "nghị quyết", "dai hoi", "đại hội", "dang", "đảng", "chinh tri", "chính trị", "van kien", "văn kiện",
        "phat trien", "phát triển", "chi tieu", "chỉ tiêu", "kinh te", "kinh tế", "xa hoi", "xã hội", "cong an", "công an",
        "luc luong", "lực lượng", "khoa hoc", "khoa học", "cong nghe", "công nghệ", "giao duc", "giáo dục", "y te", "y tế",
        "ngoai giao", "ngoại giao", "tu phap", "tư pháp", "chien luoc", "chiến lược", "ky nguyen", "kỷ nguyên"
      ].some(kw => norm.includes(kw));

      if (!isRelated && offTopicKeywords.some(kw => norm.includes(kw))) {
        return {
          answerId: "guardrail_off_topic_rejection",
          directAnswer: "Báo cáo đồng chí, tôi là Trợ lý AI tuyên truyền Đại hội XIV của Đảng Cộng sản Việt Nam và 9 nghị quyết chiến lược trong Công an nhân dân. Câu hỏi này nằm ngoài phạm vi tài liệu và tôn chỉ hoạt động của tôi. Xin đồng chí tập trung vào các câu hỏi liên quan đến nội dung văn kiện Đại hội XIV và 9 nghị quyết chiến lược.",
          confidenceNotes: ["Bộ lọc bảo vệ phạm vi tuyên truyền kích hoạt"],
          sources: [{ documentTitle: "Tôn chỉ hoạt động của Trợ lý AI" }]
        };
      }

      return null;
    }

    function checkCoreFacts(normText) {
      if (typeof window.CONGRESS_FACTS === 'undefined') return null;
      
      const isAboutDH14 = normText.includes("dai hoi xiv") || normText.includes("dai hoi 14");
      
      if (isAboutDH14) {
        if (normText.includes("khi nao") || normText.includes("thoi gian") || normText.includes("dien ra") || normText.includes("ngay nao")) {
          return {
            answerId: "core_fact_time",
            directAnswer: `Báo cáo đồng chí, theo thông tin chính thức về Đại hội đại biểu toàn quốc lần thứ XIV của Đảng:<br>
            - <b>Thời gian diễn ra:</b> ${window.CONGRESS_FACTS.time.duration}.<br>
            - <b>Phiên khai mạc chính thức:</b> ${window.CONGRESS_FACTS.time.opening}.`,
            confidenceNotes: ["Thông tin chính thức từ Ban Tổ chức Đại hội"],
            sources: [{ documentTitle: "Thông tin tuyên truyền Đại hội XIV" }]
          };
        }
        if (normText.includes("o dau") || normText.includes("dia diem") || normText.includes("to chuc tai")) {
          return {
            answerId: "core_fact_location",
            directAnswer: `Báo cáo đồng chí, địa điểm tổ chức Đại hội XIV của Đảng như sau:<br>
            - <b>Địa điểm:</b> ${window.CONGRESS_FACTS.location.name}.<br>
            - <b>Địa chỉ:</b> ${window.CONGRESS_FACTS.location.city}.`,
            confidenceNotes: ["Thông tin chính thức từ Ban Tổ chức Đại hội"],
            sources: [{ documentTitle: "Thông tin tuyên truyền Đại hội XIV" }]
          };
        }
        if (normText.includes("quy mo") || normText.includes("bao nhieu dai bieu") || normText.includes("so dai bieu") || normText.includes("dang vien")) {
          return {
            answerId: "core_fact_scale",
            directAnswer: `Báo cáo đồng chí, quy mô đại biểu tham dự Đại hội đại biểu toàn quốc lần thứ XIV của Đảng như sau:<br>
            - <b>Số lượng đại biểu tham dự:</b> ${window.CONGRESS_FACTS.scale.delegates}.<br>
            - <b>Đại diện cho:</b> ${window.CONGRESS_FACTS.scale.partyMembers} trong cả nước.`,
            confidenceNotes: ["Thông tin chính thức từ Ban Tổ chức Đại hội"],
            sources: [{ documentTitle: "Thông tin tuyên truyền Đại hội XIV" }]
          };
        }
        if (normText.includes("bao nhieu nghi quyet") || normText.includes("nghi quyet chien luoc") || normText.includes("co nhung nghi quyet nao") || normText.includes("danh sach nghi quyet")) {
          let resList = window.CONGRESS_FACTS.resolutions.map(r => `<li><b>Nghị quyết số ${r.number}:</b> ${r.title}</li>`).join("");
          return {
            answerId: "core_fact_resolutions",
            directAnswer: `Báo cáo đồng chí, Đại hội XIV có 9 nghị quyết chiến lược trọng tâm trong kỷ nguyên mới:<br><ul>${resList}</ul>`,
            confidenceNotes: ["Thông tin chính thức hệ thống văn kiện"],
            sources: [{ documentTitle: "Hệ thống văn kiện Đại hội XIV" }]
          };
        }
      }

      // === Báo cáo chính trị — Số liệu kinh tế năm 2025 ===
      const isGdpQuery = normText.includes("gdp") || normText.includes("tang truong") || normText.includes("kinh te") || normText.includes("quy mo") || normText.includes("thu nhap") || normText.includes("5026") || normText.includes("514");
      const isMucTieu2030 = normText.includes("muc tieu") || normText.includes("chi tieu") || normText.includes("2026") || normText.includes("ke hoach 5 nam") || normText.includes("8500");
      const isTamNhin2045 = normText.includes("2045") || normText.includes("tam nhin") || normText.includes("100 nam") || normText.includes("nuoc phat trien");
      const isBoCay = normText.includes("sap xep") || normText.includes("bo may") || normText.includes("cap huyen") || normText.includes("2 cap") || normText.includes("34,9") || normText.includes("66,9");
      const isDangVien = normText.includes("dang vien") || normText.includes("5.622") || normText.includes("5622") || normText.includes("ket nap dang") || normText.includes("so luong dang");
      const isDieuLe = normText.includes("dieu le dang") || normText.includes("thi hanh dieu le") || normText.includes("ky luat dang") || normText.includes("to chuc co so dang");
      const isNQ71 = normText.includes("71") || normText.includes("giao duc dao tao") || normText.includes("giao duc va dao tao") || normText.includes("truong pho thong") || normText.includes("dai hoc top") || normText.includes("phu cap giao vien") || normText.includes("ngân sach giao duc") || normText.includes("quoc sach giao duc");
      const is40NamDoiMoi = normText.includes("40 nam") || normText.includes("1986") || normText.includes("dai hoi vi") || normText.includes("tong ket doi moi") || normText.includes("truoc doi moi") || normText.includes("774") || normText.includes("lich su doi moi");
      const bct = window.CONGRESS_FACTS && window.CONGRESS_FACTS.baoCaoChinhTri;
      if (bct) {

        if (isGdpQuery && !isMucTieu2030) {
          return {
            answerId: "core_fact_gdp2025",
            directAnswer: `Báo cáo đồng chí, theo <b>Báo cáo chính trị tại Đại hội XIV</b>:<br>
• <b>GDP năm 2025:</b> Trên <b>${bct.kinhTe2025.gdp}</b> (${bct.kinhTe2025.gdpGrowth}), xếp <b>${bct.kinhTe2025.gdpRank}</b>.<br>
• <b>Tăng trưởng:</b> Năm 2025 đạt <b>${bct.kinhTe2025.tangtruong2025}</b>; bình quân 2021–2025 đạt <b>${bct.kinhTe2025.tangtruongBinhQuan2021_2025}</b>.<br>
• <b>GDP/người:</b> <b>${bct.kinhTe2025.gdpPerCapita}</b> — gia nhập nhóm nước thu nhập trung bình cao.<br>
• <b>Đóng góp TFP:</b> Khoảng <b>${bct.kinhTe2025.tfp}</b>.<br>
• <b>Đô thị hoá:</b> Đạt <b>${bct.kinhTe2025.doThiHoa}</b>.`,
            confidenceNotes: ["Số liệu chính thức từ Báo cáo chính trị Đại hội XIV"],
            sources: [{ documentTitle: bct.source }]
          };
        }
        if (isMucTieu2030) {
          const mt = bct.mucTieu2030;
          return {
            answerId: "core_fact_muctieu2030",
            directAnswer: `Báo cáo đồng chí, theo <b>Báo cáo chính trị tại Đại hội XIV</b>, chỉ tiêu giai đoạn 2026–2030:<br>
• Tăng trưởng GDP: <b>${mt.tang_truong_gdp}</b>.<br>
• GDP/người đến 2030: khoảng <b>${mt.gdp_dau_nguoi}</b>.<br>
• Kinh tế số: khoảng <b>${mt.kinh_te_so}</b>.<br>
• Đóng góp TFP: trên <b>${mt.tfp}</b>.<br>
• Tốc độ tăng năng suất lao động: <b>${mt.nang_suat_lao_dong}</b>.<br>
• Đô thị hoá: trên <b>${mt.do_thi_hoa}</b>.<br>
• HDI: khoảng <b>${mt.hdi}</b>. Hạnh phúc: <b>${mt.hanh_phuc}</b>.<br>
• Mục tiêu tổng quát đến 2030: <b>${bct.mucTieu2030.mucTieu}</b>.`,
            confidenceNotes: ["Số liệu chính thức từ Báo cáo chính trị Đại hội XIV"],
            sources: [{ documentTitle: bct.source }]
          };
        }
        if (isTamNhin2045) {
          return {
            answerId: "core_fact_tamNhin2045",
            directAnswer: `Báo cáo đồng chí, theo <b>Báo cáo chính trị tại Đại hội XIV</b>:<br>
• <b>Đến năm 2030</b> (100 năm thành lập Đảng): Trở thành <b>nước đang phát triển có công nghiệp hiện đại, thu nhập trung bình cao</b>.<br>
• <b>Đến năm 2045</b> (100 năm thành lập nước): Trở thành <b>${bct.mucTieu2045}</b> — sánh vai với các cường quốc năm châu.`,
            confidenceNotes: ["Số liệu chính thức từ Báo cáo chính trị Đại hội XIV"],
            sources: [{ documentTitle: bct.source }]
          };
        }
        if (isBoCay) {
          const cm = bct.cachMangBoMay;
          return {
            answerId: "core_fact_boMay",
            directAnswer: `Báo cáo đồng chí, theo <b>Báo cáo chính trị tại Đại hội XIV</b>, cuộc cách mạng sắp xếp tổ chức bộ máy (từ tháng 10/2024):<br>
• Giảm <b>${cm.giamDauMoiTW}</b> đầu mối trực thuộc Trung ương.<br>
• Giảm <b>${cm.giamTinh}</b> đơn vị hành chính cấp tỉnh.<br>
• Giảm <b>${cm.giamXa}</b> đơn vị hành chính cấp xã.<br>
• ${cm.moHinh}.`,
            confidenceNotes: ["Số liệu chính thức từ Báo cáo chính trị Đại hội XIV"],
            sources: [{ documentTitle: bct.source }]
          };
        }
      }

      // === Báo cáo tổng kết Điều lệ Đảng ===
      const dl = window.CONGRESS_FACTS && window.CONGRESS_FACTS.dieuleDang;
      if (dl) {
        if (isDangVien || isDieuLe) {
          return {
            answerId: "core_fact_dieuleDang",
            directAnswer: `Báo cáo đồng chí, theo <b>Báo cáo tổng kết 15 năm thi hành Điều lệ Đảng (2011–2025)</b>:<br>
• <b>Tổng số đảng viên (31/8/2025): ${dl.tongSoDangVien}</b>.<br>
• Kết nạp trong 3 nhiệm kỳ XI, XII, XIII: <b>${dl.ketNap3NhiemKy}</b>.<br>
• Tỉ lệ nữ trong số mới kết nạp: <b>${dl.tyLeNu}</b>; là đoàn viên: <b>${dl.tyLeDoanVien}</b>.<br>
• Tổ chức cơ sở đảng: <b>${dl.toChucCoSo}</b>; chi bộ trực thuộc: <b>${dl.chiBoTrucThuoc}</b>.<br>
• Kỷ luật 3 nhiệm kỳ: <b>${dl.kyLuat.toChucDang}</b>; <b>${dl.kyLuat.dangVien}</b>.<br>
• Định hướng: <b>${dl.dinhHuongSuaDoi}</b>.`,
            confidenceNotes: ["Số liệu chính thức từ Báo cáo tổng kết 15 năm thi hành Điều lệ Đảng"],
            sources: [{ documentTitle: dl.source }]
          };
        }
      }

      // === Nghị quyết 71 — Giáo dục và Đào tạo ===
      const nq71 = window.CONGRESS_FACTS && window.CONGRESS_FACTS.nghiQuyet71;
      if (nq71 && isNQ71) {
        return {
          answerId: "core_fact_nq71",
          directAnswer: `Báo cáo đồng chí, theo <b>${nq71.source}</b> (ký bởi ${nq71.kyBoiThư}):<br>
<br><b>Ngân sách nhà nước cho giáo dục:</b><br>
• Tối thiểu <b>20% tổng chi NSNN</b> dành cho GD&ĐT.<br>
• Trong đó: chi đầu tư ít nhất <b>5% NSNN</b>; chi giáo dục đại học ít nhất <b>3% NSNN</b>.<br>
<br><b>Phụ cấp nhà giáo:</b><br>
• Phụ cấp ưu đãi tối thiểu <b>70%</b> cho giáo viên mầm non, phổ thông; <b>100%</b> cho GV vùng khó khăn.<br>
<br><b>Mục tiêu đến năm 2030:</b><br>
• Ít nhất <b>${nq71.mucTieu2030.daiHocTopChauA}</b>.<br>
• Ít nhất <b>${nq71.mucTieu2030.daiHocTopTheGioi}</b>.<br>
• Ít nhất <b>${nq71.mucTieu2030.truongPhoDatChuan}</b>.<br>
<br><b>Tầm nhìn 2045:</b> <b>${nq71.tamNhin2045.xepHang}</b>; <b>${nq71.tamNhin2045.daiHocTop100}</b>.`,
          confidenceNotes: ["Số liệu chính thức từ Nghị quyết 71-NQ/TW của Bộ Chính trị"],
          sources: [{ documentTitle: nq71.source }]
        };
      }

      // === Báo cáo tổng kết 40 năm đổi mới ===
      const nm = window.CONGRESS_FACTS && window.CONGRESS_FACTS.tongKet40NamDoiMoi;
      if (nm && is40NamDoiMoi) {
        return {
          answerId: "core_fact_40namDoiMoi",
          directAnswer: `Báo cáo đồng chí, theo <b>${nm.source}</b>:<br>
• Công cuộc đổi mới bắt đầu từ <b>${nm.batDau}</b> đến <b>${nm.ketThuc}</b> — vừa tròn <b>40 năm</b>.<br>
<br><b>Trước đổi mới (1975–1985):</b><br>
• Thu nhập bình quân đầu người: <b>${nm.truocDoiMoi.gdpDauNguoi}</b>.<br>
• Lạm phát tháng 12/1986: <b>${nm.truocDoiMoi.lamPhat1986}</b>.<br>
<br><b>30 năm đổi mới (1986–2015):</b><br>
• Tăng trưởng GDP trung bình: <b>${nm.tăngTruong30Nam}</b>.<br>
• Xuất khẩu 1991–2016: <b>${nm.xuatKhau1991_2016}</b>.<br>
<br><b>Giai đoạn 2016–2025:</b><br>
• Tăng trưởng bình quân: <b>${nm.giaiDoan2016_2025.tangTrungBinh}</b>.<br>
• GDP: <b>${nm.giaiDoan2016_2025.gdp}</b>; GDP/người: <b>${nm.giaiDoan2016_2025.gdpDauNguoi}</b>.<br>
• Cộng đồng người Việt Nam ở nước ngoài: <b>${nm.vietKieuNuocNgoai}</b>.`,
          confidenceNotes: ["Số liệu chính thức từ Báo cáo tổng kết 40 năm đổi mới"],
          sources: [{ documentTitle: nm.source }]
        };
      }

      return null;
    }

    function showDefaultSuggestions() {
      const container = document.getElementById('apple-ai-suggestions-container');
      if (!container) return;
      
      const sampleQuestions = [
        "Thời gian và địa điểm diễn ra Đại hội XIV?",
        "Đại hội XIV có bao nhiêu nghị quyết chiến lược?",
        "Kinh tế số chiếm bao nhiêu % GDP theo Nghị quyết 57?",
        "Chuyển đổi số giáo dục đại học theo NQ 71 thế nào?",
        "Tầm nhìn 2045 của nước ta?",
        "Ý kiến cá nhân của AI về chính sách đối ngoại?"
      ];
      
      container.innerHTML = sampleQuestions.map(q => {
        return `<button class="apple-ai-suggestion-chip" onclick="AICopilot.handleSuggestionClick('${q.replace(/'/g, "\\'")}')">${q}</button>`;
      }).join('');
    }

    function handleSuggestionClick(query) {
      const inputEl = document.getElementById('apple-ai-input');
      if (inputEl) {
        inputEl.value = query;
      }
      setUIState('PROCESSING');
      setTimeout(() => playResponse(query), 50);
    }

    async function playResponse(transcript = '') {
    if (currentState === 'IDLE') return;
    
    // Stop any previous response playback before starting a new one
    interruptAnswer();
    
    setUIState('PROCESSING');

  setTimeout(async () => {
    if (currentState === 'IDLE') return;
    
    let finalAnswerText = "";
    window.isMindmapIntent = false;
    window.lastCitationText = null;
    window.ttsSpokenText = null;
    const mmContainer = document.getElementById('apple-ai-mindmap');
    if (mmContainer) { mmContainer.style.display = 'none'; mmContainer.style.opacity = '0'; mmContainer.innerHTML = ''; }
    const topSec = document.querySelector('.ai-top-section');
    if (topSec) topSec.classList.remove('mindmap-active');
    
    // 1. Chạy phân tích ngữ cảnh màn hình có cấu trúc bằng Screen Context Engine
    const context = analyzeScreenContext(transcript);
    const storeSnapshot = context.snapshot;
    const resolvedRef = context.resolvedRef;
    const rewritten = context.rewritten;

    const queryText = rewritten.query;
    const normText = normalizeText(queryText);
    let state = getScenarioState();
    
    const hasKnowledgeBase = typeof VANKIEN_DB !== 'undefined';
    let matchedPriority = false;

    // 1. Áp dụng Guardrails để chặn câu hỏi lạc đề / nhạy cảm
    if (!matchedPriority) {
      const guardrailRejection = checkGuardrails(queryText);
      if (guardrailRejection) {
        matchedPriority = true;
        finalAnswerText = window.answerRenderer.render(guardrailRejection, '#ff5e62');
        window.ttsSpokenText = guardrailRejection.directAnswer;
        state.lastIntent = 'GUARDRAIL_REJECTION';
      }
    }

    // 2. Kiểm tra Dữ kiện Lõi (Core Facts)
    if (!matchedPriority) {
      const coreFactAnswer = checkCoreFacts(normText);
      if (coreFactAnswer) {
        matchedPriority = true;
        const resColor = '#d4af37'; // Màu vàng sang trọng cho dữ kiện cốt lõi
        finalAnswerText = window.answerRenderer.render(coreFactAnswer, resColor);
        window.ttsSpokenText = window.contextValidator.sanitizeScreenText(coreFactAnswer.directAnswer);
        state.lastIntent = 'CORE_FACT';
      }
    }

   // 3. Kiểm tra Q1 và Q2 (QUOTE_PARTY_LEADERSHIP & SUMMARIZE_PARTY_LEADERSHIP)
// Chỉ áp dụng khi câu hỏi KHÔNG đề cập đến một nghị quyết cụ thể (57, 59, 66, 68, 70, 71, 72, 79, 80).
// Nếu câu hỏi hỏi về "nội dung cơ bản của Nghị quyết 71" thì phải ra kết quả NQ71,
// KHÔNG được trả về nội dung "5 nội dung cơ bản" của văn kiện Đại hội XIV.
if (!matchedPriority) {
    const _specificResNums = ['57', '59', '66', '68', '70', '71', '72', '79', '80'];
    const _queryMentionsSpecificRes = _specificResNums.some(num =>
      normText.includes(`nghi quyet ${num}`) || normText.includes(`nq ${num}`) || normText.includes(`nq${num}`)
    );
    let scoreQuote = _queryMentionsSpecificRes ? 0 : scoreIntent(normText, 'QUOTE_PARTY_LEADERSHIP', state);
    let scoreSumm = _queryMentionsSpecificRes ? 0 : scoreIntent(normText, 'SUMMARIZE_PARTY_LEADERSHIP', state);

    if (scoreQuote >= 0.55 || scoreSumm >= 0.55) {
            matchedPriority = true;

            const quoteText = "Tiếp tục đẩy mạnh xây dựng, chỉnh đốn Đảng trong sạch, vững mạnh toàn diện; nâng cao năng lực lãnh đạo, cầm quyền và sức chiến đấu của Đảng. Tăng cường xây dựng, chỉnh đốn, tự đổi mới để Đảng ta thật sự là đạo đức, là văn minh";
            const points = [
              { title: "Đẩy mạnh xây dựng chỉnh đốn Đảng", content: "Tiếp tục nâng cao chất lượng xây dựng Đảng về chính trị, tư tưởng, đạo đức và tổ chức." },
              { title: "Xây dựng đội ngũ cán bộ chủ chốt", content: "Đào tạo đội ngũ lãnh đạo, quản lý và người đứng đầu có đủ phẩm chất, năng lực, uy tín, ngang tầm nhiệm vụ." },
              { title: "Đổi mới phương thức lãnh đạo", content: "Nâng cao năng lực cầm quyền và hiệu quả tổ chức thực hiện các chủ trương, nghị quyết của Đảng." },
              { title: "Kiểm soát chặt chẽ quyền lực", content: "Kiên quyết đấu tranh phòng chống tham nhũng, lãng phí, tiêu cực và suy thoái tư tưởng chính trị." },
              { title: "Bảo vệ nền tảng tư tưởng của Đảng", content: "Đấu tranh phản bác các quan điểm sai trái, thù địch, củng cố lòng tin của Nhân dân." }
            ];

            const directAnswer = "Văn kiện Đại hội XIV khẳng định tầm quan trọng đặc biệt của công tác xây dựng, chỉnh đốn Đảng và hệ thống chính trị trong sạch, vững mạnh toàn diện.";
            const keyPoints = points.map((p, idx) => ({
              id: `partyleadership_${idx + 1}`,
              title: p.title,
              content: p.content,
              keywords: p.title.split(' ').slice(0, 2),
              sourceAnchors: []
            }));
            
            let finalAnswerObj = {
              answerId: "party_leadership_response",
              resolutionId: "71", 
              contextIds: [],
              directAnswer: directAnswer,
              keyPoints: keyPoints,
              visualization: {
                type: "flow",
                data: {
                  steps: points.map(p => ({ title: p.title, desc: p.content }))
                }
              },
              officialQuotes: [
                {
                  quote: quoteText,
                  speaker: "Nghị quyết Đại hội đại biểu toàn quốc lần thứ XIV của Đảng",
                  context: "Quan điểm chỉ đạo cốt lõi"
                }
              ],
              practicalApplication: [
                {
                  title: "Nêu gương & Học tập",
                  content: "Cán bộ, giảng viên, đảng viên Trường Đại học CSND gương mẫu nghiên cứu, quán triệt Nghị quyết Đại hội XIV.",
                  icon: "<i class='fas fa-id-card'></i>"
                },
                {
                  title: "Chống biểu hiện suy thoái",
                  content: "Mỗi học viên rèn luyện bản lĩnh chính trị vững vàng, đấu tranh phản bác các quan điểm sai trái thù địch.",
                  icon: "<i class='fas fa-user-shield'></i>"
                }
              ],
              misconceptions: [
                {
                  wrong: "Xây dựng Đảng chỉ là nhiệm vụ của các ban xây dựng Đảng chuyên trách.",
                  right: "Đây là trách nhiệm tự đổi mới, tự chỉnh đốn thường xuyên của mọi cấp ủy, mọi tổ chức đảng và từng đảng viên."
                }
              ],
              memoryMessage: "Tăng cường tự đổi mới, tự chỉnh đốn để Đảng ta thật sự là đạo đức, là văn minh.",
              sources: [{ sourceId: "dh14_decuongTBN", documentTitle: "Đề cương Thông báo nhanh Đại hội XIV" }],
              confidenceNotes: ["Dữ liệu kịch bản chuẩn hóa"]
            };

            const resColor = '#1565C0'; 
            finalAnswerText = window.answerRenderer.render(finalAnswerObj, resColor);
            window.ttsSpokenText = "Nghị quyết Đại hội đại biểu toàn quốc lần thứ XIV của Đảng khẳng định: " + quoteText;

            if (scoreQuote >= 0.55 && scoreSumm >= 0.55) {
                state.lastIntent = 'SUMMARIZE_PARTY_LEADERSHIP';
                state.lastAnswerId = 'ANSWER_02';
                state.scenarioStep = 2;
                state.awaitingFollowUp = false;
            } else if (scoreQuote >= 0.55 && scoreQuote >= scoreSumm) {
                state.lastIntent = 'QUOTE_PARTY_LEADERSHIP';
                state.lastAnswerId = 'ANSWER_01';
                state.scenarioStep = 1;
                state.awaitingFollowUp = true;
            } else if (scoreSumm >= 0.55) {
                state.lastIntent = 'SUMMARIZE_PARTY_LEADERSHIP';
                state.lastAnswerId = 'ANSWER_02';
                state.scenarioStep = 2;
                state.awaitingFollowUp = false;
            }
        }
    }

    // 4. Kiểm tra ý định hỏi về Điểm mù / Lập luận (Blind Spot Reasoning Audit)
    if (!matchedPriority && window.blindSpotReasoningEngine) {
      const reasoningKeywords = ["lap luan", "diem mu", "thien kien", "bias", "gia dinh", "logic", "phan bien", "audit", "phan tich lap luan"];
      const followUpKeywords = ["giai thich", "gia thuyet", "nghiem trong", "cam xuc", "con diem mu", "con gi khac"];
      
      const matchesReasoning = reasoningKeywords.some(kw => normText.includes(kw));
      const isFollowUp = state.lastIntent === 'REASONING_AUDIT' && followUpKeywords.some(kw => normText.includes(kw));
      
      if (matchesReasoning || isFollowUp) {
        let textToAnalyze = rewritten.contextText || state.lastAnswer || transcript;
        
        if (window.lastAnalyzedReasoningText) {
          textToAnalyze = window.lastAnalyzedReasoningText;
        }

        if (textToAnalyze && textToAnalyze.trim().length >= 10) {
          window.lastAnalyzedReasoningText = textToAnalyze;
          matchedPriority = true;
          state.lastIntent = 'REASONING_AUDIT';
          
          let supportLevel = 'full';
          if (normText.includes("tu boc tact") || normText.includes("tu phan tich")) {
            supportLevel = 'self';
          } else if (normText.includes("cau hoi tu kiem chung") || normText.includes("cau hoi phan bien")) {
            supportLevel = 'questions';
          }
          
          if (isFollowUp) {
            const claims = window.blindSpotReasoningEngine.extractClaims(textToAnalyze);
            if (normText.includes("giai thich") || normText.includes("gia thuyet")) {
              const alternatives = window.blindSpotReasoningEngine.generateAlternativeHypotheses(claims);
              finalAnswerText = `
                <div class="blind-spot-report">
                  <h3 class="report-main-title" style="color: #00f2fe; border-bottom: 2px solid rgba(0,242,254,0.2); padding-bottom: 10px; margin-bottom: 15px;"><i class="fas fa-balance-scale"></i> CÁC CÁCH GIẢI THÍCH CẠNH TRANH</h3>
                  <div style="display: flex; flex-direction: column; gap: 10px; font-size: 0.85rem;">
                    ${alternatives.map((alt, idx) => `
                      <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px;">
                        <div style="color: #00f2fe; font-weight:600; margin-bottom:4px;">Giả thuyết ${idx+1}: ${alt.hypothesis}</div>
                        <div style="color: rgba(255,255,255,0.7); line-height:1.4;">${alt.description}</div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `;
              window.ttsSpokenText = "Dưới đây là các cách giải thích và giả thuyết cạnh tranh cho các luận điểm trên.";
            } else {
              const report = window.blindSpotReasoningEngine.generateReasoningReport(textToAnalyze, supportLevel);
              finalAnswerText = report.html;
              window.ttsSpokenText = "Báo cáo phân tích điểm mù lập luận đã được trích xuất trên màn hình.";
            }
          } else {
            const report = window.blindSpotReasoningEngine.generateReasoningReport(textToAnalyze, supportLevel);
            finalAnswerText = report.html;
            window.ttsSpokenText = "Hệ thống tự động bóc tách và phân tích lập luận điểm mù cho văn bản này.";
          }
        }
      }
    }

    // 5. Kiểm tra các câu kịch bản có sẵn trong VANKIEN_DB (Scripted Q&A)
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
               if (score >= 0.55) {
                   scriptResults.push({ item, score });
               }
           }
       }
       scriptResults.sort((a, b) => b.score - a.score);
       if (scriptResults.length > 0) {
           let bestMatch = scriptResults[0];
           matchedPriority = true;
           
           const targetResId = resolvedRef.resolutionId || storeSnapshot.page.resolutionId;
           const resData = window.RESOLUTIONS_DATA ? window.RESOLUTIONS_DATA.find(r => r.id === targetResId) : null;
           const resColor = resData ? resData.color : '#4facfe';

           const finalAnswerObj = {
             answerId: "scripted_qa_response",
             resolutionId: targetResId || "",
             contextIds: [],
             directAnswer: bestMatch.item.content,
             keyPoints: [],
             visualization: { type: "none", data: {} },
             memoryMessage: "Học tập và làm theo tinh thần chỉ đạo.",
             sources: bestMatch.item.source ? [{ documentTitle: bestMatch.item.source }] : [],
             confidenceNotes: ["Thông tin chính thức kiểm chứng"]
           };

           finalAnswerText = window.answerRenderer.render(finalAnswerObj, resColor);
           window.ttsSpokenText = window.contextValidator.sanitizeScreenText(bestMatch.item.content);

           state.lastIntent = 'SCRIPTED_QA';
           state.lastAnswerId = null;
           if (bestMatch.item.source) {
               window.lastCitationText = "Nguồn: " + bestMatch.item.source;
           } else {
               window.lastCitationText = null;
           }
       }
    }

     // 6. Chạy RAG Embedding & Generation (Client-side) hoặc Fallback Offline Keyword
     if (!matchedPriority) {
       const apiKey = getApiKey();
       let ragSuccess = false;
       
       if (apiKey && apiKey.toUpperCase() !== 'MOCK') {
         try {
           const queryVector = await getQueryEmbedding(queryText, apiKey);
           const retrieved = retrieveLocalChunks(queryVector, 3);
           
           if (retrieved && retrieved.length > 0) {
             const contextContent = retrieved.map(c => `[Nguồn: ${c.metadata.source} - ${c.metadata.sectionTitle}]\n${c.text}`).join("\n\n");
             const geminiAnswerObj = await generateGeminiCompletion(queryText, contextContent, apiKey);
             
             if (geminiAnswerObj && geminiAnswerObj.directAnswer) {
               matchedPriority = true;
               ragSuccess = true;
               
               const resId = geminiAnswerObj.resolutionId;
               const resData = window.RESOLUTIONS_DATA ? window.RESOLUTIONS_DATA.find(r => r.id === resId) : null;
               const resColor = resData ? resData.color : '#4facfe';
               
               finalAnswerText = window.answerRenderer.render(geminiAnswerObj, resColor);
               
               state.lastIntent = 'RAG_GENERATED';
               state.currentTopic = resData ? resData.title : (resId ? 'Nghị quyết ' + resId : 'Văn kiện Đại hội XIV');
               state.lastAnswerMode = 'gemini-rag-assistant';
               
               if (geminiAnswerObj.sources && geminiAnswerObj.sources.length > 0) {
                 window.lastCitationText = "Căn cứ: " + geminiAnswerObj.sources.map(s => s.documentTitle).join(", ");
               }
               
               let ttsText = window.contextValidator.sanitizeScreenText(geminiAnswerObj.directAnswer);
               if (geminiAnswerObj.keyPoints && geminiAnswerObj.keyPoints.length > 0) {
                 ttsText += ". Các luận điểm chính: " + geminiAnswerObj.keyPoints.map(kp => kp.title).join("; ");
               }
               window.ttsSpokenText = ttsText;
             }
           }
         } catch (e) {
           console.error("Gemini RAG pipeline failed, falling back to offline keyword retriever:", e);
         }
       }
       
       // Fallback: Chạy tìm kiếm cục bộ (Local Keyword Context Retriever)
       if (!ragSuccess && hasKnowledgeBase && state.conversationMode !== "scripted-presentation") {
         const structuredRes = window.contextRetriever.retrieve(transcript, rewritten, resolvedRef, storeSnapshot, window.conversationContext);
         if (structuredRes) {
           matchedPriority = true;
           
           const resId = structuredRes.resolutionId;
           const resData = window.RESOLUTIONS_DATA ? window.RESOLUTIONS_DATA.find(r => r.id === resId) : null;
           const resColor = resData ? resData.color : '#4facfe';
           
           finalAnswerText = window.answerRenderer.render(structuredRes, resColor);
           
           state.lastIntent = 'SUGGEST_CONTENT';
           state.currentTopic = resData ? resData.title : 'Nghị quyết ' + resId;
           state.lastAnswerMode = 'official-document-assistant';
           
           if (structuredRes.sources && structuredRes.sources.length > 0) {
               window.lastCitationText = "Nguồn: " + structuredRes.sources[0].documentTitle;
           } else {
               window.lastCitationText = null;
           }
           
           let ttsText = window.contextValidator.sanitizeScreenText(structuredRes.directAnswer);
           if (structuredRes.keyPoints && structuredRes.keyPoints.length > 0) {
               ttsText += ". Các luận điểm trọng tâm gồm: " + structuredRes.keyPoints.map(kp => `${kp.title}: ${kp.content}`).join(". ");
           }
           window.ttsSpokenText = ttsText;
         }
       }
     }
 
     // 7. Fallback cuối cùng
     if (!matchedPriority) {
         if (normText.includes('ban do tri thuc') || normText.includes('so do')) {
             finalAnswerText = "Báo cáo đồng chí. Hệ thống đang trích xuất Bản đồ Tri thức kết nối Nghị quyết 71 với công tác đào tạo tại Đại học Cảnh sát Nhân dân.\n\n   Từ cốt lõi Đổi mới giáo dục của Nghị quyết 71.\n\n   Nhà trường đẩy mạnh phát triển kỹ năng số cho học viên.\n\n   Nhằm tạo ra lực lượng Cảnh sát chính quy tinh nhuệ.\n\n   Đáp ứng xuất sắc yêu cầu tác chiến an ninh mạng trong thời kỳ mới.";
             window.isMindmapIntent = true;
             window.ttsSpokenText = "Báo cáo đồng chí, hệ thống đang trích xuất bản đồ tri thức của nghị quyết 71.";
         } else {
             if (hasKnowledgeBase) {
                 finalAnswerText = "Trong nguồn Văn kiện Đại hội XIV hiện được tích hợp, tôi chưa tìm thấy nội dung đủ rõ để trả lời chính xác câu hỏi này. Xin đồng chí cung cấp thêm từ khóa hoặc xác định cụ thể nội dung cần trao đổi.";
             } else {
                 finalAnswerText = FALLBACK_TEXT;
             }
             window.ttsSpokenText = finalAnswerText;
         }
     }

    state.lastQuestion = transcript;
    state.lastAnswer = finalAnswerText;
    saveScenarioState(state);
    window.lastFinalAnswerText = finalAnswerText;

    setUIState('SPEAKING');

    // 2. Kích hoạt Action Controller nếu có ContextId hợp lệ (Highlight và Cuộn)
    if (resolvedRef.contextId && window.screenActionController) {
      window.screenActionController.execute([
        { type: 'highlight_context', contextId: resolvedRef.contextId }
      ]);
    }

    // 3. Lưu lượt hội thoại vào bộ nhớ nhiều lượt
    if (window.conversationContext) {
      window.conversationContext.addTurn(transcript, finalAnswerText, storeSnapshot);
    }
    
    // Render text and citation — immediate display with fade-in for zero latency vs. voice
    const textEl = document.getElementById('apple-ai-text');
    if (textEl) {
       let renderedHTML = finalAnswerText;
       if (window.lastCitationText) {
          renderedHTML += `<div style="margin-top: 15px; font-size: 0.75rem; color: rgba(255,255,255,0.4); border-top: 1px dashed rgba(255,255,255,0.15); padding-top: 5px; text-align: right;">${window.lastCitationText}</div>`;
       }
       textEl.style.opacity = '0';
       textEl.style.transition = 'opacity 0.35s ease';
       textEl.innerHTML = renderedHTML;
       requestAnimationFrame(() => requestAnimationFrame(() => { textEl.style.opacity = '1'; }));
    }

    // Speak simultaneously with text display (no lag)
    if (window.isMindmapIntent && playVideoAvatar('bản đồ tri thức', finalAnswerText, null)) {
       // handled by video avatar
    } else {
       speakDynamicText(window.ttsSpokenText || finalAnswerText);
    }

  }, 50); 
}

    function interruptAnswer() {
      if (simulatedProcessingTimer) clearTimeout(simulatedProcessingTimer);
      if (typeWriterInterval) clearInterval(typeWriterInterval);
      if (currentAudio) {
        try {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        } catch(e){}
        currentAudio = null;
      }
      const videoEl = document.getElementById('ai-avatar-video');
      const imgEl = document.getElementById('ai-avatar-img');
      if (videoEl) {
        try { videoEl.pause(); videoEl.currentTime = 0; } catch(e){}
        videoEl.style.display = 'none';
      }
      if (imgEl) {
        imgEl.style.display = 'block';
      }
      synth.cancel();
      
      const vis = document.getElementById('ai-audio-visualizer');
      if (vis) {
        vis.style.opacity = '0';
        vis.classList.remove('visualizer-anim');
      }
      
      const stopBtn = document.getElementById('apple-ai-stop-btn');
      if (stopBtn) stopBtn.style.display = 'none';
      document.querySelectorAll('.ai-speaking-highlight').forEach(el => el.classList.remove('ai-speaking-highlight'));
      
      // Keep input focused so they can type immediately
      const inputEl = document.getElementById('apple-ai-input');
      if (inputEl) {
        setTimeout(() => inputEl.focus(), 50);
      }
    }

   function startInteraction() {
    if (currentState !== 'IDLE') {
      if (currentState === 'SPEAKING') {
        interruptAnswer();
      } else {
        return;
      }
    }
 
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
     document.querySelectorAll('.ai-speaking-highlight').forEach(el => el.classList.remove('ai-speaking-highlight'));
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
 
   function updateContextUI(state) {
    const container = document.getElementById('apple-ai-context-container');
    if (!container) return;

    if (state.page.type === 'home') {
      container.innerHTML = `
        <div class="apple-ai-context-chip">
          <span>🎯 Toàn cảnh 9 Nghị quyết chiến lược</span>
        </div>
      `;
      return;
    }

    const primaryId = state.viewport.primaryContextId;
    if (!primaryId) {
      if (state.page.resolutionId) {
        container.innerHTML = `
          <div class="apple-ai-context-chip" onclick="AICopilot.showContextSelectionMenu(event)">
            <span>🎯 Nghị quyết ${state.page.resolutionId}</span>
          </div>
        `;
      } else {
        container.innerHTML = '';
      }
      return;
    }

    const el = document.querySelector(`[data-context-id="${primaryId}"]`);
    if (!el) {
      if (state.page.resolutionId) {
        container.innerHTML = `
          <div class="apple-ai-context-chip" onclick="AICopilot.showContextSelectionMenu(event)">
            <span>🎯 Nghị quyết ${state.page.resolutionId}</span>
          </div>
        `;
      } else {
        container.innerHTML = '';
      }
      return;
    }

    const resId = el.getAttribute('data-resolution-id') || state.page.resolutionId;
    const title = el.getAttribute('data-context-title') || 'Nội dung';
    const itemIdx = el.getAttribute('data-item-index');
    
    let text = `Nghị quyết ${resId} › ${title}`;
    if (itemIdx !== null && itemIdx !== undefined && itemIdx !== '' && title !== 'Giới thiệu' && title !== 'Bối cảnh ra đời') {
      const num = parseInt(itemIdx, 10) + 1;
      text += ` › Ý số ${num}`;
    }

    container.innerHTML = `
      <div class="apple-ai-context-chip" onclick="AICopilot.showContextSelectionMenu(event)">
        <span>🎯 ${text}</span>
      </div>
      <div id="apple-ai-context-menu" class="apple-ai-context-chip-menu">
        <div class="apple-ai-context-chip-menu-item" onclick="AICopilot.selectContextScope('item', '${primaryId}')">Ý đang hiển thị</div>
        <div class="apple-ai-context-chip-menu-item" onclick="AICopilot.selectContextScope('section', '${primaryId}')">Toàn bộ mục: ${title}</div>
        <div class="apple-ai-context-chip-menu-item" onclick="AICopilot.selectContextScope('resolution', '${resId}')">Toàn bộ Nghị quyết ${resId}</div>
      </div>
    `;
  }

  function showContextSelectionMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('apple-ai-context-menu');
    if (menu) {
      const isVisible = menu.style.display === 'block';
      document.querySelectorAll('.apple-ai-context-chip-menu').forEach(m => m.style.display = 'none');
      menu.style.display = isVisible ? 'none' : 'block';
    }
  }

  function selectContextScope(scope, id) {
    const menu = document.getElementById('apple-ai-context-menu');
    if (menu) menu.style.display = 'none';

    if (scope === 'item') {
      window.screenContextStore.updateState({
        interaction: {
          selectedContextId: id,
          lastClickedContextId: id
        }
      });
      if (window.screenActionController) {
        window.screenActionController.execute([{ type: 'highlight_context', contextId: id }]);
      }
    } else if (scope === 'section') {
      const currentEl = document.querySelector(`[data-context-id="${id}"]`);
      if (currentEl) {
        const secId = currentEl.getAttribute('data-section-id');
        const resId = currentEl.getAttribute('data-resolution-id');
        const firstSecEl = document.querySelector(`[data-resolution-id="${resId}"][data-section-id="${secId}"]`);
        if (firstSecEl) {
          const firstId = firstSecEl.getAttribute('data-context-id');
          window.screenContextStore.updateState({
            interaction: {
              selectedContextId: firstId,
              lastClickedContextId: firstId
            }
          });
          if (window.screenActionController) {
            window.screenActionController.execute([{ type: 'highlight_context', contextId: firstId }]);
          }
        }
      }
    } else if (scope === 'resolution') {
      window.screenContextStore.updateState({
        page: {
          resolutionId: id
        },
        interaction: {
          selectedContextId: null
        }
      });
      if (window.APP && window.APP.navigateTo) {
        window.APP.navigateTo(`#/nghi-quyet/${id}`);
      }
    }
  }

  function openSourceAnchor(contextId) {
    if (contextId && window.screenActionController) {
      window.screenActionController.execute([
        { type: 'focus_context', contextId: contextId }
      ]);
    }
  }

  function initUI() {
    if (document.getElementById('apple-ai-overlay')) return;
    const overlayHTML = `
      <div id="apple-ai-overlay" class="apple-ai-overlay" style="display:none;">
        <style>
          .apple-ai-context-chip {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 16px;
            padding: 6px 12px;
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            transition: all 0.2s ease;
            user-select: none;
            cursor: pointer;
            margin-bottom: 8px;
          }
          .apple-ai-context-chip:hover {
            background: rgba(255, 255, 255, 0.15);
          }
          .apple-ai-context-chip-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(20, 20, 20, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
            z-index: 10000;
            overflow: hidden;
            margin-top: 4px;
            width: max-content;
          }
          .apple-ai-context-chip-menu-item {
            padding: 8px 16px;
            color: #fff;
            cursor: pointer;
            font-size: 0.8rem;
            transition: background 0.2s;
            text-align: left;
          }
          .apple-ai-context-chip-menu-item:hover {
            background: rgba(255, 255, 255, 0.1) !important;
          }
          .apple-ai-suggestion-chip {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 14px;
            padding: 5px 12px;
            font-size: 0.75rem;
            color: rgba(255,255,255,0.85);
            font-family: inherit;
            cursor: pointer;
            transition: all 0.2s;
            white-space: nowrap;
          }
          .apple-ai-suggestion-chip:hover {
            background: rgba(255, 255, 255, 0.15) !important;
          }
          /* Input centering */
          .apple-ai-input-wrapper {
            max-width: 660px;
            margin: 0 auto;
          }
          /* Answer component spacing & highlighting */
          .structured-ai-response { padding: 0; margin: 0; }
          .structured-ai-response h4 { margin: 0 0 4px 0; font-size: 0.9rem; }
          .ai-section-hdr {
            font-weight: 700;
            color: #fff;
            font-size: 0.95rem;
            margin: 8px 0 4px 0;
            padding: 3px 0;
            border-bottom: 1px solid rgba(255,255,255,0.15);
          }
          .ai-direct-answer { margin: 0 0 8px 0; }
          .ai-keypoints-section { margin: 0; padding: 0; list-style: none; }
          .ai-kp-title {
            font-weight: 700;
            color: #ffd060;
            font-size: 0.88rem;
            display: inline;
          }
          .ai-keypoint-card {
            margin: 4px 0;
            padding: 4px 0;
            border-bottom: 1px solid rgba(255,255,255,0.07);
          }
          .ai-keypoint-card:last-child { border-bottom: none; }
          .ai-app-card { margin: 4px 0; }
          .ai-memory-message { font-style: italic; opacity: 0.7; margin: 4px 0; }
          .ai-sources-section { font-size: 0.75rem; opacity: 0.45; margin-top: 8px; padding-top: 6px; border-top: 1px dashed rgba(255,255,255,0.12); }
        </style>
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
          
          <div id="apple-ai-context-container" style="display:flex; justify-content:center; margin-bottom:10px; position:relative; flex-shrink:0;"></div>
          
          <div id="apple-ai-text" class="apple-ai-text" style="min-height:3em; width:100%;"></div>
          <div id="apple-ai-mindmap" style="display:none;opacity:0;width:100%;height:280px;flex-shrink:0;"></div>
          
          <div class="apple-ai-input-wrapper" style="position:relative; width:100%; display:none; flex-shrink:0;">
            <input id="apple-ai-input" class="apple-ai-input" type="text"
                   placeholder="⌨️ Nhập câu hỏi và nhấn Enter (hoặc nói bằng Ctrl+Space)..."
                   style="width:100%; padding-right:50px;" />
            <button id="apple-ai-stop-btn" class="apple-ai-stop-btn" style="display:none; position:absolute; right:10px; top:50%; transform:translateY(-50%); width:30px; height:30px; border-radius:50%; background:rgba(255, 94, 98, 0.2); border:1px solid rgba(255, 94, 98, 0.4); color:#ff5e62; font-size:0.75rem; cursor:pointer; align-items:center; justify-content:center; transition:all 0.2s; z-index:10;" onmouseover="this.style.background='rgba(255, 94, 98, 0.4)'" onmouseout="this.style.background='rgba(255, 94, 98, 0.2)'">■</button>
          </div>
          
          <div class="apple-ai-hint" style="margin-top:12px; font-size:0.8rem; color:rgba(255,255,255,0.4); text-align:center; flex-shrink:0;">
            Ctrl+Space • Hỏi bằng giọng nói &nbsp;|&nbsp; Esc • Đóng &nbsp;|&nbsp; Enter • Gửi câu hỏi
          </div>
          <div class="apple-ai-admin-actions" style="margin-top:10px; display:flex; justify-content:center; gap:8px; flex-wrap:wrap; flex-shrink:0;">
            <button id="ai-btn-reset-conv" class="ai-admin-btn" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.85); padding:5px 12px; border-radius:14px; font-size:0.75rem; font-family:inherit; cursor:pointer; transition:all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.18)'" onmouseout="this.style.background='rgba(255,255,255,0.08)'">Đặt lại hội thoại</button>
            <button id="ai-btn-reset-script" class="ai-admin-btn" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.85); padding:5px 12px; border-radius:14px; font-size:0.75rem; font-family:inherit; cursor:pointer; transition:all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.18)'" onmouseout="this.style.background='rgba(255,255,255,0.08)'">Đặt lại kịch bản</button>
            <button id="ai-btn-clear-session" class="ai-admin-btn" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.85); padding:5px 12px; border-radius:14px; font-size:0.75rem; font-family:inherit; cursor:pointer; transition:all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.18)'" onmouseout="this.style.background='rgba(255,255,255,0.08)'">Xóa ngữ cảnh phiên</button>
            <button id="ai-btn-config-key" class="ai-admin-btn" style="background:rgba(0,242,254,0.1); border:1px solid rgba(0,242,254,0.3); color:#00f2fe; padding:5px 12px; border-radius:14px; font-size:0.75rem; font-family:inherit; cursor:pointer; transition:all 0.2s;" onmouseover="this.style.background='rgba(0,242,254,0.2)'" onmouseout="this.style.background='rgba(0,242,254,0.1)'">Cấu hình API Key</button>
          </div>
          <div id="ai-api-key-config" style="display:none; margin-top:10px; width:100%; flex-direction:column; gap:8px; background:rgba(255,255,255,0.05); padding:10px; border-radius:12px; border:1px solid rgba(255,255,255,0.1); box-sizing:border-box; flex-shrink:0;">
            <div style="font-size:0.75rem; color:rgba(255,255,255,0.85); text-align:left; font-weight:600;">Cấu hình Gemini API Key:</div>
            <div style="display:flex; gap:8px; width:100%;">
              <input id="ai-api-key-input" type="password" placeholder="Nhập API Key hoặc MOCK..." style="flex:1; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.2); border-radius:8px; padding:6px 10px; color:#fff; font-size:0.75rem; outline:none;" />
              <button id="ai-btn-save-key" style="background:#00f2fe; border:none; color:#000; padding:6px 12px; border-radius:8px; font-size:0.75rem; font-weight:600; cursor:pointer; transition:background 0.2s;" onmouseover="this.style.background='#00c2cb'" onmouseout="this.style.background='#00f2fe'">Lưu</button>
            </div>
            <div style="font-size:0.65rem; color:rgba(255,255,255,0.4); text-align:left;">Key được lưu cục bộ trong trình duyệt. Nhập MOCK để chạy offline/giả lập.</div>
          </div>
          <div id="ai-admin-warning" style="display:none; margin-top:8px; font-size:0.72rem; color:#ffb300; text-align:center; padding: 4px 8px; border-radius: 8px; background: rgba(255, 179, 0, 0.08); border: 1px solid rgba(255,179,0,0.15); line-height: 1.3; flex-shrink:0;"></div>
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
        warningEl.innerText = "Không tìm thấy nguồn tri thức \"VĂN KIỆN ĐẠI HỘI XIV\". Trợ lý đang hoạt động ở chế độ kịch bản có sẵn.";
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

    // Wire up API key config toggle and save
    const btnConfigKey = document.getElementById('ai-btn-config-key');
    const panelConfigKey = document.getElementById('ai-api-key-config');
    const inputKey = document.getElementById('ai-api-key-input');
    const btnSaveKey = document.getElementById('ai-btn-save-key');

    if (btnConfigKey && panelConfigKey) {
      btnConfigKey.addEventListener('click', () => {
        const isHidden = panelConfigKey.style.display === 'none';
        panelConfigKey.style.display = isHidden ? 'flex' : 'none';
        if (isHidden && inputKey) {
          inputKey.value = localStorage.getItem('GEMINI_API_KEY') || '';
        }
      });
    }

    if (btnSaveKey && inputKey) {
      btnSaveKey.addEventListener('click', () => {
        const keyVal = inputKey.value.trim();
        if (keyVal) {
          localStorage.setItem('GEMINI_API_KEY', keyVal);
          alert('Đã lưu Gemini API Key thành công!');
        } else {
          localStorage.removeItem('GEMINI_API_KEY');
          alert('Đã xóa Gemini API Key. Trợ lý hoạt động ở chế độ MOCK.');
        }
        if (panelConfigKey) panelConfigKey.style.display = 'none';
      });
    }

    // Wire up stop button
    const stopBtn = document.getElementById('apple-ai-stop-btn');
    if (stopBtn) stopBtn.addEventListener('click', interruptAnswer);

    // Wire up text input inside wrapper
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
        if (e.key === 'Escape') {
          // If speaking/processing, escape stops the answer; otherwise it closes the assistant
          if (currentState === 'SPEAKING' || currentState === 'PROCESSING') {
            interruptAnswer();
          } else {
            stopAI();
          }
        }
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
      loadVectorIndex();

      if (window.screenContextStore) {
        window.screenContextStore.subscribe((state) => {
          updateContextUI(state);
        });
        updateContextUI(window.screenContextStore.getState());
      }

      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.code === 'Space') {
          e.preventDefault();
          startInteraction();
        }
        if (e.code === 'Escape') {
          if (currentState === 'SPEAKING' || currentState === 'PROCESSING') {
            interruptAnswer();
          } else {
            stopAI();
          }
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
    } else if (step >= 1 && step <= 4) {
      // Draw line
      const line = document.getElementById('mm-line-' + step);
      if (line) line.classList.add('drawn');
      setTimeout(() => {
        const nodeCircle = document.querySelector('#mm-node-' + step + ' circle');
        if (nodeCircle) nodeCircle.setAttribute('r', '40');
        document.getElementById('mm-node-' + step).classList.add('active');
      }, 500); // delay node activation slightly after line starts drawing
    }
  }

  return { init, startInteraction, stopAI, drawMindmapStep, resetConversation, resetScript, clearSession, showContextSelectionMenu, selectContextScope, openSourceAnchor, setUIState, handleSuggestionClick };
})();

AICopilot.init();
