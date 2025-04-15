
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout";
import { ForgotPasswordForm } from "@/components/forgot-password/ForgotPasswordForm";
import { SuccessMessage } from "@/components/forgot-password/SuccessMessage";
import { ForgotPasswordHeader } from "@/components/forgot-password/ForgotPasswordHeader";

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSuccess = () => {
    setIsSubmitted(true);
  };

  const handleTryAgain = () => {
    setIsSubmitted(false);
  };

  return (
    <Layout>
      <div className="container mx-auto flex items-center justify-center min-h-screen py-12">
        <div className="mx-auto w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
          <ForgotPasswordHeader isSubmitted={isSubmitted} />

          {!isSubmitted ? (
            <ForgotPasswordForm onSuccess={handleSuccess} />
          ) : (
            <SuccessMessage onTryAgain={handleTryAgain} />
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
