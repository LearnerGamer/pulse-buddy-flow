import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { StressPopup } from "@/components/ui/stress-popup";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Mic, Zap, Brain, Heart, TrendingUp, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const AIChat = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      content: "Hi there! I'm PulseBuddy, your AI wellness companion. 🤖✨ I'm here to help you reflect on your day, understand your habits, and provide personalized insights. How was your day today?",
      timestamp: new Date().toISOString(),
      mood: null
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [coachingMode, setCoachingMode] = useState<'friendly' | 'strict' | 'therapist'>('friendly');
  const [showStressPopup, setShowStressPopup] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const coachingModes = [
    { id: 'friendly', label: 'Friendly', icon: Heart, description: 'Supportive and encouraging' },
    { id: 'strict', label: 'Strict', icon: TrendingUp, description: 'Direct and accountability-focused' },
    { id: 'therapist', label: 'Therapist', icon: Brain, description: 'Reflective and therapeutic' }
  ];

  const quickPrompts = [
    "How did my habits go today?",
    "I'm feeling stressed lately",
    "Help me plan tomorrow",
    "Why am I struggling with consistency?",
    "Analyze my mood patterns",
    "Give me motivation!"
  ];

  // Mock AI responses based on user data
  const generateAIResponse = (userMessage: string): string => {
    const responses = {
      habits: [
        "I can see you completed 3 out of 5 habits today! Your morning meditation streak is impressive at 7 days. The consistency in that habit is really paying off. What's making it easier to stick with meditation compared to your other habits?",
        "Looking at your habit data, you're doing great with meditation and reading, but I notice exercise has been challenging. Your completion rate dropped to 57% this week. What obstacles are you facing with your workout routine?"
      ],
      stress: [
        "I understand you're feeling stressed. Looking at your recent mood check-ins, I notice your stress levels have been higher on weekdays. Your mood data shows you're more relaxed after completing your evening routine. Would you like me to guide you through a quick breathing exercise?",
        "Stress can really impact our habits and well-being. I see from your data that your mood tends to improve after mindfulness sessions. Your breathing exercises have a 90% correlation with better mood scores. Let me help you with a breathing exercise right now."
      ],
      motivation: [
        "You're doing better than you think! Your overall habit completion is 78% this week, and you've maintained an 18-day streak. That's incredible progress! Remember, consistency beats perfection. What's been your biggest win this week?",
        "I've analyzed your progress, and you've completed 124 habits total! Your dedication shows - even on low-energy days, you've managed to do something positive. That resilience is what builds lasting change. Keep going! 🌟"
      ],
      planning: [
        "Based on your patterns, I notice you're most productive on Wednesday and Thursday. Your energy levels are typically higher in the morning (4.2 avg) compared to evening (3.8 avg). Would you like me to suggest an optimal schedule for tomorrow?",
        "Looking at your task completion data, you handle 2-3 high-priority tasks best. Your mood data shows you feel more accomplished when you complete tasks early. Shall we plan your tomorrow with your energy patterns in mind?"
      ],
      offtopic: [
        "I'm your PulseBuddy — I can help with habits, tasks, stress, or mood tracking. For food, I recommend grabbing a healthy snack 🍎.",
        "I'm here to help with your wellness journey! I can assist with habits, mood, stress management, and task planning. What aspect of your well-being would you like to focus on?",
        "That's outside my expertise, but I'm great at helping with habits, mood tracking, stress relief, and productivity. What wellness goal can I help you with today?"
      ]
    };

    const message = userMessage.toLowerCase();
    
    if (message.includes('habit') || message.includes('routine')) {
      return responses.habits[Math.floor(Math.random() * responses.habits.length)];
    }
    if (message.includes('stress') || message.includes('anxious') || message.includes('overwhelm')) {
      // Trigger stress popup
      setTimeout(() => setShowStressPopup(true), 1000);
      return responses.stress[Math.floor(Math.random() * responses.stress.length)];
    }
    if (message.includes('motivation') || message.includes('encourage') || message.includes('help')) {
      return responses.motivation[Math.floor(Math.random() * responses.motivation.length)];
    }
    if (message.includes('plan') || message.includes('tomorrow') || message.includes('schedule')) {
      return responses.planning[Math.floor(Math.random() * responses.planning.length)];
    }
    
    // Check for off-topic queries
    const offTopicKeywords = ['food', 'eat', 'restaurant', 'movie', 'music', 'weather', 'sports', 'politics', 'news'];
    if (offTopicKeywords.some(keyword => message.includes(keyword))) {
      return responses.offtopic[Math.floor(Math.random() * responses.offtopic.length)];
    }
    
    // Default personalized response
    return `I understand what you're sharing. Based on your recent data - 78% habit completion rate, 18-day streak, and mood trends showing improvement after mindfulness - I can see you're making real progress. What specific aspect of your wellness journey would you like to explore together?`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user' as const,
      content: inputMessage,
      timestamp: new Date().toISOString(),
      mood: null
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai' as const,
        content: generateAIResponse(inputMessage),
        timestamp: new Date().toISOString(),
        mood: null
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      
      // Award XP for AI interaction
      toast({
        title: "Reflection bonus! 🧠",
        description: "You earned +15 XP for AI interaction",
      });
    }, 1500);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputMessage(prompt);
  };

  const handleVoiceInput = () => {
    toast({
      title: "Voice input coming soon! 🎤",
      description: "Voice chat with PulseBuddy is in development",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b px-4 py-4 flex-shrink-0">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-pulse rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">PulseBuddy</h1>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-pulse-success rounded-full"></div>
                <span className="text-xs text-muted-foreground">AI Companion</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <div className="w-5 h-5 text-muted-foreground">🏠</div>
          </Button>
        </div>
      </div>

      {/* Coaching mode selector */}
      <div className="px-4 py-3 border-b bg-card/50">
        <div className="max-w-md mx-auto">
          <div className="flex space-x-2">
            {coachingModes.map((mode) => {
              const Icon = mode.icon;
              return (
                <Button
                  key={mode.id}
                  variant={coachingMode === mode.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCoachingMode(mode.id as any)}
                  className="flex-1 h-8"
                >
                  <Icon className="w-3 h-3 mr-1" />
                  {mode.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-md mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                {message.sender === 'ai' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-gradient-pulse rounded-full flex items-center justify-center">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs text-muted-foreground">PulseBuddy</span>
                    <Badge variant="outline" className="text-xs bg-pulse-primary/10 text-pulse-primary border-pulse-primary/20">
                      {coachingMode}
                    </Badge>
                  </div>
                )}
                
                <Card className={`shadow-card ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card'
                }`}>
                  <CardContent className="p-3">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <div className="text-xs opacity-70 mt-2">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[85%]">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-pulse rounded-full flex items-center justify-center animate-pulse-glow">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs text-muted-foreground">PulseBuddy is thinking...</span>
                </div>
                <Card className="shadow-card">
                  <CardContent className="p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick prompts */}
      <div className="px-4 py-2 border-t bg-card/50">
        <div className="max-w-md mx-auto">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {quickPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickPrompt(prompt)}
                className="whitespace-nowrap text-xs h-8 flex-shrink-0"
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="p-4 border-t bg-card flex-shrink-0">
        <div className="max-w-md mx-auto">
          <div className="flex space-x-2">
            <div className="flex-1">
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Share your thoughts, ask for insights, or reflect on your day..."
                className="min-h-[44px] max-h-32 resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Button
                size="icon"
                onClick={handleVoiceInput}
                variant="outline"
                className="h-11 w-11"
              >
                <Mic className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="h-11 w-11 shadow-pulse"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <StressPopup 
        isOpen={showStressPopup}
        onClose={() => setShowStressPopup(false)}
        onComplete={() => {
          toast({
            title: "Well done! 🌟",
            description: "You earned +10 XP for completing a breathing exercise",
          });
        }}
      />
    </div>
  );
};

export default AIChat;