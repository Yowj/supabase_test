import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

function EmailConfirmation() {
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const { user, session } = useAuth();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  const handleResendEmail = async () => {
    if (!user?.email) {
      toast.error("No email found to resend confirmation");
      return;
    }

    setIsResending(true);
    
    try {
      // In a real app, you'd call Supabase resend function here
      toast.success("Confirmation email sent! Check your inbox.");
    } catch (error) {
      toast.error(error.message || "Failed to resend email");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md text-center">
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">📧</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900">
            Check your email
          </h2>
          
          <p className="text-gray-600">
            We've sent a confirmation link to your email address. 
            Click the link to verify your account and get started.
          </p>
        </div>

        <div className="space-y-4">
          <div className="text-sm text-gray-500">
            Didn't receive an email?
          </div>
          
          <button
            onClick={handleResendEmail}
            disabled={isResending}
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 disabled:opacity-50"
          >
            {isResending ? "Sending..." : "Resend confirmation email"}
          </button>
          
          <button
            onClick={() => navigate("/signin")}
            className="w-full text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailConfirmation;