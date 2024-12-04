'use client'
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

export default function Page() {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: signInData.email,
        password: signInData.password,
      });

      if (res?.error) {
        console.error("Sign-in error:", res.error);
        alert("Authentication failed. Please check your credentials.");
      } else {
        console.log("Sign-in successful:", res);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-cover bg-center bg-slate-200" style={{ backgroundImage: `url('/your-banner-image.jpg')` }}>
        {/* Replace '/your-banner-image.jpg' with the path to your banner image */}
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="p-8 bg-white shadow-lg rounded-md w-3/4">
          <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
          <form className="flex flex-col space-y-4" onSubmit={handleSignIn}>
            <div>
              <Input
                placeholder="Enter Email"
                type="email"
                name="email"
                value={signInData.email}
                onChange={handleChange}
                required
                className="p-4 rounded-md border"
              />
            </div>
            <div>
              <Input
                placeholder="Enter Password"
                type="password"
                name="password"
                value={signInData.password}
                onChange={handleChange}
                required
                className="p-4 rounded-md border"
              />
            </div>
            <div className="text-center mt-4">
              <Button type="submit" className="bg-[#ff5200] text-white w-full py-2 rounded-md">
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
