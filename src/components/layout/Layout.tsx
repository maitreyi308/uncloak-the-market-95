
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Info, Shield, Home } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { getCommodificationScore, items } = useCart();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col min-h-screen bg-cyber-black text-white relative">
      {/* Glitch overlay effect */}
      <div className="scanline opacity-10" />
      
      {/* Header */}
      <header className="glass-panel z-10 sticky top-0 border-b border-cyber-gray/50">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Link 
            to="/" 
            className="font-cyber text-2xl font-bold tracking-wider neon-glow"
          >
            UNC<span className="glitch-text" data-text="L">L</span>OAK
          </Link>
          
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <div className="mr-6 hidden md:block">
                <div className="text-xs text-cyber-neon mb-1">DATA COMMODIFICATION</div>
                <div className="flex items-center gap-2">
                  <div className="w-40 h-2 bg-cyber-gray/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyber-neon to-cyber-pink rounded-full"
                      style={{ width: `${getCommodificationScore()}%` }}
                    />
                  </div>
                  <span className="text-cyber-neon font-cyber">{getCommodificationScore().toFixed(1)}%</span>
                </div>
              </div>
            )}
            
            <nav className="flex items-center space-x-1">
              <Link
                to="/"
                className={`p-2 rounded-md hover:bg-cyber-gray/30 transition-colors ${isActive('/') ? 'text-cyber-neon neon-glow' : 'text-white/70'}`}
                title="Home"
              >
                <Home size={20} />
              </Link>
              <Link
                to="/marketplace"
                className={`p-2 rounded-md hover:bg-cyber-gray/30 transition-colors ${isActive('/marketplace') ? 'text-cyber-neon neon-glow' : 'text-white/70'}`}
                title="Marketplace"
              >
                <Info size={20} />
              </Link>
              <Link
                to="/cart"
                className={`p-2 rounded-md hover:bg-cyber-gray/30 transition-colors ${isActive('/cart') ? 'text-cyber-neon neon-glow' : 'text-white/70'}`}
                title="Cart"
              >
                <ShoppingCart size={20} />
                {items.length > 0 && (
                  <span className="absolute top-1 right-1 text-xs bg-cyber-pink rounded-full w-4 h-4 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Link>
              <Link
                to="/protection"
                className={`p-2 rounded-md hover:bg-cyber-gray/30 transition-colors ${isActive('/protection') ? 'text-cyber-neon neon-glow' : 'text-white/70'}`}
                title="Protection"
              >
                <Shield size={20} />
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="glass-panel py-4 border-t border-cyber-gray/50">
        <div className="container mx-auto px-4 text-center text-xs text-white/50">
          <p>UNCLOAK © {new Date().getFullYear()} | A DYSTOPIAN EXPERIMENT IN DATA PRIVACY</p>
        </div>
      </footer>
    </div>
  );
}
