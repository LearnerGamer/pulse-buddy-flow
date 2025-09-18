import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, CheckCircle, Circle, Clock, AlertCircle, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Tasks = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('pulsehabit-tasks');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: "Review quarterly goals",
        description: "Assess progress and adjust plans",
        completed: false,
        priority: "high",
        dueDate: "Today",
        category: "Work",
        estimatedTime: "45 min"
      },
      {
        id: 2,
        title: "Call Mom",
        description: "Weekly check-in call",
        completed: false,
        priority: "medium",
        dueDate: "Today",
        category: "Personal",
        estimatedTime: "30 min"
      },
      {
        id: 3,
        title: "Grocery shopping",
        description: "Weekly grocery run",
        completed: true,
        priority: "low",
        dueDate: "Today",
        category: "Personal",
        estimatedTime: "60 min"
      },
      {
        id: 4,
        title: "Team standup meeting",
        description: "Daily team sync",
        completed: true,
        priority: "medium",
        dueDate: "Today",
        category: "Work",
        estimatedTime: "15 min"
      },
      {
        id: 5,
        title: "Plan weekend trip",
        description: "Research destinations and book",
        completed: false,
        priority: "low",
        dueDate: "Tomorrow",
        category: "Personal",
        estimatedTime: "90 min"
      },
      {
        id: 6,
        title: "Prepare presentation",
        description: "Client presentation for Monday",
        completed: false,
        priority: "high",
        dueDate: "Tomorrow",
        category: "Work",
        estimatedTime: "120 min"
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('pulsehabit-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (taskId: number) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const newCompleted = !task.completed;
        
        toast({
          title: newCompleted ? "Task completed! ✅" : "Task marked incomplete",
          description: newCompleted 
            ? `Great job on "${task.title}"!`
            : `"${task.title}" marked as incomplete`,
        });

        return { ...task, completed: newCompleted };
      }
      return task;
    }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-pulse-warning/10 text-pulse-warning border-pulse-warning/20';
      case 'medium': return 'bg-pulse-info/10 text-pulse-info border-pulse-info/20';
      case 'low': return 'bg-pulse-success/10 text-pulse-success border-pulse-success/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-3 h-3" />;
      case 'medium': return <Clock className="w-3 h-3" />;
      case 'low': return <Circle className="w-3 h-3" />;
      default: return null;
    }
  };

  const todayTasks = tasks.filter(t => t.dueDate === 'Today');
  const upcomingTasks = tasks.filter(t => t.dueDate !== 'Today');
  const completedTasks = tasks.filter(t => t.completed);

  const todayCompleted = todayTasks.filter(t => t.completed).length;
  const todayTotal = todayTasks.length;

  const TaskCard = ({ task, index }: { task: any, index: number }) => (
    <Card 
      className={`transition-all duration-200 slide-up shadow-card ${
        task.completed ? 'bg-primary/5 border-primary/20' : 'hover:shadow-pulse'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          {/* Completion toggle */}
          <button
            onClick={() => toggleTask(task.id)}
            className={`w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center mt-1 flex-shrink-0 ${
              task.completed
                ? 'bg-primary border-primary text-white'
                : 'border-muted-foreground/30 hover:border-primary hover:bg-primary/10'
            }`}
          >
            {task.completed && <CheckCircle className="w-4 h-4" />}
          </button>

          {/* Task info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className={`font-semibold text-sm ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                {task.title}
              </h3>
              <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)} ml-2`}>
                <span className="flex items-center space-x-1">
                  {getPriorityIcon(task.priority)}
                  <span className="capitalize">{task.priority}</span>
                </span>
              </Badge>
            </div>
            
            <p className="text-xs text-muted-foreground mb-3">{task.description}</p>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-3">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{task.dueDate}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{task.estimatedTime}</span>
                </span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {task.category}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Tasks</h1>
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <div className="w-5 h-5 text-muted-foreground">🏠</div>
          </Button>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto">
        {/* Today's progress */}
        <Card className="mb-6 shadow-pulse slide-up">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-foreground">Today's Tasks</h2>
                <p className="text-sm text-muted-foreground">{todayCompleted} of {todayTotal} completed</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-pulse-primary">
                  {todayTotal > 0 ? Math.round((todayCompleted / todayTotal) * 100) : 0}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add new task button */}
        <Button 
          className="w-full h-12 mb-6 shadow-pulse"
          onClick={() => {
            toast({
              title: "Coming Soon! 🚀",
              description: "Task creation feature is in development",
            });
          }}
        >
          <Plus className="mr-2 w-5 h-5" />
          Add New Task
        </Button>

        {/* Tasks tabs */}
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            {todayTasks.length > 0 ? (
              todayTasks.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} />
              ))
            ) : (
              <Card className="shadow-card">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="font-semibold text-foreground mb-2">All done for today!</h3>
                  <p className="text-sm text-muted-foreground">Great job completing your tasks.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} />
              ))
            ) : (
              <Card className="shadow-card">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">📅</div>
                  <h3 className="font-semibold text-foreground mb-2">No upcoming tasks</h3>
                  <p className="text-sm text-muted-foreground">You're all caught up!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedTasks.length > 0 ? (
              completedTasks.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} />
              ))
            ) : (
              <Card className="shadow-card">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">✨</div>
                  <h3 className="font-semibold text-foreground mb-2">No completed tasks yet</h3>
                  <p className="text-sm text-muted-foreground">Start checking off some tasks!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Tasks;