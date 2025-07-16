import { Scroll } from "lucide-react";

interface DNARuneProps {
  quote?: string;
  author?: string;
}

const DNARune = ({ 
  quote = "The cave you fear to enter holds the treasure you seek.",
  author = "David Goggins"
}: DNARuneProps) => {
  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
      <div className="pixel-scroll max-w-md">
        <div className="flex items-start space-x-3">
          <Scroll className="w-5 h-5 text-amber-800 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-royal text-sm text-amber-900 mb-2">DNA Rune of the Day</h3>
            <blockquote className="font-imperial text-xs text-amber-800 italic leading-relaxed">
              "{quote}"
            </blockquote>
            <cite className="block mt-2 text-xs font-medium text-amber-700">
              — {author}
            </cite>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DNARune };
export default DNARune;