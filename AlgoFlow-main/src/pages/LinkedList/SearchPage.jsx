import React, { useState, useCallback, useRef } from 'react';

// ============ LINKED LIST LOGIC ============
const createNode = (value, id) => ({
  value,
  id,
});

const useLinkedListSearch = () => {
  const [nodes, setNodes] = useState([
    createNode('10', 0),
    createNode('25', 1),
    createNode('37', 2),
    createNode('42', 3),
    createNode('58', 4),
    createNode('63', 5),
    createNode('79', 6),
  ]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [searchComplete, setSearchComplete] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [visitedIndices, setVisitedIndices] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '', details: '' });
  const [stepCount, setStepCount] = useState(0);
  const [idCounter, setIdCounter] = useState(7);
  
  const searchRef = useRef(null);
  const animationSpeed = 600;

  const resetSearch = useCallback(() => {
    setCurrentIndex(null);
    setFoundIndex(null);
    setSearchComplete(false);
    setVisitedIndices([]);
    setMessage({ text: '', type: '', details: '' });
    setStepCount(0);
  }, []);

  const search = useCallback((value) => {
    if (isSearching || !value.trim()) return;
    
    resetSearch();
    setIsSearching(true);
    setSearchValue(value.trim());
    
    let step = 0;
    const targetValue = value.trim();
    
    const traverseStep = (index) => {
      if (index >= nodes.length) {
        setCurrentIndex(null);
        setSearchComplete(true);
        setIsSearching(false);
        setMessage({
          text: `Value "${targetValue}" not found`,
          type: 'error',
          details: `Traversed all ${nodes.length} nodes without finding a match`,
        });
        return;
      }
      
      step++;
      setStepCount(step);
      setCurrentIndex(index);
      setVisitedIndices(prev => [...prev, index]);
      
      searchRef.current = setTimeout(() => {
        if (nodes[index].value === targetValue) {
          setFoundIndex(index);
          setSearchComplete(true);
          setIsSearching(false);
          setMessage({
            text: `Found "${targetValue}" at index ${index}`,
            type: 'success',
            details: `Located after checking ${step} node${step > 1 ? 's' : ''}`,
          });
        } else {
          traverseStep(index + 1);
        }
      }, animationSpeed);
    };
    
    traverseStep(0);
  }, [nodes, isSearching, resetSearch]);

  const stopSearch = useCallback(() => {
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }
    setIsSearching(false);
    setCurrentIndex(null);
    setMessage({
      text: 'Search cancelled',
      type: 'info',
      details: `Stopped after ${stepCount} steps`,
    });
  }, [stepCount]);

  const addNode = useCallback((value) => {
    if (isSearching) return;
    const newNode = createNode(value, idCounter);
    setIdCounter(prev => prev + 1);
    setNodes(prev => [...prev, newNode]);
    resetSearch();
  }, [idCounter, isSearching, resetSearch]);

  const removeNode = useCallback((index) => {
    if (isSearching) return;
    setNodes(prev => prev.filter((_, i) => i !== index));
    resetSearch();
  }, [isSearching, resetSearch]);

  const shuffleNodes = useCallback(() => {
    if (isSearching) return;
    setNodes(prev => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
    resetSearch();
  }, [isSearching, resetSearch]);

  const resetList = useCallback(() => {
    if (isSearching) return;
    setNodes([
      createNode('10', 100),
      createNode('25', 101),
      createNode('37', 102),
      createNode('42', 103),
      createNode('58', 104),
      createNode('63', 105),
      createNode('79', 106),
    ]);
    setIdCounter(107);
    resetSearch();
  }, [isSearching, resetSearch]);

  return {
    nodes,
    currentIndex,
    foundIndex,
    searchComplete,
    isSearching,
    searchValue,
    visitedIndices,
    message,
    stepCount,
    search,
    stopSearch,
    addNode,
    removeNode,
    shuffleNodes,
    resetList,
    resetSearch,
  };
};

