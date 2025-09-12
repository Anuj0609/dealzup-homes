import React from "react";

function Footer() {
  return (
    <div className="bg-[#1E3A8ACC] text-white px-6 md:px-12 xl:px-[85px] py-10 xl:py-16 md:mt-40">
      <div className="text-center mb-4 font-poppins font-bold text-3xl md:text-4xl xl:text-[50px] leading-tight lg:leading-[100%] tracking-[0.02em]">
        Get in Touch with Us
      </div>

      <div className="font-poppins font-normal text-base md:text-xl lg:text-[32px] leading-relaxed lg:leading-[43px] tracking-[0.02em] text-center mb-8 text-white">
        Subscribe now for exclusive property insights and deals!
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 lg:gap-8 bg-white rounded-3xl px-3 py-2 max-w-md sm:max-w-lg lg:max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Enter your email"
          className="flex-1 rounded-2xl text-black px-4 py-3 focus:outline-none placeholder:text-[#555555] placeholder:text-base md:placeholder:text-lg lg:placeholder:text-[24px] placeholder:text-center font-poppins font-normal"
        />

        <button className="bg-[#1E3A8A] text-white font-poppins font-normal text-base md:text-lg lg:text-[24px] leading-tight lg:leading-[43px] tracking-[0.02em] text-center px-6 md:px-8 py-2 rounded-2xl lg:rounded-3xl hover:bg-[#16377a] transition">
          Submit
        </button>
      </div>

      <div className="flex flex-col xl:flex-row justify-between items-center gap-4 xl:gap-12 py-6 xl:py-10 text-white">
        <div className="flex items-center gap-2">
          <img src="./Nav1.png" alt="Logo" className="w-8 h-8" />
          <div className="font-poppins font-bold text-xl lg:text-2xl">
            PropBot
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 xl:gap-6 font-poppins font-normal text-base lg:text-[16px] leading-relaxed lg:leading-[43px] tracking-[0.02em] text-center md:text-left">
          <div>For Sale</div>
          <div>Rentals</div>
          <div>New Projects</div>
          <div>Property News</div>
        </div>

        <div className="font-poppins font-normal text-sm md:text-lg xl:text-[20px] leading-relaxed lg:leading-[43px] tracking-[0.02em] text-center">
          ©2025 PropBot. All rights reserved
        </div>
      </div>
    </div>
  );
}

export default Footer;
