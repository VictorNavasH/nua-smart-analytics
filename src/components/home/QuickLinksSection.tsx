
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChevronRight, 
  LineChart, 
  BarChart3, 
  FilePlus, 
  TrendingUp,
  Building
} from "lucide-react";

interface QuickLinkProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export function QuickLinksSection({ quickLinks }: { quickLinks: QuickLinkProps[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {quickLinks.map((link, index) => (
        <Card 
          key={index} 
          className="transition-all duration-300 hover:shadow-card-hover hover:scale-[1.02] border border-gray-100"
        >
          <CardHeader>
            <div className="mb-2">{link.icon}</div>
            <CardTitle className="text-nua-navy">{link.title}</CardTitle>
            <CardDescription>{link.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button 
              asChild 
              variant="outline" 
              className="w-full justify-between hover:bg-nua-turquoise/5 hover:border-nua-turquoise"
            >
              <Link to={link.href}>
                <span>Ir ahora</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
