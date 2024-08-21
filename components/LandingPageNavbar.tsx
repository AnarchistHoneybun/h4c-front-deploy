// components/LandingPageNavbar.tsx

import Link from "next/link";

import { createClient } from "@/utils/supabase/client";
import { Button } from "./ui/button";
async function signInWithGithub() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });
  if (error) {
    console.log(error);
  }
}

const LandingPageNavbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center bg-green-500 px-4 py-2">
      <div className="text-white text-2xl font-bold">SkillJourney</div>
      <div>
        <Button
          onClick={signInWithGithub}
          className="bg-white text-black px-4 py-2 rounded-full"
        >
          Login with GitHub
        </Button>
      </div>
    </nav>
  );
};

export default LandingPageNavbar;
