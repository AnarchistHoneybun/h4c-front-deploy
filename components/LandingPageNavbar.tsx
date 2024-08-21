// components/LandingPageNavbar.tsx
import React from 'react';
import Link from 'next/link';

const LandingPageNavbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center bg-green-500 px-4 py-2">
      <div className="text-white text-2xl font-bold">
        SkillJourney
      </div>
      <div>
        <Link href="/signup" className="bg-gray-800 text-white px-4 py-2 rounded-full mr-2">
          Sign Up
        </Link>
        <Link href="/login" className="bg-white text-black px-4 py-2 rounded-full">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default LandingPageNavbar;