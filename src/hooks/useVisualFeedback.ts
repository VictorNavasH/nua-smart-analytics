
import { notify } from "@/components/ui/toast-notification";

type NotificationType = "success" | "error" | "info" | "warning";

export function useVisualFeedback() {
  const showNotification = (
    message: string, 
    description?: string, 
    type: NotificationType = "info"
  ) => {
    notify({ message, description, type });
  };

  const showSuccess = (message: string, description?: string) => {
    showNotification(message, description, "success");
  };

  const showError = (message: string, description?: string) => {
    showNotification(message, description, "error");
  };

  const showWarning = (message: string, description?: string) => {
    showNotification(message, description, "warning");
  };

  const showInfo = (message: string, description?: string) => {
    showNotification(message, description, "info");
  };

  return {
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
}
