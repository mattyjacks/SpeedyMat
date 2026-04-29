"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  SERVICE_CONFIG,
  ServiceType,
  ServiceItem,
} from "@/lib/types";
import { createOrder, calculateTotal } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import {
  Shirt,
  BedDouble,
  PawPrint,
  Sparkles,
  Warehouse,
  Zap,
  CalendarPlus,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const SERVICE_ICONS: Record<ServiceType, React.ElementType> = {
  "wash-fold": Shirt,
  comforter: BedDouble,
  "pet-bed": PawPrint,
  delicates: Sparkles,
  bulk: Warehouse,
};

export default function SchedulePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<
    Record<ServiceType, { enabled: boolean; quantity: number }>
  >({
    "wash-fold": { enabled: false, quantity: 10 },
    comforter: { enabled: false, quantity: 1 },
    "pet-bed": { enabled: false, quantity: 1 },
    delicates: { enabled: false, quantity: 5 },
    bulk: { enabled: false, quantity: 25 },
  });
  const [isRush, setIsRush] = useState(false);
  const [notes, setNotes] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [dropOffTime, setDropOffTime] = useState("10:00");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const toggleService = (type: ServiceType) => {
    setSelected((prev) => ({
      ...prev,
      [type]: { ...prev[type], enabled: !prev[type].enabled },
    }));
  };

  const updateQuantity = (type: ServiceType, qty: number) => {
    const config = SERVICE_CONFIG[type];
    const clamped = Math.max(config.minQuantity, qty);
    setSelected((prev) => ({
      ...prev,
      [type]: { ...prev[type], quantity: clamped },
    }));
  };

  const buildItems = (): ServiceItem[] => {
    return (Object.entries(selected) as [ServiceType, { enabled: boolean; quantity: number }][])
      .filter(([, v]) => v.enabled)
      .map(([type, v]) => {
        const config = SERVICE_CONFIG[type];
        return {
          type,
          quantity: v.quantity,
          unitPrice: config.pricePerUnit,
          subtotal: v.quantity * config.pricePerUnit,
        };
      });
  };

  const items = buildItems();
  const total = calculateTotal(items, isRush);
  const hasSelection = items.length > 0;

  const handleSubmit = () => {
    setError("");
    if (!hasSelection) {
      setError("Please select at least one service.");
      return;
    }
    if (!dropOffDate) {
      setError("Please select a drop-off date.");
      return;
    }

    const scheduledDropOff = new Date(
      `${dropOffDate}T${dropOffTime}:00`
    ).toISOString();

    createOrder({
      items,
      isRush,
      notes,
      scheduledDropOff,
    });

    setSubmitted(true);
    setTimeout(() => {
      router.push("/dashboard/orders");
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold">Order Scheduled!</h2>
        <p className="mt-2 text-muted-foreground">
          Your drop-off has been scheduled. Redirecting to your orders...
        </p>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Schedule a Drop-off
        </h1>
        <p className="mt-1 text-muted-foreground">
          Select your services, pick a time, and we&apos;ll handle the rest.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">1. Select Services</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {(Object.entries(SERVICE_CONFIG) as [ServiceType, typeof SERVICE_CONFIG[ServiceType]][]).map(
                ([type, config]) => {
                  const Icon = SERVICE_ICONS[type];
                  const isActive = selected[type].enabled;
                  return (
                    <div
                      key={type}
                      className={`relative rounded-xl border-2 p-4 cursor-pointer transition-all ${
                        isActive
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border hover:border-primary/30"
                      }`}
                      onClick={() => toggleService(type)}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm">
                            {config.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {formatCurrency(config.pricePerUnit)}/{config.unit}{" "}
                            - min {config.minQuantity} {config.unit}
                          </p>
                        </div>
                        <div
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                            isActive
                              ? "border-primary bg-primary"
                              : "border-muted-foreground/30"
                          }`}
                        >
                          {isActive && (
                            <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                          )}
                        </div>
                      </div>
                      {isActive && (
                        <div className="mt-3 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <label className="text-xs text-muted-foreground whitespace-nowrap">
                            Qty ({config.unit}):
                          </label>
                          <input
                            type="number"
                            min={config.minQuantity}
                            value={selected[type].quantity}
                            onChange={(e) =>
                              updateQuantity(type, parseInt(e.target.value) || config.minQuantity)
                            }
                            className="w-20 rounded-lg border bg-background px-2.5 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          <span className="text-sm font-semibold text-primary ml-auto">
                            {formatCurrency(
                              selected[type].quantity * config.pricePerUnit
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">
              2. Drop-off Date & Time
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1.5">Date</label>
                <input
                  type="date"
                  min={today}
                  value={dropOffDate}
                  onChange={(e) => setDropOffDate(e.target.value)}
                  className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Time</label>
                <select
                  value={dropOffTime}
                  onChange={(e) => setDropOffTime(e.target.value)}
                  className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {Array.from({ length: 12 }, (_, i) => {
                    const hour = i + 7;
                    const ampm = hour >= 12 ? "PM" : "AM";
                    const display = hour > 12 ? hour - 12 : hour;
                    return (
                      <option key={hour} value={`${hour.toString().padStart(2, "0")}:00`}>
                        {display}:00 {ampm}
                      </option>
                    );
                  })}
                  {Array.from({ length: 12 }, (_, i) => {
                    const hour = i + 7;
                    const ampm = hour >= 12 ? "PM" : "AM";
                    const display = hour > 12 ? hour - 12 : hour;
                    return (
                      <option key={`${hour}-30`} value={`${hour.toString().padStart(2, "0")}:30`}>
                        {display}:30 {ampm}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">3. Special Instructions</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Allergies, preferences, special care instructions..."
              rows={3}
              className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border bg-card p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-semibold">Order Summary</h2>

            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                Select services to see pricing
              </p>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.type} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {SERVICE_CONFIG[item.type].name} ({item.quantity}{" "}
                      {SERVICE_CONFIG[item.type].unit})
                    </span>
                    <span className="font-medium">
                      {formatCurrency(item.subtotal)}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">
                      {formatCurrency(calculateTotal(items, false))}
                    </span>
                  </div>
                  {isRush && (
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-amber-600 font-medium">
                        Rush Surcharge (2x)
                      </span>
                      <span className="text-amber-600 font-medium">
                        +{formatCurrency(calculateTotal(items, false))}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div
              className={`flex items-center justify-between rounded-lg border-2 p-3 cursor-pointer transition-all ${
                isRush
                  ? "border-amber-400 bg-amber-50 dark:bg-amber-950/30"
                  : "border-border hover:border-amber-300"
              }`}
              onClick={() => setIsRush(!isRush)}
            >
              <div className="flex items-center gap-2">
                <Zap
                  className={`h-5 w-5 ${
                    isRush ? "text-amber-500" : "text-muted-foreground"
                  }`}
                />
                <div>
                  <p className="text-sm font-semibold">Rush Service</p>
                  <p className="text-xs text-muted-foreground">
                    2x price, done in hours
                  </p>
                </div>
              </div>
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                  isRush
                    ? "border-amber-500 bg-amber-500"
                    : "border-muted-foreground/30"
                }`}
              >
                {isRush && (
                  <CheckCircle2 className="h-3 w-3 text-white" />
                )}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-primary">
                  {formatCurrency(total)}
                </span>
              </div>
              {hasSelection && (
                <p className="text-xs text-muted-foreground mt-1">
                  Est. completion:{" "}
                  {isRush
                    ? "2-8 hours"
                    : "24-48 hours"}
                </p>
              )}
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-destructive/10 border border-destructive/30 p-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!hasSelection}
              className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <CalendarPlus className="h-4 w-4" />
              Schedule Drop-off
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
