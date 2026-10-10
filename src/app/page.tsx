import { ToastContainer } from "react-toastify";
import HeroSectionPage from "./components/hero/HeroSection";
import HighPriceProduct from "./products/HighPriceProduct";

export default function Home() {
  return (
    <div >
      <ToastContainer />
      <HeroSectionPage />
      <HighPriceProduct />
    </div>
  );
}
