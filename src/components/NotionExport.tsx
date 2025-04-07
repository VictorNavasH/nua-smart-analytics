
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Copy, ExternalLink } from "lucide-react";

interface NotionExportProps {
  title: string;
  data: any;
  formatter?: (data: any) => string;
}

export function NotionExport({ title, data, formatter }: NotionExportProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const formattedData = formatter
    ? formatter(data)
    : JSON.stringify(data, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedData);
    toast({
      title: "Copiado al portapapeles",
      description: "Ahora puedes pegarlo en Notion",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <ExternalLink className="h-4 w-4" />
          Exportar a Notion
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Exportar a Notion</DialogTitle>
          <DialogDescription>
            Copia los datos formateados para pegarlos en Notion. Más adelante,
            esta funcionalidad se conectará directamente mediante n8n o Make.
          </DialogDescription>
        </DialogHeader>
        <div className="my-4">
          <Textarea
            className="font-mono text-sm h-[300px]"
            readOnly
            value={formattedData}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleCopy} className="flex items-center gap-2">
            <Copy className="h-4 w-4" />
            Copiar al Portapapeles
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
