"use client";

import React from "react";

function Newsletter() {
  return (
    <div className="px-5 md:px-10 lg:px-[85px] py-10 md:py-30">
      <div className="font-poppins font-bold text-[28px] md:text-[34px] lg:text-[40px] leading-[100%] text-[#1E3A8A]">
        Start Your Journey Today!
      </div>
      <div className="font-poppins font-normal text-[16px] md:text-[18px] lg:text-[20px] leading-[24px] md:leading-[26px] lg:leading-[28px] tracking-[0.02em] text-[#555555] mb-6">
        Create a profile in seconds and find your ideal home.
      </div>

      <div
        className="
          grid grid-cols-1
          md:grid-cols-2 
          lg:flex lg:flex-row lg:gap-4 
          gap-4
          items-center
          py-3
        "
      >
        <input
          type="text"
          placeholder="Enter Your Name"
          className="border border-gray-300 rounded-xl px-6 py-3 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]
          placeholder:font-poppins placeholder:font-normal placeholder:text-[16px] placeholder:leading-[24px] placeholder:text-[#888888]"
        />

        <select
          defaultValue=""
          className="border border-gray-300 rounded-xl px-6 py-3 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] 
          text-[#888888] font-poppins font-normal text-[16px] leading-[24px]"
        >
          <option value="" disabled>
            Select User Type
          </option>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="agent">Agent</option>
        </select>

        <input
          type="text"
          placeholder="Enter Your Location"
          className="border border-gray-300 rounded-xl px-6 py-3 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]
          placeholder:font-poppins placeholder:font-normal placeholder:text-[16px] placeholder:leading-[24px] placeholder:text-[#888888]"
        />

        <button className="bg-[#1E3A8A] text-white font-poppins font-semibold text-[16px] md:text-[18px] rounded-3xl px-8 py-3 w-full md:w-auto hover:bg-[#16377a] transition">
          Continue
        </button>
      </div>
    </div>
  );
}

export default Newsletter;
