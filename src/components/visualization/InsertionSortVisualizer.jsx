import React, { useState } from "react";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function InsertionSortVisualizer() {
  const [array, setArray] = useState([40, 20, 60, 10, 50]);
  const [current, setCurrent] = useState(-1);
  const [comparing, setComparing] = useState(-1);
  const [sorted, setSorted] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("Ready");

  const parseInput = () => {
    const numbers = input
      .split(/[,\s]+/)
      .map((item) => item.trim())
      .filter(Boolean)
      .map(Number);
    if (numbers.some((num) => Number.isNaN(num))) {
      setStatus("Invalid input. Enter numbers separated by commas.");
      return;
    }
    setArray(numbers);
    setSorted([]);
    setCurrent(-1);
    setComparing(-1);
    setStatus("Array updated");
  };

  const generateArray = () => {
    const newArr = Array.from({ length: 7 }, () => Math.floor(Math.random() * 80) + 20);
    setArray(newArr);
    setSorted([]);
    setCurrent(-1);
    setComparing(-1);
    setStatus("Random array generated");
  };

  const startSort = async () => {
    if (array.length === 0) return;
    setIsSorting(true);
    setStatus("Sorting...");
    setSorted([]);

    const arr = [...array];
    for (let i = 1; i < arr.length; i++) {
      const key = arr[i];
      let j = i - 1;
      setCurrent(i);
      setComparing(j);
      await sleep(300);

      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        setArray([...arr]);
        setComparing(j);
        await sleep(300);
        j--;
      }

      arr[j + 1] = key;
      setArray([...arr]);
      setSorted([...Array(i + 1).keys()]);
      setComparing(-1);
      await sleep(300);
    }

    setCurrent(-1);
    setComparing(-1);
    setIsSorting(false);
    setStatus("Sorted");
  };

  const reset = () => {
    setArray([]);
    setInput("");
    setSorted([]);
    setCurrent(-1);
    setComparing(-1);
    setStatus("Ready");
  };

  const getColor = (index) => {
    if (sorted.includes(index)) return "#4ade80";
    if (index === current) return "#fbbf24";
    if (index === comparing) return "#f97316";
    return "#f8fafc";
  };

  return (
    <div
      style={{
        backgroundColor: "#060b1e",
        color: "#f8fafc",
        minHeight: "100vh",
        padding: "24px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <h2 style={{ marginBottom: 12 }}>Insertion Sort Visualizer</h2>
        <p style={{ color: "#cbd5e1", marginBottom: 24 }}>
          Add a custom array or generate a random one, then run insertion sort step by step.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 35, 15, 25, 45"
            style={{ flex: 1, minWidth: 220, padding: 12, borderRadius: 10, border: "1px solid #334155", background: "#0f172a", color: "#f8fafc" }}
          />
          <button onClick={parseInput} disabled={isSorting} style={{ padding: "12px 18px", borderRadius: 10, border: "none", background: "#2563eb", color: "white", cursor: "pointer" }}>
            Set Array
          </button>
          <button onClick={generateArray} disabled={isSorting} style={{ padding: "12px 18px", borderRadius: 10, border: "none", background: "#10b981", color: "white", cursor: "pointer" }}>
            Random Array
          </button>
          <button onClick={startSort} disabled={isSorting || array.length === 0} style={{ padding: "12px 18px", borderRadius: 10, border: "none", background: "#f97316", color: "white", cursor: "pointer" }}>
            Start Sort
          </button>
          <button onClick={reset} disabled={isSorting} style={{ padding: "12px 18px", borderRadius: 10, border: "none", background: "#64748b", color: "white", cursor: "pointer" }}>
            Reset
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
          <div style={{ color: "#94a3b8" }}>Status: {status}</div>
          <div style={{ color: "#94a3b8" }}>Array size: {array.length}</div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", height: 320, gap: 8, padding: 12, background: "#0b1120", borderRadius: 16 }}>
          {array.map((value, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <div style={{ width: 38, height: value * 3, backgroundColor: getColor(index), borderRadius: 12, border: "1px solid #334155", display: "flex", alignItems: "flex-end", justifyContent: "center", color: "#0f172a", fontWeight: 700 }}>
                <span style={{ marginBottom: 6 }}>{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
