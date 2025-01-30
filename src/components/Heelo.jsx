import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Mail, Lock, User } from "lucide-react";

export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState("signin"); // Toggle between Sign In & Sign Up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (mode === "signup" && !name)) {
      setError("Please fill in all fields");
      return;
    }

    // Handle authentication logic here (API call or state update)
    alert(`${mode === "signin" ? "Signing In" : "Signing Up"}...`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          {mode === "signin" ? "Welcome Back!" : "Create an Account"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input (Signup Only) */}
          {mode === "signup" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Toggle Between Sign In & Sign Up */}
        <p className="text-sm text-center mt-4">
          {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-blue-600 font-semibold hover:underline"
          >
            {mode === "signin" ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
