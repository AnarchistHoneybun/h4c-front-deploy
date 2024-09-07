"use client";
import React, { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  Controls,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  NodeTypes,
  EdgeTypes,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  addEdge,
  MarkerType,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { createClient } from "@/utils/supabase/client";


interface SubStep {
  Sub_step_number: number;
  Sub_step_name: string;
  Sub_step_description: string;
  Difficulty: string;
  Status: string;
  Substep_roadmap: any;
}

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
  roadmap_type: string;
}

interface RoadmapData {
  [key: string]: RoadmapStep;
}

const roadmapData: RoadmapData = {
  1: {
    Step_number: 1,
    Step_name: 'Foundation in Financial Analysis',
    Time_frame: '3-4 months',
    Description:
      'Develop a strong understanding of core financial concepts and analytical techniques.',
    Difficulty: 'Beginner',
    Prerequisites: [],
    Sub_steps: [
      {
        Sub_step_number: 1,
        Sub_step_name: 'Financial Accounting Fundamentals',
        Sub_step_description:
          'Learn the basics of accounting, including balance sheets, income statements, and cash flow statements.',
        Difficulty: 'Beginner',
        Status: 'Incomplete',
        Substep_roadmap: null,
      },
      {
        Sub_step_number: 2,
        Sub_step_name: 'Financial Ratios and Analysis',
        Sub_step_description:
          'Master common financial ratios and their interpretation to assess company performance.',
        Difficulty: 'Beginner',
        Status: 'Incomplete',
        Substep_roadmap: null,
      },
      {
        Sub_step_number: 3,
        Sub_step_name: 'Valuation Methods',
        Sub_step_description:
          'Explore various valuation techniques like discounted cash flow (DCF) analysis, comparable company analysis, and precedent transactions.',
        Difficulty: 'Beginner',
        Status: 'Incomplete',
        Substep_roadmap: null,
      },
    ],
    Resources: ['Investopedia', 'Khan Academy', 'Corporate Finance Institute'],
    Status: 'Incomplete',
    roadmap_type: 'Business and Finance',
  },
  2: {
    Step_number: 2,
    Step_name: 'Data Analysis Skills',
    Time_frame: '2-3 months',
    Description:
      'Develop proficiency in data analysis tools and techniques commonly used in financial analysis.',
    Difficulty: 'Intermediate',
    Prerequisites: ['Foundation in Financial Analysis'],
    Sub_steps: [
      {
        Sub_step_number: 1,
        Sub_step_name: 'Microsoft Excel Mastery',
        Sub_step_description:
          'Gain expertise in advanced Excel functions, formulas, and data visualization.',
        Difficulty: 'Intermediate',
        Status: 'Incomplete',
        Substep_roadmap: null,
      },
      {
        Sub_step_number: 2,
        Sub_step_name: 'Introduction to SQL',
        Sub_step_description:
          'Learn the basics of SQL for data retrieval and manipulation.',
        Difficulty: 'Intermediate',
        Status: 'Incomplete',
        Substep_roadmap: null,
      },
      {
        Sub_step_number: 3,
        Sub_step_name: 'Data Visualization Tools',
        Sub_step_description:
          'Explore data visualization tools like Tableau or Power BI to create impactful presentations.',
        Difficulty: 'Intermediate',
        Status: 'Incomplete',
        Substep_roadmap: null,
      },
    ],
    Resources: ['Coursera', 'Udemy', 'DataCamp'],
    Status: 'Incomplete',
    roadmap_type: 'Business and Finance',
  },
  3: {
    Step_number: 3,
    Step_name: 'Financial Modeling and Forecasting',
    Time_frame: '3-4 months',
    Description:
      'Build expertise in creating and analyzing financial models for business decision-making.',
    Difficulty: 'Advanced',
    Prerequisites: ['Data Analysis Skills'],
    Sub_steps: [
      {
        Sub_step_number: 1,
        Sub_step_name: 'Financial Modeling Concepts',
        Sub_step_description:
          'Understand the principles of financial modeling and their application in various scenarios.',
        Difficulty: 'Advanced',
        Status: 'Incomplete',
        Substep_roadmap: null,
      },
      {
        Sub_step_number: 2,
        Sub_step_name: 'Building Financial Models',
        Sub_step_description:
          'Develop proficiency in building financial models using Excel or dedicated modeling software.',
        Difficulty: 'Advanced',
        Status: 'Incomplete',
        Substep_roadmap: null,
      },
      {
        Sub_step_number: 3,
        Sub_step_name: 'Forecasting Techniques',
        Sub_step_description:
          'Learn various forecasting methods and their use in financial analysis.',
        Difficulty: 'Advanced',
        Status: 'Incomplete',
        Substep_roadmap: null,
      },
    ],
    Resources: [
      'Wall Street Prep',
      'Financial Modeling Institute',
      'Corporate Finance Institute',
    ],
    Status: 'Incomplete',
    roadmap_type: 'Business and Finance',
  },
  4: {
    Step_number: 4,
    Step_name: 'Industry Knowledge and HDFC Bank Specifics',
    Time_frame: '1-2 months',
    Description:
      "Gain knowledge of the Indian banking sector and HDFC Bank's operations, products, and services.",
    Difficulty: 'Intermediate',
    Prerequisites: ['Financial Modeling and Forecasting'],
    Sub_steps: [
      {
        Sub_step_number: 1,
        Sub_step_name: 'Indian Banking Industry Research',
        Sub_step_description:
          'Study the Indian banking landscape, key players, regulatory environment, and current trends.',
        Difficulty: 'Intermediate',
        Status: 'Incomplete',
        Substep_roadmap: null,
      },
      {
        Sub_step_number: 2,
        Sub_step_name: 'HDFC Bank Analysis',
        Sub_step_description:
          "Analyze HDFC Bank's financial statements, recent news, and key initiatives to understand its business model.",
        Difficulty: 'Intermediate',
        Status: 'Incomplete',
        Substep_roadmap: null,
      },
      {
        Sub_step_number: 3,
        Sub_step_name: 'Networking with HDFC Bank Professionals',
        Sub_step_description:
          'Connect with professionals at HDFC Bank through LinkedIn or industry events to gain insights.',
        Difficulty: 'Intermediate',
        Status: 'Incomplete',
        Substep_roadmap: null,
      },
    ],
    Resources: ['HDFC Bank Website', 'Industry Reports', 'LinkedIn'],
    Status: 'Incomplete',
    roadmap_type: 'Business and Finance',
  },
  5: {
    Step_number: 5,
    Step_name: 'Real-World Experience',
    Time_frame: '6-12 months',
    Description:
      'Gain practical experience through internships or projects that demonstrate your skills and knowledge.',
    Difficulty: 'Advanced',
    Prerequisites: ['Industry Knowledge and HDFC Bank Specifics'],
    Sub_steps: [
      {
        Sub_step_number: 1,
        Sub_step_name: 'Internship at HDFC Bank',
        Sub_step_description:
          "Apply for internships within HDFC Bank's financial analysis or related departments to gain hands-on experience.",
        Difficulty: 'Advanced',
        Status: 'Incomplete',
        Substep_roadmap: null,
      },
      {
        Sub_step_number: 2,
        Sub_step_name: 'Financial Modeling Projects',
        Sub_step_description:
          'Develop personal projects involving financial modeling for real-world scenarios to showcase your abilities.',
        Difficulty: 'Advanced',
        Status: 'Incomplete',
        Substep_roadmap: null,
      },
      {
        Sub_step_number: 3,
        Sub_step_name: 'Case Study Competitions',
        Sub_step_description:
          'Participate in financial analysis case study competitions to enhance problem-solving and presentation skills.',
        Difficulty: 'Advanced',
        Status: 'Incomplete',
        Substep_roadmap: null,
      },
    ],
    Resources: [
      'HDFC Bank Careers Page',
      'Financial Modeling Case Study Platforms',
      'Industry Competitions',
    ],
    Status: 'Incomplete',
    roadmap_type: 'Business and Finance',
  },
  6: {
    Step_number: 6,
    Step_name: 'Networking and Professional Development',
    Time_frame: 'Ongoing',
    Description:
      'Build your professional network and continuously update your skills to stay ahead in the competitive field.',
    Difficulty: 'Intermediate',
    Prerequisites: ['Real-World Experience'],
    Sub_steps: [
      {
        Sub_step_number: 1,
        Sub_step_name: 'Attend Industry Conferences',
        Sub_step_description:
          'Participate in financial analysis conferences and events to network and learn from industry experts.',
        Difficulty: 'Intermediate',
        Status: 'Incomplete',
        Substep_roadmap: null,
      },
      {
        Sub_step_number: 2,
        Sub_step_name: 'Join Professional Associations',
        Sub_step_description:
          'Become a member of relevant professional associations like the CFA Institute or the Indian Institute of Bankers.',
        Difficulty: 'Intermediate',
        Status: 'Incomplete',
        Substep_roadmap: null,
      },
      {
        Sub_step_number: 3,
        Sub_step_name: 'Stay Updated with Industry Trends',
        Sub_step_description:
          'Read industry publications, blogs, and research reports to stay informed about the latest developments in financial analysis.',
        Difficulty: 'Intermediate',
        Status: 'Incomplete',
        Substep_roadmap: null,
      },
    ],
    Resources: [
      'CFA Institute',
      'Indian Institute of Bankers',
      'Financial Times',
      'Bloomberg',
    ],
    Status: 'Incomplete',
    roadmap_type: 'Business and Finance',
  },
  7: {
    Step_number: 7,
    Step_name: 'Job Application and Interview Preparation',
    Time_frame: 'Ongoing',
    Description: 'Prepare for job applications and interviews at HDFC Bank.',
    Difficulty: 'Advanced',
    Prerequisites: ['Networking and Professional Development'],
    Sub_steps: [
      {
        Sub_step_number: 1,
        Sub_step_name: 'Tailor Your Resume and Cover Letter',
        Sub_step_description:
          "Customize your resume and cover letter to highlight your skills and experience relevant to HDFC Bank's requirements.",
        Difficulty: 'Advanced',
        Status: 'Incomplete',
        Substep_roadmap: null,
      },
      {
        Sub_step_number: 2,
        Sub_step_name: 'Practice Interview Questions',
        Sub_step_description:
          'Prepare for common interview questions, including behavioral, technical, and case study questions related to financial analysis.',
        Difficulty: 'Advanced',
        Status: 'Incomplete',
        Substep_roadmap: {
          1: {
            Sub_step_number: 1,
            Step_number: 1,
            Step_name: 'Identify Common Interview Questions',
            Time_frame: '1-2 days',
            Description:
              'Research and list common interview questions for financial analyst roles at HDFC and similar companies.',
            Difficulty: 'Beginner',
            Resources: [
              'Glassdoor',
              'Indeed',
              'LinkedIn',
              'Careercup',
              'LeetCode',
            ],
            Substep_roadmap: null,
            Status: 'Incomplete',
          },
          2: {
            Sub_step_number: 1,
            Step_number: 2,
            Step_name: 'Practice Behavioral Questions',
            Time_frame: '2-3 days',
            Description:
              'Prepare answers for behavioral questions focusing on your skills, experience, and motivation for the role.',
            Difficulty: 'Intermediate',
            Resources: [
              'STAR method',
              'Interviewing.io',
              'Pramp',
              'Mock interviews',
            ],
            Substep_roadmap: null,
            Status: 'Incomplete',
          },
          3: {
            Sub_step_number: 1,
            Step_number: 3,
            Step_name: 'Practice Technical Questions',
            Time_frame: '3-4 days',
            Description:
              'Prepare for technical questions related to financial analysis concepts, such as financial statements, valuation, and market analysis.',
            Difficulty: 'Advanced',
            Resources: [
              'Investopedia',
              'Wall Street Prep',
              'Corporate Finance Institute',
              'Financial Modeling',
              'Practice problems',
            ],
            Substep_roadmap: null,
            Status: 'Incomplete',
          },
          4: {
            Sub_step_number: 1,
            Step_number: 4,
            Step_name: 'Practice Case Studies',
            Time_frame: '2-3 days',
            Description:
              'Practice solving case studies related to financial analysis scenarios, focusing on your analytical and problem-solving skills.',
            Difficulty: 'Advanced',
            Resources: [
              'Case Interview Secrets',
              'Management Consulted',
              'Victor Cheng',
              'Case study competitions',
              'Mock interviews',
            ],
            Substep_roadmap: null,
            Status: 'Incomplete',
          },
          5: {
            Sub_step_number: 1,
            Step_number: 5,
            Step_name: 'Mock Interviewing',
            Time_frame: '1-2 days',
            Description:
              'Conduct mock interviews with peers or mentors to practice your responses and receive feedback.',
            Difficulty: 'Intermediate',
            Resources: [
              'Mock interview platforms',
              'Career services',
              'Mentorship programs',
              'Industry professionals',
            ],
            Substep_roadmap: null,
            Status: 'Incomplete',
          },
        },
      },
      {
        Sub_step_number: 3,
        Sub_step_name: 'Network for Referrals',
        Sub_step_description:
          'Leverage your network to seek referrals and insider information about open positions at HDFC Bank.',
        Difficulty: 'Advanced',
        Status: 'Incomplete',
        Substep_roadmap: null,
      },
    ],
    Resources: [
      'Glassdoor',
      'Indeed',
      'LinkedIn',
      'Interview Preparation Resources',
    ],
    Status: 'Incomplete',
    roadmap_type: 'Business and Finance',
  },
};

