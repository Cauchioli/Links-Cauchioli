import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Obrigado from "./pages/Obrigado";
import Links from "./pages/Links";
import Vertex from "./pages/Vertex";
import Calculadora from "./pages/Calculadora";
import Iscas from "./pages/Iscas";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Links />} />
          <Route path="/vertex" element={<Vertex />} />
          <Route path="/site" element={<Index />} />
          <Route path="/obrigado" element={<Obrigado />} />
          <Route path="/calculadora" element={<Calculadora />} />
          <Route path="/iscas" element={<Iscas />} />
          {/* CATCH-ALL ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
