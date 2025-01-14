'use client';
import React, { useState } from "react";
import { Lock, AlertCircle } from "lucide-react";

const AdminPageDev: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement the login functionality here
    console.log("Super Admin Login Attempt:", { username, password });
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20 rounded-xl shadow-lg p-6 relative overflow-hidden">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)]" />

      {/* Content Container */}
      <div className="relative h-full flex flex-col items-center justify-center space-y-6 text-center">
        {/* Icon */}
        <div className="relative">
          <Lock className="w-20 h-20 text-red-500 dark:text-red-400 animate-pulse" />
          <div className="absolute -top-2 -right-2">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-500 animate-bounce" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4 max-w-lg">
          <h2 className="text-2xl font-bold text-red-800 dark:text-red-200">
            Super Admin Login
          </h2>
          <p className="text-red-600 dark:text-red-300">
            This page is under development. Soon, super admins will be able to log in to manage the system.
          </p>
          
          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-red-700 dark:text-red-300">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-4 py-2 border border-red-200 dark:border-red-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-red-700 dark:text-red-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-red-200 dark:border-red-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Login
            </button>
          </form>
        </div>

        {/* Development Status */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <div className="flex items-center space-x-2 bg-red-100 dark:bg-red-900/50 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm text-red-700 dark:text-red-300">
              In Development
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPageDev;
