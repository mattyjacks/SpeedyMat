export type ServiceType =
  | "wash-fold"
  | "comforter"
  | "pet-bed"
  | "delicates"
  | "bulk";

export type OrderStatus =
  | "scheduled"
  | "received"
  | "washing"
  | "drying"
  | "folding"
  | "ready"
  | "completed"
  | "cancelled";

export const ORDER_STATUS_FLOW: OrderStatus[] = [
  "scheduled",
  "received",
  "washing",
  "drying",
  "folding",
  "ready",
  "completed",
];

export interface ServiceItem {
  type: ServiceType;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface StatusChange {
  from: OrderStatus;
  to: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: ServiceItem[];
  status: OrderStatus;
  isRush: boolean;
  rushUpgradedAt?: string;
  totalPrice: number;
  notes: string;
  createdAt: string;
  scheduledDropOff: string;
  receivedAt?: string;
  estimatedCompletion?: string;
  completedAt?: string;
  statusHistory: StatusChange[];
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
}

export interface ServiceConfig {
  name: string;
  description: string;
  unit: string;
  pricePerUnit: number;
  minQuantity: number;
  processingHours: number;
  rushProcessingHours: number;
  icon: string;
}

export const SERVICE_CONFIG: Record<ServiceType, ServiceConfig> = {
  "wash-fold": {
    name: "Wash & Fold",
    description:
      "Standard laundry service - we wash, dry, and neatly fold your clothes with care.",
    unit: "lb",
    pricePerUnit: 2.5,
    minQuantity: 10,
    processingHours: 24,
    rushProcessingHours: 3,
    icon: "shirt",
  },
  comforter: {
    name: "Comforter & Bedding",
    description:
      "Professional cleaning for comforters, duvets, quilts, and oversized bedding items.",
    unit: "item",
    pricePerUnit: 35,
    minQuantity: 1,
    processingHours: 48,
    rushProcessingHours: 6,
    icon: "bed",
  },
  "pet-bed": {
    name: "Pet Bed Cleaning",
    description:
      "Deep cleaning and sanitization for pet beds of all sizes - too big for your home machine.",
    unit: "item",
    pricePerUnit: 30,
    minQuantity: 1,
    processingHours: 48,
    rushProcessingHours: 6,
    icon: "paw-print",
  },
  delicates: {
    name: "Delicates",
    description:
      "Gentle care for delicate fabrics, silks, lingerie, and special garments.",
    unit: "lb",
    pricePerUnit: 4.0,
    minQuantity: 5,
    processingHours: 48,
    rushProcessingHours: 4,
    icon: "sparkles",
  },
  bulk: {
    name: "Bulk / Commercial",
    description:
      "High-volume laundry for businesses, Airbnbs, hotels, and large households.",
    unit: "lb",
    pricePerUnit: 2.0,
    minQuantity: 25,
    processingHours: 48,
    rushProcessingHours: 8,
    icon: "warehouse",
  },
};

export const STATUS_LABELS: Record<OrderStatus, string> = {
  scheduled: "Scheduled",
  received: "Received",
  washing: "Washing",
  drying: "Drying",
  folding: "Folding",
  ready: "Ready for Pickup",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const STATUS_COLORS: Record<OrderStatus, string> = {
  scheduled: "bg-yellow-100 text-yellow-800 border-yellow-300",
  received: "bg-blue-100 text-blue-800 border-blue-300",
  washing: "bg-cyan-100 text-cyan-800 border-cyan-300",
  drying: "bg-orange-100 text-orange-800 border-orange-300",
  folding: "bg-purple-100 text-purple-800 border-purple-300",
  ready: "bg-green-100 text-green-800 border-green-300",
  completed: "bg-gray-100 text-gray-800 border-gray-300",
  cancelled: "bg-red-100 text-red-800 border-red-300",
};

export const DEFAULT_USER: UserProfile = {
  name: "Matt",
  email: "matt@speedymat.com",
  phone: "(602) 555-0123",
  isAdmin: true,
};
