
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { format, addMonths } from "date-fns";

const CookHire = () => {
  const { cookId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [cook, setCook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [location, setLocation] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  
  useEffect(() => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to hire a cook",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    const fetchCook = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("cooks")
          .select(`
            id,
            hourly_rate,
            speciality,
            location_address,
            profiles(first_name, last_name)
          `)
          .eq("id", cookId)
          .single();

        if (error) {
          throw error;
        }

        setCook(data);
      } catch (error) {
        console.error("Error fetching cook:", error);
        toast({
          title: "Error",
          description: "Failed to load cook information. Please try again later.",
          variant: "destructive",
        });
        navigate("/cooks");
      } finally {
        setLoading(false);
      }
    };

    fetchCook();
  }, [cookId, user, toast, navigate]);

  const calculateTotal = () => {
    if (!cook) return 0;
    
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    
    const totalHours = (endHour - startHour) + (endMinute - startMinute) / 60;
    const monthlyRate = cook.hourly_rate * 8 * 20; // Assuming 8 hours a day, 20 days a month
    
    return totalHours > 0 ? monthlyRate : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to hire a cook",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    if (!date) {
      toast({
        title: "Date Required",
        description: "Please select a start date for the booking",
        variant: "destructive",
      });
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Calculate total amount based on monthly rate
      const totalAmount = calculateTotal();
      
      const { error } = await supabase
        .from("bookings")
        .insert({
          cook_id: cookId,
          customer_id: user.id,
          booking_date: format(date, "yyyy-MM-dd"),
          start_time: startTime,
          end_time: endTime,
          location_address: location,
          special_instructions: specialInstructions,
          total_amount: totalAmount,
          status: "pending"
        });
        
      if (error) {
        throw error;
      }
      
      toast({
        title: "Booking Successful",
        description: `You have successfully booked ${cook.profiles.first_name} ${cook.profiles.last_name} for ${format(date, "PPP")}`,
      });
      
      navigate("/profile");
    } catch (error) {
      console.error("Error creating booking:", error);
      toast({
        title: "Booking Failed",
        description: "There was an error creating your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4 text-center">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!cook) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4 text-center">
          <p>Cook not found</p>
          <Button onClick={() => navigate("/cooks")} className="mt-4">
            Back to Cooks
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-3xl mx-auto py-12 px-4">
        <Button 
          variant="outline" 
          className="mb-6"
          onClick={() => navigate(`/cooks/${cookId}`)}
        >
          Back to Cook Profile
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">Hire Cook</h1>
        <p className="text-muted-foreground mb-6">
          Complete this form to hire {cook.profiles.first_name} {cook.profiles.last_name} for a monthly cooking service
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Start Date</Label>
                  <DatePicker date={date} setDate={setDate} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter your address"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="startTime">Daily Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endTime">Daily End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="special-instructions">Special Instructions</Label>
                <Textarea
                  id="special-instructions"
                  placeholder="Any dietary restrictions, preferences or other instructions"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  rows={4}
                />
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Monthly Rate:</span>
                  <span className="font-bold text-lg">₹{calculateTotal().toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Based on hourly rate of ₹{cook.hourly_rate}, 8 hours daily, 20 days per month
                </p>
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={submitting || !date}
                >
                  {submitting ? "Processing..." : "Confirm Booking"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="bg-muted/20 text-xs text-muted-foreground">
            <p>
              By confirming this booking, you agree to hire {cook.profiles.first_name} {cook.profiles.last_name} for a monthly cooking service. You will be charged the monthly rate for a minimum of one month commitment.
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default CookHire;
