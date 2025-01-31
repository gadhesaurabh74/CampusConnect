import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });

      if (response.data.success) {
        alert("Login successful!");
        navigate("/print");  // Redirect to print page after login
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("Error logging in. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full"
      >
        <h2 className="text-center text-3xl font-bold text-blue-600 mb-6">
          Customer Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          New here?{" "}
          <button
            onClick={() => navigate("/userregister")}
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default CustomerLogin;
