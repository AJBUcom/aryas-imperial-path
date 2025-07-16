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
    <img
      src="/lovable-uploads/684d2252-c5fb-41f3-8cd0-ff93ffd7c2cb.png"
      alt="Arya's Imperial Sun"
      className={cn(
        sizeClasses[size],
        "drop-shadow-lg",
        animate && "animate-glow hover:scale-110 transition-transform duration-300",
        className
      )}
    />
  );
};

export default AryaLogo;