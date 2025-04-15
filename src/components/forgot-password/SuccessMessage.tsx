
import { Button } from "@/components/ui/button";

interface SuccessMessageProps {
  onTryAgain: () => void;
}

export const SuccessMessage = ({ onTryAgain }: SuccessMessageProps) => {
  return (
    <div className="space-y-4">
      <div className="bg-primary/10 p-4 rounded-md text-center">
        <p className="text-sm">
          We've sent a password reset link to your email. Please check your inbox and spam folder.
        </p>
      </div>
      <Button 
        variant="outline" 
        className="w-full"
        onClick={onTryAgain}
      >
        Try a different email
      </Button>
    </div>
  );
};
