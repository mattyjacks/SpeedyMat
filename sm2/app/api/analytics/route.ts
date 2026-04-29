// Analytics API Endpoint
import { NextRequest, NextResponse } from "next/server";
import { generateMockAnalytics, getDashboardSummary } from "@/lib/analytics";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  const period = (searchParams.get("period") as "daily" | "weekly" | "monthly") || "monthly";

  switch (action) {
    case "getDashboard":
      return handleGetDashboard(period);
    case "getMetrics":
      return handleGetMetrics(period);
    case "getRevenue":
      return handleGetRevenue(period);
    case "getCustomers":
      return handleGetCustomers(period);
    case "getCharity":
      return handleGetCharity(period);
    default:
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
}

function handleGetDashboard(period: "daily" | "weekly" | "monthly") {
  const metrics = generateMockAnalytics(period);
  const summary = getDashboardSummary(metrics);

  return NextResponse.json({
    period,
    summary,
    lastUpdated: new Date(),
  });
}

function handleGetMetrics(period: "daily" | "weekly" | "monthly") {
  const metrics = generateMockAnalytics(period);

  return NextResponse.json({
    period,
    metrics: metrics.metrics,
    dateRange: {
      start: metrics.startDate,
      end: metrics.endDate,
    },
  });
}

function handleGetRevenue(period: "daily" | "weekly" | "monthly") {
  const metrics = generateMockAnalytics(period);
  const { revenue } = metrics.metrics;

  return NextResponse.json({
    period,
    revenue,
    chart: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      data: [2500, 2800, 2900, 2927.5],
    },
  });
}

function handleGetCustomers(period: "daily" | "weekly" | "monthly") {
  const metrics = generateMockAnalytics(period);
  const { customers } = metrics.metrics;

  return NextResponse.json({
    period,
    customers,
    cohorts: {
      new: 62,
      returning: 425,
      churned: 15,
    },
    segments: {
      vip: 45,
      active: 312,
      atrisk: 98,
      inactive: 32,
    },
  });
}

function handleGetCharity(period: "daily" | "weekly" | "monthly") {
  const metrics = generateMockAnalytics(period);
  const { charity } = metrics.metrics;

  return NextResponse.json({
    period,
    charity,
    impact: {
      familiesServed: charity.totalFamiliesServed,
      moneyDonated: charity.totalDonated,
      volunteerHours: charity.volunteerHours,
      partnerships: charity.communityPartnerships,
      impactScore: charity.impactScore,
    },
    breakdown: {
      laundryServices: 387,
      shelterSupport: 78,
      communityPrograms: 22,
    },
  });
}
