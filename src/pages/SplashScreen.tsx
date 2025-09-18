import { useEffect, useState } from "react";

const SplashScreen = () => {
  const [pulseScale, setPulseScale] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseScale(prev => prev === 1 ? 1.1 : 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-primary flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 rounded-full border-2 border-white/20 animate-pulse-ring"></div>
        <div className="absolute w-64 h-64 rounded-full border-2 border-white/30 animate-pulse-ring" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-32 h-32 rounded-full border-2 border-white/40 animate-pulse-ring" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Logo and app name */}
      <div className="relative z-10 flex flex-col items-center">
        <div 
          className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-glow transition-transform duration-1000 ease-in-out"
          style={{ transform: `scale(${pulseScale})` }}
        >
          <div className="w-12 h-12 bg-gradient-pulse rounded-xl flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full animate-pulse-glow"></div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-2 slide-up">PulseHabit</h1>
        <p className="text-white/80 text-lg slide-up" style={{ animationDelay: '0.2s' }}>
          Track • Grow • Thrive
        </p>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-16 flex space-x-2">
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};

export default SplashScreen;