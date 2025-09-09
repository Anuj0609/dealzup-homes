import DreamHome from "@/components/DreamHome";
import FeaturedProperties from "@/components/FeaturedProperties";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import ForRent from "@/components/ForRent";
import ForSale from "@/components/ForSale";
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";
import WhatWeDo from "@/components/WhatWeDo";

export default function Home() {
  return (
    <div>
      <Navbar />
      <DreamHome />
      <WhatWeDo />
      <FeaturedProperties />
      <ForSale />
      <ForRent />
      <Newsletter />
      <Features />
      <Footer />
    </div>
  );
}
