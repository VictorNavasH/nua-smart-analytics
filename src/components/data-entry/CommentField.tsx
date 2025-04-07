
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare } from "lucide-react";

interface CommentFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export function CommentField({
  id,
  value,
  onChange,
  label = "Comentarios",
  placeholder = "Añade comentarios o notas sobre este registro..."
}: CommentFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <MessageSquare className="h-4 w-4 text-muted-foreground" />
        <Label htmlFor={id}>{label}</Label>
      </div>
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[80px]"
      />
    </div>
  );
}
