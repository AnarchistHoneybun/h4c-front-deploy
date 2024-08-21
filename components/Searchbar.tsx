"use client";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  Command,
} from "@/components/ui/command";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { UserMetadata } from "@supabase/supabase-js";
import reval from "@/utils/reval";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SearchItem {
  Category: string;
  Name: string;
  _id: Object;
}

export default function Searchbar({
  user,
  secType,
}: {
  user: UserMetadata;
  secType: string;
}) {
  const [q, setQ] = useState("");
  const [qres, setQres] = useState<Array<SearchItem>>([]);
  const { toast } = useToast();

  function addSkills() {
    const formdata = new FormData();
    formdata.append("username", user.email);
    if (secType == "skill") {
      formdata.append("skills", q);
    } else if (secType == "experience") {
      formdata.append("experience", q);
    } else if (secType == "learnstyle") {
      formdata.append("learning_styles", q);
    }
    setQ("");
    setQres([]);
    const requestOptions = {
      method: "POST",
      body: formdata,
    };
    console.log(secType);
    if (secType == "skill") {
      fetch("http://localhost:8000/add_skills", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    } else if (secType == "experience") {
      fetch("http://localhost:8000/add_experience", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    } else if (secType == "learnstyle") {
      fetch("http://localhost:8000/add_learning_styles", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    }

    reval("/profile");
  }

  return (
    <div className="h-full w-full">
      <Input
        onChange={(e) => {
          console.log(e.target.value);
          setQ(e.target.value);
        }}
      ></Input>
      <Button className="my-2 w-full" onClick={addSkills}>
        Add skill
      </Button>
    </div>
  );
}
