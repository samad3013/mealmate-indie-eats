
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, User, Clock, Star, ChefHat } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";

export default function Cooks() {
  const [cooks, setCooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchCooks = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("cooks")
          .select(`
            id,
            hourly_rate,
            bio,
            speciality,
            location_address,
            average_rating,
            years_of_experience,
            is_available,
            profiles(first_name, last_name, avatar_url)
          `)
          .eq("is_available", true);

        if (error) {
          throw error;
        }

        setCooks(data || []);
      } catch (error) {
        console.error("Error fetching cooks:", error);
        toast({
          title: "Error",
          description: "Failed to load cooks. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCooks();
  }, [toast]);

  const filteredCooks = cooks.filter((cook) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      cook.profiles?.first_name?.toLowerCase().includes(searchLower) ||
      cook.profiles?.last_name?.toLowerCase().includes(searchLower) ||
      cook.speciality?.toLowerCase().includes(searchLower) ||
      cook.location_address?.toLowerCase().includes(searchLower)
    );
  });

  const handleHire = (cookId) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to hire a cook",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    navigate(`/cooks/${cookId}/hire`);
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-2">Find a Cook</h1>
        <p className="text-muted-foreground mb-8">
          Browse our skilled cooks and hire them for your culinary needs
        </p>
        
        <div className="mb-8">
          <Input
            type="text"
            placeholder="Search by name, specialty, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <p>Loading cooks...</p>
          </div>
        ) : filteredCooks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No cooks found matching your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCooks.map((cook) => (
              <Card key={cook.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={cook.profiles?.avatar_url || ""} />
                      <AvatarFallback>
                        <User className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {cook.profiles?.first_name} {cook.profiles?.last_name}
                      </CardTitle>
                      {cook.speciality && (
                        <Badge variant="outline" className="mt-1">
                          <ChefHat className="h-3 w-3 mr-1" />
                          {cook.speciality}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {cook.bio && <p className="text-sm line-clamp-2">{cook.bio}</p>}
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>{cook.years_of_experience || 0} years experience</span>
                    </div>
                    
                    {cook.location_address && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span className="truncate">{cook.location_address}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center text-sm">
                      <Star className="h-3.5 w-3.5 mr-1 text-amber-500" />
                      <span>
                        {cook.average_rating ? cook.average_rating.toFixed(1) : "New"}
                      </span>
                    </div>
                    
                    <div className="font-medium">₹{cook.hourly_rate}/hour</div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="w-1/2"
                    asChild
                  >
                    <Link to={`/cooks/${cook.id}`}>View Profile</Link>
                  </Button>
                  <Button 
                    className="w-1/2"
                    onClick={() => handleHire(cook.id)}
                  >
                    Hire Cook
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
