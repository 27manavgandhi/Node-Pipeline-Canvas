
# Comprehensive Testing Guide

## 🧪 Complete Feature Testing Checklist

### Phase 1: Environment Setup
- [ ] **Frontend Setup**
  - [ ] `npm install` completes without errors
  - [ ] `npm run dev` starts development server
  - [ ] Application loads at http://localhost:5173
  - [ ] No console errors on initial load

- [ ] **Backend Setup**
  - [ ] `pip install -r requirements.txt` completes successfully
  - [ ] `cd backend && python run.py` starts FastAPI server
  - [ ] Server runs on http://localhost:8000
  - [ ] Health check endpoint returns success: `curl http://localhost:8000/`

### Phase 2: User Interface Testing

#### Toolbar Functionality
- [ ] **Node Library Visibility**
  - [ ] Left sidebar displays all 9 node types
  - [ ] Each node has correct icon and color
  - [ ] Instructions panel shows usage tips
  - [ ] Hover effects work on node buttons

- [ ] **Drag Operations**
  - [ ] Can grab any node from toolbar
  - [ ] Cursor changes to grabbing state
  - [ ] Dragging shows visual feedback
  - [ ] Can drag multiple different node types

#### Canvas Interactions
- [ ] **Basic Canvas Controls**
  - [ ] Pan: Click and drag empty canvas area
  - [ ] Zoom: Mouse wheel or pinch gesture
  - [ ] Controls panel: Zoom in/out buttons work
  - [ ] Fit view button centers and scales pipeline
  - [ ] MiniMap shows overview and allows navigation

- [ ] **Background and Visual Elements**
  - [ ] Dotted background grid visible
  - [ ] Dark theme applied consistently
  - [ ] MiniMap updates as you move around
  - [ ] Canvas boundaries work properly

### Phase 3: Node Creation and Configuration

#### Node Placement
- [ ] **Drop Functionality**
  - [ ] Drop node anywhere on canvas
  - [ ] Node appears at correct position
  - [ ] Default data populated correctly
  - [ ] Unique IDs generated for each node

#### Individual Node Testing

**Input Node (Green)**
- [ ] Displays "Input" title with download icon
- [ ] Has single output handle on right side
- [ ] Default data: `inputName` and `inputType`
- [ ] Handle connects to other nodes

**Output Node (Red)**
- [ ] Displays "Output" title with upload icon
- [ ] Has single input handle on left side
- [ ] Default data: `outputName` and `outputType`
- [ ] Accepts connections from other nodes

**Text Node (Purple)**
- [ ] Displays "Text" title with type icon
- [ ] Textarea for content editing
- [ ] Auto-resizes based on content
- [ ] **Variable Detection**:
  - [ ] Type `{{test}}` - should create input handle labeled "test"
  - [ ] Type `{{input}} and {{output}}` - should create 2 input handles
  - [ ] Variables list updates below textarea
  - [ ] Handle positions adjust based on variable count
- [ ] Single output handle on right side

**LLM Node (Blue)**
- [ ] Displays "LLM" title with robot emoji
- [ ] Two input handles: "System" and "Prompt"
- [ ] One output handle: "Response"
- [ ] Descriptive text about AI functionality

**Math Node (Orange)**
- [ ] Displays "Math" title with plus icon
- [ ] Dropdown with operations: Add, Subtract, Multiply, Divide, Power, Modulo
- [ ] Two input handles: "A" and "B"
- [ ] One output handle: "Result"
- [ ] Operation selection updates properly

**Date Node (Yellow)**
- [ ] Displays "Date" title with calendar icon
- [ ] Format dropdown with options:
  - [ ] YYYY-MM-DD
  - [ ] MM/DD/YYYY
  - [ ] DD/MM/YYYY
  - [ ] YYYY-MM-DD HH:mm:ss
  - [ ] ISO 8601
  - [ ] Unix Timestamp
- [ ] One input handle: "Date Input"
- [ ] One output handle: "Formatted"

**API Call Node (Indigo)**
- [ ] Displays "API Call" title with globe icon
- [ ] Configuration for URL and method
- [ ] Appropriate input/output handles

**Filter Node (Pink)**
- [ ] Displays "Filter" title with filter icon
- [ ] Condition configuration options
- [ ] Data input and filtered output handles

**Merge Node (Cyan)**
- [ ] Displays "Merge" title with merge icon
- [ ] Strategy selection options
- [ ] Multiple input capability

### Phase 4: Connection System Testing

#### Handle Interactions
- [ ] **Visual Feedback**
  - [ ] Handles highlight on hover
  - [ ] Connection line appears when dragging
  - [ ] Valid targets highlight during connection attempt
  - [ ] Invalid connections rejected appropriately

