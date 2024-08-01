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

  fetch("http://127.0.0.1:8000/create_account_from_email", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

  return (
    <div>
      <TabSwitcher className="mb-4" />
      <div className="min-h-[75vh]">{children}</div>
      <Footer />
    </div>
  );
}
