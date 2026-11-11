"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { formatPrice, formatDate } from "@/lib/utils";
import {
  DollarSign,
  ShoppingBag,
  Clock,
  Users,
  UtensilsCrossed,
  QrCode,
  CalendarCheck,
  TrendingUp,
  RefreshCw,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [statsRes, ordersRes] = await Promise.all([
        fetch("/api/stats"),
        fetch("/api/orders"),
      ]);
      const statsData = await statsRes.json();
      const ordersData = await ordersRes.json();
      setStats(statsData);
      if (ordersData.orders) setOrders(ordersData.orders);
    } catch (err) {
      console.error("Failed to load admin stats", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      {/* Admin Subheader Navigation */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600">
                <TrendingUp className="w-3.5 h-3.5" />
                Restaurant Operations Portal
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 mt-1">
                Management Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={loadData}
                className="p-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-bold flex items-center gap-2 transition"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-orange-600" : ""}`} />
                <span className="hidden sm:inline">Refresh Data</span>
              </button>

              <Link
                href="/kitchen"
                className="px-4 py-2.5 bg-zinc-900 hover:bg-black text-white rounded-xl text-xs font-bold flex items-center gap-2 transition"
              >
                Open Kitchen KDS
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </Link>
            </div>
          </div>

          {/* Module Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 scrollbar-none">
            <Link
              href="/admin"
              className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold shadow-xs whitespace-nowrap"
            >
              Overview & Analytics
            </Link>
            <Link
              href="/admin/tables"
              className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap"
            >
              <QrCode className="w-3.5 h-3.5" />
              Tables & QR Codes
            </Link>
            <Link
              href="/admin/menu"
              className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap"
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              Menu & Availability
            </Link>
            <Link
              href="/reservations"
              className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              Reservations Flow
            </Link>
          </div>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Revenue */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Total Revenue</p>
              <h3 className="text-2xl font-black text-zinc-900 mt-1">
                {stats ? formatPrice(stats.totalRevenue) : "₹0"}
              </h3>
              <p className="text-[11px] text-green-600 font-semibold mt-1">&uarr; 18.2% vs yesterday</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Total Orders</p>
              <h3 className="text-2xl font-black text-zinc-900 mt-1">
                {stats ? stats.totalOrders : "0"}
              </h3>
              <p className="text-[11px] text-zinc-500 font-medium mt-1">Dine-in + Takeaways</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          {/* Active Orders */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Active in Kitchen</p>
              <h3 className="text-2xl font-black text-orange-600 mt-1">
                {stats ? stats.activeOrders : "0"}
              </h3>
              <p className="text-[11px] text-orange-600 font-medium mt-1">Requires kitchen attention</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          {/* Table Occupancy */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Occupied Tables</p>
              <h3 className="text-2xl font-black text-zinc-900 mt-1">
                {stats ? `${stats.occupiedTables} / ${stats.totalTables}` : "0 / 0"}
              </h3>
              <p className="text-[11px] text-zinc-500 font-medium mt-1">Real-time floor status</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Live Orders Table */}
        <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-zinc-900">Live Order Stream</h2>
              <p className="text-xs text-zinc-500 mt-0.5">Real-time feed of all incoming and fulfilled restaurant orders.</p>
            </div>
            <span className="text-xs bg-zinc-100 text-zinc-600 font-bold px-3 py-1 rounded-full">
              {orders.length} Orders
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 text-zinc-500 uppercase tracking-wider font-bold border-b border-zinc-200">
                <tr>
                  <th className="py-3 px-6">Order ID</th>
                  <th className="py-3 px-6">Customer & Table</th>
                  <th className="py-3 px-6">Items Ordered</th>
                  <th className="py-3 px-6">Amount</th>
                  <th className="py-3 px-6">Payment</th>
                  <th className="py-3 px-6">Kitchen Status</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-zinc-50/70 transition">
                    <td className="py-4 px-6 font-bold text-zinc-900">
                      {o.orderNumber || `#${o.id.slice(-6)}`}
                      <span className="block text-[10px] text-zinc-400 font-normal">
                        {formatDate(o.createdAt)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <strong className="text-zinc-800">{o.customerName}</strong>
                      <div className="mt-0.5">
                        {o.orderType === "DINE_IN" ? (
                          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold">
                            Table #{o.table?.tableNumber || o.tableNumber || "1"}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-[10px] font-bold">
                            Takeaway
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-0.5 max-w-xs">
                        {o.items?.map((item: any) => (
                          <div key={item.id} className="text-zinc-600 truncate">
                            <span className="font-bold text-zinc-900">{item.quantity}x</span>{" "}
                            {item.menuItem?.name || item.name}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-extrabold text-zinc-900">
                      {formatPrice(o.totalAmount)}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          o.paymentStatus === "PAID"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {o.paymentStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          o.status === "COMPLETED"
                            ? "bg-green-100 text-green-800"
                            : o.status === "READY"
                            ? "bg-amber-100 text-amber-800"
                            : o.status === "PREPARING"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {o.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/order/${o.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700"
                      >
                        Inspect
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

