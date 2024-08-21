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

let initialNodes: any = [];

let initialEdges: any = [];

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

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
      const x = await fetch("http://localhost:8000/test");
      const temp = await x.json();
      for (let i in temp["roadmap"]) {
        setNodes((e: any) => [
          ...e,
          {
            id: temp["roadmap"][i]["Step_name"],
            data: { label: temp["roadmap"][i]["Step_name"] },
            position: { x: 0, y: (parseInt(i) - 1) * 100 },
          },
        ]);
        for (let j in temp["roadmap"][i]["Prerequisites"]) {
          setEdges((e: any) => [
            ...e,
            {
              id: randomBytes(64),
              source: temp["roadmap"][i]["Step_name"],
              target: temp["roadmap"][i]["Prerequisites"][j],
            },
          ]);
        }
        for (let j in temp["roadmap"][i]["Sub_steps"]) {
            setNodes((e: any) => [
                ...e,
                {
                  id: temp["roadmap"][i]["Sub_steps"][j]["Sub_step_name"],
                  data: { label: temp["roadmap"][i]["Sub_steps"][j]["Sub_step_name"] },
                  position: { x: 50, y: (parseInt(i) - 1) * 100 },
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
          }
          
        console.log(temp['roadmap'][i]);
      }
    }
    temp();
  }, []);
  return (
    <div className="h-screen w-screen">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
