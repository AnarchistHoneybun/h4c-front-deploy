"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Dash() {
  const [mainCardTitle, setMainCardTitle] = useState("Main Content Area");
  const [cardTitles, setCardTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string[]>([]);
  const [roadmap, setRoadmap] = useState<Object[]>([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
    };

    fetch(
      "https://j3n3kckyz3.execute-api.us-east-1.amazonaws.com/get_desired_role?username=mudit.7.gupta%2Bgithub@gmail.com"
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setRoadmap(result["roadmap"]);
        setRole([...role, result["desired_role"]]);
      })
      .catch((error) => console.error(error));
    setLoading(false);
  }, []);

  const handleCardClick = (title: string) => {
    setMainCardTitle(title);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-6">
        <div className="w-1/3">
          <ScrollArea className="h-[calc(100vh-12rem)] w-full rounded-md">
            <div className="pr-4 space-y-4">
              {role.map((title, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => handleCardClick(title)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{title}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
              <Card
                className="bg-foreground text-background cursor-pointer hover:bg-accent hover:border-dashed hover:text-foreground transition-colors border-dashed mx-auto mt-8"
                style={{ maxWidth: "50%" }}
              >
                <CardHeader className="flex flex-row items-center justify-center h-20">
                  <Plus className="mr-2" />
                  <CardTitle className="text-lg">Add New</CardTitle>
                </CardHeader>
              </Card>
            </div>
          </ScrollArea>
        </div>
        <Separator orientation="vertical" className="h-[calc(100vh-12rem)]" />
        <div className="w-2/3">
          <Card className="min-h-[calc(100vh-12rem)]">
            <CardHeader>
              <CardTitle>Roadmap for: {role}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/2">Step Description</TableHead>
                    <TableHead className="w-1/4">Skills</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                {loading ? (
                  // <div>Loading data from server...</div>
                  <TableBody><TableRow><TableCell>Loading data from server...</TableCell></TableRow></TableBody>
                ) : (
                  <TableBody className="w-full">
                    {roadmap.map((e: any, i) => (
                      <TableRow>
                        <TableCell>{e.step}</TableCell>
                        <TableCell>
                          {e.skills.map((f: any) => (
                            <div>
                              {f.name} : {(f.level as string).charAt(0).toUpperCase().concat((f.level as string).slice(1))}
                            </div>
                          ))}
                        </TableCell>
                        <TableCell className={`text-right ${e.completed ? "text-green-600" : "text-red-600"}`} >
                          {e.completed ? "Completed" : "To-Do"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
