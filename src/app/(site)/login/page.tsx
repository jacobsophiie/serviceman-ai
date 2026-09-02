import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/account/LoginForm";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in with the mobile number you used for your job to see your quotes.",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <section className="bg-cloud">
      <div className="mx-auto max-w-md px-4 py-16 sm:px-6 sm:py-24">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </section>
  );
}
