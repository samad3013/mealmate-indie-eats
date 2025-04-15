
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-b from-accent to-background pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              <span className="text-primary">Homemade Food</span> Delivered to Your Doorstep
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0">
              Connecting students with local home cooks offering affordable, 
              authentic homemade meals across India.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" asChild>
                <Link to="/meals">Browse Meals</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/register">Become a Cook</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square md:aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80" 
                alt="Delicious Indian Food" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="Chef" 
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium text-sm">Priya Sharma</p>
                  <p className="text-muted-foreground text-xs">Home Cook</p>
                </div>
              </div>
              <p className="text-sm">"I love sharing my family recipes with students!"</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
}
