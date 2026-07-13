import { PrismaClient, ServiceCategory, FaceShape } from "@prisma/client";

const prisma = new PrismaClient();

const SHOP_SLUG = "tung-matthew";

type SeedService = {
  slug: string;
  name: string;
  category: ServiceCategory;
  price: number;
  durationMin: number;
  suitableFor?: string;
  isFeatured?: boolean;
  sortOrder: number;
};

const services: SeedService[] = [
  { slug: "low-fade", name: "Low Fade", category: "FADE", price: 120000, durationMin: 40, suitableFor: "Thích gọn gàng, chuyên nghiệp", sortOrder: 1 },
  { slug: "mid-fade", name: "Mid Fade", category: "FADE", price: 120000, durationMin: 40, suitableFor: "Cân bằng, hợp mọi khuôn mặt", sortOrder: 2 },
  { slug: "high-fade", name: "High Fade", category: "FADE", price: 130000, durationMin: 45, suitableFor: "Cá tính, trẻ trung", sortOrder: 3 },
  { slug: "taper-fade", name: "Taper Fade", category: "FADE", price: 130000, durationMin: 45, suitableFor: "Lịch sự, dễ chăm sóc", sortOrder: 4 },
  { slug: "undercut", name: "Undercut", category: "CUT", price: 130000, durationMin: 45, suitableFor: "Mạnh mẽ, nam tính", sortOrder: 5 },
  { slug: "mohican", name: "Mohican", category: "CUT", price: 150000, durationMin: 50, suitableFor: "Nổi bật, khác biệt", sortOrder: 6 },
  { slug: "buzz-cut", name: "Buzz Cut", category: "CUT", price: 90000, durationMin: 25, suitableFor: "Đơn giản, khỏe khoắn", sortOrder: 7 },
  { slug: "crew-cut", name: "Crew Cut", category: "CUT", price: 100000, durationMin: 30, suitableFor: "Cổ điển, gọn gàng", sortOrder: 8 },
  { slug: "french-crop", name: "French Crop", category: "CUT", price: 120000, durationMin: 40, suitableFor: "Hiện đại, dễ tạo kiểu", sortOrder: 9 },
  { slug: "textured-crop", name: "Textured Crop", category: "CUT", price: 130000, durationMin: 45, suitableFor: "Tóc dày, muốn phá cách", sortOrder: 10 },
  { slug: "pompadour", name: "Pompadour", category: "STYLING", price: 150000, durationMin: 50, suitableFor: "Phong cách quý ông", sortOrder: 11 },
  { slug: "quiff", name: "Quiff", category: "STYLING", price: 150000, durationMin: 50, suitableFor: "Lịch lãm, trẻ trung", sortOrder: 12 },
  { slug: "uon-toc", name: "Uốn tóc", category: "PERM", price: 350000, durationMin: 90, suitableFor: "Muốn tóc phồng, bồng bềnh", sortOrder: 13 },
  { slug: "nhuom-toc", name: "Nhuộm tóc", category: "COLOR", price: 300000, durationMin: 90, suitableFor: "Đổi màu cá tính", sortOrder: 14 },
  { slug: "tay-toc", name: "Tẩy tóc", category: "BLEACH", price: 250000, durationMin: 60, suitableFor: "Chuẩn bị nhuộm màu sáng", sortOrder: 15 },
  { slug: "cao-mat", name: "Cạo mặt", category: "SHAVE", price: 60000, durationMin: 20, suitableFor: "Da mặt sạch, thư giãn", sortOrder: 16 },
  { slug: "massage", name: "Massage đầu vai gáy", category: "MASSAGE", price: 80000, durationMin: 25, suitableFor: "Thư giãn sau cắt", sortOrder: 17 },
  { slug: "combo-vip", name: "Combo VIP", category: "COMBO", price: 250000, durationMin: 75, suitableFor: "Trọn gói: cắt + gội + cạo mặt + massage", isFeatured: true, sortOrder: 0 },
];

const faceShapes: {
  faceShape: FaceShape;
  label: string;
  description: string;
  recommendedCuts: string[];
  avoidCuts: string[];
}[] = [
  { faceShape: "OVAL", label: "Mặt trái xoan", description: "Khuôn mặt cân đối nhất — hợp gần như mọi kiểu.", recommendedCuts: ["Undercut", "Pompadour", "Quiff", "Textured Crop"], avoidCuts: ["Để mái quá dài che trán"] },
  { faceShape: "ROUND", label: "Mặt tròn", description: "Nên tạo chiều cao để mặt thon dài hơn.", recommendedCuts: ["Pompadour", "Quiff", "High Fade", "Undercut"], avoidCuts: ["Buzz Cut", "Tóc ngang bằng hai bên"] },
  { faceShape: "SQUARE", label: "Mặt vuông", description: "Đường nét khỏe — hợp kiểu nam tính, gọn hai bên.", recommendedCuts: ["Crew Cut", "Buzz Cut", "Mid Fade", "French Crop"], avoidCuts: ["Kiểu quá mềm mại, bồng bềnh"] },
  { faceShape: "OBLONG", label: "Mặt dài", description: "Hạn chế tạo chiều cao, thêm độ dày hai bên.", recommendedCuts: ["French Crop", "Textured Crop", "Low Fade", "Side Part"], avoidCuts: ["Pompadour cao", "High Fade"] },
  { faceShape: "HEART", label: "Mặt trái tim", description: "Trán rộng, cằm thon — cần cân bằng phần đỉnh.", recommendedCuts: ["Textured Crop", "Side Part", "Quiff vừa"], avoidCuts: ["Undercut hai bên quá mỏng"] },
  { faceShape: "DIAMOND", label: "Mặt kim cương", description: "Gò má cao — thêm độ đầy vùng trán và cằm.", recommendedCuts: ["Fringe / mái", "Textured Crop", "Quiff"], avoidCuts: ["Vuốt ngược hết ra sau"] },
  { faceShape: "TRIANGLE", label: "Mặt tam giác", description: "Hàm rộng — tạo độ phồng phần trên đầu.", recommendedCuts: ["Pompadour", "Quiff", "High Fade"], avoidCuts: ["Để tóc dài phần hàm"] },
];

