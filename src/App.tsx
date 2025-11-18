import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Pillars from "./pages/Pillars";
import Projects from "./pages/Projects";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Dashboard from "./pages/admin/Dashboard";
import AdminContent from "./pages/admin/Content";
import AdminPillars from "./pages/admin/Pillars";
import AdminProjects from "./pages/admin/Projects";
import AdminEvents from "./pages/admin/Events";
import AdminGallery from "./pages/admin/Gallery";
import AdminPartners from "./pages/admin/Partners";
import AdminTeam from "./pages/admin/Team";
import AdminBlog from "./pages/admin/Blog";
import AdminMessages from "./pages/admin/Messages";
import AdminSettings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/pillars" element={<Pillars />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requireAdmin>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/content" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminContent />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/pillars" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminPillars />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/projects" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminProjects />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/events" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminEvents />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/gallery" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminGallery />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/partners" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminPartners />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/team" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminTeam />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/blog" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminBlog />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/messages" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminMessages />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/settings" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminSettings />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
