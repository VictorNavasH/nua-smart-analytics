
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  linkText: string;
  linkHref: string;
  iconColor?: string;
  hoverColor?: string;
}

export function QuickAccessCard({ 
  title, 
  description, 
  icon, 
  linkText, 
  linkHref,
  iconColor = "text-nua-pink",
  hoverColor = "hover:bg-nua-pink/5 hover:border-nua-pink" 
}: QuickAccessCardProps) {
  return (
    <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-nua-navy flex items-center gap-2 text-lg">
          <span className={iconColor}>{icon}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-1">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button 
          asChild 
          variant="outline" 
          className={`w-full justify-between ${hoverColor}`}
        >
          <Link to={linkHref}>
            <span>{linkText}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
