
import { Link } from "react-router-dom";
import { UtensilsCrossed, Instagram, Twitter, Facebook, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <UtensilsCrossed className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">MealMate</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Connecting students with local home cooks for affordable, homemade meals.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/meals" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Meals
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">For Students</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/register" className="text-muted-foreground hover:text-primary transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/about#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/contact#faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary cursor-not-allowed opacity-60">
                  Student Offers
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">For Cooks</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/register?role=cook" className="text-muted-foreground hover:text-primary transition-colors">
                  Become a Cook
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary cursor-not-allowed opacity-60">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary cursor-not-allowed opacity-60">
                  Guidelines
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary cursor-not-allowed opacity-60">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} MealMate. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="#" className="text-sm text-muted-foreground hover:text-primary cursor-not-allowed opacity-60">
              Terms of Service
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-primary cursor-not-allowed opacity-60">
              Privacy Policy
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-primary cursor-not-allowed opacity-60">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
