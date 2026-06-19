const CONGRESS_XIV_OVERVIEW = {
  badge: "Hồ sơ đặc biệt",
  title: "ĐẠI HỘI ĐẠI BIỂU TOÀN QUỐC<br>LẦN THỨ XIV CỦA ĐẢNG",
  subtitle: "9 NGHỊ QUYẾT CHIẾN LƯỢC TRONG KỶ NGUYÊN MỚI",
  description: "Tóm lược những nội dung chính về thời gian, đại biểu, nghị quyết, chỉ tiêu phát triển, công tác nhân sự và các định hướng chiến lược của Đại hội XIV; đồng thời trực quan hóa 9 nghị quyết cốt lõi bằng hình thức e-magazine infographic tương tác.",
  
  motto: [
    "Đoàn kết",
    "Dân chủ",
    "Kỷ cương",
    "Đột phá",
    "Phát triển"
  ],
  theme: "Dưới lá cờ vẻ vang của Đảng, chung sức, đồng lòng thực hiện thắng lợi các mục tiêu phát triển đất nước đến năm 2030; tự chủ chiến lược, tự cường, tự tin, tiến mạnh trong kỷ nguyên vươn mình của dân tộc vì hòa bình, độc lập, dân chủ, giàu mạnh, phồn vinh, văn minh, hạnh phúc, vững bước đi lên chủ nghĩa xã hội.",
  centralCommittee: {
    total: 200,
    official: 180,
    alternate: 20
  },
  secretariat: {
    total: 13,
    politburoAssigned: 10,
    electedAtFirstPlenum: 3,
    permanentMember: "Đồng chí Trần Cẩm Tú"
  },
  
  responsibilities: [
    {
      id: "01",
      title: "Quán triệt và nêu gương",
      content: "Gương mẫu học tập, quán triệt, tuyên truyền và cụ thể hóa Nghị quyết Đại hội XIV thành nhiệm vụ thiết thực trong từng lĩnh vực công tác.",
      icon: "<i class=\"fas fa-star\"></i>"
    },
    {
      id: "02",
      title: "Đổi mới giáo dục, đào tạo",
      content: "Đổi mới nội dung, phương pháp giảng dạy, kiểm tra và đánh giá; gắn đào tạo với thực tiễn công tác, chiến đấu của lực lượng CAND.",
      icon: "<i class=\"fas fa-book-open\"></i>"
    },
    {
      id: "03",
      title: "Phát triển khoa học và chuyển đổi số",
      content: "Đẩy mạnh nghiên cứu khoa học, đổi mới sáng tạo, ứng dụng công nghệ số và trí tuệ nhân tạo, góp phần xây dựng Nhà trường hiện đại.",
      icon: "<i class=\"fas fa-microchip\"></i>"
    },
    {
      id: "04",
      title: "Xây dựng đội ngũ và môi trường sư phạm",
      content: "Rèn luyện bản lĩnh chính trị, đạo đức, kỷ luật, năng lực chuyên môn; xây dựng môi trường giáo dục chính quy, mẫu mực, nhân văn.",
      icon: "<i class=\"fas fa-users-class\"></i>"
    },
    {
      id: "05",
      title: "Bảo vệ nền tảng tư tưởng, phục vụ Nhân dân",
      content: "Chủ động bảo vệ nền tảng tư tưởng của Đảng, đấu tranh phản bác quan điểm sai trái; đào tạo cán bộ Cảnh sát đáp ứng yêu cầu bảo đảm an ninh, trật tự.",
      icon: "<i class=\"fas fa-shield-check\"></i>"
    }
  ],
stats: [
    { label: "Thời gian", value: "19 – 23/01/2026", icon: "📅" },
    { label: "Đại biểu", value: "1.586", icon: "👥" },
    { label: "Đảng viên", value: "Hơn 5,6 triệu", icon: "⭐" },
    { label: "Trọng tâm", value: "9 nghị quyết", icon: "🎯" }
  ],
  images: {
    hero: "./images/congress-xiv/hero-congress.jpg",
    voting: "./images/congress-xiv/voting.jpg",
    personnel: "./images/congress-xiv/personnel-infographic.jpg",
    hall: "./images/congress-xiv/delegates-hall.jpg",
    working: "./images/congress-xiv/congress-working.jpg",
    leaders: "./images/congress-xiv/leaders-delegates.jpg"
  },
  focusBlocks: [
    {
      id: "thoi-gian",
      title: "Thời gian, địa điểm",
      description: "Đại hội diễn ra trong 5 ngày, từ 19/01/2026 đến 23/01/2026 tại Thủ đô Hà Nội.",
      icon: "📍",
      image: "./images/congress-xiv/congress-working.jpg"
    },
    {
      id: "dai-bieu",
      title: "Đại biểu tham dự",
      description: "1.586 đại biểu thay mặt cho hơn 5,6 triệu đảng viên toàn Đảng.",
      icon: "👤",
      image: "./images/congress-xiv/voting.jpg",
      miniStats: [
        { label: "Đương nhiệm", value: "163" },
        { label: "Được bầu", value: "353" },
        { label: "Chỉ định", value: "1.070" }
      ]
    },
    {
      id: "nghi-quyet",
      title: "Mục tiêu phát triển 2026–2030",
      description: "Định hướng phát triển bền vững và đột phá kinh tế xã hội.",
      icon: "🚀",
      image: "./images/congress-xiv/delegates-hall.jpg",
      miniStats: [
        { label: "Tăng trưởng GDP", value: "≥ 10%/năm" },
        { label: "GDP/người 2030", value: "~ 8.500 USD" },
        { label: "Kinh tế số", value: "~ 30% GDP" },
        { label: "TFP", value: "> 55%" }
      ]
    },
    {
      id: "nhan-su",
      title: "Ba đột phá chiến lược",
      description: "Bản lề tạo động lực cho kỷ nguyên văn minh của dân tộc.",
      icon: "⚙️",
      image: "./images/congress-xiv/personnel-infographic.jpg",
      miniStats: [
        { label: "01", value: "Thể chế phát triển" },
        { label: "02", value: "Nguồn nhân lực & cán bộ" },
        { label: "03", value: "Kết cấu hạ tầng" }
      ]
    }
  ]
};
