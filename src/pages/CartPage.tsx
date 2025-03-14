
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import GlitchHeading from "@/components/ui/GlitchHeading";
import CategoryCard from "@/components/ui/CategoryCard";
import NeonButton from "@/components/ui/NeonButton";
import { ChevronRight, ShoppingBag, ShoppingCart } from "lucide-react";

export default function CartPage() {
  const { items, getCommodificationScore } = useCart();
  
  const score = useMemo(() => {
    return getCommodificationScore();
  }, [getCommodificationScore]);
  
  const riskLevel = useMemo(() => {
    if (score >= 75) return { level: "EXTREME", color: "text-cyber-red" };
    if (score >= 50) return { level: "HIGH", color: "text-cyber-pink" };
    if (score >= 25) return { level: "MODERATE", color: "text-cyber-yellow" };
    return { level: "LOW", color: "text-cyber-green" };
  }, [score]);
  
  return (
    <div className="animate-fade-in">
      <div className="mb-8 text-center">
        <GlitchHeading level={2} className="text-3xl md:text-4xl mb-2">
          YOUR DATA CART
        </GlitchHeading>
        <p className="text-white/70 max-w-2xl mx-auto">
          Review what's in your digital footprint and see your total data commodification score.
        </p>
      </div>
      
      {items.length === 0 ? (
        <div className="text-center py-16">
          <div className="flex justify-center mb-6">
            <ShoppingCart size={64} className="text-white/30" />
          </div>
          <h3 className="text-xl font-cyber mb-4">Your cart is empty</h3>
          <p className="text-white/60 mb-6">Add data categories to see how much of your digital identity is being commodified.</p>
          <Link to="/marketplace">
            <NeonButton variant="primary">
              Browse Marketplace
            </NeonButton>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Cart items */}
          <div className="lg:col-span-2">
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-cyber">SELECTED DATA ({items.length})</h3>
                <Link to="/marketplace">
                  <NeonButton variant="outline" size="sm" className="flex items-center gap-1">
                    <ShoppingBag size={16} />
                    Add More
                  </NeonButton>
                </Link>
              </div>
              
              <div className="space-y-3">
                {items.map(item => (
                  <CategoryCard key={item.id} category={item} isCompact />
                ))}
              </div>
            </div>
          </div>
          
          {/* Right column - Score summary */}
          <div className="glass-panel p-6">
            <h3 className="text-xl font-cyber mb-6">DATA COMMODIFICATION SCORE</h3>
            
            <div className="mb-8">
              <div className="text-center mb-4">
                <div className="text-6xl font-cyber neon-glow mb-2">{score.toFixed(1)}%</div>
                <div className={`text-sm font-cyber ${riskLevel.color}`}>
                  {riskLevel.level} RISK
                </div>
              </div>
              
              <div className="h-4 bg-cyber-gray/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyber-green via-cyber-yellow to-cyber-red"
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <p className="text-white/70 text-sm">
                This score represents how much of your digital identity is being commodified 
                based on your selected permissions.
              </p>
              
              <Link to="/summary">
                <NeonButton variant="primary" className="w-full flex items-center justify-center gap-1">
                  View Detailed Summary
                  <ChevronRight size={16} />
                </NeonButton>
              </Link>
              
              <Link to="/protection">
                <NeonButton variant="outline" className="w-full">
                  Privacy Protection Tips
                </NeonButton>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
