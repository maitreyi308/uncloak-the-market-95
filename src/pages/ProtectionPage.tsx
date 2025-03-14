
import { Link } from "react-router-dom";
import GlitchHeading from "@/components/ui/GlitchHeading";
import NeonButton from "@/components/ui/NeonButton";
import { ArrowLeft, Shield, Check, Zap } from "lucide-react";

interface ProtectionTipProps {
  title: string;
  description: string;
  criticalLevel: "high" | "medium" | "low";
  actions: string[];
}

const ProtectionTip = ({ title, description, criticalLevel, actions }: ProtectionTipProps) => {
  const levelColors = {
    high: "text-cyber-red",
    medium: "text-cyber-yellow",
    low: "text-cyber-green",
  };
  
  return (
    <div className="cyberpunk-panel p-6 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="mt-1">
          <Shield size={24} className={levelColors[criticalLevel]} />
        </div>
        <div>
          <h3 className="text-lg font-cyber text-white mb-2">{title}</h3>
          <p className="text-white/70 mb-4">{description}</p>
          
          <div className="space-y-2">
            <p className="text-sm font-cyber text-cyber-neon">Recommended Actions:</p>
            {actions.map((action, i) => (
              <div key={i} className="flex items-start gap-2">
                <Check size={16} className="text-cyber-neon mt-0.5 flex-shrink-0" />
                <p className="text-sm text-white/80">{action}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProtectionPage() {
  const protectionTips: ProtectionTipProps[] = [
    {
      title: "Location Permissions",
      description: "Location data creates detailed movement patterns and is one of the most valuable data points for advertisers and surveillance.",
      criticalLevel: "high",
      actions: [
        "Disable location services globally when not in use",
        "Use 'Only while using app' for essential apps like maps",
        "Regularly review which apps have location access",
        "Consider using a VPN to mask your general location"
      ]
    },
    {
      title: "Microphone Access",
      description: "Microphone permissions can allow apps to listen to conversations, even when you're not actively using them.",
      criticalLevel: "high",
      actions: [
        "Limit microphone access to essential communication apps",
        "Disable microphone for social media and shopping apps",
        "Check if microphone is active through indicator lights/icons",
        "Consider using a microphone blocker for sensitive conversations"
      ]
    },
    {
      title: "Photo & Video Access",
      description: "Images contain metadata and can reveal personal information, locations, and relationships.",
      criticalLevel: "medium",
      actions: [
        "Limit full library access to trusted apps only",
        "Use 'Select photos only' option when available",
        "Strip metadata before sharing photos online",
        "Regularly audit which apps have photo access"
      ]
    },
    {
      title: "Contact List Access",
      description: "Your contacts reveal your social network and can be used to map relationships and influence patterns.",
      criticalLevel: "medium",
      actions: [
        "Only grant contacts access to communication apps",
        "Deny access for social media and shopping apps",
        "Use separate address books for work and personal connections",
        "Regularly review and revoke unnecessary access"
      ]
    },
    {
      title: "Notification Access",
      description: "Notification permissions allow apps to push content at strategic times to capture your attention.",
      criticalLevel: "low",
      actions: [
        "Disable notifications for non-essential apps",
        "Set specific notification times for distracting apps",
        "Use Do Not Disturb mode during focus periods",
        "Consider notification batching to reduce interruptions"
      ]
    },
    {
      title: "Nearby Device Detection",
      description: "This permission allows tracking who you are physically near and can be used for social mapping.",
      criticalLevel: "low",
      actions: [
        "Disable Bluetooth when not in use",
        "Limit nearby device permissions to essential tools",
        "Use temporary connections rather than persistent ones",
        "Regularly review which apps can detect nearby devices"
      ]
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
      
      <div className="mb-8 text-center">
        <GlitchHeading level={2} className="text-3xl md:text-4xl mb-2">
          PRIVACY PROTECTION
        </GlitchHeading>
        <p className="text-white/70 max-w-2xl mx-auto">
          Practical steps to reduce your data exposure while maintaining functionality of essential services.
        </p>
      </div>
      
      <div className="cyberpunk-panel p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Zap size={24} className="text-cyber-yellow" />
          <h3 className="text-xl font-cyber">QUICK PROTECTION GUIDE</h3>
        </div>
        
        <p className="text-white/70 mb-6">
          The following tips are organized by criticality level. Focus on high-impact changes first to 
          significantly reduce your data exposure with minimal effort.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="glass-panel p-4 border border-cyber-red/30">
            <h4 className="text-cyber-red font-cyber mb-1">HIGH PRIORITY</h4>
            <p className="text-white/70 text-sm">
              These permissions have the most significant impact on your privacy. Address these first.
            </p>
          </div>
          
          <div className="glass-panel p-4 border border-cyber-yellow/30">
            <h4 className="text-cyber-yellow font-cyber mb-1">MEDIUM PRIORITY</h4>
            <p className="text-white/70 text-sm">
              These permissions have moderate impact on privacy. Address after high priority items.
            </p>
          </div>
          
          <div className="glass-panel p-4 border border-cyber-green/30">
            <h4 className="text-cyber-green font-cyber mb-1">LOW PRIORITY</h4>
            <p className="text-white/70 text-sm">
              These permissions have less impact but still contribute to your data profile.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {protectionTips.map((tip, index) => (
          <ProtectionTip key={index} {...tip} />
        ))}
      </div>
      
      <div className="text-center">
        <Link to="/marketplace">
          <NeonButton variant="primary" size="lg">
            Return to Marketplace
          </NeonButton>
        </Link>
      </div>
    </div>
  );
}
