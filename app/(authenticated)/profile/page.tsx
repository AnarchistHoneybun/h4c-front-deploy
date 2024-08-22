import { createClient } from "@/utils/supabase/server";
import UserInfo from "@/components/UserInfo";
import ClientSkillsList from "@/components/ClientSkillsList";
import ClientExperienceList from "@/components/ClientExperienceList";
import ClientLearningList from "@/components/ClientLearningList";
import ClientEducationList from "@/components/ClientEducationList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
  const education: string[] = await (
    await fetch(
      "http://localhost:8000/get_education?" +
        new URLSearchParams({ username: user!.email }).toString()
    )
  ).json();

  const rec_profiles = await (await fetch(`http://localhost:8000/linkedin/recommend?username=${encodeURIComponent(user!.email)}`)).json();

  return (
    <div className="container mx-auto px-4 w-3/4">
      <div className="my-8">
        <UserInfo user={user!} />
        <div className="flex justify-center">
          <Dialog>
            <DialogTrigger>
              <div className="bg-blue-600 text-white rounded-lg px-4 py-2 cursor-pointer">
                Recommended LinkedIn Profiles
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>Recommended LinkedIn Profiles</DialogHeader>
              {rec_profiles.map((x: any, i: any) => (
                <div className="">{x.user}</div>
              ))}
            </DialogContent>
          </Dialog>
        </div>
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
        <h2 className="text-xl font-semibold mb-4">Education:</h2>
        <ClientEducationList skills={education} user={user!} />
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Learning style:</h2>
        <ClientLearningList skills={learning_style} user={user!} />
      </div>
    </div>
  );
}
