import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, AlertTriangle } from 'lucide-react';

const Unauthorized = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-10 text-center transform transition-all hover:scale-[1.02]">
        <div className="flex justify-center mb-6">
          <Lock className="h-20 w-20 text-indigo-600 animate-pulse" />
        </div>
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500 mb-4">
          401
        </h1>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Unauthorized Access</h2>
        <p className="text-lg text-gray-600 mb-8 flex items-center justify-center gap-2">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          Sorry, you don’t have permission to access this page.
        </p>
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;