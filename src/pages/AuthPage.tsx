
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthLogo } from "@/components/auth/AuthLogo";
import { AuthTitle } from "@/components/auth/AuthTitle";
import { LoginForm } from "@/components/auth/LoginForm";

export default function AuthPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirigir si el usuario ya está autenticado
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header con logo pequeño */}
      <AuthHeader />

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
