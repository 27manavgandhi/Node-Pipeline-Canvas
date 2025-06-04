
# Node Pipeline Canvas

A professional visual pipeline editor for building and analyzing data workflows. Built with React, TypeScript, and FastAPI.

![Node Pipeline Canvas](https://img.shields.io/badge/Status-Production%20Ready-green)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-green)

## 🌟 Features

### Visual Pipeline Editor
- **Drag & Drop Interface**: Intuitive node placement from toolbar to canvas
- **9 Specialized Node Types**: Input, Output, Text, LLM, Math, Date, API Call, Filter, and Merge nodes
- **Smart Connections**: Visual handle-based node connections with validation
- **Interactive Canvas**: Pan, zoom, select, and move nodes with smooth animations

### Advanced Node Capabilities
- **Dynamic Text Processing**: Text nodes with `{{variable}}` syntax and auto-generated input handles
- **Configurable Operations**: Math and Date nodes with dropdown configuration options
- **Color-Coded System**: Each node type has distinct visual identity
- **Professional Styling**: Modern dark theme with gradient effects

### Pipeline Analysis Engine
- **Real-time Analysis**: Submit pipelines for instant structural analysis
- **DAG Validation**: Detects cycles and validates Directed Acyclic Graph structure
- **Comprehensive Metrics**: Node count, edge count, and connectivity analysis
- **Error Detection**: Identifies and reports pipeline issues

### Technical Excellence
- **Full TypeScript**: End-to-end type safety
- **React Flow Integration**: Latest @xyflow/react for optimal performance
- **RESTful API**: FastAPI backend with automatic documentation
- **Modern UI**: Tailwind CSS with shadcn/ui components

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Python 3.8+ and pip

### Frontend Setup
```bash
# Clone and install dependencies
git clone <repository-url>
cd node-pipeline-canvas
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start FastAPI server
python run.py / uvicorn run:app --reload
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 📋 Node Types Guide

### Input Node (Green)
- **Purpose**: Define pipeline inputs
- **Handles**: 1 output handle
- **Configuration**: Input name and data type

### Output Node (Red)
- **Purpose**: Define pipeline outputs  
- **Handles**: 1 input handle
- **Configuration**: Output name and data type

### Text Node (Purple)
- **Purpose**: Text processing with variable substitution
- **Handles**: Dynamic inputs based on `{{variables}}`, 1 output
- **Configuration**: Text content with variable syntax
- **Example**: `"Process {{input}} with AI"` creates an input handle for "input"

### LLM Node (Blue)
- **Purpose**: Large Language Model operations
- **Handles**: 2 inputs (system prompt, user prompt), 1 output
- **Use Case**: AI text generation and processing

### Math Node (Orange)
- **Purpose**: Mathematical operations
- **Handles**: 2 inputs (A, B), 1 output (result)
- **Operations**: Add, Subtract, Multiply, Divide, Power, Modulo

### Date Node (Yellow)
- **Purpose**: Date formatting and manipulation
- **Handles**: 1 input (date), 1 output (formatted)
- **Formats**: YYYY-MM-DD, MM/DD/YYYY, ISO 8601, Unix timestamp, etc.

### API Call Node (Indigo)
- **Purpose**: External API integrations
- **Handles**: Multiple inputs for parameters, 1 output
- **Configuration**: URL, HTTP method, headers

### Filter Node (Pink)
- **Purpose**: Data filtering operations
- **Handles**: 1 input (data), 1 output (filtered)
- **Conditions**: Contains, equals, greater than, etc.

### Merge Node (Cyan)
- **Purpose**: Combine multiple data sources
- **Handles**: Multiple inputs, 1 output
- **Strategies**: Concatenate, merge objects, union arrays

## 🔧 Pipeline Analysis

### DAG Validation
The system automatically detects cycles in your pipeline:
- ✅ **Valid DAG**: No cycles detected, pipeline can be executed
- ❌ **Invalid**: Cycles found, requires restructuring

### Analysis Metrics
- **Node Count**: Total number of nodes in pipeline
- **Edge Count**: Total number of connections
- **Structure Validation**: Ensures logical flow integrity

## 🏗️ Architecture

### Frontend Architecture
```
src/
├── components/
│   ├── nodes/           # Individual node components
│   ├── ui/              # Reusable UI components
│   ├── Toolbar.tsx      # Node library sidebar
│   └── SubmitButton.tsx # Pipeline submission
├── pages/
│   └── Index.tsx        # Main application page
└── hooks/               # Custom React hooks
```

### Backend Architecture
```
backend/
├── main.py              # FastAPI application
├── run.py               # Server startup script
├── requirements.txt     # Python dependencies
└── README.md           # Backend documentation
```

### Key Technologies
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Flow Engine**: @xyflow/react for node-based interface
- **Backend**: FastAPI, Pydantic, Uvicorn
- **UI Components**: shadcn/ui, Lucide React icons
- **State Management**: React hooks, TanStack Query

## 🎯 Usage Examples

### Basic Pipeline
1. Drag an **Input Node** to canvas
2. Add a **Text Node** with content: `"Hello {{name}}!"`
3. Connect Input → Text (name variable)
4. Add **Output Node** and connect Text → Output
5. Click **Submit Pipeline** for analysis

### AI Processing Pipeline
1. **Input Node** → **Text Node** (prompt template)
2. **Text Node** → **LLM Node** (AI processing)  
3. **LLM Node** → **Output Node** (final result)

### Data Processing Pipeline
1. **Input Node** → **Filter Node** (data filtering)
2. **Filter Node** → **Math Node** (calculations)
3. **Math Node** → **Date Node** (timestamp formatting)
4. **Date Node** → **Output Node** (processed result)

## 🧪 Testing & Validation

### Manual Testing Checklist
- [ ] Drag nodes from toolbar to canvas
- [ ] Connect nodes using handles
- [ ] Edit node configurations
- [ ] Submit pipeline for analysis
- [ ] Verify DAG validation results
- [ ] Test error handling scenarios

### API Testing
```bash
# Test backend health
curl http://localhost:8000/

# Test pipeline analysis
curl -X POST http://localhost:8000/pipelines/parse \
  -H "Content-Type: application/json" \
  -d '{"nodes": [...], "edges": [...]}'
```

## 🐛 Troubleshooting

### Common Issues

**"Failed to analyze pipeline"**
- Ensure backend is running on port 8000
- Check browser console for detailed errors
- Verify CORS configuration

**Nodes not connecting**
- Ensure you're dragging from output to input handles
- Check handle positioning and visibility
- Verify node types support connections

**Drag and drop not working**
- Clear browser cache
- Check for JavaScript errors in console
- Ensure proper event handlers are attached

### Development Tips
- Use browser DevTools to inspect React Flow state
- Check backend logs for API errors
- Enable verbose logging for debugging
- Test with minimal pipeline first

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎉 Acknowledgments

- Built with [React Flow](https://reactflow.dev/) for the visual pipeline interface
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Backend powered by [FastAPI](https://fastapi.tiangolo.com/)

---

**Ready to build amazing data pipelines? Start by dragging your first node!** 🚀
