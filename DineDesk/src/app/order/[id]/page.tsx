"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { formatPrice, formatDate } from "@/lib/utils";
import {
  Clock,
  ChefHat,
  Bell,
  CheckCircle2,
  XCircle,
  CreditCard,
  QrCode,
  ArrowLeft,
  Utensils,
  Receipt,
  Loader2,
  Check,
} from "lucide-react";

const ORDER_STEPS = [
  { key: "PENDING", label: "Order Received", desc: "Sent to the kitchen queue", icon: Clock },
  { key: "PREPARING", label: "Cooking in Kitchen", desc: "Chef is crafting your dishes", icon: ChefHat },
  { key: "READY", label: "Ready to Serve", desc: "Plated and hot at the pass", icon: Bell },
  { key: "COMPLETED", label: "Served & Enjoyed", desc: "Thank you for dining with us!", icon: CheckCircle2 },
];

export default function OrderTrackingPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPaying, setIsPaying] = useState<boolean>(false);
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState<string>("");

  // Poll order status every 3.5 seconds
  useEffect(() => {
    let isMounted = true;

    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${id}`);
        const data = await res.json();
        if (data.order && isMounted) {
          setOrder(data.order);
        }
      } catch (err) {
        console.error("Failed to poll order status", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchOrder();
    const interval = setInterval(fetchOrder, 3500);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [id]);

  // Handle simulated payment
  const handlePayment = async (method: "UPI" | "CARD" | "CASH") => {
    setIsPaying(true);
    setPaymentSuccessMsg("");
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentStatus: "PAID",
          paymentMethod: method,
        }),
      });
      const data = await res.json();
      if (data.order) {
        setOrder(data.order);
        setPaymentSuccessMsg(`Payment of ${formatPrice(data.order.totalAmount)} received via ${method}!`);
      }
    } catch (err) {
      console.error("Payment error", err);
    } finally {
      setIsPaying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
        <p className="text-sm text-zinc-500 font-medium">Tracking order status...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <XCircle className="w-12 h-12 text-zinc-400" />
        <h2 className="text-xl font-bold text-zinc-800">Order Not Found</h2>
        <p className="text-xs text-zinc-500 max-w-sm">
          We couldn&apos;t find an active order with ID #{id}.
        </p>
        <Link
          href="/menu"
          className="px-4 py-2 bg-orange-600 text-white text-xs font-bold rounded-xl"
        >
          Return to Menu
        </Link>
      </div>
    );
  }

  const getStepIndex = (status: string) => {
    switch (status) {
      case "PENDING":
        return 0;
      case "CONFIRMED":
      case "PREPARING":
        return 1;
      case "READY":
        return 2;
      case "COMPLETED":
        return 3;
      default:
        return 0;
    }
  };

  const currentStep = getStepIndex(order.status);
  const isCancelled = order.status === "CANCELLED";

  return (
    <div className="min-h-screen bg-zinc-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/menu"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Menu
          </Link>

          <span className="text-xs bg-orange-100 text-orange-800 font-bold px-3 py-1 rounded-full">
            Live Status Tracker
          </span>
        </div>

        {/* Status Header Card */}
        <div className="bg-white rounded-3xl border border-zinc-200/80 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Order Number
                </span>
                {order.orderType === "DINE_IN" ? (
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[11px] font-bold">
                    Table #{order.table?.tableNumber || order.tableNumber || "Dine-In"}
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 text-[11px] font-bold">
                    Takeaway
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 mt-0.5">
                {order.orderNumber || `#${order.id?.slice(-6).toUpperCase()}`}
              </h1>
              <p className="text-xs text-zinc-500 mt-1">
                Placed for <strong>{order.customerName}</strong> &bull; {formatDate(order.createdAt)}
              </p>
            </div>

            {/* Current Status Pill */}
            <div className="text-right">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                  order.status === "COMPLETED"
                    ? "bg-green-100 text-green-800"
                    : order.status === "READY"
                    ? "bg-amber-100 text-amber-800 animate-pulse"
                    : order.status === "PREPARING"
                    ? "bg-orange-100 text-orange-800"
                    : order.status === "CANCELLED"
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current" />
                {order.status}
              </span>
            </div>
          </div>

          {/* Stepper Progress Visualizer */}
          {!isCancelled ? (
            <div className="pt-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {ORDER_STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  const isDone = idx < currentStep;
                  const isCurrent = idx === currentStep;

                  return (
                    <div
                      key={step.key}
                      className={`relative p-4 rounded-2xl border transition ${
                        isCurrent
                          ? "bg-orange-50/80 border-orange-400 shadow-sm"
                          : isDone
                          ? "bg-zinc-50 border-zinc-200 text-zinc-700"
                          : "bg-white border-zinc-200/50 opacity-40 text-zinc-400"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                            isCurrent
                              ? "bg-orange-600 text-white"
                              : isDone
                              ? "bg-green-600 text-white"
                              : "bg-zinc-100 text-zinc-400"
                          }`}
                        >
                          {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                        </div>
                        <span className="text-[10px] font-bold text-zinc-400">Step {idx + 1}</span>
                      </div>
                      <h4 className="text-xs font-bold text-zinc-900 leading-tight">
                        {step.label}
                      </h4>
                      <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">
                        {step.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-4 bg-red-50 text-red-700 rounded-2xl text-xs mt-6 flex items-center gap-2">
              <XCircle className="w-4 h-4 shrink-0" />
              This order has been cancelled by the restaurant.
            </div>
          )}
        </div>

        {/* Payment Simulator Card */}
        <div className="bg-white rounded-3xl border border-zinc-200/80 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-orange-600" />
              <h2 className="text-base font-bold text-zinc-900">Payment & Bill</h2>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                order.paymentStatus === "PAID"
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {order.paymentStatus === "PAID" ? "PAID IN FULL" : "PAYMENT PENDING"}
            </span>
          </div>

          {paymentSuccessMsg && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-green-600" />
              <span>{paymentSuccessMsg}</span>
            </div>
          )}

          <div className="flex items-center justify-between py-2 border-t border-b border-zinc-100">
            <span className="text-sm text-zinc-600">Total Bill Amount</span>
            <span className="text-2xl font-black text-zinc-900">
              {formatPrice(order.totalAmount)}
            </span>
          </div>

          {/* If unpaid, show mock payment gateways */}
          {order.paymentStatus !== "PAID" ? (
            <div className="space-y-3 pt-2">
              <p className="text-xs text-zinc-500">
                Choose a payment option to complete your transaction:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handlePayment("UPI")}
                  disabled={isPaying}
                  className="py-3 px-3 bg-zinc-900 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition"
                >
                  <QrCode className="w-4 h-4 text-emerald-400" />
                  Pay with UPI / QR
                </button>
                <button
                  onClick={() => handlePayment("CARD")}
                  disabled={isPaying}
                  className="py-3 px-3 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition"
                >
                  <CreditCard className="w-4 h-4" />
                  Credit / Debit Card
                </button>
                <button
                  onClick={() => handlePayment("CASH")}
                  disabled={isPaying}
                  className="py-3 px-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <Utensils className="w-4 h-4" />
                  Pay Cash at Counter
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-2 text-xs text-zinc-500 flex items-center justify-between">
              <span>Paid using <strong>{order.paymentMethod || "UPI"}</strong></span>
              <span className="text-green-600 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Digital Receipt Verified
              </span>
            </div>
          )}
        </div>

        {/* Order Items Breakdown */}
        <div className="bg-white rounded-3xl border border-zinc-200/80 p-6 sm:p-8 shadow-sm">
          <h3 className="text-sm font-bold text-zinc-900 mb-4">Ordered Items</h3>
          <div className="divide-y divide-zinc-100">
            {order.items?.map((item: any) => (
              <div key={item.id} className="py-3 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs bg-zinc-100 px-2 py-0.5 rounded text-zinc-700">
                      {item.quantity}x
                    </span>
                    <span className="text-sm font-semibold text-zinc-900">
                      {item.menuItem?.name || item.name}
                    </span>
                  </div>
                  {item.notes && (
                    <p className="text-[11px] text-orange-600 italic mt-0.5 ml-8">
                      Note: &ldquo;{item.notes}&rdquo;
                    </p>
                  )}
                </div>
                <span className="text-xs font-bold text-zinc-900">
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

