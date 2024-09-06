"use client";

import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import reval_profile from "@/utils/reval";

export default function DeleteRoadmap({
  role,
  company,
}: {
  role: string;
  company: string;
}) {
  const client = createClient();
  async function remove_roadmap() {
    const user = await client.auth.getUser();
    const formdata = new FormData();
    formdata.append("username", user.data.user?.email!);
    formdata.append("role", role);
    formdata.append("company", company);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://localhost:8000/delete_roadmap", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

    reval_profile("/");
  }
  return (
    <Button variant="destructive" onClick={remove_roadmap}>
      Delete
    </Button>
  );
}
