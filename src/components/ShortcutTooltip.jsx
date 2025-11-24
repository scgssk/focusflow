import React from "react";

const IconKeyboard = () => (
  <svg 
    width="22" 
    height="22" 
    viewBox="0 0 24 24" 
    fill="none"
  >
    <rect 
      x="3" 
      y="6" 
      width="18" 
      height="12" 
      rx="2"
      stroke="currentColor" 
      strokeWidth="2"
    />
    <path 
      d="M7 10h1M10 10h1M13 10h1M16 10h1
         M6 13h2M10 13h4M16 13h2"
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

function ShortcutTooltip() {
  return (
    <div className="group fixed bottom-6 left-6 z-40 hidden lg:block">

      {/* Icon */}
      <div
        className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 
                   flex items-center justify-center text-slate-200 cursor-pointer 
                   shadow-lg hover:bg-violet-500/20 transition-all"
      >
        <IconKeyboard />
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-14 left-0 p-4 w-64 rounded-2xl bg-black/70 backdrop-blur-xl 
                      border border-white/10 text-slate-200 text-sm opacity-0 pointer-events-none 
                      group-hover:opacity-100 transition-opacity shadow-xl">

        <div className="font-semibold mb-2 text-violet-300">Keyboard Shortcuts</div>

        <ul className="space-y-1">
          <li><span className="text-violet-400">Space</span> — Start / Pause</li>
          <li><span className="text-violet-400">Shift + Space</span> — Stop & Save</li>
          <li><span className="text-violet-400">M</span> — Toggle Music</li>
          <li><span className="text-violet-400">F</span> — Focus Page</li>
          <li><span className="text-violet-400">D</span> — Dashboard</li>
          <li><span className="text-violet-400">/</span> — Focus Tag Input</li>
        </ul>
      </div>

    </div>
  );
}

export default ShortcutTooltip;
