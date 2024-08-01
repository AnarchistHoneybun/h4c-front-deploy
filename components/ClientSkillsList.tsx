"use client";

import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import OpenSearchBar from "@/components/OpenSearchBar";
import { UserMetadata } from "@supabase/supabase-js";

interface ClientSkillsListProps {
  skills: string[];
  user: UserMetadata;
}

const ClientSkillsList: React.FC<ClientSkillsListProps> = ({
  skills,
  user,
}) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-4 p-4">
        {skills.map((skill, index) => (
          <Card key={index} className="flex-shrink-0">
            <CardContent className="flex items-center justify-center h-20 w-32">
              <p className="text-center">{skill}</p>
            </CardContent>
          </Card>
        ))}
        <OpenSearchBar
          user={user}
          trigger={
            <Card
              className="bg-foreground text-background cursor-pointer hover:bg-accent hover:border-dashed hover:text-foreground transition-colors border-dashed"
              style={{ maxWidth: "30%" }}
            >
              <CardHeader className="flex flex-row items-center justify-center h-10">
                <Plus className="mr-2" />
                <CardTitle className="text-lg">Add New</CardTitle>
              </CardHeader>
            </Card>
          }
        />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ClientSkillsList;
