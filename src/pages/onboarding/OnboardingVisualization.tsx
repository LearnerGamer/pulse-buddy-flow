import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Activity, BarChart3, Zap } from "lucide-react";

const OnboardingVisualization = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pt-8 pb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/onboarding/mental-health')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-semibold">Pulse Visualization</h2>
        <div className="w-10"></div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-success rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-pulse slide-up relative">
            <Activity className="w-12 h-12 text-white" />
            {/* Pulse rings animation */}
            <div className="absolute w-full h-full rounded-3xl border-2 border-pulse-success animate-pulse-ring"></div>
            <div className="absolute w-full h-full rounded-3xl border-2 border-pulse-success animate-pulse-ring" style={{ animationDelay: '1s' }}></div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4 slide-up" style={{ animationDelay: '0.1s' }}>
            See Your Progress Pulse
          </h1>
          <p className="text-muted-foreground slide-up" style={{ animationDelay: '0.2s' }}>
            Watch your habits, tasks, and mood come alive with dynamic visualizations that show your real-time progress.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="space-y-4 mb-8">
          <Card className="slide-up shadow-card" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-4 flex items-center space-x-3">
              <div className="w-5 h-5 bg-pulse-primary rounded-full animate-pulse-glow flex-shrink-0"></div>
              <div>
                <p className="font-medium text-sm">Live Pulse Graph</p>
                <p className="text-xs text-muted-foreground">Central dashboard showing your overall wellness</p>
              </div>
            </CardContent>
          </Card>

          <Card className="slide-up shadow-card" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-4 flex items-center space-x-3">
              <BarChart3 className="w-5 h-5 text-pulse-info flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Interactive Charts</p>
                <p className="text-xs text-muted-foreground">Detailed insights with engaging visualizations</p>
              </div>
            </CardContent>
          </Card>

          <Card className="slide-up shadow-card" style={{ animationDelay: '0.5s' }}>
            <CardContent className="p-4 flex items-center space-x-3">
              <Zap className="w-5 h-5 text-pulse-warning flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Real-time Updates</p>
                <p className="text-xs text-muted-foreground">Watch your progress update as you complete tasks</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Demo visualization */}
        <Card className="mb-8 p-6 bg-gradient-to-br from-pulse-primary/5 to-pulse-secondary/5 border-pulse-primary/20 slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-4 border-pulse-primary bg-pulse-primary/20 flex items-center justify-center mb-2">
                <span className="text-sm font-bold text-pulse-primary">85%</span>
              </div>
              <span className="text-xs text-muted-foreground">Habits</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-4 border-pulse-secondary bg-pulse-secondary/20 flex items-center justify-center mb-2">
                <span className="text-sm font-bold text-pulse-secondary">92%</span>
              </div>
              <span className="text-xs text-muted-foreground">Tasks</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-4 border-pulse-accent bg-pulse-accent/20 flex items-center justify-center mb-2">
                <span className="text-sm font-bold text-pulse-accent">😊</span>
              </div>
              <span className="text-xs text-muted-foreground">Mood</span>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex space-x-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/onboarding/mental-health')}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back
          </Button>
          <Button 
            onClick={() => navigate('/onboarding/smartwatch')} 
            className="flex-1 shadow-pulse"
          >
            Next
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center py-6">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-muted rounded-full"></div>
          <div className="w-2 h-2 bg-muted rounded-full"></div>
          <div className="w-2 h-2 bg-muted rounded-full"></div>
          <div className="w-2 h-2 bg-primary rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingVisualization;