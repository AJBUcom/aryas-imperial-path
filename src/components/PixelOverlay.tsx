import { Sword, Scroll, Flame, Sun, Gift } from "lucide-react";
import { useEffect, useState } from "react";

interface PixelOverlayProps {
  questsCompleted: number;
  isProductiveDay: boolean;
}

const PixelOverlay = ({ questsCompleted, isProductiveDay }: PixelOverlayProps) => {
  const [showRewards, setShowRewards] = useState(false);

  useEffect(() => {
    if (questsCompleted > 0) {
      setShowRewards(true);
      const timer = setTimeout(() => setShowRewards(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [questsCompleted]);

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {/* Floating Pixel Icons */}
      <div className="absolute top-20 left-10">
        <div className="pixel-icon flex items-center justify-center" style={{ animationDelay: '0s' }}>
          <Sword className="w-3 h-3 text-gold-dark" />
        </div>
      </div>
      
      <div className="absolute top-32 right-16">
        <div className="pixel-icon flex items-center justify-center" style={{ animationDelay: '2s' }}>
          <Scroll className="w-3 h-3 text-gold-dark" />
        </div>
      </div>
      
      <div className="absolute top-48 left-1/4">
        <div className="pixel-icon flex items-center justify-center" style={{ animationDelay: '4s' }}>
          <Flame className="w-3 h-3 text-gold-dark" />
        </div>
      </div>

      {/* Animated Rewards */}
      {showRewards && (
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center space-x-4 animate-scale-in">
            <Sun className="w-8 h-8 text-gold animate-glow" />
            <span className="font-royal text-gold text-xl">+{questsCompleted * 100} XP</span>
          </div>
        </div>
      )}

      {/* Treasure Chest for Productive Days */}
      {isProductiveDay && (
        <div className="absolute bottom-20 right-10">
          <div className="treasure-chest flex items-center justify-center">
            <Gift className="w-6 h-6 text-amber-800" />
          </div>
        </div>
      )}

      {/* Floating Embers */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-gold rounded-full opacity-40 animate-ember"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${8 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );
};

export default PixelOverlay;