import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Bell, Smartphone, Shield, Eye, Palette, Link, HelpCircle, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState({
    habits: true,
    tasks: true,
    moodCheckins: true,
    insights: false,
    community: true
  });

  const [privacy, setPrivacy] = useState({
    shareProgress: false,
    anonymousMode: true,
    dataCollection: true
  });

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    toast({
      title: "Settings updated",
      description: `${key} notifications ${notifications[key] ? 'disabled' : 'enabled'}`,
    });
  };

  const handlePrivacyToggle = (key: keyof typeof privacy) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    toast({
      title: "Privacy updated",
      description: `${key} setting changed`,
    });
  };

  const settingsSections = [
    {
      title: "Profile",
      icon: User,
      items: [
        { label: "Edit Profile", description: "Name, email, and avatar", action: () => toast({ title: "Coming Soon!", description: "Profile editing is in development" }) },
        { label: "Account Settings", description: "Password and security", action: () => toast({ title: "Coming Soon!", description: "Account settings are in development" }) }
      ]
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        { 
          label: "Habit Reminders", 
          description: "Daily notifications for your habits", 
          toggle: true,
          checked: notifications.habits,
          action: () => handleNotificationToggle('habits')
        },
        { 
          label: "Task Reminders", 
          description: "Notifications for upcoming tasks", 
          toggle: true,
          checked: notifications.tasks,
          action: () => handleNotificationToggle('tasks')
        },
        { 
          label: "Mood Check-ins", 
          description: "Daily wellness reminders", 
          toggle: true,
          checked: notifications.moodCheckins,
          action: () => handleNotificationToggle('moodCheckins')
        },
        { 
          label: "Weekly Insights", 
          description: "Progress summaries and tips", 
          toggle: true,
          checked: notifications.insights,
          action: () => handleNotificationToggle('insights')
        },
        { 
          label: "Community Updates", 
          description: "Challenges and achievements", 
          toggle: true,
          checked: notifications.community,
          action: () => handleNotificationToggle('community')
        }
      ]
    },
    {
      title: "Devices & Sync",
      icon: Smartphone,
      items: [
        { label: "Connected Devices", description: "Manage wearables and sync", action: () => toast({ title: "Coming Soon!", description: "Device management is in development" }) },
        { label: "Data Sync", description: "Cloud backup and restore", action: () => toast({ title: "Coming Soon!", description: "Data sync is in development" }) }
      ]
    },
    {
      title: "Privacy & Data",
      icon: Shield,
      items: [
        { 
          label: "Share Progress", 
          description: "Allow others to see your achievements", 
          toggle: true,
          checked: privacy.shareProgress,
          action: () => handlePrivacyToggle('shareProgress')
        },
        { 
          label: "Anonymous Mode", 
          description: "Hide your identity in community", 
          toggle: true,
          checked: privacy.anonymousMode,
          action: () => handlePrivacyToggle('anonymousMode')
        },
        { 
          label: "Data Collection", 
          description: "Help improve the app with usage data", 
          toggle: true,
          checked: privacy.dataCollection,
          action: () => handlePrivacyToggle('dataCollection')
        },
        { label: "Export Data", description: "Download your data as CSV", action: () => toast({ title: "Export Started!", description: "Your data will be downloaded shortly" }) },
        { label: "Delete Account", description: "Permanently delete your account", action: () => toast({ title: "Account Deletion", description: "Please contact support for account deletion" }) }
      ]
    },
    {
      title: "Appearance",
      icon: Palette,
      items: [
        { 
          label: "Theme", 
          description: `Currently ${theme} mode`, 
          action: () => setTheme(theme === "light" ? "dark" : "light"),
          icon: theme === "light" ? Moon : Sun
        }
      ]
    },
    {
      title: "Integrations",
      icon: Link,
      items: [
        { label: "Google Fit", description: "Sync fitness data", action: () => toast({ title: "Coming Soon!", description: "Google Fit integration is in development" }) },
        { label: "Apple Health", description: "Connect to HealthKit", action: () => toast({ title: "Coming Soon!", description: "Apple Health integration is in development" }) },
        { label: "Calendar", description: "Sync tasks with calendar", action: () => toast({ title: "Coming Soon!", description: "Calendar integration is in development" }) }
      ]
    },
    {
      title: "Help & Support",
      icon: HelpCircle,
      items: [
        { label: "Help Center", description: "FAQs and guides", action: () => toast({ title: "Coming Soon!", description: "Help center is in development" }) },
        { label: "Contact Support", description: "Get help from our team", action: () => toast({ title: "Coming Soon!", description: "Support contact is in development" }) },
        { label: "Privacy Policy", description: "How we handle your data", action: () => toast({ title: "Coming Soon!", description: "Privacy policy is in development" }) },
        { label: "Terms of Service", description: "App usage terms", action: () => toast({ title: "Coming Soon!", description: "Terms of service is in development" }) }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Settings</h1>
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <div className="w-5 h-5 text-muted-foreground">🏠</div>
          </Button>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto">
        {/* Theme toggle at top */}
        <Card className="mb-6 shadow-pulse slide-up">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {theme === "light" ? <Sun className="w-5 h-5 text-pulse-warning" /> : <Moon className="w-5 h-5 text-pulse-info" />}
                <div>
                  <p className="font-medium text-sm">Appearance</p>
                  <p className="text-xs text-muted-foreground">Switch between light and dark mode</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Settings sections */}
        <div className="space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <div key={section.title} className="slide-up" style={{ animationDelay: `${sectionIndex * 0.1}s` }}>
              <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                <section.icon className="w-5 h-5 mr-2 text-pulse-primary" />
                {section.title}
              </h2>
              
              <div className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <Card key={itemIndex} className="shadow-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1">
                          {item.icon && <item.icon className="w-4 h-4 text-pulse-secondary" />}
                          <div className="flex-1">
                            <p className="font-medium text-sm text-foreground">{item.label}</p>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                        
                        {item.toggle ? (
                          <Switch 
                            checked={item.checked}
                            onCheckedChange={item.action}
                          />
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={item.action}
                          >
                            →
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* App version footer */}
        <Card className="mt-8 slide-up shadow-card" style={{ animationDelay: '0.8s' }}>
          <CardContent className="p-4 text-center">
            <div className="text-xs text-muted-foreground">
              PulseHabit v1.0.0 - Built with ❤️ for your wellness journey
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;