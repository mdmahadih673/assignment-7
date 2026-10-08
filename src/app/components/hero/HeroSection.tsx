import hero from '@/assets/bazar-hero.png'
import Link from 'next/link';
import Image from 'next/image';
import { connection } from 'next/server';
import { Suspense } from 'react';

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


const HeroSectionPage = async () => {


    return (
        <div className="container mx-auto my-8 px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 rounded-2xl bg-white p-6 sm:p-8 lg:p-12 shadow-sm border border-gray-100">


                <div className="flex-1 space-y-4 text-center md:text-left">

                    <div className="inline-flex items-center justify-center rounded-full bg-green-100 px-4 py-1.5">
                        <Suspense fallback={<span aria-hidden="true">&nbsp;</span>}>
                            <HeaderDate />
                        </Suspense>
                    </div>


                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                        আজকের বাজারের দাম এক নজরে
                    </h1>


                    <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>


                    <div className="pt-2">
                        <Link href="/products">
                            <button className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 transition-colors">
                                সব পণ্য দেখুন
                            </button>
                        </Link>
                    </div>
                </div>


                <div className="flex-shrink-0 w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px]">
                    <Image
                        src={hero}
                        alt="বাজারের তাজা সবজি ও ফলমূল"
                        width={400}
                        height={300}
                        className="h-auto w-full object-contain"
                        priority
                    />
                </div>

            </div>
        </div>
    );
};


export default HeroSectionPage;