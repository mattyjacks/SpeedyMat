// MVP Loyalty Program - LocalStorage based
// Phase 3: Full loyalty would integrate with dedicated platform

export interface LoyaltyCard {
  id: string;
  customerId: string;
  points: number;
  tier: "bronze" | "silver" | "gold" | "platinum";
  createdAt: Date;
  lastRedeemDate: Date | null;
  totalRedeemed: number;
}

export interface LoyaltyReward {
  id: string;
  name: string;
  pointsCost: number;
  description: string;
  discount?: number;
  freeService?: string;
}

export interface LoyaltyTransaction {
  id: string;
  cardId: string;
  type: "earn" | "redeem";
  points: number;
  description: string;
  date: Date;
}

// MVP Rewards Catalog
export const LOYALTY_REWARDS: LoyaltyReward[] = [
  {
    id: "discount-10",
    name: "$10 Off",
    pointsCost: 100,
    description: "$10 discount on next order",
    discount: 10,
  },
  {
    id: "discount-25",
    name: "$25 Off",
    pointsCost: 250,
    description: "$25 discount on next order",
    discount: 25,
  },
  {
    id: "free-wash",
    name: "Free Wash & Fold",
    pointsCost: 300,
    description: "Free 10lb wash & fold service",
    freeService: "wash",
  },
  {
    id: "free-rush",
    name: "Free Rush Service",
    pointsCost: 200,
    description: "Free rush processing (2x speed)",
    freeService: "rush",
  },
  {
    id: "free-delicate",
    name: "Free Delicate Cleaning",
    pointsCost: 150,
    description: "Free delicate fabric cleaning",
    freeService: "delicate",
  },
];

// Loyalty Tiers
export const LOYALTY_TIERS = {
  bronze: { minPoints: 0, multiplier: 1.0, benefits: "1 point per $1" },
  silver: { minPoints: 500, multiplier: 1.25, benefits: "1.25 points per $1 + 5% discount" },
  gold: { minPoints: 1500, multiplier: 1.5, benefits: "1.5 points per $1 + 10% discount + priority support" },
  platinum: {
    minPoints: 3000,
    multiplier: 2.0,
    benefits: "2 points per $1 + 15% discount + VIP perks",
  },
};

const LOYALTY_STORAGE_KEY = "speedymat_loyalty";

export function loadLoyaltyCards(): LoyaltyCard[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(LOYALTY_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveLoyaltyCards(cards: LoyaltyCard[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOYALTY_STORAGE_KEY, JSON.stringify(cards));
  } catch {
    console.error("Failed to save loyalty cards");
  }
}

export function calculateTier(points: number): "bronze" | "silver" | "gold" | "platinum" {
  if (points >= 3000) return "platinum";
  if (points >= 1500) return "gold";
  if (points >= 500) return "silver";
  return "bronze";
}

export function addPoints(card: LoyaltyCard, amount: number): LoyaltyCard {
  return {
    ...card,
    points: card.points + amount,
    tier: calculateTier(card.points + amount),
  };
}

export function redeemPoints(card: LoyaltyCard, amount: number): LoyaltyCard | null {
  if (card.points < amount) return null;
  return {
    ...card,
    points: card.points - amount,
    lastRedeemDate: new Date(),
    totalRedeemed: card.totalRedeemed + amount,
    tier: calculateTier(card.points - amount),
  };
}
