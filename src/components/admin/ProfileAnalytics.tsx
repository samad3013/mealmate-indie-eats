
import { OrderTrends } from "./OrderTrends";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";

export function ProfileAnalytics() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-blue-500" />
            Analytics Overview
          </CardTitle>
          <CardDescription>Key metrics and trends from your business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <OrderTrends />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
