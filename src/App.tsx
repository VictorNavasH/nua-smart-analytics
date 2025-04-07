
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/layout/SidebarContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import HomePage from "@/pages/HomePage";
import DashboardPage from "@/pages/DashboardPage";
import DataEntryPage from "@/pages/DataEntryPage";
import ProjectionsPage from "@/pages/ProjectionsPage";
import ProfilePage from "@/pages/ProfilePage";
import AuthPage from "@/pages/AuthPage";
import RestaurantsPage from "@/pages/RestaurantsPage";
import NotFound from "@/pages/NotFound";
import { Toaster } from "@/components/ui/toast-notification";
import { Loader } from "lucide-react";

// Componente para rutas protegidas
const ProtectedRoute = ({ 
  children,
  requiredRoles = [],
}: { 
  children: React.ReactNode;
  requiredRoles?: Array<'admin' | 'manager' | 'analyst'>;
}) => {
  const { user, loading, profile } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader className="h-12 w-12 animate-spin text-nua-turquoise" />
          <p className="text-lg font-medium">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Si se requieren roles específicos y el usuario no tiene ninguno de ellos
  if (
    requiredRoles.length > 0 &&
    profile &&
    !requiredRoles.includes(profile.rol)
  ) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <SidebarProvider>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            
            <Route path="/data-entry" element={
              <ProtectedRoute requiredRoles={['admin', 'manager']}>
                <DataEntryPage />
              </ProtectedRoute>
            } />
            
            <Route path="/projections" element={
              <ProtectedRoute requiredRoles={['admin', 'manager']}>
                <ProjectionsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            
            <Route path="/restaurants" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <RestaurantsPage />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </SidebarProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