// ============ STYLES ============
const styles = {
  container: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '24px',
    maxWidth: '1000px',
    margin: '0 auto',
    backgroundColor: '#f0f4f8',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  title: {
    fontSize: '26px',
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#718096',
  },
  searchPanel: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
  },
  searchRow: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  inputWrapper: {
    flex: '1',
    minWidth: '200px',
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#a0aec0',
    fontSize: '18px',
  },
  input: {
    width: '100%',
    padding: '14px 14px 14px 44px',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.2s',
    boxSizing: 'border-box',
  },
  button: {
    padding: '14px 28px',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  searchButton: {
    backgroundColor: '#4f46e5',
    color: 'white',
  },
  stopButton: {
    backgroundColor: '#ef4444',
    color: 'white',
  },
  secondaryButton: {
    backgroundColor: '#e2e8f0',
    color: '#4a5568',
    padding: '10px 16px',
    fontSize: '13px',
  },
  actionsRow: {
    display: 'flex',
    gap: '8px',
    marginTop: '16px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  addInput: {
    padding: '10px 14px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    width: '100px',
    outline: 'none',
  },
  progressSection: {
    marginTop: '20px',
    padding: '16px',
    backgroundColor: '#f7fafc',
    borderRadius: '10px',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  progressLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#4a5568',
  },
  stepCounter: {
    fontSize: '13px',
    color: '#718096',
  },
  progressBar: {
    height: '8px',
    backgroundColor: '#e2e8f0',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4f46e5',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },
  messageContainer: {
    marginBottom: '20px',
    minHeight: '70px',
  },
  message: {
    padding: '16px 20px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '14px',
    animation: 'fadeIn 0.3s ease',
  },
  successMessage: {
    backgroundColor: '#d1fae5',
    border: '1px solid #6ee7b7',
  },
  errorMessage: {
    backgroundColor: '#fee2e2',
    border: '1px solid #fca5a5',
  },
  infoMessage: {
    backgroundColor: '#e0e7ff',
    border: '1px solid #a5b4fc',
  },
  messageIcon: {
    fontSize: '24px',
    lineHeight: '1',
  },
  messageContent: {
    flex: 1,
  },
  messageText: {
    fontSize: '15px',
    fontWeight: '600',
    marginBottom: '4px',
  },
  messageDetails: {
    fontSize: '13px',
    opacity: 0.8,
  },
  visualizationArea: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '32px 24px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    overflowX: 'auto',
  },
  listContainer: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '140px',
    gap: '0',
  },
  emptyState: {
    width: '100%',
    textAlign: 'center',
    color: '#a0aec0',
    padding: '40px',
  },
  nodeWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  node: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  nodeBox: {
    width: '70px',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: '700',
    borderRadius: '12px',
    border: '3px solid',
    transition: 'all 0.3s ease',
    position: 'relative',
    cursor: 'pointer',
  },
  defaultNode: {
    backgroundColor: '#f8fafc',
    borderColor: '#cbd5e1',
    color: '#475569',
  },
  visitedNode: {
    backgroundColor: '#fef3c7',
    borderColor: '#f59e0b',
    color: '#92400e',
  },
  currentNode: {
    backgroundColor: '#dbeafe',
    borderColor: '#3b82f6',
    color: '#1e40af',
    transform: 'scale(1.15)',
    boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.3), 0 8px 25px rgba(59, 130, 246, 0.25)',
    animation: 'pulse 0.6s ease-in-out infinite',
  },
  foundNode: {
    backgroundColor: '#d1fae5',
    borderColor: '#10b981',
    color: '#065f46',
    transform: 'scale(1.2)',
    boxShadow: '0 0 0 4px rgba(16, 185, 129, 0.3), 0 8px 25px rgba(16, 185, 129, 0.25)',
    animation: 'celebrate 0.5s ease',
  },
  nodeLabel: {
    fontSize: '11px',
    color: '#94a3b8',
    marginTop: '10px',
    fontWeight: '600',
  },
  nodeStatus: {
    position: 'absolute',
    top: '-12px',
    right: '-12px',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },
  removeButton: {
    position: 'absolute',
    bottom: '-10px',
    right: '-10px',
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.2s',
  },
  arrow: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 6px',
    fontSize: '24px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },
  defaultArrow: {
    color: '#cbd5e1',
  },
  activeArrow: {
    color: '#3b82f6',
  },
  visitedArrow: {
    color: '#f59e0b',
  },
  nullPointer: {
    padding: '12px 20px',
    backgroundColor: '#f1f5f9',
    borderRadius: '10px',
    color: '#94a3b8',
    fontSize: '13px',
    fontWeight: '700',
    border: '2px dashed #cbd5e1',
    marginLeft: '6px',
  },
  legend: {
    marginTop: '24px',
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: '#64748b',
    fontWeight: '500',
  },
  legendBox: {
    width: '18px',
    height: '18px',
    borderRadius: '4px',
    border: '2px solid',
  },
  searchingFor: {
    textAlign: 'center',
    marginBottom: '16px',
    padding: '10px',
    backgroundColor: '#eff6ff',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#3b82f6',
  },
};

