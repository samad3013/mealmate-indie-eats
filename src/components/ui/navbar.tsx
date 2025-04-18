
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UtensilsCrossed, User, ShoppingCart, LogIn, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
          return;
        }

        setIsAdmin(data?.role === "admin");
      } catch (error) {
        console.error("Error:", error);
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-200",
      isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <UtensilsCrossed className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">MealMate</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={cn(
              "text-sm font-medium hover:text-primary transition-colors",
              location.pathname === "/" && "text-primary"
            )}
          >
            Home
          </Link>
          <Link 
            to="/meals" 
            className={cn(
              "text-sm font-medium hover:text-primary transition-colors",
              location.pathname.startsWith("/meals") && "text-primary"
            )}
          >
            Browse Meals
          </Link>
          <Link 
            to="/cooks" 
            className={cn(
              "text-sm font-medium hover:text-primary transition-colors",
              location.pathname.startsWith("/cooks") && "text-primary"
            )}
          >
            Hire Cooks
          </Link>
          <Link 
            to="/about" 
            className={cn(
              "text-sm font-medium hover:text-primary transition-colors",
              location.pathname === "/about" && "text-primary"
            )}
          >
            About Us
          </Link>
          {isAdmin && (
            <>
              <Link 
                to="/admin" 
                className={cn(
                  "text-sm font-medium hover:text-primary transition-colors",
                  location.pathname.startsWith("/admin") && !location.pathname.includes("/analytics") && "text-primary"
                )}
              >
                Admin Dashboard
              </Link>
              <Link 
                to="/admin/analytics" 
                className={cn(
                  "text-sm font-medium hover:text-primary transition-colors",
                  location.pathname.includes("/analytics") && "text-primary"
                )}
              >
                Analytics
              </Link>
            </>
          )}
        </nav>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </Button>
          
          {!isLoading && (
            user ? (
              <Button variant="ghost" size="icon" asChild>
                <Link to="/profile">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button variant="default" size="sm" asChild>
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </Button>
            )
          )}

          {isAdmin && (
            <Button variant="ghost" size="icon" asChild>
              <Link to="/admin">
                <LayoutDashboard className="h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
