import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Plus, Settings, Sun, Moon, Target, CheckSquare, Heart, TrendingUp, Activity, Zap, Flame, Footprints, Brain } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";

const Dashboard = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  
  // Load data from localStorage
  const [habits] = useState(() => {
    const saved = localStorage.getItem('pulsehabit-habits');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [tasks] = useState(() => {
    const saved = localStorage.getItem('pulsehabit-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  // Calculate metrics
  const completedHabits = habits.filter((h: any) => h.completed).length;
  const totalHabits = habits.length;
  const habitCompletion = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;
  
  const todayTasks = tasks.filter((t: any) => t.dueDate === 'Today');
  const taskCompletion = todayTasks.length > 0 ? Math.round((todayTasks.filter((t: any) => t.completed).length / todayTasks.length) * 100) : 0;
  
  const longestStreak = habits.length > 0 ? Math.max(...habits.map((h: any) => h.streak || 0)) : 0;
  
  // Mock data for other metrics
  const sleepQuality = 78;
  const stepCount = 8420;
  const stepGoal = 10000;
  const stepProgress = Math.round((stepCount / stepGoal) * 100);
  
  // Calculate Vitality Score (0-100)
  const vitalityScore = Math.round((habitCompletion + taskCompletion + sleepQuality + stepProgress) / 4);
  
  const getVitalityColor = (score: number) => {
    if (score >= 80) return 'text-pulse-success';
    if (score >= 60) return 'text-pulse-warning';
    return 'text-pulse-accent';
  };

  const getVitalityLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Attention';
  };

  const [pulseData, setPulseData] = useState({
    habits: habitCompletion,
    tasks: taskCompletion,
    mood: 4.2
  });

  const [todayStats, setTodayStats] = useState({
    habitsCompleted: completedHabits,
    totalHabits: totalHabits,
    tasksCompleted: todayTasks.filter((t: any) => t.completed).length,
    totalTasks: todayTasks.length,
    streakDays: longestStreak
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
    // Update stats when data changes
    setTodayStats({
      habitsCompleted: completedHabits,
      totalHabits: totalHabits,
      tasksCompleted: todayTasks.filter((t: any) => t.completed).length,
      totalTasks: todayTasks.length,
      streakDays: longestStreak
    });
    
    setPulseData({
      habits: habitCompletion,
      tasks: taskCompletion,
      mood: 4.2
    });
  }, [habits, tasks]);

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
        {/* Vitality Score - Central Focus */}
        <Card className="mb-6 shadow-pulse slide-up bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-foreground mb-2">Today's Vitality Score</h2>
              <div className={`text-6xl font-bold ${getVitalityColor(vitalityScore)} mb-2`}>
                {vitalityScore}
              </div>
              <Badge variant="outline" className={`${getVitalityColor(vitalityScore)} border-current mb-4`}>
                {getVitalityLabel(vitalityScore)}
              </Badge>
              <div className="relative">
                <svg className="w-32 h-32 mx-auto transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="hsl(var(--border))"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${314 * (vitalityScore / 100)} 314`}
                    className="animate-pulse-glow"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-primary animate-pulse-glow" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="shadow-card slide-up" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-pulse-success/10 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-pulse-success" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Habits</p>
                  <p className="font-semibold">{completedHabits}/{totalHabits}</p>
                  <Progress value={habitCompletion} className="h-1 mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card slide-up" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-pulse-info/10 rounded-full flex items-center justify-center">
                  <CheckSquare className="w-5 h-5 text-pulse-info" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tasks</p>
                  <p className="font-semibold">{todayTasks.filter((t: any) => t.completed).length}/{todayTasks.length}</p>
                  <Progress value={taskCompletion} className="h-1 mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card slide-up" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-pulse-warning/10 rounded-full flex items-center justify-center">
                  <Flame className="w-5 h-5 text-pulse-warning" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Best Streak</p>
                  <p className="font-semibold">{longestStreak} days</p>
                  <div className="flex items-center mt-1">
                    <Flame className="w-3 h-3 text-pulse-warning mr-1" />
                    <span className="text-xs text-muted-foreground">Keep it up!</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card slide-up" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-pulse-accent/10 rounded-full flex items-center justify-center">
                  <Footprints className="w-5 h-5 text-pulse-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Steps</p>
                  <p className="font-semibold">{stepCount.toLocaleString()}</p>
                  <Progress value={stepProgress} className="h-1 mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Insights */}
        <Card className="mb-6 shadow-pulse slide-up" style={{ animationDelay: '0.5s' }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-pulse-primary" />
              <span>Today's Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm flex items-center space-x-2">
                  <Moon className="w-4 h-4 text-pulse-info" />
                  <span>Sleep Quality</span>
                </span>
                <span className="text-sm font-medium">{sleepQuality}%</span>
              </div>
              <Progress value={sleepQuality} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-pulse-success" />
                  <span>Daily Activity</span>
                </span>
                <span className="text-sm font-medium">{stepProgress}%</span>
              </div>
              <Progress value={stepProgress} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-pulse-warning" />
                  <span>Mental Wellness</span>
                </span>
                <span className="text-sm font-medium">{Math.round((habitCompletion + taskCompletion) / 2)}%</span>
              </div>
              <Progress value={(habitCompletion + taskCompletion) / 2} className="h-2" />
            </div>
          </CardContent>
        </Card>
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