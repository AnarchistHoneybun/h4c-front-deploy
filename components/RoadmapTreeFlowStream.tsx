"use client";
import { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  useNodesState,
  useEdgesState,
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

// let initialNodes: any = [];

// let initialEdges: any = [];
const roadmapData = {
  1: {
    id: "1",
    name: "Learn Programming Basics",
    timeFrame: "4 weeks",
    difficulty: "Beginner",
    children: [
      {
        id: "1.1",
        name: "Variables and Data Types",
        timeFrame: "1 week",
        difficulty: "Easy",
      },
      {
        id: "1.2",
        name: "Control Structures",
        timeFrame: "1 week",
        difficulty: "Easy",
      },
      {
        id: "1.3",
        name: "Functions",
        timeFrame: "1 week",
        difficulty: "Medium",
      },
      {
        id: "1.4",
        name: "Basic Data Structures",
        timeFrame: "1 week",
        difficulty: "Medium",
      },
    ],
  },
  2: {
    id: "2",
    name: "Web Development Fundamentals",
    timeFrame: "6 weeks",
    difficulty: "Intermediate",
    children: [
      { id: "2.1", name: "HTML", timeFrame: "1 week", difficulty: "Easy" },
      { id: "2.2", name: "CSS", timeFrame: "2 weeks", difficulty: "Medium" },
      {
        id: "2.3",
        name: "JavaScript",
        timeFrame: "3 weeks",
        difficulty: "Hard",
      },
    ],
  },
  3: {
    id: "3",
    name: "Backend Development",
    timeFrame: "8 weeks",
    difficulty: "Advanced",
    children: [
      {
        id: "3.1",
        name: "Server-side Programming",
        timeFrame: "3 weeks",
        difficulty: "Hard",
      },
      {
        id: "3.2",
        name: "Databases",
        timeFrame: "3 weeks",
        difficulty: "Hard",
      },
      { id: "3.3", name: "APIs", timeFrame: "2 weeks", difficulty: "Medium" },
    ],
  },
};

// New sample subbranchData
const subbranchData = {
  "1.1": [
    { id: "1.1.1", name: "Integers", timeFrame: "2 days", difficulty: "Easy" },
    {
      id: "1.1.2",
      name: "Floating-point numbers",
      timeFrame: "2 days",
      difficulty: "Easy",
    },
    { id: "1.1.3", name: "Strings", timeFrame: "3 days", difficulty: "Easy" },
  ],
  "1.2": [
    {
      id: "1.2.1",
      name: "If-else statements",
      timeFrame: "2 days",
      difficulty: "Easy",
    },
    { id: "1.2.2", name: "Loops", timeFrame: "3 days", difficulty: "Medium" },
    {
      id: "1.2.3",
      name: "Switch statements",
      timeFrame: "2 days",
      difficulty: "Easy",
    },
  ],
  // Add more subbranch data for other nodes as needed
};

const nodeWidth = 200;
const nodeHeight = 80;
const verticalSpacing = 400; // Increased from 250 to 400
const horizontalSpacing = 250;

const createNode = (step: any, isMainNode = true, position: any) => ({
  id: step.id,
  type: "default",
  data: {
    label: (
      <>
        <strong>{step.name || "Unnamed Step"}</strong>
        <br />
        Time: {step.timeFrame || "N/A"}
        <br />
        Difficulty: {step.difficulty || "N/A"}
      </>
    ),
    isExpandable: !isMainNode,
  },
  position,
  style: {
    opacity: 0,
    background: isMainNode ? "#f0f0f0" : "#ffffff",
    border: "1px solid #222",
    borderRadius: "5px",
    padding: "10px",
    width: nodeWidth,
    height: nodeHeight,
    transition: "all 0.5s ease",
    cursor: !isMainNode ? "pointer" : "default",
  },
});

const createEdge = (source: any, target: any, animated = false) => ({
  id: `${source}-${target}`, // Fixing template literal
  source,
  target,
  type: "smoothstep",
  animated,
  style: { stroke: "#888", strokeWidth: 2 },
  markerEnd: {
    type: "ArrowClosed", // Assuming 'MarkerType.ArrowClosed' should be a string or external reference
    width: 20,
    height: 20,
  },
});
function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const addStep = useCallback(
    (step: any, index: any) => {
      const mainNodeX = horizontalSpacing;
      const mainNodeY = index * verticalSpacing;

      const mainNode = createNode(step, true, { x: mainNodeX, y: mainNodeY });
      const childNodes = step.children.map((child: any, childIndex: any) =>
        createNode(child, false, {
          x: childIndex * horizontalSpacing,
          y: mainNodeY + nodeHeight + 50,
        })
      );

      setNodes((nds) => [...nds, mainNode, ...childNodes]);

      const childEdges = step.children.map((child: any) =>
        createEdge(step.id, child.id)
      );
      setEdges((eds) => [...eds, ...childEdges]);

      if (index > 0) {
        const prevMainNodeId = Object.values(roadmapData)[index - 1].id;
        setEdges((eds) => [...eds, createEdge(prevMainNodeId, step.id, true)]);
      }

      setTimeout(() => {
        setNodes((nds) =>
          nds.map((node) =>
            node.id === step.id ||
            step.children.some((child: any) => child.id === node.id)
              ? { ...node, style: { ...node.style, opacity: 1 } }
              : node
          )
        );
      }, 100);
    },
    [setNodes, setEdges]
  );

  useEffect(() => {
    const steps = Object.values(roadmapData);
    if (currentStep < steps.length) {
      addStep(steps[currentStep], currentStep);
      if(currentStep){
        setTimeout(() => setCurrentStep(currentStep + 1), 3000);
      }else{
        setTimeout(() => setCurrentStep(currentStep + 1), 15000);
      }
      console.log(currentStep);
    }
  }, [currentStep, addStep]);

  // const [nodes, setNodes] = useState(initialNodes);
  // const [edges, setEdges] = useState(initialEdges);
  // const [role, setRole] = useState<any>();
  // const [company, setCompany] = useState<any>();
  // const supabase = createClient();

  // const proOptions = { hideAttribution: true };

  // const onNodesChange = useCallback(
  //   (changes: any) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
  //   []
  // );
  // const onEdgesChange = useCallback(
  //   (changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
  //   []
  // );
  // function stream() {
  //   const socket = new WebSocket("ws://localhost:8000/generate_roadmap");
  //   socket.onopen = () => {
  //     async function send_req() {
  //       const x = await supabase.auth.getUser();

  //       socket.send(x.data.user?.email!);
  //       socket.send(role);
  //       socket.send(company);
  //     }
  //     send_req();
  //   };
  //   socket.onmessage = (e) => {
  //     const data = JSON.parse(e.data);
  //     console.log(data);
  //     if (data.status == "completed") {
  //       socket.close();
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 2000);
  //       return;
  //     }
  //     for (let i in data) {
  //       setNodes((e: any) => [
  //         ...e,
  //         {
  //           id: data[i]["Step_name"],
  //           data: { label: data[i]["Step_name"] },
  //           position: {
  //             x: 0,
  //             y: (parseInt(data[i]["Step_number"]) - 1) * 100,
  //           },
  //         },
  //       ]);

  //       for (let j in data[i]["Prerequisites"]) {
  //         setEdges((e: any) => [
  //           ...e,
  //           {
  //             id: randomBytes(64),
  //             source: data[i]["Step_name"],
  //             target: data[i]["Prerequisites"][j],
  //           },
  //         ]);
  //       }
  //       for (let j in data[i]["Sub_steps"]) {
  //         setNodes((e: any) => [
  //           ...e,
  //           {
  //             id: data[i]["Sub_steps"][j]["Sub_step_name"],
  //             data: {
  //               label: data[i]["Sub_steps"][j]["Sub_step_name"],
  //             },
  //             position: { x: 50, y: (parseInt(i) - 1) * 100 },
  //           },
  //         ]);
  //         setEdges((e: any) => [
  //           ...e,
  //           {
  //             id: randomBytes(64),
  //             source: data[i]["Step_name"],
  //             target: data[i]["Sub_steps"][j]["Sub_step_name"],
  //           },
  //         ]);
  //       }
  //     }
  //   };
  //   socket.onclose = () => {
  //     console.log("conn closed");
  //   };
  //   return () => {
  //     socket.close();
  //   };
  // }
  return (
    <div className="">
      <Input
        className="bg-gray-400"
        placeholder="Enter role here..."
        // value={role}
        // onChange={(e) => setRole(e.target.value)}
      />
      <Input
        className="bg-gray-400"
        placeholder="Enter company here..."
        // value={company}
        // onChange={(e) => setCompany(e.target.value)}
      />
      <Dialog>
        <DialogTrigger >
          <div className="w-full bg-slate-200">Add</div>
        </DialogTrigger>
        <DialogContent className="bg-white rounded-lg shadow-lg w-[90%] max-w-5xl h-[90%] max-h-[90vh] flex flex-col">
          {/* <DialogHeader>Roadmap for XYZ</DialogHeader> */}
          <div className="flex-1 overflow-auto">
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
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Flow;
