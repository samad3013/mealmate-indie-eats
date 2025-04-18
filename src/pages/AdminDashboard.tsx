import { useEffect } from "react";
import { Layout } from "@/components/layout";
import { useAdmin } from "@/hooks/use-admin";
import { StatsOverview } from "@/components/admin/StatsOverview";
import { PopularMeals } from "@/components/admin/PopularMeals";
import { ActiveUsers } from "@/components/admin/ActiveUsers";
import { OrderTrends } from "@/components/admin/OrderTrends";
import { MealsManagement } from "@/components/admin/MealsManagement";
import { UsersManagement } from "@/components/admin/UsersManagement";
import { OrdersManagement } from "@/components/admin/OrdersManagement";
import { Loader2, BarChart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const { isAdmin, loading } = useAdmin();

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
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button asChild variant="outline" className="gap-2">
            <Link to="/admin/analytics">
              <BarChart className="h-4 w-4" />
              View Analytics
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="meals">Meals</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              <StatsOverview />
            </div>
            
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <OrderTrends />
            </div>
            
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <PopularMeals />
              <ActiveUsers />
            </div>
          </TabsContent>
          
          <TabsContent value="meals">
            <MealsManagement />
          </TabsContent>
          
          <TabsContent value="users">
            <UsersManagement />
          </TabsContent>
          
          <TabsContent value="orders">
            <OrdersManagement />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
