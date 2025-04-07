
import { CheckCircle, AlertCircle, Info, XCircle } from "lucide-react";
import { toast, Toaster as SonnerToaster } from "sonner";
import { useTheme } from "next-themes";

type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationProps {
  message: string;
  description?: string;
  type?: NotificationType;
}

export function notify({ message, description, type = "info" }: NotificationProps) {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Info className="h-5 w-5 text-nua-turquoise" />;
    }
  };

  toast(message, {
    description,
    icon: getIcon(),
    className: `${type}-toast animate-fade-in`
  });
}

export function Toaster() {
  const { theme = "system" } = useTheme();
  
  return (
    <SonnerToaster
      theme={theme as "light" | "dark" | "system"}
      position="top-right"
      toastOptions={{
        duration: 4000,
        className: "toast-animation",
      }}
    />
  );
}
