import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface AddHabitDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (habit: {
    title: string;
    description: string;
    icon: string;
    color: string;
    category: string;
  }) => void;
}

export const AddHabitDialog = ({ isOpen, onClose, onAdd }: AddHabitDialogProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('⭐');
  const [selectedColor, setSelectedColor] = useState('pulse-primary');
  const [selectedCategory, setSelectedCategory] = useState('Health');

  const icons = ['⭐', '🧘‍♀️', '💧', '💪', '📚', '✨', '🎯', '🍎', '🏃‍♂️', '🌱', '💤', '🧠'];
  const colors = [
    { name: 'Primary', value: 'pulse-primary' },
    { name: 'Success', value: 'pulse-success' },
    { name: 'Warning', value: 'pulse-warning' },
    { name: 'Info', value: 'pulse-info' },
    { name: 'Accent', value: 'pulse-accent' }
  ];
  const categories = ['Health', 'Fitness', 'Mindfulness', 'Learning', 'Work', 'Personal'];

  const handleSubmit = () => {
    if (!title.trim()) return;
    
    onAdd({
      title: title.trim(),
      description: description.trim(),
      icon: selectedIcon,
      color: selectedColor,
      category: selectedCategory
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setSelectedIcon('⭐');
    setSelectedColor('pulse-primary');
    setSelectedCategory('Health');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>Add New Habit</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Habit Name</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Drink 8 glasses of water"
              className="mt-1"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of your habit"
              className="mt-1"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Icon</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {icons.map((icon) => (
                <button
                  key={icon}
                  onClick={() => setSelectedIcon(icon)}
                  className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-lg transition-all ${
                    selectedIcon === icon 
                      ? 'border-primary bg-primary/10' 
                      : 'border-muted hover:border-primary/50'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Color Theme</label>
            <div className="flex gap-2 mt-2">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`px-3 py-1 rounded-full text-xs border transition-all ${
                    selectedColor === color.value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-muted text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  {color.name}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Category</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!title.trim()} className="flex-1">
              Add Habit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};