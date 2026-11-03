import React, { useRef, useState, useEffect } from "react";
import Timer from "../components/Timer";
import QuoteRotator from "../components/QuoteRotator";
import { useTimer } from "../hooks/useTimer";
import { useLocalStorage } from "../hooks/useLocalStorage";

// We no longer need TRACKS – single file:
const AUDIO_SRC = "/audio/interstellar.mp3";

// Icons8-style speaker icons (minimal SVG)
const IconVolume = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 9v6h4l5 5V4l-5 5H5z"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 9.5c1 .5 1.5 1.5 1.5 2.5s-.5 2-1.5 2.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const IconMuted = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 9v6h4l5 5V4l-5 5H5z"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="17"
      y1="9"
      x2="21"
      y2="13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="21"
      y1="9"
      x2="17"
      y2="13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

function FocusPage() {
  const { isRunning, elapsedSeconds, start, pause, reset } = useTimer();
  const [sessions, setSessions] = useLocalStorage("focusflow_sessions", []);
  const [tag, setTag] = useState("");

  const tagInputRef = useRef(null);
  const audioRef = useRef(null);
  const [isMusicOn, setIsMusicOn] = useState(false);

  const handleSaveSession = () => {
    if (elapsedSeconds === 0) return;

    const durationMinutes = Math.max(1, Math.round(elapsedSeconds / 60));
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - elapsedSeconds * 1000);

    const newSession = {
      id: Date.now(),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      durationMinutes,
      tag: tag || "General",
    };

    setSessions([...sessions, newSession]);
    reset();
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicOn) {
      audioRef.current.pause();
      setIsMusicOn(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsMusicOn(true))
        .catch(() => {});
    }
  };

  // Keyboard shortcuts for this page (Space, Shift+Space, M, /)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      const lower = key.toLowerCase();
      const tagName = e.target.tagName;
      const isInInput =
        tagName === "INPUT" || tagName === "TEXTAREA" || e.target.isContentEditable;

      // `/` → focus tag input
      if (lower === "/" && (!isInInput || e.target !== tagInputRef.current)) {
        e.preventDefault();
        if (tagInputRef.current) {
          tagInputRef.current.focus();
          tagInputRef.current.select();
        }
        return;
      }

      // Don't hijack other keys while typing
      if (isInInput) return;

      // Space → Start / Pause
      if (e.code === "Space" && !e.shiftKey) {
        e.preventDefault();
        if (isRunning) {
          pause();
        } else {
          start();
        }
        return;
      }

      // Shift + Space → Stop & Save
      if (e.code === "Space" && e.shiftKey) {
        e.preventDefault();
        handleSaveSession();
        return;
      }

      // M → toggle music
      if (lower === "m") {
        e.preventDefault();
        toggleMusic();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, start, pause, handleSaveSession, toggleMusic]);

  return (
    <section className="w-full h-full">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Background gif */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          src="/bg.gif"
        />

        {/* Main content */}
        <div className="relative z-10 max-w-md w-full px-4 flex flex-col items-center gap-5">
          {/* Music toggle button - fixed bottom-right with soundwaves */}
          <div className="fixed bottom-6 right-6 z-40">
            <div className="relative h-12 w-12 flex items-center justify-center">
              {isMusicOn && (
                <>
                  <span className="soundwave-ring absolute inset-0" />
                  <span className="soundwave-ring second absolute inset-0" />
                </>
              )}

              <button
                type="button"
                onClick={toggleMusic}
                className="relative h-12 w-12 rounded-full bg-black/40 border border-white/20
                           flex items-center justify-center text-slate-100
                           hover:bg-violet-500/30 hover:border-violet-400
                           active:scale-95 transition-all backdrop-blur-xl shadow-lg"
              >
                {isMusicOn ? <IconVolume /> : <IconMuted />}
              </button>

              {/* Single looping track */}
              <audio ref={audioRef} src={AUDIO_SRC} loop />
            </div>
          </div>

          <Timer
            elapsedSeconds={elapsedSeconds}
            isRunning={isRunning}
            onStart={start}
            onPause={pause}
            onSave={handleSaveSession}
          />

          {/* Tag input */}
          <div className="w-full">
            <input
              ref={tagInputRef}
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Tag this session (optional)"
              className="w-full rounded-2xl bg-slate-950/70 border border-slate-700 
                         px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 
                         outline-none focus:ring-2 focus:ring-violet-500/60 
                         focus:border-violet-500/60 backdrop-blur"
            />
          </div>

          {/* Quotes */}
          <div className="w-full">
            <QuoteRotator />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FocusPage;
