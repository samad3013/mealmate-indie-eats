
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, Award, Star } from "lucide-react";

interface PopularMeal {
  id: string;
  title: string;
  price: number;
  order_count: number;
  rating: number | null;
  review_count: number | null;
}

export function PopularMeals() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["popularMeals"],
    queryFn: async () => {
      // Use rpc to query the view instead of directly accessing it
      const { data, error } = await supabase
        .rpc('get_popular_meals', {}, { count: 'exact' })
        .limit(5);
        
      if (error) throw error;
      return data as PopularMeal[];
    },
  });

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            Popular Meals
          </CardTitle>
          <CardDescription>Error loading popular meals</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">Failed to load data</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-yellow-500" />
          Popular Meals
        </CardTitle>
        <CardDescription>Meals with the highest number of orders</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Meal</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.length > 0 ? (
                data.map((meal) => (
                  <TableRow key={meal.id}>
                    <TableCell className="font-medium">{meal.title}</TableCell>
                    <TableCell>₹{meal.price}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        {meal.order_count}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {meal.rating || "N/A"} 
                        {meal.review_count ? `(${meal.review_count})` : ""}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No meal data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
