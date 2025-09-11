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
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";

function Page() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAppleLogin = async () => {
    alert(
      "Apple login setup requires OAuth configuration in Firebase Console."
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation */}
      <div className="w-full px-6 sm:px-8 md:px-12 lg:px-[55px] py-4 flex justify-between items-center gap-4 sm:gap-6 text-[#1E1E1E] font-poppins shadow-xl bg-white">
        <Link
          href="/"
          className="flex items-center gap-2 font-normal text-sm sm:text-base md:text-lg text-[#555555] hover:text-[#1E3A8A] border px-3 sm:px-4 py-2 rounded-3xl"
        >
          <IoArrowBackCircleOutline className="text-xl sm:text-2xl" />
          Back to Homepage
        </Link>

        <div className="flex items-center gap-2 text-xl sm:text-2xl font-bold">
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

      {/* Content */}
      <div className="flex flex-1 flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        {/* Form Section */}
        <div className="w-full lg:w-2/5 flex flex-col justify-center px-6 sm:px-10 py-10 gap-8 sm:gap-12">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h2
              className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#1E1E1E] text-center mb-6"
              style={{ fontFamily: "Poppins", lineHeight: "100%" }}
            >
              Log in
            </h2>

            {error && (
              <p className="text-red-500 text-center text-sm sm:text-base">
                {error}
              </p>
            )}

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
                className="w-full pl-10 px-4 py-3 border rounded-xl text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                required
              />
              <CiMail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg cursor-pointer" />
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
                className="w-full px-4 py-3 pr-10 border rounded-xl text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <VscEyeClosed size={20} />
                ) : (
                  <VscEye size={20} />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full sm:w-3/4 lg:w-7/8 mx-auto bg-[#1E3A8A] text-white py-3 sm:py-4 lg:py-5 rounded-3xl font-semibold hover:bg-[#162c6c] transition"
            >
              Log in
            </button>
          </form>

          {/* ✅ Social Logins */}
          <div className="mt-6 flex flex-col items-center gap-3 w-full">
            <div className="flex items-center w-full">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-2 sm:mx-4 text-[#555555] text-sm sm:text-base">
                Or continue with
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="flex gap-4 sm:gap-6 mt-3">
              <button
                onClick={handleAppleLogin}
                className="p-2 sm:p-3 rounded-full hover:bg-gray-100"
              >
                <FaApple className="text-lg sm:text-xl" />
              </button>
              <button
                onClick={handleFacebookLogin}
                className="p-2 sm:p-3 rounded-full hover:bg-gray-100"
              >
                <FaFacebook className="text-blue-600 text-lg sm:text-xl" />
              </button>
              <button
                onClick={handleGoogleLogin}
                className="p-2 sm:p-3 rounded-full hover:bg-gray-100"
              >
                <FaGoogle className="text-red-500 text-lg sm:text-xl" />
              </button>
            </div>
          </div>

          <p className="mt-4 text-center text-[#555555] text-sm sm:text-base">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#1E3A8A] hover:underline font-medium"
            >
              Create one
            </Link>
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden lg:flex w-3/5 items-center justify-center overflow-hidden">
          <img
            src="https://picsum.photos/1200/800"
            alt="Login illustration"
            className="h-[70vh] lg:h-[90vh] max-h-[738px] object-cover rounded-l-3xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
