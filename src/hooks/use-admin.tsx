
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export const useAdmin = () => {
  const { user, isLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      setLoading(true);
      
      if (!user) {
        // If no user or still loading, don't proceed
        if (!isLoading) {
          navigate("/login");
          toast({
            title: "Access denied",
            description: "You need to login first",
            variant: "destructive",
          });
        }
        setLoading(false);
        return;
      }

      try {
        console.log("Checking admin status for user:", user.id);
        // Fetch the user's profile
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          throw profileError;
        }

        console.log("User role from profile:", profile?.role);

        if (profile?.role !== "admin") {
          // Not an admin, redirect to home
          navigate("/");
          toast({
            title: "Access denied",
            description: "You do not have admin privileges",
            variant: "destructive",
          });
          setIsAdmin(false);
        } else {
          console.log("User confirmed as admin");
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        navigate("/");
        toast({
          title: "Error",
          description: "There was a problem checking your access permissions",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, isLoading, navigate]);

  return { isAdmin, loading };
};
