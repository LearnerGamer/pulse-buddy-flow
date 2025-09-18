import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-pulse slide-up">
          <span className="text-4xl">🔍</span>
        </div>
        
        <h1 className="text-6xl font-bold text-pulse-primary mb-4 slide-up" style={{ animationDelay: '0.1s' }}>404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-2 slide-up" style={{ animationDelay: '0.2s' }}>Page Not Found</h2>
        <p className="text-muted-foreground mb-8 slide-up" style={{ animationDelay: '0.3s' }}>
          Oops! The page you're looking for doesn't exist. Let's get you back on track with your wellness journey.
        </p>
        
        <div className="flex flex-col space-y-3 slide-up" style={{ animationDelay: '0.4s' }}>
          <Button 
            onClick={() => navigate('/dashboard')}
            className="w-full h-12 shadow-pulse"
          >
            <Home className="mr-2 w-5 h-5" />
            Back to Dashboard
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate(-1)}
            className="w-full h-12"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;