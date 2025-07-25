import React, { useCallback, useState, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { InputNode } from '../components/nodes/InputNode';
import { OutputNode } from '../components/nodes/OutputNode';
import { TextNode } from '../components/nodes/TextNode';
import { LLMNode } from '../components/nodes/LLMNode';
import { MathNode } from '../components/nodes/MathNode';
import { DateNode } from '../components/nodes/DateNode';
import { APICallNode } from '../components/nodes/APICallNode';
import { FilterNode } from '../components/nodes/FilterNode';
import { MergeNode } from '../components/nodes/MergeNode';
import { Toolbar } from '../components/Toolbar';
import { SubmitButton } from '../components/SubmitButton';
import { useToast } from '@/hooks/use-toast';

const nodeTypes = {
  input: InputNode,
  output: OutputNode,
  text: TextNode,
  llm: LLMNode,
  math: MathNode,
  date: DateNode,
  apiCall: APICallNode,
  filter: FilterNode,
  merge: MergeNode,
};

// Backend URLs configuration
const BACKEND_URLS = {
  production: 'https://node-pipeline-canvas-1.onrender.com',
  localhost: 'http://localhost:8000'
};

const initialNodes: Node[] = [
  {
    id: 'input-1',
    type: 'input',
    position: { x: 100, y: 100 },
    data: { inputName: 'input_1', inputType: 'Text' },
  },
  {
    id: 'text-1',
    type: 'text',
    position: { x: 400, y: 100 },
    data: { text: 'Process {{input}} with AI' },
  },
  {
    id: 'llm-1',
    type: 'llm',
    position: { x: 700, y: 100 },
    data: {},
  },
  {
    id: 'output-1',
    type: 'output',
    position: { x: 1000, y: 100 },
    data: { outputName: 'result', outputType: 'Text' },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: 'input-1',
    target: 'text-1',
    sourceHandle: 'input-1-value',
    targetHandle: 'text-1-input',
  },
  {
    id: 'e2-3',
    source: 'text-1',
    target: 'llm-1',
    sourceHandle: 'text-1-output',
    targetHandle: 'llm-1-prompt',
  },
  {
    id: 'e3-4',
    source: 'llm-1',
    target: 'output-1',
    sourceHandle: 'llm-1-response',
    targetHandle: 'output-1-value',
  },
];

const Index = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = {
        x: event.clientX - 250,
        y: event.clientY - 150,
      };

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: getDefaultNodeData(type),
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const getDefaultNodeData = (type: string) => {
    switch (type) {
      case 'input':
        return { inputName: `input_${Date.now()}`, inputType: 'Text' };
      case 'output':
        return { outputName: `output_${Date.now()}`, outputType: 'Text' };
      case 'text':
        return { text: 'Enter your text here {{variable}}' };
      case 'math':
        return { operation: 'add' };
      case 'date':
        return { format: 'YYYY-MM-DD' };
      case 'apiCall':
        return { url: 'https://api.example.com', method: 'GET' };
      case 'filter':
        return { condition: 'contains' };
      case 'merge':
        return { strategy: 'concat' };
      default:
        return {};
    }
  };

  // Function to try making a request to a specific backend URL
  const makeBackendRequest = async (baseUrl: string, endpoint: string, options: RequestInit) => {
    const url = `${baseUrl}${endpoint}`;
    console.log(`Attempting request to: ${url}`);
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}: ${await response.text()}`);
    }
    
    return response;
  };

  // Function to try multiple backend URLs
  const tryBackendRequest = async (endpoint: string, options: RequestInit) => {
    const urls = [BACKEND_URLS.production, BACKEND_URLS.localhost];
    let lastError = null;
    
    for (const baseUrl of urls) {
      try {
        console.log(`Trying backend: ${baseUrl}`);
        const response = await makeBackendRequest(baseUrl, endpoint, options);
        console.log(`Success with backend: ${baseUrl}`);
        return { response, usedUrl: baseUrl };
      } catch (error) {
        console.log(`Failed with ${baseUrl}:`, error);
        lastError = error;
        
        // If it's a network error, try the next URL
        if (error instanceof Error && 
            (error.message.includes('Failed to fetch') || 
             error.message.includes('NetworkError') ||
             error.message.includes('fetch'))) {
          continue;
        }
        
        // If it's a server error (not network), don't try other URLs
        throw error;
      }
    }
    
    // If all URLs failed, throw the last error
    throw lastError || new Error('All backend URLs failed');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      console.log('Submitting pipeline data:', { nodes, edges });
      
      // Clean the data before sending - remove UI-specific properties
      const cleanedNodes = nodes.map(node => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: node.data
      }));
      
      const cleanedEdges = edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle
      }));

      console.log('Cleaned data:', { nodes: cleanedNodes, edges: cleanedEdges });

      // First check if any backend is running
      console.log('Checking backend connection...');
      const { response: healthResponse, usedUrl } = await tryBackendRequest('/', {
        method: 'GET',
      });

      console.log(`Backend is running at ${usedUrl}, sending pipeline data...`);

      const { response } = await tryBackendRequest('/pipelines/parse', {
        method: 'POST',
        body: JSON.stringify({ 
          nodes: cleanedNodes, 
          edges: cleanedEdges 
        }),
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('Pipeline analysis result:', result);
        toast({
          title: "Pipeline Analysis Complete",
          description: `Pipeline has ${result.num_nodes} nodes, ${result.num_edges} edges. Is DAG? ${result.is_dag ? '✅' : '❌'}`,
          duration: 5000,
        });
      } else {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`Server returned ${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      let errorMessage = 'Unknown error';
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch') || 
            error.message.includes('All backend URLs failed')) {
          errorMessage = `Cannot connect to backend. Tried both production (${BACKEND_URLS.production}) and localhost (${BACKEND_URLS.localhost}). Make sure at least one backend is running.`;
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Error",
        description: `Failed to analyze pipeline: ${errorMessage}`,
        variant: "destructive",
        duration: 10000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="h-screen flex flex-col">
        <div className="flex-1 flex">
          <Toolbar />
          <div className="flex-1 relative">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              fitView
              className="bg-slate-950"
              connectionLineStyle={{ stroke: '#3b82f6', strokeWidth: 2 }}
              defaultEdgeOptions={{
                style: { stroke: '#3b82f6', strokeWidth: 2 },
                animated: true,
              }}
            >
              <Controls className="bg-slate-800 border-slate-700" />
              <MiniMap
                className="bg-slate-800 border-slate-700"
                nodeColor="#1e293b"
                maskColor="rgba(0, 0, 0, 0.2)"
              />
              <Background
                variant={BackgroundVariant.Dots}
                gap={20}
                size={1}
                color="#374151"
              />
            </ReactFlow>
            <div className="absolute bottom-4 right-4 z-10">
              <SubmitButton onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
