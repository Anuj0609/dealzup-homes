"use client";

import React from "react";

function Features() {
  const profiles = [
    {
      icon: (
        <img src="/Feature3.png" alt="Budget Friendly" className="w-10 h-10" />
      ),
      title: "Budget Friendly",
      description:
        "Lorem ipsum dolor sit amet consectetur. Venenatis sed ac aenean tempus. Lectus quis pretium varius iaculis sed.",
    },
    {
      icon: (
        <img
          src="/Feature4.png"
          alt="Trusted By Thousand"
          className="w-10 h-10"
        />
      ),
      title: "Trusted By Thousand",
      description:
        "Lorem ipsum dolor sit amet consectetur. Venenatis sed ac aenean tempus. Lectus quis pretium varius iaculis sed.",
    },
    {
      icon: (
        <img src="/Feature5.png" alt="Prime Location" className="w-10 h-10" />
      ),
      title: "Prime Location",
      description:
        "Lorem ipsum dolor sit amet consectetur. Venenatis sed ac aenean tempus. Lectus quis pretium varius iaculis sed.",
    },
  ];

  return (
    <div className="px-6 md:px-12 xl:px-[53px] ">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-0">
        <div className="relative ">
          <img
            src="./Feature1.png"
            alt="Property 1"
            className="object-cover rounded-2xl shadow-md"
          />
          <img
            src="./Feature2.png"
            alt="Property 2"
            className="hidden xl:block rounded-2xl shadow-md absolute top-[200px] left-[100px] xl:top-[228px] xl:left-[219px]"
          />
        </div>

        <div className="lg:space-y-10">
          <h2
            className="font-poppins font-bold text-2xl md:text-3xl xl:text-[45px] leading-[100%] tracking-[0.02em] text-left
             lg:text-center  text-[#1E3A8A]"
          >
            We Provide Latest Properties For Our Valuable Clients
          </h2>

          <div className="xl:space-y-6 space-y-1 py-3 ">
            {profiles.map((item, index) => (
              <div
                key={index}
                className="flex items-center lg:items-start gap-6 px-1 xl:px-24 py-4 rounded-xl hover:bg-gray-50 transition"
              >
                <div className="flex-shrink-0">{item.icon}</div>
                <div className="flex flex-col gap-1 xl:gap-5">
                  <h3 className="font-poppins font-semibold text-lg md:text-3xl lg:text-[28px] leading-snug text-[#1E3A8A] mb-1">
                    {item.title}
                  </h3>
                  <p className="font-poppins text-sm md:text-xl lg:text-[18px] text-[#000000]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
