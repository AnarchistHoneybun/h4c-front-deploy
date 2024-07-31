import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Searchbar from "@/components/Searchbar";
import OpenSearchBar from "@/components/OpenSearchBar";

export default async function Profile() {
  const supabase = createClient();
  const user = (await supabase.auth.getUser()).data.user?.user_metadata;
  const skills: [string] = await (
    await fetch(
      `http://localhost:8000/get_skills?username=${encodeURIComponent(
        user!.email
      )}`
    )
  ).json();

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
      {skills.map((e) => (
        <div className="">{e}</div>
      ))}
      <OpenSearchBar user={user!} />
      {/* <Searchbar/> */}
    </div>
  );
}
