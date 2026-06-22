import { Metadata } from "next";
import SignInForm from "./form-sign-in";

export const metadata: Metadata = {
  title: "Sign in",
};
export default function Page() {
  return (
    <main className="flex  justify-center items-center flex-col px-4 min-h-svh">
      <SignInForm />
    </main>
  );
}
