// components/LandingPageWelcome.tsx
import React from 'react';
import Image from 'next/image';
import PlaceholderImage from '@/public/welcome-right.png';

const LandingPageWelcome: React.FC = () => {
  return (
    <div className="bg-background p-8 rounded-lg">
      <div className="flex justify-items-center items-center">
        <div className="w-1/2 pr-8 pl-24">
          <h1 className="text-6xl font-black text-gray-800 mb-4">
            WELCOME TO<br />
            THE FUTURE<br />
            OF <span className="text-green-500">CAREER<br />
            GROWTH</span>
          </h1>
          <p className="text-gray-800 mb-4">
            At SkillJourney, we redefine career development by
            providing a clear roadmap to your dream role. Our
            platform offers a personalised learning experience
            designed to guide you every step of the way.
          </p>
        </div>
        <div className="">
          <Image
            src={PlaceholderImage}
            alt="Office illustration"
            width={400}
            height={600}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPageWelcome;