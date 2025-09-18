import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Target, CheckSquare, Heart } from "lucide-react";
import { useState } from "react";

const PersonalizationFocus = () => {
  const navigate = useNavigate();
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const focusAreas = [
    {
      id: 'habits',
      title: 'Habits',
      description: 'Build positive routines and break bad ones',
      icon: Target,
      color: 'pulse-primary'
    },
    {
      id: 'tasks',
      title: 'Tasks',
      description: 'Manage daily tasks and boost productivity',
      icon: CheckSquare,
      color: 'pulse-secondary'
    },
    {
      id: 'mental-health',
      title: 'Mental Health',
      description: 'Track mood and practice mindfulness',
      icon: Heart,
      color: 'pulse-accent'
    }
  ];

  const toggleArea = (areaId: string) => {
    setSelectedAreas(prev => 
      prev.includes(areaId) 
        ? prev.filter(id => id !== areaId)
        : [...prev, areaId]
    );
  };

  const handleContinue = () => {
    localStorage.setItem('pulsehabit_focus_areas', JSON.stringify(selectedAreas));
    navigate('/onboarding/habits');
  };

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pt-8 pb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/onboarding/smartwatch')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-semibold">Focus Areas</h2>
        <div className="w-10"></div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-4 slide-up">
            What matters most to you?
          </h1>
          <p className="text-muted-foreground slide-up" style={{ animationDelay: '0.1s' }}>
            Choose your focus areas. You can always change these later in settings.
          </p>
        </div>

        {/* Focus area options */}
        <div className="space-y-4 mb-8">
          {focusAreas.map((area, index) => {
            const Icon = area.icon;
            const isSelected = selectedAreas.includes(area.id);
            
            return (
              <Card 
                key={area.id}
                className={`cursor-pointer transition-all duration-200 slide-up shadow-card ${
                  isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-pulse'
                }`}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                onClick={() => toggleArea(area.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-${area.color}/10 rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 text-${area.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{area.title}</h3>
                      <p className="text-sm text-muted-foreground">{area.description}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                      isSelected 
                        ? 'bg-primary border-primary' 
                        : 'border-muted-foreground/30'
                    }`}>
                      {isSelected && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex space-x-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/onboarding/smartwatch')}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back
          </Button>
          <Button 
            onClick={handleContinue}
            disabled={selectedAreas.length === 0}
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
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <div className="w-2 h-2 bg-muted rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizationFocus;