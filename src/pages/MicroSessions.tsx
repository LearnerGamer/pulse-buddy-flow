import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Pause, RotateCcw, Wind, Heart, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const MicroSessions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  const sessions = [
    {
      id: 'breathing-4-7-8',
      title: '4-7-8 Breathing',
      description: 'Calming breath technique for relaxation',
      duration: 240, // 4 minutes
      icon: Wind,
      color: 'pulse-accent',
      instructions: 'Inhale for 4, hold for 7, exhale for 8'
    },
    {
      id: 'box-breathing',
      title: 'Box Breathing',
      description: 'Equal breathing for focus and balance',
      duration: 300, // 5 minutes
      icon: () => <div className="w-6 h-6 border-2 border-current rounded-sm"></div>,
      color: 'pulse-primary',
      instructions: 'Inhale 4, hold 4, exhale 4, hold 4'
    },
    {
      id: 'quick-meditation',
      title: 'Quick Meditation',
      description: 'Brief mindfulness practice',
      duration: 180, // 3 minutes
      icon: () => <div className="w-6 h-6 bg-current rounded-full animate-pulse-glow"></div>,
      color: 'pulse-secondary',
      instructions: 'Focus on your breath and present moment'
    },
    {
      id: 'grounding-5-4-3-2-1',
      title: '5-4-3-2-1 Grounding',
      description: 'Grounding technique for anxiety',
      duration: 300, // 5 minutes
      icon: Heart,
      color: 'pulse-info',
      instructions: '5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste'
    },
    {
      id: 'energy-reset',
      title: 'Energy Reset',
      description: 'Quick energy boost and focus',
      duration: 120, // 2 minutes
      icon: Sparkles,
      color: 'pulse-warning',
      instructions: 'Energizing breathwork and movement'
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining]);

  useEffect(() => {
    // Simulate breathing phases for breathing exercises
    if (activeSession?.includes('breathing') && isPlaying) {
      const phaseInterval = setInterval(() => {
        setBreathingPhase(prev => {
          switch (prev) {
            case 'inhale': return 'hold';
            case 'hold': return 'exhale';
            case 'exhale': return 'inhale';
            default: return 'inhale';
          }
        });
      }, 4000); // 4-second cycles

      return () => clearInterval(phaseInterval);
    }
  }, [activeSession, isPlaying]);

  const startSession = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setActiveSession(sessionId);
      setTimeRemaining(session.duration);
      setIsPlaying(true);
      setBreathingPhase('inhale');
      
      toast({
        title: `${session.title} started! 🧘‍♀️`,
        description: session.instructions,
      });
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetSession = () => {
    const session = sessions.find(s => s.id === activeSession);
    if (session) {
      setTimeRemaining(session.duration);
      setIsPlaying(false);
      setBreathingPhase('inhale');
    }
  };

  const handleSessionComplete = () => {
    setIsPlaying(false);
    setActiveSession(null);
    
    toast({
      title: "Session completed! ✨",
      description: "Great job taking time for yourself. You've earned +10 XP!",
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getBreathingInstruction = () => {
    switch (breathingPhase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
    }
  };

  const currentSession = sessions.find(s => s.id === activeSession);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Micro Sessions</h1>
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <div className="w-5 h-5 text-muted-foreground">🏠</div>
          </Button>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto">
        {/* Active session */}
        {activeSession && currentSession && (
          <Card className="mb-6 shadow-glow slide-up">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className={`w-24 h-24 bg-${currentSession.color}/10 rounded-3xl flex items-center justify-center mx-auto mb-4 transition-all duration-1000 ${isPlaying ? 'animate-pulse-glow' : ''}`}>
                  <currentSession.icon className={`w-12 h-12 text-${currentSession.color}`} />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">{currentSession.title}</h2>
                
                {/* Breathing instruction for breathing exercises */}
                {activeSession.includes('breathing') && isPlaying && (
                  <div className="mb-4">
                    <div className={`text-lg font-semibold transition-all duration-500 ${
                      breathingPhase === 'inhale' ? 'text-pulse-accent' :
                      breathingPhase === 'hold' ? 'text-pulse-warning' :
                      'text-pulse-primary'
                    }`}>
                      {getBreathingInstruction()}
                    </div>
                  </div>
                )}
                
                <div className="text-3xl font-bold text-foreground mb-4">
                  {formatTime(timeRemaining)}
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={togglePlayPause}
                  className="w-12 h-12"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={resetSession}
                  className="w-12 h-12"
                >
                  <RotateCcw className="w-6 h-6" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Session selection */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {activeSession ? 'Switch Session' : 'Choose a Session'}
          </h2>
          
          {sessions.map((session, index) => {
            const Icon = session.icon;
            const isActive = activeSession === session.id;
            
            return (
              <Card 
                key={session.id}
                className={`cursor-pointer transition-all duration-200 slide-up shadow-card ${
                  isActive ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-pulse'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => startSession(session.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-${session.color}/10 rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 text-${session.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{session.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{session.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {Math.floor(session.duration / 60)} minutes
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {session.instructions}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tips */}
        <Card className="mt-8 slide-up shadow-card" style={{ animationDelay: '0.6s' }}>
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-3">💡 Tips for Better Sessions</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Find a quiet, comfortable space</li>
              <li>• Use headphones for better focus</li>
              <li>• Practice regularly for best results</li>
              <li>• Don't worry if your mind wanders</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MicroSessions;