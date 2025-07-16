import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sword, Scroll, Crown, Clock, Zap, Shield, Sparkles } from 'lucide-react';

interface QuestCreationModalProps {
  open: boolean;
  onClose: () => void;
  onCreateQuest: (quest: {
    title: string;
    category: 'Main Quest' | 'Side Quest' | 'Royal Ritual';
    start_time: string;
    end_time: string;
    icon: string;
    xp: number;
  }) => void;
  initialStartTime?: string;
  initialEndTime?: string;
}

const questIcons = [
  { name: 'sword', icon: Sword, label: 'Sword' },
  { name: 'scroll', icon: Scroll, label: 'Scroll' },
  { name: 'crown', icon: Crown, label: 'Crown' },
  { name: 'clock', icon: Clock, label: 'Clock' },
  { name: 'zap', icon: Zap, label: 'Lightning' },
  { name: 'shield', icon: Shield, label: 'Shield' },
  { name: 'sparkles', icon: Sparkles, label: 'Sparkles' },
];

const categoryColors = {
  'Main Quest': 'bg-quest-main/20 border-quest-main text-quest-main',
  'Side Quest': 'bg-quest-side/20 border-quest-side text-quest-side',
  'Royal Ritual': 'bg-quest-ritual/20 border-quest-ritual text-quest-ritual',
};

export const QuestCreationModal = ({
  open,
  onClose,
  onCreateQuest,
  initialStartTime,
  initialEndTime,
}: QuestCreationModalProps) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Main Quest' | 'Side Quest' | 'Royal Ritual'>('Main Quest');
  const [startTime, setStartTime] = useState(initialStartTime || '');
  const [endTime, setEndTime] = useState(initialEndTime || '');
  const [selectedIcon, setSelectedIcon] = useState('sword');
  const [xp, setXp] = useState(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !startTime || !endTime) return;

    // Convert time strings to ISO format
    const today = new Date().toISOString().split('T')[0];
    const startDateTime = `${today}T${startTime}:00`;
    const endDateTime = `${today}T${endTime}:00`;

    onCreateQuest({
      title,
      category,
      start_time: startDateTime,
      end_time: endDateTime,
      icon: selectedIcon,
      xp,
    });

    // Reset form
    setTitle('');
    setCategory('Main Quest');
    setStartTime('');
    setEndTime('');
    setSelectedIcon('sword');
    setXp(10);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-sm border-border/50">
        <DialogHeader>
          <DialogTitle className="font-royal text-gold flex items-center space-x-2">
            <Crown className="w-5 h-5" />
            <span>Create New Quest</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="font-imperial text-gold-light">Quest Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter quest name..."
              className="bg-background/50 border-border/50 text-foreground"
              required
            />
          </div>

          <div>
            <Label className="font-imperial text-gold-light">Category</Label>
            <Select value={category} onValueChange={(value: any) => setCategory(value)}>
              <SelectTrigger className="bg-background/50 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Main Quest">Main Quest</SelectItem>
                <SelectItem value="Side Quest">Side Quest</SelectItem>
                <SelectItem value="Royal Ritual">Royal Ritual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime" className="font-imperial text-gold-light">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="bg-background/50 border-border/50"
                required
              />
            </div>
            <div>
              <Label htmlFor="endTime" className="font-imperial text-gold-light">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="bg-background/50 border-border/50"
                required
              />
            </div>
          </div>

          <div>
            <Label className="font-imperial text-gold-light">Quest Icon</Label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {questIcons.map(({ name, icon: Icon, label }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setSelectedIcon(name)}
                  className={`p-3 rounded-lg border transition-all ${
                    selectedIcon === name
                      ? 'border-gold bg-gold/20 text-gold'
                      : 'border-border/50 bg-background/30 text-muted-foreground hover:border-gold/50'
                  }`}
                  title={label}
                >
                  <Icon className="w-5 h-5 mx-auto" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="xp" className="font-imperial text-gold-light">XP Reward</Label>
            <Select value={xp.toString()} onValueChange={(value) => setXp(parseInt(value))}>
              <SelectTrigger className="bg-background/50 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 XP - Minor Task</SelectItem>
                <SelectItem value="10">10 XP - Standard Quest</SelectItem>
                <SelectItem value="15">15 XP - Important Quest</SelectItem>
                <SelectItem value="25">25 XP - Major Quest</SelectItem>
                <SelectItem value="50">50 XP - Epic Quest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className={`flex-1 ${categoryColors[category]}`}
              disabled={!title || !startTime || !endTime}
            >
              Create Quest
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};