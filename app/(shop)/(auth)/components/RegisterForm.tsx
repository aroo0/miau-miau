"use client";

import {useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

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



type Variant = "LOGIN" | "REGISTER";

const RegisterSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
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


type RegisterFormValues = z.infer<typeof RegisterSchema>;

const RegisterForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const continueParam = searchParams.get("continue");
  const supabase = createClientComponentClient<Database>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }
  });


  const handleSignUp = async ({
    email,
    password,
    firstName,
    lastName,
  }: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError("Something went wrong.");
        console.log(error)
        return new NextResponse("Something went wrong.", { status: 400 });
      }

      router.push("/register/confirm");
    } catch (error) {
      return new NextResponse("Something went wrong.", { status: 400 });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
         <motion.div
              initial={{ opacity: 0}}
              animate={{ opacity: 1}}
              transition={{ ease: "easeInOut", duration: .5 }}
              
              
              key="login"
    
      className={twMerge(
        "grid w-full place-items-center gap-4 p-4 sm:p-8 pb-12 pt-20 lg:pt-0 sm:max-w-[700px] ",
        isLoading &&
          "after:absolute after:top-0 after:content-[''] after:w-full after:h-full cursor-wait"
      )}
    >
      <div className="grid w-full gap-4">
        <AuthNav type='REGISTER' />
        <Form {...form}>
          <form
            className="grid w-full place-items-stretch gap-8 p-2	"
            onSubmit={form.handleSubmit(handleSignUp)}
          >
            <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name (*)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="First Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                        <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name (*)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Last Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            </div>
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
              Register
            </Button>
          </form>
        </Form>
        <div className="mt-4">
          Already a Member?{" "}
          <Link href="/login" className="underline">
            Log in
          </Link>
        </div>
      </div>
    </motion.div>
  </>
  );
};

export default RegisterForm;
