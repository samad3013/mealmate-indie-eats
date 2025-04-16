
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ChefHat, MapPin, Star, Clock, User, Filter } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";

const CookDetails = () => {
  const { cookId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [cook, setCook] = useState<any>(null);
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCookAndMeals = async () => {
      setLoading(true);
      try {
        // Fetch cook details
        const { data: cookData, error: cookError } = await supabase
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
          .eq("id", cookId)
          .single();

        if (cookError) {
          throw cookError;
        }

        setCook(cookData);

        // Fetch cook's meals
        const { data: mealsData, error: mealsError } = await supabase
          .from("meals")
          .select("*")
          .eq("cook_id", cookId);

        if (mealsError) {
          throw mealsError;
        }

        setMeals(mealsData || []);
      } catch (error) {
        console.error("Error fetching cook details:", error);
        toast({
          title: "Error",
          description: "Failed to load cook details. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (cookId) {
      fetchCookAndMeals();
    }
  }, [cookId, toast]);

  const handleHire = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to hire this cook",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    navigate(`/cooks/${cookId}/hire`);
  };

  const filteredMeals = meals.filter((meal) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      meal.title?.toLowerCase().includes(searchLower) ||
      meal.description?.toLowerCase().includes(searchLower) ||
      meal.ingredients?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4 text-center">
          <p>Loading cook details...</p>
        </div>
      </Layout>
    );
  }

  if (!cook) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4 text-center">
          <p>Cook not found</p>
          <Button onClick={() => navigate("/cooks")} className="mt-4">
            Back to Cooks
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <Button 
          variant="outline" 
          className="mb-6"
          onClick={() => navigate("/cooks")}
        >
          Back to Cooks
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={cook.profiles?.avatar_url || ""} />
                  <AvatarFallback>
                    <User className="h-10 w-10" />
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">
                  {cook.profiles?.first_name} {cook.profiles?.last_name}
                </CardTitle>
                {cook.speciality && (
                  <Badge className="mt-2">
                    <ChefHat className="h-3 w-3 mr-1" />
                    {cook.speciality}
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cook.bio && (
                    <div>
                      <h3 className="font-medium mb-1">About:</h3>
                      <p className="text-sm text-muted-foreground">{cook.bio}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{cook.years_of_experience || 0} years experience</span>
                  </div>
                  
                  {cook.location_address && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{cook.location_address}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-2 text-amber-500" />
                    <span>{cook.average_rating ? cook.average_rating.toFixed(1) : "New"}</span>
                  </div>
                  
                  <div className="font-medium text-lg">₹{cook.hourly_rate}/hour</div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={handleHire}
                >
                  Hire this Cook
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Cook's Menu</h2>
              <div className="flex items-center mb-4">
                <Input
                  type="text"
                  placeholder="Search meals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
                <Filter className="ml-2 h-5 w-5 text-muted-foreground" />
              </div>
              
              {filteredMeals.length === 0 ? (
                <div className="text-center py-8 bg-muted/20 rounded-lg">
                  <p className="text-muted-foreground">
                    {meals.length === 0 
                      ? "This cook hasn't added any meals yet."
                      : "No meals match your search criteria."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredMeals.map((meal) => (
                    <Card key={meal.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        {meal.image_url && (
                          <div className="md:w-1/4">
                            <img 
                              src={meal.image_url} 
                              alt={meal.title}
                              className="w-full h-32 md:h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">{meal.title}</h3>
                              {meal.is_veg && (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  Vegetarian
                                </Badge>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="font-medium">₹{meal.price}</div>
                              {meal.preparation_time && (
                                <div className="text-xs text-muted-foreground">
                                  {meal.preparation_time} prep time
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {meal.description && (
                            <p className="text-sm text-muted-foreground mt-2">
                              {meal.description}
                            </p>
                          )}
                          
                          {meal.ingredients && (
                            <div className="mt-2">
                              <span className="text-xs font-medium">Ingredients:</span>
                              <p className="text-xs text-muted-foreground">
                                {meal.ingredients}
                              </p>
                            </div>
                          )}
                          
                          <div className="flex items-center mt-2">
                            <Star className="h-3 w-3 text-amber-500 mr-1" />
                            <span className="text-sm">
                              {meal.rating ? meal.rating.toFixed(1) : "New"} 
                            </span>
                            {meal.review_count > 0 && (
                              <span className="text-xs text-muted-foreground ml-1">
                                ({meal.review_count} reviews)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CookDetails;
