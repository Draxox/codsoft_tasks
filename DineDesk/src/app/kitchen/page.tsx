"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import {
  ChefHat,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Volume2,
  VolumeX,
  ArrowRight,
  Flame,
  Check,
  UtensilsCrossed,
} from "lucide-react";

export default function KitchenDisplayPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  // Play kitchen chime using Web Audio API (no external mp3 dependency required!)
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.45);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      // AudioContext blocked until user interaction
    }
  };

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.orders) {
        setOrders((prev) => {
          // If a new order arrived, chime!
          if (prev.length > 0 && data.orders.length > prev.length) {
            playChime();
          }
          return data.orders;
        });
      }
    } catch (err) {
      console.error("Failed to fetch kitchen orders", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, [soundEnabled]);

  // Update order status
  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      // Optimistic UI update
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );

      await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchOrders();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  // Group orders into KDS columns
  const pendingOrders = orders.filter((o) => o.status === "PENDING");
  const cookingOrders = orders.filter((o) => o.status === "PREPARING" || o.status === "CONFIRMED");
  const readyOrders = orders.filter((o) => o.status === "READY");

  const getElapsedTime = (createdAt: string) => {
    const mins = Math.floor((Date.now() - new Date(createdAt).getTime()) / 60000);
    if (mins < 1) return "Just now";
    return `${mins}m ago`;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* KDS Kitchen Control Bar */}
      <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-white">
                Kitchen Display System (KDS)
              </h1>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Live Cooking Line &bull; Auto-syncing every 3s
            </p>
          </div>
        </div>

        {/* Quick controls */}
        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition ${
              soundEnabled
                ? "bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700"
                : "bg-red-950/40 border-red-800 text-red-400"
            }`}
            title="Toggle Kitchen Chime"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? "Chime On" : "Muted"}</span>
          </button>

          {/* Manual Refresh */}
          <button
            onClick={() => {
              setIsLoading(true);
              fetchOrders();
            }}
            className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-2 transition"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-orange-500" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <Link
            href="/admin"
            className="px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition"
          >
            Manager Portal
          </Link>
        </div>
      </header>

      {/* Kanban Board Container */}
      <main className="flex-1 p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto">
        {/* Column 1: New / Pending Orders */}
        <div className="flex flex-col bg-zinc-900/80 rounded-2xl border border-zinc-800 overflow-hidden">
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <h2 className="font-bold text-sm text-zinc-100 uppercase tracking-wider">
                1. New Orders
              </h2>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-black">
              {pendingOrders.length}
            </span>
          </div>

          <div className="flex-1 p-3 space-y-3 overflow-y-auto">
            {pendingOrders.length === 0 ? (
              <div className="h-40 flex items-center justify-center text-xs text-zinc-600 font-medium">
                No pending orders
              </div>
            ) : (
              pendingOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-zinc-800/90 border border-blue-500/30 rounded-xl p-4 shadow-sm flex flex-col justify-between gap-3 animate-in fade-in-50"
                >
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-700">
                      <div>
                        <span className="text-base font-black text-white">
                          {order.orderNumber}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          {order.orderType === "DINE_IN" ? (
                            <span className="px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 text-[11px] font-bold">
                              Table #{order.table?.tableNumber || order.tableNumber || "?"}
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 text-[11px] font-bold">
                              Takeaway
                            </span>
                          )}
                          <span className="text-[11px] text-zinc-400">{order.customerName}</span>
                        </div>
                      </div>
                      <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-orange-400" />
                        {getElapsedTime(order.createdAt)}
                      </span>
                    </div>

                    {/* Items List */}
                    <div className="py-2.5 space-y-2">
                      {order.items?.map((item: any) => (
                        <div key={item.id} className="text-xs">
                          <div className="flex items-start justify-between font-semibold text-zinc-200">
                            <span>
                              <strong className="text-orange-400 mr-1.5">{item.quantity}x</strong>
                              {item.menuItem?.name || item.name}
                            </span>
                          </div>
                          {item.notes && (
                            <p className="text-[11px] text-amber-300 italic pl-5 mt-0.5">
                              &bull; {item.notes}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {order.notes && (
                      <div className="p-2 bg-zinc-900 rounded-lg text-[11px] text-amber-300 border border-amber-500/20">
                        Order Note: {order.notes}
                      </div>
                    )}
                  </div>

                  {/* Accept & Start Cooking Action */}
                  <button
                    onClick={() => updateStatus(order.id, "PREPARING")}
                    className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition shadow-md"
                  >
                    <Flame className="w-4 h-4" />
                    Accept & Start Cooking
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 2: Cooking in Progress */}
        <div className="flex flex-col bg-zinc-900/80 rounded-2xl border border-zinc-800 overflow-hidden">
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
              <h2 className="font-bold text-sm text-zinc-100 uppercase tracking-wider">
                2. On the Stove / Oven
              </h2>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-black">
              {cookingOrders.length}
            </span>
          </div>

          <div className="flex-1 p-3 space-y-3 overflow-y-auto">
            {cookingOrders.length === 0 ? (
              <div className="h-40 flex items-center justify-center text-xs text-zinc-600 font-medium">
                No orders currently in prep
              </div>
            ) : (
              cookingOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-zinc-800/90 border border-orange-500/40 rounded-xl p-4 shadow-sm flex flex-col justify-between gap-3 animate-in fade-in-50"
                >
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-700">
                      <div>
                        <span className="text-base font-black text-white">
                          {order.orderNumber}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          {order.orderType === "DINE_IN" ? (
                            <span className="px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 text-[11px] font-bold">
                              Table #{order.table?.tableNumber || order.tableNumber || "?"}
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 text-[11px] font-bold">
                              Takeaway
                            </span>
                          )}
                          <span className="text-[11px] text-zinc-400">{order.customerName}</span>
                        </div>
                      </div>
                      <span className="text-xs text-amber-400 font-bold flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-orange-400" />
                        {getElapsedTime(order.createdAt)}
                      </span>
                    </div>

                    <div className="py-2.5 space-y-2">
                      {order.items?.map((item: any) => (
                        <div key={item.id} className="text-xs">
                          <div className="flex items-start justify-between font-semibold text-zinc-200">
                            <span>
                              <strong className="text-orange-400 mr-1.5">{item.quantity}x</strong>
                              {item.menuItem?.name || item.name}
                            </span>
                          </div>
                          {item.notes && (
                            <p className="text-[11px] text-amber-300 italic pl-5 mt-0.5">
                              &bull; {item.notes}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mark as Ready Button */}
                  <button
                    onClick={() => updateStatus(order.id, "READY")}
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-zinc-950 text-xs font-black rounded-lg flex items-center justify-center gap-2 transition shadow-md"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    Food Plated & Ready!
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 3: Ready to Serve / Handover */}
        <div className="flex flex-col bg-zinc-900/80 rounded-2xl border border-zinc-800 overflow-hidden">
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h2 className="font-bold text-sm text-zinc-100 uppercase tracking-wider">
                3. Ready to Serve
              </h2>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black">
              {readyOrders.length}
            </span>
          </div>

          <div className="flex-1 p-3 space-y-3 overflow-y-auto">
            {readyOrders.length === 0 ? (
              <div className="h-40 flex items-center justify-center text-xs text-zinc-600 font-medium">
                No orders waiting at the pass
              </div>
            ) : (
              readyOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-zinc-800/90 border border-emerald-500/40 rounded-xl p-4 shadow-sm flex flex-col justify-between gap-3 animate-in fade-in-50"
                >
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-700">
                      <div>
                        <span className="text-base font-black text-white">
                          {order.orderNumber}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          {order.orderType === "DINE_IN" ? (
                            <span className="px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 text-[11px] font-bold">
                              Serve at Table #{order.table?.tableNumber || order.tableNumber || "?"}
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 text-[11px] font-bold">
                              Call Customer
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 font-mono">
                        Ready
                      </span>
                    </div>

                    <div className="py-2.5 space-y-1">
                      {order.items?.map((item: any) => (
                        <div key={item.id} className="text-xs font-semibold text-zinc-300">
                          {item.quantity}x {item.menuItem?.name || item.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mark Completed Button */}
                  <button
                    onClick={() => updateStatus(order.id, "COMPLETED")}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition shadow-md"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Served & Completed
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

