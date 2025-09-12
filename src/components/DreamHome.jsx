"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BsSearch } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";

// Reusable Custom Select Component
function CustomSelect({ options, placeholder, onChange }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <div className="relative w-full">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex justify-between items-center w-full px-4 py-2 border border-gray-300 rounded-4xl font-poppins text-[16px] text-[#1E1E1E] cursor-pointer bg-white"
      >
        <span>{selected || placeholder}</span>
        <IoIosArrowDown className="text-[#1E1E1E]" />
      </div>
      {open && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-lg max-h-40 overflow-y-auto">
          {options.map((opt, i) => (
            <li
              key={i}
              onClick={() => {
                setSelected(opt.label);
                setOpen(false);
                onChange(opt.value);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function DreamHome() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  // States for select inputs
  const [type, setType] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");

  // Location options fetched from API
  const [locationOptions, setLocationOptions] = useState([]);

  // Fetch locations from API on mount
  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await axios.get(
          "https://68b826bcb715405043274639.mockapi.io/api/properties/PropertyListing"
        );
        const uniqueLocs = Array.from(
          new Set(response.data.map((item) => `${item.city}, ${item.state}`))
        ).map((loc) => ({ value: loc, label: loc }));
        setLocationOptions(uniqueLocs);
      } catch (err) {
        setLocationOptions([]);
      }
    }
    fetchLocations();
  }, []);

  const filtered = locationOptions.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleFindProperty = () => {
    router.push(
      `/listings?type=${type}&propertyType=${propertyType}&location=${location}`
    );
  };

  return (
    <div
      className="h-[500px] bg-cover bg-center 
                md:rounded-3xl xl:mx-[53px] md:my-10 py-10 mx-4 rounded-2xl"
      style={{ backgroundImage: "url('./Hero1.png')" }}
    >
      {/* Title Section */}
      <div className="space-y-4 py-3">
        <div className="font-poppins font-bold text-3xl md:text-[48px] leading-[100%] text-center text-white">
          Find Your Dream Home in One Click!
        </div>
        <div className="font-poppins font-normal text-[20px] leading-[100%] text-center text-[#EEEEEE]">
          Discover, Buy, or Rent Verified Properties with Ease.
        </div>
      </div>

      {/* Search Box */}
      <div className="flex flex-col lg:flex-row justify-between items-center xl:px-[114px] 2xl:px-[300px] xl:pt-[224px] 2xl:pt-[150px] lg:pt-48 lg:px-8 pt-10">
        <div
          className="border border-amber-600 px-[20px] py-[10px] bg-white rounded-2xl 
               w-[350px] md:w-[400px] lg:w-[600px] 2xl:w-[800px]
               font-poppins font-normal text-[20px] flex flex-row justify-between items-center relative"
        >
          <div className="flex flex-row gap-2 items-center w-full">
            <img src="./location.png" alt="location icon" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowOptions(true);
              }}
              onFocus={() => setShowOptions(true)}
              onBlur={() => setTimeout(() => setShowOptions(false), 200)}
              placeholder="Search your location..."
              className="w-full placeholder:font-poppins placeholder:font-normal placeholder:text-[20px]
                   placeholder:text-[#979797] focus:outline-none"
            />
          </div>

          <BsSearch className="text-[#979797] ml-2" />

          <button
            type="button"
            onClick={() => setShowOptions((prev) => !prev)}
            className="text-[#979797] ml-2 focus:outline-none"
          >
            <IoIosArrowDown size={20} />
          </button>

          {showOptions && (
            <ul className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-200 rounded-xl mt-2 shadow-lg max-h-40 overflow-y-auto">
              {(query ? filtered : locationOptions).length > 0 ? (
                (query ? filtered : locationOptions).map((loc, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setQuery(loc.label);
                      setShowOptions(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {loc.label}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No results found</li>
              )}
            </ul>
          )}
        </div>

        <div className="mt-4 lg:mt-0">
          <button className="font-poppins font-normal text-[18px] leading-[100%] text-center text-[#1E3A8A] border border-[#1E3A8A] rounded-3xl px-14 py-[10px] bg-white">
            List your property
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div
        className="py-4 lg:py-2 mt-44 md:mt-20 xl:mt-8 2xl:mt-24 
                      mx-4 md:mx-8 xl:mx-[114px] 2xl:mx-[300px] 
                      px-3 md:px-5 bg-white shadow-lg rounded-4xl 
                      grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center"
      >
        <CustomSelect
          placeholder="Select Type"
          options={[
            { value: "buy", label: "For Buy" },
            { value: "rent", label: "For Rent" },
            { value: "sell", label: "For Sell" },
          ]}
          onChange={setType}
        />

        <CustomSelect
          placeholder="Property Type"
          options={[
            { value: "house", label: "House" },
            { value: "villa", label: "Villa" },
            { value: "apartment", label: "Apartment" },
            { value: "plot", label: "Plot" },
          ]}
          onChange={setPropertyType}
        />

        <CustomSelect
          placeholder="Select Location"
          options={locationOptions}
          onChange={setLocation}
        />

        <button
          className="w-full bg-[#1E3A8A] text-white px-6 py-3 md:py-4 rounded-4xl font-poppins text-[16px] hover:bg-[#162d66] transition"
          onClick={handleFindProperty}
        >
          Find Property
        </button>
      </div>
    </div>
  );
}

export default DreamHome;
