/**
 * Resolution Registry
 * Quản lý danh mục 9 Nghị quyết chiến lược, số hiệu và chủ đề tương ứng.
 */

class ResolutionRegistry {
  static REGISTRY = {
    "57": {
      number: "57",
      officialNumber: "57-NQ/TW",
      title: "Đột phá phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số quốc gia",
      shortTitle: "Khoa học, Công nghệ & Chuyển đổi số",
      theme: "Khoa học - công nghệ",
      keywords: ["khoa hoc", "cong nghe", "chuyen doi so", "doi moi sang tao", "sandbox", "ai", "ban dan", "so hoa", "4.0"]
    },
    "59": {
      number: "59",
      officialNumber: "59-NQ/TW",
      title: "Hội nhập quốc tế trong tình hình mới",
      shortTitle: "Hội nhập quốc tế",
      theme: "Đối ngoại",
      keywords: ["hoi nhap", "doi ngoai", "quoc te", "fdi", "cptpp", "song phuong", "da phuong", "ngoai giao"]
    },
    "66": {
      number: "66",
      officialNumber: "66-NQ/TW",
      title: "Xây dựng và hoàn thiện Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam",
      shortTitle: "Nhà nước pháp quyền",
      theme: "Tư pháp",
      keywords: ["phap quyen", "phap luat", "cai cach tu phap", "luat phap", "cong ly", "toa an", "vien kiem sat"]
    },
    "68": {
      number: "68",
      officialNumber: "68-NQ/TW",
      title: "Phát triển kinh tế tư nhân trở thành một động lực quan trọng của nền kinh tế",
      shortTitle: "Phát triển kinh tế tư nhân",
      theme: "Kinh tế",
      keywords: ["kinh te tu nhan", "doanh nghiep tu nhan", "tu nhan", "doanh nhan", "startup", "khoi nghiep", "co phan"]
    },
    "70": {
      number: "70",
      officialNumber: "70-NQ/TW",
      title: "Phát triển năng lượng và tăng trưởng xanh quốc gia",
      shortTitle: "Năng lượng & Tăng trưởng xanh",
      theme: "Năng lượng",
      keywords: ["nang luong", "tang truong xanh", "net zero", "carbon", "dien", "tai tao", "moi truong", "khi hau"]
    },
    "71": {
      number: "71",
      officialNumber: "71-NQ/TW",
      title: "Đổi mới căn bản, toàn diện giáo dục và đào tạo trong kỷ nguyên mới",
      shortTitle: "Đổi mới Giáo dục & Đào tạo",
      theme: "Giáo dục",
      keywords: ["giao duc", "dao tao", "truong hoc", "hoc vien", "day hoc", "thay co", "bai giang", "hoc lieu", "nhan tai"]
    },
    "72": {
      number: "72",
      officialNumber: "72-NQ/TW",
      title: "Y tế và chăm sóc sức khỏe nhân dân trong tình hình mới",
      shortTitle: "Y tế & Chăm sóc sức khỏe",
      theme: "Y tế",
      keywords: ["y te", "suc khoe", "bac si", "benh vien", "tiem chung", "kham benh", "dich benh", "the chat"]
    },
    "79": {
      number: "79",
      officialNumber: "79-NQ/TW",
      title: "Tiếp tục cơ cấu lại, đổi mới và nâng cao hiệu quả doanh nghiệp nhà nước",
      shortTitle: "Đổi mới Doanh nghiệp nhà nước",
      theme: "Doanh nghiệp nhà nước",
      keywords: ["doanh nghiep nha nuoc", "dnnn", "co phan hoa", "von nha nuoc", "tai san cong", "dau tu cong"]
    },
    "80": {
      number: "80",
      officialNumber: "80-NQ/TW",
      title: "Xây dựng và phát triển văn hóa, con người Việt Nam đáp ứng yêu cầu kỷ nguyên mới",
      shortTitle: "Phát triển Văn hóa",
      theme: "Văn hóa",
      keywords: ["van hoa", "con nguoi", "di san", "dao duc", "loi song", "ban sac", "nghe thuat", "truyen thong"]
    }
  };

  /**
   * Kiểm tra xem câu hỏi có chứa số hiệu và từ khóa chủ đề không khớp nhau không.
   * Trả về thông tin không nhất quán nếu phát hiện, ngược lại trả về null.
   */
  static checkConsistency(query) {
    if (!query) return null;
    const norm = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");

    // 1. Tìm số nghị quyết được nhắc tới trong query
    let mentionedNum = null;
    for (const num in this.REGISTRY) {
      if (norm.includes(`nghi quyet ${num}`) || norm.includes(`nq ${num}`) || norm.includes(`nq${num}`)) {
        mentionedNum = num;
        break;
      }
    }

    if (!mentionedNum) return null; // Không có số nghị quyết cụ thể, không cần kiểm tra chéo

    // 2. Kiểm tra xem có từ khóa chủ đề của nghị quyết KHÁC trong query không
    const registryEntry = this.REGISTRY[mentionedNum];
    
    for (const num in this.REGISTRY) {
      if (num === mentionedNum) continue;

      const otherKeywords = this.REGISTRY[num].keywords;
      const matchedKeyword = otherKeywords.find(kw => {
        // Chỉ so khớp những từ dài hoặc từ khóa có tính định danh cao
        if (kw.length <= 4) return false;
        
        // Tránh trùng lắp từ khóa chung
        if (kw === 'quoc te' && norm.includes('ngoai giao quoc te')) return false;

        const regex = new RegExp(`\\b${kw}\\b`, 'i');
        return regex.test(norm) || norm.includes(kw);
      });

      if (matchedKeyword) {
        // Phát hiện không khớp: nhắc số A nhưng có từ khóa của B!
        return {
          expectedNum: mentionedNum,
          expectedShortTitle: registryEntry.shortTitle,
          mismatchedNum: num,
          mismatchedShortTitle: this.REGISTRY[num].shortTitle,
          keyword: matchedKeyword
        };
      }
    }

    return null;
  }
}

window.resolutionRegistry = ResolutionRegistry;
