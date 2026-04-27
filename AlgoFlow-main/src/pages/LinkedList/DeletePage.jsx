import React, { useState, useCallback } from 'react';

// ============ LINKED LIST LOGIC ============
const createNode = (value, id) => ({
  value,
  id,
});

const useLinkedList = () => {
  const [nodes, setNodes] = useState([
    createNode('A', 0),
    createNode('B', 1),
    createNode('C', 2),
    createNode('D', 3),
    createNode('E', 4),
  ]);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [idCounter, setIdCounter] = useState(5);

  const showMessage = useCallback((text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  }, []);

  const animateDeletion = useCallback((index, successMessage) => {
    setDeletingIndex(index);
    
    setTimeout(() => {
      setNodes(prev => prev.filter((_, i) => i !== index));
      setDeletingIndex(null);
      showMessage(successMessage, 'success');
    }, 800);
  }, [showMessage]);

  const deleteByValue = useCallback((value) => {
    const index = nodes.findIndex(node => node.value === value);
    
    if (index === -1) {
      showMessage(`Value "${value}" not found in the list`, 'error');
      return false;
    }
    
    animateDeletion(index, `Successfully deleted node with value "${value}"`);
    return true;
  }, [nodes, animateDeletion, showMessage]);

  const deleteByIndex = useCallback((index) => {
    if (index < 0 || index >= nodes.length) {
      showMessage(`Index ${index} is out of bounds (valid: 0-${nodes.length - 1})`, 'error');
      return false;
    }
    
    const deletedValue = nodes[index].value;
    animateDeletion(index, `Successfully deleted node at index ${index} (value: "${deletedValue}")`);
    return true;
  }, [nodes, animateDeletion, showMessage]);

  const deleteHead = useCallback(() => {
    if (nodes.length === 0) {
      showMessage('Cannot delete from empty list', 'error');
      return false;
    }
    
    const deletedValue = nodes[0].value;
    animateDeletion(0, `Successfully deleted head node (value: "${deletedValue}")`);
    return true;
  }, [nodes, animateDeletion, showMessage]);

  const deleteTail = useCallback(() => {
    if (nodes.length === 0) {
      showMessage('Cannot delete from empty list', 'error');
      return false;
    }
    
    const lastIndex = nodes.length - 1;
    const deletedValue = nodes[lastIndex].value;
    animateDeletion(lastIndex, `Successfully deleted tail node (value: "${deletedValue}")`);
    return true;
  }, [nodes, animateDeletion, showMessage]);

  const addNode = useCallback((value) => {
    const newNode = createNode(value, idCounter);
    setIdCounter(prev => prev + 1);
    setNodes(prev => [...prev, newNode]);
    showMessage(`Added node with value "${value}"`, 'success');
  }, [idCounter, showMessage]);

  const reset = useCallback(() => {
    setNodes([
      createNode('A', 100),
      createNode('B', 101),
      createNode('C', 102),
      createNode('D', 103),
      createNode('E', 104),
    ]);
    setIdCounter(105);
    setDeletingIndex(null);
    setMessage({ text: '', type: '' });
  }, []);

  return {
    nodes,
    deletingIndex,
    message,
    deleteByValue,
    deleteByIndex,
    deleteHead,
    deleteTail,
    addNode,
    reset,
  };
};

