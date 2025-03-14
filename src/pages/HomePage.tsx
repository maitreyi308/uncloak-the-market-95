
import { Link } from "react-router-dom";
import GlitchHeading from "@/components/ui/GlitchHeading";
import NeonButton from "@/components/ui/NeonButton";
import { ShoppingCart, AlertTriangle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background effect */}
      <div 
        className="absolute inset-0 bg-[url('/dystopian-bg.webp')] bg-cover bg-center opacity-20 z-0"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5')" 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-black/90 to-cyber-black/80 z-0" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4 animate-fade-in">
        <div className="mb-8 flex justify-center">
          <div className="cyberpunk-border p-1 rounded-full">
            <AlertTriangle size={64} className="text-cyber-neon animate-pulse" />
          </div>
        </div>
        
        <GlitchHeading className="text-5xl md:text-7xl mb-6">
          UNCLOAK
        </GlitchHeading>
        
        <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
          Explore the true cost of your digital presence. Every click, search, and upload is a 
          product to be sold. Discover what tech giants know about you and what they're doing with it.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/marketplace">
            <NeonButton variant="primary" size="lg" className="flex items-center gap-2">
              <ShoppingCart size={18} />
              Start Shopping
            </NeonButton>
          </Link>
          
          <Link to="/impact">
            <NeonButton variant="outline" size="lg">
              Learn About Data Use
            </NeonButton>
          </Link>
        </div>
        
        <div className="mt-16">
          <p className="text-xs text-white/40 mb-1">WARNING</p>
          <p className="text-sm text-white/60 max-w-lg mx-auto">
            This simulation reflects the real-world commodification of your personal data. 
            The percentages are based on industry research into data collection practices.
          </p>
        </div>
      </div>
    </div>
  );
}
