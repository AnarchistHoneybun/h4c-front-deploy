import { createClient } from "@/utils/supabase/server";
import UserInfo from "@/components/UserInfo";
import ClientSkillsList from "@/components/ClientSkillsList";
import ClientExperienceList from "@/components/ClientExperienceList";
import ClientLearningList from "@/components/ClientLearningList";

export default async function Profile() {
  const supabase = createClient();
  const user = (await supabase.auth.getUser()).data.user?.user_metadata;
  const skills: string[] = await (
    await fetch(
      "http://localhost:8000/get_skills?" +
        new URLSearchParams({ username: user!.email }).toString()
    )
  ).json();
  const experience: string[] = await (
    await fetch(
      "http://localhost:8000/get_experience?" +
        new URLSearchParams({ username: user!.email }).toString()
    )
  ).json();
  const learning_style: string[] = await (
    await fetch(
      "http://localhost:8000/get_learning_styles?" +
        new URLSearchParams({ username: user!.email }).toString()
    )
  ).json();

  return (
    <div className="container mx-auto px-4 w-3/4">
      <div className="my-8">
        <UserInfo user={user!} />
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Skills:</h2>
        <ClientSkillsList skills={skills} user={user!} />
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Experience:</h2>
        <ClientExperienceList skills={experience} user={user!} />
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Learning style:</h2>
        <ClientLearningList skills={learning_style} user={user!} />
      </div>
    </div>
  );
}
