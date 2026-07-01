import { Metadata } from "next";
import { Suspense } from "react";
import SignInForm from "./form-sign-in";

export const metadata: Metadata = {
  title: "Sign In",
};
export default function Page() {
  return (
    <main className="flex  justify-center items-center flex-col px-4 min-h-svh">
      <Suspense>
        <SignInForm />
      </Suspense>
    </main>
  );
}
