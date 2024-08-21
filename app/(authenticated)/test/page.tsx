"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Page() {
  const [roadmap, setRoadmap] = useState<any[]>([]);

  function wsDataFetch() {
    const socket = new WebSocket("http://localhost:8000/generate_roadmap");
    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      setRoadmap([]);
      socket.send("mudit.7.gupta+github@gmail.com");
      socket.send("Chip Designer");
      socket.send("Intel");
    };
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.status == "completed") {
        socket.close();
        return;
      }
      setRoadmap((e) => [...e, data]);
    };
    socket.onclose = () => {
      console.log("conn closed");
    };
  }
  return (
    <div className="">
      <Button onClick={wsDataFetch} />
      {roadmap.map((val, i) => {
        console.log(val);
        return <div className="text-white">{val[i + 1]["Description"]}</div>;
      })}
    </div>
  );
}
