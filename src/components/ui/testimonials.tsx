
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

function Testimonial({ content, author, role, avatar, rating }: TestimonialProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`h-5 w-5 ${i < rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}`} 
            />
          ))}
        </div>
        <blockquote className="text-lg mb-6">"{content}"</blockquote>
        <div className="flex items-center gap-3">
          <img 
            src={avatar} 
            alt={author} 
            className="w-12 h-12 rounded-full object-cover" 
          />
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function Testimonials() {
  const testimonials = [
    {
      content: "As a student far from home, MealMate has been a lifesaver! Home-cooked meals at affordable prices, and the taste reminds me of my mom's cooking.",
      author: "Rahul Verma",
      role: "Engineering Student, IIT Delhi",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5
    },
    {
      content: "I've been cooking for students for 6 months now. MealMate has given me a platform to share my passion for cooking and earn some extra income!",
      author: "Anita Desai",
      role: "Home Cook, Mumbai",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5
    },
    {
      content: "The variety of regional cuisines available is amazing. I can get authentic South Indian breakfast even though I'm studying in North India!",
      author: "Kavita Nair",
      role: "Medical Student, AIIMS",
      avatar: "https://randomuser.me/api/portraits/women/29.jpg",
      rating: 4
    }
  ];

  return (
    <section className="py-16 bg-accent/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What People Say About Us</h2>
          <p className="text-muted-foreground">
            Join thousands of students and home cooks who are already part of our community.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <Testimonial key={i} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
