import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { initialCategories, initialMenuItems } from "@/lib/mock-data";

/**
 * GET /api/menu
 * Fetches categories and menu items with optional filtering by category, search term, or veg status.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categorySlug = searchParams.get("category");
  const search = searchParams.get("search")?.toLowerCase();
  const vegOnly = searchParams.get("vegOnly") === "true";

  try {
    // 1. Try fetching from PostgreSQL database via Prisma
    const categoriesFromDb = await prisma.category.findMany({
      orderBy: { order: "asc" },
      include: {
        items: {
          where: {
            isAvailable: true,
            ...(vegOnly ? { isVeg: true } : {}),
            ...(search
              ? {
                  OR: [
                    { name: { contains: search, mode: "insensitive" } },
                    { description: { contains: search, mode: "insensitive" } },
                  ] as any,
                }
              : {}),
          },
        },
      },
    });

    if (categoriesFromDb && categoriesFromDb.length > 0) {
      let filtered = categoriesFromDb;
      if (categorySlug && categorySlug !== "all") {
        filtered = filtered.filter((c) => c.slug === categorySlug);
      }
      return NextResponse.json({
        success: true,
        source: "database",
        categories: filtered,
      });
    }
  } catch (error) {
    // Graceful fallback to mock data during initial development / before migration
    console.warn("Database not yet connected or seeded; using mock data fallback.");
  }

  // 2. Fallback: Filter mock data in memory
  let items = [...initialMenuItems];

  if (categorySlug && categorySlug !== "all") {
    const matchedCategory = initialCategories.find((c) => c.slug === categorySlug);
    if (matchedCategory) {
      items = items.filter((item) => item.categoryId === matchedCategory.id);
    }
  }

  if (vegOnly) {
    items = items.filter((item) => item.isVeg);
  }

  if (search) {
    items = items.filter(
      (item) =>
        item.name.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search)
    );
  }

  // Group items under categories for client display
  const structuredCategories = initialCategories
    .map((cat) => ({
      ...cat,
      items: items.filter((item) => item.categoryId === cat.id),
    }))
    .filter((cat) => cat.items.length > 0 || !categorySlug || categorySlug === "all");

  return NextResponse.json({
    success: true,
    source: "mock",
    categories: structuredCategories,
    allItems: items,
  });
}

