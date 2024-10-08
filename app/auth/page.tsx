"use client"
import { Button } from "@/components/ui/button";
import {createClient} from "@/utils/supabase/client"
import { Github } from "lucide-react";
import ModeToggle from "@/components/ModeToggle";
import HeroText from "@/components/HeroText";
import Footer from "@/components/Footer";

async function signInWithGithub() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options:{
        redirectTo:"http://localhost:3000/auth/callback"
      }
    })
    if(error){
        console.log(error);
    }
  }

// export default function Page(){
//     return(
//         <div className="flex h-screen">
//             <div className="w-2/3 flex flex-col p-10">
//                 <div className="text-2xl font-bold mb-10 text-orange-600">Skill Journey</div>
//                 <div className="flex-grow flex items-center justify-left">
//                     <HeroText />
//                 </div>
//             </div>
//             <div className="w-1/3 bg-primary flex flex-col justify-between p-10">
//                 <div className="flex-grow flex flex-col justify-center items-center">
//                     <div className="mb-6 text-3xl text-foreground font-bold">Get Started</div>
//                     <Button onClick={signInWithGithub} className="w-full py-6 text-lg text-background bg-foreground hover:bg-opacity-30 hover:bg-loginhover">
//                         <Github className="mr-2 h-5 w-5"/>
//                         Log in with GitHub
//                     </Button>
//                 </div>
//                 <div className="text-center text-md font-semibold italic text-orange-600 mt-4">
//                     H4C
//                 </div>
//                 <div className="absolute bottom-0 right-0 p-4">
//                     <ModeToggle />
//                 </div>
//             </div>
//         </div>
//     )
// }
import React from 'react';
import LandingPageNavbar from '@/components/LandingPageNavbar';
import LandingPageWelcome from '@/components/LandingPageWelcome';
import LandingPageInfoFrame from '@/components/LandingPageInfoFrame';
import LandingPageDreamRole from '@/components/LandingPageDreamRole';
import LandingPageCallToAction from '@/components/LandingPageCallToAction';

const Page: React.FC = () => {
    return (
        <div className="min-h-screen">
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
            <Footer />
        </div>
    );
};

export default Page;