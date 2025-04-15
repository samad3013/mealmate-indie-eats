
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
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
import { UtensilsCrossed, Mail, ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) {
        throw error;
      }
      
      setIsSubmitted(true);
      toast({
        title: "Password reset link sent",
        description: "Check your email for a password reset link.",
      });
    } catch (error) {
      console.error("Forgot password error:", error);
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again later.",
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
            <h1 className="text-3xl font-bold">Reset your password</h1>
            <p className="text-muted-foreground">
              {isSubmitted 
                ? "Check your email for a reset link" 
                : "Enter your email to receive a password reset link"}
            </p>
          </div>

          {!isSubmitted ? (
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
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-md text-center">
                <p className="text-sm">
                  We've sent a password reset link to your email. Please check your inbox and spam folder.
                </p>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsSubmitted(false)}
              >
                Try a different email
              </Button>
            </div>
          )}

          <div className="text-center">
            <Link to="/login" className="inline-flex items-center text-sm text-primary hover:underline">
              <ArrowLeft className="mr-1 h-4 w-4" /> Back to login
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
