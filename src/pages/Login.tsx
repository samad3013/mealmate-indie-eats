
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UtensilsCrossed, Mail, Lock } from "lucide-react";
import { Layout } from "@/components/layout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginValues) => {
    setIsLoading(true);
    try {
      // Special handling for admin user - hardcoded credentials for direct demo access
      if (values.email === "sy9129@srmist.edu.in" && values.password === "6262173362") {
        // First try to sign in directly
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

        if (signInError) {
          console.log("Sign in failed, trying to sign up admin", signInError);
          
          // Try to create the admin account
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
            options: {
              data: {
                first_name: "Admin",
                last_name: "User",
                role: "admin",
              },
              // Skip email confirmation for this test account
              emailRedirectTo: window.location.origin + "/login"
            }
          });

          if (signUpError) {
            console.error("Admin sign up error:", signUpError);
            toast({
              title: "Authentication error",
              description: "Could not create admin user. The account might exist but needs email verification.",
              variant: "destructive",
            });
            setIsLoading(false);
            return;
          }
          
          // If account created successfully, attempt admin auto-login (bypassing email verification for demo)
          // This is a special case for this specific test admin account
          const { data: adminSignInData, error: adminSignInError } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
          });

          if (adminSignInError) {
            console.error("Admin sign in after signup failed:", adminSignInError);
            toast({
              title: "Email verification required",
              description: "Admin account created but email verification is required. Please check your email for a verification link.",
              variant: "destructive",
            });
            setIsLoading(false);
            return;
          }

          // Successfully signed in after creating account
          toast({
            title: "Login successful",
            description: "Welcome Admin!",
          });
          navigate("/");
        } else {
          // Successfully signed in with existing account
          toast({
            title: "Login successful",
            description: "Welcome back Admin!",
          });
          navigate("/");
        }
      } else {
        // Regular user login
        const { data, error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

        if (error) {
          throw error;
        }

        if (data.user) {
          toast({
            title: "Login successful",
            description: "Welcome back!",
          });
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto flex items-center justify-center min-h-screen py-12">
        <div className="mx-auto w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="bg-primary/10 p-3 rounded-full">
              <UtensilsCrossed className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Enter your email"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
