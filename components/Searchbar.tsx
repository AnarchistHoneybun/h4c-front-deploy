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

interface SearchItem {
  Category: string;
  Name: string;
  _id: Object;
}

export default function Searchbar() {
  const [q, setQ] = useState("");
  const [qres, setQres] = useState<Array<SearchItem>>([]);
  const { toast } = useToast();

  async function fetchSearchRes() {
    if (q.length < 3) return;

    const res = await fetch(`http://localhost:8000/search?q=${q}`);
    const res_json: Array<SearchItem> = await res.json();
    setQres(res_json);
    console.log(res_json.length);
    if (res_json.length == 0)
      toast({
        title: "No skill found!",
        variant: "destructive",
      });
    setQ("");
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
        {qres.map((e) => (
          <CommandGroup heading={e.Category}>
            <CommandItem>{e.Name}</CommandItem>
          </CommandGroup>
        ))}
      </CommandList>
    </Command>
  );
}