- [ ] **Connection Creation**
  - [ ] Drag from output handle to input handle
  - [ ] Edge appears with animation
  - [ ] Connection persists after creation
  - [ ] Multiple connections from single output work
  - [ ] Single input handle accepts only one connection

#### Edge Management
- [ ] **Edge Properties**
  - [ ] Edges are animated (flowing dots)
  - [ ] Blue color scheme matches theme
  - [ ] Smooth bezier curves
  - [ ] Proper arrow indicators

- [ ] **Edge Deletion**
  - [ ] Select edge by clicking
  - [ ] Delete with keyboard (Delete/Backspace)
  - [ ] Edge disappears completely
  - [ ] Handles remain functional

### Phase 5: Complex Pipeline Testing

#### Multi-Node Workflows
- [ ] **Linear Pipeline**
  - [ ] Input → Text → LLM → Output
  - [ ] All connections work properly
  - [ ] Visual flow is clear

- [ ] **Branched Pipeline**
  - [ ] One output feeding multiple inputs
  - [ ] Multiple sources feeding one destination
  - [ ] Complex interconnections

- [ ] **Variable Integration**
  - [ ] Text node with multiple variables
  - [ ] Connect different sources to each variable
  - [ ] Handles update dynamically as variables change

#### Pipeline Validation Scenarios
- [ ] **Valid DAG (No Cycles)**
  - [ ] Linear flow: A → B → C
  - [ ] Branched flow: A → B, A → C, B → D, C → D
  - [ ] Tree structure with multiple branches

- [ ] **Invalid DAG (Contains Cycles)**
  - [ ] Simple cycle: A → B → A
  - [ ] Complex cycle: A → B → C → A
  - [ ] Self-loop: A → A

### Phase 6: Backend Integration Testing

#### Pipeline Submission
- [ ] **Submit Button**
  - [ ] Button visible in bottom-right corner
  - [ ] Play icon and "Submit Pipeline" text
  - [ ] Gradient hover effects work
  - [ ] Loading state shows spinner and "Analyzing..." text

- [ ] **Data Transmission**
  - [ ] Check browser Network tab for API calls
  - [ ] Verify clean data structure (no UI properties)
  - [ ] Confirm POST to /pipelines/parse
  - [ ] Response contains expected structure

#### Response Handling
- [ ] **Success Scenarios**
  - [ ] Valid pipeline shows success toast
  - [ ] Toast displays: node count, edge count, DAG status
  - [ ] DAG: true shows ✅, DAG: false shows ❌
  - [ ] Toast auto-disappears after 5 seconds

- [ ] **Error Scenarios**
  - [ ] Backend not running shows connection error
  - [ ] Invalid data shows server error
  - [ ] Network issues handled gracefully
  - [ ] Error toasts show destructive styling
  - [ ] Error toasts persist longer (10 seconds)

### Phase 7: Backend API Testing

#### Direct API Testing
```bash
# Health Check
curl http://localhost:8000/
# Expected: {"message": "Pipeline API is running", "status": "ok"}

# Valid Pipeline Analysis
curl -X POST http://localhost:8000/pipelines/parse \
  -H "Content-Type: application/json" \
  -d '{
    "nodes": [
      {"id": "1", "type": "input", "position": {"x": 0, "y": 0}, "data": {}},
      {"id": "2", "type": "output", "position": {"x": 100, "y": 0}, "data": {}}
    ],
    "edges": [
      {"id": "e1", "source": "1", "target": "2"}
    ]
  }'
# Expected: {"num_nodes": 2, "num_edges": 1, "is_dag": true}

# Cycle Detection
curl -X POST http://localhost:8000/pipelines/parse \
  -H "Content-Type: application/json" \
  -d '{
    "nodes": [
      {"id": "1", "type": "input", "position": {"x": 0, "y": 0}, "data": {}},
      {"id": "2", "type": "text", "position": {"x": 100, "y": 0}, "data": {}}
    ],
    "edges": [
      {"id": "e1", "source": "1", "target": "2"},
      {"id": "e2", "source": "2", "target": "1"}
    ]
  }'
# Expected: {"num_nodes": 2, "num_edges": 2, "is_dag": false}
```

#### Backend Logging
- [ ] **Console Output**
  - [ ] Server startup message appears
  - [ ] Request logging shows pipeline data
  - [ ] Analysis results logged
  - [ ] Error messages for invalid requests

### Phase 8: Advanced Feature Testing

