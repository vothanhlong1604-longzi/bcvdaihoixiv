/**
 * resolutions.js — Dữ liệu 9 nghị quyết chiến lược, Đại hội XIV
 * Nguồn: Báo Nhân Dân, tóm lược học liệu số
 * Khoa LLCT&KHXHNV – Trường Đại học Cảnh sát nhân dân
 */

const RESOLUTIONS_DATA = [
  {
    id: "57",
    number: "57-NQ/TW",
    title: "Đột phá phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số quốc gia",
    shortTitle: "Khoa học, Công nghệ & Chuyển đổi số",
    date: "22/12/2024",
    theme: "Khoa học - công nghệ",
    color: "#1565C0",
    colorLight: "rgba(21, 101, 192, 0.12)",
    colorGlow: "rgba(21, 101, 192, 0.4)",
    icon: "🔬",
    keywords: ["Chuyển đổi số ≥30% GDP", "AI Top 3 ĐNÁ", "R&D ≥2% GDP"],
    sourceUrl: "https://nhandan.vn/special/nghi-quyet-57-phat-trien-khoa-hoc-cong-nghe-doi-moi-sang-tao-chuyen-doi-so-quoc-gia/index.html",
    sourceName: "Báo Nhân Dân",
    heroGradient: "linear-gradient(135deg, #0D47A1 0%, #1565C0 50%, #0277BD 100%)",
    status: "complete",
    tagline: "KH&CN, đổi mới sáng tạo là chìa khóa chiến lược, doanh nghiệp là động lực chính",
    summary: "Nghị quyết 57-NQ/TW xác định khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số là đột phá chiến lược quan trọng hàng đầu, là động lực then chốt nâng cao năng suất lao động, chất lượng tăng trưởng và năng lực cạnh tranh quốc gia. Nhà nước giữ vai trò dẫn dắt, chấp nhận rủi ro trong nghiên cứu, áp dụng cơ chế sandbox cho công nghệ mới.",
    coreIdeas: [
      "KH&CN là đột phá quan trọng hàng đầu – Doanh nghiệp là chủ thể, nguồn lực và động lực chính",
      "Chuyển đổi số toàn diện: kinh tế số đạt tối thiểu 30% GDP vào năm 2030",
      "Phát triển AI, bán dẫn, điện toán đám mây, an ninh mạng – Việt Nam vào Top 3 ĐNÁ về R&D AI",
      "Nhà nước chấp nhận rủi ro, áp dụng cơ chế sandbox cho công nghệ mới và ĐMST",
      "Coi thất bại trong nghiên cứu là bài học kinh nghiệm, không hình sự hóa hoạt động khoa học"
    ],
    goals2030: [
      { label: "Chi R&D/GDP", value: "2%", description: "60–70% từ doanh nghiệp và xã hội; 3% tổng chi ngân sách hàng năm cho KH&CN" },
      { label: "Kinh tế số/GDP", value: "≥30%", description: "Tỷ trọng kinh tế số trong GDP quốc gia" },
      { label: "Xuất khẩu công nghệ cao", value: "≥50%", description: "Tỷ trọng hàng hóa công nghệ cao trong tổng xuất khẩu" },
      { label: "TFP đóng góp tăng trưởng", value: ">55%", description: "Năng suất nhân tố tổng hợp đóng góp vào tăng trưởng" },
      { label: "Dịch vụ công trực tuyến", value: ">80%", description: "Tỷ lệ dịch vụ công trực tuyến thành công" },
      { label: "Xếp hạng ĐMST toàn cầu", value: "Top dẫn đầu", description: "Chỉ số đổi mới sáng tạo toàn cầu GII" }
    ],
    vision2045: [
      "Việt Nam là quốc gia phát triển, thu nhập cao; làm chủ nhiều công nghệ lõi chiến lược",
      "Trở thành trung tâm AI và công nghệ cao mang tầm quốc tế",
      "Hình thành hệ sinh thái đổi mới sáng tạo tiên tiến, kết nối toàn cầu",
      "Xã hội số phát triển toàn diện, mọi người dân được hưởng lợi từ chuyển đổi số"
    ],
    tasks: [
      { title: "Hoàn thiện thể chế & cơ chế sandbox", description: "Tạo hành lang pháp lý thông thoáng; cho phép thử nghiệm có kiểm soát với công nghệ mới; tránh hình sự hóa hoạt động KH&CN." },
      { title: "Phát triển nhân lực số & thu hút nhân tài", description: "Đào tạo kỹ sư AI, chip bán dẫn, điện toán đám mây; thu hút nhân tài người Việt toàn cầu về nước." },
      { title: "Đầu tư hạ tầng số đồng bộ", description: "Triển khai 5G toàn quốc; xây dựng trung tâm dữ liệu quốc gia; nền tảng điện toán đám mây chủ quyền; an ninh mạng." },
      { title: "Ứng dụng công nghệ vào các ngành kinh tế", description: "Số hóa nông nghiệp, y tế, tài chính, giáo dục, giao thông vận tải; thúc đẩy hợp tác công–tư trong R&D." },
      { title: "Phát triển hệ sinh thái ĐMST", description: "Xây dựng trung tâm ĐMST quốc gia; vườn ươm startup; kết nối doanh nghiệp – trường đại học – viện nghiên cứu." }
    ],
    heroImage: "./images/resolutions/57/hero_ai.png",
    inlineImages: [
      { src: "./images/resolutions/57/2.png", caption: "Việt Nam hướng tới vị trí Top 3 Đông Nam Á về nghiên cứu & phát triển trí tuệ nhân tạo", after: "coreIdeas" },
      { src: "./images/resolutions/57/ai_science_tech.png", caption: "Tầm nhìn công nghệ vươn tầm thế giới", after: "coreIdeas" },
      { src: "./images/resolutions/57/5.jpg", caption: "Ứng dụng khoa học công nghệ vào đời sống và quản lý nhà nước", after: "goals2030" },
      { src: "./images/resolutions/57/ai_digital.png", caption: "Kỷ nguyên kinh tế số bứt phá", after: "vision2045" }
    ],
    infographicBlocks: [
      { image: "./images/resolutions/57/3.png", title: "Phát triển Khoa học Công nghệ", desc: "Định hướng phát triển các ngành công nghệ lõi mang tính đột phá." },
      { image: "./images/resolutions/57/4.png", title: "Chuyển đổi số Quốc gia", desc: "Đưa kinh tế số trở thành động lực tăng trưởng mới, chiếm tối thiểu 30% GDP." }
    ]
  },
  {
    id: "59",
    number: "59-NQ/TW",
    title: "Hội nhập quốc tế trong tình hình mới",
    shortTitle: "Hội nhập quốc tế",
    date: "24/01/2025",
    theme: "Xã hội",
    color: "#00695C",
    colorLight: "rgba(0, 105, 92, 0.12)",
    colorGlow: "rgba(0, 105, 92, 0.4)",
    icon: "🌐",
    keywords: ["20 FTA có hiệu lực", "Chủ động định hình", "Lợi ích quốc gia"],
    sourceUrl: "https://nhandan.vn/special/nghi-quyet-59-ve-hoi-nhap-quoc-te-trong-tinh-hinh-moi/index.html",
    sourceName: "Báo Nhân Dân",
    heroGradient: "linear-gradient(135deg, #004D40 0%, #00695C 50%, #00796B 100%)",
    status: "complete",
    tagline: "Từ 'tham gia' sang 'chủ động đóng góp, xây dựng và định hình' luật chơi quốc tế",
    summary: "Nghị quyết 59-NQ/TW đánh dấu bước chuyển tư duy lịch sử: từ 'tham gia hội nhập' sang 'chủ động đóng góp, xây dựng và định hình' các quy tắc và luật chơi quốc tế. Việt Nam đã tham gia 20 FTA, kết nối với hơn 60 nền kinh tế, sẵn sàng đóng vai trò nòng cốt, dẫn dắt, hòa giải trong các vấn đề khu vực.",
    coreIdeas: [
      "Bước ngoặt tư duy: từ 'tham gia' sang 'chủ động đóng góp, định hình' luật chơi quốc tế",
      "Lấy lợi ích quốc gia – dân tộc là mục tiêu tối thượng; đa phương hóa, đa dạng hóa quan hệ",
      "Việt Nam đảm nhận vai trò 'nòng cốt, dẫn dắt, hòa giải' trong các vấn đề khu vực và toàn cầu",
      "Hội nhập KH&CN được tách thành nhóm giải pháp độc lập lần đầu tiên – phản ánh tầm quan trọng mới",
      "Hội nhập là sự nghiệp của toàn dân, lấy người dân, doanh nghiệp, địa phương làm trung tâm"
    ],
    goals2030: [
      { label: "FTA có hiệu lực", value: "20+ FTA", description: "Việt Nam đã tham gia 20 FTA, kết nối 60+ nền kinh tế thế giới" },
      { label: "Tăng trưởng xuất khẩu", value: "Bền vững", description: "Tăng trưởng xuất khẩu đồng đều, đa dạng hóa thị trường, giảm phụ thuộc" },
      { label: "Vai trò quốc tế", value: "Nòng cốt", description: "Đảm nhận vai trò dẫn dắt trong ASEAN, LHQ và các tổ chức đa phương" },
      { label: "Môi trường hòa bình", value: "Vững chắc", description: "Bảo vệ vững chắc chủ quyền, toàn vẹn lãnh thổ qua con đường ngoại giao" }
    ],
    vision2045: [
      "Đến giữa thế kỷ XXI: Việt Nam là nước phát triển, thu nhập cao theo định hướng XHCN",
      "Có uy tín và vị thế quốc tế xứng tầm; được bạn bè đối tác tin cậy, tôn trọng",
      "Đóng góp tích cực và có trách nhiệm vào hòa bình, ổn định, phát triển trong khu vực và thế giới"
    ],
    tasks: [
      { title: "Hội nhập kinh tế quốc tế chiều sâu", description: "Triển khai hiệu quả 20 FTA; tham gia chuỗi giá trị toàn cầu; chuyển đổi số, kinh tế xanh, kinh tế tuần hoàn gắn với chuẩn mực quốc tế." },
      { title: "Hội nhập KH&CN – nhóm giải pháp độc lập", description: "Lần đầu tiên hội nhập KH&CN được tách riêng, thể hiện tầm quan trọng trong kỷ nguyên số." },
      { title: "Ngoại giao đa phương chủ động", description: "Nâng cao vai trò trong ASEAN, LHQ, WTO; đảm nhận thêm trách nhiệm trong quản trị toàn cầu; hòa giải tranh chấp khu vực." },
      { title: "Bảo vệ lợi ích quốc gia trong hội nhập", description: "Xây dựng hàng rào kỹ thuật phù hợp; bảo vệ thị trường nội địa; chống bán phá giá, gian lận thương mại trong chuỗi FTA." }
    ],
    quoteBlocks: [
      { quote: "Từ 'tham gia' hội nhập, Việt Nam đã chuyển sang 'chủ động đóng góp, xây dựng và định hình' các quy tắc, luật chơi chung trong các thể chế đa phương.", speaker: "Thông điệp cốt lõi", context: "Nghị quyết 59-NQ/TW" }
    ],
        heroImage: "./images/resolutions/59/hero_ai.png",
    inlineImages: [
      { src: "./images/resolutions/59/2.jpg", caption: "Chủ động định hình luật chơi quốc tế trong các khuôn khổ đa phương", after: "coreIdeas" },
      { src: "./images/resolutions/59/ai_diplomacy.png", caption: "Việt Nam trên trường quốc tế, sẵn sàng hội nhập sâu rộng", after: "goals2030" },
      { src: "./images/resolutions/59/3.png", caption: "Hội nhập kinh tế và ngoại giao toàn diện", after: "tasks" }
    ],
    infographicBlocks: [
      { image: "./images/resolutions/59/1.png", title: "Từ tham gia đến định hình", desc: "Việt Nam đảm nhận vai trò 'nòng cốt, dẫn dắt, hòa giải' trong các vấn đề khu vực và toàn cầu, lấy lợi ích quốc gia – dân tộc làm mục tiêu tối thượng." }
    ],
    gallery: [
      { src: "./images/resolutions/59/ai_diplomacy.png", caption: "Hình ảnh biểu tượng do AI tạo ra" },
      { src: "./images/resolutions/59/real_1.jpg", caption: "Hội nhập quốc tế toàn diện trong tình hình mới" },
      { src: "./images/resolutions/59/real_2.jpg", caption: "Chủ động đóng góp, xây dựng và định hình luật chơi quốc tế" },
      { src: "./images/resolutions/59/real_3.jpg", caption: "Ngoại giao đa phương – nâng cao vai trò và vị thế Việt Nam" },
      { src: "./images/resolutions/59/real_4.jpg", caption: "20 FTA kết nối Việt Nam với hơn 60 nền kinh tế" }
    ]
  },
  {
    id: "66",
    number: "66-NQ/TW",
    title: "Đổi mới công tác xây dựng và thi hành pháp luật đáp ứng yêu cầu phát triển đất nước trong kỷ nguyên mới",
    shortTitle: "Đổi mới xây dựng & thi hành pháp luật",
    date: "30/04/2025",
    theme: "Xã hội",
    color: "#4527A0",
    colorLight: "rgba(69, 39, 160, 0.12)",
    colorGlow: "rgba(69, 39, 160, 0.4)",
    icon: "⚖️",
    keywords: ["Kiến tạo phát triển", "Đột phá của đột phá", "Pháp quyền XHCN"],
    sourceUrl: "https://nhandan.vn/special/nghi-quyet-66-doi-moi-cong-tac-xay-dung-va-thi-hanh-phap-luat-dap-ung-yeu-cau-phat-trien-dat-nuoc-trong-ky-nguyen-moi/index.html",
    sourceName: "Báo Nhân Dân",
    heroGradient: "linear-gradient(135deg, #311B92 0%, #4527A0 50%, #512DA8 100%)",
    status: "complete",
    tagline: "Đổi mới tư duy: từ pháp luật 'quản lý' sang pháp luật 'kiến tạo phát triển'",
    summary: "Nghị quyết 66-NQ/TW được mệnh danh là 'đột phá của đột phá' – yêu cầu đổi mới căn bản tư duy xây dựng pháp luật: từ quản lý sang kiến tạo phát triển; xây dựng hệ thống pháp luật dân chủ, đồng bộ, minh bạch, khả thi; tháo gỡ 'điểm nghẽn', khơi thông mọi nguồn lực. Lấy người dân và doanh nghiệp làm trung tâm.",
    coreIdeas: [
      "'Đột phá của đột phá' – Pháp luật phải dẫn dắt và tạo động lực cho đổi mới sáng tạo",
      "Chuyển tư duy từ 'quản lý' sang 'kiến tạo phát triển' – Nhà nước phục vụ, không cai trị",
      "Luật chỉ quy định khung nguyên tắc; giao Chính phủ/địa phương linh hoạt quy định chi tiết",
      "Phân cấp, phân quyền tối đa: 'địa phương quyết, địa phương làm, địa phương chịu trách nhiệm'",
      "Áp dụng cơ chế sandbox, chấp nhận thử nghiệm có kiểm soát với mô hình kinh doanh mới"
    ],
    goals2030: [
      { label: "2025", value: "Tháo 'điểm nghẽn'", description: "Cơ bản hoàn thành tháo gỡ các vướng mắc, điểm nghẽn do quy định pháp luật gây ra" },
      { label: "2027", value: "Bộ máy 3 cấp", description: "Hoàn thành sửa đổi pháp luật cho bộ máy Nhà nước theo mô hình chính quyền 3 cấp" },
      { label: "2028", value: "Top 3 ASEAN", description: "Môi trường đầu tư kinh doanh vào nhóm 3 nước dẫn đầu ASEAN" },
      { label: "2030", value: "Pháp luật hiện đại", description: "Có hệ thống pháp luật đồng bộ, minh bạch, ngang tầm khu vực" }
    ],
    vision2045: [
      "Hệ thống pháp luật Việt Nam chất lượng cao, tiệm cận chuẩn mực quốc tế tốt nhất",
      "Nhà nước pháp quyền XHCN thực sự của nhân dân, do nhân dân, vì nhân dân",
      "Việt Nam là nước phát triển, thu nhập cao – kỷ luật kỷ cương pháp luật nghiêm minh"
    ],
    tasks: [
      { title: "Đổi mới tư duy xây dựng pháp luật", description: "Chuyển từ quản lý sang kiến tạo; lấy người dân – doanh nghiệp làm trung tâm; tăng cường phản biện xã hội và tham vấn cộng đồng." },
      { title: "Đẩy mạnh phân cấp, phân quyền tối đa", description: "'Địa phương quyết, địa phương làm, địa phương chịu trách nhiệm' – giảm tình trạng cơ chế xin cho, chờ chỉ đạo từ trên." },
      { title: "Áp dụng cơ chế sandbox", description: "Cho phép thử nghiệm có kiểm soát với mô hình kinh doanh mới, công nghệ mới; hoàn thiện khung pháp lý cho AI, tiền ảo, fintech." },
      { title: "Rà soát, cắt giảm quy định chồng chéo", description: "Loại bỏ các quy định mâu thuẫn, không rõ ràng; số hóa toàn bộ văn bản pháp luật; nâng cao chất lượng đội ngũ soạn thảo." },
      { title: "Đổi mới cơ chế thi hành pháp luật", description: "Tăng cường kỷ luật, kỷ cương trong thi hành; xử lý nghiêm vi phạm; ứng dụng AI trong soạn thảo và phân tích pháp luật." }
    ],
    quoteBlocks: [
      { quote: "Hoàn thiện thể chế là 'đột phá của đột phá'. Pháp luật phải kiến tạo phát triển, không phải rào cản; lấy người dân và doanh nghiệp làm trung tâm.", speaker: "Tổng Bí thư", context: "Phát biểu chỉ đạo về Nghị quyết 66" }
    ],
        heroImage: "./images/resolutions/66/hero_2k.jpg",
    inlineImages: [
      { src: "./images/resolutions/66/ai_law.png", caption: "Chuyển đổi tư duy lập pháp, xây dựng hệ thống pháp luật kiến tạo phát triển", after: "coreIdeas" },
      { src: "./images/resolutions/66/2.jpg", caption: "Đẩy mạnh phân cấp, phân quyền tối đa cho chính quyền địa phương", after: "goals2030" }
    ],
    infographicBlocks: [
      { image: "./images/resolutions/66/3.jpg", title: "Tháo gỡ điểm nghẽn", desc: "Loại bỏ các quy định mâu thuẫn, chồng chéo, hoàn thiện khung pháp lý đồng bộ." },
      { image: "./images/resolutions/66/4.jpg", title: "Đột phá của đột phá", desc: "Hệ thống pháp luật chất lượng cao, tiệm cận chuẩn mực quốc tế." }
    ],
    gallery: [
      { src: "./images/resolutions/66/ai_law.png", caption: "Hình ảnh biểu tượng do AI tạo ra" },
      { src: "./images/resolutions/66/real_1.jpg", caption: "Đổi mới tư duy xây dựng pháp luật kiến tạo phát triển" },
      { src: "./images/resolutions/66/real_2.jpg", caption: "Phân cấp, phân quyền tối đa cho chính quyền địa phương" },
      { src: "./images/resolutions/66/real_3.jpg", caption: "Quốc hội – nơi kiến tạo hành lang pháp lý cho kỷ nguyên mới" },
      { src: "./images/resolutions/66/real_4.jpg", caption: "Cơ chế sandbox cho công nghệ và mô hình kinh doanh mới" }
    ]
  },
  {
    id: "68",
    number: "68-NQ/TW",
    title: "Phát triển kinh tế tư nhân",
    shortTitle: "Phát triển kinh tế tư nhân",
    date: "04/05/2025",
    theme: "Kinh tế",
    color: "#E65100",
    colorLight: "rgba(230, 81, 0, 0.12)",
    colorGlow: "rgba(230, 81, 0, 0.4)",
    icon: "🏢",
    keywords: ["2 triệu doanh nghiệp", "55–58% GDP", "Lực lượng tiên phong"],
    sourceUrl: "https://nhandan.vn/special/nghi-quyet-68-phat-trien-kinh-te-tu-nhan/index.html",
    sourceName: "Báo Nhân Dân",
    heroGradient: "linear-gradient(135deg, #BF360C 0%, #E65100 50%, #F4511E 100%)",
    status: "complete",
    tagline: "Kinh tế tư nhân là 'động lực quan trọng nhất' và 'lực lượng tiên phong' của nền kinh tế",
    summary: "Nghị quyết 68-NQ/TW là bước ngoặt lịch sử: kinh tế tư nhân chính thức được xác định là 'động lực quan trọng nhất' (không chỉ là 'bộ phận quan trọng'). Mục tiêu đến 2030: 2 triệu doanh nghiệp, đóng góp 55–58% GDP, 35–40% thu ngân sách, giải quyết 84–85% việc làm. Chuyển từ tiền kiểm sang hậu kiểm, cắt giảm 30% thủ tục hành chính.",
    coreIdeas: [
      "Bước ngoặt lịch sử: từ 'bộ phận quan trọng' lên 'động lực quan trọng nhất' và 'lực lượng tiên phong'",
      "Bảo đảm tiếp cận bình đẳng vốn, đất đai, KH&CN, dữ liệu cho doanh nghiệp tư nhân",
      "Chuyển từ 'tiền kiểm' sang 'hậu kiểm' – Nhà nước quản lý bằng kết quả, không bằng thủ tục",
      "Cắt giảm ít nhất 30% thời gian xử lý TTHC, 30% chi phí tuân thủ, 30% điều kiện kinh doanh",
      "Xóa bỏ hình thức thuế khoán hộ kinh doanh chậm nhất năm 2026; hoàn thiện pháp lý tiền ảo, AI"
    ],
    goals2030: [
      { label: "Số doanh nghiệp", value: "2 triệu DN", description: "Tương đương 20 doanh nghiệp/nghìn dân" },
      { label: "Đóng góp GDP", value: "55–58%", description: "Tỷ trọng của kinh tế tư nhân trong GDP quốc gia" },
      { label: "Thu ngân sách", value: "35–40%", description: "Đóng góp của khu vực tư nhân vào tổng thu NSNN" },
      { label: "Giải quyết việc làm", value: "84–85%", description: "Tỷ lệ lao động được kinh tế tư nhân thu hút" },
      { label: "Tốc độ tăng trưởng", value: "10–12%/năm", description: "Tốc độ tăng trưởng KTTN cao hơn tốc độ chung" },
      { label: "DN lớn toàn cầu", value: "≥20 DN", description: "Doanh nghiệp tư nhân lớn tham gia chuỗi giá trị toàn cầu" }
    ],
    vision2045: [
      "Kinh tế tư nhân Việt Nam phát triển nhanh, mạnh, bền vững – chủ động tham gia chuỗi giá trị toàn cầu",
      "Xuất hiện các tập đoàn tư nhân đa quốc gia mang thương hiệu Việt Nam",
      "Công nghệ & ĐMST thuộc nhóm 3 nước đứng đầu ASEAN, nhóm 5 nước đứng đầu châu Á"
    ],
    tasks: [
      { title: "Cải thiện triệt để môi trường kinh doanh", description: "Cắt giảm 30% thủ tục hành chính, 30% chi phí tuân thủ, 30% điều kiện kinh doanh; xóa bỏ thủ tục chồng chéo, không cần thiết." },
      { title: "Hỗ trợ doanh nghiệp tư nhân tiếp cận vốn", description: "Ưu đãi thuế, giảm lãi suất; phát triển thị trường vốn, trái phiếu doanh nghiệp; hỗ trợ startup công nghệ tiếp cận quỹ đầu tư mạo hiểm." },
      { title: "Phát triển tập đoàn tư nhân lớn", description: "Hỗ trợ M&A, IPO quốc tế; tham gia dự án PPP quy mô lớn; đưa ít nhất 20 doanh nghiệp vào chuỗi giá trị toàn cầu." },
      { title: "Bảo vệ quyền tài sản và quyền kinh doanh", description: "Không hình sự hóa quan hệ kinh tế dân sự; xử lý nghiêm nhũng nhiễu doanh nghiệp; bảo vệ tài sản hợp pháp theo pháp luật." },
      { title: "Chuyển đổi số và nâng cao năng suất", description: "Hỗ trợ doanh nghiệp tư nhân chuyển đổi số; nâng cao năng suất lao động bình quân 8,5–9,5%/năm." }
    ],
    quoteBlocks: [
      { quote: "Kinh tế tư nhân không chỉ là 'bộ phận quan trọng' mà phải là 'động lực quan trọng nhất', là 'lực lượng tiên phong' trong phát triển kinh tế đất nước.", speaker: "Thông điệp cốt lõi", context: "Nghị quyết 68-NQ/TW – Bước ngoặt lịch sử" }
    ],
        heroImage: "./images/resolutions/68/hero_2k.jpg",
    inlineImages: [
      { src: "./images/resolutions/68/ai_startup.png", caption: "Tinh thần khởi nghiệp đổi mới sáng tạo vươn tầm toàn cầu", after: "coreIdeas" },
      { src: "./images/resolutions/68/2.png", caption: "Kinh tế tư nhân tạo ra hàng triệu việc làm và đóng góp lớn vào GDP", after: "goals2030" },
      { src: "./images/resolutions/68/3.jpg", caption: "Hỗ trợ doanh nghiệp tư nhân tiếp cận vốn và mở rộng kinh doanh", after: "vision2045" },
      { src: "./images/resolutions/68/4.jpg", caption: "Cải thiện môi trường kinh doanh, bảo vệ quyền tài sản", after: "tasks" }
    ],
    infographicBlocks: [
      { image: "./images/resolutions/68/ai_economy.png", title: "Hệ sinh thái tỷ đô", desc: "Xây dựng môi trường kinh doanh thuận lợi, xuất hiện các tập đoàn tư nhân đa quốc gia." },
      { image: "./images/resolutions/68/5.jpg", title: "Cải cách thủ tục hành chính", desc: "Chuyển từ tiền kiểm sang hậu kiểm, cắt giảm ít nhất 30% thời gian xử lý." }
    ],
    gallery: [
      { src: "./images/resolutions/68/ai_economy.png", caption: "Hình ảnh biểu tượng do AI tạo ra" },
      { src: "./images/resolutions/68/real_1.jpg", caption: "Kinh tế tư nhân – động lực quan trọng nhất của nền kinh tế" },
      { src: "./images/resolutions/68/real_2.jpg", caption: "Khởi nghiệp đổi mới sáng tạo vươn tầm quốc tế" },
      { src: "./images/resolutions/68/real_3.jpg", caption: "Mục tiêu 2 triệu doanh nghiệp tư nhân vào năm 2030" },
      { src: "./images/resolutions/68/real_4.jpg", caption: "Chuyển từ tiền kiểm sang hậu kiểm – cải cách thủ tục hành chính" }
    ]
  },
  {
    id: "70",
    number: "70-NQ/TW",
    title: "Bảo đảm an ninh năng lượng quốc gia đến năm 2030, tầm nhìn đến năm 2045",
    shortTitle: "An ninh năng lượng quốc gia",
    date: "2025",
    theme: "Kinh tế",
    color: "#F57F17",
    colorLight: "rgba(245, 127, 23, 0.12)",
    colorGlow: "rgba(245, 127, 23, 0.4)",
    icon: "⚡",
    keywords: ["Năng lượng tái tạo", "Net Zero 2050", "An ninh năng lượng"],
    sourceUrl: "https://nhandan.vn/special/nghi-quyet-70-ve-bao-dam-an-ninh-nang-luong-quoc-gia/index.html",
    sourceName: "Báo Nhân Dân",
    heroGradient: "linear-gradient(135deg, #E65100 0%, #F57F17 50%, #FDD835 100%)",
    status: "complete",
    tagline: "An ninh năng lượng là nền tảng không thể thiếu cho phát triển kinh tế – xã hội bền vững",
    summary: "Nghị quyết 70-NQ/TW định hướng bảo đảm vững chắc an ninh năng lượng quốc gia, phát triển đồng bộ các nguồn năng lượng, đẩy mạnh năng lượng tái tạo, giảm phụ thuộc vào than nhập khẩu, cam kết Net Zero 2050 và đóng góp vào mục tiêu khí hậu toàn cầu.",
    coreIdeas: [
      "An ninh năng lượng là trụ cột của an ninh kinh tế quốc gia – không có năng lượng không có phát triển",
      "Phát triển mạnh năng lượng tái tạo: điện gió ngoài khơi, điện mặt trời, thủy điện tích năng",
      "Đa dạng hóa nguồn cung; giảm phụ thuộc vào than nhập khẩu; phát triển điện khí LNG",
      "Xây dựng hạ tầng điện thông minh, kết nối khu vực ASEAN",
      "Cam kết Net Zero 2050 – đóng góp tích cực vào mục tiêu khí hậu toàn cầu (COP28)"
    ],
    goals2030: [
      { label: "Năng lượng tái tạo", value: "≥30%", description: "Tỷ trọng năng lượng tái tạo trong cơ cấu điện năng quốc gia" },
      { label: "Điện khí hóa nông thôn", value: "100%", description: "Tỷ lệ hộ gia đình có điện lưới quốc gia" },
      { label: "Điện gió ngoài khơi", value: "6.000 MW", description: "Công suất điện gió ngoài khơi đưa vào vận hành" }
    ],
    vision2045: [
      "Việt Nam có hệ thống năng lượng hiện đại, bền vững, đủ đáp ứng nhu cầu phát triển đất nước",
      "Chủ động về nguồn cung năng lượng; Net Zero 2050 đạt được đúng cam kết",
      "Xuất khẩu năng lượng tái tạo, trở thành trung tâm năng lượng xanh khu vực"
    ],
    tasks: [
      { title: "Phát triển năng lượng tái tạo quy mô lớn", description: "Đẩy mạnh điện gió ngoài khơi, điện mặt trời áp mái, thủy điện tích năng; xây dựng lưới điện thông minh tích hợp tái tạo." },
      { title: "Đảm bảo an ninh cung cấp năng lượng", description: "Duy trì dự trữ năng lượng chiến lược; đa dạng hóa nguồn cung; phát triển điện khí LNG; kết nối điện khu vực." },
      { title: "Tiết kiệm và sử dụng năng lượng hiệu quả", description: "Triển khai chương trình tiết kiệm năng lượng quốc gia; áp dụng công nghệ xanh trong công nghiệp nặng." }
    ],
    quoteBlocks: [
      { quote: "Không có năng lượng thì không có phát triển. An ninh năng lượng là trụ cột không thể thiếu cho mọi mục tiêu kinh tế – xã hội.", speaker: "Thông điệp cốt lõi", context: "Nghị quyết 70-NQ/TW" }
    ],
        heroImage: "./images/resolutions/70/hero_2k.jpg",
    inlineImages: [
      { src: "./images/resolutions/70/ai_energy.png", caption: "Mô hình năng lượng xanh và bền vững trong tương lai", after: "coreIdeas" },
      { src: "./images/resolutions/70/2.png", caption: "Chuyển dịch cơ cấu năng lượng gắn với bảo vệ môi trường", after: "goals2030" },
      { src: "./images/resolutions/70/3.jpg", caption: "Đẩy mạnh phát triển năng lượng tái tạo, điện gió và điện mặt trời", after: "vision2045" }
    ],
    infographicBlocks: [
      { image: "./images/resolutions/70/4.jpg", title: "Đầu tư hạ tầng năng lượng", desc: "Thu hút mọi nguồn lực xã hội vào đầu tư phát triển kết cấu hạ tầng năng lượng đồng bộ." },
      { image: "./images/resolutions/70/5.jpg", title: "Tiết kiệm, hiệu quả", desc: "Thúc đẩy sử dụng năng lượng tiết kiệm, hiệu quả như một quốc sách." }
    ],
    gallery: [
      { src: "./images/resolutions/70/ai_energy.png", caption: "Hình ảnh biểu tượng do AI tạo ra" },
      { src: "./images/resolutions/70/real_1.jpg", caption: "Đa dạng hóa nguồn năng lượng quốc gia" },
      { src: "./images/resolutions/70/real_2.jpg", caption: "Phát triển năng lượng tái tạo – điện gió, điện mặt trời" },
      { src: "./images/resolutions/70/real_3.jpg", caption: "Hạ tầng năng lượng đồng bộ và hiện đại" },
      { src: "./images/resolutions/70/real_4.jpg", caption: "Cam kết Net Zero 2050 – năng lượng xanh cho tương lai" }
    ]
  },
  {
    id: "71",
    number: "71-NQ/TW",
    title: "Đột phá phát triển giáo dục và đào tạo",
    shortTitle: "Đột phá Giáo dục & Đào tạo",
    date: "2025",
    theme: "Giáo dục",
    color: "#00897B",
    colorLight: "rgba(0, 137, 123, 0.12)",
    colorGlow: "rgba(0, 137, 123, 0.4)",
    icon: "📚",
    keywords: ["Đại học xuất sắc", "Nhân lực số", "Giáo dục hiện đại"],
    sourceUrl: "https://nhandan.vn/special/nghi-quyet-71-dot-pha-phat-trien-giao-duc-va-dao-tao/index.html",
    sourceName: "Báo Nhân Dân",
    heroGradient: "linear-gradient(135deg, #004D40 0%, #00897B 50%, #26A69A 100%)",
    status: "complete",
    tagline: "Đột phá giáo dục là đột phá nền tảng – tạo nhân lực cho mọi đột phá khác",
    summary: "Nghị quyết 71-NQ/TW xác định đột phá trong giáo dục và đào tạo là đột phá nền tảng, tạo ra con người, nhân lực và trí tuệ cho mọi đột phá khác. Mục tiêu là xây dựng nền giáo dục hiện đại, nhân văn, chất lượng cao, đào tạo con người Việt Nam phát triển toàn diện trong kỷ nguyên số.",
    coreIdeas: [
      "Giáo dục là quốc sách hàng đầu – đột phá giáo dục là đột phá nền tảng cho mọi đột phá khác",
      "Đổi mới căn bản: từ truyền thụ kiến thức sang phát triển năng lực tư duy, sáng tạo, phản biện",
      "Xây dựng con người Việt Nam toàn diện: trí tuệ, đạo đức, thể chất, kỹ năng thế kỷ 21",
      "Xây dựng các đại học nghiên cứu xuất sắc, trung tâm đào tạo nhân lực chất lượng cao",
      "Tự chủ đại học gắn liền trách nhiệm giải trình và kiểm định chất lượng quốc tế"
    ],
    goals2030: [
      { label: "Đại học top thế giới", value: "5–7 trường", description: "Số đại học Việt Nam vào top 500 thế giới hoặc top 5 ASEAN" },
      { label: "Chi cho giáo dục", value: "≥5% GNI", description: "Tỷ lệ đầu tư công cho giáo dục đào tạo" },
      { label: "Tỷ lệ lao động qua đào tạo", value: "75%", description: "Tỷ lệ lực lượng lao động được đào tạo nghề và đại học" }
    ],
    vision2045: [
      "Nền giáo dục Việt Nam đạt trình độ tiên tiến trong khu vực, hội nhập quốc tế sâu rộng",
      "Nguồn nhân lực chất lượng cao đủ sức dẫn dắt nền kinh tế tri thức",
      "Xã hội học tập suốt đời phát triển rộng khắp – mọi người học mọi lúc, mọi nơi"
    ],
    tasks: [
      { title: "Đổi mới chương trình và phương pháp giáo dục", description: "Tích hợp STEM, kỹ năng số, tư duy phản biện, sáng tạo; giảm tải kiến thức hàn lâm, tăng thực hành và dự án." },
      { title: "Nâng cao chất lượng đội ngũ nhà giáo", description: "Đào tạo, bồi dưỡng giáo viên đáp ứng giáo dục hiện đại; cải thiện thu nhập và vị thế xã hội nhà giáo." },
      { title: "Xây dựng đại học nghiên cứu xuất sắc", description: "Đầu tư trọng điểm cho một số đại học đạt đẳng cấp quốc tế; phát triển các trung tâm nghiên cứu xuất sắc." }
    ],
    quoteBlocks: [
      { quote: "Đột phá giáo dục là đột phá nền tảng – tạo ra con người, nhân lực và trí tuệ cho mọi đột phá khác của đất nước trong kỷ nguyên mới.", speaker: "Thông điệp cốt lõi", context: "Nghị quyết 71-NQ/TW" }
    ],
        heroImage: "./images/resolutions/71/hero_2k.jpg",
    inlineImages: [
      { src: "./images/resolutions/71/ai_education.png", caption: "Môi trường giáo dục hiện đại, cá nhân hóa và bồi dưỡng nhân tài", after: "coreIdeas" },
      { src: "./images/resolutions/71/2.png", caption: "Nâng cao chất lượng nguồn nhân lực đáp ứng nhu cầu hội nhập", after: "goals2030" },
      { src: "./images/resolutions/71/3.jpg", caption: "Đầu tư cơ sở vật chất, công nghệ giảng dạy số", after: "tasks" }
    ],
    infographicBlocks: [
      { image: "./images/resolutions/71/4.jpg", title: "Thực học, thực tài", desc: "Chuyển mạnh từ truyền thụ kiến thức sang phát triển toàn diện năng lực và phẩm chất." },
      { image: "./images/resolutions/71/5.jpg", title: "Xã hội hóa giáo dục", desc: "Tạo bình đẳng giữa công và tư, thu hút nguồn lực xã hội đầu tư cho giáo dục chất lượng cao." }
    ],
    gallery: [
      { src: "./images/resolutions/71/ai_education.png", caption: "Hình ảnh biểu tượng do AI tạo ra" },
      { src: "./images/resolutions/71/real_1.jpg", caption: "Đột phá giáo dục là đột phá nền tảng" },
      { src: "./images/resolutions/71/real_2.jpg", caption: "Phát triển năng lực tư duy, sáng tạo cho học sinh" },
      { src: "./images/resolutions/71/real_3.jpg", caption: "Xây dựng đại học nghiên cứu xuất sắc tầm quốc tế" },
      { src: "./images/resolutions/71/real_4.jpg", caption: "Nâng cao chất lượng đội ngũ nhà giáo" }
    ]
  },
  {
    id: "72",
    number: "72-NQ/TW",
    title: "Một số giải pháp đột phá, tăng cường bảo vệ, chăm sóc và nâng cao sức khỏe nhân dân",
    shortTitle: "Sức khỏe nhân dân – Y tế đột phá",
    date: "2025",
    theme: "Y tế",
    color: "#C62828",
    colorLight: "rgba(198, 40, 40, 0.12)",
    colorGlow: "rgba(198, 40, 40, 0.4)",
    icon: "🏥",
    keywords: ["BHYT toàn dân", "Y tế kỹ thuật cao", "Tuổi thọ ≥75"],
    sourceUrl: "https://nhandan.vn/special/nghi-quyet-72-giai-phap-dot-pha-tang-cuong-bao-ve-cham-soc-va-nang-cao-suc-khoe-nguoi-dan/index.html",
    sourceName: "Báo Nhân Dân",
    heroGradient: "linear-gradient(135deg, #B71C1C 0%, #C62828 50%, #D32F2F 100%)",
    status: "complete",
    tagline: "Sức khỏe nhân dân là vốn quý nhất, là nền tảng sức mạnh và hạnh phúc quốc gia",
    summary: "Nghị quyết 72-NQ/TW xác định sức khỏe nhân dân là quyền cơ bản, là vốn quý nhất, là nền tảng hạnh phúc và sức mạnh quốc gia. Tập trung vào y tế dự phòng, chăm sóc sức khỏe ban đầu, phát triển y tế kỹ thuật cao, bảo hiểm y tế toàn dân và chuyển đổi số ngành y tế.",
    coreIdeas: [
      "Sức khỏe nhân dân là vốn quý nhất – đầu tư cho sức khỏe là đầu tư cho phát triển",
      "Ưu tiên y tế dự phòng: phòng bệnh hơn chữa bệnh, chăm sóc sức khỏe ban đầu toàn dân",
      "Phát triển y tế kỹ thuật cao, y học cổ truyền kết hợp y học hiện đại",
      "Bảo hiểm y tế toàn dân: không ai bị bỏ lại phía sau vì thiếu tiền chữa bệnh",
      "Số hóa y tế: hồ sơ sức khỏe điện tử toàn dân, AI trong chẩn đoán, telemedicine"
    ],
    goals2030: [
      { label: "Tuổi thọ trung bình", value: "≥75 tuổi", description: "Tuổi thọ bình quân của người Việt Nam đạt ít nhất 75 tuổi" },
      { label: "Bao phủ BHYT", value: "≥95%", description: "Tỷ lệ dân số được bảo hiểm y tế" },
      { label: "Bác sĩ/10.000 dân", value: "15 bác sĩ", description: "Số bác sĩ trên 10.000 dân số" }
    ],
    vision2045: [
      "Hệ thống y tế Việt Nam đạt trình độ tiên tiến khu vực Đông Nam Á",
      "Người dân được chăm sóc sức khỏe toàn diện, chất lượng cao, công bằng, không phân biệt",
      "Ngành y tế Việt Nam có thương hiệu quốc tế; là điểm đến y tế của khu vực"
    ],
    tasks: [
      { title: "Tăng cường y tế dự phòng và sức khỏe cơ sở", description: "Củng cố mạng lưới y tế xã, phường; nâng cao chất lượng chăm sóc sức khỏe ban đầu; phổ cập vaccine, phòng chống bệnh không lây nhiễm." },
      { title: "Phát triển y tế kỹ thuật cao", description: "Đầu tư bệnh viện chuyên sâu, kỹ thuật cao ngang tầm khu vực; thu hút nhân tài y tế; phát triển ghép tạng, ung bướu, tim mạch." },
      { title: "Số hóa và thông minh hóa hệ thống y tế", description: "Hồ sơ sức khỏe điện tử toàn dân; ứng dụng AI trong chẩn đoán; telemedicine cho vùng sâu vùng xa." }
    ],
    quoteBlocks: [
      { quote: "Sức khỏe nhân dân là vốn quý nhất, là nền tảng của hạnh phúc và sức mạnh quốc gia. Đầu tư cho sức khỏe là đầu tư cho phát triển.", speaker: "Thông điệp cốt lõi", context: "Nghị quyết 72-NQ/TW" }
    ],
        heroImage: "./images/resolutions/72/hero_2k.jpg",
    inlineImages: [
      { src: "./images/resolutions/72/ai_healthcare.png", caption: "Hệ thống y tế thông minh, dự phòng và điều trị công nghệ cao", after: "coreIdeas" },
      { src: "./images/resolutions/72/2.png", caption: "Bảo hiểm y tế toàn dân và chăm sóc sức khỏe ban đầu", after: "goals2030" },
      { src: "./images/resolutions/72/3.jpg", caption: "Nâng cao năng lực cho hệ thống y tế cơ sở và y tế dự phòng", after: "tasks" }
    ],
    infographicBlocks: [
      { image: "./images/resolutions/72/4.jpg", title: "Phòng bệnh hơn chữa bệnh", desc: "Chuyển trọng tâm từ điều trị sang dự phòng và nâng cao sức khỏe người dân." },
      { image: "./images/resolutions/72/5.jpg", title: "Đãi ngộ y bác sĩ", desc: "Cơ chế chính sách đặc thù bảo vệ, tôn vinh và đãi ngộ xứng đáng nhân viên y tế." }
    ],
    gallery: [
      { src: "./images/resolutions/72/ai_healthcare.png", caption: "Hình ảnh biểu tượng do AI tạo ra" },
      { src: "./images/resolutions/72/real_1.jpg", caption: "Sức khỏe nhân dân là vốn quý nhất" },
      { src: "./images/resolutions/72/real_2.jpg", caption: "Y tế kỹ thuật cao – nâng tầm chất lượng điều trị" },
      { src: "./images/resolutions/72/real_3.jpg", caption: "Bảo hiểm y tế toàn dân – không ai bị bỏ lại phía sau" },
      { src: "./images/resolutions/72/real_4.jpg", caption: "Chuyển đổi số trong chăm sóc sức khỏe" }
    ]
  },
  {
    id: "79",
    number: "79-NQ/TW",
    title: "Phát triển kinh tế nhà nước",
    shortTitle: "Phát triển kinh tế nhà nước",
    date: "2025",
    theme: "Kinh tế",
    color: "#2E7D32",
    colorLight: "rgba(46, 125, 50, 0.12)",
    colorGlow: "rgba(46, 125, 50, 0.4)",
    icon: "🏛️",
    keywords: ["Vai trò chủ đạo", "DNNN hiệu quả", "Minh bạch tài sản"],
    sourceUrl: "https://nhandan.vn/special/nghi-quyet-79-phat-trien-kinh-te-nha-nuoc/index.html",
    sourceName: "Báo Nhân Dân",
    heroGradient: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #388E3C 100%)",
    status: "complete",
    tagline: "Kinh tế nhà nước giữ vai trò chủ đạo, là công cụ điều tiết và ổn định kinh tế vĩ mô",
    summary: "Nghị quyết 79-NQ/TW định hướng phát triển kinh tế nhà nước thực sự hiệu quả, minh bạch và giữ vai trò chủ đạo. Tập trung DNNN vào các lĩnh vực then chốt, an ninh quốc phòng, hạ tầng chiến lược. Đẩy mạnh cổ phần hóa, chống thất thoát lãng phí, quản trị theo chuẩn quốc tế.",
    coreIdeas: [
      "Kinh tế nhà nước giữ vai trò chủ đạo trong điều tiết kinh tế vĩ mô, ổn định xã hội",
      "DNNN phải hoạt động hiệu quả, cạnh tranh bình đẳng – không thể thua lỗ triền miên",
      "Tập trung vào lĩnh vực then chốt: an ninh quốc phòng, hạ tầng chiến lược, tài nguyên quốc gia",
      "Đẩy mạnh cổ phần hóa, thoái vốn nhà nước tại các DN không cần nắm giữ",
      "Chống thất thoát, lãng phí tài sản nhà nước; xử lý nghiêm sai phạm trong DNNN"
    ],
    goals2030: [
      { label: "Hiệu quả DNNN", value: "Ngang ASEAN", description: "Hiệu quả hoạt động DNNN đạt mức trung bình khu vực ASEAN" },
      { label: "Cổ phần hóa", value: "Hoàn thành", description: "Hoàn thành cổ phần hóa DNNN theo danh mục Chính phủ phê duyệt" }
    ],
    vision2045: [
      "Kinh tế nhà nước hoạt động hiệu quả, minh bạch, có năng lực cạnh tranh quốc tế",
      "Tài sản nhà nước được quản lý chặt chẽ, không thất thoát, sinh lời tốt cho ngân sách",
      "DNNN dẫn dắt trong các ngành chiến lược, an ninh quốc gia; không còn DNNN thua lỗ kéo dài"
    ],
    tasks: [
      { title: "Đổi mới quản trị DNNN theo chuẩn quốc tế", description: "Áp dụng mô hình quản trị OECD; tăng cường kiểm toán độc lập; công bố thông tin minh bạch; tách vai trò chủ sở hữu và quản lý." },
      { title: "Đẩy mạnh cổ phần hóa, thoái vốn", description: "Thực hiện đúng tiến độ cổ phần hóa; bán cổ phần nhà nước tại DN không cần nắm giữ; thu ngân sách để tái đầu tư hạ tầng." },
      { title: "Phòng, chống thất thoát tài sản nhà nước", description: "Cơ chế giám sát hiệu quả; xử lý nghiêm tham nhũng, lãng phí trong DNNN; kiểm soát đầu tư vượt ngành nghề chính." }
    ],
    quoteBlocks: [
      { quote: "Kinh tế nhà nước giữ vai trò chủ đạo, là công cụ, lực lượng vật chất quan trọng để Nhà nước điều tiết kinh tế, ổn định kinh tế vĩ mô.", speaker: "Thông điệp cốt lõi", context: "Nghị quyết 79-NQ/TW" }
    ],
        heroImage: "./images/resolutions/79/hero_2k.jpg",
    inlineImages: [
      { src: "./images/resolutions/79/ai_state_economy.png", caption: "Doanh nghiệp nhà nước dẫn dắt chuyển đổi số và công nghệ lõi", after: "coreIdeas" },
      { src: "./images/resolutions/79/2.png", caption: "Tái cơ cấu, nâng cao hiệu quả hoạt động của DNNN", after: "goals2030" },
      { src: "./images/resolutions/79/3.png", caption: "Đẩy mạnh cổ phần hóa, thoái vốn tại các lĩnh vực Nhà nước không cần nắm giữ", after: "tasks" }
    ],
    infographicBlocks: [
      { image: "./images/resolutions/79/4.jpg", title: "Mở đường và kiến tạo", desc: "DNNN tập trung vào các lĩnh vực then chốt, tạo động lực phát triển kinh tế vĩ mô." },
      { image: "./images/resolutions/79/5.jpg", title: "Lực lượng nòng cốt", desc: "Nhà nước quản lý linh hoạt theo cơ chế thị trường, nâng tầm các tập đoàn kinh tế Nhà nước." }
    ],
    gallery: [
      { src: "./images/resolutions/79/ai_state_economy.png", caption: "Hình ảnh biểu tượng do AI tạo ra" },
      { src: "./images/resolutions/79/real_1.jpg", caption: "Kinh tế nhà nước giữ vai trò chủ đạo" },
      { src: "./images/resolutions/79/real_2.jpg", caption: "Doanh nghiệp nhà nước dẫn dắt trong lĩnh vực then chốt" },
      { src: "./images/resolutions/79/real_3.jpg", caption: "Cổ phần hóa và nâng cao hiệu quả hoạt động DNNN" },
      { src: "./images/resolutions/79/real_4.jpg", caption: "Đổi mới quản trị theo chuẩn quốc tế" }
    ]
  },
  {
    id: "80",
    number: "80-NQ/TW",
    title: "Phát triển văn hóa Việt Nam",
    shortTitle: "Phát triển văn hóa Việt Nam",
    date: "2025",
    theme: "Văn hóa",
    color: "#6A1B9A",
    colorLight: "rgba(106, 27, 154, 0.12)",
    colorGlow: "rgba(106, 27, 154, 0.4)",
    icon: "🎭",
    keywords: ["Bản sắc văn hóa", "Công nghiệp văn hóa 7–8% GDP", "Con người Việt Nam"],
    sourceUrl: "https://nhandan.vn/special/nhungvandemoi_cotloi_nghiquyet80/index.html",
    sourceName: "Báo Nhân Dân",
    heroGradient: "linear-gradient(135deg, #4A148C 0%, #6A1B9A 50%, #7B1FA2 100%)",
    status: "complete",
    tagline: "Văn hóa là hồn cốt dân tộc, là sức mạnh nội sinh cho phát triển bền vững",
    summary: "Nghị quyết 80-NQ/TW xác định văn hóa là nền tảng tinh thần, là sức mạnh nội sinh của dân tộc. Mục tiêu xây dựng nền văn hóa Việt Nam tiên tiến, đậm đà bản sắc dân tộc; phát triển con người Việt Nam toàn diện; phát triển công nghiệp văn hóa thành ngành kinh tế mũi nhọn đóng góp 7–8% GDP.",
    coreIdeas: [
      "Văn hóa là nền tảng tinh thần, là sức mạnh nội sinh, đặt ngang hàng kinh tế, chính trị, xã hội",
      "Xây dựng con người Việt Nam: yêu nước, nhân ái, nghĩa tình, trung thực, đoàn kết, sáng tạo",
      "Bảo tồn và phát huy bản sắc văn hóa dân tộc trong hội nhập quốc tế; không đánh mất mình",
      "Phát triển công nghiệp văn hóa thành ngành kinh tế mũi nhọn: phim, âm nhạc, thời trang, ẩm thực",
      "Chống suy thoái đạo đức, lối sống; bảo vệ văn hóa trước tác động tiêu cực của toàn cầu hóa số"
    ],
    goals2030: [
      { label: "Công nghiệp văn hóa/GDP", value: "7–8%", description: "Đóng góp của công nghiệp văn hóa vào tổng GDP quốc gia" },
      { label: "Di sản UNESCO", value: "Tăng thêm", description: "Bổ sung thêm di sản văn hóa được UNESCO công nhận" },
      { label: "Doanh thu du lịch văn hóa", value: "Tăng 2x", description: "Doanh thu từ du lịch văn hóa tăng gấp đôi so với 2025" }
    ],
    vision2045: [
      "Nền văn hóa Việt Nam tiên tiến, đậm đà bản sắc, hội nhập quốc tế – vừa dân tộc vừa hiện đại",
      "Công nghiệp văn hóa Việt Nam có thương hiệu toàn cầu; phim Việt, nhạc Việt ra thế giới",
      "Người Việt Nam có lối sống văn minh, nhân ái, trách nhiệm với cộng đồng và đất nước"
    ],
    tasks: [
      { title: "Xây dựng con người văn hóa Việt Nam", description: "Giáo dục đạo đức, lối sống văn hóa từ gia đình – nhà trường – xã hội; phát huy tinh thần yêu nước, ý thức cộng đồng." },
      { title: "Bảo tồn và số hóa di sản văn hóa", description: "Bảo tồn di sản vật thể và phi vật thể; số hóa di sản bằng công nghệ 3D, VR/AR; phát triển du lịch văn hóa bền vững." },
      { title: "Phát triển công nghiệp văn hóa mạnh mẽ", description: "Hỗ trợ phim ảnh, âm nhạc, thời trang, ẩm thực Việt ra thế giới; xây dựng thương hiệu văn hóa quốc gia; học hỏi Hàn Quốc (Hallyu)." }
    ],
    quoteBlocks: [
      { quote: "Văn hóa là hồn cốt dân tộc. Văn hóa còn thì dân tộc còn. Phải đặt văn hóa ngang hàng với kinh tế, chính trị, xã hội.", speaker: "Tổng Bí thư", context: "Phát biểu tại Hội nghị Văn hóa toàn quốc" }
    ],
        heroImage: "./images/resolutions/80/hero_2k.jpg",
    inlineImages: [
      { src: "./images/resolutions/80/ai_culture.png", caption: "Bản sắc văn hóa Việt Nam trường tồn và lan tỏa trong không gian số", after: "coreIdeas" },
      { src: "./images/resolutions/80/2.jpg", caption: "Phát triển công nghiệp văn hóa thành ngành kinh tế mũi nhọn", after: "goals2030" }
    ],
    infographicBlocks: [
      { image: "./images/resolutions/80/3.jpg", title: "Hệ giá trị con người", desc: "Xây dựng con người Việt Nam thời kỳ đổi mới gắn với hệ giá trị quốc gia." },
      { image: "./images/resolutions/80/4.jpg", title: "Sức mạnh mềm", desc: "Bảo tồn, phát huy các di sản văn hóa, đưa văn hóa Việt vươn tầm quốc tế." }
    ],
    gallery: [
      { src: "./images/resolutions/80/ai_culture.png", caption: "Hình ảnh biểu tượng do AI tạo ra" },
      { src: "./images/resolutions/80/real_1.jpg", caption: "Văn hóa là nền tảng tinh thần của dân tộc" },
      { src: "./images/resolutions/80/real_2.jpg", caption: "Bảo tồn và phát huy bản sắc văn hóa Việt Nam" },
      { src: "./images/resolutions/80/real_3.jpg", caption: "Phát triển công nghiệp văn hóa thành ngành kinh tế mũi nhọn" },
      { src: "./images/resolutions/80/real_4.jpg", caption: "Con người Việt Nam – yêu nước, nhân ái, sáng tạo" }
    ]
  }
];

// Congress XIV Overview
const CONGRESS_XIV_DATA = {
  significance: [
    { icon: "🎯", label: "Tầm nhìn 2045", description: "Việt Nam trở thành nước phát triển có thu nhập cao theo định hướng XHCN" },
    { icon: "🚀", label: "Kỷ nguyên mới", description: "Kỷ nguyên vươn mình của dân tộc – Đất nước phồn vinh, hạnh phúc" },
    { icon: "⚙️", label: "Thể chế phát triển", description: "Hoàn thiện thể chế KTTT định hướng XHCN; Nhà nước pháp quyền hiện đại" },
    { icon: "💡", label: "Động lực tăng trưởng", description: "KH&CN, ĐMST, chuyển đổi số dẫn dắt – GDP tăng ≥8%/năm" }
  ],
  stats: [
    { number: "9", label: "Nghị quyết chiến lược" },
    { number: "2045", label: "Tầm nhìn quốc gia" },
    { number: "≥8%", label: "Mục tiêu GDP/năm" },
    { number: "5,2 tr.", label: "Đảng viên cả nước" }
  ]
};
