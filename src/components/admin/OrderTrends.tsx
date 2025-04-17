
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { ChartLine, TrendingUp } from "lucide-react";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface OrderTrend {
  order_date: string;
  order_count: number;
  total_revenue: number;
}

export function OrderTrends() {
  const { data, isLoading, error } = useQuery<OrderTrend[]>({
    queryKey: ["orderTrends"],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_order_trends')
        .limit(14); // Last 14 days
        
      if (error) throw error;
      
      return (data as OrderTrend[]).map(trend => ({
        ...trend,
        date: format(new Date(trend.order_date), 'MMM dd'),
      })).reverse(); // Reverse to get chronological order
    },
  });

  // Chart configuration
  const chartConfig = {
    orders: {
      label: "Orders",
      theme: {
        light: "#4f46e5", // Indigo color for orders
        dark: "#818cf8"
      }
    },
    revenue: {
      label: "Revenue (₹)",
      theme: {
        light: "#16a34a", // Green color for revenue
        dark: "#4ade80"
      }
    }
  };

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
              <ChartContainer
                config={chartConfig}
                className="w-full"
              >
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
                  
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="order_count"
                    name="orders"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="total_revenue" 
                    name="revenue" 
                  />
                  
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                  />
                  <ChartLegend 
                    content={<ChartLegendContent />}
                  />
                </LineChart>
              </ChartContainer>
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
