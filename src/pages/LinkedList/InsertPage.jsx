import React, { useState } from "react";

function LinkedListVisualizer() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [index, setIndex] = useState("");
  const [highlight, setHighlight] = useState(null);

  const insertHead = () => {
    if (value === "") return;

    const newNode = {
      value: value,
      id: Date.now(),
    };

    let newList = [newNode, ...list];

    setHighlight(0);
    setTimeout(() => {
      setList(newList);
      setHighlight(null);
    }, 300);

    setValue("");
  };

  const insertTail = () => {
    if (value === "") return;

    const newNode = {
      value: value,
      id: Date.now(),
    };

    let newList = [...list, newNode];

    setHighlight(list.length);
    setTimeout(() => {
      setList(newList);
      setHighlight(null);
    }, 300);

    setValue("");
  };

  const insertIndex = () => {
    if (value === "" || index === "") return;

    let i = parseInt(index);
    if (i < 0) i = 0;
    if (i > list.length) i = list.length;

    const newNode = {
      value: value,
      id: Date.now(),
    };

    let newList = [
      ...list.slice(0, i),
      newNode,
      ...list.slice(i),
    ];

    setHighlight(i);
    setTimeout(() => {
      setList(newList);
      setHighlight(null);
    }, 300);

    setValue("");
    setIndex("");
  };

  const reset = () => {
    setList([]);
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Times New Roman, serif",
      }}
    >
      <h2>Linked List Visualizer</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            padding: "8px",
            marginRight: "10px",
            background: "black",
            color: "white",
            border: "1px solid white",
          }}
        />

        <input
          placeholder="index"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          style={{
            padding: "8px",
            background: "black",
            color: "white",
            border: "1px solid white",
          }}
        />

        <div style={{ marginTop: "10px" }}>
          <button onClick={insertHead}>Insert Head</button>
          <button onClick={insertTail} style={{ marginLeft: "5px" }}>
            Insert Tail
          </button>
          <button onClick={insertIndex} style={{ marginLeft: "5px" }}>
            Insert Index
          </button>
          <button onClick={reset} style={{ marginLeft: "5px" }}>
            Reset
          </button>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        {list.length === 0 && <p>List is empty</p>}

        {list.map((node, i) => (
          <div key={node.id} style={{ display: "flex", alignItems: "center" }}>
            {highlight === i && (
              <div style={{ width: "5px", height: "50px", background: "red" }}></div>
            )}

            <div
              style={{
                border: "2px solid white",
                padding: "15px",
                margin: "5px",
                background: "#111",
              }}
            >
              {node.value}
            </div>

            {i !== list.length - 1 && <span>→</span>}
          </div>
        ))}

        {list.length > 0 && <span>NULL</span>}
      </div>
    </div>
  );
}

export default LinkedListVisualizer;