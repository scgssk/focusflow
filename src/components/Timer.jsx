import React from "react";

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const pad = (n) => n.toString().padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

// Icons8-style SVG controls
const IconPlay = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M7 5v14l12-7-12-7z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      className="opacity-90"
    />
  </svg>
);

const IconPause = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="6" y="5" width="4" height="14" rx="1" stroke="currentColor" fill="currentColor" strokeWidth="2" />
    <rect x="14" y="5" width="4" height="14" rx="1" stroke="currentColor" fill="currentColor" strokeWidth="2" />
  </svg>
);

const IconStop = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect
      x="6"
      y="6"
      width="12"
      height="12"
      rx="2"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

function Timer({ elapsedSeconds, isRunning, onStart, onPause, onSave }) {
  const canSave = elapsedSeconds > 0;

  const handleStop = () => {
    if (!canSave) return;
    onSave();
  };

  return (
    <div className="flex flex-col items-center gap-6">

      {/* Glass timer */}
      <div className="glass-timer">
        <div className="glass-timer-inner px-6 py-4 sm:px-8 sm:py-5">
          <div className="text-5xl sm:text-6xl md:text-7xl font-mono tracking-[0.22em] text-slate-100">
            {formatTime(elapsedSeconds)}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        {/* Play */}
        <button
          type="button"
          onClick={onStart}
          className="h-12 w-12 rounded-full bg-slate-950/80 border border-slate-700/80 
                     flex items-center justify-center text-slate-100 
                     hover:bg-violet-500/20 hover:border-violet-400/70 
                     active:scale-95 transition-all"
        >
          <IconPlay />
        </button>

        {/* Pause */}
        <button
          type="button"
          onClick={onPause}
          className="h-12 w-12 rounded-full bg-slate-950/80 border border-slate-700/80 
                     flex items-center justify-center text-slate-100 
                     hover:bg-amber-500/20 hover:border-amber-400/70 
                     active:scale-95 transition-all"
        >
          <IconPause />
        </button>

        {/* Stop (save session) */}
        <button
          type="button"
          onClick={handleStop}
          disabled={!canSave}
          className={`h-12 w-12 rounded-full flex items-center justify-center 
                     active:scale-95 transition-all ${
                       canSave
                         ? "bg-slate-950/80 border border-slate-700/80 text-slate-100 hover:bg-rose-500/20 hover:border-rose-400/70"
                         : "bg-slate-900/60 border border-slate-800/80 text-slate-500 cursor-not-allowed"
                     }`}
        >
          <IconStop />
        </button>
      </div>
    </div>
  );
}

export default Timer;
