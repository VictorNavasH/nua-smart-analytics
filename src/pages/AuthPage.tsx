
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, LogIn, UserPlus, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirigir si el usuario ya está autenticado
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header similar al mostrado en la imagen de referencia */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="relative flex flex-1 items-center gap-4 md:gap-8">
          <nav className="flex flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <img
              src="/lovable-uploads/b59e57f7-7256-4917-a532-2863925ef4f1.png"
              alt="NÜA Logo"
              className="h-6 w-auto"
            />
          </nav>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-screen-lg">
          {/* Título principal similar a la imagen de referencia */}
          <div className="mb-10 mt-4 text-left">
            <h1 className="text-3xl font-bold tracking-tight text-nua-navy">Bienvenido a NÜA Smart Analytics</h1>
            <p className="text-muted-foreground">Impulsa tu éxito con la inteligencia financiera de NÜA Smart Restaurant.</p>
          </div>

          {/* Contenedor del formulario de autenticación */}
          <div className="flex items-center justify-center">
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
                          className="pl-10"
                          required
                        />
                      </div>
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
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
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
                  <p className="text-center text-sm">
                    {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
                    <Button
                      variant="link"
                      className="p-0 ml-1"
                      onClick={() => setIsLogin(!isLogin)}
                      type="button"
                    >
                      {isLogin ? "Regístrate" : "Inicia sesión"}
                    </Button>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