#### Dynamic Text Node Behavior
- [ ] **Variable Management**
  - [ ] Start with `{{input}}` - 1 handle appears
  - [ ] Change to `{{name}} {{age}}` - 2 handles appear
  - [ ] Remove variables - handles disappear
  - [ ] Handles maintain connections during variable changes

- [ ] **Edge Cases**
  - [ ] Empty text content
  - [ ] Invalid variable syntax `{input}`
  - [ ] Nested brackets `{{outer {{inner}} }}`
  - [ ] Special characters in variable names

#### Performance Testing
- [ ] **Large Pipelines**
  - [ ] Create 20+ nodes
  - [ ] Multiple complex connections
  - [ ] Smooth performance maintained
  - [ ] Memory usage reasonable

- [ ] **Rapid Interactions**
  - [ ] Quick drag-and-drop operations
  - [ ] Fast connection creation/deletion
  - [ ] Multiple rapid submissions
  - [ ] UI remains responsive

### Phase 9: Error Recovery Testing

#### Frontend Error Scenarios
- [ ] **Network Failures**
  - [ ] Disconnect internet during submission
  - [ ] Backend server stopped mid-request
  - [ ] Timeout scenarios

- [ ] **Invalid State Recovery**
  - [ ] Corrupt pipeline data
  - [ ] Missing node types
  - [ ] Broken connections

#### Backend Error Scenarios
- [ ] **Invalid Requests**
  - [ ] Missing required fields
  - [ ] Invalid node structure
  - [ ] Malformed JSON

- [ ] **Server Errors**
  - [ ] Cycle detection failures
  - [ ] Memory constraints
  - [ ] Unexpected data types

### Phase 10: Cross-Browser Testing

#### Browser Compatibility
- [ ] **Chrome** (Latest)
  - [ ] All features work correctly
  - [ ] Performance is optimal
  - [ ] DevTools show no errors

- [ ] **Firefox** (Latest)
  - [ ] Drag and drop functionality
  - [ ] CSS animations work
  - [ ] API calls succeed

- [ ] **Safari** (Latest)
  - [ ] Touch interactions (if applicable)
  - [ ] WebKit-specific features
  - [ ] Network requests work

- [ ] **Edge** (Latest)
  - [ ] Microsoft-specific behaviors
  - [ ] Compatibility mode testing

### Phase 11: Final Integration Test

#### Complete Workflow Test
1. [ ] **Setup**: Start both frontend and backend
2. [ ] **Create Pipeline**:
   - [ ] Drag Input node to canvas
   - [ ] Add Text node with content: `"Hello {{name}}, you are {{age}} years old"`
   - [ ] Connect Input to both Text node variables
   - [ ] Add LLM node and connect Text output to LLM prompt
   - [ ] Add Output node and connect LLM response to Output
3. [ ] **Validate Structure**:
   - [ ] 4 nodes total
   - [ ] 4 connections total
   - [ ] No cycles (valid DAG)
4. [ ] **Submit and Verify**:
   - [ ] Click Submit Pipeline
   - [ ] Success toast appears
   - [ ] Shows: "4 nodes, 4 edges, Is DAG? ✅"

#### Edge Case Workflow
1. [ ] **Create Cycle**:
   - [ ] Input → Text → Output → Input (cycle)
2. [ ] **Submit and Verify**:
   - [ ] Shows: "3 nodes, 3 edges, Is DAG? ❌"

## 🎯 Test Results Summary

### Expected Success Criteria
- [ ] All UI interactions work smoothly
- [ ] All node types function correctly
- [ ] Connection system is reliable
- [ ] Backend analysis is accurate
- [ ] Error handling is comprehensive
- [ ] Performance is acceptable
- [ ] Cross-browser compatibility

### Performance Benchmarks
- [ ] Page load time < 3 seconds
- [ ] Node creation time < 100ms
- [ ] Connection creation time < 50ms
- [ ] API response time < 1 second
- [ ] Large pipeline (20+ nodes) handles smoothly

### Quality Metrics
- [ ] Zero console errors in normal operation
- [ ] Graceful error recovery
- [ ] Intuitive user experience
- [ ] Professional visual design
- [ ] Responsive layout works

## 🔧 Debugging Tips

1. **Frontend Issues**:
   - Open browser DevTools → Console
   - Check Network tab for API calls
   - Inspect React components in React DevTools

2. **Backend Issues**:
   - Check terminal output for Python errors
   - Visit http://localhost:8000/docs for API documentation
   - Test endpoints directly with curl or Postman

3. **Connection Issues**:
   - Verify CORS settings in backend
   - Check if ports 5173 and 8000 are available
   - Ensure no firewall blocking

**Testing Complete!** ✅ If all items are checked, the Node Pipeline Canvas is fully functional.
