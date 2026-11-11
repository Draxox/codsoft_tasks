export interface MockCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
}

export interface MockMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  categoryName?: string;
  isVeg: boolean;
  isAvailable: boolean;
  spiciness: number;
  prepTimeMin: number;
}

export interface MockTable {
  id: string;
  tableNumber: number;
  capacity: number;
  location: string;
  status: "VACANT" | "OCCUPIED" | "RESERVED";
  qrCodeUrl?: string;
}

export const initialCategories: MockCategory[] = [
  {
    id: "cat-starters",
    name: "Starters & Small Bites",
    slug: "starters",
    description: "Crispy, savory appetizers to kick off your culinary experience",
    icon: "Utensils",
    order: 1,
  },
  {
    id: "cat-mains",
    name: "Main Course",
    slug: "main-course",
    description: "Hearty, chef-crafted signature curries, sizzlers, and bowls",
    icon: "ChefHat",
    order: 2,
  },
  {
    id: "cat-pizzas",
    name: "Wood-Fired Pizzas",
    slug: "pizzas",
    description: "Hand-stretched sourdough pizzas baked at 450°C",
    icon: "Pizza",
    order: 3,
  },
  {
    id: "cat-burgers",
    name: "Gourmet Burgers",
    slug: "burgers",
    description: "Brioche buns, smashed patties, house pickles, and melted cheese",
    icon: "Sandwich",
    order: 4,
  },
  {
    id: "cat-beverages",
    name: "Artisan Beverages",
    slug: "beverages",
    description: "Cold-pressed juices, iced mocktails, and specialty brews",
    icon: "Coffee",
    order: 5,
  },
  {
    id: "cat-desserts",
    name: "Decadent Desserts",
    slug: "desserts",
    description: "Sweet endings crafted with Belgian chocolate and fresh berries",
    icon: "Cake",
    order: 6,
  },
];

export const initialMenuItems: MockMenuItem[] = [
  {
    id: "item-1",
    name: "Truffle Parmesan Fries",
    description: "Crispy hand-cut potatoes tossed in white truffle oil, shaved parmesan, and rosemary aioli.",
    price: 249,
    imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
    categoryId: "cat-starters",
    isVeg: true,
    isAvailable: true,
    spiciness: 0,
    prepTimeMin: 12,
  },
  {
    id: "item-2",
    name: "Crispy Paneer Chilli Bites",
    description: "Cottage cheese cubes tossed in spicy Indo-Chinese wok sauce with bell peppers and spring onion.",
    price: 320,
    imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80",
    categoryId: "cat-starters",
    isVeg: true,
    isAvailable: true,
    spiciness: 2,
    prepTimeMin: 15,
  },
  {
    id: "item-3",
    name: "Smoked Chicken Wings (BBQ)",
    description: "Hickory-smoked chicken wings glazed with tangy honey chipotle barbecue sauce.",
    price: 380,
    imageUrl: "https://images.unsplash.com/photo-1527477378378-435fa1f97486?auto=format&fit=crop&w=600&q=80",
    categoryId: "cat-starters",
    isVeg: false,
    isAvailable: true,
    spiciness: 2,
    prepTimeMin: 18,
  },
  {
    id: "item-4",
    name: "Classic Butter Chicken & Garlic Naan",
    description: "Tender tandoori chicken simmered in rich creamy tomato silk gravy with handmade butter naan.",
    price: 490,
    imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80",
    categoryId: "cat-mains",
    isVeg: false,
    isAvailable: true,
    spiciness: 1,
    prepTimeMin: 20,
  },
  {
    id: "item-5",
    name: "Royal Dal Makhani & Jeera Rice",
    description: "Slow-simmered black lentils cooked overnight with churned white butter and aromatic spices.",
    price: 390,
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
    categoryId: "cat-mains",
    isVeg: true,
    isAvailable: true,
    spiciness: 1,
    prepTimeMin: 15,
  },
  {
    id: "item-6",
    name: "Quattro Formaggi Pizza (4 Cheese)",
    description: "Artisan sourdough base with San Marzano tomatoes, Fior di Latte mozzarella, gorgonzola, parmesan, and fontina.",
    price: 550,
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    categoryId: "cat-pizzas",
    isVeg: true,
    isAvailable: true,
    spiciness: 0,
    prepTimeMin: 18,
  },
  {
    id: "item-7",
    name: "Spicy Pepperoni & Hot Honey",
    description: "Loaded with slow-cured pepperoni, fresh basil, crushed chili flakes, and a drizzle of hot habanero honey.",
    price: 620,
    imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80",
    categoryId: "cat-pizzas",
    isVeg: false,
    isAvailable: true,
    spiciness: 3,
    prepTimeMin: 18,
  },
  {
    id: "item-8",
    name: "The Signature Smash Burger",
    description: "Double crisp-crust beef/mutton smash patties, melted American cheddar, grilled onions, and house secret sauce on toasted brioche.",
    price: 450,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    categoryId: "cat-burgers",
    isVeg: false,
    isAvailable: true,
    spiciness: 1,
    prepTimeMin: 14,
  },
  {
    id: "item-9",
    name: "Crispy Falafel & Hummus Burger",
    description: "Herbed chickpea & spinach patty, beetroot relish, creamy tahini garlic yogurt, and crisp rocket leaves.",
    price: 360,
    imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    categoryId: "cat-burgers",
    isVeg: true,
    isAvailable: true,
    spiciness: 0,
    prepTimeMin: 14,
  },
  {
    id: "item-10",
    name: "Passion Fruit & Mint Mojito",
    description: "Muddled fresh mint, lime wheels, passion fruit puree, and sparkling soda served over crushed ice.",
    price: 190,
    imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    categoryId: "cat-beverages",
    isVeg: true,
    isAvailable: true,
    spiciness: 0,
    prepTimeMin: 5,
  },
  {
    id: "item-11",
    name: "Cold Brew Vietnamese Iced Coffee",
    description: "18-hour steeped single-origin arabica coffee layered with sweetened condensed milk and ice.",
    price: 210,
    imageUrl: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80",
    categoryId: "cat-beverages",
    isVeg: true,
    isAvailable: true,
    spiciness: 0,
    prepTimeMin: 5,
  },
  {
    id: "item-12",
    name: "Warm Belgian Molten Lava Cake",
    description: "Rich dark chocolate sponge with an oozing ganache heart, served with vanilla bean gelato.",
    price: 290,
    imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
    categoryId: "cat-desserts",
    isVeg: true,
    isAvailable: true,
    spiciness: 0,
    prepTimeMin: 12,
  },
];

