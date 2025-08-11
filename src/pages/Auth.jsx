import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

export default function Auth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mode, setMode] = useState(() => searchParams.get("mode") || "sign_in");

  useEffect(() => {
    setSearchParams({ mode }, { replace: true });
  }, [mode, setSearchParams]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100">
      <motion.div
        className="max-w-md w-full space-y-6 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Header */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            className="text-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-3xl font-light text-slate-800 mb-2 tracking-tight">
              {mode === "sign_up" ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-slate-500 text-sm">
              {mode === "sign_up" ? "Join us and get started today" : "Sign in to your account"}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Mode Toggle Tabs */}
        <div className="flex bg-slate-50/50 rounded-xl p-1 relative border border-slate-200/50">
          <motion.div
            className="absolute top-1 bottom-1 bg-white rounded-lg shadow-sm border border-slate-200/30"
            initial={false}
            animate={{
              left: mode === "sign_in" ? "4px" : "50%",
              width: "calc(50% - 4px)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <button
            onClick={() => handleModeChange("sign_in")}
            className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-colors relative z-10 ${
              mode === "sign_in" ? "text-slate-700" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => handleModeChange("sign_up")}
            className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-colors relative z-10 ${
              mode === "sign_up" ? "text-slate-700" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Auth Component */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Social Providers */}
            <SupabaseAuth
              supabaseClient={supabase}
              view="sign_in"
              socialLayout="horizontal"
              onlyThirdPartyProviders
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: "#475569",
                      brandAccent: "#334155",
                    },
                  },
                },
              }}
              providers={["google", "github"]}
            />

            {/* OR Divider */}
            <div className="relative flex items-center justify-center my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-400 font-medium">or</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <SupabaseAuth
              supabaseClient={supabase}
              view={mode}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: "#475569",
                      brandAccent: "#334155",
                    },
                  },
                },
              }}
              providers={[]}
              showLinks={false}
              redirectTo={`${window.location.origin}/`}
            />
          </motion.div>
        </AnimatePresence>

        {/* Footer Message */}
        <motion.div
          className="text-center text-xs text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <p>By continuing, you agree to our</p>
          <div className="mt-2 space-x-3">
            <a
              href="#"
              className="text-slate-500 hover:text-slate-700 transition-colors underline-offset-4 hover:underline"
            >
              Terms of Service
            </a>
            <span className="text-slate-300">•</span>
            <a
              href="#"
              className="text-slate-500 hover:text-slate-700 transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
