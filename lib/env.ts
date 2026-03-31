import {createEnv} from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z.url(),
        APP_ENV: z.enum(["development", "production", "test"]).default("development"),
        APP_DEBUG: z.string()
            .refine((s) => s === "true" || s === "false")
            .transform((s) => s === "true"),
        BETTER_AUTH_SECRET: z.string().min(1),
        BETTER_AUTH_REQUIRE_EMAIL_VERIFICATION: z.string()
            .refine((s) => s === "true" || s === "false")
            .transform((s) => s === "true"),
        RESEND_API_KEY: z.string().min(1),
        RESEND_FROM_EMAIL: z.string(),
        GOOGLE_CLIENT_ID: z.string().min(12),
        GOOGLE_CLIENT_SECRET: z.string().min(12),
    },
    client: {
        NEXT_PUBLIC_APP_NAME: z.string().min(1),
        NEXT_PUBLIC_APP_DESCRIPTION: z.string().min(5),
        NEXT_PUBLIC_URL: z.string().min(1)
    },
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        APP_ENV: process.env.APP_ENV,
        APP_DEBUG: process.env.APP_DEBUG,
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
        BETTER_AUTH_REQUIRE_EMAIL_VERIFICATION: process.env.BETTER_AUTH_REQUIRE_EMAIL_VERIFICATION,
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

        NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
        NEXT_PUBLIC_APP_DESCRIPTION: process.env. NEXT_PUBLIC_APP_DESCRIPTION,
        NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL
    },
});