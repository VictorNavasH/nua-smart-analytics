
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface WelcomeMessageProps {
  onClose: () => void;
  autoHideDelay?: number;
}

export function WelcomeMessage({ onClose, autoHideDelay = 5000 }: WelcomeMessageProps) {
  const { profile } = useAuth();
  const [visible, setVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  // Get user display name - use nombre_completo if available, otherwise email
  const displayName = profile?.nombre_completo || profile?.email?.split('@')[0] || 'Usuario';

  // Handle auto-hide after delay
  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setIsClosing(true);
    }, autoHideDelay);

    return () => clearTimeout(hideTimer);
  }, [autoHideDelay]);

  // Handle animation and then actual close
  useEffect(() => {
    if (isClosing) {
      const animationTimer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 500); // Animation duration
      
      return () => clearTimeout(animationTimer);
    }
  }, [isClosing, onClose]);

  if (!visible) return null;

  return (
    <div 
      className={cn(
        "relative mb-6 p-4 bg-white dark:bg-nua-navy border border-nua-turquoise/20 rounded-lg shadow-md animate-fade-in",
        isClosing && "animate-fade-out transition-opacity duration-500 opacity-0"
      )}
    >
      <button 
        onClick={() => setIsClosing(true)} 
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        aria-label="Cerrar mensaje"
      >
        <X size={18} />
      </button>
      <h2 className="text-xl font-semibold text-nua-turquoise">
        ¡Hola, {displayName} 👋 Bienvenido a NÜA Smart Analytics! ✨
      </h2>
    </div>
  );
}
