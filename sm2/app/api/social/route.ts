// Phase 6: Social Media API Integration
// Handles Instagram, TikTok, Facebook, Twitter, LinkedIn

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  const platform = searchParams.get("platform");

  switch (action) {
    case "getFeed":
      return handleGetFeed(platform || "instagram");
    case "getAnalytics":
      return handleGetAnalytics(platform || "instagram");
    case "getUserContent":
      return handleGetUserContent();
    default:
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  const { action, data } = await request.json();

  switch (action) {
    case "createPost":
      return handleCreatePost(data);
    case "schedulePost":
      return handleSchedulePost(data);
    case "shareUserContent":
      return handleShareUserContent(data);
    case "connectAccount":
      return handleConnectAccount(data);
    case "trackEngagement":
      return handleTrackEngagement(data);
    default:
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
}

function handleGetFeed(platform: string) {
  const feeds: Record<string, any[]> = {
    instagram: [
      {
        id: "ig_1",
        type: "post",
        content: "🐦 Just dropped off your laundry at SpeedyMat!",
        image: "/speedymat logo speedy.png",
        likes: 234,
        comments: 45,
        timestamp: new Date(),
      },
      {
        id: "ig_2",
        type: "reel",
        content: "Watch your laundry transform in 24 hours!",
        video: "https://example.com/reel.mp4",
        views: 5420,
        likes: 892,
        timestamp: new Date(Date.now() - 86400000),
      },
    ],
    tiktok: [
      {
        id: "tt_1",
        type: "video",
        content: "POV: You just discovered SpeedyMat 🐦",
        video: "https://example.com/tiktok.mp4",
        views: 125000,
        likes: 8900,
        shares: 1200,
        timestamp: new Date(),
      },
    ],
    facebook: [
      {
        id: "fb_1",
        type: "post",
        content: "SpeedyMat Community Update: Speedy 4 Charity served 500+ families!",
        likes: 156,
        comments: 32,
        shares: 45,
        timestamp: new Date(),
      },
    ],
    twitter: [
      {
        id: "tw_1",
        type: "tweet",
        content: "Speedy says: Your laundry doesn't have to be dirty work. 🐦 #SpeedyMat",
        likes: 892,
        retweets: 234,
        replies: 45,
        timestamp: new Date(),
      },
    ],
    linkedin: [
      {
        id: "li_1",
        type: "post",
        content: "SpeedyMat is hiring! Join our mission to revolutionize laundry. 🚀",
        likes: 234,
        comments: 28,
        shares: 12,
        timestamp: new Date(),
      },
    ],
  };

  return NextResponse.json({
    platform,
    posts: feeds[platform] || [],
    totalFollowers: {
      instagram: 12500,
      tiktok: 45000,
      facebook: 8900,
      twitter: 3200,
      linkedin: 1850,
    }[platform] || 0,
  });
}

function handleGetAnalytics(platform: string) {
  return NextResponse.json({
    platform,
    analytics: {
      totalReach: Math.floor(Math.random() * 100000) + 10000,
      totalEngagement: Math.floor(Math.random() * 5000) + 500,
      engagementRate: (Math.random() * 8 + 2).toFixed(2) + "%",
      topPost: {
        id: "post_123",
        engagement: 2450,
        reach: 45000,
      },
      audienceDemographics: {
        ageGroups: {
          "18-24": "22%",
          "25-34": "38%",
          "35-44": "25%",
          "45+": "15%",
        },
        locations: {
          "Phoenix, AZ": "45%",
          "Scottsdale, AZ": "18%",
          "Tempe, AZ": "12%",
          "Other": "25%",
        },
      },
      growthRate: "+12.5% this month",
    },
  });
}

function handleGetUserContent() {
  return NextResponse.json({
    userGeneratedContent: [
      {
        id: "ugc_1",
        platform: "instagram",
        handle: "@happycustomer",
        content: "SpeedyMat saved my life! Clean clothes in 24 hours 🐦",
        postUrl: "https://instagram.com/p/abc123",
        featured: true,
        likes: 234,
        timestamp: new Date(),
      },
      {
        id: "ugc_2",
        platform: "tiktok",
        handle: "@busymom",
        content: "No more laundry stress thanks to SpeedyMat!",
        postUrl: "https://tiktok.com/@busymom/video/123",
        featured: true,
        views: 45000,
        timestamp: new Date(Date.now() - 172800000),
      },
    ],
    message: "Share your SpeedyMat experience! Tag us for a chance to be featured.",
  });
}

function handleCreatePost(data: any) {
  const { platform, content, hashtags, imageUrl } = data;

  return NextResponse.json({
    success: true,
    postId: `post_${Date.now()}`,
    platform,
    content,
    hashtags,
    imageUrl,
    postedAt: new Date(),
    message: `Post created on ${platform}!`,
  });
}

function handleSchedulePost(data: any) {
  const { platform, content, scheduledFor } = data;

  return NextResponse.json({
    success: true,
    postId: `scheduled_${Date.now()}`,
    platform,
    content,
    scheduledFor,
    message: `Post scheduled for ${scheduledFor}`,
  });
}

function handleShareUserContent(data: any) {
  const { ugcId, platforms } = data;

  return NextResponse.json({
    success: true,
    ugcId,
    sharedOn: platforms,
    message: `User content shared to ${platforms.join(", ")}!`,
  });
}

function handleConnectAccount(data: any) {
  const { platform, accessToken } = data;

  return NextResponse.json({
    success: true,
    platform,
    connected: true,
    message: `${platform} account connected successfully!`,
  });
}

function handleTrackEngagement(data: any) {
  const { postId, platform } = data;

  return NextResponse.json({
    postId,
    platform,
    engagement: {
      likes: Math.floor(Math.random() * 5000) + 100,
      comments: Math.floor(Math.random() * 500) + 10,
      shares: Math.floor(Math.random() * 200) + 5,
      views: Math.floor(Math.random() * 100000) + 1000,
    },
    timestamp: new Date(),
  });
}
