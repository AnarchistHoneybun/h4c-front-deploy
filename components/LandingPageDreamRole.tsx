// components/LandingPageDreamRole.tsx
import React from 'react';

const LandingPageDreamRole: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-5xl font-bold mb-8" style={{ color: "hsl(178, 74%, 9%)" }}>
        YOUR DREAM ROLE. <span className="text-green-500">JUST ONE<br />JOURNEY AWAY.</span>
      </h2>
      <div className="max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Eg : SWE@ Microsoft"
          className="w-full px-4 py-3 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>
  );
};

export default LandingPageDreamRole;