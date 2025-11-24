import React from "react";

function minutesToHoursMinutes(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} h`;
  return `${h} h ${m} min`;
}

function SummaryCards({ todayMinutes, weekMinutes, monthMinutes, longestSession }) {
  const cards = [
    {
      label: "Today",
      value: minutesToHoursMinutes(todayMinutes),
      hint: "Total focused time",
    },
    {
      label: "This Week",
      value: minutesToHoursMinutes(weekMinutes),
      hint: "Last 7 days",
    },
    {
      label: "This Month",
      value: minutesToHoursMinutes(monthMinutes),
      hint: "Current month",
    },
    {
      label: "Longest Session",
      value: minutesToHoursMinutes(longestSession),
      hint: "From your saved sessions",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl bg-slate-900/80 border border-slate-800 p-3 shadow-sm shadow-slate-950/60"
        >
          <p className="text-xs text-slate-400">{card.label}</p>
          <p className="mt-2 text-lg font-semibold text-slate-50">
            {card.value}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">{card.hint}</p>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;