// ============ STYLES ============
const styles = {
  container: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '24px',
    maxWidth: '950px',
    margin: '0 auto',
    backgroundColor: '#fafbfc',
    minHeight: '100vh',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#1a1a2e',
  },
  subtitle: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '24px',
  },
  controlPanel: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  controlSection: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    alignItems: 'flex-end',
    marginBottom: '16px',
    paddingBottom: '16px',
    borderBottom: '1px solid #eee',
  },
  lastSection: {
    borderBottom: 'none',
    marginBottom: '0',
    paddingBottom: '0',
  },
  sectionLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    width: '100%',
    marginBottom: '-8px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#555',
  },
  input: {
    padding: '10px 14px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    width: '120px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  button: {
    padding: '10px 18px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
  },
  deleteButtonAlt: {
    backgroundColor: '#c82333',
    color: 'white',
  },
  addButton: {
    backgroundColor: '#28a745',
    color: 'white',
  },
  resetButton: {
    backgroundColor: '#6c757d',
    color: 'white',
  },
  quickActions: {
    display: 'flex',
    gap: '8px',
  },
  messageContainer: {
    marginBottom: '20px',
    minHeight: '48px',
  },
  message: {
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    animation: 'slideIn 0.3s ease',
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
  },
  errorMessage: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
  },
  visualizationArea: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '30px 20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    minHeight: '160px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflowX: 'auto',
  },
  emptyState: {
    width: '100%',
    textAlign: 'center',
    color: '#999',
    fontSize: '16px',
    padding: '40px',
  },
  listContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  nodeWrapper: {
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.4s ease',
  },
  node: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'all 0.5s ease',
  },
  nodeBox: {
    width: '65px',
    height: '65px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: '600',
    borderRadius: '10px',
    border: '3px solid',
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
    color: '#1565c0',
    transition: 'all 0.3s ease',
    position: 'relative',
  },
  deletingNode: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
    color: '#c62828',
    transform: 'scale(1.15)',
    boxShadow: '0 0 20px rgba(244, 67, 54, 0.5)',
    animation: 'shake 0.5s ease-in-out',
  },
  fadingNode: {
    opacity: 0,
    transform: 'scale(0.3) translateY(-30px)',
  },
  nodeLabel: {
    fontSize: '11px',
    color: '#888',
    marginTop: '8px',
    fontWeight: '500',
  },
  arrow: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    color: '#2196f3',
    fontSize: '20px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },
  arrowHighlight: {
    color: '#f44336',
  },
  nullPointer: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '8px',
    padding: '10px 16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    color: '#888',
    fontSize: '13px',
    fontWeight: '600',
    border: '2px dashed #ddd',
  },
  legend: {
    marginTop: '20px',
    display: 'flex',
    gap: '24px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#666',
  },
  legendBox: {
    width: '20px',
    height: '20px',
    borderRadius: '4px',
    border: '2px solid',
  },
  stats: {
    display: 'flex',
    gap: '16px',
    marginTop: '16px',
    justifyContent: 'center',
  },
  statItem: {
    padding: '8px 16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '20px',
    fontSize: '13px',
    color: '#555',
  },
  statValue: {
    fontWeight: '600',
    color: '#2196f3',
  },
};

// ============ UI COMPONENTS ============
const Message = ({ message }) => {
  if (!message.text) return <div style={styles.messageContainer} />;
  
  const icon = message.type === 'success' ? '✓' : '✕';
  const messageStyle = {
    ...styles.message,
    ...(message.type === 'success' ? styles.successMessage : styles.errorMessage),
  };
  
  return (
    <div style={styles.messageContainer}>
      <div style={messageStyle}>
        <span style={{ fontSize: '16px' }}>{icon}</span>
        {message.text}
      </div>
    </div>
  );
};

const Node = ({ node, index, isDeleting, isHead, isTail, totalNodes, showArrowHighlight }) => {
  const nodeBoxStyle = {
    ...styles.nodeBox,
    ...(isDeleting ? styles.deletingNode : {}),
  };

  const getLabel = () => {
    if (isHead && isTail) return 'Head / Tail';
    if (isHead) return 'Head';
    if (isTail) return 'Tail';
    return `Index: ${index}`;
  };

  return (
    <div style={styles.nodeWrapper}>
      <div style={styles.node}>
        <div style={nodeBoxStyle}>
          {node.value}
          {isDeleting && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              backgroundColor: '#f44336',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
            }}>
              ✕
            </span>
          )}
        </div>
        <span style={styles.nodeLabel}>{getLabel()}</span>
      </div>
      {index < totalNodes - 1 && (
        <div style={{
          ...styles.arrow,
          ...(showArrowHighlight ? styles.arrowHighlight : {}),
        }}>
          →
        </div>
      )}
    </div>
  );
};

