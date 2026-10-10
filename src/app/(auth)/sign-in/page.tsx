"use client";


import { signIn } from '@/lib/auth-client';
import { Button, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const SignInPage = () => {
    const handleSocialSignIn = async (provider: "google" | "github") => {
        const { error } = await signIn.social({
            provider,
            callbackURL: '/',
        })
        if (error) {
            toast.error(error.message);
        } else {

            toast.success(`${name} সাইন আপ সফল হয়েছে`);
            router.push("/sign-in");
        }
    }
    const router = useRouter();



    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const { data: response, error } = await signIn.email({
            email: String(data.email),
            password: String(data.password),
        });

        if (error) {
            toast.error(error.message);
            return;
        }

        toast.success(`${response.user.name} সাইন ইন সফল হয়েছে`);


    };
    return (
        
        <section className="w-full bg-[#f0f5f0] px-5 py-10">
            <div className="mx-auto w-full max-w-130">
                
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-[#1c2a1f]">
                        সাইন ইন
                    </h1>
                    <p className="mt-2 text-sm text-[#5f6b62]">
                        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                    </p>
                </div>

                 
                <div className="rounded-3xl border border-[#e2e8e3] bg-[#fafcfa] p-6">
                    <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "Please enter a valid email address";
                                }
                                return null;
                            }}
                        >
                            <Label className="mb-2 block text-base font-medium text-[#1c2a1f]">
                                ইমেইল
                            </Label>
                            <Input
                                placeholder="you@example.com"
                                className="h-13 w-full rounded-xl border border-[#e0e6e1] bg-[#fbfdfb] px-4 text-base text-[#1c2a1f] shadow-none placeholder:text-[#2b3a2f] focus:border-[#058a3f] focus:outline-none focus:ring-2 focus:ring-[#058a3f]/20"
                            />
                            <FieldError className="mt-1 text-xs text-red-500" />
                        </TextField>

                        <TextField isRequired name="password" type="password">
                            <Label className="mb-2 block text-base font-medium text-[#1c2a1f]">
                                পাসওয়ার্ড
                            </Label>
                            <Input
                                type="password"
                                placeholder="কমপক্ষে ৮ অক্ষর"
                                className="h-13 w-full rounded-xl border border-[#e0e6e1] bg-[#fbfdfb] px-4 text-base text-[#1c2a1f] shadow-none placeholder:text-[#2b3a2f] focus:border-[#058a3f] focus:outline-none focus:ring-2 focus:ring-[#058a3f]/20"
                            />
                            <FieldError className="mt-1 text-xs text-red-500" />
                        </TextField>

                         
                        <Button
                            type="submit"
                            className="h-13 w-full rounded-xl bg-[#058a3f] text-base font-semibold text-white shadow-[0_4px_8px_rgba(5,138,63,0.3)] transition hover:bg-[#047a38]"
                        >
                            সাইন ইন
                        </Button>

                        
                        <div className="flex items-center gap-4 text-sm text-[#2b3a2f]">
                            <span className="h-0.5 flex-1 bg-[#e2e8e3]" />
                            অথবা
                            <span className="h-0.5 flex-1 bg-[#e2e8e3]" />
                        </div>

                         
                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                type="button"
                                className="flex h-13 items-center justify-center gap-2 rounded-xl border border-[#e0e6e1] bg-[#fbfdfb] px-2 text-[15px] font-semibold text-[#1c2a1f] shadow-none transition hover:bg-white"
                                onClick={() => handleSocialSignIn("google")}
                            >
                                <svg aria-hidden="true" className="size-4" viewBox="0 0 48 48">
                                    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
                                    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
                                    <path fill="#FBBC05" d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.9-6.1z" />
                                    <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
                                </svg>
                                Google দিয়ে চালিয়ে যান
                            </Button>

                            <Button
                                type="button"
                                className="flex h-13 items-center justify-center gap-2 rounded-xl border border-[#e0e6e1] bg-[#fbfdfb] px-2 text-[15px] font-semibold text-[#1c2a1f] shadow-none transition hover:bg-white"
                                onClick={() => handleSocialSignIn("github")}
                            >
                                <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.68-3.75-1.32-3.75-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.71 2.62 1.22 3.26.93.1-.72.39-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.12-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3.01 0 4.29-2.61 5.23-5.1 5.5.4.35.76 1.03.76 2.08V22c0 .29.2.63.76.53A11.1 11.1 0 0 0 12 .9Z" />
                                </svg>
                                GitHub দিয়ে চালিয়ে যান
                            </Button>
                        </div>

                        <p className="text-center text-base text-[#1c2a1f]">
                            অ্যাকাউন্ট নেই?{" "}
                            <Link className="font-medium text-[#058a3f] hover:underline" href="/sign-up">
                                সাইন আপ করুন
                            </Link>
                        </p>
                    </Form>
                </div>

                 
                <p className="mt-8 text-center text-base text-[#7a857d]">
                    <Link href="/" className="hover:text-[#1c2a1f]">
                        ← হোম পেজে ফিরে যান
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default SignInPage;