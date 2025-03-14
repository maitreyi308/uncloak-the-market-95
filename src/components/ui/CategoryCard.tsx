
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Category, useCart } from "@/contexts/CartContext";
import NeonButton from "./NeonButton";
import { ShoppingCart, Check } from "lucide-react";

interface CategoryCardProps {
  category: Category;
  isCompact?: boolean;
}

export default function CategoryCard({ category, isCompact = false }: CategoryCardProps) {
  const { addToCart, removeFromCart, isInCart, getItemScore } = useCart();
  const [animateValue, setAnimateValue] = useState(false);
  const [score, setScore] = useState(0);
  const isAdded = isInCart(category.id);
  
  useEffect(() => {
    const newScore = isAdded ? getItemScore(category.id) : 0;
    if (score !== newScore) {
      setScore(newScore);
      setAnimateValue(true);
      const timer = setTimeout(() => setAnimateValue(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isAdded, category.id, getItemScore, score]);
  
  const handleToggleCart = () => {
    if (isAdded) {
      removeFromCart(category.id);
    } else {
      addToCart(category);
    }
  };
  
  return (
    <div className={`cyberpunk-panel group ${isCompact ? 'p-3' : 'p-4'} transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]`}>
      {!isCompact && (
        <div 
          className="h-40 bg-cover bg-center mb-4 rounded-sm relative overflow-hidden"
          style={{ backgroundImage: `url(${category.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-black/70 to-transparent opacity-70" />
          <div className="absolute inset-0 flex items-end p-3">
            <h3 className="text-lg font-cyber neon-glow">{category.name}</h3>
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        {isCompact ? (
          <h3 className="text-sm font-cyber">{category.name}</h3>
        ) : (
          <p className="text-xs text-white/70 mb-2">{category.description}</p>
        )}
        
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end">
            <span className="text-xs text-cyber-neon">VALUE</span>
            <span 
              className={`text-lg font-cyber neon-glow ${animateValue ? 'scale-125 transition-transform' : ''}`}
            >
              {isAdded ? score.toFixed(1) : category.baseWeight.toFixed(1)}%
            </span>
          </div>
          
          <div className="flex gap-1">
            {!isCompact && (
              <Link to={`/category/${category.id}`}>
                <NeonButton variant="outline" size="sm" className="px-2">
                  Details
                </NeonButton>
              </Link>
            )}
            
            <NeonButton 
              variant={isAdded ? "primary" : "outline"} 
              size="sm"
              className="px-2" 
              isActive={isAdded} 
              onClick={handleToggleCart}
            >
              {isAdded ? <Check size={16} /> : <ShoppingCart size={16} />}
            </NeonButton>
          </div>
        </div>
      </div>
    </div>
  );
}
