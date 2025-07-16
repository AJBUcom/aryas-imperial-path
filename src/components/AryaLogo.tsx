import { cn } from "@/lib/utils";

interface AryaLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
}

const AryaLogo = ({ size = "md", className, animate = false }: AryaLogoProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  return (
    <div className={cn(
      sizeClasses[size],
      "relative rounded-full border-2 border-gold bg-gradient-to-br from-gold/20 to-gold/40 p-1 shadow-lg shadow-gold/20",
      animate && "animate-glow hover:scale-110 transition-all duration-300 hover:shadow-xl hover:shadow-gold/40",
      className
    )}>
      <img
        src="/lovable-uploads/684d2252-c5fb-41f3-8cd0-ff93ffd7c2cb.png"
        alt="Arya's Imperial Sun"
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  );
};

export default AryaLogo;