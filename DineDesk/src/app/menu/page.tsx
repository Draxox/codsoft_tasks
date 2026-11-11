"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MenuCard from "@/components/MenuCard";
import { useCart } from "@/context/CartContext";
import { Search, Sparkles, Filter, Leaf, Utensils, AlertCircle } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  items: any[];
}

function MenuContent() {
  const searchParams = useSearchParams();
  const tableParam = searchParams.get("table");
  const { setSelectedTable, selectedTable } = useCart();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // If table parameter is passed via QR code scan (?table=3), set it automatically
  useEffect(() => {
    if (tableParam) {
      const tableNum = Number(tableParam);
      if (!isNaN(tableNum) && tableNum > 0) {
        setSelectedTable(tableNum);
      }
    }
  }, [tableParam, setSelectedTable]);

  // Fetch menu data from API
  useEffect(() => {
    async function loadMenu() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/menu?category=${selectedCategory}&vegOnly=${vegOnly}&search=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        if (data.categories) {
          setCategories(data.categories);
        }
      } catch (err) {
        console.error("Failed to load menu", err);
      } finally {
        setIsLoading(false);
      }
    }

    const timer = setTimeout(() => {
      loadMenu();
    }, 200);

    return () => clearTimeout(timer);
  }, [selectedCategory, vegOnly, searchQuery]);

  const allItemsCount = useMemo(() => {
    return categories.reduce((sum, cat) => sum + (cat.items?.length || 0), 0);
  }, [categories]);

  return (
    <div className="min-h-screen bg-zinc-50 pb-24">
      {/* Table Banner (if QR code scanned) */}
      {selectedTable && (
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white py-2 px-4 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>Ordering for <strong>Table #{selectedTable}</strong></span>
            </div>
            <button
              onClick={() => setSelectedTable(null)}
              className="text-xs bg-black/20 hover:bg-black/30 px-2 py-0.5 rounded transition"
            >
              Change Table
            </button>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-orange-600 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                Handcrafted & Fresh Daily
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
                Digital Dining Menu
              </h1>
              <p className="text-sm text-zinc-500 mt-1 max-w-xl">
                Explore our chef&apos;s artisan selections, fresh wood-fired delicacies, and handcrafted refreshments.
              </p>
            </div>

            {/* Veg-only toggle */}
            <div className="flex items-center gap-3 bg-zinc-100 p-1.5 rounded-2xl border border-zinc-200">
              <button
                onClick={() => setVegOnly(false)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  !vegOnly ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                All Dishes
              </button>
              <button
                onClick={() => setVegOnly(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  vegOnly ? "bg-green-600 text-white shadow-sm" : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                <Leaf className="w-3.5 h-3.5" />
                Pure Veg Only
              </button>
            </div>
          </div>

          {/* Search bar & Category filter chips */}
          <div className="mt-8 space-y-4">
            <div className="relative max-w-xl">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search pizzas, burgers, appetizers, pasta..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category selection bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === "all"
                    ? "bg-zinc-900 text-white shadow-sm"
                    : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"
                }`}
              >
                All Categories
              </button>
              {[
                { slug: "starters", name: "Starters & Appetizers" },
                { slug: "main-course", name: "Main Course" },
                { slug: "pizzas", name: "Wood-Fired Pizzas" },
                { slug: "burgers", name: "Gourmet Burgers" },
                { slug: "beverages", name: "Specialty Drinks" },
                { slug: "desserts", name: "Desserts" },
              ].map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    selectedCategory === cat.slug
                      ? "bg-orange-600 text-white shadow-sm"
                      : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Dishes Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-zinc-200" />
            ))}
          </div>
        ) : allItemsCount === 0 ? (
          <div className="bg-white rounded-3xl border border-zinc-200 p-12 text-center max-w-md mx-auto my-12 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-4">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900">No dishes found</h3>
            <p className="text-xs text-zinc-500 mt-1">
              We couldn&apos;t find anything matching your filter. Try adjusting your search query or dietary preferences.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setVegOnly(false);
                setSelectedCategory("all");
              }}
              className="mt-4 px-4 py-2 bg-orange-600 text-white text-xs font-bold rounded-xl hover:bg-orange-700 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map((category) => {
              if (!category.items || category.items.length === 0) return null;
              return (
                <section key={category.id} className="space-y-4">
                  <div className="border-b border-zinc-200 pb-3 flex items-baseline justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-zinc-900">{category.name}</h2>
                      {category.description && (
                        <p className="text-xs text-zinc-500 mt-0.5">{category.description}</p>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-zinc-400">
                      {category.items.length} {category.items.length === 1 ? "item" : "items"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {category.items.map((item) => (
                      <MenuCard key={item.id} item={item} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-zinc-500">Loading menu...</div>}>
      <MenuContent />
    </Suspense>
  );
}

