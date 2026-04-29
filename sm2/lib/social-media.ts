// Phase 6: Social Media Integration
// Complete social media API integration framework

export interface SocialMediaPost {
  id: string;
  platform: "instagram" | "tiktok" | "facebook" | "twitter" | "linkedin";
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  hashtags: string[];
  scheduledFor?: Date;
  postedAt?: Date;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
}

export interface SocialMediaAccount {
  id: string;
  platform: "instagram" | "tiktok" | "facebook" | "twitter" | "linkedin";
  handle: string;
  accessToken: string;
  followers: number;
  verified: boolean;
}

export interface UserGeneratedContent {
  id: string;
  userId: string;
  platform: "instagram" | "tiktok" | "facebook" | "twitter";
  postUrl: string;
  content: string;
  hashtags: string[];
  featured: boolean;
  submittedAt: Date;
}

// Social Media Templates
export const SOCIAL_TEMPLATES = {
  instagram: {
    post: "🐦 Just dropped off your laundry at SpeedyMat! Real-time tracking + Speedy's witty banter = laundry perfection. #SpeedyMat #KeepingItClean",
    story: "Your laundry is washing! Chat with Speedy for laughs 😄",
    reel: "Watch your laundry transform from dirty to CLEAN in 24 hours!",
  },
  tiktok: {
    video: "POV: You just discovered SpeedyMat and Speedy the bird mascot 🐦 #LaundryTok #SpeedyMat #KeepingItClean",
  },
  facebook: {
    post: "SpeedyMat: Where laundry meets technology! Schedule your drop-off today. 🧺✨",
    event: "Free Laundry Day - Speedy 4 Charity Community Event",
  },
  twitter: {
    tweet: "Speedy says: Your laundry doesn't have to be dirty work. Drop it off, we'll handle it. 🐦 #SpeedyMat",
    thread: "Thread: Why SpeedyMat is changing the laundry game...",
  },
  linkedin: {
    post: "SpeedyMat is hiring! Join our mission to revolutionize laundry services. 🚀",
  },
};

// Hashtag Strategy
export const HASHTAG_STRATEGY = {
  branded: ["#SpeedyMat", "#KeepingItClean", "#Speedy4Charity"],
  service: ["#LaundryService", "#LaundryDelivery", "#CleanClothes"],
  community: ["#PhoenixAZ", "#LocalBusiness", "#CommunityFirst"],
  engagement: ["#LaundryTok", "#LifeHacks", "#TimeToRelax"],
};

// Social Media Storage
const SOCIAL_STORAGE_KEY = "speedymat_social";

export function loadSocialPosts(): SocialMediaPost[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(SOCIAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveSocialPosts(posts: SocialMediaPost[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SOCIAL_STORAGE_KEY, JSON.stringify(posts));
  } catch {
    console.error("Failed to save social posts");
  }
}

export function createSocialPost(
  platform: SocialMediaPost["platform"],
  content: string,
  hashtags: string[] = [],
  imageUrl?: string
): SocialMediaPost {
  return {
    id: `post_${Date.now()}`,
    platform,
    content,
    imageUrl,
    hashtags,
    engagement: { likes: 0, comments: 0, shares: 0, views: 0 },
  };
}

export function scheduleSocialPost(
  post: SocialMediaPost,
  scheduledFor: Date
): SocialMediaPost {
  return { ...post, scheduledFor };
}

export function featureUserContent(ugc: UserGeneratedContent): UserGeneratedContent {
  return { ...ugc, featured: true };
}
