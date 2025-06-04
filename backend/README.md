
# Backend API

FastAPI backend for the Node Pipeline Canvas application.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
python main.py
```

The server will start on `http://localhost:8000`

## API Endpoints

- `GET /` - Health check endpoint
- `POST /pipelines/parse` - Analyze pipeline and return metrics

### Pipeline Analysis

Send a POST request to `/pipelines/parse` with the following JSON structure:

```json
{
  "nodes": [
    {
      "id": "node-1",
      "type": "input",
      "position": {"x": 100, "y": 100},
      "data": {"inputName": "input_1", "inputType": "Text"}
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "node-1",
      "target": "node-2",
      "sourceHandle": "node-1-output",
      "targetHandle": "node-2-input"
    }
  ]
}
```

Response:
```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```
