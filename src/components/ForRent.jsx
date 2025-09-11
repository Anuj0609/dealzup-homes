"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

function ForRent() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = `https://68b826bcb715405043274639.mockapi.io/api/properties/PropertyListing`;
        const result = await axios.get(url);

        // Filter only ids 27, 28, 29, 30
        const filtered = result.data.filter((item) =>
          ["27", "28", "29", "30"].includes(item.id)
        );

        // Map them into card-ready format
        const mapped = filtered.map((item, index) => ({
          image: item.image,
          location: item.location || "New York, NY",
          rating: "4.5/5",
          description:
            item.description ||
            "Spacious 3BHK apartment in a prime location with modern amenities.",
          price: item.price || `$${1500 + index * 200}/month`,
          buttonText: "Buy Now",
        }));

        setProperties(mapped);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div className="py-12 px-5 sm:px-8 md:px-12 lg:px-[53px] bg-[#F9FAFB]">
      {/* Section Heading */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 w-full pb-10">
        <div className="flex flex-col text-center lg:text-left">
          <h2 className="font-poppins font-bold text-[26px] sm:text-[30px] md:text-[35px] leading-[120%] text-[#1E3A8A] mb-4">
            Find The Perfect Rental Home
          </h2>
          <p className="font-poppins font-normal text-[16px] sm:text-[18px] md:text-[20px] leading-[28px] text-[#555555] max-w-3xl tracking-[0.02em] mx-auto lg:mx-0">
            Browse our top-rated properties for rent, featuring premium listings
            tailored to your needs. Find your dream home today!
          </p>
        </div>

        <div className="bg-[#1E3A8A] inline-flex items-center justify-center font-poppins font-medium text-[14px] sm:text-[16px] text-white border-2 border-[#1E3A8A] rounded-3xl px-5 py-2 sm:px-6 sm:py-3 cursor-pointer hover:bg-[#162d66] transition">
          View All Rentals
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[25px] gap-y-[35px] 2xl:gap-x-16">
        {properties.map((property, index) => (
          <div
            key={index}
            className={`
              bg-[#F1F1F1] rounded-2xl shadow-md overflow-hidden 
              hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02] 
              transition-all duration-300 ease-in-out transform
              ${index > 0 ? "hidden" : "block"}        /* 1 on mobile */
              ${index > 1 ? "md:hidden" : "md:block"}  /* 2 on tablet */
              ${index > 2 ? "lg:hidden" : "lg:block"}  /* 3 on desktop */
              xl:block                                 /* 4 on ≥1440 */
            `}
          >
            {/* Image */}
            <div className="overflow-hidden rounded-t-2xl">
              <img
                src={property.image}
                alt={property.description}
                className="w-full h-[200px] 2xl:h-[250px] object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col justify-between">
              {/* Location + Rating */}
              <div className="flex justify-between items-center mb-3">
                <span className="flex flex-row items-center gap-2">
                  <img src="./Sale1.png" alt="" className="w-5 h-6" />
                  <div className="font-poppins font-normal text-[18px] leading-[100%] text-[#979797]">
                    {property.location}
                  </div>
                </span>
                <span className="flex flex-row items-center gap-2">
                  <FaStar className="text-[#FFD700] w-6 h-6" />
                  <div className="font-poppins font-normal text-[18px] leading-[100%] text-[#979797]">
                    {property.rating}
                  </div>
                </span>
              </div>

              {/* Description */}
              <p className="font-poppins font-normal text-[16px] leading-[25px] text-[#1E1E1E] mb-4">
                {property.description}
              </p>

              <div className="flex flex-row justify-between items-center">
                {/* Button */}
                <button
                  className="font-poppins font-semibold text-[16px] text-[#FFFFFF] 
                   bg-[#1E3A8A] px-7 py-2 rounded-3xl 
                   hover:bg-[#162d66] hover:shadow-lg hover:scale-105 
                   transition-all duration-300 ease-in-out"
                >
                  {property.buttonText}
                </button>

                {/* Price */}
                <span className="font-poppins font-normal text-[24px] text-[#222222]">
                  {property.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForRent;
