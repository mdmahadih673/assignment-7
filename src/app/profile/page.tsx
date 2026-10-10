"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { Button, FieldError, Form, Input, Label, Spinner, TextField } from "@heroui/react";
import Image from "next/image";

const ProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending } = useSession();
    const user = session?.user;
    const [saving, setSaving] = useState(false);

    if (isPending || !user) {
        return (
            <div className="flex min-h-64 items-center justify-center">
                <Spinner aria-label="প্রোফাইল লোড হচ্ছে" />
            </div>
        );
    }

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: { onSuccess: () => router.push("/sign-in") },
        });
    };

    const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const name = String(new FormData(e.currentTarget).get("name") ?? "").trim();
        if (!name) return;
        setSaving(true);
        await authClient.updateUser({ name });
        setSaving(false);
    };

    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-6">

            <h1 className="text-3xl font-bold tracking-tight text-[#1c2a1f]">
                আমার প্রোফাইল
            </h1>
            <p className="mt-1 text-sm text-[#5f6b62]">
                আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
            </p>


            <div className="mt-6 flex items-center justify-between gap-4 rounded-3xl border border-[#e2e8e3] bg-[#fafcfa] p-6">
                <div className="flex items-center gap-5">
                    {user.image ? (

                        <Image
                            src={user.image}
                            alt={user.name}
                            className="size-[88px] rounded-2xl bg-[#eef1ee] object-cover"
                        />
                    ) : (
                        <div className="flex size-[88px] items-center justify-center rounded-2xl bg-[#eef1ee] text-3xl font-bold text-[#058a3f]">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div>
                        <p className="text-xl font-medium text-[#1c2a1f]">{user.name}</p>
                        <p className="mt-1 text-base text-[#5f6b62]">{user.email}</p>
                    </div>
                </div>

                <Button
                    type="button"
                    onClick={handleSignOut}
                    className="flex h-11 items-center gap-2 rounded-lg border border-[#d92020] bg-transparent px-5 text-sm font-semibold text-[#d92020] shadow-none transition hover:bg-red-50"
                >
                    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 14 4 9l5-5" />
                        <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
                    </svg>
                    সাইন আউট
                </Button>
            </div>


            <div className="mt-6 rounded-3xl border border-[#e2e8e3] bg-[#fafcfa] p-6">
                <h2 className="text-lg font-semibold text-[#1c2a1f]">তথ্য</h2>

                <Form className="mt-6 flex flex-col gap-4 px-6 pb-4" onSubmit={handleUpdate}>
                    <TextField isRequired name="name" defaultValue={user.name}>
                        <Label className="mb-2 block text-base font-medium text-[#1c2a1f]">
                            নাম
                        </Label>
                        <Input className="h-[46px] w-full rounded-xl border border-[#e0e6e1] bg-[#fbfdfb] px-4 text-base text-[#1c2a1f] shadow-none focus:border-[#058a3f] focus:outline-none focus:ring-2 focus:ring-[#058a3f]/20" />
                        <FieldError className="mt-1 text-xs text-red-500" />
                    </TextField>

                    <Button
                        type="submit"
                        isDisabled={saving}
                        className="h-[46px] w-full rounded-xl bg-[#058a3f] text-base font-semibold text-white shadow-[0_4px_8px_rgba(5,138,63,0.3)] transition hover:bg-[#047a38]"
                    >
                        {saving ? "আপডেট হচ্ছে..." : "আপডেট"}
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default ProfilePage;