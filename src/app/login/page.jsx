"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { api } from "../../services/api";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Use the real API service
      const data = await api.login(formData);
      
      // Assuming response contains { token: "..." } or similar
      // Adjust based on actual response structure if known, otherwise default to data.token
      if (data && (data.token || data.access_token)) {
        localStorage.setItem("token", data.token || data.access_token);
        console.log("Login successful, token saved");
        // Redirect logic would go here, e.g. router.push('/')
        window.location.href = "/"; // Force refresh to ensure auth state is picked up
      } else {
        console.error("Login successful but no token found", data);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Hero / Welcome */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-slate-900/50 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 w-full flex items-center justify-center p-12">
          <h1 className="text-5xl font-bold text-white leading-tight max-w-lg">
            Welcome to the Crowd Management System
          </h1>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md bg-white shadow-xl overflow-hidden rounded-lg">
          {/* Card Header */}
          <div className="bg-slate-800 p-6 text-center">
            <h2 className="text-2xl font-bold text-white tracking-wider">
              Kloudspot
            </h2>
          </div>

          {/* Card Body */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Log In
                </label>
                <input
                  type="text"
                  required
                  className="w-full border-b border-gray-300 px-2 py-2 focus:border-teal-600 focus:outline-none transition-colors"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full border-b border-gray-300 px-2 py-2 focus:border-teal-600 focus:outline-none transition-colors pr-10"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-600 text-white font-semibold py-3 px-4 rounded hover:bg-teal-700 transition-colors focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-70"
              >
                {loading ? "Logging in..." : "Access Dashboard"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
