
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout";
import { MealCard } from "@/components/ui/meal-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, Filter, Check } from "lucide-react";

// Mock meal data - would be fetched from Supabase in real implementation
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
  },
  {
    id: "5",
    title: "Chole Bhature",
    price: 90,
    imageUrl: "https://images.unsplash.com/photo-1626132647523-66c06954ad7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    cookName: "Vikas Kapoor",
    location: "Connaught Place, Delhi",
    rating: 4.5,
    isVeg: true
  },
  {
    id: "6",
    title: "Mutton Rogan Josh",
    price: 180,
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    cookName: "Farhan Ahmed",
    location: "Alipore, Kolkata",
    rating: 4.9,
    isVeg: false
  },
  {
    id: "7",
    title: "Idli Sambar",
    price: 60,
    imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979acd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    cookName: "Ramya Subramaniam",
    location: "Anna Nagar, Chennai",
    rating: 4.7,
    isVeg: true
  },
  {
    id: "8",
    title: "Aloo Paratha",
    price: 50,
    imageUrl: "https://images.unsplash.com/photo-1589249387586-7c1b9f3aa2f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    cookName: "Harpreet Kaur",
    location: "Sector 17, Chandigarh",
    rating: 4.6,
    isVeg: true
  }
];

const indianCities = [
  "All Cities", "Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", 
  "Hyderabad", "Ahmedabad", "Pune", "Jaipur", "Lucknow",
  "Chandigarh"
];

const Meals = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Cities");
  const [mealType, setMealType] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // Filter meals based on criteria
  const filteredMeals = mockMeals.filter(meal => {
    const matchesSearch = meal.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          meal.cookName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === "All Cities" || meal.location.includes(selectedLocation);
    const matchesType = mealType === "all" || 
                       (mealType === "veg" && meal.isVeg) || 
                       (mealType === "nonveg" && !meal.isVeg);
    const matchesPrice = meal.price >= priceRange[0] && meal.price <= priceRange[1];
    const matchesRating = meal.rating >= minRating;
    
    return matchesSearch && matchesLocation && matchesType && matchesPrice && matchesRating;
  });

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedLocation !== "All Cities") params.set("location", selectedLocation);
    if (mealType !== "all") params.set("type", mealType);
    params.set("minPrice", priceRange[0].toString());
    params.set("maxPrice", priceRange[1].toString());
    params.set("minRating", minRating.toString());
    setSearchParams(params);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLocation("All Cities");
    setMealType("all");
    setPriceRange([0, 200]);
    setMinRating(0);
    setSearchParams({});
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Browse Homemade Meals</h1>
          <p className="text-lg text-muted-foreground">
            Discover delicious, home-cooked meals from local cooks near you.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search meals, cooks..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="flex gap-2 md:w-auto"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
            <Button onClick={applyFilters}>Search</Button>
          </div>

          {showFilters && (
            <div className="bg-card border rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label className="mb-2 block">Location</Label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianCities.map(city => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 block">Meal Type</Label>
                  <Select value={mealType} onValueChange={setMealType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="veg">Vegetarian</SelectItem>
                      <SelectItem value="nonveg">Non-Vegetarian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 block">Minimum Rating</Label>
                  <Select 
                    value={minRating.toString()} 
                    onValueChange={(value) => setMinRating(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select minimum rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any Rating</SelectItem>
                      <SelectItem value="3">3+ Stars</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-6">
                <Label className="mb-4 block">Price Range (₹{priceRange[0]} - ₹{priceRange[1]})</Label>
                <Slider
                  value={priceRange}
                  min={0}
                  max={200}
                  step={10}
                  onValueChange={setPriceRange}
                  className="py-4"
                />
              </div>

              <div className="mt-6 flex justify-end">
                <Button variant="outline" onClick={resetFilters} className="mr-2">
                  Reset Filters
                </Button>
                <Button onClick={applyFilters} className="gap-2">
                  <Check className="h-4 w-4" /> Apply Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {filteredMeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMeals.map((meal) => (
              <MealCard key={meal.id} {...meal} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">No meals found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search term.
            </p>
            <Button variant="outline" onClick={resetFilters} className="mt-4">
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Meals;