const LinkedListVisualization = ({ nodes, deletingIndex }) => {
  if (nodes.length === 0) {
    return (
      <div style={styles.visualizationArea}>
        <div style={styles.emptyState}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>📭</div>
          List is empty. Add some nodes to get started.
        </div>
      </div>
    );
  }

  return (
    <div style={styles.visualizationArea}>
      <div style={styles.listContainer}>
        {nodes.map((node, index) => (
          <Node
            key={node.id}
            node={node}
            index={index}
            isDeleting={deletingIndex === index}
            isHead={index === 0}
            isTail={index === nodes.length - 1}
            totalNodes={nodes.length}
            showArrowHighlight={deletingIndex === index || deletingIndex === index + 1}
          />
        ))}
        <div style={styles.nullPointer}>NULL</div>
      </div>
    </div>
  );
};

const ControlPanel = ({ 
  onDeleteByValue, 
  onDeleteByIndex, 
  onDeleteHead, 
  onDeleteTail, 
  onAddNode, 
  onReset, 
  isAnimating,
  nodeCount 
}) => {
  const [deleteValue, setDeleteValue] = useState('');
  const [deleteIndex, setDeleteIndex] = useState('');
  const [addValue, setAddValue] = useState('');

  const handleDeleteByValue = () => {
    if (deleteValue.trim()) {
      onDeleteByValue(deleteValue.trim());
      setDeleteValue('');
    }
  };

  const handleDeleteByIndex = () => {
    if (deleteIndex !== '') {
      onDeleteByIndex(parseInt(deleteIndex, 10));
      setDeleteIndex('');
    }
  };

  const handleAddNode = () => {
    if (addValue.trim()) {
      onAddNode(addValue.trim());
      setAddValue('');
    }
  };

  const buttonDisabled = isAnimating || nodeCount === 0;

  return (
    <div style={styles.controlPanel}>
      {/* Delete by Value */}
      <div style={styles.controlSection}>
        <span style={styles.sectionLabel}>Delete by Value</span>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Value to delete</label>
          <input
            type="text"
            value={deleteValue}
            onChange={(e) => setDeleteValue(e.target.value)}
            placeholder="e.g., A"
            style={styles.input}
            disabled={isAnimating}
            onKeyPress={(e) => e.key === 'Enter' && handleDeleteByValue()}
          />
        </div>
        <button
          onClick={handleDeleteByValue}
          disabled={!deleteValue.trim() || isAnimating}
          style={{
            ...styles.button,
            ...styles.deleteButton,
            opacity: !deleteValue.trim() || isAnimating ? 0.5 : 1,
          }}
        >
          Delete by Value
        </button>
      </div>

      {/* Delete by Index */}
      <div style={styles.controlSection}>
        <span style={styles.sectionLabel}>Delete by Index</span>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Index (0 to {Math.max(0, nodeCount - 1)})</label>
          <input
            type="number"
            value={deleteIndex}
            onChange={(e) => setDeleteIndex(e.target.value)}
            placeholder="e.g., 0"
            min="0"
            style={styles.input}
            disabled={isAnimating}
            onKeyPress={(e) => e.key === 'Enter' && handleDeleteByIndex()}
          />
        </div>
        <button
          onClick={handleDeleteByIndex}
          disabled={deleteIndex === '' || isAnimating}
          style={{
            ...styles.button,
            ...styles.deleteButton,
            opacity: deleteIndex === '' || isAnimating ? 0.5 : 1,
          }}
        >
          Delete by Index
        </button>
      </div>

      {/* Quick Actions */}
      <div style={{ ...styles.controlSection, ...styles.lastSection }}>
        <span style={styles.sectionLabel}>Quick Actions</span>
        <div style={styles.quickActions}>
          <button
            onClick={onDeleteHead}
            disabled={buttonDisabled}
            style={{
              ...styles.button,
              ...styles.deleteButtonAlt,
              opacity: buttonDisabled ? 0.5 : 1,
            }}
          >
            Delete Head
          </button>
          <button
            onClick={onDeleteTail}
            disabled={buttonDisabled}
            style={{
              ...styles.button,
              ...styles.deleteButtonAlt,
              opacity: buttonDisabled ? 0.5 : 1,
            }}
          >
            Delete Tail
          </button>
        </div>
        
        <div style={{ borderLeft: '1px solid #ddd', height: '36px', margin: '0 8px' }} />
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Add new node</label>
          <input
            type="text"
            value={addValue}
            onChange={(e) => setAddValue(e.target.value)}
            placeholder="Value"
            style={{ ...styles.input, width: '80px' }}
            disabled={isAnimating}
            onKeyPress={(e) => e.key === 'Enter' && handleAddNode()}
          />
        </div>
        <button
          onClick={handleAddNode}
          disabled={!addValue.trim() || isAnimating}
          style={{
            ...styles.button,
            ...styles.addButton,
            opacity: !addValue.trim() || isAnimating ? 0.5 : 1,
          }}
        >
          Add Node
        </button>
        
        <button
          onClick={onReset}
          disabled={isAnimating}
          style={{
            ...styles.button,
            ...styles.resetButton,
            opacity: isAnimating ? 0.5 : 1,
            marginLeft: 'auto',
          }}
        >
          Reset List
        </button>
      </div>
    </div>
  );
};

