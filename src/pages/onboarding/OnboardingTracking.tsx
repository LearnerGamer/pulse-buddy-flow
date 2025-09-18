import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, CheckCircle, Calendar, TrendingUp } from "lucide-react";

const OnboardingTracking = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pt-8 pb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-semibold">Track Habits & Tasks</h2>
        <div className="w-10"></div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-pulse slide-up">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4 slide-up" style={{ animationDelay: '0.1s' }}>
            Build Lasting Habits
          </h1>
          <p className="text-muted-foreground slide-up" style={{ animationDelay: '0.2s' }}>
            Track your daily habits and tasks with intelligent insights. Build consistency one day at a time.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="space-y-4 mb-8">
          <Card className="slide-up shadow-card" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-4 flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-pulse-primary flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Daily Check-ins</p>
                <p className="text-xs text-muted-foreground">Mark habits complete and track streaks</p>
              </div>
            </CardContent>
          </Card>

          <Card className="slide-up shadow-card" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-4 flex items-center space-x-3">
              <TrendingUp className="w-5 h-5 text-pulse-success flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Progress Insights</p>
                <p className="text-xs text-muted-foreground">Visualize your growth with detailed analytics</p>
              </div>
            </CardContent>
          </Card>

          <Card className="slide-up shadow-card" style={{ animationDelay: '0.5s' }}>
            <CardContent className="p-4 flex items-center space-x-3">
              <div className="w-5 h-5 bg-pulse-warning rounded-full flex-shrink-0 animate-pulse-glow"></div>
              <div>
                <p className="font-medium text-sm">Smart Reminders</p>
                <p className="text-xs text-muted-foreground">Get notified at the perfect time</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex space-x-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back
          </Button>
          <Button 
            onClick={() => navigate('/onboarding/mental-health')} 
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
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <div className="w-2 h-2 bg-muted rounded-full"></div>
          <div className="w-2 h-2 bg-muted rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTracking;