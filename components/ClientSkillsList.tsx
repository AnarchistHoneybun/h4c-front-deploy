import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
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
            <div className="flex space-x-4 p-4 items-center">
                {skills.map((skill, index) => (
                    <Card key={index} className="flex-shrink-0 w-32 h-20">
                        <CardContent className="p-0 h-full">
                            <div className="flex items-center justify-center h-full">
                                <p className="text-center font-bold">{skill}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                <OpenSearchBar
                    user={user}
                    trigger={
                        <Card
                            className="bg-foreground text-background cursor-pointer hover:bg-loginhover hover:bg-opacity-30 hover:border-dashed transition-colors border-dashed flex-shrink-0"
                            style={{ width: '100px', height: '60px' }}
                        >
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