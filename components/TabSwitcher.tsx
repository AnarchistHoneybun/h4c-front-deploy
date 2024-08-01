"use client";
import { Dock, DockIcon } from "@/components/magicui/dock";
import Link from "next/link";
import { Home, ChartArea, User, LogOut, BookOpenText } from "lucide-react";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function TabSwitcher({ className }: { className?: string }) {
  const router = useRouter();
  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/auth");
  }
  return (
    <div className={className}>
      <Dock className="gap-8" direction="middle" magnification={90}>
        <DockIcon className="mx-8">
          <Link
            className="flex items-center justify-center px-4 py-2 rounded-lg hover:bg-tabhover hover:bg-opacity-20 transition-all duration-300"
            href="/"
          >
            <BookOpenText className="mr-2" />
            <span>Modules</span>
          </Link>
        </DockIcon>
        <DockIcon className="mx-6">
          <Link
            className="flex items-center justify-center px-4 py-2 rounded-lg hover:bg-tabhover hover:bg-opacity-20 transition-all duration-300"
            href="/profile"
          >
            <User className="mr-2" />
            <span>Profile</span>
          </Link>
        </DockIcon>
        <DockIcon className="mx-10">
          <Link
            className="flex items-center justify-center px-4 py-2 rounded-lg hover:bg-tabhover hover:bg-opacity-20 transition-all duration-300 bg-destructive"
            href="/"
            onClick={signOut}
          >
            <LogOut className="mr-2" />
            <span>Logout</span>
          </Link>
        </DockIcon>
      </Dock>
    </div>
  );
}
