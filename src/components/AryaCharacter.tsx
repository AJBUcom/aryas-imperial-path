import { User } from "lucide-react";

interface AryaCharacterProps {
  progress: number; // 0-100 percentage of quest completion
  totalQuests: number;
  completedQuests: number;
}

export const AryaCharacter = ({ progress, totalQuests, completedQuests }: AryaCharacterProps) => {
  const pathPosition = Math.min(progress, 95); // Cap at 95% to not reach the throne
  
  return (
    <div className="relative w-full h-24 mb-8">
      {/* The Royal Path */}
      <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-stone-dark via-gold/30 to-gold transform -translate-y-1/2">
        <div className="h-full bg-gradient-to-r from-stone via-gold/50 to-gold rounded-full" />
      </div>

      {/* Path Milestones */}
      {Array.from({ length: totalQuests }, (_, index) => {
        const milestonePosition = ((index + 1) / totalQuests) * 100;
        const isPassed = index < completedQuests;
        
        return (
          <div
            key={index}
            className={`absolute top-1/2 w-3 h-3 transform -translate-y-1/2 -translate-x-1/2 rounded-full transition-all duration-500 ${
              isPassed 
                ? 'bg-gold shadow-[0_0_10px_hsl(var(--gold)/0.8)]' 
                : 'bg-stone-dark border border-stone'
            }`}
            style={{ left: `${milestonePosition}%` }}
          />
        );
      })}

      {/* Arya Character */}
      <div 
        className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-all duration-1000 ease-out"
        style={{ left: `${pathPosition}%` }}
      >
        <div className="relative">
          {/* Character Shadow */}
          <div className="absolute top-8 left-1/2 w-6 h-2 bg-black/30 rounded-full transform -translate-x-1/2 blur-sm" />
          
          {/* Character Body */}
          <div className="relative">
            <User className="w-8 h-8 text-gold bg-primary rounded-full p-1 border-2 border-gold/50 shadow-lg" />
            
            {/* Walking Animation */}
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-gold rounded-full animate-bounce" 
                 style={{ animationDelay: '0.5s' }} />
          </div>

          {/* Progress Aura */}
          {progress > 0 && (
            <div className="absolute inset-0 w-8 h-8 bg-gold/20 rounded-full animate-pulse" />
          )}
        </div>
      </div>

      {/* Distant Throne */}
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
        <div className="w-12 h-8 bg-gradient-to-t from-gold via-gold-light to-gold/50 clip-path-throne relative">
          <div className="absolute inset-0 bg-gold/30 rounded animate-glow" />
          <div className="absolute top-1 left-1/2 w-2 h-2 bg-gold rounded-full transform -translate-x-1/2 animate-float" />
        </div>
      </div>

      {/* Path Labels */}
      <div className="absolute -bottom-6 left-0 font-imperial text-xs text-muted-foreground">
        Peasant
      </div>
      <div className="absolute -bottom-6 right-0 font-imperial text-xs text-gold">
        The Throne
      </div>
    </div>
  );
};