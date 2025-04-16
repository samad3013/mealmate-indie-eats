
import { Layout } from "@/components/layout";
import { Separator } from "@/components/ui/separator";
import { UtensilsCrossed, Users, MapPin, ShoppingBag, Shield, Heart } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center h-16 w-16 bg-primary/10 rounded-full mb-4">
              <UtensilsCrossed className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">About MealMate</h1>
            <p className="text-xl text-muted-foreground">
              Connecting students with local home cooks for authentic, affordable meals.
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none mb-12">
            <p>
              MealMate was born from a simple observation: university students miss home-cooked meals, and many talented home cooks in our communities have recipes to share and skills to offer.
            </p>
            
            <p>
              Our platform creates a connection that benefits both parties - students get affordable, authentic, home-cooked meals, while home cooks earn extra income doing what they love.
            </p>
            
            <h2>Our Mission</h2>
            <p>
              To create a thriving community marketplace that celebrates India's diverse culinary traditions, supports local home cooks, and makes quality homemade food accessible to students across the country.
            </p>
            
            <h2>How It Works</h2>
            <ol>
              <li>
                <strong>Browse:</strong> Students browse through meals offered by verified local home cooks in their area.
              </li>
              <li>
                <strong>Order:</strong> Place an order for a meal that appeals to you, with options for delivery or pickup.
              </li>
              <li>
                <strong>Enjoy:</strong> Receive your freshly prepared meal and enjoy the taste of authentic home cooking.
              </li>
            </ol>
            
            <h2>For Home Cooks</h2>
            <p>
              If you love cooking and want to share your culinary skills while earning extra income, join MealMate as a home cook. You set your own prices, prepare meals in your own kitchen, and build a customer base of appreciative students.
            </p>
          </div>
          
          <Separator className="my-12" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 bg-primary/10 rounded-full mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">300+</h3>
              <p className="text-muted-foreground">Active Home Cooks</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 bg-primary/10 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">15+</h3>
              <p className="text-muted-foreground">Cities Across India</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 bg-primary/10 rounded-full mb-4">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">10,000+</h3>
              <p className="text-muted-foreground">Meals Served</p>
            </div>
          </div>
          
          <div className="bg-card border rounded-lg p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Safety First</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  All home cooks are verified and meals are prepared following strict hygiene guidelines. We regularly conduct quality checks to ensure food safety.
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Community Support</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  We're building more than just a food marketplace - we're creating a community that celebrates homemade cooking and cultural exchange.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Our Founders</h2>
            <p className="text-muted-foreground mb-8">
              MealMate was founded by innovative students who believe in the power of homemade food to create connection and community.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl mx-auto">
              {[
                {
                  name: "Aditya Sharma",
                  role: "Co-Founder & CEO",
                  image: "https://randomuser.me/api/portraits/men/32.jpg"
                },
                {
                  name: "Samad Affan Yusufzai",
                  role: "Co-Founder & CTO",
                  image: "https://randomuser.me/api/portraits/men/41.jpg"
                }
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-24 h-24 rounded-full mx-auto"
                    />
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
