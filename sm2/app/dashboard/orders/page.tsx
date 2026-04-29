"use client";

import { useEffect, useState, useCallback } from "react";
import {
  getOrders,
  rushOrder,
  cancelOrder,
  seedDemoData,
} from "@/lib/store";
import {
  Order,
  STATUS_LABELS,
  STATUS_COLORS,
  SERVICE_CONFIG,
  ORDER_STATUS_FLOW,
} from "@/lib/types";
import { formatDate, formatCurrency } from "@/lib/utils";
import { CountdownTimer, OrderProgressBar } from "@/components/timer";
import {
  Zap,
  X,
  Filter,
  Package,
  Clock,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from "lucide-react";

type FilterType = "all" | "active" | "completed" | "rush";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmRush, setConfirmRush] = useState<string | null>(null);
  const [confirmCancel, setConfirmCancel] = useState<string | null>(null);

  const refresh = useCallback(() => {
    seedDemoData();
    setOrders(getOrders());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const filtered = orders.filter((o) => {
    if (filter === "active")
      return o.status !== "completed" && o.status !== "cancelled";
    if (filter === "completed")
      return o.status === "completed" || o.status === "cancelled";
    if (filter === "rush") return o.isRush;
    return true;
  });

  const handleRush = (id: string) => {
    rushOrder(id);
    setConfirmRush(null);
    refresh();
  };

  const handleCancel = (id: string) => {
    cancelOrder(id);
    setConfirmCancel(null);
    refresh();
  };

  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: "all", label: "All", count: orders.length },
    {
      key: "active",
      label: "Active",
      count: orders.filter(
        (o) => o.status !== "completed" && o.status !== "cancelled"
      ).length,
    },
    {
      key: "completed",
      label: "Completed",
      count: orders.filter(
        (o) => o.status === "completed" || o.status === "cancelled"
      ).length,
    },
    {
      key: "rush",
      label: "Rush",
      count: orders.filter((o) => o.isRush).length,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
        <p className="mt-1 text-muted-foreground">
          Track your laundry orders and manage rush upgrades.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === f.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {f.label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                filter === f.key
                  ? "bg-primary-foreground/20"
                  : "bg-background"
              }`}
            >
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed bg-muted/30 p-12 text-center">
          <Package className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-semibold">No orders found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {filter === "all"
              ? "Schedule your first drop-off to get started!"
              : "No orders match this filter."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => {
            const isExpanded = expandedId === order.id;
            const canRush =
              !order.isRush &&
              order.status !== "completed" &&
              order.status !== "cancelled";
            const canCancel =
              order.status === "scheduled" || order.status === "received";

            return (
              <div
                key={order.id}
                className="rounded-xl border bg-card shadow-sm overflow-hidden transition-all hover:shadow-md"
              >
                <div className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
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
                      <div className="flex flex-wrap gap-2">
                        {order.items.map((item) => (
                          <span
                            key={item.type}
                            className="text-xs bg-muted rounded-md px-2 py-1"
                          >
                            {SERVICE_CONFIG[item.type].name}: {item.quantity}{" "}
                            {SERVICE_CONFIG[item.type].unit}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Created {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-xl font-bold">
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

                  {order.status !== "completed" &&
                    order.status !== "cancelled" && (
                      <div className="mt-4">
                        <OrderProgressBar
                          status={order.status}
                          statusFlow={ORDER_STATUS_FLOW}
                        />
                      </div>
                    )}

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {canRush && confirmRush !== order.id && (
                      <button
                        onClick={() => setConfirmRush(order.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/30 px-3 py-1.5 text-xs font-medium text-amber-700 dark:text-amber-400 hover:bg-amber-100 transition-colors"
                      >
                        <Zap className="h-3 w-3" />
                        Rush This Order (2x)
                      </button>
                    )}

                    {confirmRush === order.id && (
                      <div className="flex items-center gap-2 rounded-lg border border-amber-400 bg-amber-50 dark:bg-amber-950/30 p-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                        <span className="text-xs text-amber-700 dark:text-amber-400">
                          Rush for {formatCurrency(order.totalPrice * 2)}?
                        </span>
                        <button
                          onClick={() => handleRush(order.id)}
                          className="rounded-md bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white hover:bg-amber-600"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setConfirmRush(null)}
                          className="rounded-md border px-2.5 py-1 text-xs font-medium hover:bg-muted"
                        >
                          Cancel
                        </button>
                      </div>
                    )}

                    {canCancel && confirmCancel !== order.id && (
                      <button
                        onClick={() => setConfirmCancel(order.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-colors"
                      >
                        <X className="h-3 w-3" />
                        Cancel Order
                      </button>
                    )}

                    {confirmCancel === order.id && (
                      <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-2">
                        <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
                        <span className="text-xs text-destructive">
                          Cancel this order?
                        </span>
                        <button
                          onClick={() => handleCancel(order.id)}
                          className="rounded-md bg-destructive px-2.5 py-1 text-xs font-semibold text-destructive-foreground hover:bg-destructive/90"
                        >
                          Yes, Cancel
                        </button>
                        <button
                          onClick={() => setConfirmCancel(null)}
                          className="rounded-md border px-2.5 py-1 text-xs font-medium hover:bg-muted"
                        >
                          No
                        </button>
                      </div>
                    )}

                    <button
                      onClick={() =>
                        setExpandedId(isExpanded ? null : order.id)
                      }
                      className="ml-auto inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted transition-colors"
                    >
                      {isExpanded ? (
                        <>
                          Less <ChevronUp className="h-3 w-3" />
                        </>
                      ) : (
                        <>
                          Details <ChevronDown className="h-3 w-3" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t bg-muted/20 px-5 py-4 space-y-3 animate-fade-in">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                          Order Details
                        </h4>
                        <div className="space-y-1 text-sm">
                          <p>
                            <span className="text-muted-foreground">Drop-off:</span>{" "}
                            {formatDate(order.scheduledDropOff)}
                          </p>
                          {order.receivedAt && (
                            <p>
                              <span className="text-muted-foreground">Received:</span>{" "}
                              {formatDate(order.receivedAt)}
                            </p>
                          )}
                          {order.completedAt && (
                            <p>
                              <span className="text-muted-foreground">Completed:</span>{" "}
                              {formatDate(order.completedAt)}
                            </p>
                          )}
                          {order.notes && (
                            <p>
                              <span className="text-muted-foreground">Notes:</span>{" "}
                              {order.notes}
                            </p>
                          )}
                          {order.rushUpgradedAt && (
                            <p>
                              <span className="text-muted-foreground">Rush upgraded:</span>{" "}
                              {formatDate(order.rushUpgradedAt)}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                          Status History
                        </h4>
                        {order.statusHistory.length === 0 ? (
                          <p className="text-sm text-muted-foreground">
                            No status changes yet.
                          </p>
                        ) : (
                          <div className="space-y-1.5">
                            {order.statusHistory.map((change, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 text-xs"
                              >
                                <Clock className="h-3 w-3 text-muted-foreground shrink-0" />
                                <span className="text-muted-foreground">
                                  {formatDate(change.timestamp)}
                                </span>
                                <span>
                                  {STATUS_LABELS[change.from]} &rarr;{" "}
                                  {STATUS_LABELS[change.to]}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Line Items
                      </h4>
                      <div className="rounded-lg border overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                                Service
                              </th>
                              <th className="px-3 py-2 text-right font-medium text-muted-foreground">
                                Qty
                              </th>
                              <th className="px-3 py-2 text-right font-medium text-muted-foreground">
                                Rate
                              </th>
                              <th className="px-3 py-2 text-right font-medium text-muted-foreground">
                                Subtotal
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items.map((item) => (
                              <tr key={item.type} className="border-t">
                                <td className="px-3 py-2">
                                  {SERVICE_CONFIG[item.type].name}
                                </td>
                                <td className="px-3 py-2 text-right">
                                  {item.quantity} {SERVICE_CONFIG[item.type].unit}
                                </td>
                                <td className="px-3 py-2 text-right">
                                  {formatCurrency(item.unitPrice)}/{SERVICE_CONFIG[item.type].unit}
                                </td>
                                <td className="px-3 py-2 text-right font-medium">
                                  {formatCurrency(item.subtotal)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot className="border-t bg-muted/30">
                            <tr>
                              <td
                                colSpan={3}
                                className="px-3 py-2 text-right font-semibold"
                              >
                                {order.isRush ? "Total (incl. 2x Rush)" : "Total"}
                              </td>
                              <td className="px-3 py-2 text-right font-bold text-primary">
                                {formatCurrency(order.totalPrice)}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
