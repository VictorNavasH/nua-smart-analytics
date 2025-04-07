
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, LogIn, UserPlus, User, Eye, EyeOff, AlertTriangle, Info, Google } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface FormErrors {
  email?: string;
  password?: string;
  nombreCompleto?: string;
}

export const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [googleEnabled, setGoogleEnabled] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Comprobar si Google Auth está habilitado
  useState(() => {
    async function checkGoogleAuthEnabled() {
      try {
        const { data } = await supabase.auth.getSettings();
        const providers = data?.providers || [];
        setGoogleEnabled(providers.includes('google'));
      } catch (error) {
        console.error("Error checking auth providers:", error);
      }
    }
    
    checkGoogleAuthEnabled();
  });

  // Validar formulario
  const validateForm = () => {
    const errors: FormErrors = {};
    let isValid = true;

    // Validar email
    if (!email) {
      errors.email = "El email es obligatorio";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email inválido";
      isValid = false;
    }

    // Validar contraseña
    if (!password) {
      errors.password = "La contraseña es obligatoria";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
      isValid = false;
    }

    // Validar nombre completo si es registro
    if (!isLogin && !nombreCompleto) {
      errors.nombreCompleto = "El nombre es obligatorio";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido a NÜA Smart Analytics",
        });
        navigate("/");
      } else {
        await signUp(email, password, { nombre_completo: nombreCompleto });
        toast({
          title: "Registro exitoso",
          description: "Se ha enviado un email de confirmación a tu dirección de correo. Por favor verifica tu cuenta para continuar.",
        });
        // En este caso no redirigimos automáticamente ya que el usuario debe verificar su email
      }
    } catch (error: any) {
      let errorMessage = error.message || "Ha ocurrido un error";
      
      // Personalizar mensajes de error comunes
      if (error.message?.includes("Email not confirmed")) {
        errorMessage = "Tu email no ha sido confirmado. Por favor revisa tu bandeja de entrada.";
      } else if (error.message?.includes("Invalid login credentials")) {
        errorMessage = "Credenciales inválidas. Por favor verifica tu email y contraseña.";
      } else if (error.message?.includes("User already registered")) {
        errorMessage = "Este email ya está registrado. Por favor inicia sesión.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth`
        }
      });
      
      if (error) throw error;
      
      // No necesitamos manejar redirección aquí, ya que Supabase lo hace automáticamente
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión con Google",
        description: error.message || "Ha ocurrido un error intentando iniciar sesión con Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </CardTitle>
        <CardDescription className="text-center">
          {isLogin
            ? "Ingresa tus credenciales para acceder"
            : "Crea una cuenta para comenzar a usar NÜA Smart Analytics"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="nombreCompleto">Nombre Completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="nombreCompleto"
                  placeholder="Nombre y Apellidos"
                  value={nombreCompleto}
                  onChange={(e) => setNombreCompleto(e.target.value)}
                  className={`pl-10 ${formErrors.nombreCompleto ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
              </div>
              {formErrors.nombreCompleto && (
                <p className="text-red-500 text-sm flex items-center mt-1">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {formErrors.nombreCompleto}
                </p>
              )}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`pl-10 ${formErrors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              />
            </div>
            {formErrors.email && (
              <p className="text-red-500 text-sm flex items-center mt-1">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {formErrors.email}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Contraseña</Label>
              {isLogin && (
                <Button
                  variant="link"
                  className="p-0 h-auto text-xs"
                  type="button"
                  onClick={() => {
                    toast({
                      title: "Recuperación de contraseña",
                      description: "Función en desarrollo. Pronto estará disponible.",
                    });
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </Button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`pl-10 pr-10 ${formErrors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {formErrors.password && (
              <p className="text-red-500 text-sm flex items-center mt-1">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {formErrors.password}
              </p>
            )}
            {!isLogin && (
              <div className="space-y-1 mt-2">
                <p className="text-sm text-muted-foreground flex items-center">
                  <Info className="h-3 w-3 mr-1" />
                  Requisitos de contraseña:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1 pl-5">
                  <li className="flex items-center">
                    <span className={`inline-block w-3 h-3 mr-1 rounded-full ${password.length >= 6 ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    Mínimo 6 caracteres
                  </li>
                </ul>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              "Procesando..."
            ) : isLogin ? (
              <span className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Iniciar Sesión
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Crear Cuenta
              </span>
            )}
          </Button>
          
          {googleEnabled && (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <span className="flex items-center gap-2">
                <Google className="h-4 w-4" />
                {isLogin ? "Iniciar sesión con Google" : "Registrarse con Google"}
              </span>
            </Button>
          )}

          <p className="text-center text-sm">
            {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
            <Button
              variant="link"
              className="p-0 ml-1"
              onClick={() => {
                setIsLogin(!isLogin);
                setFormErrors({});
              }}
              type="button"
            >
              {isLogin ? "Regístrate" : "Inicia sesión"}
            </Button>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
};
