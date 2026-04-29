// MVP 3PL (Third-Party Logistics) Backend
// Phase 5: Full 3PL would include route optimization, driver app, real-time tracking

import { NextRequest, NextResponse } from "next/server";

export interface PickupNode {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  hours: string;
  capacity: number;
  currentOrders: number;
}

export interface DeliveryRoute {
  id: string;
  driverId: string;
  date: string;
  stops: {
    orderId: string;
    address: string;
    customerName: string;
    status: "pending" | "completed";
  }[];
  totalDistance: number;
  estimatedTime: number;
}

// MVP Pickup Nodes (Coming Soon)
const PICKUP_NODES: PickupNode[] = [
  {
    id: "node_downtown",
    name: "Downtown Phoenix",
    address: "123 Central Ave, Phoenix, AZ 85001",
    lat: 33.4484,
    lng: -112.074,
    hours: "7am-7pm Daily",
    capacity: 50,
    currentOrders: 12,
  },
  {
    id: "node_scottsdale",
    name: "Scottsdale",
    address: "456 Old Town Rd, Scottsdale, AZ 85251",
    lat: 33.4944,
    lng: -111.926,
    hours: "8am-6pm Daily",
    capacity: 40,
    currentOrders: 8,
  },
  {
    id: "node_tempe",
    name: "Tempe",
    address: "789 Mill Ave, Tempe, AZ 85281",
    lat: 33.4255,
    lng: -111.9413,
    hours: "7am-8pm Daily",
    capacity: 45,
    currentOrders: 15,
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  switch (action) {
    case "getPickupNodes":
      return handleGetPickupNodes();
    case "getDeliveryRoutes":
      return handleGetDeliveryRoutes();
    case "trackShipment":
      return handleTrackShipment(searchParams.get("orderId") || "");
    default:
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  const { action, data } = await request.json();

  switch (action) {
    case "createPickupRequest":
      return handleCreatePickupRequest(data);
    case "createDeliveryRequest":
      return handleCreateDeliveryRequest(data);
    case "updateRouteStatus":
      return handleUpdateRouteStatus(data);
    default:
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
}

function handleGetPickupNodes() {
  return NextResponse.json({
    nodes: PICKUP_NODES,
    message: "Pickup nodes coming to your neighborhood in 2025!",
  });
}

function handleGetDeliveryRoutes() {
  const mockRoutes: DeliveryRoute[] = [
    {
      id: "route_001",
      driverId: "driver_speedy",
      date: new Date().toISOString().split("T")[0],
      stops: [
        {
          orderId: "order_001",
          address: "123 Main St, Phoenix, AZ",
          customerName: "John Doe",
          status: "completed",
        },
        {
          orderId: "order_002",
          address: "456 Oak Ave, Phoenix, AZ",
          customerName: "Jane Smith",
          status: "pending",
        },
      ],
      totalDistance: 15.5,
      estimatedTime: 45,
    },
  ];

  return NextResponse.json({ routes: mockRoutes });
}

function handleTrackShipment(orderId: string) {
  return NextResponse.json({
    orderId,
    status: "out_for_delivery",
    currentLocation: { lat: 33.4484, lng: -112.074 },
    estimatedDelivery: "2:30 PM",
    driverName: "Speedy Driver",
    driverPhone: "555-SPEEDY",
    route: [
      { address: "123 Main St", status: "completed", time: "1:00 PM" },
      { address: "456 Oak Ave", status: "in_progress", time: "1:45 PM" },
      { address: "789 Elm St", status: "pending", time: "2:30 PM" },
    ],
  });
}

function handleCreatePickupRequest(data: any) {
  const { orderId, nodeId, scheduledTime } = data;

  return NextResponse.json({
    success: true,
    pickupId: `pickup_${Date.now()}`,
    orderId,
    node: PICKUP_NODES.find((n) => n.id === nodeId),
    scheduledTime,
    message: "Pickup scheduled! Driver will collect your laundry.",
  });
}

function handleCreateDeliveryRequest(data: any) {
  const { orderId, address, scheduledTime } = data;

  return NextResponse.json({
    success: true,
    deliveryId: `delivery_${Date.now()}`,
    orderId,
    address,
    scheduledTime,
    message: "Delivery scheduled! Your clean laundry will arrive soon.",
  });
}

function handleUpdateRouteStatus(data: any) {
  const { routeId, stopId, status } = data;

  return NextResponse.json({
    success: true,
    message: `Stop ${stopId} updated to ${status}`,
    routeId,
  });
}
