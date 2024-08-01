import React from 'react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from 'lucide-react';

interface SkillsListProps {
    skills: string[];
    onAddSkill: () => void;
}

const SkillsList: React.FC<SkillsListProps> = ({ skills, onAddSkill }) => {
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
                <Card
                    className="flex-shrink-0 cursor-pointer hover:bg-accent transition-colors border-dashed"
                    onClick={onAddSkill}
                >
                    <CardContent className="flex items-center justify-center h-20 w-32">
                        <Plus className="mr-2" />
                        <p>Add Skills</p>
                    </CardContent>
                </Card>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
};

export default SkillsList;