const nodeWidth = 250;
const nodeHeight = 100;
const verticalSpacing = 400;
const horizontalSpacing = 300;

interface ReactFlowWrapperProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  onNodeClick: (event: React.MouseEvent, node: Node) => void;
  nodeTypes: NodeTypes;
  edgeTypes: EdgeTypes;
}

const ReactFlowWrapper: React.FC<ReactFlowWrapperProps> = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  nodeTypes,
  edgeTypes
}) => (
  <ReactFlowProvider>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      fitView
    >
      <Controls />
      <MiniMap />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
    </ReactFlow>
  </ReactFlowProvider>
);

const createNode = (step: RoadmapStep | SubStep, isMainNode: boolean = true, position: { x: number; y: number }): Node => ({
  id: isMainNode
    ? (step as RoadmapStep).Step_number.toString()
    : `${(step as RoadmapStep).Step_number}.${(step as SubStep).Sub_step_number}`,
  type: 'default',
  data: {
    label: (
      <>
        <strong>{isMainNode ? (step as RoadmapStep).Step_name : (step as SubStep).Sub_step_name}</strong>
        <br />
        Time: {isMainNode ? (step as RoadmapStep).Time_frame : 'N/A'}
        <br />
        Difficulty: {step.Difficulty}
      </>
    ),
    isExpandable: isMainNode,
  },
  position,
  style: {
    opacity: 0,
    background: isMainNode ? '#f0f0f0' : '#ffffff',
    border: '1px solid #222',
    borderRadius: '5px',
    padding: '10px',
    width: nodeWidth,
    height: nodeHeight,
    transition: 'all 0.5s ease',
    cursor: isMainNode ? 'pointer' : 'default',
  },
});

