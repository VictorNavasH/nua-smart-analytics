
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/home/PageHeader";
import { QuickLinksSection } from "@/components/home/QuickLinksSection";
import { SalesSummaryCard } from "@/components/home/SalesSummaryCard";
import { RecentActivityCard } from "@/components/home/RecentActivityCard";
import { QuickAccessCard } from "@/components/home/QuickAccessCard";
import { UpcomingEventsCard } from "@/components/home/UpcomingEventsCard";
import { HelpCenterCard } from "@/components/home/HelpCenterCard";
import { useQuickLinks } from "@/hooks/useQuickLinks";
import { NotebookPen } from "lucide-react";

export default function HomePage() {
  const quickLinks = useQuickLinks();
  
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header con título y enlace a GitHub */}
        <PageHeader />

        {/* Módulos principales - Accesos rápidos */}
        <QuickLinksSection quickLinks={quickLinks} />

        {/* Módulos secundarios - Información y resumen */}
        <div className="grid gap-6 md:grid-cols-2">
          <SalesSummaryCard />
          <RecentActivityCard />
        </div>

        {/* Nueva fila de tarjetas - Enlaces rápidos y recursos */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Acceso a mi perfil */}
          <QuickAccessCard 
            title="Perfil y Preferencias"
            description="Gestiona tu información personal y configura tus preferencias del sistema."
            icon={<NotebookPen className="h-5 w-5" />}
            linkText="Mi perfil"
            linkHref="/profile"
            iconColor="text-nua-pink"
            hoverColor="hover:bg-nua-pink/5 hover:border-nua-pink"
          />

          {/* Próximos eventos */}
          <UpcomingEventsCard />

          {/* Centro de ayuda */}
          <HelpCenterCard />
        </div>
      </div>
    </Layout>
  );
}
