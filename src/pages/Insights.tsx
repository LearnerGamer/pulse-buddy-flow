import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, Calendar, Brain, Download, Share2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Insights = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock data for insights
  const weeklyData = {
    habitsCompletion: 78,
    tasksCompletion: 85,
    averageMood: 4.2,
    streakDays: 7,
    bestHabit: "Morning Meditation",
    productiveDay: "Wednesday",
    stressLevel: 3.1
  };

  const moodTrends = [
    { day: 'Mon', mood: 4.0, energy: 3.5 },
    { day: 'Tue', mood: 3.8, energy: 4.0 },
    { day: 'Wed', mood: 4.5, energy: 4.2 },
    { day: 'Thu', mood: 4.2, energy: 3.8 },
    { day: 'Fri', mood: 4.8, energy: 4.5 },
    { day: 'Sat', mood: 4.3, energy: 4.0 },
    { day: 'Sun', mood: 4.1, energy: 3.9 }
  ];

  const habits = [
    { name: "Morning Meditation", completion: 100, trend: "up" },
    { name: "Exercise", completion: 57, trend: "down" },
    { name: "Reading", completion: 86, trend: "up" },
    { name: "Water Intake", completion: 71, trend: "stable" },
    { name: "Gratitude Journal", completion: 43, trend: "down" }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <div className="w-2 h-2 bg-pulse-success rounded-full"></div>;
      case 'down': return <div className="w-2 h-2 bg-pulse-warning rounded-full"></div>;
      default: return <div className="w-2 h-2 bg-pulse-info rounded-full"></div>;
    }
  };

  const handleExport = () => {
    toast({
      title: "Export Started 📊",
      description: "Your data will be downloaded as CSV shortly.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Created! 🎉",
      description: "Your progress snapshot is ready to share.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Insights</h1>
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <div className="w-5 h-5 text-muted-foreground">🏠</div>
          </Button>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto">
        {/* Period selector */}
        <Tabs defaultValue="week" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>

          <TabsContent value="week">
            {/* Overview cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Card className="slide-up shadow-card">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-pulse-primary mb-1">{weeklyData.habitsCompletion}%</div>
                  <div className="text-xs text-muted-foreground">Habits</div>
                </CardContent>
              </Card>
              <Card className="slide-up shadow-card" style={{ animationDelay: '0.1s' }}>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-pulse-secondary mb-1">{weeklyData.tasksCompletion}%</div>
                  <div className="text-xs text-muted-foreground">Tasks</div>
                </CardContent>
              </Card>
              <Card className="slide-up shadow-card" style={{ animationDelay: '0.2s' }}>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-pulse-accent mb-1">{weeklyData.averageMood.toFixed(1)}</div>
                  <div className="text-xs text-muted-foreground">Avg Mood</div>
                </CardContent>
              </Card>
              <Card className="slide-up shadow-card" style={{ animationDelay: '0.3s' }}>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-pulse-success mb-1">{weeklyData.streakDays}</div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </CardContent>
              </Card>
            </div>

            {/* Mood trend chart */}
            <Card className="mb-6 slide-up shadow-card" style={{ animationDelay: '0.4s' }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-pulse-accent" />
                  Mood & Energy Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {moodTrends.map((day, index) => (
                    <div key={day.day} className="flex items-center space-x-3">
                      <div className="w-8 text-xs text-muted-foreground">{day.day}</div>
                      <div className="flex-1 flex items-center space-x-2">
                        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-pulse transition-all duration-500"
                            style={{ width: `${(day.mood / 5) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-xs font-medium text-foreground w-8">{day.mood}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Habit performance */}
            <Card className="mb-6 slide-up shadow-card" style={{ animationDelay: '0.5s' }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-pulse-primary" />
                  Habit Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {habits.map((habit, index) => (
                    <div key={habit.name} className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2 flex-1">
                        {getTrendIcon(habit.trend)}
                        <div className="text-sm text-foreground">{habit.name}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className="h-full bg-pulse-primary transition-all duration-500"
                            style={{ width: `${habit.completion}%` }}
                          ></div>
                        </div>
                        <div className="text-xs font-medium text-foreground w-8">{habit.completion}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key insights */}
            <Card className="mb-6 slide-up shadow-card" style={{ animationDelay: '0.6s' }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Key Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pulse-success rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Best performing habit</p>
                    <p className="text-xs text-muted-foreground">{weeklyData.bestHabit} - 100% completion</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pulse-info rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Most productive day</p>
                    <p className="text-xs text-muted-foreground">{weeklyData.productiveDay} - highest task completion</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pulse-warning rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Stress level</p>
                    <p className="text-xs text-muted-foreground">Average {weeklyData.stressLevel}/5 - consider more breaks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="month">
            <Card className="shadow-card">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="font-semibold text-foreground mb-2">Monthly insights coming soon</h3>
                <p className="text-sm text-muted-foreground">We're working on comprehensive monthly analytics.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="year">
            <Card className="shadow-card">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="font-semibold text-foreground mb-2">Yearly insights coming soon</h3>
                <p className="text-sm text-muted-foreground">Annual progress reports will be available soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Export and share buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            onClick={handleExport}
            className="h-12"
          >
            <Download className="mr-2 w-4 h-4" />
            Export CSV
          </Button>
          <Button 
            variant="outline" 
            onClick={handleShare}
            className="h-12"
          >
            <Share2 className="mr-2 w-4 h-4" />
            Share Progress
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Insights;