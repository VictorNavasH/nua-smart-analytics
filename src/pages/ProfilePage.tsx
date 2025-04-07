import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Building, Lock, Mail, Save, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export default function ProfilePage() {
  const { toast } = useToast();
  const { user, profile, restaurant, refreshUserData } = useAuth();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    if (profile) {
      const nameParts = profile.nombre_completo?.split(' ') || ["", ""];
      setFirstName(nameParts[0] || "");
      setLastName(nameParts.slice(1).join(' ') || "");
      setEmail(profile.email || "");
    }
  }, [profile]);
  
  const getInitials = () => {
    if (profile?.nombre_completo) {
      return profile.nombre_completo
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    return user?.email?.substring(0, 2).toUpperCase() || "NU";
  };
  
  const getRoleName = () => {
    if (!profile) return "";
    
    switch (profile.rol) {
      case "admin": return "Administrador";
      case "manager": return "Gerente";
      case "analyst": return "Analista";
      default: return "";
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      const nombreCompleto = `${firstName} ${lastName}`.trim();
      
      const { error } = await supabase
        .from('profiles')
        .update({ 
          nombre_completo: nombreCompleto
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      await refreshUserData();
      
      toast({
        title: "Perfil actualizado",
        description: "Los cambios se han guardado correctamente",
      });
    } catch (error: any) {
      toast({
        title: "Error al actualizar perfil",
        description: error.message || "Ha ocurrido un error",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleUpdatePassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "Debes completar todos los campos",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }
    
    setIsSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      toast({
        title: "Contraseña actualizada",
        description: "Tu contraseña ha sido actualizada correctamente",
      });
    } catch (error: any) {
      toast({
        title: "Error al actualizar contraseña",
        description: error.message || "Ha ocurrido un error",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Perfil de Usuario</h1>
          <p className="text-muted-foreground">
            Gestiona tu información personal y configuración
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Tu Perfil</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-2xl bg-nua-turquoise text-primary-foreground">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-medium">{profile?.nombre_completo || "Usuario"}</h3>
                <p className="text-sm text-muted-foreground">{profile?.email}</p>
                <div className="w-full mt-6 space-y-1">
                  <div className="flex items-center py-2 border-b">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{getRoleName()}</span>
                  </div>
                  <div className="flex items-center py-2 border-b">
                    <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{restaurant?.nombre || "No asignado"}</span>
                  </div>
                  <div className="flex items-center py-2">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{profile?.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-2/3">
            <Tabs defaultValue="personal" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal">Información Personal</TabsTrigger>
                <TabsTrigger value="security">Seguridad</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Información Personal</CardTitle>
                    <CardDescription>
                      Actualiza tu información personal
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">Nombre</Label>
                        <Input 
                          id="first-name" 
                          placeholder="Tu nombre" 
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Apellidos</Label>
                        <Input 
                          id="last-name" 
                          placeholder="Tus apellidos" 
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Tu correo electrónico" 
                        value={email}
                        disabled
                        className="bg-gray-50"
                      />
                      <p className="text-xs text-muted-foreground">
                        El correo electrónico no se puede cambiar
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button 
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                    >
                      <Save className="mr-2 h-4 w-4" /> {isSaving ? "Guardando..." : "Guardar Cambios"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Seguridad</CardTitle>
                    <CardDescription>
                      Actualiza tu contraseña y configuración de seguridad
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Contraseña actual</Label>
                      <Input 
                        id="current-password" 
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nueva contraseña</Label>
                        <Input 
                          id="new-password" 
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                        <Input 
                          id="confirm-password" 
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label>Requisitos de contraseña</Label>
                      <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                        <li>Mínimo 8 caracteres</li>
                        <li>Al menos una letra mayúscula</li>
                        <li>Al menos un número</li>
                        <li>Al menos un caracter especial</li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button 
                      onClick={handleUpdatePassword}
                      disabled={isSaving}
                    >
                      <Lock className="mr-2 h-4 w-4" /> {isSaving ? "Actualizando..." : "Actualizar Contraseña"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}
