import React, { useState, useEffect } from "react";
import FocusPage from "./pages/FocusPage";
import DashboardPage from "./pages/DashboardPage";
import Navbar from "./components/Navbar";
import ShortcutTooltip from "./components/ShortcutTooltip";

function App() {
  const [activePage, setActivePage] = useState("focus");

  // Keyboard: F → Focus, D → Dashboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable) {
        return;
      }

      const key = e.key.toLowerCase();

      if (key === "f") {
        e.preventDefault();
        setActivePage("focus");
      } else if (key === "d") {
        e.preventDefault();
        setActivePage("dashboard");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 overflow-hidden">

      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
      </div>

      <div className="relative flex flex-col min-h-screen">
        <Navbar activePage={activePage} onChangePage={setActivePage} />

        <main
          className={
            activePage === "focus"
              ? "flex-1 flex items-center justify-center overflow-hidden"
              : "flex-1 overflow-y-auto"
          }
        >
          {activePage === "focus" ? (
            <div className="w-full h-full flex items-center justify-center animate-fade-in-soft">
              <FocusPage />
            </div>
          ) : (
            <div className="w-full max-w-5xl mx-auto px-4 pb-10 pt-4 animate-fade-in-soft">
              <DashboardPage />
            </div>
          )}
        </main>
      </div>
      <ShortcutTooltip />
    </div>
  );
}

export default App;
