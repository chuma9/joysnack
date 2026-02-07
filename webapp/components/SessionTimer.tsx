'use client';

import { useEffect, useState } from 'react';
import { SESSION_LIMIT_MS } from '@shared/config';

export default function SessionTimer() {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // Get session start time from localStorage or set it
    const sessionStart = localStorage.getItem('joysnack_session_start');
    const startTime = sessionStart ? parseInt(sessionStart) : Date.now();

    if (!sessionStart) {
      localStorage.setItem('joysnack_session_start', startTime.toString());
    }

    const updateTimer = () => {
      const elapsed = Date.now() - startTime;
      const remaining = SESSION_LIMIT_MS - elapsed;

      if (remaining <= 0) {
        setTimeLeft(0);
        setShowWarning(true);
      } else {
        setTimeLeft(remaining);
        // Show warning at 2 minutes remaining
        if (remaining <= 2 * 60 * 1000) {
          setShowWarning(true);
        }
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleContinue = () => {
    setShowWarning(false);
  };

  const handleTakeBreak = () => {
    localStorage.removeItem('joysnack_session_start');
    window.location.reload();
  };

  if (timeLeft === null) return null;

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return (
    <>
      {/* Gentle timer indicator */}
      <div className="fixed top-6 right-6 z-40">
        <div
          className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm text-sm font-['DM_Sans'] text-[var(--text-secondary)] flex items-center gap-2"
          style={{
            borderLeft: `3px solid ${timeLeft <= 2 * 60 * 1000 ? 'var(--coral)' : 'var(--sage)'}`,
          }}
        >
          <span className="opacity-60">⏱️</span>
          <span>
            {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Gentle reminder modal */}
      {showWarning && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{
            background: 'rgba(250, 248, 244, 0.95)',
            backdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.4s ease-out',
          }}
        >
          <div
            className="bg-white rounded-[32px] p-10 max-w-md shadow-lg relative overflow-hidden"
            style={{
              animation: 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Decorative element */}
            <div
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-10"
              style={{ background: 'var(--lavender)' }}
            />

            <div className="relative z-10">
              <div className="text-5xl mb-6 text-center">🌸</div>
              <h2 className="font-['Crimson_Pro'] text-3xl font-semibold text-center mb-4 text-balance">
                Time for a gentle pause?
              </h2>
              <p className="text-[var(--text-secondary)] text-center mb-8 font-['DM_Sans'] leading-relaxed">
                You've been here for about 15 minutes. Taking breaks helps you
                appreciate these moments even more.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleTakeBreak}
                  className="flex-1 bg-[var(--coral)] text-white px-6 py-3 rounded-full font-['DM_Sans'] font-medium hover:bg-[#e8a898] transition-all duration-300 hover:scale-105"
                >
                  Take a break
                </button>
                <button
                  onClick={handleContinue}
                  className="flex-1 bg-[var(--peach)] text-[var(--text-primary)] px-6 py-3 rounded-full font-['DM_Sans'] font-medium hover:bg-[var(--sage)] transition-all duration-300 hover:scale-105"
                >
                  Just a bit more
                </button>
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            @keyframes scaleIn {
              from {
                opacity: 0;
                transform: scale(0.9);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
