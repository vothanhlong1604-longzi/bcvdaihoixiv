/**
 * Dữ liệu Dữ kiện Lõi (Core Facts Database) - Đại hội XIV
 * Được ưu tiên truy xuất trực tiếp để đảm bảo tính chính xác tuyệt đối.
 */

const CONGRESS_FACTS = {
  time: {
    duration: "Từ ngày 19 đến ngày 25 tháng 01 năm 2026",
    opening: "Ngày 20 tháng 01 năm 2026 (Khai mạc chính thức)",
    year: "2026"
  },
  location: {
    name: "Trung tâm Hội nghị Quốc gia",
    city: "Thủ đô Hà Nội"
  },
  scale: {
    delegates: "1.586 đại biểu",
    partyMembers: "Hơn 5,6 triệu đảng viên"
  },
  resolutions: [
    {
      id: "57",
      number: "57-NQ/TW",
      title: "Phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số quốc gia",
      summary: "Xác định KH&CN, ĐMST và chuyển đổi số là đột phá chiến lược hàng đầu, làm động lực phát triển lực lượng sản xuất hiện đại và kinh tế số."
    },
    {
      id: "59",
      number: "59-NQ/TW",
      title: "Hội nhập quốc tế và ngoại giao kinh tế trong kỷ nguyên mới",
      summary: "Đẩy mạnh hội nhập quốc tế toàn diện, sâu rộng, trọng tâm là ngoại giao kinh tế phục vụ phát triển bền vững và nâng cao vị thế đất nước."
    },
    {
      id: "66",
      number: "66-NQ/TW",
      title: "Tiếp tục xây dựng và hoàn thiện Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam",
      summary: "Trọng tâm là cải cách hành chính, cải cách tư pháp, hoàn thiện hệ thống pháp luật đồng bộ, hiện đại và bảo vệ quyền con người, quyền công dân."
    },
    {
      id: "68",
      number: "68-NQ/TW",
      title: "Phát triển kinh tế tư nhân trở thành một động lực quan trọng của nền kinh tế",
      summary: "Tạo mọi điều kiện thuận lợi để kinh tế tư nhân phát triển nhanh, bền vững, đóng góp lớn hơn vào GDP quốc gia."
    },
    {
      id: "70",
      number: "70-NQ/TW",
      title: "Phát triển năng lượng quốc gia và hạ tầng kỹ thuật đồng bộ",
      summary: "Đảm bảo an ninh năng lượng, chuyển dịch năng lượng xanh, hiện đại hóa hạ tầng giao thông, viễn thông và logistics."
    },
    {
      id: "71",
      number: "71-NQ/TW",
      title: "Đổi mới căn bản, toàn diện giáo dục và đào tạo trong kỷ nguyên mới",
      summary: "Xây dựng hệ thống giáo dục hiện đại, phát triển kỹ năng số, đổi mới chương trình đào tạo trường đại học và nâng cao chất lượng nguồn nhân lực."
    },
    {
      id: "72",
      number: "72-NQ/TW",
      title: "Phát triển hệ thống y tế và chăm sóc sức khỏe nhân dân",
      summary: "Hiện đại hóa y tế cơ sở, nâng cao chất lượng dịch vụ khám chữa bệnh, tăng tỷ lệ bác sĩ trên vạn dân và bao phủ bảo hiểm y tế toàn dân."
    },
    {
      id: "79",
      number: "79-NQ/TW",
      title: "Nâng cao hiệu quả quản lý và phát triển doanh nghiệp nhà nước",
      summary: "Đổi mới quản trị, cơ cấu lại doanh nghiệp nhà nước tập trung vào các lĩnh vực then chốt, công nghệ lõi và vị trí dẫn đầu."
    },
    {
      id: "80",
      number: "80-NQ/TW",
      title: "Xây dựng và phát triển văn hóa, con người Việt Nam đáp ứng yêu cầu phát triển bền vững",
      summary: "Chấn hưng văn hóa nước nhà, khơi dậy khát vọng phát triển, tinh thần yêu nước, đoàn kết và phát huy giá trị con người Việt Nam."
    }
  ]
};

// Export to window object for global availability in client browser
if (typeof window !== 'undefined') {
  window.CONGRESS_FACTS = CONGRESS_FACTS;
}
