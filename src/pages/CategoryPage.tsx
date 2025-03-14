
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categoryData, Permission, useCart } from "@/contexts/CartContext";
import GlitchHeading from "@/components/ui/GlitchHeading";
import NeonButton from "@/components/ui/NeonButton";
import PermissionSelector from "@/components/PermissionSelector";
import { ArrowLeft, ShoppingCart, Check, ArrowRight } from "lucide-react";

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    addToCart, 
    removeFromCart, 
    isInCart, 
    getCartItem,
    updatePermissions,
    getItemScore 
  } = useCart();
  
  const category = categoryData.find(cat => cat.id === id);
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([]);
  const [score, setScore] = useState(0);
  const isAdded = isInCart(id || '');
  
  useEffect(() => {
    if (!category) {
      navigate('/marketplace');
      return;
    }
    
    // Initialize permissions
    const cartItem = getCartItem(category.id);
    if (cartItem) {
      setSelectedPermissions(cartItem.selectedPermissions);
    } else {
      // Select all permissions by default
      setSelectedPermissions(Object.keys(category.permissionWeights) as Permission[]);
    }
  }, [category, getCartItem, navigate]);
  
  useEffect(() => {
    if (category && isAdded) {
      setScore(getItemScore(category.id));
    } else if (category) {
      // Calculate potential score
      const permissionTotal = selectedPermissions.reduce((total, permission) => {
        return total + category.permissionWeights[permission];
      }, 0);
      
      setScore(Math.min(permissionTotal, category.baseWeight));
    }
  }, [category, selectedPermissions, getItemScore, isAdded]);
  
  const handlePermissionsChange = (permissions: Permission[]) => {
    setSelectedPermissions(permissions);
    
    if (category && isAdded) {
      updatePermissions(category.id, permissions);
    }
  };
  
  const handleToggleCart = () => {
    if (!category) return;
    
    if (isAdded) {
      removeFromCart(category.id);
    } else {
      addToCart(category);
      updatePermissions(category.id, selectedPermissions);
    }
  };
  
  const handleDone = () => {
    if (!category) return;
    
    // If not already in cart, add it
    if (!isAdded) {
      addToCart(category);
      updatePermissions(category.id, selectedPermissions);
    } else {
      // If already in cart, just update permissions
      updatePermissions(category.id, selectedPermissions);
    }
    
    // Navigate back to marketplace
    navigate('/marketplace');
  };
  
  if (!category) return null;
  
  return (
    <div className="animate-fade-in">
      <button 
        onClick={() => navigate('/marketplace')}
        className="flex items-center gap-1 text-white/70 hover:text-white mb-6"
      >
        <ArrowLeft size={16} />
        <span>Back to Marketplace</span>
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Image and details */}
        <div className="lg:col-span-2">
          <div 
            className="h-64 bg-cover bg-center rounded-md relative overflow-hidden"
            style={{ backgroundImage: `url(${category.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-black/70 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-6">
              <GlitchHeading level={1} className="text-3xl md:text-4xl">
                {category.name}
              </GlitchHeading>
              
              <div className="flex items-center gap-2 mt-2">
                <div className="px-3 py-1 bg-cyber-gray/50 rounded-full text-sm">
                  Base Value: <span className="text-cyber-neon">{category.baseWeight}%</span>
                </div>
                <div className="px-3 py-1 bg-cyber-gray/50 rounded-full text-sm">
                  Current Value: <span className="text-cyber-neon">{score.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 glass-panel p-6">
            <h2 className="text-xl font-cyber mb-4">DATA PROFILE</h2>
            <p className="text-white/80 mb-4">{category.description}</p>
            
            <div className="mt-8">
              <h3 className="text-lg font-cyber text-cyber-neon mb-4">HOW THIS DATA IS USED</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-cyber-neon">•</span>
                  <span>Creates detailed behavior patterns for targeted advertising</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyber-neon">•</span>
                  <span>Builds predictive models of your future decisions and preferences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyber-neon">•</span>
                  <span>Sold to data brokers and third-party marketing companies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyber-neon">•</span>
                  <span>Used to train AI models that further optimize extraction of your attention</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Right column - Permission toggles */}
        <div className="glass-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-cyber">PERMISSIONS</h2>
            <NeonButton 
              variant={isAdded ? "primary" : "outline"}
              isActive={isAdded}
              onClick={handleToggleCart}
              className="flex items-center gap-1"
            >
              {isAdded ? <><Check size={16} /> Added</> : <><ShoppingCart size={16} /> Add to Cart</>}
            </NeonButton>
          </div>
          
          <PermissionSelector 
            category={category}
            selectedPermissions={selectedPermissions}
            onChange={handlePermissionsChange}
          />
          
          <div className="mt-6 flex justify-center">
            <NeonButton 
              variant="primary" 
              onClick={handleDone}
              className="w-full flex items-center justify-center gap-2"
            >
              Done <ArrowRight size={16} />
            </NeonButton>
          </div>
        </div>
      </div>
    </div>
  );
}
