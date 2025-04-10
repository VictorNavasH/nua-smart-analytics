
import { Github } from "lucide-react";
import { Link } from "react-router-dom";

export function PageHeader() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-nua-navy">Bienvenido a NÜA Smart Analytics</h1>
          <a 
            href="https://github.com/nua-analytics/nua-dashboard" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-nua-turquoise transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="hidden md:inline">GitHub</span>
          </a>
        </div>
        <p className="text-muted-foreground">Impulsa tu éxito con la inteligencia financiera de NÜA Smart Restaurant.</p>
      </div>
    </div>
  );
}
