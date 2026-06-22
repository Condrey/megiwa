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
import { Checkbox } from "@/components/ui/checkbox";
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
import { signInSchema, SignInSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SignInForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [urlRedirect] = useState<string | undefined>(
    searchParams.get("redirect") as string,
  );
  const [urlEmail] = useState<string | undefined>(
    searchParams.get("email") as string,
  );

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    values: {
      email: urlEmail || "",
      password: "",
      rememberMe: true,
    },
  });

  function submitForm({ email, rememberMe, password }: SignInSchema) {
    setError(undefined);
    startTransition(async () => {
      const { error } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
        callbackURL: urlRedirect || "/",
      });
      if (error) {
        setError(error.message || "Something went wrong.");
      } else {
        toast.success("Sign in successful");
        router.push("/");
      }
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)} className="w-full">
        <Card className=" max-w-md mx-auto w-full">
          <CardHeader>
            <CardTitle>Login into account</CardTitle>
            <CardDescription>Enter your information to access</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
              name="rememberMe"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="rememberMe"
                      />
                      <FormLabel htmlFor="rememberMe">Remember me</FormLabel>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div role="alert" className="text-destructive">
              {error}
            </div>
            <LoadingButton loading={isPending} className="w-full">
              Sign In
            </LoadingButton>
          </CardContent>
          <CardFooter className="flex flex-row justify-center">
            <span className="text-center">
              Do not have an account?{" "}
              <Link href={"/sign-up"} className="underline hover:text-primary">
                SignUp
              </Link>
            </span>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
