import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, Sun, Swords, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import throneHallBg from "@/assets/throne-hall-background.jpg";

const Index = () => {
  const [isEntering, setIsEntering] = useState(false);
  const navigate = useNavigate();

  const handleEnterKingdom = () => {
    setIsEntering(true);
    setTimeout(() => {
      navigate('/auth');
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${throneHallBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-gold/20" />
      </div>

      {/* Floating Embers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold rounded-full animate-ember opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-6 lg:p-8">
          <div className="flex items-center space-x-3">
            <Crown className="w-8 h-8 text-gold" />
            <span className="font-royal text-2xl text-gold text-shadow-gold">AJBU</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Swords className="w-5 h-5" />
              <span className="font-imperial">Conquer</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Shield className="w-5 h-5" />
              <span className="font-imperial">Defend</span>
            </div>
            <div className="flex items-center space-x-2 text-gold">
              <Sun className="w-5 h-5" />
              <span className="font-imperial">Ascend</span>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Royal Ornament */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <Sun className="w-16 h-16 text-gold animate-glow" />
                <div className="absolute inset-0 w-16 h-16 text-gold animate-float">
                  <Crown className="w-6 h-6 absolute top-1 left-1/2 transform -translate-x-1/2" />
                </div>
              </div>
            </div>

            {/* Hero Title */}
            <h1 className="font-royal text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              <span className="block text-foreground mb-2">Beating your</span>
              <span className="block text-gold text-shadow-divine animate-glow">demons</span>
              <span className="block text-foreground">to find more of</span>
              <span className="block text-primary-glow text-shadow-gold">yourself</span>
            </h1>

            {/* Subtitle */}
            <p className="font-imperial text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Transform your daily battles into a legendary quest. 
              Rise from peasant to king through disciplined action and unwavering will.
            </p>

            {/* CTA Button */}
            <div className="mb-16">
              <Button
                onClick={handleEnterKingdom}
                disabled={isEntering}
                className={`btn-kingdom text-xl md:text-2xl px-12 py-6 ${
                  isEntering ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isEntering ? (
                  <span className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-2 border-secondary-foreground border-t-transparent rounded-full animate-spin" />
                    <span>Entering Kingdom...</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-3">
                    <Crown className="w-6 h-6" />
                    <span>Enter Your Kingdom</span>
                    <Crown className="w-6 h-6" />
                  </span>
                )}
              </Button>
            </div>

            {/* Royal Quote */}
            <div className="panel-throne rounded-xl p-6 md:p-8 max-w-2xl mx-auto">
              <blockquote className="font-imperial text-lg md:text-xl text-gold italic leading-relaxed">
                "There is nothing impossible to him who will try."
              </blockquote>
              <cite className="block mt-4 font-royal text-sm text-primary-glow">
                — Alexander the Great
              </cite>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 lg:p-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent flex-1" />
              <Sun className="w-6 h-6 text-gold" />
              <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent flex-1" />
            </div>
            <p className="font-imperial text-sm text-muted-foreground">
              Forge your destiny • Conquer your demons • Rule your realm
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
