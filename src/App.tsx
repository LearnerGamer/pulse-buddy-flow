import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { useState, useEffect } from "react";

// Pages
import SplashScreen from "./pages/SplashScreen";
import OnboardingWelcome from "./pages/onboarding/OnboardingWelcome";
import OnboardingTracking from "./pages/onboarding/OnboardingTracking";
import OnboardingMentalHealth from "./pages/onboarding/OnboardingMentalHealth";
import OnboardingVisualization from "./pages/onboarding/OnboardingVisualization";
import SmartwatchSetup from "./pages/onboarding/SmartwatchSetup";
import PersonalizationFocus from "./pages/onboarding/PersonalizationFocus";
import PersonalizationHabits from "./pages/onboarding/PersonalizationHabits";
import PersonalizationNotifications from "./pages/onboarding/PersonalizationNotifications";
import Dashboard from "./pages/Dashboard";
import MoodCheckin from "./pages/MoodCheckin";
import Habits from "./pages/Habits";
import Tasks from "./pages/Tasks";
import Insights from "./pages/Insights";
import MicroSessions from "./pages/MicroSessions";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AIChat from "./pages/AIChat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingComplete = localStorage.getItem('pulsehabit_onboarding_complete');
    setHasCompletedOnboarding(!!onboardingComplete);

    // Show splash screen for 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="pulsehabit-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {!hasCompletedOnboarding ? (
                <>
                  <Route path="/" element={<OnboardingWelcome />} />
                  <Route path="/onboarding/tracking" element={<OnboardingTracking />} />
                  <Route path="/onboarding/mental-health" element={<OnboardingMentalHealth />} />
                  <Route path="/onboarding/visualization" element={<OnboardingVisualization />} />
                  <Route path="/onboarding/smartwatch" element={<SmartwatchSetup />} />
                  <Route path="/onboarding/focus" element={<PersonalizationFocus />} />
                  <Route path="/onboarding/habits" element={<PersonalizationHabits />} />
                  <Route path="/onboarding/notifications" element={<PersonalizationNotifications />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/mood-checkin" element={<MoodCheckin />} />
                  <Route path="/habits" element={<Habits />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/insights" element={<Insights />} />
                  <Route path="/micro-sessions" element={<MicroSessions />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/ai-chat" element={<AIChat />} />
                </>
              )}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;