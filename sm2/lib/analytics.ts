// Analytics & Reporting System
// Comprehensive metrics for business intelligence

export interface AnalyticsMetrics {
  period: "daily" | "weekly" | "monthly" | "yearly";
  startDate: Date;
  endDate: Date;
  metrics: {
    orders: OrderMetrics;
    revenue: RevenueMetrics;
    customers: CustomerMetrics;
    loyalty: LoyaltyMetrics;
    operations: OperationsMetrics;
    charity: CharityMetrics;
  };
}

export interface OrderMetrics {
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  averageOrderValue: number;
  rushOrderPercentage: number;
  ordersByService: Record<string, number>;
  ordersByStatus: Record<string, number>;
}

export interface RevenueMetrics {
  totalRevenue: number;
  grossProfit: number;
  grossMargin: number;
  revenueByService: Record<string, number>;
  revenueByLocation: Record<string, number>;
  averageTransactionValue: number;
  refunds: number;
}

export interface CustomerMetrics {
  totalCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  churnRate: number;
  customerLifetimeValue: number;
  customerAcquisitionCost: number;
  netPromoterScore: number;
}

export interface LoyaltyMetrics {
  totalPointsIssued: number;
  totalPointsRedeemed: number;
  activeCards: number;
  tierDistribution: Record<string, number>;
  redemptionRate: number;
  averagePointsPerCustomer: number;
}

export interface OperationsMetrics {
  machineUtilization: number;
  averageProcessingTime: number;
  qualityScore: number;
  employeeProductivity: number;
  costPerOrder: number;
  wastePercentage: number;
}

export interface CharityMetrics {
  totalFamiliesServed: number;
  totalDonated: number;
  volunteerHours: number;
  communityPartnerships: number;
  impactScore: number;
}

// Analytics Storage
const ANALYTICS_STORAGE_KEY = "speedymat_analytics";

export function loadAnalytics(): AnalyticsMetrics[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveAnalytics(metrics: AnalyticsMetrics[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(metrics));
  } catch {
    console.error("Failed to save analytics");
  }
}

// Mock Analytics Data
export function generateMockAnalytics(period: "daily" | "weekly" | "monthly" = "monthly"): AnalyticsMetrics {
  const now = new Date();
  const startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  return {
    period,
    startDate,
    endDate: now,
    metrics: {
      orders: {
        totalOrders: 342,
        completedOrders: 328,
        cancelledOrders: 14,
        averageOrderValue: 32.5,
        rushOrderPercentage: 18,
        ordersByService: {
          "wash-fold": 156,
          "comforter": 48,
          "pet-bed": 62,
          "delicates": 42,
          "bulk": 34,
        },
        ordersByStatus: {
          completed: 328,
          processing: 8,
          scheduled: 6,
          cancelled: 14,
        },
      },
      revenue: {
        totalRevenue: 11127.5,
        grossProfit: 4881.1,
        grossMargin: 43.8,
        revenueByService: {
          "wash-fold": 3900,
          "comforter": 1680,
          "pet-bed": 1860,
          "delicates": 1680,
          "bulk": 680,
        },
        revenueByLocation: {
          "phoenix-main": 6664.5,
          "scottsdale": 2463,
          "tempe": 2000,
        },
        averageTransactionValue: 32.5,
        refunds: 250,
      },
      customers: {
        totalCustomers: 487,
        newCustomers: 62,
        returningCustomers: 425,
        churnRate: 3.2,
        customerLifetimeValue: 485.2,
        customerAcquisitionCost: 45.0,
        netPromoterScore: 72,
      },
      loyalty: {
        totalPointsIssued: 11127,
        totalPointsRedeemed: 2850,
        activeCards: 312,
        tierDistribution: {
          bronze: 145,
          silver: 98,
          gold: 52,
          platinum: 17,
        },
        redemptionRate: 25.6,
        averagePointsPerCustomer: 35.6,
      },
      operations: {
        machineUtilization: 78.5,
        averageProcessingTime: 22.3,
        qualityScore: 94.2,
        employeeProductivity: 8.6,
        costPerOrder: 18.5,
        wastePercentage: 2.1,
      },
      charity: {
        totalFamiliesServed: 487,
        totalDonated: 2225.5,
        volunteerHours: 156,
        communityPartnerships: 8,
        impactScore: 92,
      },
    },
  };
}

// Dashboard Summary
export function getDashboardSummary(metrics: AnalyticsMetrics) {
  const { orders, revenue, customers, loyalty, charity, operations } = metrics.metrics;

  return {
    keyMetrics: [
      {
        label: "Total Revenue",
        value: `$${revenue.totalRevenue.toFixed(2)}`,
        change: "+12.5%",
        trend: "up",
      },
      {
        label: "Gross Margin",
        value: `${revenue.grossMargin.toFixed(1)}%`,
        change: "+2.1%",
        trend: "up",
      },
      {
        label: "Orders Completed",
        value: orders.completedOrders.toString(),
        change: "+8.3%",
        trend: "up",
      },
      {
        label: "Customer Satisfaction",
        value: `${customers.netPromoterScore}`,
        change: "+5 pts",
        trend: "up",
      },
      {
        label: "Families Served",
        value: charity.totalFamiliesServed.toString(),
        change: "+62",
        trend: "up",
      },
      {
        label: "Active Loyalty Cards",
        value: loyalty.activeCards.toString(),
        change: "+28",
        trend: "up",
      },
    ],
    topServices: Object.entries(revenue.revenueByService)
      .map(([service, rev]) => ({ service, revenue: rev }))
      .sort((a, b) => b.revenue - a.revenue),
    customerInsights: {
      totalCustomers: customers.totalCustomers,
      newThisMonth: customers.newCustomers,
      churnRate: customers.churnRate,
      ltv: customers.customerLifetimeValue,
    },
    operationalHealth: {
      machineUtilization: operations.machineUtilization,
      qualityScore: operations.qualityScore,
      costPerOrder: operations.costPerOrder,
    },
  };
}
