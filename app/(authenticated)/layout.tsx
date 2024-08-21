import TabSwitcher from "@/components/TabSwitcher";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const user = (await supabase.auth.getUser()).data.user?.user_metadata;
  const formdata = new FormData();
  formdata.append("email", user!.email);

  const requestOptions = {
    method: "POST",
    body: formdata,
  };

  fetch("http://localhost:8000/create_account_from_email", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

  const x = await fetch(
    `http://localhost:8000/list_roadmaps?username=${encodeURIComponent(
      user!.email
    )}`
  );
  const roadmaps = await x.json();
  console.log(roadmaps);
  return (
    <div>
      <TabSwitcher className="mb-4" />
      <div className="flex min-h-[75vh]">
        <div>
          {Object.keys(roadmaps["roadmaps"]).length > 0 ? (
            Object.keys(roadmaps["roadmaps"]).map((key: any, i: number) => {
              return <div className="">{key}</div>;
            })
          ) : (
            <div>No roadmaps made yet!</div>
          )}
        </div>
        <div className="">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
