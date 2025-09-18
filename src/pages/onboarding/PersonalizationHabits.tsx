import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Droplets, Moon, Utensils, Dumbbell } from "lucide-react";
import { useState } from "react";

const PersonalizationHabits = () => {
  const navigate = useNavigate();
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);

  const starterHabits = [
    {
      id: 'water',
      title: 'Drink Water',
      description: '8 glasses per day',
      icon: Droplets,
      color: 'text-pulse-info'
    },
    {
      id: 'sleep',
      title: 'Good Sleep',
      description: '7-8 hours nightly',
      icon: Moon,
      color: 'text-pulse-secondary'
    },
    {
      id: 'meditation',
      title: 'Meditation',
      description: '10 minutes daily',
      icon: () => <div className="w-6 h-6 bg-pulse-accent rounded-full animate-pulse-glow"></div>,
      color: 'text-pulse-accent'
    },
    {
      id: 'exercise',
      title: 'Exercise',
      description: '30 minutes daily',
      icon: Dumbbell,
      color: 'text-pulse-success'
    },
    {
      id: 'reading',
      title: 'Reading',
      description: '20 pages per day',
      icon: () => <div className="w-6 h-6 bg-pulse-warning rounded-lg flex items-center justify-center"><span className="text-xs">📖</span></div>,
      color: 'text-pulse-warning'
    },
    {
      id: 'healthy-eating',
      title: 'Healthy Eating',
      description: 'Balanced meals',
      icon: Utensils,
      color: 'text-pulse-primary'
    }
  ];

  const toggleHabit = (habitId: string) => {
    setSelectedHabits(prev => 
      prev.includes(habitId) 
        ? prev.filter(id => id !== habitId)
        : [...prev, habitId]
    );
  };

  const handleContinue = () => {
    localStorage.setItem('pulsehabit_starter_habits', JSON.stringify(selectedHabits));
    navigate('/onboarding/notifications');
  };

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pt-8 pb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/onboarding/focus')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-semibold">Starter Habits</h2>
        <div className="w-10"></div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-4 slide-up">
            Choose your first habits
          </h1>
          <p className="text-muted-foreground slide-up" style={{ animationDelay: '0.1s' }}>
            Select a few habits to get started. You can add more anytime.
          </p>
        </div>

        {/* Habit options */}
        <div className="grid grid-cols-2 gap-3 mb-8 flex-1">
          {starterHabits.map((habit, index) => {
            const Icon = habit.icon;
            const isSelected = selectedHabits.includes(habit.id);
            
            return (
              <Card 
                key={habit.id}
                className={`cursor-pointer transition-all duration-200 slide-up shadow-card ${
                  isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-pulse'
                }`}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                onClick={() => toggleHabit(habit.id)}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-card-foreground/5 flex items-center justify-center">
                      <Icon className={habit.color} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-foreground">{habit.title}</h3>
                      <p className="text-xs text-muted-foreground">{habit.description}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                      isSelected 
                        ? 'bg-primary border-primary' 
                        : 'border-muted-foreground/30'
                    }`}>
                      {isSelected && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
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
        <div className="flex space-x-4 pb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/onboarding/focus')}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back
          </Button>
          <Button 
            onClick={handleContinue}
            className="flex-1 shadow-pulse"
          >
            Continue
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center py-4">
        <div className="flex space-x-2">
          <div className="w-6 h-2 bg-primary rounded-full"></div>
          <div className="w-6 h-2 bg-primary rounded-full"></div>
          <div className="w-2 h-2 bg-muted rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizationHabits;