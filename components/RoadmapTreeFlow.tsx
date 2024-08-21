"use client";
import { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { randomBytes } from "crypto";
import { createClient } from "@/utils/supabase/client";

let initialNodes: Node[] = [];
let initialEdges: Edge[] = [];

function Flow({role, company}:{role: string, company: string}) {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const supabase = createClient();
  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
    []
  );

  useEffect(() => {
    async function temp() {
      const user = await supabase.auth.getUser();
      const x = await fetch(`http://localhost:8000/roadmap?username=${encodeURIComponent(user.data.user?.email!)}&role=${role}&company=${company}`);
      let temp = await x.json();
      temp = temp["roadmap"];
      
      for (let i in temp["roadmap"]) {
        setNodes((e: any) => [
          ...e,
          {
            id: temp["roadmap"][i]["Step_name"],
            data: { label: (<div style={{ fontWeight: "bold", fontSize: "16px" }}>
              {temp["roadmap"][i]["Step_name"]}
            </div>) },
            position: { x: 1000, y: (parseInt(i)-1)*100 },
            style: {
              border: "3px solid green",
            },
          },
        ]);
        
        for (let j in temp["roadmap"][i]["Prerequisites"]) {
          setEdges((e: any) => [
            ...e,
            {
              id: randomBytes(64),
              source: temp["roadmap"][i]["Step_name"],
              target: temp["roadmap"][i]["Prerequisites"][j],
              style: {
                strokeWidth: 3,
              },
            },
          ]);
        }
        
        // let x_offset = 100;
        // let y_offset = 50;
        let sub_step_x_offset = 0;
        let sub_step_y_offset = 0;
        // y_offset += 50;
        for (let j in temp["roadmap"][i]["Sub_steps"]) {
          setNodes((e: any) => [
            ...e,
            {
              id: temp["roadmap"][i]["Sub_steps"][j]["Sub_step_name"],
              data: {
                label: (
                  <div
                    style={{
                      fontWeight: "normal",
                      fontSize: "14px",
                      color: "#888",
                    }}
                  >
                    {temp["roadmap"][i]["Sub_steps"][j]["Sub_step_name"]}
                  </div>
                ),
              },
              position: {
                x: (parseInt(j))*180+sub_step_x_offset,
                y: (parseInt(i))*200+sub_step_y_offset+(parseInt(j))*20,
              },
              style: {
                border: "3px solid red",
              },
            },
          ]);
          setEdges((e: any) => [
            ...e,
            {
              id: randomBytes(64),
              source: temp["roadmap"][i]["Step_name"],
              target: temp["roadmap"][i]["Sub_steps"][j]["Sub_step_name"],
            },
          ]);
          sub_step_x_offset += 500;
        }

        // x_offset += 200;
        // y_offset += Math.random() < 0.5 ? 50 : -50;
      }
    }
    temp();
  }, []);

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        fitView
        className="h-full w-full"
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
