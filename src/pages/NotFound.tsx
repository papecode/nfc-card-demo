
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="container max-w-md text-center">
        <div className="mb-8">
          <div className="inline-block rounded-full bg-primary/10 p-6">
            <span className="text-5xl font-bold text-primary">404</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Page introuvable</h1>
        <p className="text-muted-foreground mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/">
          <Button variant="default" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Revenir à l'accueil
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
