import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Settings, Trophy, Target, Calendar, TrendingUp, Award, Flame } from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const navigate = useNavigate();
  
  const [userStats] = useState({
    name: "PulseHabit User",
    joinDate: "March 2024",
    totalXP: 1650,
    level: 8,
    completedHabits: 124,
    completedTasks: 89,
    currentStreak: 18,
    longestStreak: 32,
    totalSessions: 47
  });

  const [badges] = useState([
    { id: 1, name: "Early Bird", description: "Complete morning routine 10 days", earned: true, icon: "🌅" },
    { id: 2, name: "Consistency King", description: "7-day habit streak", earned: true, icon: "👑" },
    { id: 3, name: "Mindful Master", description: "50 meditation sessions", earned: true, icon: "🧘‍♀️" },
    { id: 4, name: "Task Crusher", description: "100 completed tasks", earned: false, icon: "⚡" },
    { id: 5, name: "Zen Master", description: "30-day meditation streak", earned: false, icon: "☯️" },
    { id: 6, name: "Goal Getter", description: "Complete 5 weekly goals", earned: true, icon: "🎯" }
  ]);

  const [recentAchievements] = useState([
    { id: 1, title: "7-day streak!", description: "Completed morning meditation for 7 days", date: "2 days ago", xp: 100 },
    { id: 2, title: "Task Master", description: "Completed all daily tasks", date: "5 days ago", xp: 50 },
    { id: 3, title: "Mindful Moment", description: "First meditation session", date: "1 week ago", xp: 25 }
  ]);

  const earnedBadges = badges.filter(b => b.earned);
  const nextLevelXP = (userStats.level + 1) * 250; // Each level requires more XP
  const currentLevelXP = userStats.level * 250;
  const progressToNext = ((userStats.totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Profile</h1>
          <Button variant="ghost" size="icon" onClick={() => navigate('/settings')}>
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto">
        {/* User info and level */}
        <Card className="mb-6 shadow-pulse slide-up">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                <span className="text-2xl">👤</span>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-1">{userStats.name}</h2>
              <p className="text-sm text-muted-foreground">Member since {userStats.joinDate}</p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-muted-foreground">Level {userStats.level}</div>
                <div className="text-xs text-muted-foreground">{userStats.totalXP} / {nextLevelXP} XP</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-pulse-primary">{userStats.totalXP}</div>
                <div className="text-xs text-muted-foreground">Total XP</div>
              </div>
            </div>

            {/* Level progress bar */}
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-primary transition-all duration-500"
                style={{ width: `${Math.min(progressToNext, 100)}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="slide-up shadow-card" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 text-pulse-primary mx-auto mb-2" />
              <div className="text-xl font-bold text-foreground">{userStats.completedHabits}</div>
              <div className="text-xs text-muted-foreground">Habits Done</div>
            </CardContent>
          </Card>
          
          <Card className="slide-up shadow-card" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-4 text-center">
              <div className="w-6 h-6 bg-pulse-secondary rounded-sm mx-auto mb-2 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm"></div>
              </div>
              <div className="text-xl font-bold text-foreground">{userStats.completedTasks}</div>
              <div className="text-xs text-muted-foreground">Tasks Done</div>
            </CardContent>
          </Card>
          
          <Card className="slide-up shadow-card" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-4 text-center">
              <Flame className="w-6 h-6 text-pulse-warning mx-auto mb-2" />
              <div className="text-xl font-bold text-foreground">{userStats.currentStreak}</div>
              <div className="text-xs text-muted-foreground">Current Streak</div>
            </CardContent>
          </Card>
          
          <Card className="slide-up shadow-card" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-4 text-center">
              <div className="w-6 h-6 bg-pulse-accent rounded-full mx-auto mb-2 animate-pulse-glow"></div>
              <div className="text-xl font-bold text-foreground">{userStats.totalSessions}</div>
              <div className="text-xs text-muted-foreground">Mindful Sessions</div>
            </CardContent>
          </Card>
        </div>

        {/* Earned badges */}
        <Card className="mb-6 slide-up shadow-card" style={{ animationDelay: '0.5s' }}>
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-4 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-pulse-warning" />
              Badges ({earnedBadges.length}/{badges.length})
            </h3>
            
            <div className="grid grid-cols-3 gap-3">
              {badges.map((badge, index) => (
                <div 
                  key={badge.id} 
                  className={`text-center p-3 rounded-lg transition-all duration-200 ${
                    badge.earned 
                      ? 'bg-primary/10 border border-primary/20' 
                      : 'bg-muted/30 opacity-50'
                  }`}
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="text-xs font-medium text-foreground">{badge.name}</div>
                  {badge.earned && <div className="w-2 h-2 bg-pulse-success rounded-full mx-auto mt-1"></div>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent achievements */}
        <Card className="mb-6 slide-up shadow-card" style={{ animationDelay: '0.6s' }}>
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-pulse-success" />
              Recent Achievements
            </h3>
            
            <div className="space-y-3">
              {recentAchievements.map((achievement, index) => (
                <div key={achievement.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-8 h-8 bg-pulse-success/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4 text-pulse-success" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-foreground">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground mb-1">{achievement.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{achievement.date}</span>
                      <Badge variant="outline" className="text-xs bg-pulse-primary/10 text-pulse-primary border-pulse-primary/20">
                        +{achievement.xp} XP
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/insights')}
            className="h-12"
          >
            <TrendingUp className="mr-2 w-4 h-4" />
            View Insights
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/settings')}
            className="h-12"
          >
            <Settings className="mr-2 w-4 h-4" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;