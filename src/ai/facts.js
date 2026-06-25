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
  ],

  baoCaoChinhTri: {
    source: "Báo cáo chính trị của BCH TW Đảng khoá XIII tại Đại hội XIV",
    chuDe: "Dưới lá cờ vẻ vang của Đảng, chung sức, đồng lòng thực hiện thắng lợi các mục tiêu phát triển đất nước đến năm 2030",
    phuongCham: "Đoàn kết - Dân chủ - Kỷ cương - Đột phá - Phát triển",
    kinhTe2025: {
      gdp: "Trên 514 tỉ USD",
      gdpRank: "Thứ 32 thế giới",
      gdpGrowth: "Gấp 1,48 lần so với năm 2020",
      gdpPerCapita: "5.026 USD",
      tangtruong2025: "8,02%",
      tangtruongBinhQuan2021_2025: "Khoảng 6,2%/năm",
      tfp: "Khoảng 47%",
      doThiHoa: "45%"
    },
    xaHoi2025: {
      hdi: "0,766 điểm (tăng 14 bậc)",
      hdiGroup: "Nhóm nước phát triển con người cao",
      hanhPhuc: "Thứ 46/143 quốc gia (tăng 33 bậc so với 2021)",
      bhyt: "95,2%",
      tuoiTho: "74,8 năm",
      hoDaNgheo: "1,3% (giảm từ 4,2% năm 2022)"
    },
    mucTieu2030: {
      mucTieu: "Trở thành nước đang phát triển có công nghiệp hiện đại, thu nhập trung bình cao",
      tang_truong_gdp: "Từ 10%/năm trở lên",
      gdp_dau_nguoi: "Khoảng 8.500 USD",
      kinh_te_so: "Khoảng 30% GDP",
      tfp: "Trên 55%",
      nang_suat_lao_dong: "Khoảng 8,5%/năm",
      do_thi_hoa: "Trên 50%",
      hdi: "Khoảng 0,8",
      hanh_phuc: "Top 40 quốc gia hạnh phúc nhất",
      phat_thai_ron_net_zero: "Bằng 0 vào năm 2050"
    },
    mucTieu2045: "Trở thành nước phát triển, thu nhập cao theo định hướng xã hội chủ nghĩa",
    cachMangBoMay: {
      giamDauMoiTW: "34,9%",
      giamTinh: "46%",
      giamXa: "66,9%",
      moHinh: "Lần đầu tiên kể từ 1945 không tổ chức cấp huyện; chính quyền địa phương 2 cấp (Tỉnh và Xã)"
    },
    dotPhaChienLuoc: [
      "Đột phá về thể chế phát triển — hoàn thiện đồng bộ thể chế; thúc đẩy đổi mới sáng tạo",
      "Đột phá về nguồn nhân lực — chất lượng cao, thu hút nhân tài, bảo vệ cán bộ dám làm",
      "Đột phá về kết cấu hạ tầng — giao thông đa phương thức, hạ tầng số, hạ tầng xanh"
    ],
    nhiemVuTrongTam: [
      "Xây dựng đồng bộ thể chế phát triển, tháo gỡ nút thắt, điểm nghẽn",
      "Đẩy mạnh xây dựng, chỉnh đốn Đảng và hệ thống chính trị",
      "Phát triển nền kinh tế thị trường định hướng XHCN; lấy khoa học, công nghệ làm động lực",
      "Triển khai đột phá khoa học, công nghệ, đổi mới sáng tạo — ưu tiên chip bán dẫn, AI",
      "Phát triển nguồn lực con người, văn hoá; bảo đảm an sinh, an ninh, an toàn",
      "Xây dựng Quân đội, Công an cách mạng, chính quy, tinh nhuệ, hiện đại"
    ]
  },

  dieuleDang: {
    source: "Báo cáo tổng kết 15 năm thi hành Điều lệ Đảng (2011–2025)",
    tongSoDangVien: "5.622.463 (tính đến 31/8/2025)",
    ketNap3NhiemKy: "2.673.566 đảng viên (nhiệm kỳ XI, XII, XIII)",
    tyLeNu: "45,79% trong số đảng viên mới kết nạp",
    tyLeDoanVien: "81,65% đảng viên mới kết nạp là đoàn viên",
    toChucCoSo: "50.090 đảng bộ, chi bộ cơ sở (31/8/2025)",
    chiBoTrucThuoc: "210.627 chi bộ trực thuộc",
    vanBanCuTheHoa: "183.353 văn bản (từ 2016 đến tháng 6/2024)",
    kyLuat: {
      toChucDang: "4.999 tổ chức đảng bị kỷ luật (3 nhiệm kỳ)",
      dangVien: "258.507 đảng viên bị kỷ luật (3 nhiệm kỳ)"
    },
    dinhHuongSuaDoi: "Giao BCH TW Đảng khoá XIV nghiên cứu, đề xuất sửa đổi Điều lệ Đảng trình Đại hội XV (2030)"
  },

  nghiQuyet71: {
    source: "Nghị quyết 71-NQ/TW ngày 22/8/2025 của Bộ Chính trị",
    kyBoiThư: "Tổng Bí thư Tô Lâm",
    chuDe: "Đột phá phát triển giáo dục và đào tạo",
    nguonLuc: {
      chiNgansach: "Tối thiểu 20% tổng chi NSNN cho giáo dục và đào tạo",
      chiDauTu: "Ít nhất 5% tổng chi NSNN cho đầu tư giáo dục",
      chiDaiHoc: "Ít nhất 3% tổng chi NSNN cho giáo dục đại học"
    },
    phuCapGiaoVien: {
      mamNonPhoThong: "Tối thiểu 70% phụ cấp ưu đãi nghề cho giáo viên",
      nhanVien: "Tối thiểu 30% phụ cấp cho nhân viên",
      khoKhan: "100% phụ cấp cho giáo viên khu vực đặc biệt khó khăn, biên giới, hải đảo, vùng DTTS"
    },
    mucTieu2030: {
      truongPhoDatChuan: "Ít nhất 80% trường phổ thông đạt chuẩn quốc gia",
      hoanThanhTHPT: "Ít nhất 85% người trong độ tuổi hoàn thành cấp THPT và tương đương",
      daiHocTopChauA: "Ít nhất 8 cơ sở GDĐH thuộc nhóm 200 đại học hàng đầu châu Á",
      daiHocTopTheGioi: "Ít nhất 1 cơ sở GDĐH thuộc nhóm 100 đại học hàng đầu thế giới trong một số lĩnh vực",
      tyLeSauTHPT: "50% người trong độ tuổi theo học sau THPT",
      tyLeLaoDongDaiHoc: "24% lao động có trình độ cao đẳng, đại học trở lên",
      giangVienNuocNgoai: "Tuyển dụng ít nhất 2.000 giảng viên giỏi từ nước ngoài",
      tangCongBoKHQT: "Tăng bình quân 12%/năm số công bố khoa học quốc tế",
      tangSangChe: "Tăng bình quân 16%/năm số đăng ký sáng chế"
    },
    mucTieu2035: {
      daiHocTop100: "Ít nhất 2 cơ sở GDĐH thuộc nhóm 100 đại học hàng đầu thế giới",
      hdi: "Chỉ số giáo dục đóng góp vào HDI đạt trên 0,85"
    },
    tamNhin2045: {
      xepHang: "Đứng vào nhóm 20 quốc gia hàng đầu thế giới về giáo dục",
      daiHocTop100: "Ít nhất 5 cơ sở GDĐH thuộc nhóm 100 đại học hàng đầu thế giới"
    }
  },

  tongKet40NamDoiMoi: {
    source: "Báo cáo tổng kết 40 năm đổi mới (1986–2026)",
    batDau: "Đại hội VI năm 1986",
    ketThuc: "Đại hội XIV năm 2026",
    truocDoiMoi: {
      gdpDauNguoi: "125–200 USD/năm (nhóm 20 nước nghèo nhất thế giới)",
      lamPhat1986: "774,7% (tháng 12/1986)"
    },
    tăngTruong30Nam: "Trung bình gần 7%/năm (7 năm trên 8%, 2 năm trên 9%)",
    xuatKhau1991_2016: "Tăng 60,38 lần so với năm 1991",
    giaiDoan2016_2025: {
      tangTrungBinh: "Khoảng 6,2%/năm",
      gdp: "Trên 510 tỉ USD",
      gdpDauNguoi: "Trên 5.000 USD/người"
    },
    vietKieuNuocNgoai: "6 triệu người tại 130 quốc gia và vùng lãnh thổ"
  }
};

// Export to window object for global availability in client browser
if (typeof window !== 'undefined') {
  window.CONGRESS_FACTS = CONGRESS_FACTS;
}
