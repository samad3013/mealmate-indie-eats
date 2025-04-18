
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, LogOut, Loader2, LayoutDashboard, BarChart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileAnalytics } from "@/components/admin/ProfileAnalytics";

const Profile = () => {
  const { user, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [showAnalytics, setShowAnalytics] = useState(false);

  useEffect(() => {
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
          .maybeSingle();

        if (error) {
          console.error("Error fetching profile:", error);
          throw error;
        }

        if (!data) {
          navigate("/profile/edit");
          return;
        }
        
        setProfileData(data);
        console.log("Profile data loaded:", data); // Debug log to check role
        
        if (data.role === "cook") {
          const { data: cookData, error: cookError } = await supabase
            .from("cooks")
            .select("*")
            .eq("id", user.id)
            .maybeSingle();
            
          if (cookError) {
            console.error("Error fetching cook details:", cookError);
          } else if (cookData) {
            setProfileData(prev => ({ ...prev, ...cookData }));
          }
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
        toast({
          title: "Error with profile",
          description: "There was a problem with your profile",
          variant: "destructive",
        });
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

  // For testing purposes: force admin view if email includes sy9129
  const isTestAdmin = user?.email?.includes("sy9129");
  const isAdmin = profileData?.role === "admin" || isTestAdmin;

  if (isLoading || loadingProfile) {
    return (
      <Layout>
        <div className="container mx-auto py-20 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-4">Loading profile...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        
        {isAdmin ? (
          <Tabs defaultValue="profile" className="mb-8">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
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
                        {isAdmin ? "Admin" : profileData?.role === "cook" ? "Cook" : "Customer"}
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
                      {isAdmin && (
                        <>
                          <Button 
                            variant="default" 
                            className="w-full bg-blue-500 hover:bg-blue-600" 
                            onClick={() => navigate("/admin")}
                          >
                            <LayoutDashboard className="w-4 h-4 mr-2" />
                            Admin Dashboard
                          </Button>
                          <Button 
                            variant="default" 
                            className="w-full bg-green-500 hover:bg-green-600" 
                            onClick={() => navigate("/admin/analytics")}
                          >
                            <BarChart className="w-4 h-4 mr-2" />
                            View Full Analytics
                          </Button>
                        </>
                      )}
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
            </TabsContent>
            <TabsContent value="analytics">
              <ProfileAnalytics />
            </TabsContent>
          </Tabs>
        ) : (
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
        )}
      </div>
    </Layout>
  );
};

export default Profile;