// ============ UI COMPONENTS ============
const Message = ({ message }) => {
  if (!message.text) return <div style={styles.messageContainer} />;
  
  const configs = {
    success: { style: styles.successMessage, icon: '✓', color: '#065f46' },
    error: { style: styles.errorMessage, icon: '✕', color: '#991b1b' },
    info: { style: styles.infoMessage, icon: 'ℹ', color: '#3730a3' },
  };
  
  const config = configs[message.type] || configs.info;
  
  return (
    <div style={styles.messageContainer}>
      <div style={{ ...styles.message, ...config.style }}>
        <span style={{ ...styles.messageIcon, color: config.color }}>{config.icon}</span>
        <div style={styles.messageContent}>
          <div style={{ ...styles.messageText, color: config.color }}>{message.text}</div>
          {message.details && (
            <div style={{ ...styles.messageDetails, color: config.color }}>{message.details}</div>
          )}
        </div>
      </div>
    </div>
  );
};

const Node = ({ 
  node, 
  index, 
  isCurrent, 
  isFound, 
  isVisited, 
  totalNodes, 
  showActiveArrow,
  showVisitedArrow,
  onRemove,
  canRemove,
}) => {
  const [hovered, setHovered] = useState(false);
  
  const getNodeStyle = () => {
    if (isFound) return styles.foundNode;
    if (isCurrent) return styles.currentNode;
    if (isVisited) return styles.visitedNode;
    return styles.defaultNode;
  };
  
  const getArrowStyle = () => {
    if (showActiveArrow) return styles.activeArrow;
    if (showVisitedArrow) return styles.visitedArrow;
    return styles.defaultArrow;
  };

  return (
    <div style={styles.nodeWrapper}>
      <div 
        style={styles.node}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{ ...styles.nodeBox, ...getNodeStyle() }}>
          {node.value}
          {isFound && (
            <div style={{ 
              ...styles.nodeStatus, 
              backgroundColor: '#10b981' 
            }}>
              ✓
            </div>
          )}
          {isCurrent && !isFound && (
            <div style={{ 
              ...styles.nodeStatus, 
              backgroundColor: '#3b82f6' 
            }}>
              ?
            </div>
          )}
          {canRemove && hovered && (
            <button
              style={{ ...styles.removeButton, opacity: 1 }}
              onClick={() => onRemove(index)}
              title="Remove node"
            >
              ×
            </button>
          )}
        </div>
        <span style={styles.nodeLabel}>
          [{index}]
        </span>
      </div>
      {index < totalNodes - 1 && (
        <div style={{ ...styles.arrow, ...getArrowStyle() }}>
          →
        </div>
      )}
    </div>
  );
};

