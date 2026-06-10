import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center">
      <div className="text-center text-white px-4">
        <div className="w-20 h-20 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Globe className="w-10 h-10 text-white" />
        </div>
        <div className="font-heading font-bold text-8xl mb-4 text-white/30">404</div>
        <h1 className="font-heading font-bold text-3xl mb-3">Page Not Found</h1>
        <p className="text-blue-100/80 text-lg mb-8 max-w-md mx-auto">
          Looks like this page got lost in translation. Let us guide you back home.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-white text-primary hover:bg-blue-50 font-semibold px-8 py-6 text-base rounded-xl"
        >
          Return to TheBigWord
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
