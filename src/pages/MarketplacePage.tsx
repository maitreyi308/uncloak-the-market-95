
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { categoryData, useCart } from "@/contexts/CartContext";
import CategoryCard from "@/components/ui/CategoryCard";
import GlitchHeading from "@/components/ui/GlitchHeading";
import NeonButton from "@/components/ui/NeonButton";
import { ShoppingCart } from "lucide-react";

export default function MarketplacePage() {
  const { items } = useCart();
  
  const sortedCategories = useMemo(() => {
    return [...categoryData].sort((a, b) => b.baseWeight - a.baseWeight);
  }, []);
  
  const hasItemsInCart = items.length > 0;
  
  return (
    <div className="animate-fade-in">
      <div className="mb-8 text-center">
        <GlitchHeading level={2} className="text-3xl md:text-4xl mb-2">
          DATA MARKETPLACE
        </GlitchHeading>
        <p className="text-white/70 max-w-2xl mx-auto">
          Browse and select categories of your digital footprint. Each selection 
          reveals how much of your identity is being packaged and sold.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
        {sortedCategories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      
      {hasItemsInCart && (
        <div className="mt-8 flex justify-center">
          <Link to="/summary">
            <NeonButton 
              variant="primary" 
              size="lg"
              className="flex items-center gap-2"
            >
              <ShoppingCart size={20} /> 
              Checkout
            </NeonButton>
          </Link>
        </div>
      )}
    </div>
  );
}
