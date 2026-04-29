// MVP Mobile App Backend API Routes
// Phase 4: Full mobile app would use React Native/Flutter

import { NextRequest, NextResponse } from "next/server";

// Mobile App Authentication
export async function POST(request: NextRequest) {
  const { action, data } = await request.json();

  switch (action) {
    case "login":
      return handleMobileLogin(data);
    case "register":
      return handleMobileRegister(data);
    case "getProfile":
      return handleGetProfile(data);
    case "updateProfile":
      return handleUpdateProfile(data);
    case "scheduleOrder":
      return handleScheduleOrder(data);
    case "trackOrder":
      return handleTrackOrder(data);
    case "getLoyaltyCard":
      return handleGetLoyaltyCard(data);
    case "getNotifications":
      return handleGetNotifications(data);
    default:
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
}

async function handleMobileLogin(data: any) {
  // MVP: Simple email/password validation
  // Phase 4: Would integrate with proper auth system
  const { email, password } = data;

  if (!email || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    token: `token_${Date.now()}`,
    user: {
      id: `user_${email}`,
      email,
      name: email.split("@")[0],
    },
  });
}

async function handleMobileRegister(data: any) {
  const { email, password, name, phone } = data;

  if (!email || !password || !name) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    token: `token_${Date.now()}`,
    user: {
      id: `user_${email}`,
      email,
      name,
      phone,
    },
  });
}

async function handleGetProfile(data: any) {
  const { userId } = data;

  return NextResponse.json({
    id: userId,
    email: "customer@example.com",
    name: "John Doe",
    phone: "555-1234",
    address: "123 Main St, Phoenix, AZ 85001",
    totalOrders: 12,
    totalSpent: 450,
    loyaltyPoints: 1250,
    loyaltyTier: "gold",
  });
}

async function handleUpdateProfile(data: any) {
  const { userId, updates } = data;

  return NextResponse.json({
    success: true,
    message: "Profile updated",
    user: { id: userId, ...updates },
  });
}

async function handleScheduleOrder(data: any) {
  const { userId, services, date, time, notes } = data;

  return NextResponse.json({
    success: true,
    orderId: `order_${Date.now()}`,
    status: "scheduled",
    scheduledFor: `${date} at ${time}`,
    estimatedCompletion: "24 hours",
    totalPrice: 25.5,
  });
}

async function handleTrackOrder(data: any) {
  const { orderId } = data;

  return NextResponse.json({
    orderId,
    status: "washing",
    progress: 40,
    estimatedCompletion: "2 hours",
    timeline: [
      { status: "received", time: "10:00 AM", completed: true },
      { status: "washing", time: "10:15 AM", completed: true },
      { status: "drying", time: "11:30 AM", completed: false },
      { status: "folding", time: "1:00 PM", completed: false },
      { status: "ready", time: "2:00 PM", completed: false },
    ],
  });
}

async function handleGetLoyaltyCard(data: any) {
  const { userId } = data;

  return NextResponse.json({
    cardId: `card_${userId}`,
    points: 1250,
    tier: "gold",
    nextTierPoints: 1500,
    pointsToNextTier: 250,
    rewards: [
      { id: "r1", name: "$10 Off", pointsCost: 100 },
      { id: "r2", name: "$25 Off", pointsCost: 250 },
      { id: "r3", name: "Free Wash & Fold", pointsCost: 300 },
    ],
  });
}

async function handleGetNotifications(data: any) {
  const { userId } = data;

  return NextResponse.json({
    notifications: [
      {
        id: "n1",
        type: "order_ready",
        title: "Your laundry is ready!",
        message: "Order #12345 is ready for pickup",
        timestamp: new Date(),
      },
      {
        id: "n2",
        type: "loyalty_reward",
        title: "You earned 50 points!",
        message: "You're now 200 points away from Gold tier",
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: "n3",
        type: "speedy_chat",
        title: "Speedy says hi!",
        message: "Chat with Speedy for laundry tips and laughs",
        timestamp: new Date(Date.now() - 86400000),
      },
    ],
  });
}
