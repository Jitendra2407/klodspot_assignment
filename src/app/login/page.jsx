"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { api } from "../../services/api";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors
    
    try {
      // Use the real API service
      const data = await api.login(formData);
      
      console.log("Login API Response:", data); // Debugging log

      // Robust extraction of token from various possible structures
      const token = data?.token || data?.access_token || data?.data?.token || data?.data?.access_token || data?.accessToken || data?.data?.accessToken;

      if (token) {
        console.log("Token extracted:", token);
        localStorage.setItem("token", token);
        console.log("Login successful, token saved");
        window.location.href = "/"; // Force refresh to ensure auth state is picked up
      } else {
        console.error("Login successful but no token found in response", data);
        setError("Login failed. Unexpected server response.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // Fallback logic
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/login_background.png')" }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Side - Welcome Text */}
        <div className="flex-1 w-full lg:max-w-2xl text-center lg:text-left text-white">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 drop-shadow-md">
            Welcome to the<br />
            Crowd Management System
          </h1>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md bg-white shadow-2xl rounded-lg overflow-hidden">
          {/* Card Header */}
          <div className="bg-teal-900/90 p-6 text-center">
            <h2 className="text-2xl font-bold text-white tracking-wider flex items-center justify-center gap-2">
               {/* Icon placeholder if needed, or just text */}
               Kloudspot
            </h2>
          </div>

          {/* Card Body */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded text-sm font-medium text-center border border-red-100">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Log In *
                </label>
                <input
                  type="email" // or text as per screenshot "Parking_solutions" looks like text
                  required
                  className="w-full border text-black border-gray-300 rounded px-3 py-2 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 focus:outline-none transition-colors"
                  placeholder="Username"
                  value={formData.email} // keeping 'email' state key for now, simpler
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full text-black border border-gray-300 rounded px-3 py-2 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 focus:outline-none transition-colors pr-10"
                    placeholder="**********"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-600 text-white font-semibold py-3 px-4 rounded hover:bg-teal-700 transition-colors focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-70 mt-2"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
