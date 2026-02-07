import Feed from '@/components/Feed';
import SessionTimer from '@/components/SessionTimer';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Decorative background elements */}
      <div
        className="fixed top-20 left-10 w-64 h-64 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'var(--lavender)' }}
      />
      <div
        className="fixed bottom-20 right-10 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'var(--sage)' }}
      />

      {/* Session Timer */}
      <SessionTimer />

      {/* Header */}
      <header className="relative z-10 py-12 px-6">
        <div className="max-w-[var(--content-max)] mx-auto">
          <h1
            className="font-['Crimson_Pro'] text-5xl md:text-6xl font-semibold text-center mb-4"
            style={{
              background: 'linear-gradient(135deg, var(--coral) 0%, var(--plum) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            joysnack
          </h1>
          <p className="text-center font-['DM_Sans'] text-[var(--text-secondary)] text-lg max-w-md mx-auto text-balance">
            A gentle feed of uplifting moments, one snack at a time
          </p>
        </div>
      </header>

      {/* Main Feed */}
      <main className="relative z-10 px-6 pb-20">
        <div className="max-w-[var(--content-max)] mx-auto">
          <Feed />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 text-center">
        <p className="font-['DM_Sans'] text-sm text-[var(--text-secondary)]">
          Made with care for your wellbeing ✨
        </p>
      </footer>
    </div>
  );
}
