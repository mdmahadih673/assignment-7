"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { Avatar, Spinner } from "@heroui/react";
import Link from "next/link";
import { toast } from "react-toastify";

const ButtonsPage = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        const result = await signOut();

        if (result.error) {
            toast.error(result.error.message || "সাইন আউট ব্যর্থ হয়েছে");
            return;
        }

        toast.success("সাইন আউট সফল হয়েছে");
    };
    if (isPending) {
        return (
            <div className="flex flex-col items-center gap-2">
                <Spinner size="xl" />
                <span className="text-xs text-muted">Extra Large</span>
            </div>
        )
    }

    return (
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
            {user ? (
                <div className='flex items-center  gap-2'>
                    <Link href={'/profile'}  >
                        <div className="flex justify-center  items-center gap-4">
                            <Avatar>
                                <Avatar.Image
                                    alt='blue'
                                    src={user.image as string}
                                />
                                <Avatar.Fallback>B</Avatar.Fallback>
                            </Avatar>

                        </div>
                        {session?.user ? <span className="text-green-700 font-bold" >Welcome, {session.user.name}</span> : null}
                    </Link>
                    <button className='btn btn-error' onClick={handleSignOut}>Sign out</button>

                </div>
            ) : (
                <div>
                    <Link href={'/sign-in'}>
                        <button className="text-sm font-semibold cursor-pointer text-gray-700 hover:text-green-700 transition-colors px-2 py-1">
                            সাইন ইন
                        </button>
                    </Link>

                    <Link href={'/sign-up'}>
                        <button className="rounded-lg bg-green-600 px-4 py-2 cursor-pointer text-sm font-semibold text-white shadow-sm hover:bg-green-700 transition-colors">
                            সাইন আপ
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ButtonsPage;