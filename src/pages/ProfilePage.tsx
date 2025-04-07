
import { Layout } from "@/components/layout/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Building, Lock, Mail, Save, User } from "lucide-react";

export default function ProfilePage() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Perfil actualizado",
      description: "Los cambios se han guardado correctamente",
    });
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
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">NU</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-medium">Administrador NÜA</h3>
                <p className="text-sm text-muted-foreground">admin@nuarestaurant.com</p>
                <div className="w-full mt-6 space-y-1">
                  <div className="flex items-center py-2 border-b">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Administrador</span>
                  </div>
                  <div className="flex items-center py-2 border-b">
                    <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">NÜA Restaurante</span>
                  </div>
                  <div className="flex items-center py-2">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">admin@nuarestaurant.com</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Cambiar Foto</Button>
              </CardFooter>
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
                        <Input id="first-name" placeholder="Tu nombre" defaultValue="Administrador" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Apellidos</Label>
                        <Input id="last-name" placeholder="Tus apellidos" defaultValue="NÜA" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input id="email" type="email" placeholder="Tu correo electrónico" defaultValue="admin@nuarestaurant.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input id="phone" placeholder="Tu número de teléfono" defaultValue="+34 600 000 000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Cargo</Label>
                      <Input id="position" placeholder="Tu posición en la empresa" defaultValue="Administrador" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSave}>
                      <Save className="mr-2 h-4 w-4" /> Guardar Cambios
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
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nueva contraseña</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                        <Input id="confirm-password" type="password" />
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
                    <Button onClick={handleSave}>
                      <Lock className="mr-2 h-4 w-4" /> Actualizar Contraseña
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
