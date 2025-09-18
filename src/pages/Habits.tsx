import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, CheckCircle, Circle, Flame, Target } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Habits = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [habits, setHabits] = useState([
    {
      id: 1,
      title: "Morning Meditation",
      description: "10 minutes of mindfulness",
      completed: true,
      streak: 7,
      progress: 100,
      icon: "🧘‍♀️",
      color: "pulse-accent"
    },
    {
      id: 2,
      title: "Drink Water",
      description: "8 glasses daily",
      completed: false,
      streak: 5,
      progress: 62,
      icon: "💧",
      color: "pulse-info"
    },
    {
      id: 3,
      title: "Exercise",
      description: "30 minutes activity",
      completed: false,
      streak: 3,
      progress: 0,
      icon: "💪",
      color: "pulse-success"
    },
    {
      id: 4,
      title: "Reading",
      description: "20 pages daily",
      completed: true,
      streak: 12,
      progress: 100,
      icon: "📚",
      color: "pulse-warning"
    },
    {
      id: 5,
      title: "Gratitude Journal",
      description: "3 things daily",
      completed: false,
      streak: 2,
      progress: 0,
      icon: "✨",
      color: "pulse-primary"
    }
  ]);

  const toggleHabit = (habitId: number) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const newCompleted = !habit.completed;
        const newProgress = newCompleted ? 100 : 0;
        const newStreak = newCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1);
        
        toast({
          title: newCompleted ? "Great job! 🎉" : "Habit unmarked",
          description: newCompleted 
            ? `${habit.title} completed! ${newStreak} day streak!`
            : `${habit.title} marked as incomplete`,
        });

        return {
          ...habit,
          completed: newCompleted,
          progress: newProgress,
          streak: newStreak
        };
      }
      return habit;
    }));
  };

  const completedToday = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  const completionRate = Math.round((completedToday / totalHabits) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Habits</h1>
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <div className="w-5 h-5 text-muted-foreground">🏠</div>
          </Button>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto">
        {/* Today's progress */}
        <Card className="mb-6 shadow-pulse slide-up">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Today's Progress</h2>
                <p className="text-sm text-muted-foreground">{completedToday} of {totalHabits} completed</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-pulse-primary">{completionRate}%</div>
                <div className="text-xs text-muted-foreground">Complete</div>
              </div>
            </div>
            <Progress value={completionRate} className="h-3" />
          </CardContent>
        </Card>

        {/* Add new habit button */}
        <Button 
          className="w-full h-14 mb-6 shadow-pulse"
          onClick={() => {
            toast({
              title: "Coming Soon! 🚀",
              description: "Habit creation feature is in development",
            });
          }}
        >
          <Plus className="mr-2 w-5 h-5" />
          Add New Habit
        </Button>

        {/* Habits list */}
        <div className="space-y-4">
          {habits.map((habit, index) => (
            <Card 
              key={habit.id} 
              className={`transition-all duration-200 slide-up shadow-card ${
                habit.completed ? 'bg-primary/5 border-primary/20' : 'hover:shadow-pulse'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  {/* Completion toggle */}
                  <button
                    onClick={() => toggleHabit(habit.id)}
                    className={`w-12 h-12 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                      habit.completed
                        ? 'bg-primary border-primary text-white'
                        : 'border-muted-foreground/30 hover:border-primary hover:bg-primary/10'
                    }`}
                  >
                    {habit.completed ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>

                  {/* Habit info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-lg">{habit.icon}</span>
                      <h3 className={`font-semibold ${habit.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {habit.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{habit.description}</p>
                    
                    {/* Progress bar */}
                    <div className="mb-2">
                      <Progress value={habit.progress} className="h-2" />
                    </div>

                    {/* Streak info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Flame className="w-3 h-3 text-pulse-warning" />
                        <span>{habit.streak} day streak</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {habit.progress}% today
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats footer */}
        <Card className="mt-8 slide-up shadow-card" style={{ animationDelay: '0.6s' }}>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-pulse-success">{completedToday}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <div>
                <div className="text-lg font-bold text-pulse-warning">
                  {Math.max(...habits.map(h => h.streak))}
                </div>
                <div className="text-xs text-muted-foreground">Best Streak</div>
              </div>
              <div>
                <div className="text-lg font-bold text-pulse-info">{totalHabits}</div>
                <div className="text-xs text-muted-foreground">Total Habits</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Habits;