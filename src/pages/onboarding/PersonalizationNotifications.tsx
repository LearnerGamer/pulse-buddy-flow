import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Clock, Heart, Target } from "lucide-react";
import { useState } from "react";

const PersonalizationNotifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    habits: true,
    tasks: true,
    moodCheckins: true,
    insights: false
  });

  const [checkInTime, setCheckInTime] = useState('20:00');

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleFinish = () => {
    // Save preferences
    localStorage.setItem('pulsehabit_notifications', JSON.stringify(notifications));
    localStorage.setItem('pulsehabit_checkin_time', checkInTime);
    localStorage.setItem('pulsehabit_onboarding_complete', 'true');
    
    // Navigate to main app
    window.location.href = '/dashboard'; // Force refresh to update App state
  };

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pt-8 pb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/onboarding/habits')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-semibold">Notifications</h2>
        <div className="w-10"></div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-pulse slide-up">
            <Bell className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4 slide-up" style={{ animationDelay: '0.1s' }}>
            Stay on track
          </h1>
          <p className="text-muted-foreground slide-up" style={{ animationDelay: '0.2s' }}>
            Choose when and how you'd like to be reminded about your habits and wellness check-ins.
          </p>
        </div>

        {/* Notification settings */}
        <div className="space-y-4 mb-8">
          <Card className="slide-up shadow-card" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-pulse-primary" />
                  <div>
                    <p className="font-medium text-sm">Habit Reminders</p>
                    <p className="text-xs text-muted-foreground">Daily notifications for your habits</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.habits}
                  onCheckedChange={() => handleNotificationToggle('habits')}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="slide-up shadow-card" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-pulse-secondary rounded-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Task Reminders</p>
                    <p className="text-xs text-muted-foreground">Notifications for upcoming tasks</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.tasks}
                  onCheckedChange={() => handleNotificationToggle('tasks')}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="slide-up shadow-card" style={{ animationDelay: '0.5s' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-pulse-accent" />
                  <div>
                    <p className="font-medium text-sm">Mood Check-ins</p>
                    <p className="text-xs text-muted-foreground">Daily wellness reminders</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.moodCheckins}
                  onCheckedChange={() => handleNotificationToggle('moodCheckins')}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="slide-up shadow-card" style={{ animationDelay: '0.6s' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-pulse-info rounded-full animate-pulse-glow"></div>
                  <div>
                    <p className="font-medium text-sm">Weekly Insights</p>
                    <p className="text-xs text-muted-foreground">Progress summaries and tips</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.insights}
                  onCheckedChange={() => handleNotificationToggle('insights')}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Check-in time */}
        <Card className="mb-8 slide-up shadow-card" style={{ animationDelay: '0.7s' }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-pulse-warning" />
                <div>
                  <p className="font-medium text-sm">Daily Check-in Time</p>
                  <p className="text-xs text-muted-foreground">When to remind you for mood check-in</p>
                </div>
              </div>
              <input
                type="time"
                value={checkInTime}
                onChange={(e) => setCheckInTime(e.target.value)}
                className="px-3 py-1 text-sm border rounded-lg bg-background"
              />
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex space-x-4 pb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/onboarding/habits')}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back
          </Button>
          <Button 
            onClick={handleFinish}
            className="flex-1 shadow-glow"
          >
            Get Started! 🎉
          </Button>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center py-4">
        <div className="flex space-x-2">
          <div className="w-6 h-2 bg-primary rounded-full"></div>
          <div className="w-6 h-2 bg-primary rounded-full"></div>
          <div className="w-6 h-2 bg-primary rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizationNotifications;