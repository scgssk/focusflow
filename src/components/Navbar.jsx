import React from "react";

function Navbar({ activePage, onChangePage }) {
  return (
    <header className="pt-4 pb-2">
      <nav className="max-w-screen mx-auto flex items-center justify-between lg:px-10 px-5">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/focusflow.png"
            alt="FocusFlow Logo"
            className="w-8 h-8 rounded-xl object-cover shadow-sm shadow-slate-900/40"
          />
          <span className="font-semibold tracking-tight text-slate-100 select-none">
            FocusFlow
          </span>
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onChangePage("focus")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              activePage === "focus"
                ? "bg-slate-900/80 text-slate-50 border border-slate-700/80 shadow-sm shadow-slate-900/60"
                : "text-slate-300 hover:bg-slate-900/40"
            }`}
          >
            Focus
          </button>

          <button
            onClick={() => onChangePage("dashboard")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              activePage === "dashboard"
                ? "bg-slate-900/80 text-slate-50 border border-slate-700/80 shadow-sm shadow-slate-900/60"
                : "text-slate-300 hover:bg-slate-900/40"
            }`}
          >
            Dashboard
          </button>
        </div>

      </nav>
    </header>
  );
}

export default Navbar;
