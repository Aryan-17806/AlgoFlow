# AI-Enabled Data Structures & Algorithms Visualization Platform

> 🎓 Interactive visualization + deterministic simulation + AI explanations = Deep algorithmic understanding

An educational platform that helps students master Data Structures and Algorithms through interactive visualization, step-by-step simulation, and AI-powered explanations.

## ✨ Features

### 🎨 Interactive Visualization
- **Real-time visualization** of algorithm execution
- **Smooth animations** with Framer Motion
- **Color-coded highlighting** for array operations
- **Responsive design** for desktop, tablet, and mobile

### ⏯️ Playback Controls
- **Play/Pause** execution
- **Step forward/backward** through algorithm steps
- **Speed control** (0.5x to 3x)
- **Reset** to initial state
- **Step counter** showing progress

### 📊 Complexity Analysis
- **Real-time operation tracking**:
  - Comparisons
  - Swaps
  - Assignments
  - Recursion depth
- **Big-O complexity display**:
  - Best case
  - Average case
  - Worst case
  - Space complexity

### 🤖 AI-Powered Explanations
- **Step-by-step algorithm walkthroughs** powered by GPT-4
- **Complexity analysis explanations**
- **Q&A answering** about algorithms
- **Beginner-friendly language**
- **Fallback explanations** when API unavailable

### 📚 Supported Algorithms

#### Sorting
- Bubble Sort
- Insertion Sort
- Selection Sort
- Merge Sort
- Quick Sort

#### Searching
- Linear Search
- Binary Search

#### Graph Traversal
- Depth-First Search (DFS)
- Breadth-First Search (BFS)

#### Advanced Algorithms
- Dijkstra's Shortest Path
- Fibonacci (Recursive) with stack analysis

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Pages: HomePage, VisualizerPage, Auth Pages       │ │
│  ├────────────────────────────────────────────────────┤ │
│  │ Components: Visualizers, Controls, Panels         │ │
│  ├────────────────────────────────────────────────────┤ │
│  │ State: Zustand (authStore, visualizationStore)   │ │
│  └────────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────────┘
                       │ API Calls (Axios)
┌──────────────────────▼──────────────────────────────────┐
│                  Backend (Node.js/Express)              │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Routes: /api/auth, /simulate, /explain, etc       │ │
│  ├────────────────────────────────────────────────────┤ │
│  │ Controllers: Handle requests & orchestrate logic  │ │
│  ├────────────────────────────────────────────────────┤ │
│  │ Services:                                           │ │
│  │  ├─ SimulationEngine (deterministic algorithms)   │ │
│  │  ├─ AIService (LLM integration)                   │ │
│  │  └─ AuthService (user authentication)            │ │
│  ├────────────────────────────────────────────────────┤ │
│  │ Middleware: Auth, Validation, Logging             │ │
│  └────────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────────┘
        ┌──────────────┴──────────────┐
        │                             │
┌───────▼────────┐          ┌────────▼───────┐
│   MongoDB      │          │  OpenAI API    │
│   Database     │          │  (GPT-4)       │
└────────────────┘          └────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 6+
- npm or yarn

### Installation

1. **Clone repository:**
```bash
git clone <repository-url>
cd DSAProject
```

2. **Backend setup:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

3. **Frontend setup (in new terminal):**
```bash
cd frontend
npm install
npm run dev
```

4. **Open browser:**
Navigate to `http://localhost:3000`

## 📖 Detailed Setup

See the complete setup guides:
- [Backend Setup Guide](./BACKEND_SETUP.md)
- [Frontend Setup Guide](./FRONTEND_SETUP.md)

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)
```bash
docker-compose up
```

This starts:
- MongoDB on port 27017
- Backend on port 5000
- Frontend on port 3000

### Individual Docker Builds
```bash
# Backend
cd backend
docker build -t dsa-visualizer-backend .
docker run -p 5000:5000 --env-file .env dsa-visualizer-backend

# Frontend
cd frontend
docker build -t dsa-visualizer-frontend .
docker run -p 3000:3000 dsa-visualizer-frontend
```

