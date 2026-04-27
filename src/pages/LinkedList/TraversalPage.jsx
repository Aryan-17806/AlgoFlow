import React, { useState } from "react";

function LinkedListTraversal() {
  const [list, setList] = useState([10, 20, 30, 40]);
  const [current, setCurrent] = useState(-1);
  const [visited, setVisited] = useState([]);
  const [running, setRunning] = useState(false);

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const startTraversal = async () => {
    setRunning(true);
    setCurrent(-1);
    setVisited([]);

    for (let i = 0; i < list.length; i++) {
      setCurrent(i);
      await sleep(600);
      setVisited((prev) => [...prev, i]);
    }

    setCurrent(-1);
    setRunning(false);
  };

  const addNode = () => {
    const value = prompt("Enter number");
    if (value) {
      setList([...list, parseInt(value)]);
    }
  };

  return (
    <div
      style={{
        background: "black",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Times New Roman",
        textAlign: "center",
      }}
    >
      <h2>Linked List Traversal</h2>

      <button onClick={startTraversal} disabled={running}>
        Start Traversal
      </button>

      <button onClick={addNode} style={{ marginLeft: "10px" }}>
        Add Node
      </button>

      <div style={{ marginTop: "40px", display: "flex", justifyContent: "center" }}>
        {list.map((val, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                padding: "15px",
                margin: "5px",
                border: "2px solid white",
                background:
                  i === current
                    ? "yellow"
                    : visited.includes(i)
                    ? "green"
                    : "#222",
                color: i === current ? "black" : "white",
              }}
            >
              {val}
            </div>

            {i !== list.length - 1 && <span>→</span>}
          </div>
        ))}

        <span style={{ marginLeft: "10px" }}>NULL</span>
      </div>
    </div>
  );
}

export default LinkedListTraversal;