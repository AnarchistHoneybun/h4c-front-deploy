// components/LandingPageSignupForm.tsx
import React from 'react';

const LandingPageSignupForm: React.FC = () => {
  return (
    <form className="space-y-4">
      <div className="flex space-x-4">
        <input type="text" placeholder="First Name*" className="w-1/2 p-2 rounded bg-gray-200" required />
        <input type="text" placeholder="Last Name*" className="w-1/2 p-2 rounded bg-gray-200" required />
      </div>
      <input type="tel" placeholder="Phone Number*" className="w-full p-2 rounded bg-gray-200" required />
      <input type="email" placeholder="Email*" className="w-full p-2 rounded bg-gray-200" required />
      <button type="submit" className="w-full p-2 rounded bg-green-950 text-white font-bold">Submit</button>
    </form>
  );
};

export default LandingPageSignupForm;