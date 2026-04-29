"use client";

import { useEffect, useState } from "react";
import { getTimeRemaining } from "@/lib/utils";
import { Clock, CheckCircle2 } from "lucide-react";

interface TimerProps {
  targetIso: string;
  label?: string;
  className?: string;
}

export function CountdownTimer({ targetIso, label, className }: TimerProps) {
  const [time, setTime] = useState(getTimeRemaining(targetIso));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining(targetIso));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetIso]);

  if (time.overdue) {
    return (
      <div className={`flex items-center gap-2 text-green-600 dark:text-green-400 ${className || ""}`}>
        <CheckCircle2 className="h-4 w-4" />
        <span className="text-sm font-medium">{label || "Ready!"}</span>
      </div>
    );
  }

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      <Clock className="h-4 w-4 text-primary animate-pulse" />
      <div className="flex items-baseline gap-1">
        {label && <span className="text-xs text-muted-foreground mr-1">{label}</span>}
        <span className="font-mono text-sm font-semibold tabular-nums">
          {pad(time.hours)}:{pad(time.minutes)}:{pad(time.seconds)}
        </span>
      </div>
    </div>
  );
}

interface ProgressBarProps {
  status: string;
  statusFlow: string[];
}

export function OrderProgressBar({ status, statusFlow }: ProgressBarProps) {
  const currentIdx = statusFlow.indexOf(status);
  const progress =
    currentIdx === -1 ? 0 : ((currentIdx + 1) / statusFlow.length) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1.5">
        {statusFlow.map((s, i) => (
          <div
            key={s}
            className={`text-[10px] font-medium capitalize ${
              i <= currentIdx
                ? "text-primary"
                : "text-muted-foreground/50"
            }`}
          >
            {i === 0 || i === statusFlow.length - 1 || i === currentIdx
              ? s.replace("-", " ")
              : ""}
          </div>
        ))}
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
