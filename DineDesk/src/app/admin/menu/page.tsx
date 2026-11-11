"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, UtensilsCrossed, Search, Plus, Check, X, Flame, Clock } from "lucide-react";

export default function AdminMenuPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchMenu = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/menu");
      const data = await res.json();
      if (data.categories) {
        setCategories(data.categories);
      }
    } catch (err) {
      console.error("Failed to load menu", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const toggleAvailability = (itemId: string) => {
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        items: cat.items.map((item: any) =>
          item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item
        ),
      }))
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 mb-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Dashboard
              </Link>
              <h1 className="text-2xl sm:text-3xl font-black text-zinc-900">
                Menu & Stock Management
              </h1>
              <p className="text-xs text-zinc-500 mt-0.5">
                Toggle dish availability in real time when ingredients run out.
              </p>
            </div>

            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {categories.map((category) => {
          const items = category.items.filter((item: any) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          );
          if (items.length === 0) return null;

          return (
            <div key={category.id} className="bg-white rounded-3xl border border-zinc-200/80 shadow-xs p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <h2 className="text-base font-bold text-zinc-900">{category.name}</h2>
                <span className="text-xs font-semibold text-zinc-400">
                  {items.length} dishes
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item: any) => (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-2xl border flex gap-3 transition ${
                      item.isAvailable
                        ? "border-zinc-200 bg-white"
                        : "border-zinc-200 bg-zinc-50 opacity-60"
                    }`}
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-zinc-100 shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              item.isVeg ? "bg-green-600" : "bg-red-600"
                            }`}
                          />
                          <h4 className="text-xs font-bold text-zinc-900 leading-tight">
                            {item.name}
                          </h4>
                        </div>
                        <p className="text-xs font-extrabold text-orange-600 mt-1">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      {/* Stock Switch */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[10px] font-semibold text-zinc-500">
                          {item.isAvailable ? "In Stock" : "Sold Out"}
                        </span>
                        <button
                          onClick={() => toggleAvailability(item.id)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition flex items-center gap-1 ${
                            item.isAvailable
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-red-100 text-red-700 hover:bg-red-200"
                          }`}
                        >
                          {item.isAvailable ? (
                            <>
                              <Check className="w-3 h-3" /> Available
                            </>
                          ) : (
                            <>
                              <X className="w-3 h-3" /> Unavailable
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

