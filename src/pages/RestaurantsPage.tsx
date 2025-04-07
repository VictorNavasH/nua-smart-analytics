import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { getRestaurants, createRestaurant, updateRestaurant, deleteRestaurant } from "@/lib/supabase/restaurants";
import { useToast } from "@/hooks/use-toast";
import { Restaurant } from "@/lib/supabase/auth";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Edit, Trash2, StoreIcon, Building } from "lucide-react";

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<Partial<Restaurant> | null>(null);
  const [restaurantToDelete, setRestaurantToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  // Form state
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [active, setActive] = useState(true);

  useEffect(() => {
    loadRestaurants();
  }, []);

  async function loadRestaurants() {
    setIsLoading(true);
    try {
      const data = await getRestaurants();
      setRestaurants(data);
    } catch (error: any) {
      toast({
        title: "Error al cargar restaurantes",
        description: error.message || "No se pudieron cargar los restaurantes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleEditClick(restaurant: Restaurant) {
    setEditingRestaurant(restaurant);
    setName(restaurant.nombre);
    setCity(restaurant.ubicacion);
    setActive(restaurant.activo);
    setIsDialogOpen(true);
  }

  function handleNewRestaurantClick() {
    setEditingRestaurant(null);
    setName("");
    setCity("");
    setActive(true);
    setIsDialogOpen(true);
  }

  async function handleDeleteConfirm() {
    if (!restaurantToDelete) return;
    
    try {
      await deleteRestaurant(restaurantToDelete);
      toast({
        title: "Restaurante eliminado",
        description: "El restaurante ha sido eliminado correctamente",
      });
      setRestaurantToDelete(null);
      await loadRestaurants();
    } catch (error: any) {
      toast({
        title: "Error al eliminar",
        description: error.message || "No se pudo eliminar el restaurante",
        variant: "destructive",
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      if (editingRestaurant?.id) {
        // Update existing restaurant
        await updateRestaurant(editingRestaurant.id, {
          nombre: name,
          ubicacion: city,
          activo: active,
        });
        toast({
          title: "Restaurante actualizado",
          description: "Los datos del restaurante han sido actualizados",
        });
      } else {
        // Create new restaurant
        await createRestaurant({
          nombre: name,
          ubicacion: city,
          activo: active,
        });
        toast({
          title: "Restaurante creado",
          description: "El nuevo restaurante ha sido creado correctamente",
        });
      }
      
      setIsDialogOpen(false);
      await loadRestaurants();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Ha ocurrido un error al guardar los datos",
        variant: "destructive",
      });
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Building className="h-8 w-8 text-nua-turquoise" />
              Gestión de Restaurantes
            </h1>
            <p className="text-muted-foreground">
              Administra los restaurantes de la cadena NÜA
            </p>
          </div>
          
          <Button 
            onClick={handleNewRestaurantClick}
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Nuevo Restaurante
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Restaurantes</CardTitle>
            <CardDescription>
              Lista de restaurantes de la cadena NÜA Smart Restaurant
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="flex flex-col items-center space-y-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nua-turquoise"></div>
                  <p className="text-sm text-muted-foreground">Cargando restaurantes...</p>
                </div>
              </div>
            ) : restaurants.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <StoreIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">No hay restaurantes registrados</p>
                <Button 
                  variant="outline" 
                  onClick={handleNewRestaurantClick}
                  className="mt-2"
                >
                  Añadir el primer restaurante
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Ciudad</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {restaurants.map((restaurant) => (
                    <TableRow key={restaurant.id}>
                      <TableCell className="font-medium">{restaurant.nombre}</TableCell>
                      <TableCell>{restaurant.ubicacion}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          restaurant.activo
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {restaurant.activo ? "Activo" : "Inactivo"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditClick(restaurant)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setRestaurantToDelete(restaurant.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                                <span className="sr-only">Eliminar</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Confirmar eliminación?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer. Se eliminará permanentemente el restaurante "{restaurant.nombre}" y todos sus datos asociados.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-500 hover:bg-red-600">
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Dialog para crear/editar restaurante */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingRestaurant ? "Editar restaurante" : "Nuevo restaurante"}
              </DialogTitle>
              <DialogDescription>
                {editingRestaurant 
                  ? "Modifica los datos del restaurante seleccionado."
                  : "Completa los datos para agregar un nuevo restaurante."}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={active}
                    onCheckedChange={setActive}
                  />
                  <Label htmlFor="active">Restaurante activo</Label>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="submit">
                  {editingRestaurant ? "Guardar cambios" : "Crear restaurante"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
