import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Watch, Smartphone, Heart, Activity } from "lucide-react";
import { useState } from "react";

const SmartwatchSetup = () => {
  const navigate = useNavigate();
  const [hasSmartwatch, setHasSmartwatch] = useState<boolean | null>(null);

  const handleContinue = () => {
    // Store smartwatch preference
    localStorage.setItem('pulsehabit_has_smartwatch', JSON.stringify(hasSmartwatch));
    navigate('/onboarding/focus');
  };

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pt-8 pb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/onboarding/visualization')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-semibold">Device Setup</h2>
        <div className="w-10"></div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-pulse slide-up">
            <Watch className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4 slide-up" style={{ animationDelay: '0.1s' }}>
            Do you have a smartwatch?
          </h1>
          <p className="text-muted-foreground slide-up" style={{ animationDelay: '0.2s' }}>
            We can sync with your wearable device to automatically track your activity, sleep, and health metrics.
          </p>
        </div>

        {/* Device options */}
        <div className="space-y-4 mb-8">
          <Card 
            className={`cursor-pointer transition-all duration-200 slide-up shadow-card ${
              hasSmartwatch === true ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-pulse'
            }`}
            style={{ animationDelay: '0.3s' }}
            onClick={() => setHasSmartwatch(true)}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pulse-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Watch className="w-6 h-6 text-pulse-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">Yes, I have a smartwatch</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Connect to Google Fit (Android/WearOS) or HealthKit (Apple Watch) for automatic tracking.
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>Heart Rate</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Activity className="w-3 h-3" />
                      <span>Steps</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-pulse-info rounded-full"></div>
                      <span>Sleep</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all duration-200 slide-up shadow-card ${
              hasSmartwatch === false ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-pulse'
            }`}
            style={{ animationDelay: '0.4s' }}
            onClick={() => setHasSmartwatch(false)}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pulse-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-6 h-6 text-pulse-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">No, just my phone</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    We'll use your phone's sensors and allow manual check-ins for comprehensive tracking.
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Activity className="w-3 h-3" />
                      <span>Steps</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-pulse-accent rounded-full"></div>
                      <span>Manual Input</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-pulse-warning rounded-full"></div>
                      <span>Activity Inference</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex space-x-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/onboarding/visualization')}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back
          </Button>
          <Button 
            onClick={handleContinue}
            disabled={hasSmartwatch === null}
            className="flex-1 shadow-pulse disabled:opacity-50"
          >
            Continue
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center py-6">
        <div className="flex space-x-2">
          <div className="w-6 h-2 bg-primary rounded-full"></div>
          <div className="w-2 h-2 bg-muted rounded-full"></div>
          <div className="w-2 h-2 bg-muted rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SmartwatchSetup;