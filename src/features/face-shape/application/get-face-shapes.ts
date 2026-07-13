import { prisma } from "@/shared/lib/prisma";

export function getFaceShapeGuides() {
  return prisma.faceShapeGuide.findMany({
    orderBy: { faceShape: "asc" },
    select: {
      faceShape: true,
      label: true,
      description: true,
      recommendedCuts: true,
      avoidCuts: true,
    },
  });
}

export type FaceShapeGuideDTO = Awaited<
  ReturnType<typeof getFaceShapeGuides>
>[number];
