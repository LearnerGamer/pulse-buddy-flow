import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Heart, Play, Pause, RotateCcw } from "lucide-react";

interface StressPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const StressPopup = ({ isOpen, onClose, onComplete }: StressPopupProps) => {
  const [activeExercise, setActiveExercise] = useState<'478' | 'box' | null>(null);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [progress, setProgress] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const exercises = {
    '478': { name: '4-7-8 Breathing', phases: [4, 7, 8, 0], description: 'Inhale for 4, hold for 7, exhale for 8' },
    'box': { name: 'Box Breathing', phases: [4, 4, 4, 4], description: 'Inhale, hold, exhale, pause - each for 4 counts' }
  };

  useEffect(() => {
    if (!isRunning || !activeExercise) return;

    const exercise = exercises[activeExercise];
    const phaseIndex = ['inhale', 'hold', 'exhale', 'pause'].indexOf(phase);
    const duration = exercise.phases[phaseIndex] * 1000;

    if (duration === 0) {
      // Skip pause phase for 4-7-8
      const nextPhase = ['inhale', 'hold', 'exhale', 'pause'][(phaseIndex + 1) % 4];
      setPhase(nextPhase as any);
      if (nextPhase === 'inhale') setCycleCount(prev => prev + 1);
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          const nextPhase = ['inhale', 'hold', 'exhale', 'pause'][(phaseIndex + 1) % 4];
          setPhase(nextPhase as any);
          if (nextPhase === 'inhale') setCycleCount(prev => prev + 1);
          return 0;
        }
        return prev + (100 / (duration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, activeExercise, phase]);

  const startExercise = (type: '478' | 'box') => {
    setActiveExercise(type);
    setPhase('inhale');
    setProgress(0);
    setCycleCount(0);
    setIsRunning(true);
  };

  const toggleExercise = () => {
    setIsRunning(!isRunning);
  };

  const resetExercise = () => {
    setIsRunning(false);
    setPhase('inhale');
    setProgress(0);
    setCycleCount(0);
  };

  const handleComplete = () => {
    onComplete();
    onClose();
    resetExercise();
    setActiveExercise(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-pulse-primary" />
            <span>Take a Moment to Breathe</span>
          </DialogTitle>
        </DialogHeader>
        
        {!activeExercise ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              I notice you might be feeling stressed. Let's try a quick breathing exercise to help you feel better.
            </p>
            
            <div className="space-y-3">
              <Card className="cursor-pointer hover:shadow-pulse transition-all" onClick={() => startExercise('478')}>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-pulse-primary">4-7-8 Breathing</h3>
                  <p className="text-xs text-muted-foreground">Inhale 4, hold 7, exhale 8 - great for anxiety</p>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-pulse transition-all" onClick={() => startExercise('box')}>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-pulse-info">Box Breathing</h3>
                  <p className="text-xs text-muted-foreground">Equal counts of 4 - perfect for focus</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="font-semibold text-lg">{exercises[activeExercise].name}</h3>
              <p className="text-sm text-muted-foreground">{exercises[activeExercise].description}</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="text-6xl font-light text-pulse-primary capitalize">
                {phase === 'pause' ? 'rest' : phase}
              </div>
              
              <Progress value={progress} className="h-2" />
              
              <div className="text-sm text-muted-foreground">
                Cycle {cycleCount} • {phase === 'pause' ? 'Rest' : phase.charAt(0).toUpperCase() + phase.slice(1)}
              </div>
            </div>
            
            <div className="flex justify-center space-x-3">
              <Button variant="outline" size="icon" onClick={toggleExercise}>
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button variant="outline" size="icon" onClick={resetExercise}>
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
            
            {cycleCount >= 3 && (
              <Button onClick={handleComplete} className="w-full">
                Complete Session (+10 XP)
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};