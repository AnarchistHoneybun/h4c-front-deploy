"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";

export default function Dash() {
  const [mainCardTitle, setMainCardTitle] = useState("Main Content Area");
  const [cardTitles, setCardTitles] = useState<string[]>([]);
  const [role, setRole] = useState<string[]>([]);
  const [roadmap, setRoadmap] = useState<Object[]>([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
    };

    fetch(
      "http://127.0.0.1:8000/get_desired_role?username=mudit.7.gupta%2Bgithub@gmail.com"
    )
      .then((response) => response.json())
      .then((result) => {
        setRoadmap(result["roadmap"]);
        setRole([...role, result["desired_role"]]);
      })
      .catch((error) => console.error(error));
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
              {roadmap.map((e, i)=>(
                <div className="">{e.step}</div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
