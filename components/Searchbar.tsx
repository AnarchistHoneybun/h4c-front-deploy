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

interface SearchItem {
  Category: string;
  Name: string;
  _id: Object;
}

export default function Searchbar({ user }: { user: UserMetadata }) {
  const [q, setQ] = useState("");
  const [qres, setQres] = useState<Array<SearchItem>>([]);
  const { toast } = useToast();

  async function fetchSearchRes() {
    if (q.length == 0) return;

    const res = await fetch(`http://localhost:8000/search?q=${q}`);
    const res_json: Array<SearchItem> = await res.json();
    setQres(res_json);
    if (res_json.length == 0)
      toast({
        title: "No skill found!",
        variant: "destructive",
      });
    setQ("");
  }
  
  function addSkills(skill: string) {
    const formdata = new FormData();
    formdata.append("username", user.email);
    formdata.append("skills", skill);

    setQ("");
    setQres([]);
    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http:localhost/add_skills", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput
        placeholder="Enter skill..."
        value={q}
        onValueChange={(e) => setQ(e)}
        onKeyDown={(e) => {
          if (e.key == "Enter") fetchSearchRes();
        }}
      />
      <CommandList>
        <CommandEmpty>Press enter to search</CommandEmpty>
        {qres.map((e, key) => (
          <CommandGroup heading={e.Category}>
            <CommandItem key={key} onSelect={(e) => addSkills(e)}>
              {e.Name}
            </CommandItem>
          </CommandGroup>
        ))}
      </CommandList>
    </Command>
  );
}
