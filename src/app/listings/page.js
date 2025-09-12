"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter, useSearchParams } from "next/navigation";

// Custom Select Component
function CustomSelect({ options, placeholder, onChange, value }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex justify-between items-center w-full px-4 py-2 border border-gray-300 rounded-4xl font-poppins text-[16px] text-[#1E1E1E] cursor-pointer bg-white"
      >
        <span>
          {options.find((opt) => opt.value === value)?.label || placeholder}
        </span>
        <svg
          className="w-4 h-4 text-[#1E1E1E]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {open && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-lg max-h-40 overflow-y-auto">
          {options.map((opt, i) => (
            <li
              key={i}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
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

// Card Component
function Card({ title, description, image }) {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-[#1E1E1E]">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
}

export default function ListingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [listings, setListings] = useState([]);
  const [locations, setLocations] = useState([]);
  const [type, setType] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [displayedListings, setDisplayedListings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchListings() {
      try {
        const response = await axios.get(
          "https://68b826bcb715405043274639.mockapi.io/api/properties/PropertyListing"
        );
        setListings(response.data);
        const uniqueLocations = Array.from(
          new Set(response.data.map((item) => `${item.city}, ${item.state}`))
        ).map((loc) => ({ value: loc, label: loc }));
        setLocations(uniqueLocations);
      } catch (err) {
        console.error(err);
      }
    }
    fetchListings();
  }, []);

  useEffect(() => {
    setType(searchParams.get("type") || "");
    setPropertyType(searchParams.get("propertyType") || "");
    setLocation(searchParams.get("location") || "");
  }, [searchParams]);

  useEffect(() => {
    if (listings.length > 0) {
      const randomCards = listings.sort(() => 0.5 - Math.random()).slice(0, 2);
      setDisplayedListings(randomCards);
    }
  }, [listings]);

  // Helper to pick random cards
  function getRandomCards(listings) {
    if (!listings.length) return [];
    return listings.sort(() => 0.5 - Math.random()).slice(0, 2);
  }

  const handleFindProperty = () => {
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (propertyType) params.set("propertyType", propertyType);
    if (location) params.set("location", location);

    router.push(`/listings?${params.toString()}`, { scroll: false });
    setDisplayedListings(getRandomCards(listings));
  };

  return (
    <div>
      <Navbar />

      <div
        className="relative h-[500px] bg-cover bg-center md:rounded-3xl xl:mx-[53px] md:my-10 py-10 mx-4 rounded-2xl"
        style={{ backgroundImage: "url('./Hero1.png')" }}
      >
        <div className="space-y-4 py-3">
          <div className="font-poppins font-bold text-3xl md:text-[48px] leading-[100%] text-center text-white">
            Find Your Dream Home in One Click!
          </div>
          <div className="font-poppins font-normal text-[20px] leading-[100%] text-center text-[#EEEEEE]">
            Discover, Buy, or Rent Verified Properties with Ease.
          </div>
        </div>

        <div
          className="py-4 lg:py-2 mt-44 md:mt-56 lg:mt-[320px]  
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
            value={type}
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
            value={propertyType}
          />

          <CustomSelect
            placeholder="Select Location"
            options={
              locations.length > 0
                ? locations
                : [{ value: "", label: "Loading..." }]
            }
            onChange={setLocation}
            value={location}
          />

          <button
            onClick={handleFindProperty}
            className="w-full bg-[#1E3A8A] text-white px-6 py-3 md:py-4 rounded-4xl font-poppins text-[16px] hover:bg-[#162d66] transition"
          >
            Find Property
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-center mt-4 font-poppins">{error}</p>
        )}
      </div>

      <div className="mt-28"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 mx-4 md:mx-8 xl:mx-[114px] 2xl:mx-[300px]">
        {displayedListings.map((listing, i) => (
          <Card
            key={i}
            title={listing.name}
            description={`${listing.city}, ${listing.state}`}
            image={listing.image}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
