
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { format } from "date-fns";
import { ChartLine, TrendingUp } from "lucide-react";

interface OrderTrend {
  order_date: string;
  order_count: number;
  total_revenue: number;
}

export function OrderTrends() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["orderTrends"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("order_trends")
        .select("*")
        .limit(14); // Last 14 days
        
      if (error) throw error;
      
      return (data as OrderTrend[]).map(trend => ({
        ...trend,
        date: format(new Date(trend.order_date), 'MMM dd'),
      })).reverse(); // Reverse to get chronological order
    },
  });

  if (error) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChartLine className="h-5 w-5 text-blue-500" />
            Order Trends
          </CardTitle>
          <CardDescription>Error loading order trends</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">Failed to load data</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartLine className="h-5 w-5 text-blue-500" />
          Order Trends
        </CardTitle>
        <CardDescription>Order volumes and revenue over time</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-72">
            <Skeleton className="h-full w-full" />
          </div>
        ) : (
          <div className="h-72">
            {data && data.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="order_count"
                    name="Orders"
                    stroke="#4f46e5"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="total_revenue" 
                    name="Revenue (₹)" 
                    stroke="#16a34a" 
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">No order data available</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
