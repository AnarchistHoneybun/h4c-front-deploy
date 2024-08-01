import { createClient } from "@/utils/supabase/server";
import UserInfo from "@/components/UserInfo";
import ClientSkillsList from "@/components/ClientSkillsList";

export default async function Profile() {
    const supabase = createClient();
    const user = (await supabase.auth.getUser()).data.user?.user_metadata;
    const skills: string[] = await (
        await fetch(
            `http://localhost:8000/get_skills?username=${encodeURIComponent(
                user!.email
            )}`
        )
    ).json();

    return (
        <div className="container mx-auto px-4 max-w-3xl">
            <div className="my-8">
                <UserInfo user={user!} />
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Skills:</h2>
                <ClientSkillsList skills={skills} user={user!} />
            </div>
        </div>
    );
}