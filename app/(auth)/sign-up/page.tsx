import { Metadata } from "next";
import { Suspense } from "react";
import SignUpForm from "./form-sign-up";

export const metadata: Metadata = {
  title: "Self Registration",
};
export default function Page() {
  return (
    <main className="flex  justify-center items-center flex-col px-4 min-h-svh">
      <Suspense>
        <SignUpForm />
      </Suspense>
    </main>
  );
}
