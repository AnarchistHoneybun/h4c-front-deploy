"use client";

import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { BookOpenText, User, LogOut } from "lucide-react";

export default function TabSwitcher({ className }: { className?: string }) {
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/auth");
  }

  return (
    <div className={`${className} flex justify-between bg-green-500 items-center py-2 px-6`}>
      <div className="text-2xl pl-24 font-bold" style={{ color: "hsl(125, 38%, 94%)" }}>SkillJourney</div>
      <div className="flex items-center gap-8">
        <Button
          variant="ghost"
          className="flex items-center gap-2 hover:bg-tabactive hover:text-white transition-colors"
          onClick={() => router.push("/")}
          style={{ color: "hsl(125, 38%, 94%)" }}
        >
          <BookOpenText className="w-6 h-6" />
          <span>Modules</span>
        </Button>
        <Button
          variant="ghost"
          className="flex items-center gap-2 hover:bg-tabactive hover:text-white transition-colors"
          onClick={() => router.push("/profile")}
          style={{ color: "hsl(125, 38%, 94%)" }}
        >
          <User className="w-6 h-6" />
          <span>Profile</span>
        </Button>
      </div>
      <div className="pr-24"><Button
        variant="destructive"
        className="flex items-center gap-2 hover:bg-black hover:text-white bg-white text-black transition-colors rounded-full"
        onClick={signOut}
      >
        <LogOut className="w-6 h-6" />
        <span>Logout</span>
      </Button></div>
      
    </div>
  );
}