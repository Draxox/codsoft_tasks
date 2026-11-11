import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Utensils, CalendarDays, ChefHat, LayoutDashboard, QrCode, Sparkles, ArrowRight, Clock, ShieldCheck, Heart } from "lucide-react";
import { initialMenuItems } from "@/lib/mock-data";
import MenuCard from "@/components/MenuCard";

export default function HomePage() {
  const featuredDishes = initialMenuItems.slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/70 via-white to-zinc-50 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Value Proposition */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                Modern Dining Platform & Kitchen OS
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 tracking-tight leading-tight">
                Fresh Flavors, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                  Zero Wait Time.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                DineDesk connects customers, kitchen staff, and restaurant managers in real time.
                Browse our digital menu, reserve your favorite table, or send orders straight to our kitchen chefs.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  href="/menu"
                  className="px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-orange-500/25 transition transform hover:-translate-y-0.5"
                >
                  <Utensils className="w-4 h-4" />
                  Explore Digital Menu
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/reservations"
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-50 active:bg-zinc-100 text-zinc-800 font-bold text-sm border border-zinc-300 shadow-xs flex items-center gap-2 transition"
                >
                  <CalendarDays className="w-4 h-4 text-orange-600" />
                  Book a Table
                </Link>

                <Link
                  href="/kitchen"
                  className="px-4 py-3.5 rounded-xl bg-zinc-900 hover:bg-black text-zinc-200 font-bold text-sm flex items-center gap-2 shadow-sm transition"
                >
                  <ChefHat className="w-4 h-4 text-amber-400" />
                  Kitchen (KDS)
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-zinc-200/80 flex items-center justify-center lg:justify-start gap-6 text-xs text-zinc-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span>100% Contactless QR</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span>Avg Prep: 15 Mins</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>4.9 Star Culinary Rating</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Showcase */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
                  alt="Modern Restaurant Dining"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Floating Live Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                      <QrCode className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-900">Scan & Dine at Table</p>
                      <p className="text-[11px] text-zinc-500">Each table has a dedicated instant QR code</p>
                    </div>
                  </div>
                  <Link
                    href="/menu?table=2"
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 px-3 py-1.5 rounded-lg transition"
                  >
                    Simulate
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars / Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-orange-600">
            End-To-End Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mt-2">
            One Unified Platform for Guests & Staff
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-2">
            Eliminate miscommunicated orders, paper order tickets, and crowded host stands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs hover:border-orange-300 transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-zinc-900">Digital Menu & Cart</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Crisp photos, allergen tags, spice ratings, and custom instructions. Add items and send orders right from your smartphone.
            </p>
            <Link href="/menu" className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:gap-2 transition-all">
              View Menu <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs hover:border-orange-300 transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <ChefHat className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-zinc-900">Kitchen Display System (KDS)</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Touchscreen order ticket board for the culinary line. Visual timer alerts, itemized modifications, and one-tap status updates.
            </p>
            <Link href="/kitchen" className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:gap-2 transition-all">
              Open Kitchen KDS <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs hover:border-orange-300 transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-zinc-900">Admin & Table Management</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Floor plan configuration, QR code printing, daily revenue analytics, and live stock/availability toggles in one clean view.
            </p>
            <Link href="/admin" className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:gap-2 transition-all">
              Admin Portal <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Chef Specials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-orange-600">
              Chef&apos;s Highlights
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mt-1">
              Trending Popular Dishes
            </h2>
          </div>
          <Link
            href="/menu"
            className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            See Full Menu <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDishes.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

