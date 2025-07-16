import { Scroll, Quote } from "lucide-react";

const gogginsQuotes = [
  "You are in danger of living a life so comfortable and soft, that you will die without ever realizing your true potential.",
  "The cave you fear to enter holds the treasure you seek.",
  "When you think you're done, you're only at 40% of your actual capacity.",
  "Suffering is the true test of life.",
  "You have to build calluses on your brain just like how you build calluses on your hands.",
  "Don't stop when you're tired. Stop when you're done.",
  "The most important conversations you'll ever have are the ones you'll have with yourself.",
  "Pain unlocks a secret doorway in the mind, one that leads to both peak performance and beautiful silence."
];

export const DNARune = () => {
  // Get quote based on current day to ensure consistency throughout the day
  const today = new Date().toDateString();
  const quoteIndex = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % gogginsQuotes.length;
  const quote = gogginsQuotes[quoteIndex];

  return (
    <div className="relative mb-8">
      {/* Scroll Background */}
      <div className="panel-throne rounded-xl p-6 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-2 left-2">
          <Scroll className="w-6 h-6 text-gold/30" />
        </div>
        <div className="absolute top-2 right-2">
          <Scroll className="w-6 h-6 text-gold/30 transform scale-x-[-1]" />
        </div>

        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent flex-1" />
            <Quote className="w-5 h-5 text-gold" />
            <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent flex-1" />
          </div>
          <h2 className="font-royal text-xl text-gold text-shadow-gold">
            DNA RUNE OF THE DAY
          </h2>
        </div>

        {/* Quote Content */}
        <blockquote className="font-imperial text-lg text-center text-foreground leading-relaxed mb-4 italic">
          "{quote}"
        </blockquote>

        {/* Attribution */}
        <div className="text-center">
          <cite className="font-royal text-sm text-primary-glow">
            — David Goggins, The Warrior Philosopher
          </cite>
        </div>

        {/* Mystical Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-glow/5 via-transparent to-gold/5 rounded-xl pointer-events-none" />
      </div>

      {/* Floating Runes */}
      <div className="absolute -top-2 -left-2 w-4 h-4 bg-gold rounded-full animate-float opacity-60" />
      <div className="absolute -top-1 -right-3 w-3 h-3 bg-primary-glow rounded-full animate-float opacity-40" style={{ animationDelay: '2s' }} />
      <div className="absolute -bottom-2 left-1/4 w-2 h-2 bg-gold rounded-full animate-float opacity-50" style={{ animationDelay: '4s' }} />
    </div>
  );
};