import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Heart, Smile, Shield } from "lucide-react";

const OnboardingMentalHealth = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pt-8 pb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/onboarding/tracking')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-semibold">Mental Wellness</h2>
        <div className="w-10"></div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-pulse rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-glow slide-up">
            <Heart className="w-12 h-12 text-white animate-pulse-glow" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4 slide-up" style={{ animationDelay: '0.1s' }}>
            Nurture Your Wellbeing
          </h1>
          <p className="text-muted-foreground slide-up" style={{ animationDelay: '0.2s' }}>
            Check in with your emotions, track your mental health, and get personalized insights to support your wellness journey.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="space-y-4 mb-8">
          <Card className="slide-up shadow-card" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-4 flex items-center space-x-3">
              <Smile className="w-5 h-5 text-pulse-secondary flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Mood Check-ins</p>
                <p className="text-xs text-muted-foreground">Track your emotions with simple, intuitive tools</p>
              </div>
            </CardContent>
          </Card>

          <Card className="slide-up shadow-card" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-4 flex items-center space-x-3">
              <div className="w-5 h-5 bg-pulse-info rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
              <div>
                <p className="font-medium text-sm">Guided Sessions</p>
                <p className="text-xs text-muted-foreground">Breathing exercises and mini-meditations</p>
              </div>
            </CardContent>
          </Card>

          <Card className="slide-up shadow-card" style={{ animationDelay: '0.5s' }}>
            <CardContent className="p-4 flex items-center space-x-3">
              <Shield className="w-5 h-5 text-pulse-success flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Crisis Support</p>
                <p className="text-xs text-muted-foreground">Quick access to help when you need it most</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex space-x-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/onboarding/tracking')}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back
          </Button>
          <Button 
            onClick={() => navigate('/onboarding/visualization')} 
            className="flex-1 shadow-glow"
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
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <div className="w-2 h-2 bg-muted rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingMentalHealth;