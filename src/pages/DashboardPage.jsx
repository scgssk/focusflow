import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import SummaryCards from "../components/SummaryCards";
import StudyChart from "../components/StudyChart";

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function DashboardPage() {
  const [sessions, setSessions] = useLocalStorage("focusflow_sessions", []);

  const now = new Date();
  const todayStart = startOfDay(now);
  const weekAgo = new Date(todayStart);
  weekAgo.setDate(weekAgo.getDate() - 6); // include today
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const todayMinutes = sessions
    .filter((s) => isSameDay(new Date(s.startTime), now))
    .reduce((sum, s) => sum + s.durationMinutes, 0);

  const weekSessions = sessions.filter((s) => {
    const d = startOfDay(new Date(s.startTime));
    return d >= weekAgo && d <= todayStart;
  });

  const monthSessions = sessions.filter((s) => {
    const d = startOfDay(new Date(s.startTime));
    return d >= monthStart && d <= todayStart;
  });

  const weekMinutes = weekSessions.reduce(
    (sum, s) => sum + s.durationMinutes,
    0
  );

  const monthMinutes = monthSessions.reduce(
    (sum, s) => sum + s.durationMinutes,
    0
  );

  const longestSession = sessions.reduce(
    (max, s) => Math.max(max, s.durationMinutes),
    0
  );

  // Chart data: last 7 days (week view)
  const weekData = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekAgo);
    d.setDate(weekAgo.getDate() + i);
    const label = d.toLocaleDateString(undefined, { weekday: "short" });
    const minutes = weekSessions
      .filter((s) => isSameDay(new Date(s.startTime), d))
      .reduce((sum, s) => sum + s.durationMinutes, 0);
    weekData.push({ label, minutes });
  }

  // Chart data: current month
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const monthData = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(now.getFullYear(), now.getMonth(), day);
    const label = day.toString();
    const minutes = monthSessions
      .filter((s) => isSameDay(new Date(s.startTime), d))
      .reduce((sum, s) => sum + s.durationMinutes, 0);
    monthData.push({ label, minutes });
  }

  const handleClear = () => {
    if (window.confirm("Clear all saved study data? This cannot be undone.")) {
      setSessions([]);
    }
  };

  return (
    <section className="pt-8">
      <div className="flex items-center justify-between mb-4 gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50 mb-1">
            Dashboard
          </h1>
          <p className="text-sm text-slate-400">
            See how consistent you’ve been with your study sessions.
          </p>
        </div>
        <button
          onClick={handleClear}
          className="w-34  text-xs px-3 mx-2 py-1.5 rounded-full border border-red-500/60 text-red-300 hover:bg-red-500/10 transition"
        >
          Clear Data
        </button>
      </div>

      <SummaryCards
        todayMinutes={todayMinutes}
        weekMinutes={weekMinutes}
        monthMinutes={monthMinutes}
        longestSession={longestSession}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StudyChart title="Last 7 Days" data={weekData} />
        <StudyChart title="This Month" data={monthData} />
      </div>

      {sessions.length > 0 && (
        <div className="mt-6 rounded-2xl bg-slate-900/80 border border-slate-800 p-4 text-xs text-slate-400">
          <p className="text-sm text-slate-100 font-medium mb-2">
            Recent Sessions
          </p>
          <div className="max-h-48 overflow-y-auto space-y-1">
            {sessions
              .slice()
              .sort(
                (a, b) => new Date(b.startTime) - new Date(a.startTime)
              )
              .slice(0, 10)
              .map((s) => (
                <div
                  key={s.id}
                  className="flex justify-between gap-3 border-b border-slate-800/80 pb-1"
                >
                  <span className="text-slate-200">
                    {new Date(s.startTime).toLocaleString()}{" "}
                    <span className="text-slate-500">({s.tag})</span>
                  </span>
                  <span className="text-slate-300">
                    {s.durationMinutes} min
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default DashboardPage;
