"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

function FeaturedProperties() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = `https://68b826bcb715405043274639.mockapi.io/api/properties/PropertyListing`;
        const result = await axios.get(url);

        // Filter only ids 1, 2, 12, 18
        const filtered = result.data.filter((item) =>
          ["1", "2", "12", "18"].includes(item.id)
        );

        setImages(filtered);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImage();
  }, []);

  // Fallback images
  const fallbackImages = ["./FP1.png", "./FP2.png", "./FP3.png", "./FP4.png"];

  const handleError = (e, index) => {
    e.target.src = fallbackImages[index];
  };

  return (
    <div className="px-[20px] md:px-[40px] lg:px-[53px] py-10 my-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-5 pb-10">
        <div className="font-poppins font-bold text-[28px] md:text-[32px] lg:text-[40px] leading-[100%] tracking-[0] text-center text-[#1E3A8A]">
          Featured Property
        </div>
        <div className="flex flex-row items-center gap-1 border-2 border-[#1E3A8A] rounded-3xl px-4 py-2 cursor-pointer">
          <div className="font-poppins font-normal text-[16px] md:text-[18px] leading-[100%] tracking-[0] text-[#1E3A8A] whitespace-nowrap">
            See 268 New Projects
          </div>
          <img src="./FP-icon.png" alt="" className="w-5 h-5 md:w-6 md:h-6" />
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-[25px] gap-y-[25px] lg:gap-y-[35px] w-full">
        {/* FP1 */}
        <div className="col-span-1 lg:col-span-2 overflow-hidden">
          <img
            src={images[0]?.image || fallbackImages[0]}
            alt="Featured Property 1"
            onError={(e) => handleError(e, 0)}
            className="w-full h-[250px] md:h-[300px] lg:w-[650px] lg:h-[478px] 2xl:w-full object-cover rounded-xl"
          />
        </div>

        {/* FP2 */}
        <div className="hidden md:block col-span-1 overflow-hidden lg:col-span-1">
          <img
            src={images[1]?.image || fallbackImages[1]}
            alt="Featured Property 2"
            onError={(e) => handleError(e, 1)}
            className="w-full h-[250px] md:h-[300px] lg:w-[307px] lg:h-[478px] 2xl:w-full object-cover rounded-xl"
          />
        </div>

        {/* FP3 + FP4 only for large screens */}
        <div className="hidden lg:grid lg:grid-rows-2 lg:gap-y-[35px] col-span-1">
          <div className="overflow-hidden">
            <img
              src={images[2]?.image || fallbackImages[2]}
              alt="Featured Property 3"
              onError={(e) => handleError(e, 2)}
              className="w-full h-full lg:w-[309px] lg:h-[226px] 2xl:w-full object-cover rounded-xl"
            />
          </div>
          <div className="overflow-hidden">
            <img
              src={images[3]?.image || fallbackImages[3]}
              alt="Featured Property 4"
              onError={(e) => handleError(e, 3)}
              className="w-full lg:w-[309px] lg:h-[226px] 2xl:w-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProperties;
