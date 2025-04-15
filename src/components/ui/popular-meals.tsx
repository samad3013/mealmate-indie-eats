
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MealCard } from "@/components/ui/meal-card";
import { ArrowRight } from "lucide-react";

export function PopularMeals() {
  // This would come from an API in a real implementation
  const mockMeals = [
    {
      id: "1",
      title: "Dal Chawal Tadka",
      price: 80,
      imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      cookName: "Anita Sharma",
      location: "Hauz Khas, Delhi",
      rating: 4.8,
      isVeg: true
    },
    {
      id: "2",
      title: "Paneer Butter Masala",
      price: 120,
      imageUrl: "https://images.unsplash.com/photo-1596797038530-2c107aa7ad9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      cookName: "Raj Kumar",
      location: "Koramangala, Bangalore",
      rating: 4.7,
      isVeg: true
    },
    {
      id: "3",
      title: "Chicken Biryani",
      price: 150,
      imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      cookName: "Sana Patel",
      location: "Bandra, Mumbai",
      rating: 4.9,
      isVeg: false
    },
    {
      id: "4",
      title: "Masala Dosa",
      price: 75,
      imageUrl: "https://images.unsplash.com/photo-1610192244261-3f33de3f45e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      cookName: "Lakshmi Iyer",
      location: "Adyar, Chennai",
      rating: 4.6,
      isVeg: true
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Popular Meals</h2>
          <Button variant="ghost" className="gap-2" asChild>
            <Link to="/meals">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockMeals.map((meal) => (
            <MealCard key={meal.id} {...meal} />
          ))}
        </div>
      </div>
    </section>
  );
}
