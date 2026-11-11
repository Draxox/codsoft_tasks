# 🍽️ DineDesk — Modern Restaurant Ordering & Table Management Platform

> Built for the **CodSoft Full Stack Web Development Internship** (Project 1 of 3)

**DineDesk** is an enterprise-grade restaurant management and digital ordering system built with **Next.js 15+ (React 19)**, **Tailwind CSS 4**, **PostgreSQL**, and **Prisma ORM**. It unifies customer digital dining, table reservations, contactless QR codes, a live touchscreen Kitchen Display System (KDS), and a manager analytics dashboard into a single real-time platform.

---

## 🌟 Key Features

### 🧑‍💼 1. Customer Dining & Ordering Portal (`/menu`)
- **Digital Interactive Menu**: High-resolution imagery, dietary classification (**Pure Veg** vs **Non-Veg**), spice-level flames, and estimated preparation time.
- **Dynamic Category Filtering & Search**: Instant real-time filtering for Starters, Mains, Wood-Fired Pizzas, Smash Burgers, Specialty Beverages, and Desserts.
- **Contactless QR Table Ordering**: Scanning a table QR code automatically binds the order to that table (e.g. `/menu?table=4`).
- **Cart & Order Customization**: Item quantity counters and custom cooking instructions (e.g., *"mild spice, extra garlic aioli"*).
- **Dining Modes**: Seamless toggle between **Dine-In** (with Table selection) and **Takeaway / Pickup**.

### 📅 2. Table Reservation System (`/reservations`)
- **Instant Booking Engine**: Select party size (1 to 10+ guests), reservation date, and time slot.
- **Atmospheric Preferences**: Choose between *Main Dining Hall*, *Window View*, *Patio Terrace*, or *Private Dining Suite*.
- **Automatic Table Assignment**: Checks vacant tables in PostgreSQL and marks the assigned table as `RESERVED`.
- **Instant Confirmation & Reference**: Generates a booking reference code and option to pre-select dishes from the menu.

### ⏱️ 3. Live Order Tracker & Payment Simulator (`/order/[id]`)
- **Real-Time 4-Stage Stepper**:
  1. `Order Received` (Queued)
  2. `Cooking in Kitchen` (Active chef preparation)
  3. `Ready to Serve` (Plated at the pass)
  4. `Served & Completed` (Meal delivered)
- **Simulated Payment Gateway**: Supports **UPI (QR / Google Pay / PhonePe)**, **Credit/Debit Card**, and **Cash at Counter** with instant digital receipt generation.
- **Live Polling**: Background sync automatically reflects kitchen status updates every 3.5 seconds without manual page refreshes.

### 👨‍🍳 4. Kitchen Display System — KDS (`/kitchen`)
- **Kanban Prep Board**: Designed for touchscreen kitchen tablets:
  - *Column 1*: Incoming New Orders
  - *Column 2*: On the Stove / Oven (`PREPARING`)
  - *Column 3*: Food Plated & Ready (`READY`)
- **Elapsed Timer**: Real-time timer badges showing order age (`4m ago`, with alerts for delays).
- **Web Audio Chime**: Native Web Audio API chime sounds when a new order lands in the kitchen queue.
- **One-Tap Status Progression**: Chefs advance orders with a single tap, updating customer screens instantly.

### 👔 5. Manager / Admin Portal (`/admin`)
- **Real-Time KPIs**: Live gross revenue, active orders counter, and floor table occupancy rate.
- **Table Floor Plan & QR Standee Generator (`/admin/tables`)**:
  - Live table state switches (`VACANT` ➔ `OCCUPIED` ➔ `RESERVED`).
  - Generates downloadable, printable QR code standees linking directly to `/menu?table=X`.
  - Add new dining tables with capacity and floor location.
- **Menu & Stock Availability (`/admin/menu`)**: Instant toggle for *"In Stock"* vs *"Sold Out"* when kitchen ingredients run low.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 15+ / 16 (Turbopack, App Router) | Full-stack React framework & Server Endpoints |
| **Frontend Library** | React 19 | Latest concurrent UI components & hooks |
| **Styling** | Tailwind CSS 4.0 | Modern utility-first responsive styling |
| **Icons** | Lucide React | High-contrast, clean icons |
| **Database** | PostgreSQL 15 | Relational persistence for orders, tables, and reservations |
| **ORM** | Prisma ORM 5.22 / 6 | Type-safe queries, schema modeling, and migrations |
| **Audio** | HTML5 Web Audio API | Zero-dependency kitchen bell chime |
| **QR Engine** | QR Server API | Real-time QR code generation for physical table tents |

---

## 📐 Architecture & Data Flow

