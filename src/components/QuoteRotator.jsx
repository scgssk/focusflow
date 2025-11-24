import React, { useEffect, useState } from "react";
import { QUOTES } from "../data/quotes";

const INTERVAL_MS = 15000; // 15 seconds

function QuoteRotator() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % QUOTES.length);
        setVisible(true);
      }, 350);
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const quote = QUOTES[index];

  return (
    <div className="mt-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 px-4 py-3 sm:px-6 sm:py-4 shadow-md shadow-slate-950/60 backdrop-blur">
      <div
        className={`transition-opacity duration-500 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-sm sm:text-base text-slate-100/95 italic leading-relaxed">
          “{quote.text}”
        </p>
        <p className="text-[11px] text-slate-400 mt-1.5 text-right">
          — {quote.author}
        </p>
      </div>
    </div>
  );
}

export default QuoteRotator;
