import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Battery, Save } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const MoodCheckin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mood, setMood] = useState(3);
  const [energy, setEnergy] = useState([50]);
  const [note, setNote] = useState("");

  const moodEmojis = ["😢", "😔", "😐", "😊", "😄"];
  const moodLabels = ["Very Sad", "Sad", "Neutral", "Happy", "Very Happy"];

  const energyLabels = ["Very Low", "Low", "Moderate", "High", "Very High"];
  const getEnergyLabel = (value: number) => {
    if (value <= 20) return energyLabels[0];
    if (value <= 40) return energyLabels[1];
    if (value <= 60) return energyLabels[2];
    if (value <= 80) return energyLabels[3];
    return energyLabels[4];
  };

  const handleSave = () => {
    const checkinData = {
      mood,
      energy: energy[0],
      note,
      timestamp: new Date().toISOString(),
      date: new Date().toDateString()
    };

    // Save to localStorage (in real app, this would be a database)
    const existingCheckins = JSON.parse(localStorage.getItem('pulsehabit_mood_checkins') || '[]');
    existingCheckins.push(checkinData);
    localStorage.setItem('pulsehabit_mood_checkins', JSON.stringify(existingCheckins));

    toast({
      title: "Mood check-in saved! ✨",
      description: "Your wellness data has been recorded.",
    });

    // Navigate back after a short delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Mood Check-in</h1>
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <div className="w-5 h-5 text-muted-foreground">🏠</div>
          </Button>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto">
        {/* Greeting */}
        <div className="text-center mb-8 slide-up">
          <div className="w-20 h-20 bg-gradient-pulse rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-glow">
            <Heart className="w-10 h-10 text-white animate-pulse-glow" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">How are you feeling?</h2>
          <p className="text-muted-foreground">Take a moment to check in with yourself</p>
        </div>

        {/* Mood selector */}
        <Card className="mb-6 slide-up shadow-card" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-pulse-accent" />
              Overall Mood
            </h3>
            
            {/* Emoji selector */}
            <div className="flex justify-between items-center mb-4">
              {moodEmojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => setMood(index)}
                  className={`w-12 h-12 text-2xl rounded-full transition-all duration-200 ${
                    mood === index 
                      ? 'bg-primary/20 ring-2 ring-primary scale-110' 
                      : 'hover:bg-muted hover:scale-105'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            
            <div className="text-center">
              <span className="text-lg font-semibold text-foreground">{moodLabels[mood]}</span>
            </div>
          </CardContent>
        </Card>

        {/* Energy level */}
        <Card className="mb-6 slide-up shadow-card" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center">
              <Battery className="w-5 h-5 mr-2 text-pulse-warning" />
              Energy Level
            </h3>
            
            <div className="mb-4">
              <Slider
                value={energy}
                onValueChange={setEnergy}
                max={100}
                step={10}
                className="w-full"
              />
            </div>
            
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Low</span>
              <span className="font-semibold text-foreground">{getEnergyLabel(energy[0])}</span>
              <span>High</span>
            </div>
          </CardContent>
        </Card>

        {/* Optional note */}
        <Card className="mb-8 slide-up shadow-card" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4">
              Notes (Optional)
            </h3>
            <Textarea
              placeholder="How was your day? Any thoughts you'd like to record..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-24 resize-none"
            />
          </CardContent>
        </Card>

        {/* Save button */}
        <Button 
          onClick={handleSave}
          className="w-full h-14 shadow-glow bounce-in"
          style={{ animationDelay: '0.4s' }}
        >
          <Save className="mr-2 w-5 h-5" />
          Save Check-in
        </Button>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/micro-sessions')}
            className="h-12"
          >
            🧘‍♀️ Breathe
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/ai-chat')}
            className="h-12"
          >
            💬 Talk to PulseBuddy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MoodCheckin;