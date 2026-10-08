"use client";

import Link from "next/link";



const ButtonsPage = () => {
    return (
        <div >
            <Link href={'/'}>
                <button className="text-sm font-semibold cursor-pointer text-gray-700 hover:text-green-700 transition-colors px-2 py-1">
                    সাইন ইন
                </button>
            </Link>

            <Link href={'/'}>
                <button className="rounded-lg bg-green-600 px-4 py-2 cursor-pointer text-sm font-semibold text-white shadow-sm hover:bg-green-700 transition-colors">
                    সাইন আপ
                </button>
            </Link>

        </div>
    );
};

export default ButtonsPage;