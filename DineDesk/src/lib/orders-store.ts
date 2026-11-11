import { initialOrders, initialTables, MockOrder, MockTable } from "./mock-data";

// Shared global singleton store so all Next.js API routes share live runtime state
const globalStore = globalThis as unknown as {
  dinedesk_orders?: MockOrder[];
  dinedesk_tables?: MockTable[];
  dinedesk_reservations?: any[];
};

export const ordersStore = {
  getOrders(): MockOrder[] {
    if (!globalStore.dinedesk_orders) {
      globalStore.dinedesk_orders = JSON.parse(JSON.stringify(initialOrders));
    }
    return globalStore.dinedesk_orders;
  },

  addOrder(order: MockOrder): MockOrder {
    const orders = this.getOrders();
    orders.unshift(order);
    return order;
  },

  findOrder(id: string): MockOrder | undefined {
    const orders = this.getOrders();
    return orders.find((o) => o.id === id || o.orderNumber === id);
  },

  updateOrder(id: string, updates: Partial<MockOrder>): MockOrder | null {
    const orders = this.getOrders();
    const order = orders.find((o) => o.id === id || o.orderNumber === id);
    if (!order) return null;
    Object.assign(order, updates);
    return order;
  },
};

export const tablesStore = {
  getTables(): MockTable[] {
    if (!globalStore.dinedesk_tables) {
      globalStore.dinedesk_tables = JSON.parse(JSON.stringify(initialTables));
    }
    return globalStore.dinedesk_tables;
  },

  addTable(table: MockTable): MockTable {
    const tables = this.getTables();
    tables.push(table);
    return table;
  },

  updateTableStatus(tableId: string | number, status: "VACANT" | "OCCUPIED" | "RESERVED"): MockTable | null {
    const tables = this.getTables();
    const table = tables.find(
      (t) => t.id === String(tableId) || t.tableNumber === Number(tableId)
    );
    if (!table) return null;
    table.status = status;
    return table;
  },
};

