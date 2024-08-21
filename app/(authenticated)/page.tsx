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
      <h1 className="text-3xl font-bold text-center mb-8">
        CONTINUE YOUR SKILL JOURNEY
        <br />
        PICK UP WHERE YOU LEFT OFF!
      </h1>
      <div className="grid grid-cols-3 gap-6">
        {Object.keys(roadmaps["roadmaps"]).map((key: any, i: number) => (
          <Card
            key={i}
            className="cursor-pointer hover:bg-accent transition-colors"
          >
            <CardHeader>
              <CardTitle className="text-lg">{key}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <Dialog>
                <DialogTrigger>
                  <Sparkle className="w-5 h-5" />
                  Go
                </DialogTrigger>
                <DialogContent className="bg-white rounded-lg shadow-lg w-[90%] max-w-5xl h-[90%] max-h-[90vh] flex flex-col">
                  <DialogHeader>Roadmap for XYZ</DialogHeader>
                  <div className="flex-1 overflow-auto">
                    <RoadmapTreeFlow />
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}

        <Dialog>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:bg-gray-300 transition-colors">
              <CardContent className="flex flex-col items-center justify-center h-full gap-2">
                <Plus className="text-4xl" />
                <div className="text-gray-600 font-bold">New Roadmap</div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Enter the role to generate a roadmap for:{" "}
              </DialogTitle>
            </DialogHeader>
            <Input placeholder="Enter here..." />
            <Dialog>
              <DialogTrigger>
                <div className="w-full bg-slate-200">Add</div>
              </DialogTrigger>
              <DialogContent className="bg-white rounded-lg shadow-lg w-[90%] max-w-5xl h-[90%] max-h-[90vh] flex flex-col">
                <DialogHeader>Roadmap for XYZ</DialogHeader>
                <div className="flex-1 overflow-auto">
                  <RoadmapTreeFlowStream />
                </div>
              </DialogContent>
            </Dialog>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
