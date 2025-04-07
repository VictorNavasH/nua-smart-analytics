
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthTitle } from "@/components/auth/AuthTitle";
import { LoginForm } from "@/components/auth/LoginForm";
import { notify } from "@/components/ui/toast-notification";
import { Loader } from "lucide-react";

export default function AuthPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [authError, setAuthError] = useState<string | null>(null);

  // Verificar si hay parámetros en la URL que indiquen un inicio de sesión con OAuth
  useEffect(() => {
    // Comprobar si estamos en una redirección de OAuth (típicamente incluye 'access_token' o 'error' en la URL)
    const hasOAuthParams = 
      location.hash.includes('access_token') || 
      location.hash.includes('error') ||
      new URLSearchParams(location.search).has('error_description');

    // Verificar si hay errores de OAuth en la URL
    const errorDescription = new URLSearchParams(location.search).get('error_description');
    if (errorDescription) {
      setAuthError(decodeURIComponent(errorDescription));
      notify({
        message: "Error de autenticación",
        description: decodeURIComponent(errorDescription),
        type: "error"
      });
    }

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
      console.log("Usuario autenticado, redirigiendo a página principal");
      navigate("/");
    }
  }, [user, loading, navigate]);

  // Si estamos cargando la autenticación, mostrar un indicador de carga
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <Loader className="h-8 w-8 animate-spin mx-auto text-nua-turquoise" />
          <p className="text-lg">Iniciando sesión...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Contenido principal */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-screen-lg flex flex-col items-center">
          {/* Título principal */}
          <AuthTitle />

          {/* Mostrar error si existe */}
          {authError && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md w-full max-w-md">
              {authError}
            </div>
          )}

          {/* Contenedor del formulario de autenticación */}
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
