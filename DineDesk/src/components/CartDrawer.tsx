"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { X, Plus, Minus, Trash2, ShoppingBag, UtensilsCrossed, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    updateNotes,
    clearCart,
    subtotal,
    tax,
    grandTotal,
    orderType,
    setOrderType,
    selectedTable,
    setSelectedTable,
  } = useCart();

  const router = useRouter();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isCartOpen) return null;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (items.length === 0) {
      setErrorMsg("Your cart is empty.");
      return;
    }

    if (!customerName.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }

    if (orderType === "DINE_IN" && !selectedTable) {
      setErrorMsg("Please enter or select a table number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          orderType,
          tableNumber: orderType === "DINE_IN" ? Number(selectedTable) : null,
          items: items.map((item) => ({
            menuItemId: item.id,
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.price,
            notes: item.notes || "",
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to place order.");
      }

      clearCart();
      setIsCartOpen(false);
      router.push(`/order/${data.order.id}`);
    } catch (err: any) {
      console.error("Order error:", err);
      setErrorMsg(err.message || "Failed to place order. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-orange-600" />
            <h2 className="text-lg font-bold text-zinc-900">Your Order</h2>
            <span className="text-xs bg-orange-100 text-orange-700 font-semibold px-2 py-0.5 rounded-full">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Type Toggle */}
        <div className="p-4 border-b bg-white">
          <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2">
            Dining Option
          </label>
          <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-100 rounded-lg">
            <button
              type="button"
              onClick={() => setOrderType("DINE_IN")}
              className={`py-2 px-3 text-sm font-semibold rounded-md flex items-center justify-center gap-2 transition ${
                orderType === "DINE_IN"
                  ? "bg-white text-orange-600 shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              Dine-In
            </button>
            <button
              type="button"
              onClick={() => setOrderType("TAKEAWAY")}
              className={`py-2 px-3 text-sm font-semibold rounded-md flex items-center justify-center gap-2 transition ${
                orderType === "TAKEAWAY"
                  ? "bg-white text-orange-600 shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              Takeaway
            </button>
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400">
              <ShoppingBag className="w-12 h-12 text-zinc-300 mb-3" />
              <p className="text-base font-semibold text-zinc-700">Your cart is empty</p>
              <p className="text-xs text-zinc-500 mt-1">Explore our delicious menu and add your favorite dishes.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 flex flex-col gap-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block w-2.5 h-2.5 rounded-full ${
                          item.isVeg ? "bg-green-600" : "bg-red-600"
                        }`}
                        title={item.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                      />
                      <h4 className="font-semibold text-sm text-zinc-900 leading-tight">
                        {item.name}
                      </h4>
                    </div>
                    <p className="text-xs font-semibold text-orange-600 mt-1">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Quantity stepper */}
                  <div className="flex items-center gap-1.5 bg-white border border-zinc-200 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded text-zinc-600 hover:bg-zinc-100"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-zinc-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded text-zinc-600 hover:bg-zinc-100"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-zinc-400 hover:text-red-600 transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Special Instructions Note */}
                <input
                  type="text"
                  placeholder="Special instructions (e.g. less spicy)..."
                  value={item.notes || ""}
                  onChange={(e) => updateNotes(item.id, e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 bg-white border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout Form */}
        {items.length > 0 && (
          <form onSubmit={handleCheckout} className="p-4 border-t bg-zinc-50 space-y-3">
            {errorMsg && (
              <div className="p-2.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg">
                {errorMsg}
              </div>
            )}

            {/* Inputs */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-zinc-600">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full text-xs px-2.5 py-2 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {orderType === "DINE_IN" ? (
                <div>
                  <label className="text-[11px] font-semibold text-zinc-600">Table Number *</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    placeholder="e.g. 4"
                    value={selectedTable || ""}
                    onChange={(e) => setSelectedTable(Number(e.target.value) || null)}
                    className="w-full text-xs px-2.5 py-2 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              ) : (
                <div>
                  <label className="text-[11px] font-semibold text-zinc-600">Phone (Optional)</label>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-xs px-2.5 py-2 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-1.5 pt-2 text-xs text-zinc-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & GST (5%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-zinc-900 pt-1 border-t border-zinc-200">
                <span>Total Payable</span>
                <span className="text-orange-600">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending Order to Kitchen...
                </>
              ) : (
                <>
                  Confirm & Send to Kitchen
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

