import { useState, useRef } from "react";
import { Clock, Sword, Scroll, Crown, Zap, Shield, Sparkles, Plus } from "lucide-react";
import { Quest } from "@/hooks/useQuests";

interface CalendarViewProps {
  quests: Quest[];
  onQuestClick: (questId: string) => void;
  onCreateQuest: (startTime: string, endTime: string) => void;
}

const CalendarView = ({ quests, onQuestClick, onCreateQuest }: CalendarViewProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragEnd, setDragEnd] = useState<number | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const formatTime = (hour: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${period}`;
  };

  const getQuestIcon = (iconName: string) => {
    switch (iconName) {
      case 'sword':
        return <Sword className="w-4 h-4" />;
      case 'scroll':
        return <Scroll className="w-4 h-4" />;
      case 'crown':
        return <Crown className="w-4 h-4" />;
      case 'zap':
        return <Zap className="w-4 h-4" />;
      case 'shield':
        return <Shield className="w-4 h-4" />;
      case 'sparkles':
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: Quest['category']) => {
    switch (category) {
      case 'Main Quest':
        return 'bg-quest-main/20 border-quest-main text-quest-main';
      case 'Side Quest':
        return 'bg-quest-side/20 border-quest-side text-quest-side';
      case 'Royal Ritual':
        return 'bg-quest-ritual/20 border-quest-ritual text-quest-ritual';
      default:
        return 'bg-quest-main/20 border-quest-main text-quest-main';
    }
  };

  const getQuestForHour = (hour: number) => {
    return quests.find(quest => {
      const startDate = new Date(quest.start_time);
      const endDate = new Date(quest.end_time);
      const startHour = startDate.getHours();
      const endHour = endDate.getHours();
      return hour >= startHour && hour < endHour;
    });
  };

  const handleMouseDown = (hour: number, e: React.MouseEvent) => {
    if (getQuestForHour(hour)) return; // Don't start drag on existing quest
    
    setIsDragging(true);
    setDragStart(hour);
    setDragEnd(hour);
    e.preventDefault();
  };

  const handleMouseEnter = (hour: number) => {
    if (isDragging && dragStart !== null) {
      setDragEnd(hour);
    }
  };

  const handleMouseUp = () => {
    if (isDragging && dragStart !== null && dragEnd !== null) {
      const startHour = Math.min(dragStart, dragEnd);
      const endHour = Math.max(dragStart, dragEnd) + 1;
      
      const startTime = `${startHour.toString().padStart(2, '0')}:00`;
      const endTime = `${endHour.toString().padStart(2, '0')}:00`;
      
      onCreateQuest(startTime, endTime);
    }
    
    setIsDragging(false);
    setDragStart(null);
    setDragEnd(null);
  };

  const isInDragRange = (hour: number) => {
    if (!isDragging || dragStart === null || dragEnd === null) return false;
    const start = Math.min(dragStart, dragEnd);
    const end = Math.max(dragStart, dragEnd);
    return hour >= start && hour <= end;
  };

  return (
    <div 
      className="panel-quest p-6 space-y-4"
      ref={calendarRef}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <h2 className="font-royal text-xl text-gold flex items-center space-x-2">
        <Clock className="w-5 h-5" />
        <span>Today's Royal Schedule</span>
        <div className="text-xs text-muted-foreground font-imperial ml-auto">
          Click and drag to create quests
        </div>
      </h2>
      
      <div className="grid grid-cols-1 gap-1 max-h-96 overflow-y-auto">
        {Array.from({ length: 24 }, (_, hour) => {
          const quest = getQuestForHour(hour);
          
          return (
            <div 
              key={hour} 
              className={`relative h-12 border-l-2 border-border/30 pl-4 flex items-center cursor-pointer transition-all ${
                isInDragRange(hour) ? 'bg-gold/10 border-gold' : 'hover:bg-background/50'
              }`}
              onMouseDown={(e) => handleMouseDown(hour, e)}
              onMouseEnter={() => handleMouseEnter(hour)}
            >
              <div className="absolute -left-2 w-12 text-xs text-muted-foreground font-imperial">
                {formatTime(hour)}
              </div>
              
              {quest ? (
                <div 
                  className={`w-full rounded-lg border p-2 cursor-pointer transition-all hover:scale-[1.02] ${
                    quest.completed 
                      ? 'bg-green-500/20 border-green-500 text-green-300' 
                      : getCategoryColor(quest.category)
                  }`}
                  onClick={() => onQuestClick(quest.id)}
                >
                  <div className="flex items-center space-x-2">
                    {getQuestIcon(quest.icon)}
                    <div className="flex-1">
                      <div className="font-royal text-sm">{quest.title}</div>
                      <div className="text-xs opacity-75 font-imperial flex items-center space-x-2">
                        <span>{new Date(quest.start_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                        <span>•</span>
                        <span>{quest.category}</span>
                        <span>•</span>
                        <span>+{quest.xp} XP</span>
                      </div>
                    </div>
                    {quest.completed && (
                      <div className="text-green-400 text-xs font-bold">✓</div>
                    )}
                  </div>
                </div>
              ) : isInDragRange(hour) ? (
                <div className="w-full rounded-lg border-2 border-dashed border-gold/50 p-2 flex items-center justify-center">
                  <Plus className="w-4 h-4 text-gold/50" />
                  <span className="text-xs text-gold/50 font-imperial ml-1">New Quest</span>
                </div>
              ) : (
                <div className="w-full h-full" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;