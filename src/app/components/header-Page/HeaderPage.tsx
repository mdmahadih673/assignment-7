
import logo from "@/assets/logo-icon.png";
import Image from "next/image";
import { connection } from "next/server";
import { Suspense } from "react";
import ButtonsPage from "./ButtonsPage";
import Link from "next/link";
import NavbarLinks from "../NavbarLinks/NavbarLinks";

const HeaderDate = async () => {
    await connection();

    const date = new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return <span>{date}</span>;
};

const HeaderPage = () => {
    return (
        <header className="w-full border-b border-gray-200 bg-white shadow-sm ">

            <div className="flex justify-between container mx-auto my-2">
                <div className="flex items-center gap-3">
                    <Link href={'/'} className="shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-green-50">

                            <Image
                                src={logo}
                                alt="বাজার দর Logo"
                                width={40}
                                height={40}
                                className="h-10 w-10 object-contain p-1"
                                priority
                            />
                        </div>
                    </Link>

                    <Link href={'/'}>
                        <div className="leading-tight">
                            <h1 className="text-xl font-bold tracking-tight text-green-700 sm:text-2xl">
                                বাজার দর
                            </h1>
                            <div className="mt-0.5 text-[10px] font-medium text-gray-500 sm:text-xs">
                                <Suspense fallback={<span aria-hidden="true">&nbsp;</span>}>
                                    <HeaderDate />
                                </Suspense>
                            </div>
                        </div>
                    </Link>
                </div>
                <div>
                    <ButtonsPage />
                </div>
            </div>
            <NavbarLinks />
        </header>
    );
};

export default HeaderPage;