const SearchProgress = ({ current, total, stepCount, isSearching }) => {
  const progress = total > 0 ? ((current !== null ? current + 1 : 0) / total) * 100 : 0;
  
  return (
    <div style={styles.progressSection}>
      <div style={styles.progressHeader}>
        <span style={styles.progressLabel}>
          {isSearching ? 'Traversing...' : 'Search Progress'}
        </span>
        <span style={styles.stepCounter}>
          Steps: {stepCount} / {total} nodes
        </span>
      </div>
      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${progress}%` }} />
      </div>
    </div>
  );
};

const LinkedListVisualization = ({ 
  nodes, 
  currentIndex, 
  foundIndex, 
  visitedIndices,
  searchValue,
  isSearching,
  onRemove,
}) => {
  if (nodes.length === 0) {
    return (
      <div style={styles.visualizationArea}>
        <div style={styles.emptyState}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
          <div style={{ fontSize: '16px' }}>List is empty</div>
          <div style={{ fontSize: '13px', marginTop: '8px' }}>Add some nodes to get started</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.visualizationArea}>
      {isSearching && searchValue && (
        <div style={styles.searchingFor}>
          🔍 Searching for: <strong>"{searchValue}"</strong>
        </div>
      )}
      <div style={styles.listContainer}>
        {nodes.map((node, index) => (
          <Node
            key={node.id}
            node={node}
            index={index}
            isCurrent={currentIndex === index}
            isFound={foundIndex === index}
            isVisited={visitedIndices.includes(index)}
            totalNodes={nodes.length}
            showActiveArrow={currentIndex === index}
            showVisitedArrow={visitedIndices.includes(index) && !visitedIndices.includes(index + 1) === false}
            onRemove={onRemove}
            canRemove={!isSearching}
          />
        ))}
        <div style={styles.nullPointer}>NULL</div>
      </div>
    </div>
  );
};

const ControlPanel = ({ 
  onSearch, 
  onStop, 
  onAdd,
  onShuffle,
  onReset,
  isSearching,
  nodeCount,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [addInput, setAddInput] = useState('');

  const handleSearch = () => {
    if (searchInput.trim()) {
      onSearch(searchInput);
    }
  };

  const handleAdd = () => {
    if (addInput.trim()) {
      onAdd(addInput.trim());
      setAddInput('');
    }
  };

  return (
    <div style={styles.searchPanel}>
      <div style={styles.searchRow}>
        <div style={styles.inputWrapper}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isSearching && handleSearch()}
            placeholder="Enter value to search..."
            style={styles.input}
            disabled={isSearching}
          />
        </div>
        {isSearching ? (
          <button
            onClick={onStop}
            style={{ ...styles.button, ...styles.stopButton }}
          >
            ⏹ Stop
          </button>
        ) : (
          <button
            onClick={handleSearch}
            disabled={!searchInput.trim()}
            style={{
              ...styles.button,
              ...styles.searchButton,
              opacity: !searchInput.trim() ? 0.5 : 1,
            }}
          >
            Search
          </button>
        )}
      </div>
      
      <div style={styles.actionsRow}>
        <input
          type="text"
          value={addInput}
          onChange={(e) => setAddInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isSearching && handleAdd()}
          placeholder="Value"
          style={styles.addInput}
          disabled={isSearching}
        />
        <button
          onClick={handleAdd}
          disabled={!addInput.trim() || isSearching}
          style={{
            ...styles.button,
            ...styles.secondaryButton,
            opacity: !addInput.trim() || isSearching ? 0.5 : 1,
          }}
        >
          + Add Node
        </button>
        <button
          onClick={onShuffle}
          disabled={isSearching || nodeCount < 2}
          style={{
            ...styles.button,
            ...styles.secondaryButton,
            opacity: isSearching || nodeCount < 2 ? 0.5 : 1,
          }}
        >
          🔀 Shuffle
        </button>
        <button
          onClick={onReset}
          disabled={isSearching}
          style={{
            ...styles.button,
            ...styles.secondaryButton,
            opacity: isSearching ? 0.5 : 1,
          }}
        >
          ↺ Reset
        </button>
        <div style={{ 
          marginLeft: 'auto', 
          fontSize: '13px', 
          color: '#64748b',
          padding: '8px 12px',
          backgroundColor: '#f1f5f9',
          borderRadius: '6px',
        }}>
          Total Nodes: <strong>{nodeCount}</strong>
        </div>
      </div>
    </div>
  );
};

const Legend = () => (
  <div style={styles.legend}>
    <div style={styles.legendItem}>
      <div style={{ ...styles.legendBox, backgroundColor: '#f8fafc', borderColor: '#cbd5e1' }} />
      <span>Unchecked</span>
    </div>
    <div style={styles.legendItem}>
      <div style={{ ...styles.legendBox, backgroundColor: '#dbeafe', borderColor: '#3b82f6' }} />
      <span>Currently Checking</span>
    </div>
    <div style={styles.legendItem}>
      <div style={{ ...styles.legendBox, backgroundColor: '#fef3c7', borderColor: '#f59e0b' }} />
      <span>Visited (Not Match)</span>
    </div>
    <div style={styles.legendItem}>
      <div style={{ ...styles.legendBox, backgroundColor: '#d1fae5', borderColor: '#10b981' }} />
      <span>Found!</span>
    </div>
  </div>
);

// ============ MAIN COMPONENT ============
const LinkedListSearchVisualizer = () => {
  const {
    nodes,
    currentIndex,
    foundIndex,
    isSearching,
    searchValue,
    visitedIndices,
    message,
    stepCount,
    search,
    stopSearch,
    addNode,
    removeNode,
    shuffleNodes,
    resetList,
  } = useLinkedListSearch();

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3), 0 8px 25px rgba(59, 130, 246, 0.25); }
            50% { box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.15), 0 8px 25px rgba(59, 130, 246, 0.35); }
          }
          @keyframes celebrate {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1.2); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          input:focus {
            border-color: #4f46e5 !important;
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1) !important;
          }
          button:hover:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          }
          button:active:not(:disabled) {
            transform: translateY(0);
          }
        `}
      </style>
      
      <div style={styles.header}>
        <h1 style={styles.title}>Singly Linked List - Search Visualizer</h1>
        <p style={styles.subtitle}>
          Watch how linear search traverses through a linked list node by node
        </p>
      </div>
      
      <ControlPanel
        onSearch={search}
        onStop={stopSearch}
        onAdd={addNode}
        onShuffle={shuffleNodes}
        onReset={resetList}
        isSearching={isSearching}
        nodeCount={nodes.length}
      />
      
      {(isSearching || visitedIndices.length > 0) && (
        <SearchProgress
          current={currentIndex}
          total={nodes.length}
          stepCount={stepCount}
          isSearching={isSearching}
        />
      )}
      
      <Message message={message} />
      
      <LinkedListVisualization
        nodes={nodes}
        currentIndex={currentIndex}
        foundIndex={foundIndex}
        visitedIndices={visitedIndices}
        searchValue={searchValue}
        isSearching={isSearching}
        onRemove={removeNode}
      />
      
      <Legend />
    </div>
  );
};

export default LinkedListSearchVisualizer;