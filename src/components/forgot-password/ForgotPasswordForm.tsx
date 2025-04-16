
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
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
import { Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onSuccess: () => void;
}

export const ForgotPasswordForm = ({ onSuccess }: ForgotPasswordFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "sy9129@srmist.edu.in", // Pre-fill admin email
    },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    setIsLoading(true);
    try {
      // Special handling for the admin user
      if (values.email === "sy9129@srmist.edu.in") {
        // For admin user, attempt to sign in directly with the predefined password
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: "6262173362", // Use the predefined password
        });

        if (signInError) {
          // If sign in fails (user might not exist or password is incorrect)
          // Let's try to sign up the admin user
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: values.email,
            password: "6262173362",
            options: {
              data: {
                first_name: "Admin",
                last_name: "User",
                role: "admin",
              }
            }
          });

          if (signUpError) {
            // If both sign in and sign up fail, display an error
            toast({
              title: "Authentication error",
              description: "Could not authenticate admin user. Please contact support.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Admin account created",
              description: "Admin account has been created. You can now login with the provided credentials.",
            });
          }
        }

        // Regardless of the result, redirect to login page for the admin user
        toast({
          title: "Admin authentication",
          description: "Please use the predefined password: 6262173362",
        });
        navigate('/login');
        return;
      }

      // For non-admin users, proceed with the regular password reset flow
      const { data, error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        throw error;
      }

      onSuccess();
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

  // Get the current email value from the form
  const currentEmail = form.watch("email");

  return (
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
          {isLoading ? "Sending..." : currentEmail === "sy9129@srmist.edu.in" ? "Login as Admin" : "Send Reset Link"}
        </Button>
      </form>
    </Form>
  );
};
