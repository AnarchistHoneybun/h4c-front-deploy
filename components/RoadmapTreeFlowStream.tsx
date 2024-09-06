"use client";
import { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { randomBytes } from "crypto";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { createClient } from "@/utils/supabase/client";

let initialNodes: any = [];

let initialEdges: any = [];

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [role, setRole] = useState<any>();
  const [company, setCompany] = useState<any>();
  const supabase = createClient();

  const proOptions = { hideAttribution: true };

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
    []
  );
  function stream() {
    const socket = new WebSocket("ws://localhost:8000/generate_roadmap");
    socket.onopen = () => {
      async function send_req() {
        const x = await supabase.auth.getUser();

        socket.send(x.data.user?.email!);
        socket.send(role);
        socket.send(company);
      }
      send_req();
    };
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
      if (data.status == "completed") {
        socket.close();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        return;
      }
      for (let i in data) {
        setNodes((e: any) => [
          ...e,
          {
            id: data[i]["Step_name"],
            data: { label: data[i]["Step_name"] },
            position: {
              x: 0,
              y: (parseInt(data[i]["Step_number"]) - 1) * 100,
            },
          },
        ]);

        for (let j in data[i]["Prerequisites"]) {
          setEdges((e: any) => [
            ...e,
            {
              id: randomBytes(64),
              source: data[i]["Step_name"],
              target: data[i]["Prerequisites"][j],
            },
          ]);
        }
        for (let j in data[i]["Sub_steps"]) {
          setNodes((e: any) => [
            ...e,
            {
              id: data[i]["Sub_steps"][j]["Sub_step_name"],
              data: {
                label: data[i]["Sub_steps"][j]["Sub_step_name"],
              },
              position: { x: 50, y: (parseInt(i) - 1) * 100 },
            },
          ]);
          setEdges((e: any) => [
            ...e,
            {
              id: randomBytes(64),
              source: data[i]["Step_name"],
              target: data[i]["Sub_steps"][j]["Sub_step_name"],
            },
          ]);
        }
      }
    };
    socket.onclose = () => {
      console.log("conn closed");
    };
    return () => {
      socket.close();
    };
  }
  return (
    <div className="flex flex-col gap-2">
      <Input
        className="bg-gray-400"
        placeholder="Enter role here..."
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <Input
        className="bg-gray-400"
        placeholder="Enter company here..."
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <Dialog>
        <DialogTrigger onClick={stream}>
          <div className="w-full bg-slate-200 rounded-lg">Add</div>
        </DialogTrigger>
        <DialogContent className="bg-white rounded-lg shadow-lg w-[90%] max-w-5xl h-[90%] max-h-[90vh] flex flex-col">
          <DialogHeader>Roadmap for XYZ</DialogHeader>
          <div className="flex-1 overflow-auto">
            <div className="h-full w-full">
              <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                proOptions={proOptions}
                fitView
                className="h-full w-full"
              >
                <Background />
                <Controls />
              </ReactFlow>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Flow;
