
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
import { UtensilsCrossed } from "lucide-react";

export function MealsManagement() {
  const { data: meals, isLoading } = useQuery({
    queryKey: ["adminMeals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("meals")
        .select(`
          *,
          reviews(count),
          orders(count)
        `)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data;
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UtensilsCrossed className="h-5 w-5 text-orange-500" />
          Meals Overview
        </CardTitle>
        <CardDescription>Manage all meals in the system</CardDescription>
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
                <TableHead>Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Reviews</TableHead>
                <TableHead>Orders</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {meals?.map((meal) => (
                <TableRow key={meal.id}>
                  <TableCell className="font-medium">{meal.title}</TableCell>
                  <TableCell>₹{meal.price}</TableCell>
                  <TableCell>{meal.is_veg ? "Veg" : "Non-veg"}</TableCell>
                  <TableCell>{meal.rating || "No ratings"}</TableCell>
                  <TableCell>{meal.reviews?.length || 0}</TableCell>
                  <TableCell>{meal.orders?.length || 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
