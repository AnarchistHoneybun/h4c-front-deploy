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
  DialogTrigger,
} from "./ui/dialog";
let initialNodes: any = [];

let initialEdges: any = [];

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [done, setDone] = useState(false);
  const proOptions = { hideAttribution: true };
  const supabase = createClient();
  const [user, setUser] = useState<any>();

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
      setUser(() => x.data.user?.email);
    }
    const socket = new WebSocket("ws://localhost:8000/generate_roadmap");
    socket.onopen = () => {
      if (done) socket.close();
      socket.send(encodeURIComponent(user));
      socket.send("Chip Designer");
      socket.send("Intel");
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
    setDone(() => true);
    console.log(done);
    return () => {
      socket.close();
    };
  }, []);
  return (
    <Dialog>
      <DialogTrigger>
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
  );
}

export default Flow;
