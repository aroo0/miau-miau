"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import AuthNav from "./AuthNav";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Must be 5 or more characters long" }),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const continueParam = searchParams.get("continue");
  const supabase = createClientComponentClient<Database>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = async ({ email, password }: LoginFormValues) => {
    setIsLoading(true);
    console.log("handle");
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError("Something went wrong.");
        return new NextResponse("Something went wrong.", { status: 400 });
      }

      router.push(`${location.origin}/${continueParam}`);
      router.refresh()
    } catch (error) {
      return new NextResponse("Something went wrong.", { status: 400 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className={twMerge(
          "grid w-full place-items-center gap-4 p-4 sm:p-8 pb-12 pt-20 lg:pt-0 sm:max-w-[700px] ",
          isLoading &&
            "after:absolute after:top-0 after:content-[''] after:w-full after:h-full cursor-wait"
        )}
      >
        <div className="grid w-full gap-4">
          <AuthNav type={"LOGIN"} />
          <Form {...form}>
            <form
              className="grid w-full place-items-stretch gap-8 p-2	"
              onSubmit={form.handleSubmit(handleSignIn)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Email address"
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
                    <div className="flex w-full justify-between items-center">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="/"
                        className="uppercase text-xs hover:italic tracking-widest"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="justify-self-start	"
                disabled={isLoading}
              >
                Sign in
              </Button>
            </form>
          </Form>
          <div className="mt-4">
            Not a Miau Miau member?{" "}
            <Link href="/register" className="underline">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
