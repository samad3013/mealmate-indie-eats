import { Layout } from "@/components/layout";
import { useAdmin } from "@/hooks/use-admin";
import { BarChart4, LineChart, UsersRound, Award, TrendingUp } from "lucide-react";
import { StatsOverview } from "@/components/admin/StatsOverview";
import { PopularMeals } from "@/components/admin/PopularMeals";
import { ActiveUsers } from "@/components/admin/ActiveUsers";
import { OrderTrends } from "@/components/admin/OrderTrends";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const AdminAnalytics = () => {
  const { isAdmin, loading } = useAdmin();
  const navigate = useNavigate();

  // If not loading and not admin, the hook will redirect, so we don't need additional checks here
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-20 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-4">Checking admin privileges...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Admin Analytics</h1>
          <Button variant="outline" onClick={() => navigate("/admin")}>
            Back to Dashboard
          </Button>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <StatsOverview />
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Order Trends
            </TabsTrigger>
            <TabsTrigger value="meals" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Popular Meals
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <UsersRound className="h-4 w-4" />
              Active Users
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders" className="space-y-6">
            <OrderTrends />
            
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Order Completion Rate</CardTitle>
                  <CardDescription>Percentage of completed orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Completed</span>
                      <span className="text-sm text-green-600 font-medium">84%</span>
                    </div>
                    <Progress value={84} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Average Order Value</CardTitle>
                  <CardDescription>Per month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₹235</div>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" /> 12% increase
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Order Frequency</CardTitle>
                  <CardDescription>Orders per user per month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">3.2</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on active users
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="meals">
            <div className="grid gap-4 grid-cols-1">
              <PopularMeals />
            </div>
          </TabsContent>
          
          <TabsContent value="users">
            <div className="grid gap-4 grid-cols-1">
              <ActiveUsers />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminAnalytics;