const Legend = () => (
  <div style={styles.legend}>
    <div style={styles.legendItem}>
      <div style={{ 
        ...styles.legendBox, 
        backgroundColor: '#e3f2fd', 
        borderColor: '#2196f3' 
      }} />
      <span>Normal Node</span>
    </div>
    <div style={styles.legendItem}>
      <div style={{ 
        ...styles.legendBox, 
        backgroundColor: '#ffebee', 
        borderColor: '#f44336' 
      }} />
      <span>Deleting Node</span>
    </div>
  </div>
);

const Stats = ({ nodeCount }) => (
  <div style={styles.stats}>
    <div style={styles.statItem}>
      List Length: <span style={styles.statValue}>{nodeCount}</span>
    </div>
    <div style={styles.statItem}>
      Valid Indices: <span style={styles.statValue}>
        {nodeCount > 0 ? `0 - ${nodeCount - 1}` : 'N/A'}
      </span>
    </div>
  </div>
);

// ============ MAIN COMPONENT ============
const LinkedListDeletionVisualizer = () => {
  const {
    nodes,
    deletingIndex,
    message,
    deleteByValue,
    deleteByIndex,
    deleteHead,
    deleteTail,
    addNode,
    reset,
  } = useLinkedList();

  const isAnimating = deletingIndex !== null;

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: scale(1.15) rotate(0deg); }
            25% { transform: scale(1.15) rotate(-3deg); }
            75% { transform: scale(1.15) rotate(3deg); }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          input:focus {
            border-color: #2196f3 !important;
            box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1) !important;
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
      
      <h1 style={styles.title}>Singly Linked List - Deletion Visualizer</h1>
      <p style={styles.subtitle}>
        Visualize how deletion operations work in a singly linked list
      </p>
      
      <Message message={message} />
      
      <ControlPanel
        onDeleteByValue={deleteByValue}
        onDeleteByIndex={deleteByIndex}
        onDeleteHead={deleteHead}
        onDeleteTail={deleteTail}
        onAddNode={addNode}
        onReset={reset}
        isAnimating={isAnimating}
        nodeCount={nodes.length}
      />
      
      <LinkedListVisualization
        nodes={nodes}
        deletingIndex={deletingIndex}
      />
      
      <Stats nodeCount={nodes.length} />
      <Legend />
    </div>
  );
};

export default LinkedListDeletionVisualizer;