export const initialTables: MockTable[] = [
  { id: "tbl-1", tableNumber: 1, capacity: 2, location: "Window View", status: "OCCUPIED" },
  { id: "tbl-2", tableNumber: 2, capacity: 4, location: "Main Dining Room", status: "VACANT" },
  { id: "tbl-3", tableNumber: 3, capacity: 4, location: "Main Dining Room", status: "VACANT" },
  { id: "tbl-4", tableNumber: 4, capacity: 6, location: "Cozy Corner Booth", status: "OCCUPIED" },
  { id: "tbl-5", tableNumber: 5, capacity: 2, location: "Patio Terrace", status: "RESERVED" },
  { id: "tbl-6", tableNumber: 6, capacity: 8, location: "Private Dining Suite", status: "VACANT" },
  { id: "tbl-7", tableNumber: 7, capacity: 4, location: "Patio Terrace", status: "VACANT" },
  { id: "tbl-8", tableNumber: 8, capacity: 2, location: "Bar High-Tops", status: "VACANT" },
];

export interface MockOrder {
  id: string;
  orderNumber: string;
  orderType: "DINE_IN" | "TAKEAWAY";
  tableId?: string;
  tableNumber?: number;
  customerName: string;
  customerPhone?: string;
  notes?: string;
  status: "PENDING" | "CONFIRMED" | "PREPARING" | "READY" | "COMPLETED" | "CANCELLED";
  totalAmount: number;
  paymentStatus: "PENDING" | "PAID" | "FAILED";
  paymentMethod: "CASH" | "CARD" | "UPI";
  items: {
    id: string;
    menuItemId: string;
    name: string;
    quantity: number;
    unitPrice: number;
    notes?: string;
  }[];
  createdAt: string;
}

export const initialOrders: MockOrder[] = [
  {
    id: "ord-101",
    orderNumber: "DD-1041",
    orderType: "DINE_IN",
    tableId: "tbl-1",
    tableNumber: 1,
    customerName: "Aarav Sharma",
    customerPhone: "9812345678",
    notes: "Serve drinks first please",
    status: "PREPARING",
    totalAmount: 938,
    paymentStatus: "PAID",
    paymentMethod: "UPI",
    items: [
      { id: "oi-1", menuItemId: "item-6", name: "Quattro Formaggi Pizza (4 Cheese)", quantity: 1, unitPrice: 550, notes: "Crispy crust" },
      { id: "oi-2", menuItemId: "item-10", name: "Passion Fruit & Mint Mojito", quantity: 2, unitPrice: 190 },
    ],
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: "ord-102",
    orderNumber: "DD-1042",
    orderType: "DINE_IN",
    tableId: "tbl-4",
    tableNumber: 4,
    customerName: "Priya Nair",
    customerPhone: "9876501234",
    status: "PENDING",
    totalAmount: 1120,
    paymentStatus: "PENDING",
    paymentMethod: "CARD",
    items: [
      { id: "oi-3", menuItemId: "item-8", name: "The Signature Smash Burger", quantity: 2, unitPrice: 450, notes: "No onions in one burger" },
      { id: "oi-4", menuItemId: "item-11", name: "Cold Brew Vietnamese Iced Coffee", quantity: 1, unitPrice: 210 },
    ],
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: "ord-103",
    orderNumber: "DD-1043",
    orderType: "TAKEAWAY",
    customerName: "Rohan Varma",
    customerPhone: "9712398745",
    status: "READY",
    totalAmount: 870,
    paymentStatus: "PAID",
    paymentMethod: "UPI",
    items: [
      { id: "oi-5", menuItemId: "item-4", name: "Classic Butter Chicken & Garlic Naan", quantity: 1, unitPrice: 490 },
      { id: "oi-6", menuItemId: "item-3", name: "Smoked Chicken Wings (BBQ)", quantity: 1, unitPrice: 380, notes: "Extra dip" },
    ],
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
  },
];

