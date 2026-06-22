"use client";

import { PasswordInput } from "@/components/password-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { authClient } from "@/lib/auth-client";
import { signUpSchema, SignUpSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  function submitForm({ email, name, password }: SignUpSchema) {
    startTransition(async () => {
      setError(undefined);
      const { error } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: "/",
      });
      if (error) {
        setError(error.message || "Something went wrong.");
      } else {
        toast.success("Sign up successful");
        router.push("/");
      }
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)} className="w-full">
        <Card className=" max-w-md mx-auto w-full">
          <CardHeader>
            <CardTitle>Self Registration</CardTitle>
            <CardDescription>
              Enter your information to register
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="e.g. someone@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="re-enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div role="alert" className="text-destructive">
              {error}
            </div>
            <LoadingButton loading={isPending} className="w-full">
              Register
            </LoadingButton>
          </CardContent>
          <CardFooter className="flex flex-row justify-center">
            <span className="text-center">
              Already have an account?{" "}
              <Link href={"/sign-in"} className="underline hover:text-primary">
                Sign in
              </Link>
            </span>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
