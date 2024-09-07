"use client";
import React, { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  addEdge,
  BackgroundVariant,
  MarkerType,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { createClient } from "@/utils/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface RoadmapStep {
  Step_number: number;
  Step_name: string;
  Time_frame: string;
  Description: string;
  Difficulty: string;
  Prerequisites: string[];
  Sub_steps: SubStep[];
  Resources: string[];
  Status: string;
}

interface SubStep {
  Sub_step_number: number;
  Sub_step_name: string;
  Sub_step_description: string;
  Difficulty: string;
  Status: string;
}

const nodeWidth = 250;
const nodeHeight = 100;
const verticalSpacing = 200;
const horizontalSpacing = 300;

function RoadmapTreeFlowStream() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [role, setRole] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [roadmapData, setRoadmapData] = useState<any[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const supabase = createClient();

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  const createNode = (step: RoadmapStep | SubStep, isMainNode: boolean = true, position: { x: number; y: number }): Node => ({
    id: isMainNode ? (step as RoadmapStep).Step_name : (step as SubStep).Sub_step_name,
    type: 'default',
    data: {
      label: (
        <>
          <strong>{isMainNode ? (step as RoadmapStep).Step_name : (step as SubStep).Sub_step_name}</strong>
          <br />
          {isMainNode && `Time: ${(step as RoadmapStep).Time_frame}`}
          <br />
          Difficulty: {step.Difficulty}
        </>
      ),
    },
    position,
    style: {
      background: isMainNode ? '#f0f0f0' : '#ffffff',
      border: '1px solid #222',
      borderRadius: '5px',
      padding: '10px',
      width: nodeWidth,
      height: nodeHeight,
    },
  });

  const createEdge = (source: string, target: string): Edge => ({
    id: `e${source}-${target}`,
    source,
    target,
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#888', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
  });

  const addNextStep = useCallback(() => {
    if (currentStepIndex < roadmapData.length) {
      const step = roadmapData[currentStepIndex];
      
      // Position the main step vertically at the center
      const mainNode = createNode(step, true, { x: 0, y: currentStepIndex * verticalSpacing });
      setNodes((nds) => [...nds, mainNode]);
  
      step.Prerequisites.forEach((prerequisite: string) => {
        setEdges((eds) => [...eds, createEdge(prerequisite, step.Step_name)]);
      });
  
      const subStepsCount = step.Sub_steps.length;
      const halfCount = Math.ceil(subStepsCount / 2); // Split the substeps into two halves
  
      step.Sub_steps.forEach((subStep: any, subIndex: number) => {
        if (isSubStep(subStep)) {
          // Position substeps to the left or right based on the index
          const isLeftSide = subIndex < halfCount;
          const xOffset = isLeftSide
            ? -(halfCount - subIndex) * horizontalSpacing  // Substeps on the left
            : (subIndex - halfCount + 1) * horizontalSpacing;  // Substeps on the right
  
          const subNode = createNode(subStep, false, {
            x: xOffset,
            y: currentStepIndex * verticalSpacing + nodeHeight + 20,  // Slightly below the main step
          });
          setNodes((nds) => [...nds, subNode]);
          setEdges((eds) => [...eds, createEdge(step.Step_name, subStep.Sub_step_name)]);
        }
      });
  
      setCurrentStepIndex((prev) => prev + 1);
    } else if (currentStepIndex === roadmapData.length && roadmapData.length > 0) {
      setTimeout(() => {
        window.location.reload();
      }, 2000); 
    }
  }, [currentStepIndex, roadmapData]);

  useEffect(() => {
    if (roadmapData.length > 0 && currentStepIndex < roadmapData.length) {
      const timer = setTimeout(() => {
        addNextStep();
      }, 1000); // Adjust this delay as needed

      return () => clearTimeout(timer);
    }
  }, [roadmapData, currentStepIndex, addNextStep]);

  const generateRoadmap = useCallback(async () => {
    setIsGenerating(true);
    setNodes([]);
    setEdges([]);
    setRoadmapData([]);
    setCurrentStepIndex(0);
    setIsCompleted(false);

    const socket = new WebSocket("ws://localhost:8000/generate_roadmap");
    
    socket.onopen = async () => {
      const user = await supabase.auth.getUser();
      await socket.send(user.data.user?.email || "");
      await socket.send(role);
      await socket.send(company);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.status === "completed") {
          socket.close();
          return;
        }

        setRoadmapData((prevData) => [...prevData, ...Object.values(data)]);
      } catch (error) {
        console.error("Error processing message:", error);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsGenerating(false);
    };
  }, [role, company, supabase]);

  function isRoadmapStep(step: any): step is RoadmapStep {
    return (
      typeof step === 'object' &&
      'Step_number' in step &&
      'Step_name' in step &&
      'Time_frame' in step &&
      'Description' in step &&
      'Difficulty' in step &&
      'Prerequisites' in step &&
      'Sub_steps' in step &&
      'Resources' in step &&
      'Status' in step
    );
  }

  function isSubStep(subStep: any): subStep is SubStep {
    return (
      typeof subStep === 'object' &&
      'Sub_step_number' in subStep &&
      'Sub_step_name' in subStep &&
      'Sub_step_description' in subStep &&
      'Difficulty' in subStep &&
      'Status' in subStep
    );
  }

   return (
    <div className="p-4">
      <div className="mb-4 space-y-2">
        <Input
          className="bg-gray-100"
          placeholder="Enter role here..."
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <Input
          className="bg-gray-100"
          placeholder="Enter company here..."
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={generateRoadmap} disabled={isGenerating}>
              {isGenerating ? "Generating..." : "Generate Roadmap"}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90vw] w-full max-h-[90vh] h-full p-0">
            <DialogHeader className="p-4">
              <h2 className="text-lg font-semibold">Roadmap for {role} at {company}</h2>
            </DialogHeader>
            <div className="flex-1 overflow-hidden h-full w-full ">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}

              >
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
              </ReactFlow>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default RoadmapTreeFlowStream;