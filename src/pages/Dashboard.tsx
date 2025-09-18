import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Plus, Settings, Sun, Moon, Target, CheckSquare, Heart, TrendingUp, Activity, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";

const Dashboard = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [pulseData, setPulseData] = useState({
    habits: 85,
    tasks: 92,
    mood: 4.2 // out of 5
  });

  const [todayStats, setTodayStats] = useState({
    habitsCompleted: 3,
    totalHabits: 5,
    tasksCompleted: 8,
    totalTasks: 12,
    streakDays: 7
  });

  // Mock mood emoji based on score
  const getMoodEmoji = (score: number) => {
    if (score >= 4.5) return "😄";
    if (score >= 3.5) return "😊";
    if (score >= 2.5) return "😐";
    if (score >= 1.5) return "😔";
    return "😢";
  };

  useEffect(() => {
    // Animate pulse data on mount
    const timer = setTimeout(() => {
      setPulseData({
        habits: Math.floor(Math.random() * 20) + 80,
        tasks: Math.floor(Math.random() * 20) + 80,
        mood: Math.random() * 1.5 + 3.5
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div>
            <h1 className="text-xl font-bold text-foreground">PulseHabit</h1>
            <p className="text-sm text-muted-foreground">Good evening! 🌅</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/settings')}
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto">
        {/* Central Pulse Graph */}
        <Card className="mb-6 shadow-pulse slide-up">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold text-foreground mb-2">Your Pulse Today</h2>
              <p className="text-sm text-muted-foreground">Real-time wellness overview</p>
            </div>
            
            <div className="relative flex items-center justify-center mb-6">
              {/* Pulse rings */}
              <div className="absolute w-40 h-40 rounded-full border-2 border-pulse-primary/20 animate-pulse-ring"></div>
              <div className="absolute w-32 h-32 rounded-full border-2 border-pulse-secondary/30 animate-pulse-ring" style={{ animationDelay: '1s' }}></div>
              <div className="absolute w-24 h-24 rounded-full border-2 border-pulse-accent/40 animate-pulse-ring" style={{ animationDelay: '2s' }}></div>
              
              {/* Center content */}
              <div className="relative z-10 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">
                  {Math.round((pulseData.habits + pulseData.tasks + pulseData.mood * 20) / 3)}%
                </div>
                <div className="text-sm text-muted-foreground">Overall</div>
              </div>
            </div>

            {/* Pulse metrics */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border-4 border-pulse-primary bg-pulse-primary/10 flex items-center justify-center mb-2 animate-pulse-glow">
                  <span className="text-sm font-bold text-pulse-primary">{pulseData.habits}%</span>
                </div>
                <span className="text-xs text-muted-foreground">Habits</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border-4 border-pulse-secondary bg-pulse-secondary/10 flex items-center justify-center mb-2">
                  <span className="text-sm font-bold text-pulse-secondary">{pulseData.tasks}%</span>
                </div>
                <span className="text-xs text-muted-foreground">Tasks</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border-4 border-pulse-accent bg-pulse-accent/10 flex items-center justify-center mb-2">
                  <span className="text-lg">{getMoodEmoji(pulseData.mood)}</span>
                </div>
                <span className="text-xs text-muted-foreground">Mood</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="slide-up shadow-card" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-pulse-success">{todayStats.habitsCompleted}/{todayStats.totalHabits}</div>
              <div className="text-xs text-muted-foreground">Habits</div>
            </CardContent>
          </Card>
          <Card className="slide-up shadow-card" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-pulse-info">{todayStats.tasksCompleted}/{todayStats.totalTasks}</div>
              <div className="text-xs text-muted-foreground">Tasks</div>
            </CardContent>
          </Card>
          <Card className="slide-up shadow-card" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-pulse-warning">{todayStats.streakDays}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick action buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button 
            onClick={() => navigate('/habits')}
            className="h-16 flex-col space-y-1 shadow-pulse"
            variant="outline"
          >
            <Plus className="w-5 h-5" />
            <span className="text-sm">Add Habit</span>
          </Button>
          <Button 
            onClick={() => navigate('/tasks')}
            className="h-16 flex-col space-y-1 shadow-pulse"
            variant="outline"
          >
            <CheckSquare className="w-5 h-5" />
            <span className="text-sm">Add Task</span>
          </Button>
        </div>

        <Button 
          onClick={() => navigate('/mood-checkin')}
          className="w-full h-14 mb-6 shadow-glow"
        >
          <Heart className="mr-2 w-5 h-5" />
          Mood Check-in
        </Button>

        {/* Navigation sections */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card 
            className="cursor-pointer transition-all duration-200 hover:shadow-pulse slide-up"
            style={{ animationDelay: '0.4s' }}
            onClick={() => navigate('/insights')}
          >
            <CardContent className="p-4 flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-pulse-primary" />
              <div>
                <h3 className="font-semibold text-sm">Insights</h3>
                <p className="text-xs text-muted-foreground">View progress</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer transition-all duration-200 hover:shadow-pulse slide-up"
            style={{ animationDelay: '0.5s' }}
            onClick={() => navigate('/micro-sessions')}
          >
            <CardContent className="p-4 flex items-center space-x-3">
              <div className="w-6 h-6 bg-pulse-accent rounded-full animate-pulse-glow"></div>
              <div>
                <h3 className="font-semibold text-sm">Sessions</h3>
                <p className="text-xs text-muted-foreground">Mindfulness</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer transition-all duration-200 hover:shadow-pulse slide-up"
            style={{ animationDelay: '0.6s' }}
            onClick={() => navigate('/community')}
          >
            <CardContent className="p-4 flex items-center space-x-3">
              <div className="w-6 h-6 bg-pulse-secondary rounded-xl flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Community</h3>
                <p className="text-xs text-muted-foreground">Connect & share</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer transition-all duration-200 hover:shadow-glow slide-up"
            style={{ animationDelay: '0.7s' }}
            onClick={() => navigate('/ai-chat')}
          >
            <CardContent className="p-4 flex items-center space-x-3">
              <Zap className="w-6 h-6 text-pulse-warning animate-pulse-glow" />
              <div>
                <h3 className="font-semibold text-sm">PulseBuddy</h3>
                <p className="text-xs text-muted-foreground">AI companion</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;