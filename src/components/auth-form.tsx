"use client";

import { logIn, signUp } from "@/actions/actions";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import AuthFormBtn from "./auth-form-btn";
import { cn } from "@/lib/utils";

type AuthFormProps = {
  type: "logIn" | "signUp";
};

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const [signUpState, dispatchSignUp] = useFormState(signUp, undefined);
  const [logInState, dispatchLogIn] = useFormState(logIn, undefined);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // ✅ Detect successful signup/login (NextAuth handles redirect)
  useEffect(() => {
    if (signUpState?.success || logInState?.success) {
      setIsRedirecting(true);

      // optional delay for better UX
      const timer = setTimeout(() => {
        router.refresh(); // refresh session if needed
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [signUpState, logInState, router]);

  return (
    <form
      action={type === "logIn" ? dispatchLogIn : dispatchSignUp}
      className={cn(
        isRedirecting
          ? "opacity-70 pointer-events-none"
          : "opacity-100 transition-opacity"
      )}
    >
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required maxLength={100} />
      </div>

      <div className="mb-4 mt-2 space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          maxLength={100}
        />
      </div>

      {/* 🔹 Show normal button or redirecting state */}
      <div className="flex flex-col items-center">
        <AuthFormBtn type={type} isRedirecting={isRedirecting} />

        {isRedirecting && (
          <p className="text-sm text-zinc-500 mt-3 animate-pulse">
            Redirecting...
          </p>
        )}
      </div>

      {/* 🔹 Error message display */}
      {(signUpState?.message || logInState?.message) && !isRedirecting && (
        <p className="text-red-500 text-sm mt-3 text-center">
          {signUpState?.message || logInState?.message}
        </p>
      )}
    </form>
  );
}
