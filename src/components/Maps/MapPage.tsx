"use client";
import React from "react";
import { Map, AlertCircle } from "lucide-react";

const MapComponent: React.FC = () => {
  return (
    <div className="w-full h-[600px] bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20 rounded-xl shadow-lg p-6 relative overflow-hidden">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)]" />
      
      {/* Content Container */}
      <div className="relative h-full flex flex-col items-center justify-center space-y-6 text-center">
        {/* Icon */}
        <div className="relative">
          <Map className="w-20 h-20 text-red-500 dark:text-red-400 animate-pulse" />
          <div className="absolute -top-2 -right-2">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-500 animate-bounce" />
          </div>
        </div>
        
        {/* Text Content */}
        <div className="space-y-4 max-w-lg">
          <h2 className="text-2xl font-bold text-red-800 dark:text-red-200">
            Interactive Campus Map
          </h2>
          <p className="text-red-600 dark:text-red-300">
            Our interactive university map is currently under development. Soon you ll be able to explore campus buildings, find classrooms, and navigate with ease.
          </p>
          
          {/* Feature Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {['Buildings', 'Classrooms', 'Navigation', 'Search'].map((feature) => (
              <div 
                key={feature}
                className="bg-white/50 dark:bg-red-950/50 rounded-lg p-3 border border-red-200 dark:border-red-800"
              >
                <p className="text-sm font-medium text-red-700 dark:text-red-300">
                  {feature}
                </p>
              </div>
            ))}
          </div>
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

export default MapComponent;