```mermaid
flowchart TD
    subgraph Browser ["Client Applications (React 19)"]
        Customer["🧑‍🍳 Customer Experience<br/>/menu & /order/[id]"]
        Kitchen["👨‍🍳 Kitchen KDS<br/>/kitchen"]
        Admin["👔 Admin Dashboard<br/>/admin"]
    end

    subgraph API ["Next.js App Router API Routes"]
        MenuRoute["/api/menu"]
        OrderRoute["/api/orders & /api/orders/[id]"]
        TableRoute["/api/tables"]
        ResRoute["/api/reservations"]
        StatsRoute["/api/stats"]
    end

    subgraph Database ["PostgreSQL 15 via Prisma ORM"]
        Prisma["Prisma Singleton Client"]
        Tables[("Table Model")]
        Categories[("Category Model")]
        MenuItems[("MenuItem Model")]
        Orders[("Order & OrderItem Models")]
        Reservations[("Reservation Model")]
    end

    Customer -->|Fetch Menu / Place Order| API
    Kitchen -->|Poll & Update Status| OrderRoute
    Admin -->|Manage Tables & Stock| API
    API --> Prisma
    Prisma --> Tables
    Prisma --> Categories
    Prisma --> MenuItems
    Prisma --> Orders
    Prisma --> Reservations
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** `v18.x` or `v20.x` or `v22.x`
- **PostgreSQL 15+** installed locally or a free cloud database (such as [Neon.tech](https://neon.tech) or [Supabase](https://supabase.com)).

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Database Configuration
Create a `.env` file in the root directory (or use the provided `.env`):
```env
# Local PostgreSQL default connection:
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/dinedesk?schema=public"

# Next.js App URL:
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Push the Prisma schema to your PostgreSQL database:
```bash
npx prisma db push
```

Populate the database with realistic dishes, tables, and sample orders:
```bash
npm run prisma:seed
```

> **Note:** If your database is not yet connected during local review, DineDesk automatically activates its graceful fallback data store so the entire interface, cart, reservations, and kitchen KDS function seamlessly!

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🧪 Testing the Complete Workflow

1. **Guest Order Flow**:
   - Visit `http://localhost:3000/menu?table=3`.
   - Add a *Quattro Formaggi Pizza* and a *Passion Fruit Mojito* to the cart.
   - Click **Cart**, enter your name, and click **Confirm & Send to Kitchen**.
   - You will be redirected to the **Live Order Tracking Page** (`/order/[id]`).

2. **Kitchen Operations Flow**:
   - Open `http://localhost:3000/kitchen` in a separate tab or window.
   - Notice the order appear under **1. New Orders** accompanied by the kitchen chime.
   - Click **Accept & Start Cooking** ➔ moves to **2. On the Stove / Oven**.
   - Click **Food Plated & Ready!** ➔ moves to **3. Ready to Serve**.
   - Switch back to the customer tab: notice the status updated automatically in real time!

3. **Table QR Code Generation**:
   - Open `http://localhost:3000/admin/tables`.
   - Select any table (e.g. Table #4).
   - See the generated printable QR code standee ready for physical table tents.

4. **Table Reservation**:
   - Open `http://localhost:3000/reservations`.
   - Choose party size, date, time slot, and seating area (e.g., Patio Terrace).
   - Submit to receive an instant booking confirmation reference.

---

## 📂 Project Structure

```text
DineDesk/
├── prisma/
│   ├── schema.prisma       # PostgreSQL relational data models
│   └── seed.js             # Realistic menu & tables database seeder
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Global shell with Navbar, CartDrawer & Footer
│   │   ├── page.tsx        # Restaurant Landing & Hero presentation
│   │   ├── globals.css     # Tailwind CSS 4 styling directives
│   │   ├── menu/
│   │   │   └── page.tsx    # Digital Menu with search & veg/non-veg filter
│   │   ├── reservations/
│   │   │   └── page.tsx    # Table Booking flow & instant confirmation
│   │   ├── order/
│   │   │   └── [id]/
│   │   │       └── page.tsx# Live Stepper tracker & simulated payment
│   │   ├── kitchen/
│   │   │   └── page.tsx    # Kitchen Display System (KDS) Kanban board
│   │   ├── admin/
│   │   │   ├── page.tsx    # Manager Dashboard (KPIs & Live Order Stream)
│   │   │   ├── tables/
│   │   │   │   └── page.tsx# Table Floor Plan & Printable QR Codes
│   │   │   └── menu/
│   │   │       └── page.tsx# Real-time In-Stock / Sold-Out toggles
│   │   └── api/            # Server endpoints (menu, orders, tables, stats)
│   ├── components/         # Reusable UI components (Navbar, CartDrawer, MenuCard)
│   ├── context/            # CartContext state manager with localStorage persistence
│   └── lib/                # Prisma client singleton, utilities, mock store
├── package.json
└── tsconfig.json
```

---

## 👨‍💻 Internship Submission Information
- **Internship**: CodSoft Full Stack Web Development Internship
- **Role**: Full Stack Developer
- **Project**: DineDesk — Restaurant Ordering & Table Management Platform (Project 1 of 3)

