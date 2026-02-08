'use client';

import { useEffect, useState, useCallback } from 'react';

const DEFAULT_SESSION_MINUTES = 15;
const MIN_SESSION_MINUTES = 1;
const MAX_SESSION_MINUTES = 60;

export default function SessionTimer() {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [sessionLimit, setSessionLimit] = useState(DEFAULT_SESSION_MINUTES);
  const [tempLimit, setTempLimit] = useState(DEFAULT_SESSION_MINUTES);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const savedLimit = localStorage.getItem('joysnack_session_limit');
    const limitMinutes = savedLimit ? parseInt(savedLimit) : DEFAULT_SESSION_MINUTES;
    setSessionLimit(limitMinutes);
    setTempLimit(limitMinutes);

    const sessionStart = localStorage.getItem('joysnack_session_start');
    const startTime = sessionStart ? parseInt(sessionStart) : Date.now();

    if (!sessionStart) {
      localStorage.setItem('joysnack_session_start', startTime.toString());
    }

    requestAnimationFrame(() => setIsVisible(true));

    const updateTimer = () => {
      const elapsed = Date.now() - startTime;
      const sessionLimitMs = limitMinutes * 60 * 1000;
      const remaining = sessionLimitMs - elapsed;

      if (remaining <= 0) {
        setTimeLeft(0);
        setShowWarning(true);
      } else {
        setTimeLeft(remaining);
        const warningThreshold = Math.min(2 * 60 * 1000, sessionLimitMs * 0.1);
        if (remaining <= warningThreshold) {
          setShowWarning(true);
        }
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [sessionLimit]);

  const handleContinue = useCallback(() => {
    setShowWarning(false);
  }, []);

  const handleTakeBreak = useCallback(() => {
    localStorage.removeItem('joysnack_session_start');
    window.location.reload();
  }, []);

  const handleSaveSettings = useCallback(() => {
    const newLimit = Math.max(MIN_SESSION_MINUTES, Math.min(MAX_SESSION_MINUTES, tempLimit));
    localStorage.setItem('joysnack_session_limit', newLimit.toString());
    localStorage.removeItem('joysnack_session_start');
    setSessionLimit(newLimit);
    setShowSettings(false);
    window.location.reload();
  }, [tempLimit]);

  if (timeLeft === null) return null;

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  const sessionLimitMs = sessionLimit * 60 * 1000;
  const progress = timeLeft / sessionLimitMs;
  const isUrgent = timeLeft <= Math.min(2 * 60 * 1000, sessionLimitMs * 0.1);

  return (
    <>
      {/* Timer pill — compact, tucked in corner */}
      <div
        className="fixed top-5 right-5 z-40 flex items-center gap-2 transition-all duration-700"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-8px)',
        }}
      >
        {/* Settings button */}
        <button
          onClick={() => { setTempLimit(sessionLimit); setShowSettings(true); }}
          className="relative overflow-hidden w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105"
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            border: 'var(--card-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
          aria-label="Timer settings"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="8" cy="8" r="3" />
            <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" />
          </svg>
        </button>

        {/* Timer display */}
        <div
          className="relative overflow-hidden px-3.5 py-2 rounded-2xl flex items-center gap-2.5"
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            border: 'var(--card-border)',
            boxShadow: isUrgent ? 'var(--shadow-glow)' : 'var(--shadow-sm)',
            transition: 'box-shadow 0.5s ease',
          }}
        >
          {/* Progress bar at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{ background: 'var(--border-subtle)' }}
          >
            <div
              className="h-full transition-all duration-1000 ease-linear"
              style={{
                width: `${progress * 100}%`,
                background: isUrgent
                  ? 'linear-gradient(to right, var(--terracotta), var(--terracotta-deep))'
                  : 'linear-gradient(to right, var(--sage), var(--sage-deep))',
              }}
            />
          </div>

          {/* Breathing dot */}
          <div
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{
              background: isUrgent ? 'var(--terracotta)' : 'var(--sage)',
              animation: 'breathe 3s ease-in-out infinite',
            }}
          />

          {/* Time */}
          <span
            className="text-xs font-medium tabular-nums"
            style={{
              color: isUrgent ? 'var(--terracotta-deep)' : 'var(--charcoal)',
              letterSpacing: '0.02em',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Settings modal */}
      {showSettings && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ animation: 'fadeIn 0.4s ease-out both' }}
        >
          <div
            className="absolute inset-0 modal-backdrop"
            onClick={() => setShowSettings(false)}
          />

          <div
            className="relative max-w-sm w-full modal-card p-10 overflow-hidden"
            style={{
              animation: 'scaleIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both',
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ background: 'linear-gradient(to right, var(--sage), var(--lavender))' }}
            />

            <div className="relative z-10 text-center">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-7"
                style={{ background: 'linear-gradient(135deg, var(--cream) 0%, var(--linen) 100%)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--charcoal)" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>

              <h2
                className="text-2xl mb-3"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Set your time
              </h2>
              <p
                className="mb-8 text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif" }}
              >
                How long would you like to spend here?
              </p>

              <div className="mb-8">
                <div className="mb-5">
                  <span
                    className="text-4xl"
                    style={{ fontFamily: "'Instrument Serif', serif", color: 'var(--ink)' }}
                  >
                    {tempLimit}
                  </span>
                  <span
                    className="text-base ml-2"
                    style={{ color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {tempLimit === 1 ? 'minute' : 'minutes'}
                  </span>
                </div>

                <input
                  type="range"
                  min={MIN_SESSION_MINUTES}
                  max={MAX_SESSION_MINUTES}
                  value={tempLimit}
                  onChange={(e) => setTempLimit(parseInt(e.target.value))}
                  className="session-slider w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, var(--terracotta) 0%, var(--terracotta) ${((tempLimit - MIN_SESSION_MINUTES) / (MAX_SESSION_MINUTES - MIN_SESSION_MINUTES)) * 100}%, var(--linen) ${((tempLimit - MIN_SESSION_MINUTES) / (MAX_SESSION_MINUTES - MIN_SESSION_MINUTES)) * 100}%, var(--linen) 100%)`,
                  }}
                />

                <div
                  className="flex justify-between mt-2 text-[11px]"
                  style={{ color: 'var(--text-tertiary)', fontFamily: "'DM Sans', sans-serif" }}
                >
                  <span>{MIN_SESSION_MINUTES} min</span>
                  <span>{MAX_SESSION_MINUTES} min</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSaveSettings}
                  className="w-full py-3.5 rounded-2xl text-sm text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, var(--terracotta) 0%, var(--terracotta-deep) 100%)',
                    boxShadow: '0 4px 16px rgba(212, 147, 122, 0.3)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-full py-3.5 rounded-2xl text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'var(--cream)',
                    color: 'var(--text-secondary)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Session nudge — slides up from bottom like a toast */}
      {showWarning && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 flex justify-center p-5 md:p-8"
          style={{ animation: 'slideInUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both' }}
        >
          <div
            className="w-full max-w-md rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.97)',
              border: 'var(--card-border)',
              boxShadow: '0 -4px 40px rgba(42, 37, 32, 0.12), 0 2px 8px rgba(42, 37, 32, 0.06)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div className="px-6 py-5 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-medium mb-0.5"
                  style={{ color: 'var(--ink)', fontFamily: "'DM Sans', sans-serif" }}
                >
                  {timeLeft === 0 ? `${sessionLimit}m up` : 'Wrapping up'}
                </p>
                <p
                  className="text-xs"
                  style={{ color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif" }}
                >
                  {timeLeft === 0 ? 'Good time for a break?' : 'A couple minutes left'}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={handleContinue}
                  className="px-4 py-2 rounded-xl text-xs transition-all duration-200 active:scale-95"
                  style={{
                    color: 'var(--text-secondary)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  Stay
                </button>
                <button
                  onClick={handleTakeBreak}
                  className="px-4 py-2 rounded-xl text-xs text-white transition-all duration-200 active:scale-95"
                  style={{
                    background: 'var(--terracotta)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  Break
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .session-slider::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--terracotta);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(212, 147, 122, 0.3);
          transition: transform 0.2s ease;
        }
        .session-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .session-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--terracotta);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(212, 147, 122, 0.3);
        }
      `}</style>
    </>
  );
}
