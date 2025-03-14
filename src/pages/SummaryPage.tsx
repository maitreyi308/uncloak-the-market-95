
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart, categoryData } from "@/contexts/CartContext";
import GlitchHeading from "@/components/ui/GlitchHeading";
import NeonButton from "@/components/ui/NeonButton";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function SummaryPage() {
  const { items, getItemScore, getCommodificationScore } = useCart();
  const navigate = useNavigate();
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (items.length === 0) {
      navigate("/marketplace");
    }
  }, [items, navigate]);
  
  const chartData = items.map(item => ({
    name: item.name,
    value: getItemScore(item.id),
    baseValue: item.baseWeight,
    id: item.id
  })).sort((a, b) => b.value - a.value);
  
  const score = getCommodificationScore();
  
  const getColorForValue = (value: number) => {
    if (value >= 15) return "#FF2D55"; // Red for high values
    if (value >= 10) return "#F81CE5"; // Pink for medium-high values
    if (value >= 5) return "#00F0FF"; // Neon for medium values
    return "#25D366"; // Green for low values
  };
  
  return (
    <div className="animate-fade-in">
      <button 
        onClick={() => navigate('/cart')}
        className="flex items-center gap-1 text-white/70 hover:text-white mb-6"
      >
        <ArrowLeft size={16} />
        <span>Back to Cart</span>
      </button>
      
      <div className="mb-8 text-center">
        <GlitchHeading level={2} className="text-3xl md:text-4xl mb-2">
          DATA SUMMARY
        </GlitchHeading>
        <p className="text-white/70 max-w-2xl mx-auto">
          Your total data commodification score is <span className="text-cyber-neon font-bold">{score.toFixed(1)}%</span>. 
          See a breakdown of how each category contributes to your overall score.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Chart */}
        <div className="lg:col-span-2">
          <div className="glass-panel p-6">
            <h3 className="text-xl font-cyber mb-6">DATA BREAKDOWN</h3>
            
            <div ref={chartRef} className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  layout="vertical"
                >
                  <XAxis
                    type="number"
                    tickFormatter={(value) => `${value}%`}
                    domain={[0, 'dataMax']}
                    tick={{ fill: '#ffffff', fontSize: 12 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fill: '#ffffff', fontSize: 12 }}
                    width={120}
                  />
                  <Tooltip
                    formatter={(value: number) => [`${value.toFixed(1)}%`, 'Value']}
                    labelStyle={{ color: '#000' }}
                    contentStyle={{
                      backgroundColor: '#1F1F1F',
                      border: '1px solid #00F0FF',
                      borderRadius: '4px',
                      color: '#fff',
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getColorForValue(entry.value)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Right column - Insights */}
        <div className="glass-panel p-6">
          <h3 className="text-xl font-cyber mb-6">KEY INSIGHTS</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-cyber-neon font-cyber mb-2">HIGHEST EXPOSURE</h4>
              <p className="text-white/80">
                {chartData[0]?.name || 'N/A'} represents your highest data exposure at{' '}
                <span className="text-cyber-neon">{chartData[0]?.value.toFixed(1)}%</span>.
              </p>
            </div>
            
            <div>
              <h4 className="text-cyber-neon font-cyber mb-2">COMBINED IMPACT</h4>
              <p className="text-white/80">
                Your combined data footprint is significant, making you a valuable target for 
                data aggregators and marketers.
              </p>
            </div>
            
            <div>
              <h4 className="text-cyber-neon font-cyber mb-2">PRIVACY RECOMMENDATIONS</h4>
              <p className="text-white/80 mb-4">
                Consider reviewing permissions, especially for high-value categories, to reduce 
                your data exposure.
              </p>
              
              <Link to="/protection">
                <NeonButton variant="primary" className="w-full flex items-center justify-center gap-1">
                  <ShieldAlert size={16} />
                  View Protection Tips
                </NeonButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
