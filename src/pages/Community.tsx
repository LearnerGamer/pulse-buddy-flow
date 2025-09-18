import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, Users, HelpCircle, Heart, Target, Zap, Award } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Community = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [posts] = useState([
    {
      id: 1,
      user: "Anonymous User",
      avatar: "🌟",
      content: "Just completed my 30-day meditation streak! Feeling more centered and focused than ever.",
      achievement: "30 Day Streak",
      likes: 12,
      timeAgo: "2h ago",
      category: "habits"
    },
    {
      id: 2,
      user: "Wellness Warrior",
      avatar: "💪",
      content: "Tip: I've found that linking new habits to existing ones makes them stick better. Try brushing teeth → gratitude journal!",
      likes: 8,
      timeAgo: "4h ago",
      category: "tips"
    },
    {
      id: 3,
      user: "Mindful Mike",
      avatar: "🧘‍♂️",
      content: "Today's energy was low, but I still managed to do a 5-minute walk. Small steps count!",
      likes: 15,
      timeAgo: "6h ago",
      category: "motivation"
    },
    {
      id: 4,
      user: "Happy Helper",
      avatar: "😊",
      content: "Achievement unlocked: Completed all tasks for 7 days straight! The consistency is paying off.",
      achievement: "Task Master",
      likes: 9,
      timeAgo: "1d ago",
      category: "achievements"
    }
  ]);

  const [challenges] = useState([
    {
      id: 1,
      title: "21-Day Habit Builder",
      description: "Build any habit for 21 consecutive days",
      participants: 284,
      timeLeft: "12 days left",
      reward: "Habit Master Badge + 500 XP",
      difficulty: "medium"
    },
    {
      id: 2,
      title: "Mindful March",
      description: "Daily 10-minute meditation this month",
      participants: 156,
      timeLeft: "18 days left",
      reward: "Zen Master Badge + 300 XP",
      difficulty: "easy"
    },
    {
      id: 3,
      title: "Task Crusher Week",
      description: "Complete all daily tasks for 7 days",
      participants: 89,
      timeLeft: "3 days left",
      reward: "Productivity Pro Badge + 200 XP",
      difficulty: "hard"
    }
  ]);

  const [leaderboard] = useState([
    { rank: 1, name: "Zen Master", score: 2840, streak: 45, badge: "🏆" },
    { rank: 2, name: "Habit Hero", score: 2650, streak: 38, badge: "🥈" },
    { rank: 3, name: "Wellness Warrior", score: 2420, streak: 33, badge: "🥉" },
    { rank: 4, name: "Mindful Mike", score: 2180, streak: 28, badge: "⭐" },
    { rank: 5, name: "Daily Doer", score: 1950, streak: 25, badge: "🌟" },
    { rank: 6, name: "You", score: 1650, streak: 18, badge: "💫" }
  ]);

  const handleLike = (postId: number) => {
    toast({
      title: "Liked! ❤️",
      description: "Your support helps build our community.",
    });
  };

  const handleJoinChallenge = (challengeId: number) => {
    toast({
      title: "Challenge Joined! 🎯",
      description: "Good luck! Check your progress in the dashboard.",
    });
  };

  const handleNeedHelp = () => {
    toast({
      title: "Help Resources 🆘",
      description: "Crisis hotlines and support resources have been opened.",
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-pulse-success/10 text-pulse-success border-pulse-success/20';
      case 'medium': return 'bg-pulse-warning/10 text-pulse-warning border-pulse-warning/20';
      case 'hard': return 'bg-pulse-info/10 text-pulse-info border-pulse-info/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Community</h1>
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <div className="w-5 h-5 text-muted-foreground">🏠</div>
          </Button>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto">
        {/* Need Help button - Crisis support */}
        <Button 
          onClick={handleNeedHelp}
          className="w-full h-12 mb-6 shadow-glow bg-pulse-warning hover:bg-pulse-warning/90"
        >
          <HelpCircle className="mr-2 w-5 h-5" />
          Need Help? Crisis Resources
        </Button>

        {/* Community tabs */}
        <Tabs defaultValue="feed" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="leaderboard">Rankings</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-4">
            {posts.map((post, index) => (
              <Card 
                key={post.id} 
                className="slide-up shadow-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">{post.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-sm text-foreground">{post.user}</span>
                        <span className="text-xs text-muted-foreground">{post.timeAgo}</span>
                      </div>
                      {post.achievement && (
                        <Badge variant="outline" className="mb-2 text-xs bg-pulse-success/10 text-pulse-success border-pulse-success/20">
                          <Award className="w-3 h-3 mr-1" />
                          {post.achievement}
                        </Badge>
                      )}
                      <p className="text-sm text-foreground mb-3">{post.content}</p>
                      <div className="flex items-center justify-between">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className="text-xs h-8"
                        >
                          <Heart className="w-4 h-4 mr-1" />
                          {post.likes}
                        </Button>
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="slide-up shadow-card" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-3">🌟</div>
                <h3 className="font-semibold text-foreground mb-2">Share Your Achievement!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Completed a habit or task? Share your success to inspire others!
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "Coming Soon! ✨",
                      description: "Post creation feature is in development.",
                    });
                  }}
                >
                  Share Achievement
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-4">
            {challenges.map((challenge, index) => (
              <Card 
                key={challenge.id} 
                className="slide-up shadow-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{challenge.title}</h3>
                    <Badge variant="outline" className={`text-xs ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
                  
                  <div className="flex items-center space-x-4 mb-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{challenge.participants} joined</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="w-3 h-3" />
                      <span>{challenge.timeLeft}</span>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-3 mb-3">
                    <div className="text-xs text-muted-foreground mb-1">Reward:</div>
                    <div className="text-sm font-medium text-foreground">{challenge.reward}</div>
                  </div>
                  
                  <Button 
                    onClick={() => handleJoinChallenge(challenge.id)}
                    className="w-full shadow-pulse"
                  >
                    Join Challenge
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-3">
            {leaderboard.map((user, index) => (
              <Card 
                key={user.rank} 
                className={`slide-up shadow-card ${user.name === 'You' ? 'ring-2 ring-primary bg-primary/5' : ''}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">{user.badge}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-sm text-foreground">#{user.rank} {user.name}</span>
                          <div className="text-xs text-muted-foreground">
                            {user.streak} day streak
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-pulse-primary">{user.score}</div>
                          <div className="text-xs text-muted-foreground">XP</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Community;