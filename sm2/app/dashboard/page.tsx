"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getActiveOrders,
  getCompletedOrders,
  getUser,
  seedDemoData,
} from "@/lib/store";
import { Order, UserProfile, STATUS_LABELS, STATUS_COLORS } from "@/lib/types";
import { formatDate, formatCurrency } from "@/lib/utils";
import { CountdownTimer, OrderProgressBar } from "@/components/timer";
import {
  CalendarPlus,
  ClipboardList,
  Package,
  Zap,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export default function DashboardPage() {
  const [active, setActive] = useState<Order[]>([]);
  const [completed, setCompleted] = useState<Order[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    seedDemoData();
    setUser(getUser());
    setActive(getActiveOrders());
    setCompleted(getCompletedOrders());
  }, []);

  const rushCount = active.filter((o) => o.isRush).length;
  const totalSpent = [...active, ...completed].reduce(
    (s, o) => s + o.totalPrice,
    0
  );

  const statusFlow = [
    "scheduled",
    "received",
    "washing",
    "drying",
    "folding",
    "ready",
    "completed",
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.name || "Customer"}
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here&apos;s an overview of your laundry orders.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Active Orders
            </p>
            <Package className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-2 text-3xl font-bold">{active.length}</p>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Rush Orders
            </p>
            <Zap className="h-5 w-5 text-amber-500" />
          </div>
          <p className="mt-2 text-3xl font-bold">{rushCount}</p>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Completed
            </p>
            <ClipboardList className="h-5 w-5 text-green-500" />
          </div>
          <p className="mt-2 text-3xl font-bold">{completed.length}</p>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Total Spent
            </p>
            <TrendingUp className="h-5 w-5 text-secondary" />
          </div>
          <p className="mt-2 text-3xl font-bold">{formatCurrency(totalSpent)}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/dashboard/schedule"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
        >
          <CalendarPlus className="h-4 w-4" />
          Schedule Drop-off
        </Link>
        <Link
          href="/dashboard/orders"
          className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
        >
          <ClipboardList className="h-4 w-4" />
          View All Orders
        </Link>
      </div>

      {active.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Active Orders</h2>
            <Link
              href="/dashboard/orders"
              className="text-sm text-primary hover:underline inline-flex items-center gap-1"
            >
              See all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-4">
            {active.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-semibold">
                        {order.id}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[order.status]}`}
                      >
                        {STATUS_LABELS[order.status]}
                      </span>
                      {order.isRush && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 border border-amber-300 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                          <Zap className="h-3 w-3" /> Rush
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {order.items
                        .map(
                          (it) =>
                            `${it.quantity} ${it.type.replace("-", " ")}`
                        )
                        .join(", ")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Scheduled: {formatDate(order.scheduledDropOff)}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-lg font-bold">
                      {formatCurrency(order.totalPrice)}
                    </p>
                    {order.estimatedCompletion &&
                      order.status !== "completed" &&
                      order.status !== "cancelled" && (
                        <CountdownTimer
                          targetIso={order.estimatedCompletion}
                          label="ETA"
                        />
                      )}
                  </div>
                </div>
                <div className="mt-4">
                  <OrderProgressBar
                    status={order.status}
                    statusFlow={statusFlow}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {active.length === 0 && (
        <div className="rounded-xl border-2 border-dashed bg-muted/30 p-12 text-center">
          <Package className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-semibold">No active orders</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Schedule a drop-off to get started!
          </p>
          <Link
            href="/dashboard/schedule"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            <CalendarPlus className="h-4 w-4" />
            Schedule Now
          </Link>
        </div>
      )}
    </div>
  );
}