## 🔑 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/dsa-visualizer
JWT_SECRET=your_super_secret_jwt_key
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4
CORS_ORIGIN=http://localhost:3000
MAX_SIMULATION_SIZE=10000
MAX_RECURSION_DEPTH=1000
```

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Data/Metadata
- `GET /api/structures` - Get all data structures
- `GET /api/algorithms` - Get all algorithms with complexity info

### Simulation
- `POST /api/simulate/run` - Run algorithm simulation
- `POST /api/simulate/complexity` - Get complexity analysis
- `GET /api/simulate/sessions` - Get user's saved sessions

### AI Explanations
- `POST /api/explain/algorithm` - Get algorithm explanation
- `POST /api/explain/complexity` - Get complexity explanation
- `POST /api/explain/question` - Ask question about algorithm

### Utility
- `GET /api/health` - Health check

## 🧪 Testing

### Run Backend Tests
```bash
cd backend
npm test
npm run test:watch
```

### Test Coverage
- Simulation engine correctness
- State transitions validation
- Recursion stack handling
- Complexity calculations
- No infinite loops

## 📊 Complexity Reference

Quick lookup for standard algorithms:

| Algorithm | Time (Best) | Time (Avg) | Time (Worst) | Space |
|-----------|-------------|-----------|--------------|-------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |
| Binary Search | O(1) | O(log n) | O(log n) | O(1) |
| DFS | O(V+E) | O(V+E) | O(V+E) | O(V) |
| BFS | O(V+E) | O(V+E) | O(V+E) | O(V) |

## 🛠️ Project Structure

```
DSAProject/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   │   ├── SimulationEngine.js
│   │   │   ├── AIService.js
│   │   │   └── AuthService.js
│   │   ├── models/
│   │   └── middleware/
│   ├── tests/
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── AlgorithmControls.jsx
│   │   │   ├── PlaybackControls.jsx
│   │   │   ├── ArrayVisualizer.jsx
│   │   │   ├── ComplexityPanel.jsx
│   │   │   └── ExplanationPanel.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── VisualizerPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── context/
│   │   │   ├── authStore.js
│   │   │   └── visualizationStore.js
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
├── README.md (this file)
├── BACKEND_SETUP.md
├── FRONTEND_SETUP.md
└── .gitignore
```

## 🎯 Key Features Explained

### Deterministic Simulation Engine
- **No arbitrary code execution** - only structured algorithm logic
- **State snapshots** generated for each step
- **Recursion stack tracking** for recursive algorithms
- **Operation counting** (comparisons, swaps, assignments)
- **Supports 11+ algorithms** with more easily addable

### AI Integration
- **GPT-4 powered explanations** with fallback text
- **Contextual understanding** of algorithm steps
- **Beginner-friendly language** for learning
- **Graceful degradation** without API key

### Visual Feedback
- **Highlighted indices** show which elements are being processed
- **Color coding**:
  - Blue: Default state
  - Red/Orange: Highlighted/Active
  - Different shades for different operations
- **Smooth transitions** for element movement
- **Real-time metrics** showing operations count

## 📈 Learning Path

**Beginner:**
1. Start with Bubble Sort - simplest algorithm
2. Watch step-by-step execution
3. Read AI explanations
4. Compare with Insertion Sort

**Intermediate:**
1. Explore Merge Sort and Quick Sort
2. Compare O(n²) vs O(n log n)
3. Understand recursion with Fibonacci
4. Study graph algorithms (DFS/BFS)

**Advanced:**
1. Run multiple algorithms on same input
2. Analyze complexity growth
3. Study algorithm tradeoffs
4. Explore Dijkstra's algorithm

## 🤝 Contributing

Contributions are welcome! To add new features:

1. **New Algorithm:**
   - Add method to SimulationEngine.js
   - Create visualization component if needed
   - Test with various inputs
   - Update documentation

2. **Frontend Enhancement:**
   - Create new component in components/
   - Add routes if needed
   - Test responsiveness
   - Update setup guide

3. **Bug Fixes:**
   - Report in issues
   - Submit PR with fix
   - Include test cases

## 🔒 Security Considerations

- **JWT tokens** for authentication
- **Bcrypt** for password hashing
- **Input validation** on all endpoints
- **CORS** properly configured
- **Environment variables** for secrets
- **Rate limiting** recommended for production


## 📧 Support

For questions or issues:
1. Check the [Backend Setup Guide](./BACKEND_SETUP.md)
2. Check the [Frontend Setup Guide](./FRONTEND_SETUP.md)
3. Review error messages in browser console
4. Check backend logs for API errors

## 🎓 Educational Value

This platform helps students:
- **Visualize** abstract algorithm concepts
- **Understand** step-by-step execution
- **Learn** complexity analysis intuitively
- **Discover** common patterns across algorithms
- **Practice** with interactive examples
- **Understand** through AI-powered explanations

## 🚀 Future Enhancements

Potential features for expansion:
- [ ] Tree traversals visualization (Inorder, Preorder, Postorder)
- [ ] Additional sorting algorithms (Heap Sort, Radix Sort, Counting Sort)
- [ ] More graph algorithms (Floyd-Warshall, Kruskal's, Prim's)
- [ ] Dynamic programming examples
- [ ] Code-to-visual mapping
- [ ] Dark mode toggle
- [ ] Save and share sessions
- [ ] Performance comparison charts
- [ ] Custom algorithm input
- [ ] Collaborative learning

## 📞 Contact

Built with ❤️ for students learning Data Structures and Algorithms

Happy Learning! 🎉

---

**Last Updated:** April 2026
**Version:** 3.5.1
