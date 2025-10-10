import H1 from "@/components/h1";
import Link from "next/link";
import AuthForm from "@/components/auth-form";

export default function Page() {
  return (
    <main className="flex flex-col items-center">
      <H1 className="mb-5 text-center">Sign Up</H1>

      {/* ✅ AuthForm handles submission + errors itself */}
      <AuthForm type="signUp" />

      {/* ✅ Additional info / navigation */}
      <p className="mt-6 text-sm text-zinc-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Log in
        </Link>
      </p>
    </main>
  );
}