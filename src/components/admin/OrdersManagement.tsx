
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart } from "lucide-react";

export function OrdersManagement() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: async () => {
      // First, let's fetch the customer data separately to avoid relationship errors
      const { data, error } = await supabase
        .from("orders")
        .select(`
          id,
          meal_id,
          customer_id,
          quantity,
          total_amount,
          status,
          created_at,
          meals (
            title,
            price
          )
        `)
        .order('created_at', { ascending: false })
        .limit(50);
        
      if (error) throw error;

      // Now, let's fetch the customer profiles for these orders
      const customerIds = data.map(order => order.customer_id);
      const { data: customerProfiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, first_name, last_name")
        .in('id', customerIds);

      if (profilesError) throw profilesError;

      // Combine the data
      const ordersWithCustomers = data.map(order => {
        const customerProfile = customerProfiles.find(profile => profile.id === order.customer_id);
        return {
          ...order,
          customer: customerProfile || { first_name: "Unknown", last_name: "Customer" }
        };
      });

      return ordersWithCustomers;
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-green-500" />
          Recent Orders
        </CardTitle>
        <CardDescription>Latest 50 orders in the system</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Meal</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    {order.customer?.first_name} {order.customer?.last_name}
                  </TableCell>
                  <TableCell>{order.meals?.title}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>₹{order.total_amount}</TableCell>
                  <TableCell className="capitalize">{order.status}</TableCell>
                  <TableCell>
                    {new Date(order.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
