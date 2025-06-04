
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import uvicorn

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str = None
    targetHandle: str = None

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

@app.get('/')
def read_root():
    return {'message': 'Pipeline API is running', 'status': 'ok'}

def has_cycle(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Detect if the graph has a cycle using DFS-based approach.
    Returns True if cycle exists, False if it's a DAG.
    """
    try:
        # Build adjacency list
        graph = {node.id: [] for node in nodes}
        for edge in edges:
            if edge.source in graph and edge.target in graph:
                graph[edge.source].append(edge.target)
        
        # Track node states: 0=unvisited, 1=visiting, 2=visited
        state = {node.id: 0 for node in nodes}
        
        def dfs(node_id: str) -> bool:
            if state[node_id] == 1:  # Back edge found, cycle detected
                return True
            if state[node_id] == 2:  # Already processed
                return False
            
            state[node_id] = 1  # Mark as visiting
            
            for neighbor in graph.get(node_id, []):
                if neighbor in state and dfs(neighbor):
                    return True
            
            state[node_id] = 2  # Mark as visited
            return False
        
        # Check all nodes for cycles
        for node in nodes:
            if state[node.id] == 0:
                if dfs(node.id):
                    return True
        
        return False
    except Exception as e:
        print(f"Error in cycle detection: {str(e)}")
        return False

@app.post('/pipelines/parse', response_model=PipelineResponse)
def parse_pipeline(pipeline: PipelineRequest):
    """
    Analyze the pipeline and return node count, edge count, and DAG status.
    """
    try:
        print(f"Received pipeline with {len(pipeline.nodes)} nodes and {len(pipeline.edges)} edges")
        
        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)
        
        # Check if the graph is a DAG (no cycles)
        is_dag = not has_cycle(pipeline.nodes, pipeline.edges)
        
        response = PipelineResponse(
            num_nodes=num_nodes,
            num_edges=num_edges,
            is_dag=is_dag
        )
        
        print(f"Analysis complete - Nodes: {num_nodes}, Edges: {num_edges}, Is DAG: {is_dag}")
        return response
    
    except Exception as e:
        error_message = f"Error parsing pipeline: {str(e)}"
        print(error_message)
        raise HTTPException(status_code=500, detail=error_message)

if __name__ == "__main__":
    print("Starting FastAPI server on http://localhost:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
