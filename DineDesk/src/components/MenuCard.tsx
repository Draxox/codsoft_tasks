"use client";

import React from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { Clock, Flame, Plus, Minus } from "lucide-react";

export interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isVeg: boolean;
  spiciness: number;
  prepTimeMin: number;
}

export default function MenuCard({ item }: { item: MenuItemProps }) {
  const { items, addItem, updateQuantity } = useCart();
  const cartItem = items.find((i) => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="group bg-white rounded-2xl border border-zinc-200/80 overflow-hidden shadow-sm hover:shadow-md hover:border-orange-200 transition duration-200 flex flex-col">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-zinc-100">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition duration-500"
          unoptimized
        />

        {/* Veg / Non-Veg Tag */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm p-1 rounded-md shadow-sm border border-zinc-200">
          <div
            className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
              item.isVeg ? "border-green-600" : "border-red-600"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                item.isVeg ? "bg-green-600" : "bg-red-600"
              }`}
            />
          </div>
        </div>

        {/* Prep Time Tag */}
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-[11px] font-medium flex items-center gap-1">
          <Clock className="w-3 h-3 text-orange-400" />
          <span>{item.prepTimeMin} mins</span>
        </div>

        {/* Spice Level (if > 0) */}
        {item.spiciness > 0 && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[11px] font-semibold text-orange-600 flex items-center gap-0.5 shadow-sm">
            {Array.from({ length: item.spiciness }).map((_, i) => (
              <Flame key={i} className="w-3 h-3 fill-orange-500 text-orange-500" />
            ))}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-base text-zinc-900 group-hover:text-orange-600 transition leading-snug">
              {item.name}
            </h3>
          </div>
          <p className="text-xs text-zinc-500 mt-1 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
          <span className="text-lg font-extrabold text-zinc-900">
            {formatPrice(item.price)}
          </span>

          {quantity === 0 ? (
            <button
              onClick={() =>
                addItem({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  imageUrl: item.imageUrl,
                  isVeg: item.isVeg,
                })
              }
              className="py-1.5 px-4 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl p-1">
              <button
                onClick={() => updateQuantity(item.id, quantity - 1)}
                className="w-6 h-6 rounded-lg bg-white text-orange-600 hover:bg-orange-600 hover:text-white flex items-center justify-center transition shadow-xs text-xs font-bold"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-xs font-black text-orange-700 w-4 text-center">
                {quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, quantity + 1)}
                className="w-6 h-6 rounded-lg bg-white text-orange-600 hover:bg-orange-600 hover:text-white flex items-center justify-center transition shadow-xs text-xs font-bold"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

