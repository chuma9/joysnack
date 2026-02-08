import Feed from '@/components/Feed';

export default function Home() {
  return (
    <div className="feed-scroll">
      {/* Sticky header */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px 20px',
          background: 'linear-gradient(to bottom, var(--snow) 60%, transparent)',
          pointerEvents: 'none',
        }}
      >
        <h1
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: '1.5rem',
            background: 'linear-gradient(135deg, var(--terracotta) 0%, var(--plum) 50%, var(--terracotta-deep) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1,
          }}
        >
          joysnack
        </h1>
      </header>

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-[-20%] left-[-15%] w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{
            background: 'radial-gradient(circle, var(--terracotta) 0%, transparent 70%)',
            animation: 'breathe 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute top-[40%] right-[-15%] w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, var(--lavender) 0%, transparent 70%)',
            animation: 'breathe 10s ease-in-out infinite 2s',
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, var(--sage) 0%, transparent 70%)',
            animation: 'breathe 12s ease-in-out infinite 4s',
          }}
        />
      </div>

      {/* Feed */}
      <Feed />

      {/* End section */}
      <div className="intro-section" style={{ minHeight: '40svh' }}>
        <div style={{ animation: 'fadeIn 0.6s ease both' }}>
          <p
            className="text-sm tracking-wider"
            style={{
              color: 'var(--text-tertiary)',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              letterSpacing: '0.05em',
            }}
          >
            made with{' '}
            <span
              style={{
                background: 'linear-gradient(180deg, #E40303 0%, #FF8C00 20%, #FFED00 40%, #008026 60%, #004DFF 80%, #750787 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              &#x2764;&#xFE0F;
            </span>
            {' '}from san francisco
          </p>
        </div>
      </div>
    </div>
  );
}
