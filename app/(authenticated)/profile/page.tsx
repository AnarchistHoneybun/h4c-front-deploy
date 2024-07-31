import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

export default async function Profile() {
  const supabase = createClient();
  const user = (await supabase.auth.getUser()).data.user?.user_metadata;
  return (
    <div className="container flex flex-col mx-auto p-4">
      <h1 className="text-2xl font-bold">Profile Page</h1>
      <div className="h-fit w-fit">
        <Image
          src={user?.avatar_url}
          alt="Github user profile picture"
          height={500}
          width={500}
          className="rounded-full "
        />
      </div>
      <div>Welcome {user?.full_name}</div>
      <div className=""> Email: {user?.email}</div>
      <div className="">Skills: </div>
      
    </div>
  );
}
