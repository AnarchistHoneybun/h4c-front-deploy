// components/LandingPageCallToAction.tsx
import React from 'react';
import Image from 'next/image';
import LongImage from '@/public/long-image.png';
import LandingPageSignupForm from '@/components/LandingPageSignupForm';

const LandingPageCallToAction: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <Image
          src={LongImage}
          alt="People working together"
          width={1200}
          height={400}
          className="w-full rounded-lg"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2 bg-green-500 p-8 rounded-lg">
          <h2 className="text-4xl font-bold text-white mb-4">
            YOUR DREAM JOB,<br />
            JUST ONE SKILL<br />
            JOURNEY AWAY.
          </h2>
          <p className="text-white text-xl">Sign up Now</p>
        </div>
        <div className="md:w-1/2">
          <LandingPageSignupForm />
        </div>
      </div>
    </div>
  );
};

export default LandingPageCallToAction;