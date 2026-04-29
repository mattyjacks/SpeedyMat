"use client";

import { useEffect, useState, useCallback } from "react";
import {
  getOrders,
  advanceOrderStatus,
  updateOrderStatus,
  cancelOrder,
  deleteOrder,
  createOrder,
  seedDemoData,
} from "@/lib/store";
import {
  Order,
  OrderStatus,
  STATUS_LABELS,
  STATUS_COLORS,
  SERVICE_CONFIG,
  ORDER_STATUS_FLOW,
  ServiceType,
  ServiceItem,
} from "@/lib/types";
import { formatDate, formatCurrency } from "@/lib/utils";
import { CountdownTimer } from "@/components/timer";
import {
  Zap,
  ChevronRight,
  Trash2,
  X,
  Filter,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Shirt,
  BedDouble,
  PawPrint,
  Sparkles,
  Warehouse,
} from "lucide-react";

type FilterType = "all" | "scheduled" | "received" | "washing" | "drying" | "folding" | "ready" | "completed";

const SERVICE_ICONS: Record<ServiceType, React.ElementType> = {
  "wash-fold": Shirt,
  comforter: BedDouble,
  "pet-bed": PawPrint,
  delicates: Sparkles,
  bulk: Warehouse,
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [showCreate, setShowCreate] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    id: string;
    action: string;
  } | null>(null);

  // Walk-in creation form state
  const [walkInName, setWalkInName] = useState("");
  const [walkInPhone, setWalkInPhone] = useState("");
  const [walkInEmail, setWalkInEmail] = useState("");
  const [walkInNotes, setWalkInNotes] = useState("");
  const [walkInRush, setWalkInRush] = useState(false);
  const [walkInServices, setWalkInServices] = useState<
    Record<ServiceType, { enabled: boolean; quantity: number }>
  >({
    "wash-fold": { enabled: false, quantity: 10 },
    comforter: { enabled: false, quantity: 1 },
    "pet-bed": { enabled: false, quantity: 1 },
    delicates: { enabled: false, quantity: 5 },
    bulk: { enabled: false, quantity: 25 },
  });

  const refresh = useCallback(() => {
    seedDemoData();
    setOrders(getOrders());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const filtered = orders.filter((o) => {
    if (filter === "all") return true;
    return o.status === filter;
  });

  const handleAdvance = (id: string) => {
    advanceOrderStatus(id);
    setConfirmAction(null);
    refresh();
  };

  const handleCancel = (id: string) => {
    cancelOrder(id);
    setConfirmAction(null);
    refresh();
  };

  const handleDelete = (id: string) => {
    deleteOrder(id);
    setConfirmAction(null);
    refresh();
  };

  const handleSetStatus = (id: string, status: OrderStatus) => {
    updateOrderStatus(id, status);
    refresh();
  };

  const handleCreateWalkIn = () => {
    const items: ServiceItem[] = (
      Object.entries(walkInServices) as [
        ServiceType,
        { enabled: boolean; quantity: number },
      ][]
    )
      .filter(([, v]) => v.enabled)
      .map(([type, v]) => ({
        type,
        quantity: v.quantity,
        unitPrice: SERVICE_CONFIG[type].pricePerUnit,
        subtotal: v.quantity * SERVICE_CONFIG[type].pricePerUnit,
      }));

    if (items.length === 0) return;

    createOrder({
      items,
      isRush: walkInRush,
      notes: walkInNotes,
      scheduledDropOff: new Date().toISOString(),
      customerName: walkInName || "Walk-in Customer",
      customerEmail: walkInEmail,
      customerPhone: walkInPhone,
    });

    // Reset form
    setShowCreate(false);
    setWalkInName("");
    setWalkInPhone("");
    setWalkInEmail("");
    setWalkInNotes("");
    setWalkInRush(false);
    setWalkInServices({
      "wash-fold": { enabled: false, quantity: 10 },
      comforter: { enabled: false, quantity: 1 },
      "pet-bed": { enabled: false, quantity: 1 },
      delicates: { enabled: false, quantity: 5 },
      bulk: { enabled: false, quantity: 25 },
    });
    refresh();
  };

  const statusFilters: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "scheduled", label: "Scheduled" },
    { key: "received", label: "Received" },
    { key: "washing", label: "Washing" },
    { key: "drying", label: "Drying" },
    { key: "folding", label: "Folding" },
    { key: "ready", label: "Ready" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Orders</h1>
          <p className="mt-1 text-muted-foreground">
            Process orders, update statuses, and create walk-in orders.
          </p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          New Walk-in Order
        </button>
      </div>

      {showCreate && (
        <div className="rounded-xl border-2 border-primary/30 bg-card p-6 shadow-lg animate-slide-up">
          <h2 className="text-lg font-semibold mb-4">Create Walk-in Order</h2>
          <div className="grid gap-4 sm:grid-cols-3 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Customer Name</label>
              <input
                type="text"
                value={walkInName}
                onChange={(e) => setWalkInName(e.target.value)}
                placeholder="Walk-in Customer"
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                value={walkInPhone}
                onChange={(e) => setWalkInPhone(e.target.value)}
                placeholder="(602) 555-0000"
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={walkInEmail}
                onChange={(e) => setWalkInEmail(e.target.value)}
                placeholder="customer@email.com"
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Services</label>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {(
                Object.entries(SERVICE_CONFIG) as [
                  ServiceType,
                  (typeof SERVICE_CONFIG)[ServiceType],
                ][]
              ).map(([type, config]) => {
                const Icon = SERVICE_ICONS[type];
                const isActive = walkInServices[type].enabled;
                return (
                  <div
                    key={type}
                    className={`rounded-lg border p-3 cursor-pointer transition-all ${
                      isActive
                        ? "border-primary bg-primary/5"
                        : "hover:border-primary/30"
                    }`}
                    onClick={() =>
                      setWalkInServices((prev) => ({
                        ...prev,
                        [type]: {
                          ...prev[type],
                          enabled: !prev[type].enabled,
                        },
                      }))
                    }
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{config.name}</span>
                    </div>
                    {isActive && (
                      <div
                        className="mt-2 flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="number"
                          min={config.minQuantity}
                          value={walkInServices[type].quantity}
                          onChange={(e) =>
                            setWalkInServices((prev) => ({
                              ...prev,
                              [type]: {
                                ...prev[type],
                                quantity: Math.max(
                                  config.minQuantity,
                                  parseInt(e.target.value) || config.minQuantity
                                ),
                              },
                            }))
                          }
                          className="w-16 rounded border bg-background px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <span className="text-xs text-muted-foreground">
                          {config.unit}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <label
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setWalkInRush(!walkInRush)}
            >
              <div
                className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-colors ${
                  walkInRush
                    ? "border-amber-500 bg-amber-500"
                    : "border-muted-foreground/30"
                }`}
              >
                {walkInRush && (
                  <CheckCircle2 className="h-3 w-3 text-white" />
                )}
              </div>
              <Zap className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium">Rush Order (2x)</span>
            </label>
            <div className="flex-1">
              <input
                type="text"
                value={walkInNotes}
                onChange={(e) => setWalkInNotes(e.target.value)}
                placeholder="Notes..."
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCreateWalkIn}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Create Order
            </button>
            <button
              onClick={() => setShowCreate(false)}
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {statusFilters.map((f) => {
          const count =
            f.key === "all"
              ? orders.length
              : orders.filter((o) => o.status === f.key).length;
          return (
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
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed bg-muted/30 p-12 text-center">
          <p className="text-muted-foreground">No orders match this filter.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => {
            const currentIdx = ORDER_STATUS_FLOW.indexOf(order.status);
            const canAdvance =
              currentIdx >= 0 && currentIdx < ORDER_STATUS_FLOW.length - 1;
            const nextStatus = canAdvance
              ? ORDER_STATUS_FLOW[currentIdx + 1]
              : null;

            return (
              <div
                key={order.id}
                className="rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-sm font-bold">
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
                    <p className="text-sm font-medium">{order.customerName}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {order.items.map((item) => (
                        <span
                          key={item.type}
                          className="text-xs bg-muted rounded-md px-2 py-0.5"
                        >
                          {SERVICE_CONFIG[item.type].name}: {item.quantity}{" "}
                          {SERVICE_CONFIG[item.type].unit}
                        </span>
                      ))}
                    </div>
                    {order.notes && (
                      <p className="text-xs text-muted-foreground italic">
                        &ldquo;{order.notes}&rdquo;
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Created {formatDate(order.createdAt)}
                      {order.receivedAt &&
                        ` - Received ${formatDate(order.receivedAt)}`}
                    </p>
                  </div>

                  <div className="text-right space-y-1 shrink-0">
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

                <div className="mt-3 flex flex-wrap items-center gap-2 border-t pt-3">
                  {canAdvance && nextStatus && (
                    <>
                      {confirmAction?.id === order.id &&
                      confirmAction.action === "advance" ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            Advance to{" "}
                            <strong>
                              {STATUS_LABELS[nextStatus]}
                            </strong>
                            ?
                          </span>
                          <button
                            onClick={() => handleAdvance(order.id)}
                            className="rounded-md bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setConfirmAction(null)}
                            className="rounded-md border px-2.5 py-1 text-xs hover:bg-muted"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() =>
                            setConfirmAction({
                              id: order.id,
                              action: "advance",
                            })
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 border border-primary/20 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                        >
                          <ChevronRight className="h-3 w-3" />
                          Advance to {STATUS_LABELS[nextStatus]}
                        </button>
                      )}
                    </>
                  )}

                  {order.status !== "completed" &&
                    order.status !== "cancelled" && (
                      <select
                        value=""
                        onChange={(e) => {
                          if (e.target.value) {
                            handleSetStatus(
                              order.id,
                              e.target.value as OrderStatus
                            );
                          }
                        }}
                        className="rounded-lg border bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="">Jump to status...</option>
                        {ORDER_STATUS_FLOW.map((s) => (
                          <option key={s} value={s} disabled={s === order.status}>
                            {STATUS_LABELS[s]}
                          </option>
                        ))}
                      </select>
                    )}

                  {order.status !== "completed" &&
                    order.status !== "cancelled" && (
                      <>
                        {confirmAction?.id === order.id &&
                        confirmAction.action === "cancel" ? (
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-3 w-3 text-destructive" />
                            <button
                              onClick={() => handleCancel(order.id)}
                              className="rounded-md bg-destructive px-2.5 py-1 text-xs font-semibold text-destructive-foreground"
                            >
                              Confirm Cancel
                            </button>
                            <button
                              onClick={() => setConfirmAction(null)}
                              className="rounded-md border px-2.5 py-1 text-xs hover:bg-muted"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              setConfirmAction({
                                id: order.id,
                                action: "cancel",
                              })
                            }
                            className="inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-colors"
                          >
                            <X className="h-3 w-3" />
                            Cancel
                          </button>
                        )}
                      </>
                    )}

                  {(order.status === "completed" ||
                    order.status === "cancelled") && (
                    <>
                      {confirmAction?.id === order.id &&
                      confirmAction.action === "delete" ? (
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-3 w-3 text-destructive" />
                          <span className="text-xs text-destructive">
                            Permanently delete?
                          </span>
                          <button
                            onClick={() => handleDelete(order.id)}
                            className="rounded-md bg-destructive px-2.5 py-1 text-xs font-semibold text-destructive-foreground"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setConfirmAction(null)}
                            className="rounded-md border px-2.5 py-1 text-xs hover:bg-muted"
                          >
                            Keep
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() =>
                            setConfirmAction({
                              id: order.id,
                              action: "delete",
                            })
                          }
                          className="inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-colors"
                        >
                          <Trash2 className="h-3 w-3" />
                          Delete
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
