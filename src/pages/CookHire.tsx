
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, CalendarClock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";

const CookHire = () => {
  const { cookId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cookData, setCookData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingDate, setBookingDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [address, setAddress] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchCookDetails = async () => {
      try {
        const { data, error } = await supabase
          .from("cooks")
          .select(`
            *,
            profiles(first_name, last_name, avatar_url)
          `)
          .eq("id", cookId)
          .single();

        if (error) {
          throw error;
        }

        setCookData(data);
      } catch (error) {
        console.error("Error fetching cook details:", error);
        toast({
          title: "Error",
          description: "Could not load cook details. Please try again.",
          variant: "destructive",
        });
        navigate("/cooks");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCookDetails();
  }, [cookId, navigate, user]);

  const calculateTotal = () => {
    if (!cookData || !startTime || !endTime) return 0;
    
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    
    let hours = endHour - startHour;
    const minutes = (endMinute - startMinute) / 60;
    
    hours += minutes;
    
    if (hours <= 0) return 0;
    
    return hours * cookData.hourly_rate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to make a booking",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    if (!bookingDate || !startTime || !endTime || !address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formattedDate = format(bookingDate, "yyyy-MM-dd");
      const totalAmount = calculateTotal();
      
      toast({
        title: "Feature in Development",
        description: "Booking functionality is coming soon!",
      });
      
      // Placeholder for actual booking functionality
      /*
      const { data, error } = await supabase
        .from("bookings")
        .insert({
          customer_id: user.id,
          cook_id: cookId,
          booking_date: formattedDate,
          start_time: startTime,
          end_time: endTime,
          location_address: address,
          special_instructions: specialInstructions,
          total_amount: totalAmount
        })
        .select();
        
      if (error) throw error;
      
      toast({
        title: "Booking Successful!",
        description: "Your cook has been booked successfully.",
      });
      
      navigate("/profile");
      */
      
    } catch (error) {
      console.error("Error creating booking:", error);
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-20 text-center">
          <p>Loading cook details...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Hire a Cook</h1>
          
          <div className="mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={cookData?.profiles?.avatar_url || ""} />
                    <AvatarFallback>
                      <User className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>
                      {cookData?.profiles?.first_name} {cookData?.profiles?.last_name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {cookData?.speciality || "Personal Chef"}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">₹{cookData?.hourly_rate}/hour</p>
                  <p className="text-sm">{cookData?.bio}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <div className="flex items-center border rounded-md">
                    <Calendar className="ml-3 h-4 w-4 text-muted-foreground" />
                    <div className="flex-1 pl-2">
                      <p className="text-sm py-2">{bookingDate ? format(bookingDate, "PPP") : "Select a date"}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Time</label>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground absolute ml-3" />
                      <Input 
                        type="time" 
                        value={startTime} 
                        onChange={(e) => setStartTime(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Time</label>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground absolute ml-3" />
                      <Input 
                        type="time" 
                        value={endTime} 
                        onChange={(e) => setEndTime(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <Textarea
                    placeholder="Enter your full address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Special Instructions (Optional)</label>
                  <Textarea
                    placeholder="Any dietary requirements or special requests?"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                  />
                </div>
                
                <div className="bg-muted/50 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span>Hourly Rate:</span>
                    <span>₹{cookData?.hourly_rate}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Duration:</span>
                    <span>
                      {startTime && endTime ? (
                        `${calculateTotal() / cookData?.hourly_rate} hours`
                      ) : (
                        "Please select start and end time"
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between font-medium text-lg border-t pt-2 mt-2">
                    <span>Total:</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Book Now"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CookHire;
