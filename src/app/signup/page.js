"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IoArrowForwardCircleOutline,
  IoArrowBackCircleOutline,
} from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function Page() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(userCredential.user, {
        displayName: formData.fullName,
      });

      router.push("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="w-full px-6 lg:px-[55px] py-4 flex justify-between items-center gap-4 text-[#1E1E1E] font-poppins shadow-xl bg-white">
        <Link
          href="/"
          className="flex items-center gap-2 font-normal text-sm sm:text-base text-[#555555] hover:text-[#1E3A8A] border px-3 sm:px-4 py-2 rounded-3xl"
        >
          <IoArrowBackCircleOutline className="text-xl sm:text-2xl" />
          Back to Homepage
        </Link>

        <div className="flex items-center gap-2 text-lg sm:text-2xl font-bold">
          <img
            src="/Vector.png"
            alt="PropBot Logo"
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
          PropBot
        </div>

        <Link
          href="/about"
          className="flex items-center gap-2 text-sm sm:text-lg px-3 sm:px-4 py-2 bg-[#1E3A8A] rounded-3xl text-white"
        >
          About Us
          <IoArrowForwardCircleOutline className="text-xl sm:text-2xl" />
        </Link>
      </div>

      <div className="flex flex-1 flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        <div className="w-full lg:w-2/5 flex flex-col justify-center px-6 sm:px-10 py-10 gap-8">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h2
              className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#1E1E1E] text-center mb-6"
              style={{ fontFamily: "Poppins", lineHeight: "100%" }}
            >
              Create an Account
            </h2>

            {error && (
              <p className="text-red-500 text-center text-sm sm:text-base">
                {error}
              </p>
            )}

            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block mb-1 font-medium text-[#1E1E1E]"
              >
                Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Enter Your Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#1E3A8A] rounded-xl text-[#7A7A7A] font-poppins font-normal text-base focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                required
              />
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="email"
                className="block mb-1 font-medium text-[#1E1E1E]"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter Your Email Id"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#1E3A8A] rounded-xl text-[#7A7A7A] font-poppins font-normal text-base focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                required
              />
              <CiMail className="absolute right-3 top-[70%]  transform -translate-y-1/2 text-gray-400 text-lg cursor-pointer" />
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block mb-1 font-medium text-[#1E1E1E]"
              >
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#1E3A8A] rounded-xl text-[#7A7A7A] font-poppins font-normal text-base focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[70%] transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <VscEyeClosed size={20} />
                ) : (
                  <VscEye size={20} />
                )}
              </button>
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="confirmPassword"
                className="block mb-1 font-medium text-[#1E1E1E]"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Your Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#1E3A8A] rounded-xl text-[#7A7A7A] font-poppins font-normal text-base focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-[70%] transform -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? (
                  <VscEyeClosed size={20} />
                ) : (
                  <VscEye size={20} />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full sm:w-3/4 lg:w-7/8 mx-auto bg-[#1E3A8A] text-white py-4 sm:py-5 rounded-3xl font-semibold hover:bg-[#162c6c] transition"
            >
              Create Account
            </button>
          </form>

          <p className="mt-4 text-center text-[#555555] text-sm sm:text-base">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#1E3A8A] hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="hidden lg:flex w-3/5 items-center justify-center overflow-hidden">
          <img
            src="https://picsum.photos/1200/800"
            alt="Sign up illustration"
            className="h-[60vh] lg:h-[90vh] max-h-[738px] object-cover rounded-l-2xl lg:rounded-l-3xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
