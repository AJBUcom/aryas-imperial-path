import { Sun } from "lucide-react";

interface ProgressSunProps {
  completed: number;
  total: number;
}

export const ProgressSun = ({ completed, total }: ProgressSunProps) => {
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  
  return (
    <div className="relative">
      {/* Background Sun */}
      <div className="relative w-20 h-20 mx-auto">
        <Sun className="w-20 h-20 text-stone-dark" />
        
        {/* Progress Fill */}
        <div 
          className="absolute inset-0 overflow-hidden rounded-full"
          style={{
            clipPath: `inset(${100 - percentage}% 0 0 0)`
          }}
        >
          <Sun className="w-20 h-20 text-gold animate-glow" />
        </div>

        {/* Glowing Effect */}
        {percentage > 0 && (
          <div className="absolute inset-0 w-20 h-20">
            <Sun className="w-20 h-20 text-gold/30 animate-pulse" />
          </div>
        )}

        {/* Progress Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-royal text-xs text-gold-dark bg-background/80 px-2 py-1 rounded-full">
            {completed}/{total}
          </span>
        </div>
      </div>

      {/* Progress Label */}
      <div className="text-center mt-2">
        <span className="font-imperial text-sm text-muted-foreground">
          Royal Progress
        </span>
        <div className="font-royal text-lg text-gold">
          {Math.round(percentage)}%
        </div>
      </div>
    </div>
  );
};