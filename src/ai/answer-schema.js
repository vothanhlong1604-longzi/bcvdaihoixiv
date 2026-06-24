/**
 * Answer Schema Validator
 * Định nghĩa và kiểm tra tính hợp lệ của cấu trúc phản hồi từ AI Agent
 */

class AnswerSchema {
  static DEFAULT_SCHEMA = {
    answerId: "",
    resolutionId: "",
    contextIds: [],
    directAnswer: "",
    keyPoints: [],
    visualization: {
      type: "none", // "none" | "cards" | "comparison" | "flow" | "timeline" | "relationship" | "matrix" | "argument_evidence"
      data: {}
    },
    officialQuotes: [],
    interpretation: [],
    practicalApplication: [],
    misconceptions: [],
    memoryMessage: "",
    sources: [],
    confidenceNotes: []
  };

  /**
   * Xác thực và tự động điền các trường thiếu của đối tượng câu trả lời
   */
  static validate(answer) {
    const validated = {
      answerId: "",
      resolutionId: "",
      contextIds: [],
      directAnswer: "",
      keyPoints: [],
      visualization: {
        type: "none",
        data: {}
      },
      officialQuotes: [],
      interpretation: [],
      practicalApplication: [],
      misconceptions: [],
      memoryMessage: "",
      sources: [],
      confidenceNotes: []
    };

    if (!answer || typeof answer !== 'object') {
      validated.directAnswer = String(answer || "");
      return validated;
    }

    // Sao chép các trường cơ bản
    if (typeof answer.answerId === 'string') validated.answerId = answer.answerId;
    if (typeof answer.resolutionId === 'string' || typeof answer.resolutionId === 'number') {
      validated.resolutionId = String(answer.resolutionId);
    }
    if (Array.isArray(answer.contextIds)) {
      validated.contextIds = answer.contextIds.filter(id => typeof id === 'string');
    }
    if (typeof answer.directAnswer === 'string') validated.directAnswer = answer.directAnswer;
    if (typeof answer.memoryMessage === 'string') validated.memoryMessage = answer.memoryMessage;

    // Xác thực keyPoints
    if (Array.isArray(answer.keyPoints)) {
      validated.keyPoints = answer.keyPoints.map((kp, idx) => {
        return {
          id: kp.id || `kp_${idx + 1}`,
          title: kp.title || "",
          content: kp.content || "",
          keywords: Array.isArray(kp.keywords) ? kp.keywords : [],
          sourceAnchors: Array.isArray(kp.sourceAnchors) ? kp.sourceAnchors : []
        };
      }).filter(kp => kp.title || kp.content);
    }

    // Xác thực visualization
    if (answer.visualization && typeof answer.visualization === 'object') {
      const type = answer.visualization.type;
      if (['none', 'cards', 'comparison', 'flow', 'timeline', 'relationship', 'matrix', 'argument_evidence'].includes(type)) {
        validated.visualization.type = type;
      }
      if (answer.visualization.data && typeof answer.visualization.data === 'object') {
        validated.visualization.data = { ...answer.visualization.data };
      }
    }

    // Xác thực các mảng chuỗi
    const arrayFields = ['officialQuotes', 'interpretation', 'practicalApplication', 'misconceptions', 'sources', 'confidenceNotes'];
    arrayFields.forEach(field => {
      if (Array.isArray(answer[field])) {
        validated[field] = answer[field].filter(item => typeof item === 'string' || typeof item === 'object');
      }
    });

    return validated;
  }
}

window.answerSchema = AnswerSchema;
