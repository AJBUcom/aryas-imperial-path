import { useState } from "react";
import { Sword, Scroll, Flame } from "lucide-react";

interface Quest {
  id: string;
  title: string;
  type: 'main' | 'side' | 'ritual';
  startTime: string;
  duration: number; // in hours
  completed: boolean;
}

interface CalendarViewProps {
  quests: Quest[];
  onQuestClick: (questId: string) => void;
}

const CalendarView = ({ quests, onQuestClick }: CalendarViewProps) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const formatTime = (hour: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${period}`;
  };

  const getQuestIcon = (type: Quest['type']) => {
    switch (type) {
      case 'main': return <Sword className="w-3 h-3" />;
      case 'side': return <Scroll className="w-3 h-3" />;
      case 'ritual': return <Flame className="w-3 h-3" />;
    }
  };

  const getQuestForHour = (hour: number) => {
    return quests.find(quest => {
      const questHour = parseInt(quest.startTime.split(':')[0]);
      return questHour <= hour && hour < questHour + quest.duration;
    });
  };

  const getQuestPosition = (quest: Quest, hour: number) => {
    const questHour = parseInt(quest.startTime.split(':')[0]);
    const questMinutes = parseInt(quest.startTime.split(':')[1]);
    
    if (hour === questHour) {
      const heightPercentage = (quest.duration * 100);
      const topOffset = (questMinutes / 60) * 100;
      
      return {
        top: `${topOffset}%`,
        height: `${Math.min(heightPercentage, (100 - topOffset))}%`
      };
    }
    return null;
  };

  return (
    <div className="calendar-grid flex-1">
      {/* Header */}
      <div className="calendar-header">
        <div className="flex">
          <div className="calendar-time-column text-center">Time</div>
          <div className="flex-1 text-center">Today's Quests</div>
        </div>
      </div>

      {/* Calendar Body */}
      <div className="flex">
        {/* Time Column */}
        <div className="calendar-time-column">
          {hours.map((hour) => (
            <div key={hour} className="calendar-time-slot">
              {formatTime(hour)}
            </div>
          ))}
        </div>

        {/* Events Column */}
        <div className="calendar-event-area">
          {hours.map((hour) => {
            const quest = getQuestForHour(hour);
            const isQuestStart = quest && parseInt(quest.startTime.split(':')[0]) === hour;
            
            return (
              <div key={hour} className="calendar-hour-row">
                {isQuestStart && (
                  <div 
                    className={`quest-block quest-${quest.type} ${quest.completed ? 'opacity-60' : ''}`}
                    style={getQuestPosition(quest, hour) || {}}
                    onClick={() => onQuestClick(quest.id)}
                  >
                    <div className="flex items-center space-x-2">
                      {getQuestIcon(quest.type)}
                      <span className="flex-1 truncate">{quest.title}</span>
                      {quest.completed && (
                        <span className="text-xs opacity-75">✓</span>
                      )}
                    </div>
                    <div className="text-xs opacity-75 mt-1">
                      {quest.startTime} - {quest.duration}h
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;