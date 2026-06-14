/**
 * Cơ sở dữ liệu Tri thức AI (Knowledge Base) - Semantic Engine V2
 * Tích hợp Mạng Lưới Nhận Diện Ý Định (Intent Recognition)
 * Cập nhật lần cuối: 2026-06-13
 */

const VANKIEN_DB = [
  {
    topic: "Nghị quyết 57 - Khoa học, Công nghệ và Chuyển đổi số",
    keywords: ["57", "chuyển đổi số", "công nghệ", "AI", "đột phá", "khoa học", "đổi mới sáng tạo"],
    synonyms: ["máy tính", "phần mềm", "mạng internet", "số hóa", "thông minh", "trí tuệ nhân tạo", "kỹ thuật số", "4.0", "công nghiệp 4.0", "chip", "bán dẫn", "big data", "dữ liệu"],
    source: "Tài liệu NQ 57.pdf",
    content: "Đối với Trường Đại học Cảnh sát nhân dân, Nghị quyết 57 có thể được cụ thể hóa bằng việc xây dựng môi trường đại học số trong CAND. Nhà trường cần phát triển học liệu số, bài giảng số, ngân hàng câu hỏi số, thư viện số; đồng thời ứng dụng AI trong hỗ trợ giảng viên thiết kế bài giảng, xây dựng tình huống, đổi mới kiểm tra, đánh giá và cá nhân hóa quá trình tự học của học viên. Điểm quan trọng là chuyển đổi số không chỉ làm cho bài giảng hiện đại hơn, mà còn góp phần đào tạo người cán bộ Cảnh sát nhân dân có năng lực số, tư duy dữ liệu, khả năng thích ứng với môi trường công tác mới. Đây là yêu cầu thiết thực để xây dựng lực lượng CAND chính quy, tinh nhuệ, hiện đại."
  },
  {
    topic: "Nghị quyết 59 - Đối ngoại và Ngoại giao kinh tế",
    keywords: ["59", "ngoại giao", "hội nhập", "đối ngoại", "cptpp", "quốc tế", "thương mại"],
    synonyms: ["nước ngoài", "toàn cầu hóa", "bạn bè quốc tế", "xuất khẩu", "fdi", "đầu tư", "hiệp định", "biển đông", "đại sứ", "hòa bình"],
    source: "Tài liệu NQ 59.pdf",
    content: "Với Trường Đại học Cảnh sát nhân dân, Nghị quyết 59 đặt ra yêu cầu nâng cao năng lực hội nhập quốc tế trong đào tạo, nghiên cứu và cập nhật tri thức mới. Nhà trường cần trang bị cho học viên kiến thức về tội phạm xuyên quốc gia, tội phạm công nghệ cao, an ninh phi truyền thống, đồng thời phát triển năng lực ngoại ngữ, kỹ năng hội nhập và tư duy toàn cầu. Tuy nhiên, hội nhập trong môi trường giáo dục CAND không phải là sao chép mô hình bên ngoài, mà là tiếp thu có chọn lọc tri thức tiến bộ của nhân loại, trên nền tảng giữ vững bản lĩnh chính trị, bản sắc CAND và lợi ích quốc gia – dân tộc."
  },
  {
    topic: "Nghị quyết 66 - Nhà nước pháp quyền",
    keywords: ["66", "pháp quyền", "luật pháp", "nhà nước", "cải cách", "tư pháp", "bảo vệ"],
    synonyms: ["pháp luật", "luật sư", "tòa án", "công bằng", "xét xử", "chính phủ", "quyền tài sản", "quyền con người", "nhân quyền", "minh bạch", "dân chủ"],
    source: "Tài liệu NQ 66.pdf",
    content: "Đối với Trường Đại học Cảnh sát nhân dân, Nghị quyết 66 có ý nghĩa rất trực tiếp, bởi Nhà trường là nơi đào tạo đội ngũ cán bộ Cảnh sát nhân dân trực tiếp thực thi pháp luật trong tương lai. Việc thực hiện nghị quyết cần được thể hiện trong đổi mới chương trình, giáo trình, phương pháp giảng dạy pháp luật, nghiệp vụ và kỹ năng xử lý tình huống. Mục tiêu là hình thành người cán bộ Cảnh sát có tư duy pháp lý vững vàng, hành động đúng pháp luật, đúng quy trình, tôn trọng Nhân dân, bảo vệ công lý, bảo vệ quyền và lợi ích hợp pháp của tổ chức, cá nhân. Nói cách khác, muốn pháp luật được thực thi nghiêm minh trong thực tiễn, trước hết người cán bộ Cảnh sát tương lai phải được đào tạo vững vàng về pháp luật ngay từ giảng đường."
  },
  {
    topic: "Nghị quyết 68 - Phát triển Kinh tế tư nhân",
    keywords: ["68", "kinh tế tư nhân", "doanh nghiệp tư nhân", "động lực", "fdi", "tập đoàn"],
    synonyms: ["công ty", "kinh doanh", "khởi nghiệp", "startup", "thương gia", "doanh nhân", "làm giàu", "sản xuất", "tư bản", "thị trường"],
    source: "Tài liệu NQ 68.pdf",
    content: "Nghị quyết 68 không gắn trực tiếp với chức năng đào tạo của Trường Đại học Cảnh sát nhân dân như các nghị quyết về giáo dục, pháp luật hay chuyển đổi số. Tuy nhiên, có thể liên hệ ở phương diện đào tạo cán bộ Cảnh sát có nhận thức đúng về vai trò của kinh tế tư nhân trong nền kinh tế thị trường định hướng xã hội chủ nghĩa, đồng thời có năng lực bảo đảm an ninh, trật tự, phòng chống tội phạm kinh tế, tài chính, thương mại, công nghệ cao. Như vậy, Nhà trường góp phần thực hiện Nghị quyết 68 không phải bằng hoạt động kinh tế trực tiếp, mà bằng đào tạo đội ngũ cán bộ Cảnh sát có khả năng bảo vệ môi trường kinh doanh an toàn, minh bạch, đúng pháp luật."
  },
  {
    topic: "Nghị quyết 70 - Năng lượng và Tăng trưởng xanh",
    keywords: ["70", "năng lượng", "điện", "xanh", "tái tạo", "môi trường", "phát thải"],
    synonyms: ["khí hậu", "trái đất", "gió", "mặt trời", "carbon", "net zero", "ô nhiễm", "nhiên liệu", "xăng dầu", "bền vững", "rác thải"],
    source: "Tài liệu NQ 70.pdf",
    content: "Nghị quyết 70 có thể liên hệ với Trường Đại học Cảnh sát nhân dân ở phương diện giáo dục nhận thức và xây dựng môi trường học đường kỷ luật, tiết kiệm, an toàn. Nhà trường cần giúp học viên hiểu rằng an ninh năng lượng là một bộ phận quan trọng của an ninh quốc gia, có liên quan đến ổn định kinh tế, xã hội và trật tự an toàn xã hội. Trong phạm vi Nhà trường, việc thực hiện nghị quyết có thể bắt đầu từ những hành động cụ thể như sử dụng tiết kiệm điện, nước, tài sản công, xây dựng campus xanh, an toàn, kỷ luật, qua đó hình thành ý thức trách nhiệm của người cán bộ Cảnh sát nhân dân tương lai."
  },
  {
    topic: "Nghị quyết 71 - Giáo dục và Đào tạo",
    keywords: ["71", "giáo dục", "nhân tài", "đào tạo", "thực học", "trường học", "nhân lực"],
    synonyms: ["học sinh", "sinh viên", "đại học", "trường học", "thầy cô", "giáo viên", "dạy học", "bệnh thành tích", "chất lượng cao", "chuyên gia", "nhà khoa học"],
    source: "Tài liệu NQ 71.pdf",
    content: "Trong các nghị quyết chuyên đề, Nghị quyết 71 là nội dung có liên hệ trực tiếp và sâu sắc nhất với Trường Đại học Cảnh sát nhân dân, bởi Nhà trường là cơ sở giáo dục đại học trong Công an nhân dân. Việc thực hiện nghị quyết cần được cụ thể hóa bằng đổi mới chương trình, giáo trình, phương pháp dạy học, chuẩn đầu ra, kiểm tra đánh giá và nâng cao chất lượng đội ngũ giảng viên. Điểm đặc thù của Trường Đại học Cảnh sát nhân dân là đào tạo người cán bộ Cảnh sát vừa có bản lĩnh chính trị, đạo đức cách mạng, văn hóa ứng xử, vừa có tri thức pháp luật, nghiệp vụ, kỹ năng thực hành, năng lực số và khả năng thích ứng với yêu cầu bảo đảm an ninh, trật tự trong tình hình mới. Có thể nói, Nghị quyết 71 đi vào Trường Đại học Cảnh sát nhân dân bằng đổi mới từng bài giảng, từng giờ học, từng tình huống thực hành và từng chuẩn đầu ra của người học."
  },
  {
    topic: "Nghị quyết 72 - Y tế và Chăm sóc sức khỏe",
    keywords: ["72", "y tế", "sức khỏe", "khám chữa bệnh", "bác sĩ", "bệnh viện"],
    synonyms: ["ốm đau", "dịch bệnh", "thuốc men", "chăm sóc", "bệnh nhân", "y tá", "dược", "covid", "bảo hiểm", "cứu người", "vaccine"],
    source: "Tài liệu NQ 72.pdf",
    content: "Đối với Trường Đại học Cảnh sát nhân dân, Nghị quyết 72 có thể được liên hệ ở phương diện giáo dục thể chất, rèn luyện thể lực, chăm sóc sức khỏe tinh thần và xây dựng môi trường học tập lành mạnh cho học viên. Với lực lượng Cảnh sát nhân dân, sức khỏe không chỉ là yêu cầu cá nhân, mà còn là điều kiện nghề nghiệp để sẵn sàng nhận và hoàn thành nhiệm vụ. Vì vậy, Nhà trường góp phần thực hiện nghị quyết bằng việc xây dựng môi trường giáo dục kỷ luật, lành mạnh; nâng cao thể chất, tinh thần, ý chí, sức bền và khả năng thích ứng cho học viên Cảnh sát nhân dân trong tương lai."
  },
  {
    topic: "Nghị quyết 79 - Doanh nghiệp Nhà nước",
    keywords: ["79", "doanh nghiệp nhà nước", "dnnn", "cổ phần hóa", "vốn nhà nước", "tập đoàn"],
    synonyms: ["con sếu đầu đàn", "chủ đạo", "quốc gia", "tổng công ty", "cơ sở hạ tầng", "quản trị", "thất thoát", "tái cơ cấu", "tài sản nhà nước"],
    source: "Tài liệu NQ 79.pdf",
    content: "Nghị quyết 79 không phải là nghị quyết gắn trực tiếp với chức năng đào tạo của Trường Đại học Cảnh sát nhân dân. Nếu liên hệ, chỉ nên liên hệ ở phương diện quản trị hiệu quả nguồn lực công trong môi trường giáo dục CAND. Điều đó có nghĩa là Nhà trường cần sử dụng tiết kiệm, minh bạch, hiệu quả ngân sách, tài sản công, cơ sở vật chất, phòng học, thao trường, thư viện, học liệu và hệ thống công nghệ thông tin, nhằm phục vụ tốt nhất cho nhiệm vụ đào tạo, nghiên cứu khoa học và xây dựng lực lượng Cảnh sát nhân dân."
  },
  {
    topic: "Nghị quyết 80 - Phát triển Văn hóa",
    keywords: ["80", "văn hóa", "con người", "di sản", "công nghiệp văn hóa", "bản sắc"],
    synonyms: ["tinh thần", "truyền thống", "lịch sử", "phim ảnh", "âm nhạc", "nghệ thuật", "du lịch", "đạo đức", "lối sống", "kỷ nguyên số", "mạng xã hội"],
    source: "Tài liệu NQ 80.pdf",
    content: "Đối với Trường Đại học Cảnh sát nhân dân, Nghị quyết 80 có thể được cụ thể hóa bằng xây dựng văn hóa học đường CAND. Đó là văn hóa chính trị, văn hóa pháp luật, văn hóa ứng xử, văn hóa đọc, văn hóa số, văn hóa nêu gương, văn hóa kỷ luật và tinh thần vì Nhân dân phục vụ. Trong đó, Khoa Lý luận chính trị và Khoa học xã hội nhân văn có vai trò quan trọng trong giáo dục chủ nghĩa Mác – Lênin, tư tưởng Hồ Chí Minh, lịch sử Đảng, đạo đức cách mạng, bản lĩnh chính trị và lý tưởng phục vụ Nhân dân cho học viên. Có thể nói, phát triển văn hóa trong Trường Đại học Cảnh sát nhân dân chính là xây dựng người học viên Cảnh sát có bản lĩnh, nhân văn, kỷ luật, trách nhiệm và giàu khát vọng cống hiến."
  },
  {
    topic: "Tổng quát Văn kiện Đại hội XIV",
    keywords: ["tổng quát", "đại hội 14", "đại hội xiv", "văn kiện", "cốt lõi", "tóm tắt"],
    synonyms: ["tóm lại", "chính", "mục tiêu", "chiến lược", "kỷ nguyên vươn mình", "thịnh vượng", "hùng cường", "toàn cảnh", "bản sắc", "đảng"],
    source: "Đề cương Thông báo nhanh (dh14_decuongTBN)",
    content: "Đại hội XIV mở ra 'Kỷ nguyên vươn mình' của dân tộc. Trường Đại học Cảnh sát nhân dân cam kết tuyệt đối trung thành với Đảng, không ngừng đổi mới toàn diện, xây dựng nhà trường trở thành trung tâm đào tạo và nghiên cứu khoa học nghiệp vụ Cảnh sát hàng đầu khu vực, sẵn sàng đối mặt với mọi thách thức an ninh phi truyền thống."
  },
  {
    topic: "An ninh Quốc phòng",
    keywords: ["an ninh", "quốc phòng", "bảo vệ tổ quốc", "không gian mạng", "biên giới"],
    synonyms: ["quân đội", "công an", "cảnh sát", "tội phạm", "chống phá", "chiến tranh", "hòa bình", "chủ quyền", "thế trận", "an toàn"],
    source: "Chuyên đề của Bộ Công an / Bộ Quốc phòng",
    content: "Bảo vệ Tổ quốc trong tình hình mới đòi hỏi lực lượng tinh, gọn, mạnh. Trường Đại học Cảnh sát nhân dân không ngừng nâng cao chất lượng huấn luyện vũ thuật, bắn súng và tác chiến điện tử. Mỗi học viên tốt nghiệp phải là một pháo đài vững chắc, sử dụng công nghệ cao làm vũ khí sắc bén để bảo vệ cuộc sống bình yên của nhân dân."
  },
  {
    topic: "Chào hỏi, mở đầu tương tác",
    keywords: ["chào", "bắt đầu", "mở đầu", "giới thiệu", "sẵn sàng"],
    synonyms: ["xin chào", "chào trợ lý", "mời trợ lý", "trợ lý ai", "chào ban giám khảo", "hello"],
    exactResponse: true,
    content: "<b>Xin chào đồng chí báo cáo viên, xin kính chào Ban Giám khảo và quý vị đại biểu.</b>\n\nTôi là trợ lý AI đồng hành trong phần trình bày hôm nay. Nhiệm vụ của tôi là hỗ trợ tra cứu, hệ thống hóa, diễn giải và chuyển hóa nội dung nghị quyết thành thông điệp <b>ngắn gọn, chính xác, dễ hiểu, dễ nhớ</b>, phục vụ hiệu quả công tác tuyên truyền."
  },
  {
    topic: "Trích đoạn Văn kiện Đại hội 14",
    keywords: ["đoạn trích", "văn kiện nói gì", "sức chiến đấu của đảng", "trích dẫn nguyên văn"],
    synonyms: ["đọc cho tôi một đoạn", "nhắc lại đoạn trích", "nội dung trích dẫn ở trang 383", "văn kiện đại hội xiv", "nói phần văn kiện đi", "trang 383", "đảng ta khẳng định điều gì"],
    exactResponse: true,
    audioKey: "dialogue_1",
    content: "<b>Xin chào đồng chí báo cáo viên, xin kính chào Ban Giám khảo và quý vị đại biểu!</b>\n\nTheo nội dung đồng chí cung cấp từ Văn kiện Đại hội đại biểu toàn quốc lần thứ XIV, Đảng ta khẳng định:\n\n“<i>Tiếp tục đẩy mạnh xây dựng, chỉnh đốn Đảng trong sạch, vững mạnh toàn diện; nâng cao năng lực lãnh đạo, cầm quyền và sức chiến đấu của Đảng. Tăng cường xây dựng, chỉnh đốn, tự đổi mới để Đảng ta thật sự là đạo đức, là văn minh</i>”.\n\nĐoạn trích này được dẫn từ <b>Văn kiện Đại hội đại biểu toàn quốc lần thứ XIV, tập II</b>, Nhà xuất bản Chính trị quốc gia Sự thật, Hà Nội, 2026, tr.383.\n\nNội dung trên thể hiện một yêu cầu có <b>ý nghĩa chiến lược</b>: muốn đất nước phát triển nhanh, bền vững, Đảng phải không ngừng tự đổi mới, tự chỉnh đốn, nâng cao bản lĩnh chính trị, trí tuệ lãnh đạo, năng lực cầm quyền và sức chiến đấu trong mọi điều kiện, hoàn cảnh."
  },
  {
    topic: "Khái quát nội dung cơ bản của việc nâng cao năng lực lãnh đạo",
    keywords: ["khái quát", "nội dung cơ bản", "mấy điểm chính", "nhóm vấn đề nào", "nội dung trọng tâm"],
    synonyms: ["nói ngắn gọn có mấy điểm chính", "khái quát lại nội dung cơ bản giúp tôi", "có thể chia thành những nhóm vấn đề nào", "có mấy nội dung trọng tâm"],
    exactResponse: true,
    audioKey: "dialogue_2",
    content: "Có thể khái quát thành <b>5 nội dung cơ bản</b>:\n\n+ <b>Một là</b>, tiếp tục đẩy mạnh xây dựng, chỉnh đốn Đảng và hệ thống chính trị trong sạch, vững mạnh toàn diện; nâng cao chất lượng công tác xây dựng Đảng về chính trị, tư tưởng, đạo đức, tổ chức và cán bộ.\n+ <b>Hai là</b>, xây dựng đội ngũ cán bộ, nhất là cán bộ lãnh đạo, quản lý và người đứng đầu các cấp có đủ phẩm chất, năng lực, uy tín, ngang tầm nhiệm vụ.\n+ <b>Ba là</b>, đổi mới đồng bộ phương thức lãnh đạo của Đảng, nâng cao năng lực lãnh đạo, năng lực cầm quyền và hiệu quả tổ chức thực hiện các chủ trương, nghị quyết của Đảng.\n+ <b>Bốn là</b>, tăng cường kiểm soát quyền lực; đẩy mạnh phòng, chống tham nhũng, lãng phí, tiêu cực; kiên quyết đấu tranh ngăn chặn, đẩy lùi suy thoái về tư tưởng chính trị, đạo đức, lối sống và các biểu hiện 'tự diễn biến', 'tự chuyển hóa' trong nội bộ.\n+ <b>Năm là</b>, tăng cường bảo vệ nền tảng tư tưởng của Đảng; đấu tranh phản bác các quan điểm sai trái, thù địch.\n\nTựu trung lại, đây là quá trình làm cho Đảng mạnh hơn về chính trị, vững hơn về tư tưởng, trong hơn về đạo đức, chặt chẽ hơn về tổ chức và hiệu quả hơn trong lãnh đạo thực tiễn."
  },
  {
    topic: "Tóm tắt 5 nội dung cơ bản",
    keywords: ["tóm tắt", "từ khóa", "dễ nhớ", "nói ngắn", "ngắn gọn"],
    synonyms: ["tóm tắt cho dễ nhớ", "có cụm từ khóa nào không", "nói sao cho người nghe nhớ ngay", "nói ngắn để khán giả dễ nhớ", "rút gọn", "cô đọng"],
    exactResponse: true,
    audioKey: "dialogue_3",
    content: "Có thể ghi nhớ bằng <b>5 cụm từ khóa</b>:\n\n- <b>Xây dựng Đảng trong sạch</b>\n- <b>Cán bộ ngang tầm</b>\n- <b>Phương thức lãnh đạo đổi mới</b>\n- <b>Quyền lực được kiểm soát</b>\n- <b>Nền tảng tư tưởng được bảo vệ</b>\n\nNói ngắn gọn, nâng cao năng lực lãnh đạo, cầm quyền và sức chiến đấu của Đảng là làm cho Đảng thật sự trong sạch, vững mạnh, trí tuệ, bản lĩnh, gắn bó mật thiết với Nhân dân và đủ năng lực lãnh đạo đất nước phát triển trong giai đoạn mới."
  },
  {
    topic: "Ý nghĩa đối với công tác tuyên truyền",
    keywords: ["ý nghĩa", "tuyên truyền nghị quyết", "báo cáo viên cần nắm", "quan trọng"],
    synonyms: ["nội dung này có ý nghĩa gì với tuyên truyền nghị quyết", "liên hệ với công tác báo cáo viên hiện nay", "vì sao báo cáo viên cần nắm nội dung này", "vì sao nội dung này quan trọng"],
    exactResponse: true,
    audioKey: "dialogue_4",
    content: "Nội dung này có <b>ý nghĩa rất quan trọng</b> đối với công tác tuyên truyền nghị quyết hiện nay.\n\n* <b>Trước hết</b>, nó giúp báo cáo viên xác định rõ trọng tâm tuyên truyền: tuyên truyền nghị quyết không chỉ là truyền đạt văn bản, mà là làm cho cán bộ, đảng viên và quần chúng hiểu đúng, tin tưởng, đồng thuận và hành động theo nghị quyết.\n* <b>Thứ hai</b>, nội dung này nhấn mạnh yêu cầu nêu gương của cán bộ, đảng viên, nhất là người đứng đầu. Năng lực lãnh đạo và sức chiến đấu của Đảng phải được thể hiện bằng hành động cụ thể, bằng hiệu quả công tác và bằng niềm tin của Nhân dân.\n* <b>Thứ ba</b>, nội dung này đặt ra yêu cầu đổi mới phương thức tuyên truyền. Báo cáo viên cần kết hợp lý luận với thực tiễn, kết hợp tính chính luận với cách trình bày hiện đại, trực quan, dễ tiếp cận, trong đó công nghệ số và trí tuệ nhân tạo có thể trở thành công cụ hỗ trợ rất hiệu quả."
  },
  {
    topic: "Vai trò của AI trong công tác tuyên truyền",
    keywords: ["ai giúp gì", "vai trò của ai", "công nghệ hỗ trợ", "hội thi này"],
    synonyms: ["ai giúp gì cho báo cáo viên", "vì sao lại dùng ai trong hội thi này", "công nghệ có hỗ trợ gì cho tuyên truyền nghị quyết", "công nghệ ai giúp gì trong phần thi này"],
    exactResponse: true,
    audioKey: "dialogue_5",
    content: "AI có thể hỗ trợ báo cáo viên trên <b>4 phương diện</b>:\n\n1. Hỗ trợ <b>tra cứu và hệ thống hóa</b> tài liệu. Khi được cung cấp nguồn dữ liệu chính thống, AI có thể giúp tìm nhanh nội dung liên quan, lập dàn ý, xây dựng sơ đồ tư duy và gợi ý các luận điểm cần nhấn mạnh.\n2. Hỗ trợ <b>chuyển hóa nội dung</b> nghị quyết thành ngôn ngữ phù hợp với từng đối tượng. Cùng một nội dung, AI có thể gợi ý bản trình bày đầy đủ, bản hỏi – đáp, bản tóm tắt, bản infographic hoặc thông điệp ngắn cho truyền thông số.\n3. Hỗ trợ <b>nâng cao tính trực quan</b> và sức thuyết phục của bài báo cáo. AI có thể gợi ý bố cục slide, ví dụ thực tiễn, câu hỏi tương tác, bảng so sánh và thông điệp kết luận.\n4. Hỗ trợ báo cáo viên <b>tự rèn luyện</b>. AI có thể đóng vai người nghe phản biện, đặt câu hỏi giả định, phát hiện chỗ diễn đạt chưa rõ và gợi ý cách trình bày mạch lạc hơn.\n\nTuy nhiên, AI <b>chỉ là công cụ hỗ trợ</b>. Bản lĩnh chính trị, năng lực chuyên môn, trách nhiệm tuyên truyền và sự nhạy bén trước thực tiễn vẫn thuộc về báo cáo viên."
  },
  {
    topic: "AI có làm giảm vai trò của báo cáo viên không",
    keywords: ["thay thế báo cáo viên", "giảm vai trò", "lấn át", "thay tôi báo cáo"],
    synonyms: ["ai có thay thế báo cáo viên không", "dùng ai có làm giảm vai trò con người không", "ban giám khảo hỏi ai có lấn át báo cáo viên thì trả lời sao", "ai có thay tôi báo cáo được không"],
    exactResponse: true,
    audioKey: "dialogue_6",
    content: "<b>Không</b>. Nếu sử dụng đúng cách, AI <b>không làm giảm vai trò</b> của báo cáo viên, mà góp phần nâng cao chất lượng, hiệu quả và sức lan tỏa của công tác tuyên truyền.\n\n- Báo cáo viên là <b>chủ thể chính trị</b>, là người định hướng tư tưởng, truyền cảm hứng, xử lý tình huống và chịu trách nhiệm về nội dung tuyên truyền. AI chỉ là công cụ hỗ trợ xử lý thông tin, gợi ý phương pháp trình bày và giúp cá nhân hóa nội dung cho từng đối tượng.\n- Nói ngắn gọn: AI có thể giúp báo cáo viên <b>nhanh hơn</b> trong chuẩn bị, <b>sâu hơn</b> trong phân tích, <b>sinh động hơn</b> trong trình bày; nhưng AI <b>không thể thay thế</b> bản lĩnh, niềm tin, trách nhiệm và sức thuyết phục chính trị của người báo cáo viên."
  },
  {
    topic: "Thông điệp kết luận",
    keywords: ["kết luận", "kết lại", "thông điệp cuối", "đoạn kết", "trang trọng"],
    synonyms: ["kết lại nội dung này giúp tôi", "cho một thông điệp kết luận", "hãy nói một đoạn kết thật trang trọng", "kết lại thật hay"],
    exactResponse: true,
    audioKey: "dialogue_7",
    content: "Nâng cao năng lực lãnh đạo, cầm quyền và sức chiến đấu của Đảng là <b>yêu cầu sống còn</b> đối với sự nghiệp cách mạng trong giai đoạn mới. Đó là quá trình xây dựng Đảng trong sạch, vững mạnh toàn diện; xây dựng đội ngũ cán bộ đủ phẩm chất, năng lực, uy tín; đổi mới phương thức lãnh đạo; kiểm soát quyền lực; phòng, chống tham nhũng, tiêu cực; đồng thời kiên quyết <b>bảo vệ nền tảng tư tưởng</b> của Đảng.\n\nTrong thời đại chuyển đổi số, công tác tuyên truyền nghị quyết cũng cần được đổi mới mạnh mẽ. Trí tuệ nhân tạo, nếu được sử dụng đúng định hướng, đúng dữ liệu, đúng mục đích, sẽ trở thành <b>công cụ hỗ trợ đắc lực</b> cho báo cáo viên: giúp nghiên cứu sâu hơn, trình bày sinh động hơn, lan tỏa nhanh hơn và thuyết phục hiệu quả hơn.\n\nNhưng trên hết, người báo cáo viên vẫn là <b>trung tâm</b> của quá trình tuyên truyền: trung tâm của bản lĩnh chính trị, của niềm tin, của trách nhiệm và của khả năng biến nghị quyết của Đảng thành nhận thức, niềm tin và hành động trong thực tiễn."
  }

  ,{
    topic: "Điểm khác biệt của Trường Đại học CSND",
    keywords: ["khác biệt", "đơn vị khác", "so với", "đặc thù"],
    synonyms: ["trường mình", "khác chỗ nào", "nhà trường", "cơ sở giáo dục"],
    source: "CSND Training",
    exactResponse: true,
    content: "Điểm khác biệt của Trường Đại học Cảnh sát nhân dân là Nhà trường không chỉ triển khai nghị quyết bằng một mô hình công tác cụ thể, mà triển khai nghị quyết thông qua đào tạo con người, phát triển tri thức, bồi dưỡng bản lĩnh chính trị, xây dựng văn hóa CAND và chuẩn bị nguồn nhân lực chất lượng cao cho lực lượng Cảnh sát nhân dân. Nếu các đơn vị chiến đấu trực tiếp cụ thể hóa nghị quyết bằng chiến công, mô hình, kết quả trên địa bàn, thì Trường Đại học Cảnh sát nhân dân cụ thể hóa nghị quyết bằng từng chương trình đào tạo, từng bài giảng, từng học liệu, từng đề tài nghiên cứu, từng chuẩn đầu ra và từng thế hệ học viên ra trường. Nói ngắn gọn, Nhà trường đưa nghị quyết vào giảng đường, biến tri thức chính trị thành bản lĩnh, kỹ năng và hành động của người cán bộ Cảnh sát nhân dân tương lai."
  },
  {
    topic: "Tinh thần chính quy tinh nhuệ hiện đại",
    keywords: ["chính quy", "tinh nhuệ", "hiện đại"],
    synonyms: ["xây dựng lực lượng", "tinh thần", "yêu cầu"],
    source: "CSND Training",
    exactResponse: true,
    content: "Đào tạo cán bộ Cảnh sát nhân dân trong giai đoạn mới phải hướng đến chuẩn mực chính quy, tinh nhuệ, hiện đại. Chính quy là vững về kỷ luật, pháp luật, điều lệnh, quy trình và tác phong công tác. Tinh nhuệ là giỏi về chuyên môn, sắc bén về tư duy, thành thạo về nghiệp vụ, có khả năng xử lý hiệu quả các tình huống phức tạp. Hiện đại là làm chủ công nghệ, dữ liệu, ngoại ngữ, phương pháp làm việc mới và thích ứng với yêu cầu bảo đảm an ninh, trật tự trong kỷ nguyên số. Với Trường Đại học Cảnh sát nhân dân, tinh thần đó phải được thể hiện trong từng bài giảng, từng phương pháp đào tạo, từng môi trường rèn luyện và từng chuẩn đầu ra của học viên."
  },
  {
    topic: "Vai trò Khoa LLCT&KHXHNV",
    keywords: ["khoa lý luận", "chính trị", "xã hội nhân văn", "khoa mình", "giảng viên khoa"],
    synonyms: ["chính trị tư tưởng", "nhận thức", "niềm tin", "đạo đức"],
    source: "CSND Training",
    exactResponse: true,
    content: "Khoa Lý luận chính trị và Khoa học xã hội nhân văn có vai trò quan trọng trong việc xây dựng nền tảng tư tưởng, bản lĩnh chính trị, đạo đức cách mạng, niềm tin và lý tưởng phục vụ Nhân dân cho học viên Trường Đại học Cảnh sát nhân dân. Nếu các học phần nghiệp vụ trang bị cho học viên kỹ năng nghề nghiệp, thì các học phần lý luận chính trị và khoa học xã hội nhân văn góp phần hình thành thế giới quan, phương pháp luận, nhân sinh quan, văn hóa ứng xử và trách nhiệm chính trị của người cán bộ Cảnh sát nhân dân. Do đó, việc đưa Nghị quyết Đại hội XIV vào giảng dạy, học tập, nghiên cứu và sinh hoạt chính trị tại Khoa không chỉ là nhiệm vụ tuyên truyền, mà còn là quá trình chuyển hóa nghị quyết thành niềm tin, bản lĩnh và hành động của người học."
  },
  {
    topic: "Câu kết luận liên hệ CSND",
    keywords: ["kết luận", "tóm lại", "chốt lại", "kết thúc"],
    synonyms: ["cuối cùng", "tóm gọn", "đúc kết"],
    source: "CSND Training",
    exactResponse: true,
    content: "Có thể khẳng định, điểm nhấn riêng của Trường Đại học Cảnh sát nhân dân trong thực hiện Nghị quyết Đại hội XIV và các nghị quyết chuyên đề là đưa nghị quyết vào môi trường giáo dục, đào tạo, nghiên cứu và rèn luyện của lực lượng CAND. Nhà trường cụ thể hóa nghị quyết bằng từng chương trình đào tạo, từng bài giảng, từng học liệu số, từng đề tài nghiên cứu, từng hoạt động rèn luyện và từng chuẩn đầu ra của học viên. Qua đó, góp phần đào tạo đội ngũ cán bộ Cảnh sát nhân dân có bản lĩnh chính trị vững vàng, pháp luật vững chắc, nghiệp vụ tinh thông, công nghệ thành thạo, văn hóa ứng xử nhân văn, đáp ứng yêu cầu xây dựng lực lượng Công an nhân dân chính quy, tinh nhuệ, hiện đại. Nói ngắn gọn, Trường Đại học Cảnh sát nhân dân đưa nghị quyết của Đảng vào giảng đường hôm nay để chuẩn bị đội ngũ cán bộ Cảnh sát nhân dân cho ngày mai."
  }
];

