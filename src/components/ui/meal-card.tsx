
import * as React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";

export interface MealCardProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  cookName: string;
  location: string;
  rating: number;
  isVeg: boolean;
}

export function MealCard({
  id,
  title,
  price,
  imageUrl,
  cookName,
  location,
  rating,
  isVeg,
}: MealCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        <Badge 
          variant={isVeg ? "default" : "destructive"} 
          className="absolute top-2 left-2"
        >
          {isVeg ? "Veg" : "Non-Veg"}
        </Badge>
      </div>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          <div className="flex items-center text-amber-500">
            <Star className="h-4 w-4 fill-amber-500" />
            <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-2">by {cookName}</p>
        <div className="flex items-center text-muted-foreground text-sm mb-2">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{location}</span>
        </div>
        <p className="font-medium text-lg">₹{price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild variant="default" className="w-full">
          <Link to={`/meals/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
