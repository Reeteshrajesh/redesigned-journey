"use client";

import { useEffect, useState } from "react";

function formatDateTime(date: Date) {
  const day = date.toLocaleDateString("en-IN", {
    weekday: "short",
  });
  const fullDate = date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return { day, fullDate, time };
}

export default function TickerDateTime() {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { day, fullDate, time } = formatDateTime(now);

  return (
    <div className="shrink-0 rounded-lg border border-gray-500 bg-white/90 px-3 py-1.5 text-right shadow-sm backdrop-blur-sm">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
        {day}, {fullDate}
      </p>
      <p className="font-mono text-sm font-semibold leading-tight text-gray-900 tabular-nums">
        {time}
      </p>
    </div>
  );
}
