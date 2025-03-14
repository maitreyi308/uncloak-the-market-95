
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";

import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import MarketplacePage from "@/pages/MarketplacePage";
import CategoryPage from "@/pages/CategoryPage";
import CartPage from "@/pages/CartPage";
import SummaryPage from "@/pages/SummaryPage";
import ImpactPage from "@/pages/ImpactPage";
import ProtectionPage from "@/pages/ProtectionPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/category/:id" element={<CategoryPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/summary" element={<SummaryPage />} />
              <Route path="/impact" element={<ImpactPage />} />
              <Route path="/protection" element={<ProtectionPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
