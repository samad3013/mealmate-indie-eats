
import { Layout } from "@/components/layout";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the form data to a server
    console.log("Form submitted:", formData);
    
    toast({
      title: "Message Sent",
      description: "We've received your message and will get back to you soon.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              Have questions about MealMate? We're here to help!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-card rounded-lg p-6 border text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 bg-primary/10 rounded-full mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-sm text-muted-foreground mb-2">
                For general inquiries
              </p>
              <a href="mailto:contact@mealmate.com" className="text-primary text-sm font-medium">
                contact@mealmate.com
              </a>
            </div>
            
            <div className="bg-card rounded-lg p-6 border text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 bg-primary/10 rounded-full mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Mon-Fri, 9am-6pm
              </p>
              <a href="tel:+919876543210" className="text-primary text-sm font-medium">
                +91 987-654-3210
              </a>
            </div>
            
            <div className="bg-card rounded-lg p-6 border text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 bg-primary/10 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Find our office
              </p>
              <span className="text-primary text-sm font-medium">
                Koramangala, Bangalore, India
              </span>
            </div>
          </div>
          
          <div className="bg-card border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is your message about?"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  rows={5}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full md:w-auto">
                Send Message
              </Button>
            </form>
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  question: "How does MealMate work?",
                  answer: "MealMate connects university students with local home cooks. Students can browse meals, place orders, and enjoy home-cooked food. Cooks can sign up, list their meals, and earn income."
                },
                {
                  question: "How do I become a cook on MealMate?",
                  answer: "Simply register on our platform as a cook, complete your profile, upload your meal offerings, set your prices, and start receiving orders."
                },
                {
                  question: "Is there a delivery option?",
                  answer: "Yes, many of our cooks offer delivery within a certain radius. You can also opt for pickup if you prefer."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-card border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
