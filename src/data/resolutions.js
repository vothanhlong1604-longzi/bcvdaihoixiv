/**
 * resolutions.js — Dữ liệu 9 nghị quyết chiến lược, Đại hội XIV
 * Nguồn: Báo Nhân Dân, tóm lược học liệu số
 * Khoa LLCT&KHXHNV – Trường Đại học Cảnh sát nhân dân
 */

const RESOLUTIONS_DATA = [
  {
    id: "57",

    responsibilityTitle: "TRÁCH NHIỆM CÁN BỘ, ĐẢNG VIÊN TRƯỜNG ĐẠI HỌC CSND",
    responsibilitySubtitle: "Cụ thể hóa nghị quyết thành nhận thức, trách nhiệm và hành động trong giáo dục, đào tạo, nghiên cứu khoa học và xây dựng lực lượng CAND.",
    responsibilities: [
      { id: "01", title: "Nâng cao năng lực số", content: "Chủ động học tập, làm chủ công nghệ số, trí tuệ nhân tạo và các công cụ hiện đại phục vụ công tác chuyên môn.", icon: "<i class='fas fa-laptop-code'></i>" },
      { id: "02", title: "Đổi mới giáo dục, đào tạo", content: "Ứng dụng công nghệ vào giảng dạy, kiểm tra, đánh giá; phát triển học liệu số và nâng cao năng lực tự học của học viên.", icon: "<i class='fas fa-chalkboard-teacher'></i>" },
      { id: "03", title: "Đẩy mạnh nghiên cứu khoa học", content: "Ưu tiên nghiên cứu, sáng kiến và sản phẩm công nghệ giải quyết những vấn đề thực tiễn trong công tác Cảnh sát.", icon: "<i class='fas fa-flask'></i>" },
      { id: "04", title: "Bảo đảm an toàn dữ liệu", content: "Tuân thủ quy định về bảo mật, an ninh mạng, bảo vệ dữ liệu và sử dụng trí tuệ nhân tạo có trách nhiệm.", icon: "<i class='fas fa-shield-alt'></i>" },
      { id: "05", title: "Xây dựng Nhà trường thông minh", content: "Góp phần số hóa quản trị, đào tạo và nghiên cứu, từng bước xây dựng Trường Đại học CSND hiện đại, thông minh.", icon: "<i class='fas fa-school'></i>" },
    ],    number: "57-NQ/TW",
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
    context: "Sự bùng nổ của Trí tuệ nhân tạo (AI), điện toán lượng tử và công nghệ bán dẫn đang định hình lại trật tự thế giới. Trong bối cảnh đó, nếu Việt Nam không bứt tốc để làm chủ công nghệ lõi, chúng ta sẽ mãi mắc kẹt ở bẫy thu nhập trung bình và gia công giá rẻ. Nghị quyết 57 ra đời như một bản tuyên ngôn chuyển đổi số, đưa KH&CN trở thành 'đột phá của các đột phá'.",
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
    
    newPoints: [
      "Chính thức luật hóa cơ chế Sandbox: Chấp nhận thử nghiệm công nghệ mới ngoài khuôn khổ pháp luật hiện hành.",
      "Lần đầu tiên khẳng định: Coi thất bại trong nghiên cứu khoa học là rủi ro nghề nghiệp, không hình sự hóa.",
      "Xác định AI và Bán dẫn là mũi nhọn ưu tiên quốc gia thay vì dàn trải."
    ],
    
    quoteBlocks: [
      {
        quote: "Chuyển đổi số không chỉ là ứng dụng công nghệ, mà là sự thay đổi tư duy, cách làm, là động lực để dân tộc vươn mình.",
        speaker: "Phát biểu chỉ đạo tại Đại hội",
        context: "Nhấn mạnh tinh thần tiên phong của Đảng"
      }
    ],
    heroImage: "./images/resolutions/57/hero_ai.jpg",
    inlineImages: [
      { src: "./images/resolutions/57/2.jpg", caption: "Việt Nam hướng tới vị trí Top 3 Đông Nam Á về nghiên cứu & phát triển trí tuệ nhân tạo", after: "coreIdeas" },
      { src: "./images/resolutions/57/ai_science_tech.jpg", caption: "Tầm nhìn công nghệ vươn tầm thế giới", after: "coreIdeas" },
      { src: "./images/resolutions/57/5.jpg", caption: "Ứng dụng khoa học công nghệ vào đời sống và quản lý nhà nước", after: "goals2030" },
      { src: "./images/resolutions/57/ai_digital.jpg", caption: "Kỷ nguyên kinh tế số bứt phá", after: "vision2045" }
    ],
    infographicBlocks: [
      { image: "./images/resolutions/57/3.jpg", title: "Phát triển Khoa học Công nghệ", desc: "Định hướng phát triển các ngành công nghệ lõi mang tính đột phá." },
      { image: "./images/resolutions/57/4.jpg", title: "Chuyển đổi số Quốc gia", desc: "Đưa kinh tế số trở thành động lực tăng trưởng mới, chiếm tối thiểu 30% GDP." }
    ]
  },
  {
    id: "59",

    responsibilityTitle: "TRÁCH NHIỆM CÁN BỘ, ĐẢNG VIÊN TRƯỜNG ĐẠI HỌC CSND",
    responsibilitySubtitle: "Cụ thể hóa nghị quyết thành nhận thức, trách nhiệm và hành động trong giáo dục, đào tạo, nghiên cứu khoa học và xây dựng lực lượng CAND.",
    responsibilities: [
      { id: "01", title: "Nâng cao nhận thức hội nhập", content: "Nhận thức đầy đủ thời cơ, thách thức của hội nhập quốc tế đối với nhiệm vụ bảo vệ an ninh, trật tự.", icon: "<i class='fas fa-globe-asia'></i>" },
      { id: "02", title: "Phát triển ngoại ngữ và kỹ năng quốc tế", content: "Chủ động nâng cao ngoại ngữ, năng lực số và khả năng tiếp cận tri thức, tài liệu khoa học quốc tế.", icon: "<i class='fas fa-language'></i>" },
      { id: "03", title: "Đổi mới nội dung đào tạo", content: "Lồng ghép kiến thức hội nhập, an ninh phi truyền thống và tội phạm xuyên quốc gia vào chương trình, bài giảng.", icon: "<i class='fas fa-book'></i>" },
      { id: "04", title: "Mở rộng hợp tác đào tạo, nghiên cứu", content: "Tham gia hiệu quả các hoạt động hợp tác, trao đổi học thuật và nghiên cứu quốc tế phù hợp quy định của ngành.", icon: "<i class='fas fa-handshake'></i>" },
      { id: "05", title: "Bảo vệ lợi ích quốc gia", content: "Giữ vững bản lĩnh chính trị, chủ động đấu tranh với thông tin xuyên tạc trong môi trường truyền thông xuyên quốc gia.", icon: "<i class='fas fa-flag'></i>" },
    ],    number: "59-NQ/TW",
    title: "Hội nhập quốc tế trong tình hình mới",
    shortTitle: "Hội nhập quốc tế",
    date: "24/01/2025",
    theme: "Xã hội",
    color: "#00695C",
    colorLight: "rgba(0, 105, 92, 0.12)",
    colorGlow: "rgba(0, 105, 92, 0.4)",
    icon: "🌐",
    keywords: ["Chiến lược", "Giải pháp", "Hội nhập"],
    sourceUrl: "https://nhandan.vn/special/nghi-quyet-59-ve-hoi-nhap-quoc-te-trong-tinh-hinh-moi/index.html",
    sourceName: "Báo Nhân Dân",
    heroGradient: "linear-gradient(135deg, #004D40 0%, #00695C 50%, #00796B 100%)",
    status: "complete",
    tagline: "Từ 'tham gia' sang 'chủ động đóng góp, xây dựng và định hình' luật chơi quốc tế",
    intro: "Sau 40 năm đổi mới, hội nhập quốc tế của nước ta đã đạt được nhiều thành tựu khá toàn diện, mở rộng và làm sâu sắc, nâng tầm quan hệ với các đối tác, góp phần tạo cục diện chiến lược thuận lợi, gia tăng sức mạnh tổng hợp quốc gia, bảo vệ vững chắc độc lập, chủ quyền, thống nhất toàn vẹn lãnh thổ quốc gia, đồng thời, giữ vững môi trường hòa bình ổn định, nâng cao tiềm lực, vị thế và uy tín của đất nước.<br><br>Sự ra đời của Nghị quyết số 59-NQ/TW là quyết sách đột phá, đánh dấu bước ngoặt lịch sử trong tiến trình hội nhập quốc tế của đất nước, xác định hội nhập là động lực chiến lược để Việt Nam vững bước vào kỷ nguyên mới. Quan điểm xuyên suốt của Nghị quyết là: Hội nhập quốc tế là sự nghiệp của toàn dân tộc, dưới sự lãnh đạo tuyệt đối, trực tiếp và toàn diện của Đảng, sự quản lý thống nhất của Nhà nước, lấy người dân và doanh nghiệp làm trung tâm, làm chủ thể sáng tạo.",
    context: "Cục diện thế giới đang bước vào giai đoạn chuyển đổi mang tính thời đại: đa cực, đa trung tâm, cạnh tranh chiến lược gay gắt. Trong bối cảnh đó, nếu chỉ 'tham gia' hội nhập như trước đây, Việt Nam sẽ luôn đi sau luật chơi do nước khác đặt ra. Nghị quyết 59 là sự chuyển mình mang tính bước ngoặt: từ thế bị động sang tâm thế của một quốc gia tiên phong, sẵn sàng định hình cấu trúc khu vực và toàn cầu.",
      coreIdeas: [
        "Hội nhập quốc tế là sự nghiệp của toàn dân tộc, dưới sự lãnh đạo tuyệt đối của Đảng",
        "Chuyển từ 'tham gia' sang 'chủ động đóng góp, xây dựng và định hình' luật chơi quốc tế",
        "Lấy người dân và doanh nghiệp làm trung tâm, làm chủ thể sáng tạo",
        "Kết hợp chặt chẽ giữa hội nhập quốc tế và xây dựng nền kinh tế độc lập, tự chủ"
      ],
      infographicBlocks: [
        { title: "Ngoại giao Kinh tế Số", desc: "Thúc đẩy các hiệp định thương mại thế hệ mới, tham gia sâu vào chuỗi cung ứng toàn cầu." },
        { title: "Nâng tầm Vị thế", desc: "Đóng vai trò nòng cốt trong ASEAN và các tổ chức đa phương lớn của thế giới." },
        { title: "An ninh Toàn diện", desc: "Bảo vệ Tổ quốc từ sớm, từ xa thông qua các cơ chế hợp tác an ninh đa chiều." }
      ],
      goals2030: [
        { label: "Quy mô Kinh tế", value: "Top 20", description: "Nền kinh tế có quy mô thương mại hàng đầu thế giới" },
        { label: "Hội nhập Kinh tế", value: "17 FTA", description: "Khai thác hiệu quả mạng lưới Hiệp định thương mại tự do thế hệ mới" },
        { label: "Ngoại giao Cấp cao", value: "7 ĐTCLTD", description: "Đối tác chiến lược toàn diện với các cường quốc trên thế giới" },
        { label: "Tăng trưởng", value: "≥6.5%", description: "Đóng góp của hội nhập quốc tế vào tăng trưởng kinh tế bền vững" }
      ],
      vision2045: [
        "Việt Nam trở thành quốc gia phát triển, thu nhập cao, hội nhập quốc tế toàn diện và sâu rộng.",
        "Là thành viên có trách nhiệm, đóng vai trò dẫn dắt trong định hình cấu trúc an ninh - kinh tế khu vực.",
        "Sở hữu mạng lưới đối tác chiến lược và đối tác toàn diện mạnh mẽ, bền vững trên toàn cầu."
      ],
      tasks: [
        { title: "Tăng cường sự lãnh đạo của Đảng", description: "Đổi mới tư duy, nhận thức và hành động trong hội nhập quốc tế trong tình hình mới." },
        { title: "Nâng cao hiệu quả hội nhập kinh tế", description: "Phục vụ xây dựng nền kinh tế độc lập, tự chủ; đổi mới mô hình tăng trưởng, thúc đẩy chuyển đổi số." },
        { title: "Hội nhập quốc phòng, an ninh", description: "Sâu rộng, toàn diện, góp phần giữ vững môi trường hòa bình, bảo vệ Tổ quốc từ sớm, từ xa." },
        { title: "Hội nhập khoa học & công nghệ", description: "Nâng cao năng lực cạnh tranh quốc gia, mở rộng không gian phát triển bền vững." },
        { title: "Hoàn thiện thể chế & thực thi", description: "Nâng cao năng lực thực thi các cam kết, thỏa thuận quốc tế gắn với hoàn thiện chính sách." }
      ],
      newPoints: [
        "Chuyển hẳn tư duy từ 'Tham gia hội nhập' sang 'Chủ động định hình luật chơi', đóng góp xây dựng cấu trúc khu vực và toàn cầu.",
        "Xác định Hội nhập Khoa học Công nghệ và Không gian mạng là mũi nhọn mới, bên cạnh kinh tế và an ninh truyền thống.",
        "Đặt vị trí trung tâm cho người dân và doanh nghiệp trong chiến lược vươn mình ra biển lớn."
      ],
    
      quoteBlocks: [
        {
          quote: "Việt Nam không chỉ hòa mình vào dòng chảy của thế giới, mà còn phải là người góp phần khơi dòng, tạo dựng những dòng chảy mới mang lại hòa bình và thịnh vượng.",
          speaker: "Thông điệp Kỷ nguyên vươn mình",
          context: "Tư tưởng chỉ đạo chiến lược đối ngoại"
        }
      ],

    generalGoals: [
      { icon: "🕊️", title: "Hòa bình và Ổn định", desc: "Góp phần giữ vững môi trường hòa bình, ổn định, góp phần thiết thực vào phát triển và bảo vệ đất nước từ sớm, từ xa." },
      { icon: "📈", title: "Kinh tế độc lập và Bền vững", desc: "Tranh thủ tối đa các nguồn lực và điều kiện thuận lợi bên ngoài để xây dựng nền kinh tế độc lập, tự chủ, tự lực, tự cường, phát triển nhanh và bền vững." },
      { icon: "🌏", title: "Vị thế quốc tế", desc: "Tăng cường sức mạnh tổng hợp của quốc gia, nâng cao vai trò, vị thế và uy tín quốc tế của Việt Nam để phấn đấu đến giữa thế kỷ XXI, nước ta trở thành một nước phát triển, thu nhập cao theo định hướng xã hội chủ nghĩa." }
    ],
    tasksList: [
      "Tăng cường sự lãnh đạo của Đảng, đổi mới tư duy, nhận thức và hành động trong hội nhập quốc tế trong tình hình mới.",
      "Nâng cao hiệu quả hội nhập kinh tế quốc tế phục vụ xây dựng nền kinh tế độc lập, tự chủ, tự lực, tự cường, đẩy mạnh cơ cấu lại nền kinh tế, đổi mới mô hình tăng trưởng và thúc đẩy chuyển đổi số.",
      "Hội nhập quốc tế về chính trị, quốc phòng, an ninh sâu rộng, toàn diện và hiệu quả hơn, góp phần giữ vững môi trường hòa bình, ổn định, thúc đẩy phát triển kinh tế-xã hội, bảo vệ Tổ quốc từ sớm, từ xa, nâng cao tiềm lực và vị thế quốc tế của đất nước.",
      "Đẩy mạnh hội nhập quốc tế về khoa học, công nghệ và đổi mới sáng tạo, góp phần nâng cao năng lực cạnh tranh quốc gia, mở rộng không gian phát triển bền vững và hiện đại hóa đất nước.",
      "Đẩy mạnh hội nhập quốc tế về văn hóa, xã hội, du lịch, môi trường, giáo dục-đào tạo, y tế và các lĩnh vực khác.",
      "Nâng cao năng lực thực thi các cam kết, thỏa thuận quốc tế gắn với tăng cường công tác kiểm tra, giám sát thực thi và đẩy mạnh hoàn thiện thể chế, chính sách, pháp luật trong nước.",
      "Nâng cao hiệu lực, hiệu quả chỉ đạo, điều phối công tác hội nhập quốc tế; phát huy vai trò tích cực, chủ động của các địa phương."
    ],
    results: "Chưa có tài liệu chính thức về kết quả thực hiện Nghị quyết 59.",
    references: [
      "Thông tin từ hội nghị truyền đạt nghị quyết",
      "Báo điện tử Chính phủ",
      "Cổng Học viện Hành chính và Quản trị công."
    ],
          heroImage: "./images/resolutions/59/new_hero_1.jpg",
      inlineImages: [
        { src: "./images/resolutions/59/nq59_global_power_ai.jpg", caption: "Việt Nam hội nhập và vươn mình sánh vai cùng các cường quốc năm châu (Ảnh AI)", after: "intro" },
        { src: "./images/resolutions/59/nhandan_nq59_5.jpg", caption: "Chủ động tham gia kiến tạo và định hình luật chơi quốc tế", after: "coreIdeas" },
        { src: "./images/resolutions/59/global_trade_ai.jpg", caption: "Tích hợp sâu rộng vào mạng lưới thương mại toàn cầu (Ảnh AI)", after: "generalGoals" },
        { src: "./images/resolutions/59/nhandan_nq59_7.jpg", caption: "Tăng cường sức mạnh tổng hợp và năng lực cạnh tranh quốc gia", after: "tasksList" }
      ],

      highlightImages: [
        { src: "./images/resolutions/59/nhandan_nq59_9.jpg", caption: "Cảng Cát Lái - Điểm trung chuyển hàng hải quan trọng" },
        { src: "./images/resolutions/59/smart_port_ai.jpg", caption: "Hạ tầng cảng biển thông minh kết nối chuỗi cung ứng (Ảnh AI)" },
        { src: "./images/resolutions/59/nhandan_nq59_2.jpg", caption: "Hội nhập quốc tế toàn diện trong tình hình mới" },
        { src: "./images/resolutions/59/digital_diplomacy_ai.jpg", caption: "Đẩy mạnh nền ngoại giao số và công nghệ (Ảnh AI)" },
        { src: "./images/resolutions/59/nhandan_nq59_9.jpg", caption: "Nâng cao vị thế của Việt Nam trên trường quốc tế" },
        { src: "./images/resolutions/59/ecommerce_network_ai.jpg", caption: "Mở rộng mạng lưới thương mại điện tử xuyên biên giới (Ảnh AI)" }
      ]
},
  {
      id: "66",

    responsibilityTitle: "TRÁCH NHIỆM CÁN BỘ, ĐẢNG VIÊN TRƯỜNG ĐẠI HỌC CSND",
    responsibilitySubtitle: "Cụ thể hóa nghị quyết thành nhận thức, trách nhiệm và hành động trong giáo dục, đào tạo, nghiên cứu khoa học và xây dựng lực lượng CAND.",
    responsibilities: [
      { id: "01", title: "Nêu cao tinh thần thượng tôn pháp luật", content: "Gương mẫu chấp hành pháp luật, điều lệnh CAND, quy chế đào tạo và các quy định của Nhà trường.", icon: "<i class='fas fa-gavel'></i>" },
      { id: "02", title: "Cập nhật pháp luật vào giảng dạy", content: "Thường xuyên bổ sung chủ trương, chính sách và quy định pháp luật mới vào chương trình, giáo trình và bài giảng.", icon: "<i class='fas fa-balance-scale'></i>" },
      { id: "03", title: "Phát triển tư duy pháp lý", content: "Rèn luyện cho học viên khả năng phân tích, vận dụng pháp luật và giải quyết tình huống nghiệp vụ đúng quy định.", icon: "<i class='fas fa-brain'></i>" },
      { id: "04", title: "Nâng cao chất lượng nghiên cứu pháp luật", content: "Đẩy mạnh nghiên cứu, tổng kết thực tiễn và đề xuất hoàn thiện pháp luật về bảo đảm an ninh, trật tự.", icon: "<i class='fas fa-search'></i>" },
      { id: "05", title: "Xây dựng môi trường kỷ cương", content: "Gắn giáo dục pháp luật với đạo đức công vụ, trách nhiệm nghề nghiệp và xây dựng môi trường sư phạm chính quy.", icon: "<i class='fas fa-university'></i>" },
    ],    number: "66-NQ/TW",
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
    context: "Lịch sử cho thấy, mọi điểm nghẽn của sự phát triển đều bắt nguồn từ điểm nghẽn thể chế. Giai đoạn vừa qua, tình trạng 'luật khung, luật ống', luật chờ nghị định, nghị định chờ thông tư đã làm chậm nhịp độ phát triển của đất nước, gây lãng phí nguồn lực xã hội. Kỷ nguyên vươn mình đòi hỏi một hệ thống pháp luật tinh gọn, minh bạch, nơi Nhà nước đóng vai trò 'người mở đường' chứ không phải 'người gác cổng'.",
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
    newPoints: [
      "Luật chỉ quy định khung nguyên tắc, từ bỏ thói quen luật hóa chi tiết để đảm bảo tuổi thọ của đạo luật.",
      "Chuyển mạnh thẩm quyền quy định chi tiết từ Quốc hội sang Chính phủ, giao quyền mạnh mẽ cho địa phương.",
      "Thiết lập cơ chế bảo vệ cán bộ dám nghĩ, dám làm vì lợi ích chung, tránh tình trạng đùn đẩy trách nhiệm vì sợ sai."
    ],
    
    quoteBlocks: [
      { quote: "Hoàn thiện thể chế là 'đột phá của đột phá'. Pháp luật phải kiến tạo phát triển, không phải rào cản; lấy người dân và doanh nghiệp làm trung tâm.", speaker: "Tổng Bí thư Tô Lâm", context: "Phát biểu chỉ đạo về Nghị quyết 66" }
    ],
        heroImage: "./images/resolutions/66/nq66_hero_justice.jpg",
    inlineImages: [
      { src: "./images/resolutions/66/nhandan_nq66_5.jpg", caption: "Đổi mới tư duy: từ pháp luật 'quản lý' sang 'kiến tạo phát triển'", after: "coreIdeas" },
      { src: "./images/resolutions/66/nq66_transparent_law.jpg", caption: "Hệ thống pháp luật đồng bộ, minh bạch", after: "goals2030" },
      { src: "./images/resolutions/66/nq66_protect_citizen.jpg", caption: "Đổi mới cơ chế thi hành pháp luật, bảo vệ người dân", after: "tasks" }
    ],
    infographicBlocks: [
      { image: "./images/resolutions/66/nhandan_nq66_16.jpg", title: "Tháo gỡ điểm nghẽn", desc: "Loại bỏ các quy định mâu thuẫn, chồng chéo, hoàn thiện khung pháp lý đồng bộ." },
      { image: "./images/resolutions/66/nhandan_nq66_5.jpg", title: "Đột phá của đột phá", desc: "Hệ thống pháp luật chất lượng cao, tiệm cận chuẩn mực quốc tế." }
    ]
  },
  {
    id: "68",

    responsibilityTitle: "TRÁCH NHIỆM CÁN BỘ, ĐẢNG VIÊN TRƯỜNG ĐẠI HỌC CSND",
    responsibilitySubtitle: "Cụ thể hóa nghị quyết thành nhận thức, trách nhiệm và hành động trong giáo dục, đào tạo, nghiên cứu khoa học và xây dựng lực lượng CAND.",
    responsibilities: [
      { id: "01", title: "Nhận thức đúng vai trò kinh tế tư nhân", content: "Quán triệt đầy đủ quan điểm của Đảng về vai trò, vị trí của kinh tế tư nhân trong phát triển đất nước.", icon: "<i class='fas fa-lightbulb'></i>" },
      { id: "02", title: "Cập nhật nội dung đào tạo", content: "Bổ sung kiến thức về kinh tế tư nhân, môi trường kinh doanh và quản lý nhà nước vào các học phần phù hợp.", icon: "<i class='fas fa-chart-line'></i>" },
      { id: "03", title: "Nghiên cứu an ninh kinh tế", content: "Đẩy mạnh nghiên cứu các nguy cơ, phương thức vi phạm và tội phạm phát sinh trong hoạt động kinh tế tư nhân.", icon: "<i class='fas fa-search-dollar'></i>" },
      { id: "04", title: "Giáo dục tinh thần phục vụ", content: "Rèn luyện cho học viên thái độ đúng mực, trách nhiệm, không gây phiền hà đối với người dân và doanh nghiệp.", icon: "<i class='fas fa-hands-helping'></i>" },
      { id: "05", title: "Bảo đảm môi trường kinh doanh an toàn", content: "Gắn đào tạo nghiệp vụ với yêu cầu phòng ngừa tội phạm, bảo vệ quyền lợi hợp pháp và giữ vững trật tự xã hội.", icon: "<i class='fas fa-shield-alt'></i>" },
    ],    number: "68-NQ/TW",
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
    context: "Trải qua 40 năm đổi mới, quy mô của khu vực tư nhân đã lớn mạnh không ngừng, vươn lên trở thành một thế lực dẫn dắt nhiều ngành kinh tế mũi nhọn. Kỷ nguyên mới không thể thiếu sự đóng góp của các 'sếu đầu đàn' tư nhân. Nghị quyết 68 đánh dấu sự thừa nhận cao nhất của Đảng, cởi trói thể chế, mở ra không gian phát triển không giới hạn cho doanh nghiệp Việt trên sân chơi toàn cầu.",
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
    newPoints: [
      "Lần đầu tiên sử dụng cụm từ 'động lực quan trọng nhất' (thay vì chỉ 'là một động lực').",
      "Chuyển hẳn phương thức quản lý nhà nước từ 'tiền kiểm' (cấp phép) sang 'hậu kiểm' (giám sát chuẩn mực).",
      "Khẳng định rõ nguyên tắc: Không hình sự hóa các quan hệ kinh tế dân sự, tạo tâm lý an tâm đầu tư."
    ],
    
    quoteBlocks: [
      { quote: "Kinh tế tư nhân không chỉ là 'bộ phận quan trọng' mà phải là 'động lực quan trọng nhất', là 'lực lượng tiên phong' trong phát triển kinh tế đất nước.", speaker: "Thông điệp cốt lõi", context: "Nghị quyết 68-NQ/TW – Bước ngoặt lịch sử" }
    ],
        heroImage: "./images/resolutions/68/nq68_hero_private_economy.jpg",
    inlineImages: [
      { src: "./images/resolutions/68/ai_startup.jpg", caption: "Tinh thần khởi nghiệp đổi mới sáng tạo vươn tầm toàn cầu", after: "coreIdeas" },
      { src: "./images/resolutions/68/2.jpg", caption: "Kinh tế tư nhân tạo ra hàng triệu việc làm và đóng góp lớn vào GDP", after: "goals2030" },
      { src: "./images/resolutions/68/3.jpg", caption: "Hỗ trợ doanh nghiệp tư nhân tiếp cận vốn và mở rộng kinh doanh", after: "vision2045" },
      { src: "./images/resolutions/68/4.jpg", caption: "Cải thiện môi trường kinh doanh, bảo vệ quyền tài sản", after: "tasks" }
    ],
    infographicBlocks: [
      { image: "./images/resolutions/68/nq68_vietnam_fdi_economy.jpg", title: "Thu hút FDI chất lượng cao", desc: "Xây dựng môi trường kinh doanh thuận lợi, nền kinh tế năng động thu hút dòng vốn toàn cầu." },
      { image: "./images/resolutions/68/5.jpg", title: "Cải cách thủ tục hành chính", desc: "Chuyển từ tiền kiểm sang hậu kiểm, cắt giảm ít nhất 30% thời gian xử lý." }
    ]
  },
  {
    id: "70",

    responsibilityTitle: "TRÁCH NHIỆM CÁN BỘ, ĐẢNG VIÊN TRƯỜNG ĐẠI HỌC CSND",
    responsibilitySubtitle: "Cụ thể hóa nghị quyết thành nhận thức, trách nhiệm và hành động trong giáo dục, đào tạo, nghiên cứu khoa học và xây dựng lực lượng CAND.",
    responsibilities: [
      { id: "01", title: "Nâng cao nhận thức về an ninh năng lượng", content: "Xác định an ninh năng lượng là bộ phận quan trọng của an ninh quốc gia và phát triển bền vững.", icon: "<i class='fas fa-bolt'></i>" },
      { id: "02", title: "Bổ sung kiến thức vào đào tạo", content: "Lồng ghép nội dung an ninh năng lượng, hạ tầng trọng yếu và an ninh phi truyền thống vào bài giảng phù hợp.", icon: "<i class='fas fa-layer-group'></i>" },
      { id: "03", title: "Nghiên cứu nguy cơ mất an ninh", content: "Chủ động nghiên cứu các nguy cơ tội phạm, phá hoại và mất an toàn đối với công trình, hệ thống năng lượng.", icon: "<i class='fas fa-exclamation-triangle'></i>" },
      { id: "04", title: "Thực hành tiết kiệm, hiệu quả", content: "Gương mẫu sử dụng điện, nhiên liệu và tài sản công tiết kiệm, an toàn trong học tập và công tác.", icon: "<i class='fas fa-leaf'></i>" },
      { id: "05", title: "Chuẩn bị nguồn nhân lực CAND", content: "Trang bị cho học viên kiến thức và kỹ năng bảo vệ hạ tầng năng lượng, xử lý các tình huống an ninh phức tạp.", icon: "<i class='fas fa-hard-hat'></i>" },
    ],    number: "70-NQ/TW",
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
    context: "An ninh năng lượng là huyết mạch của nền kinh tế. Khi thế giới đối mặt với khủng hoảng năng lượng và cam kết giảm phát thải toàn cầu (COP28), Việt Nam không thể đứng ngoài cuộc. Nghị quyết 70 ra đời không chỉ để giải bài toán thiếu điện cục bộ, mà là bản quy hoạch chiến lược chuyển đổi xanh, hướng tới mục tiêu Net Zero vào năm 2050.",
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
    newPoints: [
      "Lần đầu tiên đưa mục tiêu Net Zero (Phát thải ròng bằng 0) vào Nghị quyết cấp Trung ương.",
      "Khẳng định chuyển dịch năng lượng xanh là xu thế không thể đảo ngược, biến thách thức thành cơ hội.",
      "Khuyến khích mạnh mẽ kinh tế tư nhân tham gia đầu tư lưới điện truyền tải (phá bỏ thế độc quyền trước đây)."
    ],
    
    quoteBlocks: [
      { quote: "Không có năng lượng thì không có phát triển. An ninh năng lượng là trụ cột không thể thiếu cho mọi mục tiêu kinh tế – xã hội.", speaker: "Thông điệp cốt lõi", context: "Nghị quyết 70-NQ/TW" }
    ],
        heroImage: "./images/resolutions/70/ai_energy.jpg",
    inlineImages: [
      { src: "./images/resolutions/70/real_1.jpg", caption: "Mô hình năng lượng xanh và bền vững trong tương lai", after: "coreIdeas" },
      { src: "./images/resolutions/70/2.jpg", caption: "Chuyển dịch cơ cấu năng lượng gắn với bảo vệ môi trường", after: "goals2030" },
      { src: "./images/resolutions/70/nhandan_nq70_26.jpg", caption: "Đẩy mạnh phát triển năng lượng tái tạo, điện gió và điện mặt trời", after: "vision2045" }
    ],
    infographicBlocks: [
      { image: "./images/resolutions/70/nq70_energy_infrastructure.jpg", title: "Đầu tư hạ tầng năng lượng", desc: "Thu hút mọi nguồn lực xã hội vào đầu tư phát triển kết cấu hạ tầng năng lượng đồng bộ." },
      { image: "./images/resolutions/70/nq70_energy_efficiency.jpg", title: "Tiết kiệm, hiệu quả", desc: "Thúc đẩy sử dụng năng lượng tiết kiệm, hiệu quả như một quốc sách." }
    ]
  },
  {
    id: "71",

    responsibilityTitle: "TRÁCH NHIỆM CÁN BỘ, ĐẢNG VIÊN TRƯỜNG ĐẠI HỌC CSND",
    responsibilitySubtitle: "Cụ thể hóa nghị quyết thành nhận thức, trách nhiệm và hành động trong giáo dục, đào tạo, nghiên cứu khoa học và xây dựng lực lượng CAND.",
    responsibilities: [
      { id: "01", title: "Đổi mới phương pháp giảng dạy", content: "Phát huy vai trò người học, tăng thực hành, tương tác, xử lý tình huống và gắn lý luận với thực tiễn công tác.", icon: "<i class='fas fa-chalkboard-teacher'></i>" },
      { id: "02", title: "Hoàn thiện chương trình đào tạo", content: "Thường xuyên cập nhật chương trình, giáo trình theo yêu cầu xây dựng lực lượng CAND chính quy, tinh nhuệ, hiện đại.", icon: "<i class='fas fa-book'></i>" },
      { id: "03", title: "Ứng dụng công nghệ giáo dục", content: "Khai thác hiệu quả bảng tương tác, học liệu số, trí tuệ nhân tạo và các nền tảng hỗ trợ dạy học.", icon: "<i class='fas fa-laptop'></i>" },
      { id: "04", title: "Nâng cao chất lượng đội ngũ", content: "Chủ động tự học, nghiên cứu, nâng cao trình độ chuyên môn, ngoại ngữ, công nghệ và năng lực sư phạm.", icon: "<i class='fas fa-user-graduate'></i>" },
      { id: "05", title: "Xây dựng văn hóa học tập suốt đời", content: "Tạo môi trường học tập kỷ luật, sáng tạo, nhân văn; khuyến khích cán bộ, giảng viên và học viên phát triển toàn diện.", icon: "<i class='fas fa-infinity'></i>" },
    ],    number: "71-NQ/TW",
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
    context: "Kỷ nguyên số và Trí tuệ nhân tạo đang định hình lại toàn bộ cấu trúc việc làm và tri thức nhân loại. Nếu tiếp tục duy trì phương pháp giáo dục truyền thống nặng về nhồi nhét, Việt Nam sẽ tụt hậu trong cuộc đua nhân lực toàn cầu. Nghị quyết 71 xác định giáo dục là đột phá nền tảng, tạo ra 'chất xám' – nguồn tài nguyên vô tận duy nhất để đất nước vươn mình.",
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
    newPoints: [
      "Chuyển triệt để từ giáo dục 'nhồi nhét kiến thức' sang giáo dục 'thực học, thực tài', tập trung phát triển năng lực và phẩm chất.",
      "Lần đầu tiên đặt mục tiêu định lượng đưa 5-7 trường đại học vào top 500 thế giới.",
      "Xác định rõ ràng: Tự chủ đại học phải đi liền với trách nhiệm giải trình và hệ thống kiểm định chất lượng quốc tế."
    ],
    
    quoteBlocks: [
      { quote: "Đột phá giáo dục là đột phá nền tảng – tạo ra con người, nhân lực và trí tuệ cho mọi đột phá khác của đất nước trong kỷ nguyên mới.", speaker: "Thông điệp cốt lõi", context: "Nghị quyết 71-NQ/TW" }
    ],
        heroImage: "./images/resolutions/71/nhandan_nq71_35.jpg",
    inlineImages: [
      { src: "./images/resolutions/71/nhandan_nq71_32.jpg", caption: "Giáo dục phổ thông chú trọng phát triển toàn diện, khơi dậy đam mê học tập", after: "summary" },
      { src: "./images/resolutions/71/znews_1.jpg", caption: "Niềm vui của thí sinh sau kỳ thi tốt nghiệp THPT", after: "coreIdeas" },
      { src: "./images/resolutions/71/nhandan_nq71_38.jpg", caption: "Tích hợp giáo dục STEM và kỹ năng số trong nhà trường", after: "goals2030" },
      { src: "./images/resolutions/71/znews_4.jpg", caption: "Học sinh tự tin hướng tới tương lai", after: "vision2045" },
      { src: "./images/resolutions/71/nhandan_nq71_41.jpg", caption: "Đầu tư cơ sở vật chất, công nghệ giảng dạy hiện đại", after: "tasks" },
      { src: "./images/resolutions/71/znews_5.jpg", caption: "Đột phá giáo dục là nền tảng cho sự phát triển", after: "quoteBlocks" }
    ],
    infographicBlocks: [
      { image: "./images/resolutions/71/thuc_hoc_thuc_tai.jpg", title: "Thực học, thực tài", desc: "Chuyển mạnh từ truyền thụ kiến thức sang phát triển toàn diện năng lực và phẩm chất." },
      { image: "./images/resolutions/71/5.jpg", title: "Xã hội hóa giáo dục", desc: "Tạo bình đẳng giữa công và tư, thu hút nguồn lực xã hội đầu tư cho giáo dục chất lượng cao." }
    ]
  },
  {
    id: "72",

    responsibilityTitle: "TRÁCH NHIỆM CÁN BỘ, ĐẢNG VIÊN TRƯỜNG ĐẠI HỌC CSND",
    responsibilitySubtitle: "Cụ thể hóa nghị quyết thành nhận thức, trách nhiệm và hành động trong giáo dục, đào tạo, nghiên cứu khoa học và xây dựng lực lượng CAND.",
    responsibilities: [
      { id: "01", title: "Nâng cao nhận thức về an ninh con người", content: "Gắn nhiệm vụ bảo vệ sức khỏe Nhân dân với bảo đảm an ninh, trật tự và ổn định xã hội.", icon: "<i class='fas fa-heartbeat'></i>" },
      { id: "02", title: "Giáo dục tinh thần vì Nhân dân phục vụ", content: "Bồi dưỡng cho học viên thái độ nhân văn, gần dân, trọng dân và trách nhiệm hỗ trợ Nhân dân trong khó khăn.", icon: "<i class='fas fa-hands-helping'></i>" },
      { id: "03", title: "Xây dựng môi trường giáo dục lành mạnh", content: "Duy trì điều kiện học tập, công tác an toàn; quan tâm sức khỏe thể chất và tinh thần của cán bộ, học viên.", icon: "<i class='fas fa-spa'></i>" },
      { id: "04", title: "Nghiên cứu các vấn đề liên quan sức khỏe", content: "Chủ động nghiên cứu tội phạm, vi phạm pháp luật và nguy cơ an ninh phát sinh trong lĩnh vực y tế, sức khỏe.", icon: "<i class='fas fa-microscope'></i>" },
      { id: "05", title: "Rèn luyện lối sống khoa học", content: "Gương mẫu chấp hành quy định phòng bệnh, rèn luyện thể lực và xây dựng lối sống kỷ luật, lành mạnh.", icon: "<i class='fas fa-running'></i>" },
    ],    number: "72-NQ/TW",
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
    context: "Sau đại dịch COVID-19, những lỗ hổng của hệ thống y tế toàn cầu và quốc gia đã bộc lộ rõ rệt. Nhu cầu chăm sóc sức khỏe của nhân dân ngày càng cao trong bối cảnh già hóa dân số nhanh và gánh nặng bệnh tật kép. Nghị quyết 72 khẳng định đầu tư cho y tế không phải là tiêu sản, mà là khoản đầu tư chiến lược cho sự trường tồn của giống nòi và sức mạnh quốc gia.",
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
    newPoints: [
      "Khẳng định rõ: Đầu tư cho y tế là đầu tư cho phát triển, từ bỏ tư duy coi y tế là lĩnh vực tiêu tốn ngân sách.",
      "Chuyển hướng trọng tâm chiến lược từ 'điều trị bệnh' sang 'dự phòng và chăm sóc sức khỏe ban đầu'.",
      "Xác lập cơ chế bảo vệ, tôn vinh và đãi ngộ đặc thù xứng đáng cho nhân viên y tế."
    ],
    
    quoteBlocks: [
      { quote: "Sức khỏe nhân dân là vốn quý nhất, là nền tảng của hạnh phúc và sức mạnh quốc gia. Đầu tư cho sức khỏe là đầu tư cho phát triển.", speaker: "Thông điệp cốt lõi", context: "Nghị quyết 72-NQ/TW" }
    ],
        heroImage: "./images/resolutions/72/nhandan_nq72_27.jpg",
    inlineImages: [
      { src: "./images/resolutions/72/nhandan_nq72_30.jpg", caption: "Đẩy mạnh y tế dự phòng, chăm sóc sức khỏe ban đầu toàn dân", after: "summary" },
      { src: "./images/resolutions/72/y_te_ky_thuat_cao.jpg", caption: "Phát triển y tế kỹ thuật cao, ngang tầm khu vực", after: "coreIdeas" },
      { src: "./images/resolutions/72/nhandan_nq72_33.jpg", caption: "Bảo hiểm y tế toàn dân, không ai bị bỏ lại phía sau", after: "goals2030" },
      { src: "./images/resolutions/72/chuyen_doi_so.webp", caption: "Đổi mới số toàn diện: Hồ sơ sức khỏe điện tử", after: "vision2045" },
      { src: "./images/resolutions/72/nhandan_nq72_36.jpg", caption: "Bảo vệ, tôn vinh và đãi ngộ xứng đáng lực lượng y tế", after: "tasks" },
      { src: "./images/resolutions/72/nhandan_nq72_39.jpg", caption: "Sức khỏe nhân dân là nền tảng sức mạnh quốc gia", after: "quoteBlocks" }
    ],
    infographicBlocks: [
      { image: "./images/resolutions/72/nhandan_nq72_30.jpg", title: "Phòng bệnh hơn chữa bệnh", desc: "Chuyển trọng tâm từ điều trị sang dự phòng và nâng cao sức khỏe người dân." },
      { image: "./images/resolutions/72/real_3.jpg", title: "Đãi ngộ y bác sĩ", desc: "Cơ chế chính sách đặc thù bảo vệ, tôn vinh và đãi ngộ xứng đáng nhân viên y tế." }
    ]
  },
  {
    id: "79",

    responsibilityTitle: "TRÁCH NHIỆM CÁN BỘ, ĐẢNG VIÊN TRƯỜNG ĐẠI HỌC CSND",
    responsibilitySubtitle: "Cụ thể hóa nghị quyết thành nhận thức, trách nhiệm và hành động trong giáo dục, đào tạo, nghiên cứu khoa học và xây dựng lực lượng CAND.",
    responsibilities: [
      { id: "01", title: "Nhận thức đúng vai trò kinh tế nhà nước", content: "Quán triệt quan điểm của Đảng về vai trò chủ đạo của kinh tế nhà nước trong nền kinh tế quốc dân.", icon: "<i class='fas fa-building'></i>" },
      { id: "02", title: "Đổi mới nội dung giảng dạy", content: "Gắn kiến thức kinh tế chính trị, quản lý nhà nước và pháp luật với thực tiễn phát triển kinh tế nhà nước.", icon: "<i class='fas fa-chalkboard'></i>" },
      { id: "03", title: "Nghiên cứu bảo vệ an ninh kinh tế", content: "Nhận diện nguy cơ tội phạm, thất thoát, tham nhũng và các hành vi xâm phạm tài sản nhà nước.", icon: "<i class='fas fa-search-dollar'></i>" },
      { id: "04", title: "Giáo dục trách nhiệm bảo vệ tài sản công", content: "Gương mẫu thực hành tiết kiệm, chống lãng phí, sử dụng đúng mục đích và hiệu quả nguồn lực được giao.", icon: "<i class='fas fa-box-open'></i>" },
      { id: "05", title: "Đào tạo cán bộ có năng lực tổng hợp", content: "Trang bị cho học viên kiến thức kinh tế, pháp luật và nghiệp vụ phục vụ nhiệm vụ bảo đảm an ninh kinh tế.", icon: "<i class='fas fa-user-tie'></i>" },
    ],    number: "79-NQ/TW",
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
    context: "Doanh nghiệp Nhà nước (DNNN) từng là 'anh cả đỏ' của nền kinh tế, nhưng thời gian qua đã bộc lộ một số yếu kém, thất thoát, lãng phí. Trong bối cảnh nguồn lực quốc gia có hạn, Nghị quyết 79 như một cuộc 'đại phẫu' nhằm định vị lại vai trò của DNNN: chỉ giữ những lĩnh vực then chốt, rút khỏi những nơi tư nhân làm tốt hơn, bảo đảm kinh tế nhà nước thực sự là công cụ điều tiết vĩ mô đắc lực.",
    coreIdeas: [
      "Kinh tế nhà nước giữ vai trò chủ đạo trong điều tiết kinh tế vĩ mô, ổn định xã hội",
      "DNNN phải hoạt động hiệu quả, cạnh tranh bình đẳng – không thể thua lỗ triền miên",
      "Tập trung vào lĩnh vực then chốt: an ninh quốc phòng, hạ tầng chiến lược, tài nguyên quốc gia",
      "Đẩy mạnh cổ phần hóa, thoái vốn nhà nước tại các DN không cần nắm giữ",
      "Chống thất thoát, lãng phí tài sản nhà nước; xử lý nghiêm sai phạm trong DNNN"
    ],
    goals2030: [
      { label: "Hiệu quả DNNN", value: "Top ASEAN", description: "Hiệu quả hoạt động DNNN đạt mức ngang tầm các nước dẫn đầu ASEAN" },
      { label: "Cổ phần hóa", value: "100%", description: "Hoàn thành 100% mục tiêu cổ phần hóa DNNN theo danh mục Chính phủ phê duyệt" }
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
    newPoints: [
      "Thừa nhận thẳng thắn: Không cần DNNN hiện diện ở mọi ngành nghề, chỉ giữ lại các lĩnh vực cốt lõi (hạ tầng chiến lược, an ninh quốc phòng).",
      "Tách bạch triệt để chức năng chủ sở hữu tài sản nhà nước và chức năng quản lý, điều hành kinh doanh.",
      "Lấy 'Hiệu quả hoạt động ngang tầm ASEAN' làm thước đo bắt buộc, xóa bỏ tư duy bao cấp, bù lỗ."
    ],
    
    quoteBlocks: [
      { quote: "Kinh tế nhà nước giữ vai trò chủ đạo, là công cụ, lực lượng vật chất quan trọng để Nhà nước điều tiết kinh tế, ổn định kinh tế vĩ mô.", speaker: "Thông điệp cốt lõi", context: "Nghị quyết 79-NQ/TW" }
    ],
        heroImage: "./images/resolutions/79/nhandan_nq79_17.jpg",
    inlineImages: [
      { src: "./images/resolutions/79/nhandan_nq79_7.jpg", caption: "Phát huy vai trò chủ đạo của kinh tế nhà nước", after: "summary" },
      { src: "./images/resolutions/79/real_1.jpg", caption: "Kinh tế nhà nước giữ vai trò chủ đạo", after: "coreIdeas" },
      { src: "./images/resolutions/79/nhandan_nq79_18.jpg", caption: "Tái cơ cấu, nâng cao hiệu quả hoạt động của DNNN", after: "goals2030" },
      { src: "./images/resolutions/79/real_2.jpg", caption: "Doanh nghiệp nhà nước dẫn dắt trong lĩnh vực then chốt", after: "vision2045" },
      { src: "./images/resolutions/79/nhandan_nq79_19.jpg", caption: "Đẩy mạnh cổ phần hóa, thoái vốn tại các lĩnh vực Nhà nước không cần nắm giữ", after: "tasks" },
      { src: "./images/resolutions/79/nhandan_nq79_20.jpg", caption: "Đổi mới quản trị doanh nghiệp nhà nước theo chuẩn mực quốc tế", after: "quoteBlocks" }
    ],
    infographicBlocks: [
      { image: "./images/resolutions/79/nhandan_nq79_21.jpg", title: "Mở đường và kiến tạo", desc: "DNNN tập trung vào các lĩnh vực then chốt, tạo động lực phát triển kinh tế vĩ mô." },
      { image: "./images/resolutions/79/luc_luong_nong_cot.jpg", title: "Lực lượng nòng cốt", desc: "Nhà nước quản lý linh hoạt theo cơ chế thị trường, nâng tầm các tập đoàn kinh tế Nhà nước." }
    ]
  },
  {
    id: "80",

    responsibilityTitle: "TRÁCH NHIỆM CÁN BỘ, ĐẢNG VIÊN TRƯỜNG ĐẠI HỌC CSND",
    responsibilitySubtitle: "Cụ thể hóa nghị quyết thành nhận thức, trách nhiệm và hành động trong giáo dục, đào tạo, nghiên cứu khoa học và xây dựng lực lượng CAND.",
    responsibilities: [
      { id: "01", title: "Giữ gìn bản sắc và truyền thống", content: "Gương mẫu gìn giữ giá trị văn hóa dân tộc, truyền thống CAND và truyền thống của Trường Đại học CSND.", icon: "<i class='fas fa-landmark'></i>" },
      { id: "02", title: "Xây dựng văn hóa học đường", content: "Thực hiện chuẩn mực giao tiếp, ứng xử, kỷ luật và trách nhiệm trong môi trường giáo dục CAND.", icon: "<i class='fas fa-users'></i>" },
      { id: "03", title: "Đưa văn hóa vào giáo dục, đào tạo", content: "Lồng ghép giá trị văn hóa Việt Nam, tư tưởng Hồ Chí Minh và đạo đức cách mạng vào nội dung giảng dạy.", icon: "<i class='fas fa-book-reader'></i>" },
      { id: "04", title: "Phát triển môi trường văn hóa số", content: "Lan tỏa nội dung tích cực, ứng xử có văn hóa và chủ động phòng ngừa sản phẩm độc hại trên không gian mạng.", icon: "<i class='fas fa-wifi'></i>" },
      { id: "05", title: "Đào tạo người cán bộ Cảnh sát toàn diện", content: "Góp phần hình thành người sĩ quan Cảnh sát có bản lĩnh, tri thức, nhân cách và tinh thần phụng sự Nhân dân.", icon: "<i class='fas fa-star'></i>" },
    ],    number: "80-NQ/TW",
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
    context: "Sự xâm lăng văn hóa qua các nền tảng số xuyên biên giới đang diễn ra từng phút từng giây. Nếu không giữ được bản sắc, chúng ta sẽ 'hòa tan' trong biển lớn toàn cầu hóa. Nghị quyết 80 ra đời với thông điệp mạnh mẽ: Văn hóa còn thì dân tộc còn. Không chỉ dừng lại ở ca múa nhạc truyền thống, văn hóa phải được nâng tầm thành 'sức mạnh mềm' quốc gia và là một ngành công nghiệp tỷ đô.",
    coreIdeas: [
      "Văn hóa là nền tảng tinh thần, là sức mạnh nội sinh, đặt ngang hàng kinh tế, chính trị, xã hội",
      "Xây dựng con người Việt Nam: yêu nước, nhân ái, nghĩa tình, trung thực, đoàn kết, sáng tạo",
      "Bảo tồn và phát huy bản sắc văn hóa dân tộc trong hội nhập quốc tế; không đánh mất mình",
      "Phát triển công nghiệp văn hóa thành ngành kinh tế mũi nhọn: phim, âm nhạc, thời trang, ẩm thực",
      "Chống suy thoái đạo đức, lối sống; bảo vệ văn hóa trước tác động tiêu cực của toàn cầu hóa số"
    ],
    goals2030: [
      { label: "Công nghiệp văn hóa/GDP", value: "7–8%", description: "Đóng góp của công nghiệp văn hóa vào tổng GDP quốc gia" },
      { label: "Di sản UNESCO", value: "Tăng 20%", description: "Bổ sung thêm 20% số lượng di sản văn hóa được UNESCO công nhận" },
      { label: "Doanh thu du lịch", value: "Tăng 200%", description: "Doanh thu từ du lịch văn hóa tăng trưởng vượt bậc so với 2025" }
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
    newPoints: [
      "Chính thức đặt mục tiêu phát triển 'Công nghiệp văn hóa' thành một ngành kinh tế mũi nhọn (chiếm 7-8% GDP).",
      "Nhấn mạnh nhiệm vụ bảo vệ 'Biên giới văn hóa trên không gian mạng' trước sự xâm lăng của văn hóa ngoại lai.",
      "Lấy hệ giá trị quốc gia, hệ giá trị gia đình và chuẩn mực con người Việt Nam làm thước đo cho sự phát triển xã hội."
    ],
    
    quoteBlocks: [
      { quote: "Văn hóa là hồn cốt dân tộc. Văn hóa còn thì dân tộc còn. Phải đặt văn hóa ngang hàng với kinh tế, chính trị, xã hội.", speaker: "Tổng Bí thư Nguyễn Phú Trọng", context: "Phát biểu tại Hội nghị Văn hóa toàn quốc năm 2021" }
    ],
        heroImage: "./images/resolutions/80/nhandan_nq80_36.jpg",
    inlineImages: [
      { src: "./images/resolutions/80/nhandan_nq80_3.jpg", caption: "Bản sắc văn hóa Việt Nam trường tồn và lan tỏa", after: "summary" },
      { src: "./images/resolutions/80/nhandan_nq80_4.jpg", caption: "Phát triển công nghiệp văn hóa thành ngành kinh tế mũi nhọn", after: "coreIdeas" },
      { src: "./images/resolutions/80/nhandan_nq80_5.jpg", caption: "Đóng góp của công nghiệp văn hóa vào GDP", after: "goals2030" },
      { src: "./images/resolutions/80/nhandan_nq80_11.jpg", caption: "Bảo tồn và phát huy di sản văn hóa", after: "vision2045" }
    ],
    infographicBlocks: [
      { image: "./images/resolutions/80/nhandan_nq80_7.jpg", title: "Hệ giá trị con người", desc: "Xây dựng con người Việt Nam thời kỳ đổi mới gắn với hệ giá trị quốc gia." },
      { image: "./images/resolutions/80/nhandan_nq80_8.jpg", title: "Sức mạnh mềm", desc: "Bảo tồn, phát huy các di sản văn hóa, đưa văn hóa Việt vươn tầm quốc tế." },
      { image: "./images/resolutions/80/nhandan_nq80_9.jpg", title: "Công nghiệp văn hóa", desc: "Phát triển các ngành công nghiệp văn hóa như điện ảnh, nghệ thuật biểu diễn, và du lịch văn hóa." }
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
