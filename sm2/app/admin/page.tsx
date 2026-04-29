"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStats, getActiveOrders, seedDemoData } from "@/lib/store";
import { Order, STATUS_LABELS, STATUS_COLORS, SERVICE_CONFIG } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Package,
  Zap,
  DollarSign,
  TrendingUp,
  ArrowRight,
  ClipboardList,
  BarChart3,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

export default function AdminPage() {
  const [stats, setStats] = useState<ReturnType<typeof getStats> | null>(null);
  const [active, setActive] = useState<Order[]>([]);

  useEffect(() => {
    seedDemoData();
    setStats(getStats());
    setActive(getActiveOrders());
  }, []);

  if (!stats) return null;

  const needsAttention = active.filter(
    (o) => o.status === "scheduled" || o.status === "ready"
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Manage orders, track revenue, and oversee operations.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Active Orders</p>
            <Package className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-2 text-3xl font-bold">{stats.activeOrders}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {stats.rushOrders} rush
          </p>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Completed Today
            </p>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <p className="mt-2 text-3xl font-bold">{stats.completedToday}</p>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Revenue Today
            </p>
            <DollarSign className="h-5 w-5 text-amber-500" />
          </div>
          <p className="mt-2 text-3xl font-bold">
            {formatCurrency(stats.revenueToday)}
          </p>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </p>
            <TrendingUp className="h-5 w-5 text-secondary" />
          </div>
          <p className="mt-2 text-3xl font-bold">
            {formatCurrency(stats.totalRevenue)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {stats.totalOrders} total orders
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Orders by Status
          </h2>
          <div className="space-y-3">
            {Object.entries(stats.ordersByStatus).map(([status, count]) => {
              const maxCount = Math.max(...Object.values(stats.ordersByStatus), 1);
              const pct = (count / maxCount) * 100;
              return (
                <div key={status}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm capitalize">
                      {STATUS_LABELS[status as keyof typeof STATUS_LABELS] || status}
                    </span>
                    <span className="text-sm font-semibold">{count}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Needs Attention
            </h2>
            <span className="text-sm text-muted-foreground">
              {needsAttention.length} orders
            </span>
          </div>
          {needsAttention.length === 0 ? (
            <div className="py-8 text-center">
              <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">All caught up!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {needsAttention.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold">
                        {order.id}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${STATUS_COLORS[order.status]}`}
                      >
                        {STATUS_LABELS[order.status]}
                      </span>
                      {order.isRush && (
                        <Zap className="h-3 w-3 text-amber-500" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {order.items
                        .map((it) => SERVICE_CONFIG[it.type].name)
                        .join(", ")}
                    </p>
                  </div>
                  <span className="text-sm font-semibold">
                    {formatCurrency(order.totalPrice)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
        >
          <ClipboardList className="h-4 w-4" />
          Manage All Orders
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
