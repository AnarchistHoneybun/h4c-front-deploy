import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import RoadmapTreeFlow from "@/components/RoadmapTreeFlow";
import RoadmapTreeFlowStream from "@/components/RoadmapTreeFlowStream";
import { Input } from "@/components/ui/input";

import Leaderboard from "@/components/Leaderboard";

export default async function Page() {
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

  return (
    <div className="container mx-auto my-12">
      <h1 className="text-5xl font-black text-center mb-8">
        CONTINUE YOUR SKILL JOURNEY
        <br />
        <span className="text-green-500">PICK UP WHERE YOU LEFT OFF!</span>
      </h1>
      <div className="grid grid-cols-3 gap-6">
        {Object.keys(roadmaps["roadmaps"]).map((key: string, i: number) => {
          const [role, company] = key.split("+");
          return (
            <Card key={i} className="">
              <CardHeader>
                <CardTitle className="text-2xl font-black">
                  {role} <span className="text-green-500">@</span> {company}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <Dialog>
                  <DialogTrigger>
                    {/* <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    > */}
                    <Sparkle className="w-5 h-5" />
                    Go
                    {/* </Button> */}
                  </DialogTrigger>
                  <DialogContent className="bg-white rounded-lg shadow-lg w-[90%] max-w-5xl h-[90%] max-h-[90vh] flex flex-col">
                    <DialogHeader>
                      {role} @ {company}
                    </DialogHeader>
                    <div className="flex-1 overflow-auto">
                      <RoadmapTreeFlow
                        roleString={role}
                        companyString={company}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          );
        })}

        <RoadmapTreeFlowStream />
      </div>
      <Leaderboard />
    </div>
  );
}
