
import { UtensilsCrossed, Clock, MapPin, Star, DollarSign, UtilityPole } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureProps) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: <UtensilsCrossed className="h-6 w-6" />,
      title: "Home-cooked Meals",
      description: "Enjoy authentic, homemade food prepared with love by local home cooks."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Convenient Timing",
      description: "Schedule meal deliveries according to your class timetable."
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Local Cooks",
      description: "Find cooks near your campus or accommodation for quick deliveries."
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Quality Assurance",
      description: "All cooks are verified and meals are prepared in hygienic conditions."
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Student-friendly Prices",
      description: "Affordable meal options that fit your student budget."
    },
    {
      icon: <UtilityPole className="h-6 w-6" />,
      title: "Support Local",
      description: "Help local home cooks earn an income while you enjoy their food."
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose MealMate?</h2>
          <p className="text-muted-foreground">
            We connect hungry students with local home cooks for affordable, homemade meals.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
