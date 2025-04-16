
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const Profile = () => {
  const { user, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    // Redirect if not logged in
    if (!isLoading && !user) {
      navigate("/login");
      return;
    }

    const fetchProfileData = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          toast({
            title: "Error fetching profile",
            description: error.message,
            variant: "destructive",
          });
        } else {
          setProfileData(data);
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfileData();
  }, [user, isLoading, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error signing out",
        description: "There was a problem signing out",
        variant: "destructive",
      });
    }
  };

  if (isLoading || loadingProfile) {
    return (
      <Layout>
        <div className="container mx-auto py-20 text-center">
          <p>Loading profile...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={profileData?.avatar_url || ""} />
                  <AvatarFallback className="bg-primary/10">
                    <User className="h-12 w-12 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <CardTitle>{profileData?.first_name || ""} {profileData?.last_name || ""}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {profileData?.role === "cook" ? "Cook" : "Customer"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> {user?.email}
                  </p>
                  {profileData?.phone && (
                    <p className="text-sm">
                      <span className="font-medium">Phone:</span> {profileData.phone}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button variant="outline" className="w-full" onClick={() => navigate("/profile/edit")}>
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="destructive" className="w-full" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            {profileData?.role === "cook" ? (
              <Card>
                <CardHeader>
                  <CardTitle>Your Cook Profile</CardTitle>
                  <CardDescription>Manage your information as a cook</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">Hourly Rate:</h3>
                      <p>₹{profileData?.hourly_rate || "Not set"}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Specialty:</h3>
                      <p>{profileData?.speciality || "Not specified"}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Bio:</h3>
                      <p>{profileData?.bio || "No bio provided"}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Experience:</h3>
                      <p>{profileData?.years_of_experience || 0} years</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => navigate("/meals/manage")}>
                    Manage Your Meals
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Your Orders & Bookings</CardTitle>
                  <CardDescription>See your recent orders and bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">You haven't placed any orders yet.</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => navigate("/cooks")}>
                    Browse Cooks
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
