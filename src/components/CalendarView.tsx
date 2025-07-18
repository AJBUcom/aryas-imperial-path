import { useState, useRef, useEffect } from "react";
import { Clock, Sword, Scroll, Crown, Zap, Shield, Sparkles, Plus, Check, Edit3, AlertTriangle, Trophy } from "lucide-react";
import { Quest } from "@/hooks/useQuests";
import { useTimeTracking } from "@/hooks/useTimeTracking";
import { QuestEditModal } from "./QuestEditModal";

interface CalendarViewProps {
  quests: Quest[];
  onQuestClick: (questId: string) => void;
  onCreateQuest: (startTime: string, endTime: string) => void;
  onUpdateQuest: (questId: string, updates: Partial<Quest>) => void;
  onDeleteQuest: (questId: string) => void;
}

const CalendarView = ({ quests, onQuestClick, onCreateQuest, onUpdateQuest, onDeleteQuest }: CalendarViewProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragEnd, setDragEnd] = useState<number | null>(null);
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { 
    currentTime,
    formattedCurrentTime,
    isToday,
    getCurrentTimePosition,
    isQuestOverdue 
  } = useTimeTracking(quests);
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [dragCurrentY, setDragCurrentY] = useState<number | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Remove auto-scroll since we want to see all hours
  // useEffect(() => {
  //   const now = new Date();
  //   const currentHour = now.getHours();
  //   const scrollPosition = Math.max(0, (currentHour - 2) * 64);
  //   
  //   if (scrollContainerRef.current) {
  //     scrollContainerRef.current.scrollTop = scrollPosition;
  //   }
  // }, []);

  const formatTime = (hour: number) => {
    if (hour === 0) return '';
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour} ${period}`;
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

  const getCategoryClass = (category: Quest['category']) => {
    switch (category) {
      case 'Main Quest':
        return 'gcal-quest-main';
      case 'Side Quest':
        return 'gcal-quest-side';
      case 'Royal Ritual':
        return 'gcal-quest-ritual';
      default:
        return 'gcal-quest-main';
    }
  };

  const getQuestsForHour = (hour: number) => {
    return quests.filter(quest => {
      const startDate = new Date(quest.start_time);
      const endDate = new Date(quest.end_time);
      const startHour = startDate.getHours();
      const startMinutes = startDate.getMinutes();
      const endHour = endDate.getHours();
      const endMinutes = endDate.getMinutes();
      
      // Check if this hour contains any part of the quest
      if (hour > startHour && hour < endHour) return true;
      if (hour === startHour && (hour < endHour || (hour === endHour && endMinutes > 0))) return true;
      if (hour === endHour && startHour < endHour && endMinutes > 0) return true;
      
      return false;
    });
  };

  const getQuestPosition = (quest: Quest, hour: number) => {
    const startDate = new Date(quest.start_time);
    const endDate = new Date(quest.end_time);
    const startHour = startDate.getHours();
    const startMinutes = startDate.getMinutes();
    const endHour = endDate.getHours();
    const endMinutes = endDate.getMinutes();
    
    // Calculate position within the hour (40px per hour for compact view)
    let top = 0;
    let height = 40;
    
    if (hour === startHour) {
      top = (startMinutes / 60) * 40;
      if (hour === endHour) {
        height = ((endMinutes - startMinutes) / 60) * 40;
      } else {
        height = 40 - top;
      }
    } else if (hour === endHour && endMinutes > 0) {
      height = (endMinutes / 60) * 40;
    }
    
    return { top, height: Math.max(height, 16) }; // Minimum 16px height
  };

  const handleMouseDown = (hour: number, e: React.MouseEvent) => {
    const questsInHour = getQuestsForHour(hour);
    if (questsInHour.length > 0) return; // Don't start drag on existing quest
    
    setIsDragging(true);
    setDragStart(hour);
    setDragEnd(hour);
    setDragStartY(e.clientY);
    setDragCurrentY(e.clientY);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setDragCurrentY(e.clientY);
      
      // Calculate which hour we're over based on mouse position
      const rect = calendarRef.current?.getBoundingClientRect();
      if (rect) {
        const relativeY = e.clientY - rect.top;
        const hour = Math.floor(relativeY / 40); // 40px per hour
        if (hour >= 0 && hour < 24) {
          setDragEnd(hour);
        }
      }
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
    setDragStartY(null);
    setDragCurrentY(null);
  };

  const isInDragRange = (hour: number) => {
    if (!isDragging || dragStart === null || dragEnd === null) return false;
    const start = Math.min(dragStart, dragEnd);
    const end = Math.max(dragStart, dragEnd);
    return hour >= start && hour <= end;
  };

  return (
    <div className="gcal-container">
      {/* Header - preserve royal theme */}
      <div className="gcal-header">
        <div className="flex items-center space-x-2 font-royal text-gold">
          <Clock className="w-5 h-5" />
          <span>Today's Royal Schedule</span>
          <div className="text-xs text-gcal-time font-imperial ml-auto">
            Click and drag to create quests
          </div>
        </div>
      </div>
      
      {/* Calendar Grid - Full height, no scrolling */}
      <div className="flex">
        {/* Time Column */}
        <div className="gcal-time-column">
          {Array.from({ length: 24 }, (_, hour) => (
            <div key={hour} className="h-10 border-b border-gcal-line px-3 py-1 flex items-start justify-end text-xs text-gcal-time font-medium">
              {formatTime(hour)}
            </div>
          ))}
        </div>
        
        {/* Event Area - No scrolling */}
        <div 
          className="gcal-event-area"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div ref={calendarRef} className="relative">
            {Array.from({ length: 24 }, (_, hour) => {
              const questsInHour = getQuestsForHour(hour);
              
              return (
                <div 
                  key={hour} 
                  className="h-10 border-b border-gcal-line relative hover:bg-gcal-cell-hover transition-colors duration-150 cursor-pointer"
                  style={{
                    backgroundColor: isInDragRange(hour) ? 'hsl(var(--quest-main) / 0.1)' : undefined
                  }}
                  onMouseDown={(e) => handleMouseDown(hour, e)}
                >
                  {/* Current time indicator */}
                  {(() => {
                    const now = new Date();
                    const currentHour = now.getHours();
                    const currentMinutes = now.getMinutes();
                    
                    if (hour === currentHour) {
                      const position = (currentMinutes / 60) * 40; // 40px per hour
                      return (
                        <div 
                          className="absolute left-0 right-0 h-0.5 bg-red-500 z-20"
                          style={{ top: `${position}px` }}
                        >
                          <div className="absolute -left-1 -top-1 w-2 h-2 bg-red-500 rounded-full"></div>
                        </div>
                      );
                    }
                    return null;
                  })()}
                  
                  {/* Quest blocks */}
                  {questsInHour.map((quest) => {
                    const position = getQuestPosition(quest, hour);
                    const isFirstHour = new Date(quest.start_time).getHours() === hour;
                    
                    // Only render the quest block in its starting hour to avoid duplicates
                    if (!isFirstHour) return null;
                    
                    const startHour = new Date(quest.start_time).getHours();
                    const endHour = new Date(quest.end_time).getHours();
                    const duration = endHour - startHour || 1;
                    const blockHeight = duration * 40; // 40px per hour
                    
                    return (
                      <div
                        key={quest.id}
                        className={`gcal-quest-block ${getCategoryClass(quest.category)} ${
                          quest.completed ? 'gcal-quest-completed' : ''
                        }`}
                        style={{
                          top: `${position.top}px`,
                          height: `${blockHeight - 2}px`,
                          zIndex: 10
                        }}
                        onClick={() => onQuestClick(quest.id)}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            {getQuestIcon(quest.icon)}
                            <span className="font-medium truncate">{quest.title}</span>
                          </div>
                          <div className="text-xs opacity-80 flex items-center space-x-1">
                            <span>{new Date(quest.start_time).toLocaleTimeString('en-US', { 
                              hour: 'numeric', 
                              minute: '2-digit', 
                              hour12: true 
                            })}</span>
                            <span>•</span>
                            <span>{quest.category}</span>
                            <span>•</span>
                            <span>+{quest.xp} XP</span>
                          </div>
                        </div>
                        {quest.completed && (
                          <div className="flex-shrink-0 ml-2">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {/* Drag preview */}
                  {isInDragRange(hour) && questsInHour.length === 0 && (
                    <div className="absolute left-1 right-1 top-1 bottom-1 rounded-md border-2 border-dashed border-quest-main/50 bg-quest-main/10 flex items-center justify-center z-5">
                      <Plus className="w-4 h-4 text-quest-main/50" />
                      <span className="text-xs text-quest-main/50 font-medium ml-1">New Quest</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quest Edit Modal */}
      <QuestEditModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditingQuest(null);
        }}
        quest={editingQuest}
        onUpdateQuest={onUpdateQuest}
        onDeleteQuest={onDeleteQuest}
        onToggleCompletion={onQuestClick}
      />
    </div>
  );
};

export default CalendarView;