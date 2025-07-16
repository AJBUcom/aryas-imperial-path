import { Crown, Sword, Scroll, Flame, Sun, Timer, CheckCircle } from "lucide-react";

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'main' | 'side' | 'ritual';
  duration: number; // in minutes
  timeSlot: string;
  completed: boolean;
  startTime?: string;
  endTime?: string;
}

interface QuestCardProps {
  quest: Quest;
  onComplete: (questId: string) => void;
  onStart: (questId: string) => void;
}

export const QuestCard = ({ quest, onComplete, onStart }: QuestCardProps) => {
  const getQuestIcon = () => {
    switch (quest.type) {
      case 'main': return <Sword className="w-6 h-6" />;
      case 'side': return <Scroll className="w-6 h-6" />;
      case 'ritual': return <Flame className="w-6 h-6" />;
      default: return <Scroll className="w-6 h-6" />;
    }
  };

  const getQuestStyles = () => {
    switch (quest.type) {
      case 'main':
        return 'bg-gradient-to-r from-gold/30 via-gold/20 to-gold/10 border-gold/60 text-gold';
      case 'side':
        return 'bg-gradient-to-r from-stone/30 via-stone/20 to-stone/10 border-stone/60 text-stone';
      case 'ritual':
        return 'bg-gradient-to-r from-primary-glow/30 via-primary-glow/20 to-primary-glow/10 border-primary-glow/60 text-primary-glow shadow-[0_0_25px_hsl(var(--primary-glow)/0.3)]';
      default:
        return 'bg-gradient-to-r from-stone/30 via-stone/20 to-stone/10 border-stone/60 text-stone';
    }
  };

  const getQuestTypeLabel = () => {
    switch (quest.type) {
      case 'main': return 'MAIN QUEST';
      case 'side': return 'SIDE QUEST';
      case 'ritual': return 'SACRED RITUAL';
      default: return 'QUEST';
    }
  };

  return (
    <div className={`
      relative p-6 rounded-lg border-2 backdrop-blur-sm
      ${getQuestStyles()}
      ${quest.completed ? 'opacity-75' : 'hover:scale-105'}
      transition-all duration-300 transform
      shadow-[0_0_20px_rgba(0,0,0,0.3)]
    `}>
      {/* Quest Type Badge */}
      <div className="absolute -top-3 left-4 px-3 py-1 bg-card border border-current rounded-full">
        <span className="font-royal text-xs tracking-wider">{getQuestTypeLabel()}</span>
      </div>

      {/* Time Slot */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Timer className="w-4 h-4" />
          <span className="font-imperial text-sm">{quest.timeSlot}</span>
        </div>
        <div className="flex items-center space-x-2">
          {getQuestIcon()}
          <span className="font-imperial text-sm">{quest.duration}m</span>
        </div>
      </div>

      {/* Quest Content */}
      <div className="mb-4">
        <h3 className="font-royal text-lg mb-2 leading-tight">
          {quest.title}
        </h3>
        <p className="font-imperial text-sm text-muted-foreground leading-relaxed">
          {quest.description}
        </p>
      </div>

      {/* Quest Actions */}
      <div className="flex items-center justify-between">
        {quest.completed ? (
          <div className="flex items-center space-x-2 text-gold">
            <CheckCircle className="w-5 h-5" />
            <span className="font-royal text-sm">QUEST COMPLETE</span>
          </div>
        ) : (
          <button
            onClick={() => onStart(quest.id)}
            className="btn-quest text-sm px-4 py-2"
          >
            <span className="flex items-center space-x-2">
              <Crown className="w-4 h-4" />
              <span>Begin Quest</span>
            </span>
          </button>
        )}
        
        {!quest.completed && (
          <button
            onClick={() => onComplete(quest.id)}
            className="font-imperial text-xs text-muted-foreground hover:text-current transition-colors"
          >
            Mark Complete
          </button>
        )}
      </div>

      {/* Completed Overlay */}
      {quest.completed && (
        <div className="absolute inset-0 bg-gold/10 rounded-lg border-2 border-gold/30 flex items-center justify-center">
          <div className="bg-card/90 px-4 py-2 rounded-full border border-gold/50">
            <span className="font-royal text-gold text-sm">⚡ CONQUERED ⚡</span>
          </div>
        </div>
      )}
    </div>
  );
};