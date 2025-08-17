"use client";

import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center">
        <div className="mb-4">
          <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin mx-auto"></div>
        </div>
        <p className="text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
