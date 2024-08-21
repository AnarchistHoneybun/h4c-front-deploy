// app/landing/page.tsx
import React from 'react';
import LandingPageNavbar from '@/components/LandingPageNavbar';
import LandingPageWelcome from '@/components/LandingPageWelcome';
import LandingPageInfoFrame from '@/components/LandingPageInfoFrame';
import LandingPageDreamRole from '@/components/LandingPageDreamRole';
import LandingPageCallToAction from '@/components/LandingPageCallToAction';

const LandingPage: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            <LandingPageNavbar />
            <div className="container mx-auto px-4 py-12">
                <LandingPageWelcome />
                <div className="flex justify-center mt-8">
                    <svg className="w-8 h-8 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </div>
            </div>
            <LandingPageInfoFrame />
            <LandingPageDreamRole />
            <LandingPageCallToAction />
        </div>
    );
};

export default LandingPage;