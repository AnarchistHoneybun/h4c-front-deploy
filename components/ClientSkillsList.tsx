"use client";
import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import OpenSearchBar from "@/components/OpenSearchBar";
import { UserMetadata } from "@supabase/supabase-js";
import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import reval from "@/utils/reval";

interface ClientSkillsListProps {
  skills: string[];
  user: UserMetadata;
}

const ClientSkillsList: React.FC<ClientSkillsListProps> = ({
  skills,
  user,
}) => {
  function deleteCard(target_skill: string) {
    const formdata = new FormData();
    formdata.append("username", user.email);
    formdata.append("skills", target_skill);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };


    fetch("http://localhost:8000/delete_skills", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

    reval("/profile");
  }

  const truncateSkillName = (skillName: string, maxLength: number = 9) => {
    if (skillName.length > maxLength) {
      return `${skillName.slice(0, maxLength)}...`;
    }
    return skillName;
  };
  
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-4 p-4 items-center">
        {skills.map((skill, index) => (
          <Card key={index} className="flex-shrink-0 w-32 h-20">
            <CardContent className="p-0 h-full">
              <div className="flex flex-col items-center justify-center h-full gap-1">
                <p className="text-center font-bold">{truncateSkillName(skill)}</p>
                <Trash
                  id={skill}
                  size={20}
                  onClick={(e) => deleteCard((e.target as HTMLElement).id)}
                  color="#ff0000"
                  className="cursor-pointer"
                />
              </div>
            </CardContent>
          </Card>
        ))}
        <OpenSearchBar
          secType="skill"
          user={user}
          trigger={
            <Card className="bg-foreground text-background cursor-pointer hover:bg-loginhover hover:bg-opacity-30 hover:border-dashed transition-colors border-dashed flex-shrink-0 h-20 w-32">
              <CardContent className="p-0 h-full">
                <div className="flex items-center justify-center h-full">
                  <Plus className="mr-1" size={16} />
                  <span className="text-sm font-semibold">Add New</span>
                </div>
              </CardContent>
            </Card>
          }
        />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ClientSkillsList;
