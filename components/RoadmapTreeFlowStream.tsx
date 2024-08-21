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
import { createClient } from "@/utils/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Card, CardContent } from "./ui/card";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
let initialNodes: any = [];

let initialEdges: any = [];

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const proOptions = { hideAttribution: true };
  const supabase = createClient();
  const [user, setUser] = useState<any>();
  const [role, setRole] = useState<any>();
  const [company, setCompany] = useState<any>();

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
    []
  );
  useEffect(() => {
    async function get_user() {
      const x = await supabase.auth.getUser();
      setUser(x.data.user);
    }
    get_user();
    console.log(user);
  }, []);
  function stream() {
    console.log(role, company, user);
    const socket = new WebSocket("ws://localhost:8000/generate_roadmap");
    socket.onopen = () => {
      socket.send(user!.email);
      socket.send(role);
      socket.send(company);
    };
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.status == "completed") {
        socket.close();
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
  }
  useEffect(() => {
    console.log(user);
    if (user) {
      stream();
    }
  }, [user]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer bg-slate-200 text-gray-400 border-dashed border-4 border-gray-400 hover:border-gray-900 hover:bg-slate-300 hover:text-gray-900  transition-colors">
          <CardContent className="flex flex-col items-center  justify-center hover:text-gray-900 h-full gap-2">
            <Plus className="text-4xl  " />
            <div className=" font-bold">New Roadmap</div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Enter the role & company to generate roadmap:{" "}
          </DialogTitle>
        </DialogHeader>
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
            <div className="w-full bg-slate-200">Add</div>
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
      </DialogContent>
    </Dialog>
  );
}

export default Flow;
