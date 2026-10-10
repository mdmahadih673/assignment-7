import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      
      <h2 className="text-4xl font-bold text-red-600 mb-4">৪০৪ - পেজটি পাওয়া যায়নি!</h2>
      <p className="text-gray-600 mb-8">আপনি যে পেজটি খুঁজছেন তা সম্ভবত মুছে ফেলা হয়েছে বা লিঙ্কটি ভুল।</p>
      
      
      <Link href="/">
        <button className="bg-[#058a3f] hover:bg-[#047a38] transition text-white px-6 py-2 rounded-lg font-medium">
          হোম পেজে ফিরে যান
        </button>
      </Link>
    </div>
  );
}
