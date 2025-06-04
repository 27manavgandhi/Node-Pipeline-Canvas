from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import uvicorn
import os

app = FastAPI(
    title="Node Pipeline Canvas API",
    description="API for analyzing node-based pipelines",
    version="1.0.0"
)

# Configure CORS with specific origins for production and development
origins = [
    "http://localhost:3000",  # Local development (React)
    "http://localhost:5173",  # Vite dev server (default)
    "http://localhost:8080",  # Your Vite dev server port
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:8080",  # Your Vite dev server port
    "https://node-pipeline-canvas.onrender.com",  # Your frontend URL
    "https://node-pipeline-canvas-1.onrender.com",  # Your backend URL (for health checks)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool
    message: str

@app.get('/')
def read_root():
    """Health check endpoint"""
    return {
        'message': 'Pipeline API is running', 
        'status': 'ok',
        'version': '1.0.0',
        'endpoints': {
            'health': '/',
            'parse_pipeline': '/pipelines/parse'
        }
    }

@app.get('/health')
def health_check():
    """Alternative health check endpoint"""
    return {'status': 'healthy', 'service': 'node-pipeline-canvas-api'}

def has_cycle(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Detect if the graph has a cycle using DFS-based approach.
    Returns True if cycle exists, False if it's a DAG.
    """
    try:
        if not nodes:
            return False
            
        # Build adjacency list
        graph = {node.id: [] for node in nodes}
        node_ids = {node.id for node in nodes}
        
        # Only add edges where both source and target exist
        valid_edges = []
        for edge in edges:
            if edge.source in node_ids and edge.target in node_ids:
                graph[edge.source].append(edge.target)
                valid_edges.append(edge)
        
        # Track node states: 0=unvisited, 1=visiting, 2=visited
        state = {node.id: 0 for node in nodes}
        
        def dfs(node_id: str) -> bool:
            if node_id not in state:
                return False
                
            if state[node_id] == 1:  # Back edge found, cycle detected
                return True
            if state[node_id] == 2:  # Already processed
                return False
            
            state[node_id] = 1  # Mark as visiting
            
            for neighbor in graph.get(node_id, []):
                if dfs(neighbor):
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
        # Return False (assume no cycle) if there's an error in detection
        return False

@app.post('/pipelines/parse', response_model=PipelineResponse)
def parse_pipeline(pipeline: PipelineRequest):
    """
    Analyze the pipeline and return node count, edge count, and DAG status.
    """
    try:
        print(f"Received pipeline with {len(pipeline.nodes)} nodes and {len(pipeline.edges)} edges")
        
        # Validate input data
        if not pipeline.nodes:
            raise HTTPException(status_code=400, detail="Pipeline must contain at least one node")
        
        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)
        
        # Check if the graph is a DAG (no cycles)
        has_cycles = has_cycle(pipeline.nodes, pipeline.edges)
        is_dag = not has_cycles
        
        # Create response message
        dag_status = "✅ Valid DAG" if is_dag else "❌ Contains cycles"
        message = f"Pipeline analyzed: {num_nodes} nodes, {num_edges} edges. {dag_status}"
        
        response = PipelineResponse(
            num_nodes=num_nodes,
            num_edges=num_edges,
            is_dag=is_dag,
            message=message
        )
        
        print(f"Analysis complete - Nodes: {num_nodes}, Edges: {num_edges}, Is DAG: {is_dag}")
        return response
    
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        error_message = f"Error parsing pipeline: {str(e)}"
        print(error_message)
        raise HTTPException(status_code=500, detail=error_message)

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Global exception handler for unhandled errors"""
    print(f"Unhandled exception: {str(exc)}")
    return {
        "error": "Internal server error",
        "detail": str(exc),
        "status_code": 500
    }

# Handle preflight requests
@app.options("/{full_path:path}")
async def options_handler(full_path: str):
    """Handle preflight OPTIONS requests"""
    return {"message": "OK"}

if __name__ == "__main__":
    # Get port from environment variable for deployment platforms like Render
    port = int(os.environ.get("PORT", 8000))
    host = "0.0.0.0"
    
    print(f"Starting FastAPI server on http://{host}:{port}")
    print(f"API docs available at: http://{host}:{port}/docs")
    print(f"Health check: http://{host}:{port}/")
    
    uvicorn.run(
        app, 
        host=host, 
        port=port, 
        reload=False,  # Set to False for production
        log_level="info"
    )
