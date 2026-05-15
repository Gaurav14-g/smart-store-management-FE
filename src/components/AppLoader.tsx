import { useEffect, useRef, useState } from 'react';

interface AppLoaderProps {
  onDone: () => void;
}

export default function AppLoader({ onDone }: AppLoaderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [fading, setFading] = useState(false);

  const finish = () => {
    setFading(true);
    setTimeout(onDone, 600);
  };

  useEffect(() => {
    // fallback: max 4s
    const fallback = setTimeout(finish, 4000);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: '#000',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.6s ease',
      }}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        src="/1.mp4"
        autoPlay
        muted
        playsInline
        onEnded={finish}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          opacity: 0.45,
        }}
      />

      {/* Logo + text centered on top */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <img
          src="/1.png"
          alt="Logo"
          style={{
            height: 90,
            objectFit: 'contain',
            filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.6))',
            animation: 'loaderPulse 1.8s ease-in-out infinite',
          }}
        />
        <div style={{ marginTop: 20 }}>
          <div style={{
            width: 40, height: 3, borderRadius: 2,
            background: 'linear-gradient(90deg, #667eea, #764ba2)',
            margin: '0 auto 12px',
            animation: 'loaderBar 1.4s ease-in-out infinite',
          }} />
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, letterSpacing: 2, margin: 0 }}>
            LOADING...
          </p>
        </div>
      </div>

      <style>{`
        @keyframes loaderPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.06); opacity: 0.85; }
        }
        @keyframes loaderBar {
          0% { width: 20px; opacity: 0.4; }
          50% { width: 60px; opacity: 1; }
          100% { width: 20px; opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
