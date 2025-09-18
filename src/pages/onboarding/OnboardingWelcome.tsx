import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Target, Brain, Activity } from "lucide-react";

const OnboardingWelcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center pt-8 pb-6">
        <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-pulse">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-gradient-pulse rounded-full animate-pulse-glow"></div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4 slide-up">
            Welcome to PulseHabit
          </h1>
          <p className="text-muted-foreground text-lg slide-up" style={{ animationDelay: '0.1s' }}>
            Your personal companion for building better habits, managing tasks, and nurturing mental wellness.
          </p>
        </div>

        {/* Feature cards */}
        <div className="space-y-4 mb-8">
          <Card className="slide-up shadow-card" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="w-12 h-12 bg-pulse-primary/10 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-pulse-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Track Habits & Tasks</h3>
                <p className="text-sm text-muted-foreground">Build consistency with intelligent tracking</p>
              </div>
            </CardContent>
          </Card>

          <Card className="slide-up shadow-card" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="w-12 h-12 bg-pulse-secondary/10 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-pulse-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Monitor Mental Health</h3>
                <p className="text-sm text-muted-foreground">Check-in with yourself and track your wellbeing</p>
              </div>
            </CardContent>
          </Card>

          <Card className="slide-up shadow-card" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="w-12 h-12 bg-pulse-accent/10 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-pulse-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Pulse Visualization</h3>
                <p className="text-sm text-muted-foreground">See your progress come alive with dynamic insights</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <Button 
          onClick={() => navigate('/onboarding/tracking')} 
          className="w-full h-14 text-lg shadow-pulse bounce-in"
          style={{ animationDelay: '0.5s' }}
        >
          Get Started
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center py-6">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <div className="w-2 h-2 bg-muted rounded-full"></div>
          <div className="w-2 h-2 bg-muted rounded-full"></div>
          <div className="w-2 h-2 bg-muted rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWelcome;