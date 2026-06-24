/**
 * Context Retriever & Local RAG Engine
 * Tìm kiếm tài liệu, tích hợp các bộ lọc và định dạng câu trả lời theo Schema.
 */

class ContextRetriever {
  /**
   * Truy xuất và xây dựng câu trả lời có cấu trúc
   */
  static retrieve(transcript, rewrittenQuery, resolvedRef, storeSnapshot, convContext) {
    const queryText = rewrittenQuery.query;
    const normText = queryText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");

    // 1. Kiểm tra sự nhất quán về số hiệu và chủ đề nghị quyết
    const consistencyCheck = window.resolutionRegistry.checkConsistency(transcript);
    if (consistencyCheck) {
      return {
        answerId: "consistency_clarification",
        resolutionId: consistencyCheck.expectedNum,
        contextIds: [],
        directAnswer: `Báo cáo đồng chí. Tôi phát hiện số hiệu nghị quyết và chủ đề trong câu hỏi không khớp nhau. Đồng chí đang muốn đề cập tới <b>Nghị quyết ${consistencyCheck.expectedNum} về ${consistencyCheck.expectedShortTitle}</b> hay <b>Nghị quyết ${consistencyCheck.mismatchedNum} về ${consistencyCheck.mismatchedShortTitle}</b>?`,
        keyPoints: [
          {
            id: `nq${consistencyCheck.expectedNum}`,
            title: `Nghị quyết ${consistencyCheck.expectedNum}`,
            content: `Chủ đề chính thức: ${window.resolutionRegistry.REGISTRY[consistencyCheck.expectedNum].title}`,
            keywords: [],
            sourceAnchors: []
          },
          {
            id: `nq${consistencyCheck.mismatchedNum}`,
            title: `Nghị quyết ${consistencyCheck.mismatchedNum}`,
            content: `Chủ đề chính thức: ${window.resolutionRegistry.REGISTRY[consistencyCheck.mismatchedNum].title}`,
            keywords: [],
            sourceAnchors: []
          }
        ],
        visualization: {
          type: "none",
          data: {}
        },
        memoryMessage: "Vui lòng xác nhận chính xác số hiệu nghị quyết để tôi cung cấp thông tin chuẩn xác nhất.",
        confidenceNotes: ["Yêu cầu làm rõ ngữ cảnh"],
        sources: []
      };
    }

    // 2. Kiểm tra ý định làm rõ do trùng lắp ngữ cảnh hiển thị (Clarification)
    if (resolvedRef.intent === 'CLARIFY' && resolvedRef.clarifyingSections) {
      const sec0 = resolvedRef.clarifyingSections[0];
      const sec1 = resolvedRef.clarifyingSections[1];
      return {
        answerId: "clarification_needed",
        resolutionId: resolvedRef.resolutionId || storeSnapshot.page.resolutionId || "",
        contextIds: [],
        directAnswer: `Báo cáo đồng chí, cả mục <b>${sec0.title.toLowerCase()}</b> và mục <b>${sec1.title.toLowerCase()}</b> đều đang hiển thị trên màn hình. Đồng chí muốn làm rõ nội dung nào hơn?`,
        keyPoints: [
          {
            id: sec0.ids[0] || "sec0",
            title: sec0.title,
            content: "Nội dung đang hiển thị ở phần trên màn hình.",
            keywords: [],
            sourceAnchors: [sec0.ids[0] || ""]
          },
          {
            id: sec1.ids[0] || "sec1",
            title: sec1.title,
            content: "Nội dung đang hiển thị ở phần dưới màn hình.",
            keywords: [],
            sourceAnchors: [sec1.ids[0] || ""]
          }
        ],
        visualization: {
          type: "none",
          data: {}
        },
        memoryMessage: "Bấm vào tiêu điểm tương ứng hoặc gõ rõ cụm từ muốn hỏi.",
        confidenceNotes: ["Phát hiện nhiều vùng tập trung"],
        sources: []
      };
    }

    // 3. Tiến hành tìm kiếm trong VANKIEN_DB
    let bestMatch = this.findBestKnowledgeMatch(normText, resolvedRef, storeSnapshot);

    const targetResId = resolvedRef.resolutionId || storeSnapshot.page.resolutionId || (bestMatch ? bestMatch.resolutionId : null);
    
    // Tìm dữ liệu nghị quyết gốc trong RESOLUTIONS_DATA
    const resData = window.RESOLUTIONS_DATA ? window.RESOLUTIONS_DATA.find(r => r.id === targetResId) : null;

    if (!resData) {
      // Fallback khi không khớp bất kì nghị quyết nào
      return {
        answerId: "fallback_general",
        resolutionId: "",
        contextIds: [],
        directAnswer: "Trong nguồn Văn kiện Đại hội XIV hiện được tích hợp, tôi chưa tìm thấy nội dung đủ rõ để trả lời chính xác câu hỏi này. Xin đồng chí cung cấp thêm từ khóa hoặc xác định cụ thể nội dung cần trao đổi.",
        keyPoints: [],
        visualization: { type: "none", data: {} },
        memoryMessage: "Bạn có thể hỏi về các nghị quyết số 57, 59, 66, 68, 70, 71, 72, 79 hoặc 80.",
        confidenceNotes: ["Dữ liệu ngoài phạm vi cục bộ"],
        sources: []
      };
    }

    // 4. Xây dựng câu trả lời có cấu trúc từ dữ liệu của Nghị quyết
    const resId = resData.id;
    const cleanContextId = resolvedRef.contextId || `nq${resId}.intro`;

    // A. Direct Answer
    let directAnswer = `Nghị quyết số <b>${resData.number}</b> của Ban Chấp hành Trung ương Đảng ban hành ngày ${resData.date || 'đang cập nhật'} tập trung vào chủ đề: <i>"${resData.title}"</i>. `;
    if (resolvedRef.intent === 'GET_SOURCE') {
      directAnswer += `Căn cứ pháp lý và nguồn kiểm chứng chính thức của nội dung này trích từ văn bản gốc của Trung ương.`;
    } else if (resolvedRef.intent === 'EXPLAIN_DEEPER') {
      directAnswer += `Dưới đây là phần giải thích chuyên sâu và làm rõ luận điểm đồng chí quan tâm.`;
    } else {
      directAnswer += resData.summary || '';
    }

    // B. Key Points (3 - 5 points)
    let keyPoints = [];
    if (resData.coreIdeas && resData.coreIdeas.length > 0) {
      keyPoints = resData.coreIdeas.slice(0, 5).map((idea, idx) => ({
        id: `nq${resId}.core-ideas.${idx + 1}`,
        title: `Luận điểm cốt lõi ${idx + 1}`,
        content: idea,
        keywords: idea.split(' ').slice(0, 3),
        sourceAnchors: [`nq${resId}.core-ideas.${idx + 1}`]
      }));
    }

    // C. Visualization Type & Data Selection
    let vizType = "none";
    let vizData = {};

    const isTaskQuery = this.matchesAny(normText, ['nhiem vu', 'giai phap', 'cac buoc', 'thuc hien', 'lam gi']);
    const isGoalQuery = this.matchesAny(normText, ['muc tieu', 'chi tieu', 'den nam', 'chi so', 'so lieu']);
    const isNewQuery = this.matchesAny(normText, ['diem moi', 'dot pha', 'khac biet', 'moi la']);
    const isCompareQuery = resolvedRef.intent === 'COMPARE';
    const isRespQuery = this.matchesAny(normText, ['trach nhiem', 'can bo', 'dang vien', 'hoc vien', 'nha truong']);

    if (isCompareQuery) {
      vizType = "comparison";
      // So sánh nghị quyết hiện tại với một số nghị quyết lân cận
      vizData = {
        headers: ["Tiêu chí so sánh", `Nghị quyết ${resId}`, "Nghị quyết khác"],
        rows: [
          ["Chủ đề cốt lõi", resData.shortTitle, "Đổi mới nội dung phát triển bền vững"],
          ["Trọng tâm đột phá", resData.coreIdeas ? resData.coreIdeas[0] : "Phát triển toàn diện", "Thể chế và nguồn lực công"],
          ["Liên hệ CAND", "Đào tạo nghiệp vụ chuyên sâu", "Rèn luyện phẩm chất kỷ cương"]
        ]
      };
    } 
    else if (isRespQuery && resData.responsibilities) {
      vizType = "matrix";
      vizData = {
        cells: resData.responsibilities.slice(0, 4).map(r => ({
          icon: r.icon || '📌',
          header: r.title,
          content: r.content
        }))
      };
    }
    else if (isTaskQuery && resData.tasks) {
      vizType = "flow";
      vizData = {
        steps: resData.tasks.map(t => ({
          title: t.title,
          desc: t.description
        }))
      };
    }
    else if (isGoalQuery && resData.goals2030) {
      vizType = "cards";
      vizData = {
        items: resData.goals2030.map(g => ({
          title: `${g.label}: ${g.value}`,
          desc: g.description
        }))
      };
    }
    else if (isNewQuery && resData.newPoints) {
      vizType = "argument_evidence";
      vizData = {
        pairs: resData.newPoints.map((np, idx) => ({
          argument: np,
          evidence: `Đoạn trích từ Tài liệu gốc NQ ${resId} (Nguồn: Báo Nhân Dân)`
        }))
      };
    }
    else if (resData.vision2045) {
      vizType = "timeline";
      vizData = {
        events: resData.vision2045.map((v, idx) => ({
          time: `Tầm nhìn ${2030 + (idx * 5)}`,
          title: `Định hướng chiến lược ${idx + 1}`,
          desc: v
        }))
      };
    }

    // D. Official Quotes
    let officialQuotes = [];
    if (resData.quoteBlocks && resData.quoteBlocks.length > 0) {
      officialQuotes = resData.quoteBlocks.map(q => ({
        quote: q.quote,
        speaker: q.speaker || "Phát biểu chỉ đạo",
        context: q.context || ""
      }));
    } else {
      officialQuotes = [
        {
          quote: resData.tagline || `Chủ động cụ thể hóa Nghị quyết số ${resData.number} vào thực tiễn huấn luyện và giảng dạy.`,
          speaker: "Văn kiện Đại hội XIV",
          context: "Định hướng hành động"
        }
      ];
    }

    // E. AI Interpretation (Bản dịch / Diễn giải)
    let interpretation = [];
    if (bestMatch && bestMatch.content) {
      interpretation.push(bestMatch.content);
    } else {
      interpretation.push(resData.summary || "");
    }

    // F. Practical Application (Liên hệ Đại học CSND / Học viên)
    let practicalApplication = [];
    if (resData.responsibilities) {
      practicalApplication = resData.responsibilities.map(r => ({
        title: r.title,
        content: r.content,
        icon: r.icon
      }));
    } else {
      practicalApplication = [
        {
          title: "Liên hệ CAND",
          content: "Chủ động nghiên cứu và vận dụng tinh thần nghị quyết vào học tập chuyên ngành nghiệp vụ.",
          icon: "<i class='fas fa-user-shield'></i>"
        }
      ];
    }

    // G. Misconceptions (Điểm dễ hiểu sai)
    let misconceptions = [];
    if (resId === '57') {
      misconceptions = [
        {
          wrong: "KH&CN chỉ là vai trò của các phòng thí nghiệm quốc gia.",
          right: "Nghị quyết khẳng định doanh nghiệp mới là chủ thể, nguồn lực và động lực chính cho đổi mới sáng tạo."
        },
        {
          wrong: "Mọi thử nghiệm công nghệ thất bại đều bị xử lý trách nhiệm hành chính/hình sự.",
          right: "Nghị quyết xác định cơ chế chấp nhận rủi ro, không hình sự hóa hoạt động nghiên cứu khoa học nếu tuân thủ quy trình sandbox."
        }
      ];
    } else if (resId === '59') {
      misconceptions = [
        {
          wrong: "Hội nhập quốc tế nghĩa là sao chép nguyên mẫu các giáo trình và quy trình đào tạo của nước ngoài.",
          right: "Hội nhập phải trên nền tảng giữ vững độc lập, chủ quyền, bản lĩnh chính trị và lợi ích quốc gia."
        }
      ];
    } else {
      misconceptions = [
        {
          wrong: "Chỉ cán bộ chỉ huy mới cần học tập chi tiết nghị quyết này.",
          right: "Nghị quyết yêu cầu cụ thể hóa thành hành động của toàn bộ cán bộ, đảng viên, giảng viên và từng học viên."
        }
      ];
    }

    // H. Sources
    let sources = [
      {
        sourceId: cleanContextId,
        documentTitle: resData.sourceName ? `${resData.sourceName} (NQ ${resId})` : `Tài liệu gốc NQ ${resId}.pdf`,
        sourceUrl: resData.sourceUrl || "#"
      }
    ];

    // I. Takeaway Message / Quick memory
    let memoryMessage = `Chủ động nâng cao nhận thức chính trị, biến tinh thần Nghị quyết ${resId} thành kim chỉ nam cho hành động huấn luyện chuyên nghiệp tại Đại học CSND.`;
    if (resId === '71') memoryMessage = "Giáo dục thực học - thực tài, đẩy mạnh chuyển đổi số giảng đường, loại bỏ bệnh thành tích.";

    return {
      answerId: `structured_${resId}_${Date.now()}`,
      resolutionId: resId,
      contextIds: [cleanContextId],
      directAnswer: directAnswer,
      keyPoints: keyPoints,
      visualization: {
        type: vizType,
        data: vizData
      },
      officialQuotes: officialQuotes,
      interpretation: interpretation,
      practicalApplication: practicalApplication,
      misconceptions: misconceptions,
      memoryMessage: memoryMessage,
      sources: sources,
      confidenceNotes: ["Chế độ dữ liệu cục bộ - Tri thức được nhúng trực tiếp"]
    };
  }

  /**
   * Helper kiểm tra từ khóa trùng khớp
   */
  static matchesAny(text, keywords) {
    return keywords.some(kw => text.includes(kw));
  }

  /**
   * Tìm kiếm đoạn văn bản phù hợp nhất trong VANKIEN_DB dựa trên trọng số từ khóa và ngữ cảnh màn hình
   */
  static findBestKnowledgeMatch(normText, resolvedRef, storeSnapshot) {
    if (typeof VANKIEN_DB === 'undefined' || !Array.isArray(VANKIEN_DB)) return null;

    let matchedResults = [];
    const targetResId = resolvedRef.resolutionId || storeSnapshot.page.resolutionId;

    function getItemResolutionId(item) {
      if (!item) return null;
      if (item.source) {
        const match = item.source.match(/NQ[_\s-]?(\d+)/i);
        if (match) return match[1];
      }
      if (item.topic) {
        const match = item.topic.match(/(?:Nghị quyết|NQ)\s*(\d+)/i);
        if (match) return match[1];
      }
      return null;
    }

    for (let item of VANKIEN_DB) {
      if (item.exactResponse) continue; // Bỏ qua scripted response nếu có

      let score = 0.0;
      
      // Khớp từ khóa
      let kwMatchCount = 0;
      if (item.keywords) {
        item.keywords.forEach(kw => {
          let normKw = kw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
          if (normText.includes(normKw)) kwMatchCount++;
        });
        score += Math.min(kwMatchCount * 0.2, 0.5);
      }

      // Khớp synonyms
      let synMatchCount = 0;
      if (item.synonyms) {
        item.synonyms.forEach(syn => {
          let normSyn = syn.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
          if (normText.includes(normSyn)) synMatchCount++;
        });
        if (synMatchCount > 0) score += 0.2;
      }

      // Khớp từ quan trọng
      let words = normText.split(' ');
      let importantWords = words.filter(w => w.length > 2);
      let matchWords = 0;
      if (importantWords.length > 0) {
        importantWords.forEach(w => {
          let normTopic = item.topic.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
          let normContent = item.content.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
          if (normTopic.includes(w)) matchWords += 1.5;
          else if (normContent.includes(w)) matchWords += 1.0;
        });
        score += (matchWords / importantWords.length) * 0.35;
      }

      // Boost theo ràng buộc màn hình hiển thị
      const itemResId = getItemResolutionId(item);
      let categoryScore = 0.0;

      if (targetResId) {
        if (itemResId === targetResId) {
          categoryScore = 0.4;

          // Boost cùng mục
          if (resolvedRef.sectionId && item.topic) {
            const secKeywords = {
              'coreIdeas': ['cốt lõi', 'tinh thần'],
              'core-ideas': ['cốt lõi', 'tinh thần'],
              'goals2030': ['mục tiêu', '2030'],
              'goals-2030': ['mục tiêu', '2030'],
              'tasks': ['nhiệm vụ', 'giải pháp'],
              'newPoints': ['điểm mới', 'đột phá'],
              'new-points': ['điểm mới', 'đột phá'],
              'responsibilities': ['trách nhiệm', 'báo cáo viên', 'giảng viên', 'học viên'],
              'quoteBlocks': ['phát biểu', 'trích dẫn', 'nói', 'khẳng định'],
              'quotes': ['phát biểu', 'trích dẫn', 'nói', 'khẳng định']
            };
            const kws = secKeywords[resolvedRef.sectionId] || [];
            const matchesSec = kws.some(kw => item.topic.toLowerCase().includes(kw) || item.content.toLowerCase().includes(kw));
            if (matchesSec) {
              categoryScore = 0.8;
            }
          }

          // Boost contextId cụ thể
          if (resolvedRef.contextId && resolvedRef.contextText) {
            const cleanContent = item.content.toLowerCase();
            const cleanText = resolvedRef.contextText.toLowerCase();
            if (cleanContent.includes(cleanText) || cleanText.includes(cleanContent)) {
              categoryScore = 1.5;
            }
          }
        } else if (itemResId !== null) {
          if (resolvedRef.intent !== 'COMPARE') {
            categoryScore = -2.0; // Phạt nặng nếu khác nghị quyết
          } else {
            categoryScore = 0.1;
          }
        } else {
          categoryScore = 0.2;
        }
      } else {
        categoryScore = 0.2;
      }

      score += categoryScore;

      if (score > 0) {
        matchedResults.push({ item, score, resolutionId: itemResId });
      }
    }

    matchedResults.sort((a, b) => b.score - a.score);
    return matchedResults.length > 0 ? matchedResults[0] : null;
  }
}

window.contextRetriever = ContextRetriever;
