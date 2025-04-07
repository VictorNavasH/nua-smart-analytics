
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthLogo } from "@/components/auth/AuthLogo";
import { AuthTitle } from "@/components/auth/AuthTitle";
import { LoginForm } from "@/components/auth/LoginForm";

export default function AuthPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Verificar si hay parámetros en la URL que indiquen un inicio de sesión con OAuth
  useEffect(() => {
    // Comprobar si estamos en una redirección de OAuth (típicamente incluye 'access_token' o 'error' en la URL)
    const hasOAuthParams = 
      location.hash.includes('access_token') || 
      location.hash.includes('error') ||
      new URLSearchParams(location.search).has('error_description');

    // Si hay parámetros OAuth y Supabase está procesándolos, mostrar indicador de carga
    if (hasOAuthParams && loading) {
      // El estado loading se maneja visualmente en el return abajo
      console.log("Procesando autenticación OAuth...");
    }
  }, [location, loading]);

  // Redirigir si el usuario ya está autenticado
  useEffect(() => {
    if (user && !loading) {
      // Redirigir a la página principal si el usuario está autenticado
      navigate("/");
    }
  }, [user, loading, navigate]);

  // Si estamos cargando la autenticación, mostrar un indicador de carga
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <AuthLogo />
          <p className="text-lg animate-pulse">Iniciando sesión...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Contenido principal */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-screen-lg flex flex-col items-center">
          {/* Logo grande centrado encima del módulo de inicio de sesión */}
          <AuthLogo />
          
          {/* Título principal */}
          <AuthTitle />

          {/* Contenedor del formulario de autenticación */}
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
