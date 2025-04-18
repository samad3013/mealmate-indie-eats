
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { ChartLine } from "lucide-react";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface OrderTrend {
  order_date: string;
  order_count: number;
  total_revenue: number;
}

// Sample data for demonstration when actual data is not available
const sampleData = [
  { order_date: "2025-04-11", order_count: 12, total_revenue: 2800, date: "Apr 11", formattedRevenue: "₹2800" },
  { order_date: "2025-04-12", order_count: 15, total_revenue: 3500, date: "Apr 12", formattedRevenue: "₹3500" },
  { order_date: "2025-04-13", order_count: 10, total_revenue: 2200, date: "Apr 13", formattedRevenue: "₹2200" },
  { order_date: "2025-04-14", order_count: 18, total_revenue: 4100, date: "Apr 14", formattedRevenue: "₹4100" },
  { order_date: "2025-04-15", order_count: 14, total_revenue: 3300, date: "Apr 15", formattedRevenue: "₹3300" },
  { order_date: "2025-04-16", order_count: 20, total_revenue: 4800, date: "Apr 16", formattedRevenue: "₹4800" },
  { order_date: "2025-04-17", order_count: 23, total_revenue: 5200, date: "Apr 17", formattedRevenue: "₹5200" },
  { order_date: "2025-04-18", order_count: 17, total_revenue: 3900, date: "Apr 18", formattedRevenue: "₹3900" },
];

export function OrderTrends() {
  const { data, isLoading, error } = useQuery<OrderTrend[]>({
    queryKey: ["orderTrends"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .rpc('get_order_trends')
          .limit(14); // Last 14 days
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          return (data as OrderTrend[]).map(trend => ({
            ...trend,
            date: format(new Date(trend.order_date), 'MMM dd'),
            formattedRevenue: `₹${trend.total_revenue}`
          })).reverse(); // Reverse to get chronological order
        } else {
          console.log("No data from Supabase, using sample data");
          return sampleData;
        }
      } catch (error) {
        console.error("Error fetching order trends:", error);
        console.log("Using sample data due to error");
        return sampleData;
      }
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

  const displayData = data || sampleData;

  if (error) {
    return (
      <Card>
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartLine className="h-5 w-5 text-blue-500" />
          Order Trends
        </CardTitle>
        <CardDescription>Daily order volume and revenue</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[400px]">
            <Skeleton className="h-full w-full" />
          </div>
        ) : (
          <div className="h-[400px]">
            {displayData && displayData.length > 0 ? (
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={displayData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="order_count"
                      stroke="#4f46e5"
                      name="Orders"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="total_revenue"
                      stroke="#16a34a"
                      name="Revenue" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                  </LineChart>
                </ResponsiveContainer>
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
