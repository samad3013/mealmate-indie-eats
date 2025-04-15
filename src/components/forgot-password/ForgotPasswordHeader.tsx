
import { UtensilsCrossed } from "lucide-react";

export const ForgotPasswordHeader = ({ isSubmitted }: { isSubmitted: boolean }) => {
  return (
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
  );
};
