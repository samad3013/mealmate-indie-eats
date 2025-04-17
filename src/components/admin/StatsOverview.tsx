
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UsersRound, UtensilsCrossed, ShoppingCart, DollarSign } from "lucide-react";

export function StatsOverview() {
  const { data: userCount, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["userCount"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("profiles")
        .select("*", { count: 'exact', head: true });
        
      if (error) throw error;
      return count || 0;
    },
  });

  const { data: mealCount, isLoading: isLoadingMeals } = useQuery({
    queryKey: ["mealCount"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("meals")
        .select("*", { count: 'exact', head: true });
        
      if (error) throw error;
      return count || 0;
    },
  });

  const { data: orderStats, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["orderStats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("id, total_amount");
        
      if (error) throw error;
      
      const count = data.length;
      const revenue = data.reduce((sum, order) => sum + (order.total_amount || 0), 0);
      
      return { count, revenue };
    },
  });

  const stats = [
    {
      title: "Total Users",
      value: userCount,
      icon: UsersRound,
      color: "text-blue-500",
      isLoading: isLoadingUsers,
    },
    {
      title: "Total Meals",
      value: mealCount,
      icon: UtensilsCrossed,
      color: "text-amber-500",
      isLoading: isLoadingMeals,
    },
    {
      title: "Total Orders",
      value: orderStats?.count,
      icon: ShoppingCart,
      color: "text-green-500",
      isLoading: isLoadingOrders,
    },
    {
      title: "Total Revenue",
      value: orderStats?.revenue ? `₹${orderStats.revenue.toLocaleString()}` : "₹0",
      icon: DollarSign,
      color: "text-purple-500",
      isLoading: isLoadingOrders,
    },
  ];

  return (
    <>
      {stats.map((stat, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            {stat.isLoading ? (
              <Skeleton className="h-7 w-1/2" />
            ) : (
              <div className="text-2xl font-bold">{stat.value !== undefined ? stat.value : 0}</div>
            )}
          </CardContent>
        </Card>
      ))}
    </>
  );
}
