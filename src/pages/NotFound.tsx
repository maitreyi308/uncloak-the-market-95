
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import GlitchHeading from "@/components/ui/GlitchHeading";
import NeonButton from "@/components/ui/NeonButton";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="mb-8">
          <GlitchHeading className="text-7xl mb-4" glitchChar="4">
            404
          </GlitchHeading>
          <p className="text-xl text-white/60 mb-8">SYSTEM ACCESS DENIED</p>
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-cyber-neon to-transparent mb-8" />
          <p className="text-white/70 max-w-md mx-auto mb-8">
            The requested data file has been corrupted or exists outside your permission level.
          </p>
          
          <Link to="/">
            <NeonButton variant="primary" className="flex items-center gap-2">
              <Home size={16} />
              Return to Home Terminal
            </NeonButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