const createEdge = (source: string, target: string, animated: boolean = false): Edge => ({
  id: `e${source}-${target}`,
  source,
  target,
  type: 'smoothstep',
  animated,
  style: { stroke: '#888', strokeWidth: 2 },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
  },
});

interface FlowProps {
  role: string;
  company: string;
}



function Flow({ role, company }: FlowProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
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
    [setEdges]
  );

  const addStep = useCallback(
    (step: RoadmapStep, index: number) => {
      const mainNodeX = horizontalSpacing;
      const mainNodeY = index * verticalSpacing;

      const mainNode = createNode(step, true, { x: mainNodeX, y: mainNodeY });
      const childNodes = step.Sub_steps.map((child, childIndex) =>
        createNode(child, false, {
          x: childIndex * horizontalSpacing,
          y: mainNodeY + nodeHeight + 50,
        })
      );

      setNodes((nds) => [...nds, mainNode, ...childNodes]);

      const childEdges = step.Sub_steps.map((child) =>
        createEdge(
          step.Step_number.toString(),
          `${child.Sub_step_number}.${child.Sub_step_name}`
        )
      );
      setEdges((eds) => [...eds, ...childEdges]);

      if (index > 0) {
        const prevMainNodeId = Object.values(roadmapData)[index - 1].Step_number.toString();
        setEdges((eds) => [
          ...eds,
          createEdge(prevMainNodeId, step.Step_number.toString(), true),
        ]);
      }

      setTimeout(() => {
        setNodes((nds) =>
          nds.map((node) =>
            node.id === step.Step_number.toString() ||
            step.Sub_steps.some(
              (child) => `${child.Sub_step_number}.${child.Sub_step_name}` === node.id
            )
              ? { ...node, style: { ...node.style, opacity: 1 } }
              : node
          )
        );
      }, 100);
    },
    [setNodes, setEdges]
  );

  useEffect(() => {
    async function fetchRoadmap() {
      const user = await supabase.auth.getUser();
      const response = await fetch(`http://localhost:8000/roadmap?username=${encodeURIComponent(user.data.user?.email!)}&role=${role}&company=${company}`);
      const data = await response.json();
      const temp = data["roadmap"];

      Object.values(temp["roadmap"]).forEach((step: any, index: number) => {
        let borderColor = "green";
        if (step["Difficulty"] === "Advanced") {
          borderColor = "red";
        } else if (step["Difficulty"] === "Intermediate") {
          borderColor = "yellow";
        }

        const newNode: Node = {
          id: step["Step_name"],
          data: { 
            label: (
              <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                {step["Step_name"]}
              </div>
            ) 
          },
          position: { x: 1000, y: (parseInt(index.toString()) - 1) * 100 },
          style: {
            border: `3px solid ${borderColor}`,
          },
        };

        setNodes((nds) => [...nds, newNode]);

        step["Prerequisites"].forEach((prerequisite: string) => {
          const newEdge: Edge = {
            id: Math.random().toString(),
            source: step["Step_name"],
            target: prerequisite,
            style: {
              strokeWidth: 3,
            },
          };
          setEdges((eds) => [...eds, newEdge]);
        });

        let sub_step_x_offset = 0;
        let sub_step_y_offset = 0;
        step["Sub_steps"].forEach((subStep: any, subIndex: number) => {
          const subStepNode: Node = {
            id: subStep["Sub_step_name"],
            data: {
              label: (
                <div style={{ fontWeight: "normal", fontSize: "14px", color: "#888" }}>
                  {subStep["Sub_step_name"]}
                </div>
              ),
            },
            position: {
              x: parseInt(subIndex.toString()) * 180 + sub_step_x_offset,
              y: parseInt(index.toString()) * 200 + sub_step_y_offset + parseInt(subIndex.toString()) * 20,
            },
            style: {
              border: "3px solid pink",
            },
          };
          setNodes((nds) => [...nds, subStepNode]);

          const subStepEdge: Edge = {
            id: Math.random().toString(),
            source: step["Step_name"],
            target: subStep["Sub_step_name"],
          };
          setEdges((eds) => [...eds, subStepEdge]);

          sub_step_x_offset += 500;
        });
      });
    }

    fetchRoadmap();
  }, [role, company, supabase]);

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      if (node.data.isExpandable) {
        const step = Object.values(roadmapData).find(
          (s) => s.Step_number.toString() === node.id
        );
        if (step) {
          const parentNode = nodes.find((n) => n.id === node.id);
          const subbranches = step.Sub_steps;

          if (parentNode) {
            const newNodes = subbranches.map((subbranch, index) =>
              createNode(subbranch, false, {
                x: parentNode.position.x + (index - 1) * horizontalSpacing,
                y: parentNode.position.y + nodeHeight + 100,
              })
            );

            const newEdges = subbranches.map((subbranch) =>
              createEdge(
                node.id,
                `${subbranch.Sub_step_number}.${subbranch.Sub_step_name}`
              )
            );

            setNodes((nds) => [...nds, ...newNodes]);
            setEdges((eds) => [...eds, ...newEdges]);

            setTimeout(() => {
              setNodes((nds) =>
                nds.map((n) =>
                  newNodes.some((newNode) => newNode.id === n.id)
                    ? { ...n, style: { ...n.style, opacity: 1 } }
                    : n
                )
              );
            }, 100);
          }
        }
      }
    },
    [nodes, setNodes, setEdges]
  );

  const nodeTypes: NodeTypes = React.useMemo(() => ({}), []);
  const edgeTypes: EdgeTypes = React.useMemo(() => ({}), []);

  return (
    <div className="h-full w-full">
      <ReactFlowWrapper
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      />
    </div>
  );
}

export default Flow;