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

let initialNodes: Node[] = [];
let initialEdges: Edge[] = [];

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

      let x_offset = 200;
      let y_offset = 100;

      for (let i in temp["roadmap"]) {
        setNodes((e: any) => [
          ...e,
          {
            id: temp["roadmap"][i]["Step_name"],
            data: { label: temp["roadmap"][i]["Step_name"] },
            position: { x: x_offset, y: y_offset },
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
              position: {
                x: x_offset + 100,
                y: Math.random() < 0.5 ? y_offset - 50 : y_offset + 50,
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
        }

        x_offset += 80;
        y_offset += Math.random() < 0.5 ? 50 : -50;
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