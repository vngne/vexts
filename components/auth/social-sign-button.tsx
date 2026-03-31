import { client } from '@/lib/auth/client';
import {Button} from "@/components/ui/button";

export function SocialSignInButton({provider}: { provider: 'google' | 'facebook';
}) {
    const handleSignIn = async () => {
        await client.signIn.social({
            provider,
            callbackURL: '/'
        });
    };

    return (
        <Button onClick={handleSignIn} variant="outline" className="w-full">
            Sign in with {provider === 'google' ? 'Google' : 'Facebook'}
        </Button>
    );
}