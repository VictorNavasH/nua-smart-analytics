
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/layout/SidebarContext";
import HomePage from "@/pages/HomePage";
import DashboardPage from "@/pages/DashboardPage";
import DataEntryPage from "@/pages/DataEntryPage";
import ProjectionsPage from "@/pages/ProjectionsPage";
import ProfilePage from "@/pages/ProfilePage";
import NotFound from "@/pages/NotFound";
import { Toaster } from "@/components/ui/toast-notification";

function App() {
  return (
    <Router>
      <SidebarProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/data-entry" element={<DataEntryPage />} />
          <Route path="/projections" element={<ProjectionsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </SidebarProvider>
    </Router>
  );
}

export default App;
