import React, { useState, useCallback, useRef } from 'react';

const createNode = (value, id) => ({ value, id });

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
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [visitedIndices, setVisitedIndices] = useState([]);
  const [message, setMessage] = useState('');
  const [stepCount, setStepCount] = useState(0);
  const [idCounter, setIdCounter] = useState(7);

  const searchRef = useRef(null);

  const reset = () => {
    setCurrentIndex(null);
    setFoundIndex(null);
    setVisitedIndices([]);
    setMessage('');
    setStepCount(0);
  };

  const search = (value) => {
    if (!value || isSearching) return;

    reset();
    setIsSearching(true);
    setSearchValue(value);

    let step = 0;

    const run = (i) => {
      if (i >= nodes.length) {
        setIsSearching(false);
        setMessage('Value not found');
        return;
      }

      step++;
      setStepCount(step);
      setCurrentIndex(i);
      setVisitedIndices((p) => [...p, i]);

      searchRef.current = setTimeout(() => {
        if (nodes[i].value === value) {
          setFoundIndex(i);
          setIsSearching(false);
          setMessage(`Found at index ${i}`);
        } else {
          run(i + 1);
        }
      }, 600);
    };

    run(0);
  };

  const stop = () => {
    clearTimeout(searchRef.current);
    setIsSearching(false);
    setMessage('Stopped');
  };

  const addNode = (val) => {
    if (!val || isSearching) return;
    setNodes((p) => [...p, createNode(val, idCounter)]);
    setIdCounter((p) => p + 1);
    reset();
  };

  const removeNode = (i) => {
    if (isSearching) return;
    setNodes((p) => p.filter((_, idx) => idx !== i));
    reset();
  };

  return {
    nodes,
    currentIndex,
    foundIndex,
    visitedIndices,
    message,
    stepCount,
    search,
    stop,
    addNode,
    removeNode,
    isSearching,
  };
};

const App = () => {
  const {
    nodes,
    currentIndex,
    foundIndex,
    visitedIndices,
    message,
    stepCount,
    search,
    stop,
    addNode,
    removeNode,
    isSearching,
  } = useLinkedListSearch();

  const [searchInput, setSearchInput] = useState('');
  const [addInput, setAddInput] = useState('');

  const styles = {
    container: {
      backgroundColor: 'black',
      color: 'white',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Times New Roman, serif',
      textAlign: 'center',
    },
    input: {
      padding: '10px',
      margin: '5px',
      fontSize: '16px',
      fontFamily: 'Times New Roman, serif',
    },
    button: {
      padding: '10px 15px',
      margin: '5px',
      fontSize: '14px',
      backgroundColor: '#222',
      color: 'white',
      border: '1px solid white',
      cursor: 'pointer',
      fontFamily: 'Times New Roman, serif',
    },
    list: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '30px',
    },
    node: {
      padding: '15px',
      margin: '5px',
      border: '2px solid white',
      minWidth: '40px',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Linked List Search</h2>

      <input
        style={styles.input}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search"
      />
      <button style={styles.button} onClick={() => search(searchInput)}>
        Search
      </button>
      <button style={styles.button} onClick={stop}>
        Stop
      </button>

      <br />

      <input
        style={styles.input}
        value={addInput}
        onChange={(e) => setAddInput(e.target.value)}
        placeholder="Add"
      />
      <button style={styles.button} onClick={() => addNode(addInput)}>
        Add Node
      </button>

      <p>{message}</p>

      <div style={styles.list}>
        {nodes.map((node, i) => (
          <div key={node.id}>
            <div
              style={{
                ...styles.node,
                backgroundColor:
                  i === foundIndex
                    ? 'green'
                    : i === currentIndex
                    ? 'blue'
                    : visitedIndices.includes(i)
                    ? 'orange'
                    : 'black',
              }}
            >
              {node.value}
            </div>
            <button style={styles.button} onClick={() => removeNode(i)}>
              x
            </button>
          </div>
        ))}
      </div>

      <p>Steps: {stepCount}</p>
    </div>
  );
};

export default App;