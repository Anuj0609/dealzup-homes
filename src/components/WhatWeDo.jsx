"use client";

import React from "react";

function WhatWeDo() {
  const features = [
    {
      icon: "/WWD1.png",
      title: "Buy & Sell Properties",
      description:
        "Find verified homes for sale or list your property with ease.",
    },
    {
      icon: "/WWD2.png",
      title: "Find Rental Homes",
      description:
        "Browse through thousands of rental options suited to your needs.",
    },
    {
      icon: "/WWD3.png",
      title: "Smart AI Property Search",
      description:
        "Get instant recommendations based on your budget & location.",
    },
    {
      icon: "/WWD4.png",
      title: "Safe & Secure Transactions",
      description:
        "Verified listings & secure deals to ensure a smooth experience.",
    },
  ];

  return (
    <div className="px-[53px] 2xl:px-[80px] py-20 text-center mt-56 md:my-2">
      <h2 className="font-poppins font-bold text-[35px] leading-[100%] text-[#1E3A8A] mb-4">
        What We Do?
      </h2>

      <p className="font-poppins font-normal text-[20px] leading-[28px] tracking-[0.02em] text-[#555555] mb-10">
        Helping you find, buy, and rent the perfect property with ease.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 2xl:gap-16">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-[#EEEEEE] shadow-md rounded-2xl py-7 space-y-[18px] flex flex-col items-center text-center 
                 transition-transform transform hover:-translate-y-2 hover:shadow-xl hover:bg-white"
          >
            <div className="bg-[#BEBEBE] rounded-full w-[77px] h-[77px] flex items-center justify-center">
              <img
                src={item.icon}
                alt={item.title}
                className="w-10 h-10 transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <h3 className="font-poppins font-semibold text-xl mt-4 text-[#1E1E1E] transition-colors duration-300 group-hover:text-[#1E3A8A] px-[67px]">
              {item.title}
            </h3>
            <p className="font-poppins text-sm text-gray-500 mt-2 transition-opacity duration-300 group-hover:opacity-90 px-[41px]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhatWeDo;
