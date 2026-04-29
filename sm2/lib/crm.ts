// MVP CRM System - LocalStorage based
// Phase 3: Full CRM would integrate with Salesforce/HubSpot

export interface CustomerProfile {
  id: string;
  email: string;
  phone: string;
  name: string;
  address: string;
  createdAt: Date;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: Date | null;
  preferences: {
    notifications: boolean;
    newsletter: boolean;
    specialOffers: boolean;
  };
  notes: string;
}

export interface CRMSegment {
  id: string;
  name: string;
  criteria: {
    minOrders?: number;
    minSpent?: number;
    lastOrderDays?: number;
  };
  customerIds: string[];
}

export interface CRMCampaign {
  id: string;
  name: string;
  type: "email" | "sms" | "push";
  segmentId: string;
  message: string;
  createdAt: Date;
  sentAt: Date | null;
  openRate?: number;
  clickRate?: number;
}

// MVP CRM Storage
const CRM_STORAGE_KEY = "speedymat_crm";

export function loadCustomerProfiles(): CustomerProfile[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(CRM_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveCustomerProfiles(profiles: CustomerProfile[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(profiles));
  } catch {
    console.error("Failed to save customer profiles");
  }
}

export function getCustomerSegments(profiles: CustomerProfile[]): CRMSegment[] {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  return [
    {
      id: "vip",
      name: "VIP Customers",
      criteria: { minOrders: 10, minSpent: 500 },
      customerIds: profiles
        .filter((p) => p.totalOrders >= 10 && p.totalSpent >= 500)
        .map((p) => p.id),
    },
    {
      id: "active",
      name: "Active Customers",
      criteria: { lastOrderDays: 30 },
      customerIds: profiles
        .filter((p) => p.lastOrderDate && p.lastOrderDate > thirtyDaysAgo)
        .map((p) => p.id),
    },
    {
      id: "atrisk",
      name: "At-Risk (Inactive)",
      criteria: { lastOrderDays: 90 },
      customerIds: profiles
        .filter(
          (p) =>
            !p.lastOrderDate || p.lastOrderDate < new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
        )
        .map((p) => p.id),
    },
  ];
}
