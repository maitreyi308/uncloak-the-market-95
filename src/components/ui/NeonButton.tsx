
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isActive?: boolean;
}

const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant = "primary", size = "md", isActive = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "font-cyber inline-flex items-center justify-center whitespace-nowrap rounded-md transition-all relative overflow-hidden",
          "before:absolute before:inset-0 before:z-0 before:opacity-0 before:transition-opacity hover:before:opacity-100",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            // Size variants
            "text-xs px-3 py-1.5": size === "sm",
            "text-sm px-4 py-2": size === "md", 
            "text-base px-6 py-3": size === "lg",
            
            // Primary variant
            "bg-cyber-gray/50 text-cyber-neon animate-pulse-neon": variant === "primary" && !isActive,
            "before:bg-cyber-neon/10": variant === "primary",
            "bg-cyber-neon/20 text-cyber-neon neon-border": variant === "primary" && isActive,
            
            // Secondary variant
            "bg-cyber-gray/50 text-cyber-pink": variant === "secondary" && !isActive,
            "before:bg-cyber-pink/10": variant === "secondary",
            "bg-cyber-pink/20 text-cyber-pink neon-pink-border": variant === "secondary" && isActive,
            
            // Outline variant
            "bg-transparent border border-cyber-gray/50 text-white hover:bg-cyber-gray/20": variant === "outline",
            "before:bg-white/5": variant === "outline",
            
            // Ghost variant
            "bg-transparent text-white/70 hover:text-white hover:bg-cyber-gray/20": variant === "ghost",
            "before:bg-white/5": variant === "ghost"
          },
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

NeonButton.displayName = "NeonButton";

export default NeonButton;
