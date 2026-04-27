import React, { useState } from "react";

const NumberLinkedList = () => {
  const [list, setList] = useState([10, 20, 30, 40, 50]);
  const [input, setInput] = useState("");

  const addNode = () => {
    if (input === "") return;
    setList([...list, Number(input)]);
    setInput("");
  };

  const deleteByValue = () => {
    const value = Number(input);
    setList(list.filter((item) => item !== value));
    setInput("");
  };

  const deleteHead = () => {
    setList(list.slice(1));
  };

  const deleteTail = () => {
    setList(list.slice(0, -1));
  };

  const reset = () => {
    setList([10, 20, 30, 40, 50]);
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
        textAlign: "center",
        fontFamily: '"Times New Roman", Times, serif',
      }}
    >
      <h2>Number Linked List </h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter number"
          style={{ padding: "5px", marginRight: "10px" }}
        />

        <button onClick={addNode}>Add</button>
        <button onClick={deleteByValue}>Delete by Value</button>
        <button onClick={deleteHead}>Delete Head</button>
        <button onClick={deleteTail}>Delete Tail</button>
        <button onClick={reset}>Reset</button>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {list.map((value, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                padding: "15px",
                margin: "5px",
                border: "2px solid white",
                backgroundColor: "white",
                color: "black",
                minWidth: "40px",
              }}
            >
              {value}
            </div>

            {index < list.length - 1 && (
              <span style={{ margin: "0 10px" }}>→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NumberLinkedList;