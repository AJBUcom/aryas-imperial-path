import { Crown } from "lucide-react";

interface ThroneProgressMeterProps {
  progress: number;
  label?: string;
}

const ThroneProgressMeter = ({ progress, label = "Kingdom Progress" }: ThroneProgressMeterProps) => {
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-sm font-imperial">
        <span className="text-gold">{label}</span>
        <span className="text-gold-light">{Math.round(progress)}%</span>
      </div>
      
      <div className="throne-meter relative">
        <div 
          className="throne-progress"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
        
        {/* Throne icon at the end */}
        <div 
          className="throne-icon"
          style={{ 
            filter: progress >= 100 ? 'drop-shadow(0 0 8px hsl(var(--gold)))' : 'none',
            transform: `translateY(-50%) scale(${progress >= 100 ? 1.2 : 1})`
          }}
        >
          <Crown className="w-4 h-4" />
        </div>
        
        {/* Progress markers */}
        {[25, 50, 75].map((marker) => (
          <div
            key={marker}
            className="absolute top-0 bottom-0 w-px bg-gold/20"
            style={{ left: `${marker}%` }}
          />
        ))}
      </div>
    </div>
  );
};

export default ThroneProgressMeter;