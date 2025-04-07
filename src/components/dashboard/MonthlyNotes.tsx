
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StickyNote, PlusCircle, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Note {
  id: string;
  date: Date;
  text: string;
}

export function MonthlyNotes() {
  const { toast } = useToast();
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      date: new Date("2025-03-15"),
      text: "Semana Santa aumentó ingresos un 35% respecto al mes anterior."
    },
    {
      id: "2",
      date: new Date("2025-03-01"),
      text: "Promoción de menús degustación tuvo buena acogida. Considerar extenderla."
    }
  ]);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");

  const handleAddNote = () => {
    if (newNoteText.trim() === "") {
      toast({
        title: "Nota vacía",
        description: "Por favor, escribe algo en la nota.",
        variant: "destructive",
      });
      return;
    }

    const newNote: Note = {
      id: Date.now().toString(),
      date: new Date(),
      text: newNoteText,
    };

    setNotes([newNote, ...notes]);
    setNewNoteText("");
    setIsAddingNote(false);
    
    toast({
      title: "Nota añadida",
      description: "La nota se ha guardado correctamente.",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Notas y Comentarios</CardTitle>
        {!isAddingNote && (
          <Button 
            onClick={() => setIsAddingNote(true)} 
            size="sm" 
            variant="outline"
            className="h-8"
          >
            <PlusCircle className="h-4 w-4 mr-1" /> Añadir
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isAddingNote ? (
          <div className="space-y-2">
            <Textarea
              placeholder="Escribe tu nota aquí..."
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              className="min-h-[80px] w-full"
            />
            <div className="flex justify-end space-x-2">
              <Button 
                onClick={() => setIsAddingNote(false)} 
                variant="outline" 
                size="sm"
              >
                <X className="h-4 w-4 mr-1" /> Cancelar
              </Button>
              <Button 
                onClick={handleAddNote} 
                size="sm"
              >
                <Save className="h-4 w-4 mr-1" /> Guardar
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-h-[280px] overflow-y-auto pr-1">
            {notes.length > 0 ? (
              notes.map((note) => (
                <div key={note.id} className="p-3 bg-muted/50 rounded-md">
                  <div className="flex items-start">
                    <StickyNote className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm">{note.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Intl.DateTimeFormat('es', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        }).format(note.date)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No hay notas. Añade una para comenzar.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
