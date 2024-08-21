// components/LandingPageInfoFrame.tsx
import React from 'react';

const LandingPageInfoFrame: React.FC = () => {
  return (
    <div className="bg-green-900 text-white py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-4 leading-tight">
          48% OF RECENT ENGINEERING GRADUATES<br />
          FACE UNEMPLOYMENT. AT SKILLJOURNEY,<br />
          WE'RE HERE TO <span className='text-orange-600'>CHANGE</span> THOSE ODDS.
        </h2>
        <p className="text-green-400 text-lg">
          Based on news article by The New Indian Express
        </p>
      </div>
    </div>
  );
};

export default LandingPageInfoFrame;