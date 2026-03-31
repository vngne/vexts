"use client";

import {cn} from "@/lib/utils";
import {z} from "zod";
import React, {ComponentProps, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {client} from "@/lib/auth/client";
import {CircleAlert, Loader2} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import InputPassword from "@/components/ui/input-password";
import {SocialSignInButton} from "@/components/auth/social-sign-button";

const signInSchema = z.object({
    email: z.string().email().min(2, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export function SignInForm({className, ...props}: ComponentProps<"form">) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof signInSchema>) {
        // Handle form submission logic here
        console.log("Form submitted with values:", values);

        const {data, error,} = await client.signIn.email(
            {
                email: values.email,
                password: values.password,
                callbackURL: "/",
                rememberMe: false,
            },
            {
                onRequest: (ctx) => {
                    console.log("Request context:", ctx);
                    setLoading(true);
                },
                onSuccess: (ctx) => {
                    console.log("Sign in successfully", ctx);
                },
                onError: (ctx) => {
                    console.log("Error during sign in", ctx);
                    setError(ctx.error.message);
                    setLoading(false);
                },
            }
        );
        console.log(data, error);
    }

    return (
        <div className="flex flex-col gap-6">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={cn("flex flex-col gap-6", className)}
                    {...props}
                >
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-2xl font-bold">Login to your account</h1>
                        <p className="text-muted-foreground text-sm text-balance">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <div className="grid gap-6">
                        {error && (
                            <Alert variant="destructive">
                                <CircleAlert/>
                                <AlertTitle>Error!</AlertTitle>
                                <AlertDescription>
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example@mail.com" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Password</FormLabel>
                                        <Link href="/forgot-password" className="text-sm underline">
                                            Forgot Password
                                        </Link>
                                    </div>
                                    <FormControl>
                                        <InputPassword placeholder="••••••" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <Loader2 size={16} className="animate-spin"/>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </div>
                    <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="underline underline-offset-4">
                            Sign up
                        </Link>
                    </div>
                </form>
            </Form>

            <div
                className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
            </div>
                <SocialSignInButton provider="google"/>
        </div>
    );
}