async function main() {
  console.log("🌱 Bắt đầu seed dữ liệu Tùng Matthew Barber...");

  const shop = await prisma.shop.upsert({
    where: { slug: SHOP_SLUG },
    update: {},
    create: {
      slug: SHOP_SLUG,
      name: "Tùng Matthew",
      tagline: "Cắt tóc không chỉ để đẹp. Mà để bạn tự tin hơn mỗi ngày.",
      phone: "",
      city: "Vũng Tàu",
      addressLine: "",
    },
  });

  await prisma.barber.upsert({
    where: { shopId_slug: { shopId: shop.id, slug: "tung-matthew" } },
    update: {},
    create: {
      shopId: shop.id,
      slug: "tung-matthew",
      name: "Tùng Matthew",
      yearsExp: 5,
      bio: "Barber tại Vũng Tàu — chuyên Fade, Undercut, Mohican chuẩn form.",
      isActive: true,
    },
  });

  // Giờ mở cửa: T2–CN 09:00–21:00 (0 = CN ... 6 = T7)
  for (let weekday = 0; weekday <= 6; weekday++) {
    await prisma.workingHour.upsert({
      where: { shopId_weekday: { shopId: shop.id, weekday } },
      update: {},
      create: { shopId: shop.id, weekday, openTime: "09:00", closeTime: "21:00" },
    });
  }

  for (const s of services) {
    await prisma.service.upsert({
      where: { shopId_slug: { shopId: shop.id, slug: s.slug } },
      update: {
        name: s.name,
        category: s.category,
        price: s.price,
        durationMin: s.durationMin,
        suitableFor: s.suitableFor,
        isFeatured: s.isFeatured ?? false,
        sortOrder: s.sortOrder,
      },
      create: {
        shopId: shop.id,
        slug: s.slug,
        name: s.name,
        category: s.category,
        price: s.price,
        durationMin: s.durationMin,
        suitableFor: s.suitableFor,
        isFeatured: s.isFeatured ?? false,
        sortOrder: s.sortOrder,
      },
    });
  }

  for (const f of faceShapes) {
    await prisma.faceShapeGuide.upsert({
      where: { faceShape: f.faceShape },
      update: {
        label: f.label,
        description: f.description,
        recommendedCuts: f.recommendedCuts,
        avoidCuts: f.avoidCuts,
      },
      create: f,
    });
  }

  const galleryCount = await prisma.galleryItem.count({
    where: { shopId: shop.id },
  });
  if (galleryCount === 0) {
    await prisma.galleryItem.createMany({
      data: [
        { shopId: shop.id, title: "Low Fade cổ điển", category: "FADE", beforeUrl: "/placeholder-before.svg", afterUrl: "/placeholder-after.svg", sortOrder: 1 },
        { shopId: shop.id, title: "Undercut vuốt ngược", category: "CUT", afterUrl: "/placeholder-after.svg", sortOrder: 2 },
        { shopId: shop.id, title: "Mohican cá tính", category: "CUT", beforeUrl: "/placeholder-before.svg", afterUrl: "/placeholder-after.svg", sortOrder: 3 },
        { shopId: shop.id, title: "Pompadour quý ông", category: "STYLING", afterUrl: "/placeholder-after.svg", sortOrder: 4 },
        { shopId: shop.id, title: "French Crop hiện đại", category: "CUT", beforeUrl: "/placeholder-before.svg", afterUrl: "/placeholder-after.svg", sortOrder: 5 },
        { shopId: shop.id, title: "Combo VIP trọn gói", category: "COMBO", afterUrl: "/placeholder-after.svg", sortOrder: 6 },
      ],
    });
    console.log("→ Đã seed 6 ảnh Lookbook (placeholder)");
  }

  console.log(
    `✅ Seed xong: shop "${shop.name}", ${services.length} dịch vụ, ${faceShapes.length} dáng mặt, 7 ngày giờ mở cửa.`,
  );
}

main()
  .catch((e) => {
    console.error("❌ Seed lỗi:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
