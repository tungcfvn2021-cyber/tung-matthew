export type FaqItem = { q: string; a: string };

export type LandingData = {
  keyword: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  bullets: string[];
  faqs: FaqItem[];
};

export const LANDINGS: Record<string, LandingData> = {
  "barber-vung-tau": {
    keyword: "Barber Vũng Tàu",
    title: "Barber Vũng Tàu | Tùng Matthew",
    description:
      "Barber nam cao cấp tại Vũng Tàu. Fade, Undercut, Mohican chuẩn form. Đặt lịch trực tiếp với Tùng Matthew.",
    h1: "Barber Vũng Tàu — chuẩn form, đúng gu",
    intro:
      "Tùng Matthew là barber nam tại Vũng Tàu chuyên tạo kiểu tóc hợp gương mặt và phong cách của từng khách. Không chạy số, mỗi mái tóc là một tác phẩm.",
    bullets: [
      "Tư vấn kiểu tóc theo dáng mặt trước khi cắt",
      "Fade, Undercut, Mohican, Pompadour chuẩn xu hướng",
      "Không gian sạch sẽ, riêng tư, đặt lịch nhanh qua Zalo",
      "Kín lịch cuối tuần — nên đặt trước để giữ chỗ",
    ],
    faqs: [
      { q: "Barber Tùng Matthew ở đâu tại Vũng Tàu?", a: "Tiệm nằm tại Vũng Tàu. Xem địa chỉ và bản đồ chi tiết ở trang Liên hệ, hoặc nhắn Zalo để được chỉ đường." },
      { q: "Có cần đặt lịch trước không?", a: "Nên đặt trước, đặc biệt vào cuối tuần vì lịch thường kín. Bạn có thể đặt online chỉ trong 3 bước." },
      { q: "Giá cắt tóc bao nhiêu?", a: "Giá minh bạch theo từng dịch vụ, xem tại trang Dịch vụ. Combo VIP trọn gói là lựa chọn được nhiều khách chọn." },
    ],
  },
  "cat-toc-nam-vung-tau": {
    keyword: "Cắt tóc nam Vũng Tàu",
    title: "Cắt tóc nam Vũng Tàu | Tùng Matthew",
    description:
      "Cắt tóc nam đẹp tại Vũng Tàu — tư vấn kiểu hợp gương mặt, giá minh bạch. Đặt lịch với barber Tùng Matthew.",
    h1: "Cắt tóc nam Vũng Tàu",
    intro:
      "Bạn muốn một kiểu tóc nam vừa hợp gương mặt vừa dễ tự tạo kiểu mỗi ngày? Tùng Matthew tư vấn và cắt tỉa tỉ mỉ để bạn tự tin hơn sau mỗi lần ghé tiệm.",
    bullets: [
      "Tư vấn kiểu phù hợp mặt tròn, vuông, dài…",
      "Kỹ thuật fade mượt, đường nét sắc sảo",
      "Combo cắt + gội + cạo mặt + massage thư giãn",
      "Đặt lịch online, xác nhận qua Zalo",
    ],
    faqs: [
      { q: "Cắt tóc nam ở đây mất bao lâu?", a: "Trung bình 30–75 phút tuỳ dịch vụ. Thời lượng cụ thể hiển thị khi bạn chọn dịch vụ lúc đặt lịch." },
      { q: "Có gợi ý kiểu tóc theo gương mặt không?", a: "Có. Bạn có thể dùng công cụ gợi ý kiểu tóc theo dáng mặt trên website, hoặc để Tùng tư vấn trực tiếp tại tiệm." },
      { q: "Thanh toán thế nào?", a: "Thanh toán tại tiệm sau khi cắt. Đặt lịch online không cần trả trước." },
    ],
  },
  "fade-vung-tau": {
    keyword: "Fade Vũng Tàu",
    title: "Cắt tóc Fade Vũng Tàu | Tùng Matthew",
    description:
      "Fade Vũng Tàu chuẩn form — Low, Mid, High, Taper Fade mượt và sắc nét. Đặt lịch với barber Tùng Matthew.",
    h1: "Fade Vũng Tàu — mượt từng milimet",
    intro:
      "Fade đẹp nằm ở độ chuyển mượt và đường nét gọn gàng. Tùng Matthew thành thạo Low, Mid, High và Taper Fade, tạo kiểu hợp với gương mặt và phong cách của bạn.",
    bullets: [
      "Low / Mid / High / Taper Fade",
      "Chuyển tông mượt, không lộ đường gãy",
      "Kết hợp Undercut, Pompadour, Quiff, Crop",
      "Đặt lịch nhanh, giữ chỗ cuối tuần",
    ],
    faqs: [
      { q: "Nên chọn Low, Mid hay High Fade?", a: "Tuỳ gương mặt và độ cá tính bạn muốn. Low Fade nhẹ nhàng, High Fade cá tính hơn. Tùng sẽ tư vấn kiểu hợp nhất khi bạn tới." },
      { q: "Fade giữ được bao lâu?", a: "Thường 2–4 tuần tuỳ tóc. Nhiều khách quay lại mỗi 3 tuần để giữ form gọn." },
      { q: "Giá cắt Fade bao nhiêu?", a: "Xem giá từng loại Fade ở trang Dịch vụ. Có thể kết hợp Combo để tiết kiệm hơn." },
    ],
  },
  "undercut-vung-tau": {
    keyword: "Undercut Vũng Tàu",
    title: "Undercut Vũng Tàu | Tùng Matthew",
    description:
      "Undercut Vũng Tàu mạnh mẽ, nam tính, dễ tạo kiểu. Đặt lịch với barber Tùng Matthew.",
    h1: "Undercut Vũng Tàu — mạnh mẽ, nam tính",
    intro:
      "Undercut là lựa chọn kinh điển cho vẻ ngoài lịch lãm và cá tính. Tùng Matthew cắt Undercut chuẩn tỉ lệ, dễ vuốt tạo kiểu mỗi sáng.",
    bullets: [
      "Undercut cổ điển đến hiện đại",
      "Kết hợp fade hai bên tuỳ ý thích",
      "Hướng dẫn cách vuốt sáp giữ nếp",
      "Đặt lịch online, xác nhận Zalo",
    ],
    faqs: [
      { q: "Undercut có hợp mặt tròn không?", a: "Rất hợp — Undercut tạo chiều cao giúp gương mặt thon gọn hơn. Tùng sẽ điều chỉnh độ dài phần đỉnh cho cân đối." },
      { q: "Undercut có khó tự tạo kiểu không?", a: "Không. Chỉ cần một ít sáp/pomade là giữ nếp cả ngày. Tùng sẽ hướng dẫn bạn cách vuốt tại tiệm." },
      { q: "Bao lâu nên cắt lại?", a: "Khoảng 3–4 tuần để giữ phần hai bên gọn gàng." },
    ],
  },
  "mohican-vung-tau": {
    keyword: "Mohican Vũng Tàu",
    title: "Mohican (Mohawk) Vũng Tàu | Tùng Matthew",
    description:
      "Mohican Vũng Tàu nổi bật, cá tính. Đặt lịch với barber Tùng Matthew để có diện mạo khác biệt.",
    h1: "Mohican Vũng Tàu — nổi bật, khác biệt",
    intro:
      "Muốn một diện mạo phá cách? Mohican tạo điểm nhấn mạnh mẽ ở phần đỉnh đầu. Tùng Matthew cắt Mohican tinh tế, vẫn lịch sự để bạn tự tin cả khi đi làm.",
    bullets: [
      "Mohican mềm đến cá tính mạnh",
      "Kết hợp fade để đường nét sắc sảo",
      "Tư vấn độ dài hợp môi trường của bạn",
      "Đặt lịch nhanh, giữ chỗ dễ dàng",
    ],
    faqs: [
      { q: "Mohican có quá nổi bật để đi làm không?", a: "Có thể tuỳ chỉnh độ 'mạnh' của kiểu — Tùng sẽ cắt phiên bản lịch sự vừa đủ nếu bạn cần đi làm hằng ngày." },
      { q: "Mohican có cần tạo kiểu nhiều không?", a: "Bản mềm gần như không cần; bản dựng cao cần chút sáp. Tùng sẽ tư vấn theo nhu cầu của bạn." },
      { q: "Giá cắt Mohican?", a: "Xem tại trang Dịch vụ. Có thể kết hợp Combo VIP để trải nghiệm trọn gói." },
    ],
  },
};

export const LANDING_SLUGS = Object.keys(LANDINGS);
