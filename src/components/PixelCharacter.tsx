import { useEffect, useState } from "react";
import { Crown } from "lucide-react";

interface PixelCharacterProps {
  questsCompleted: number;
  totalQuests: number;
}

const PixelCharacter = ({ questsCompleted, totalQuests }: PixelCharacterProps) => {
  const [position, setPosition] = useState(0);
  
  useEffect(() => {
    const progress = totalQuests > 0 ? (questsCompleted / totalQuests) * 100 : 0;
    setPosition(progress);
  }, [questsCompleted, totalQuests]);

  return (
    <div className="relative w-full h-8 mb-4">
      {/* Walking path */}
      <div className="absolute top-3 left-0 right-0 h-0.5 bg-gradient-to-r from-stone-dark to-gold/30" />
      
      {/* Arya Character */}
      <div 
        className="absolute top-0 transition-all duration-1000 ease-out z-10"
        style={{ left: `${Math.min(position, 95)}%` }}
      >
        <div className="pixel-character flex items-center justify-center">
          <Crown className="w-4 h-4 text-gold-dark" />
        </div>
        
        {/* Character shadow */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-black/20 rounded-full blur-sm" />
      </div>
      
      {/* Milestone markers */}
      {[25, 50, 75, 100].map((milestone) => (
        <div
          key={milestone}
          className={`absolute top-2 w-2 h-2 rounded-full transition-all duration-500 ${
            position >= milestone 
              ? 'bg-gold shadow-[0_0_8px_hsl(var(--gold)/0.6)]' 
              : 'bg-stone border border-stone-dark'
          }`}
          style={{ left: `${milestone}%`, transform: 'translateX(-50%)' }}
        />
      ))}
    </div>
  );
};

export default PixelCharacter;