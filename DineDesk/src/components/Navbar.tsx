"use client";

import React, { useState } from "react";
import Link from "next/navigation";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Utensils, ShoppingBag, CalendarDays, ChefHat, LayoutDashboard, Menu as Hamburger, X } from "lucide-react";
import LinkNext from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Digital Menu", href: "/menu", icon: Utensils },
    { label: "Book a Table", href: "/reservations", icon: CalendarDays },
    { label: "Kitchen Display (KDS)", href: "/kitchen", icon: ChefHat },
    { label: "Admin Portal", href: "/admin", icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <LinkNext href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition transform">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-zinc-900 group-hover:text-orange-600 transition">
              Dine<span className="text-orange-600">Desk</span>
            </span>
            <span className="block text-[10px] uppercase font-bold tracking-widest text-zinc-400">
              Smart Restaurant OS
            </span>
          </div>
        </LinkNext>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <LinkNext
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-orange-50 text-orange-600 font-semibold"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-orange-600" : "text-zinc-400"}`} />
                {link.label}
              </LinkNext>
            );
          })}
        </nav>

        {/* Right Action: Cart button & mobile hamburger */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-medium rounded-xl shadow-sm transition group"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Cart</span>
            {totalItems > 0 && (
              <span className="flex items-center justify-center min-w-5 h-5 px-1 bg-white text-orange-600 text-xs font-bold rounded-full transition transform group-hover:scale-110">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-600 hover:bg-zinc-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Hamburger className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white px-4 py-3 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <LinkNext
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive ? "bg-orange-50 text-orange-600 font-semibold" : "text-zinc-700 hover:bg-zinc-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </LinkNext>
            );
          })}
        </div>
      )}
    </header>
  );
}

