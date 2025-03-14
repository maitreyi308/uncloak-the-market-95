
import { Link } from "react-router-dom";
import GlitchHeading from "@/components/ui/GlitchHeading";
import NeonButton from "@/components/ui/NeonButton";
import { ArrowLeft, TargetIcon, BrainCircuit, TrendingUp, DollarSign } from "lucide-react";

export default function ImpactPage() {
  const impactData = [
    {
      title: "Targeted Advertising",
      description: "Your data is used to create detailed psychological profiles that determine which ads you see and when you see them. This creates filter bubbles that reinforce your existing beliefs and behaviors.",
      icon: <TargetIcon size={32} className="text-cyber-red" />,
    },
    {
      title: "Psychological Profiling",
      description: "Machine learning algorithms analyze your behavior patterns to predict your psychological traits, including your political views, sexual orientation, and vulnerability to addiction or depression.",
      icon: <BrainCircuit size={32} className="text-cyber-purple" />,
    },
    {
      title: "Behavior Manipulation",
      description: "Apps and platforms are designed to exploit psychological vulnerabilities, using intermittent reinforcement and other techniques to maximize engagement and dependency.",
      icon: <TrendingUp size={32} className="text-cyber-neon" />,
    },
    {
      title: "Data Brokerage",
      description: "Your personal information is aggregated, packaged, and sold through complex networks of data brokers to any entity willing to pay, including advertisers, insurers, employers, and government agencies.",
      icon: <DollarSign size={32} className="text-cyber-green" />,
    },
  ];
  
  return (
    <div className="animate-fade-in">
      <Link 
        to="/"
        className="flex items-center gap-1 text-white/70 hover:text-white mb-6"
      >
        <ArrowLeft size={16} />
        <span>Back to Home</span>
      </Link>
      
      <div className="mb-12 text-center">
        <GlitchHeading level={2} className="text-3xl md:text-5xl mb-4">
          DATA USE IMPACT
        </GlitchHeading>
        <p className="text-white/70 max-w-2xl mx-auto">
          Understanding how companies use your collected data reveals the true cost of "free" digital services.
        </p>
      </div>
      
      <div 
        className="relative glass-panel p-8 mb-12 overflow-hidden"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7')" }}
      >
        <div className="absolute inset-0 bg-cyber-black/80 backdrop-blur-sm" />
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {impactData.map((item, index) => (
            <div key={index} className="cyberpunk-panel p-6 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-cyber text-white mb-3">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-2xl font-cyber neon-glow mb-6">TAKE BACK CONTROL</h3>
        <p className="text-white/70 max-w-2xl mx-auto mb-8">
          Discover how specific permissions impact your privacy score and learn actionable steps to 
          protect your digital identity.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/marketplace">
            <NeonButton variant="primary" size="lg">
              Browse Data Categories
            </NeonButton>
          </Link>
          
          <Link to="/protection">
            <NeonButton variant="outline" size="lg">
              View Protection Tips
            </NeonButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
