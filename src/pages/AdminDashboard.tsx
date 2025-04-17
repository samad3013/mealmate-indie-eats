
import { useEffect } from "react";
import { Layout } from "@/components/layout";
import { useAdmin } from "@/hooks/use-admin";
import { StatsOverview } from "@/components/admin/StatsOverview";
import { PopularMeals } from "@/components/admin/PopularMeals";
import { ActiveUsers } from "@/components/admin/ActiveUsers";
import { OrderTrends } from "@/components/admin/OrderTrends";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDashboard = () => {
  const { isAdmin, loading } = useAdmin();

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
        <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>

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
            <div className="rounded-lg border p-8 text-center">
              <h2 className="text-2xl font-semibold mb-2">Meals Management</h2>
              <p className="text-muted-foreground">
                This section will be implemented in the future
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="users">
            <div className="rounded-lg border p-8 text-center">
              <h2 className="text-2xl font-semibold mb-2">User Management</h2>
              <p className="text-muted-foreground">
                This section will be implemented in the future
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="orders">
            <div className="rounded-lg border p-8 text-center">
              <h2 className="text-2xl font-semibold mb-2">Order Management</h2>
              <p className="text-muted-foreground">
                This section will be implemented in the future
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
