
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Star,
  MapPin,
  User,
  Clock,
  ChefHat,
  Utensils,
  ShoppingCart,
  Leaf,
  BadgeDollarSign,
  Plus,
  Minus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

// Mock meal data - would be fetched from Supabase in real implementation
const mockMeals = [
  {
    id: "1",
    title: "Dal Chawal Tadka",
    price: 80,
    imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
    description: "A comforting combination of yellow dal (lentils) served with steamed rice and a spicy tadka (tempering) of cumin, garlic, and dried red chilies. Garnished with fresh coriander leaves.",
    ingredients: "Yellow Lentils, Rice, Ghee, Cumin Seeds, Garlic, Dried Red Chillies, Turmeric, Salt, Coriander Leaves",
    cookName: "Anita Sharma",
    cookImage: "https://randomuser.me/api/portraits/women/44.jpg",
    location: "Hauz Khas, Delhi",
    rating: 4.8,
    reviewCount: 124,
    preparationTime: "30 minutes",
    isVeg: true
  },
  {
    id: "2",
    title: "Paneer Butter Masala",
    price: 120,
    imageUrl: "https://images.unsplash.com/photo-1596797038530-2c107aa7ad9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
    description: "Soft paneer cubes simmered in a rich, creamy tomato gravy with aromatic spices. The butter gives it a silky smooth texture and enhances the flavor.",
    ingredients: "Paneer, Tomatoes, Onions, Ginger-Garlic Paste, Cream, Butter, Cashew Paste, Garam Masala, Red Chili Powder, Kasoori Methi, Salt",
    cookName: "Raj Kumar",
    cookImage: "https://randomuser.me/api/portraits/men/32.jpg",
    location: "Koramangala, Bangalore",
    rating: 4.7,
    reviewCount: 87,
    preparationTime: "45 minutes",
    isVeg: true
  },
  {
    id: "3",
    title: "Chicken Biryani",
    price: 150,
    imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
    description: "Aromatic basmati rice layered with tender chicken pieces marinated in yogurt and spices, then slow-cooked to perfection. Garnished with fried onions, mint, and coriander.",
    ingredients: "Basmati Rice, Chicken, Yogurt, Onions, Tomatoes, Ginger-Garlic Paste, Biryani Masala, Green Chilies, Mint Leaves, Coriander Leaves, Saffron, Ghee",
    cookName: "Sana Patel",
    cookImage: "https://randomuser.me/api/portraits/women/68.jpg",
    location: "Bandra, Mumbai",
    rating: 4.9,
    reviewCount: 156,
    preparationTime: "60 minutes",
    isVeg: false
  }
];

const MealDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [isOrdering, setIsOrdering] = useState(false);
  const { toast } = useToast();
  
  // Find the meal by id - in a real app, this would be a database query
  const meal = mockMeals.find(meal => meal.id === id);
  
  if (!meal) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Meal not found</h1>
          <p className="mb-6">The meal you're looking for does not exist or has been removed.</p>
          <Button asChild>
            <Link to="/meals">Browse Meals</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  
  const placeOrder = async () => {
    setIsOrdering(true);
    try {
      // This would be a Supabase call in a real implementation
      console.log("Placing order:", {
        mealId: meal.id,
        quantity,
        deliveryNotes,
        totalPrice: meal.price * quantity
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Order placed successfully!",
        description: `Your order for ${meal.title} has been placed.`,
        duration: 5000,
      });
      
      // Reset form
      setQuantity(1);
      setDeliveryNotes("");
    } catch (error) {
      console.error("Error placing order:", error);
      toast({
        title: "Failed to place order",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Link to="/meals" className="text-primary hover:underline inline-flex items-center">
                ← Back to meals
              </Link>
            </div>
            
            <div className="bg-card rounded-lg overflow-hidden shadow-md mb-8">
              <div className="relative aspect-[16/9] w-full">
                <Badge 
                  variant={meal.isVeg ? "default" : "destructive"} 
                  className="absolute top-4 left-4 z-10"
                >
                  {meal.isVeg ? (
                    <span className="flex items-center">
                      <Leaf className="h-3 w-3 mr-1" /> Vegetarian
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Utensils className="h-3 w-3 mr-1" /> Non-Vegetarian
                    </span>
                  )}
                </Badge>
                <img 
                  src={meal.imageUrl} 
                  alt={meal.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h1 className="text-3xl font-bold mb-2 md:mb-0">{meal.title}</h1>
                  <div className="flex items-center">
                    <div className="flex items-center text-amber-500 mr-2">
                      <Star className="h-5 w-5 fill-amber-500" />
                      <span className="ml-1 font-medium">{meal.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-muted-foreground">({meal.reviewCount} reviews)</span>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                  <span className="text-muted-foreground">{meal.location}</span>
                  <span className="mx-2 text-muted-foreground">•</span>
                  <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                  <span className="text-muted-foreground">Ready in {meal.preparationTime}</span>
                </div>
                
                <p className="text-lg mb-6">{meal.description}</p>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                  <p className="text-muted-foreground">{meal.ingredients}</p>
                </div>
                
                <Separator className="my-6" />
                
                <div className="flex items-center">
                  <img 
                    src={meal.cookImage} 
                    alt={meal.cookName} 
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">Prepared by {meal.cookName}</p>
                    <p className="text-sm text-muted-foreground">Home Cook</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-2">Order This Meal</h2>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <BadgeDollarSign className="h-5 w-5 text-primary mr-1" />
                    <span className="text-2xl font-bold">₹{meal.price}</span>
                  </div>
                  <Badge variant="outline" className="text-muted-foreground">
                    Per Serving
                  </Badge>
                </div>
                
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Quantity</label>
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="w-12 mx-3 text-center font-medium">
                      {quantity}
                    </div>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={increaseQuantity}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Delivery Notes (Optional)</label>
                  <Textarea 
                    placeholder="Any special instructions for delivery..."
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    className="resize-none"
                  />
                </div>
                
                <Separator className="mb-6" />
                
                <div className="flex justify-between items-center mb-6">
                  <span className="font-medium">Total</span>
                  <span className="text-xl font-bold">₹{(meal.price * quantity).toFixed(2)}</span>
                </div>
                
                <Button 
                  className="w-full gap-2" 
                  size="lg" 
                  onClick={placeOrder}
                  disabled={isOrdering}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {isOrdering ? "Placing Order..." : "Place Order"}
                </Button>
                
                <p className="text-center text-sm text-muted-foreground mt-4">
                  You'll be prompted to login if you haven't already
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MealDetails;
