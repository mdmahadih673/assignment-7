const Footer = () => {
    return (
        <footer className="border-t border-gray-200 bg-white mt-10">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">

                    
                    <p className="text-sm font-semibold text-gray-800">
                        বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                    </p>

                    
                    <p className="text-xs text-gray-500">
                        সকল দাম সূত্রভিত্তিক; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                    </p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;