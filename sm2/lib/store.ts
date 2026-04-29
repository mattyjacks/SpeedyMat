import {
  Order,
  OrderStatus,
  UserProfile,
  ServiceItem,
  SERVICE_CONFIG,
  DEFAULT_USER,
  ORDER_STATUS_FLOW,
} from "./types";

const ORDERS_KEY = "speedymat_orders";
const USER_KEY = "speedymat_user";

function generateId(): string {
  return `SM-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

// ---- User ----

export function getUser(): UserProfile {
  if (typeof window === "undefined") return DEFAULT_USER;
  const stored = localStorage.getItem(USER_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(USER_KEY, JSON.stringify(DEFAULT_USER));
  return DEFAULT_USER;
}

export function updateUser(updates: Partial<UserProfile>): UserProfile {
  const user = getUser();
  const updated = { ...user, ...updates };
  localStorage.setItem(USER_KEY, JSON.stringify(updated));
  return updated;
}

// ---- Orders ----

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(ORDERS_KEY);
  if (stored) return JSON.parse(stored);
  return [];
}

function saveOrders(orders: Order[]): void {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function getOrderById(id: string): Order | undefined {
  return getOrders().find((o) => o.id === id);
}

export function getActiveOrders(): Order[] {
  return getOrders().filter(
    (o) => o.status !== "completed" && o.status !== "cancelled"
  );
}

export function getCompletedOrders(): Order[] {
  return getOrders().filter(
    (o) => o.status === "completed" || o.status === "cancelled"
  );
}

export function calculateEstimatedCompletion(
  items: ServiceItem[],
  isRush: boolean,
  fromDate?: Date
): string {
  const base = fromDate || new Date();
  let maxHours = 0;
  for (const item of items) {
    const config = SERVICE_CONFIG[item.type];
    const hours = isRush ? config.rushProcessingHours : config.processingHours;
    if (hours > maxHours) maxHours = hours;
  }
  const est = new Date(base.getTime() + maxHours * 60 * 60 * 1000);
  return est.toISOString();
}

export function calculateTotal(
  items: ServiceItem[],
  isRush: boolean
): number {
  const base = items.reduce((sum, item) => sum + item.subtotal, 0);
  return isRush ? base * 2 : base;
}

export function createOrder(params: {
  items: ServiceItem[];
  isRush: boolean;
  notes: string;
  scheduledDropOff: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
}): Order {
  const user = getUser();
  const totalPrice = calculateTotal(params.items, params.isRush);
  const order: Order = {
    id: generateId(),
    customerName: params.customerName || user.name,
    customerEmail: params.customerEmail || user.email,
    customerPhone: params.customerPhone || user.phone,
    items: params.items,
    status: "scheduled",
    isRush: params.isRush,
    totalPrice,
    notes: params.notes,
    createdAt: new Date().toISOString(),
    scheduledDropOff: params.scheduledDropOff,
    estimatedCompletion: calculateEstimatedCompletion(
      params.items,
      params.isRush
    ),
    statusHistory: [],
  };
  const orders = getOrders();
  orders.unshift(order);
  saveOrders(orders);
  return order;
}

export function advanceOrderStatus(
  orderId: string,
  note?: string
): Order | null {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx === -1) return null;

  const order = orders[idx];
  const currentIdx = ORDER_STATUS_FLOW.indexOf(order.status);
  if (currentIdx === -1 || currentIdx >= ORDER_STATUS_FLOW.length - 1)
    return null;

  const nextStatus = ORDER_STATUS_FLOW[currentIdx + 1];
  order.statusHistory.push({
    from: order.status,
    to: nextStatus,
    timestamp: new Date().toISOString(),
    note,
  });
  order.status = nextStatus;

  if (nextStatus === "received") {
    order.receivedAt = new Date().toISOString();
    order.estimatedCompletion = calculateEstimatedCompletion(
      order.items,
      order.isRush,
      new Date()
    );
  }

  if (nextStatus === "completed") {
    order.completedAt = new Date().toISOString();
  }

  orders[idx] = order;
  saveOrders(orders);
  return order;
}

export function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
  note?: string
): Order | null {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx === -1) return null;

  const order = orders[idx];
  order.statusHistory.push({
    from: order.status,
    to: newStatus,
    timestamp: new Date().toISOString(),
    note,
  });
  order.status = newStatus;

  if (newStatus === "received") {
    order.receivedAt = new Date().toISOString();
    order.estimatedCompletion = calculateEstimatedCompletion(
      order.items,
      order.isRush,
      new Date()
    );
  }

  if (newStatus === "completed") {
    order.completedAt = new Date().toISOString();
  }

  if (newStatus === "cancelled") {
    order.completedAt = new Date().toISOString();
  }

  orders[idx] = order;
  saveOrders(orders);
  return order;
}

export function rushOrder(orderId: string): Order | null {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx === -1) return null;

  const order = orders[idx];
  if (order.isRush) return null;
  if (order.status === "completed" || order.status === "cancelled") return null;

  const oldTotal = order.totalPrice;
  order.isRush = true;
  order.rushUpgradedAt = new Date().toISOString();
  order.totalPrice = oldTotal * 2;
  order.estimatedCompletion = calculateEstimatedCompletion(
    order.items,
    true,
    order.receivedAt ? new Date(order.receivedAt) : new Date()
  );

  orders[idx] = order;
  saveOrders(orders);
  return order;
}

export function cancelOrder(orderId: string): Order | null {
  return updateOrderStatus(orderId, "cancelled", "Cancelled by user");
}

export function deleteOrder(orderId: string): boolean {
  const orders = getOrders();
  const filtered = orders.filter((o) => o.id !== orderId);
  if (filtered.length === orders.length) return false;
  saveOrders(filtered);
  return true;
}

// ---- Stats ----

export function getStats() {
  const orders = getOrders();
  const now = new Date();
  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const active = orders.filter(
    (o) => o.status !== "completed" && o.status !== "cancelled"
  );
  const completedToday = orders.filter(
    (o) =>
      o.status === "completed" &&
      o.completedAt &&
      new Date(o.completedAt) >= todayStart
  );
  const revenueToday = completedToday.reduce((s, o) => s + o.totalPrice, 0);
  const totalRevenue = orders
    .filter((o) => o.status === "completed")
    .reduce((s, o) => s + o.totalPrice, 0);
  const rushOrders = active.filter((o) => o.isRush);

  return {
    totalOrders: orders.length,
    activeOrders: active.length,
    completedToday: completedToday.length,
    revenueToday,
    totalRevenue,
    rushOrders: rushOrders.length,
    ordersByStatus: ORDER_STATUS_FLOW.reduce(
      (acc, status) => {
        acc[status] = orders.filter((o) => o.status === status).length;
        return acc;
      },
      {} as Record<string, number>
    ),
  };
}

// ---- Seed data for demo ----

export function seedDemoData(): void {
  if (getOrders().length > 0) return;

  const now = new Date();
  const hourMs = 60 * 60 * 1000;

  const demoOrders: Order[] = [
    {
      id: "SM-DEMO-001",
      customerName: "Matt",
      customerEmail: "matt@speedymat.com",
      customerPhone: "(602) 555-0123",
      items: [
        { type: "wash-fold", quantity: 15, unitPrice: 2.5, subtotal: 37.5 },
      ],
      status: "washing",
      isRush: false,
      totalPrice: 37.5,
      notes: "Please use unscented detergent",
      createdAt: new Date(now.getTime() - 5 * hourMs).toISOString(),
      scheduledDropOff: new Date(now.getTime() - 4 * hourMs).toISOString(),
      receivedAt: new Date(now.getTime() - 3 * hourMs).toISOString(),
      estimatedCompletion: new Date(
        now.getTime() + 21 * hourMs
      ).toISOString(),
      statusHistory: [
        {
          from: "scheduled",
          to: "received",
          timestamp: new Date(now.getTime() - 3 * hourMs).toISOString(),
        },
        {
          from: "received",
          to: "washing",
          timestamp: new Date(now.getTime() - 2 * hourMs).toISOString(),
        },
      ],
    },
    {
      id: "SM-DEMO-002",
      customerName: "Matt",
      customerEmail: "matt@speedymat.com",
      customerPhone: "(602) 555-0123",
      items: [
        { type: "pet-bed", quantity: 2, unitPrice: 30, subtotal: 60 },
        { type: "comforter", quantity: 1, unitPrice: 35, subtotal: 35 },
      ],
      status: "scheduled",
      isRush: false,
      totalPrice: 95,
      notes: "Large dog beds, golden retriever hair",
      createdAt: new Date(now.getTime() - 1 * hourMs).toISOString(),
      scheduledDropOff: new Date(now.getTime() + 2 * hourMs).toISOString(),
      estimatedCompletion: new Date(
        now.getTime() + 50 * hourMs
      ).toISOString(),
      statusHistory: [],
    },
    {
      id: "SM-DEMO-003",
      customerName: "Matt",
      customerEmail: "matt@speedymat.com",
      customerPhone: "(602) 555-0123",
      items: [
        {
          type: "delicates",
          quantity: 8,
          unitPrice: 4,
          subtotal: 32,
        },
      ],
      status: "ready",
      isRush: true,
      totalPrice: 64,
      notes: "Handle with care - silk blouses",
      createdAt: new Date(now.getTime() - 8 * hourMs).toISOString(),
      scheduledDropOff: new Date(now.getTime() - 7 * hourMs).toISOString(),
      receivedAt: new Date(now.getTime() - 6 * hourMs).toISOString(),
      estimatedCompletion: new Date(
        now.getTime() - 2 * hourMs
      ).toISOString(),
      statusHistory: [
        {
          from: "scheduled",
          to: "received",
          timestamp: new Date(now.getTime() - 6 * hourMs).toISOString(),
        },
        {
          from: "received",
          to: "washing",
          timestamp: new Date(now.getTime() - 5 * hourMs).toISOString(),
        },
        {
          from: "washing",
          to: "drying",
          timestamp: new Date(now.getTime() - 4 * hourMs).toISOString(),
        },
        {
          from: "drying",
          to: "folding",
          timestamp: new Date(now.getTime() - 3 * hourMs).toISOString(),
        },
        {
          from: "folding",
          to: "ready",
          timestamp: new Date(now.getTime() - 2 * hourMs).toISOString(),
        },
      ],
    },
  ];

  saveOrders(demoOrders);
}
