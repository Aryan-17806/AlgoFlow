import React, { useState } from "react";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function BubbleSortVisualizer() {
  const [array, setArray] = useState([50, 30, 80, 40, 10]);
  const [comparing, setComparing] = useState([]);
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
      setStatus("Invalid input. Use numbers separated by commas.");
      return;
    }

    setArray(numbers);
    setSorted([]);
    setComparing([]);
    setStatus("Array updated");
  };

  const generateArray = () => {
    const newArr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 80) + 20);
    setArray(newArr);
    setSorted([]);
    setComparing([]);
    setStatus("Random array generated");
  };

  const bubbleSort = async () => {
    if (array.length === 0) return;
    setIsSorting(true);
    setStatus("Sorting...");
    setSorted([]);

    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      let swapped = false;

      for (let j = 0; j < n - i - 1; j++) {
        setComparing([j, j + 1]);
        await sleep(300);

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapped = true;
          setArray([...arr]);
          await sleep(300);
        }
      }

      setSorted((prev) => [...prev, n - i - 1]);
      if (!swapped) break;
    }

    setComparing([]);
    setIsSorting(false);
    setStatus("Sorted");
  };

  const reset = () => {
    setArray([]);
    setSorted([]);
    setComparing([]);
    setInput("");
    setStatus("Ready");
  };

  const getColor = (index) => {
    if (sorted.includes(index)) return "#4ade80";
    if (comparing.includes(index)) return "#fb923c";
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
        <h2 style={{ marginBottom: 12 }}>Bubble Sort Visualizer</h2>
        <p style={{ color: "#cbd5e1", marginBottom: 24 }}>
          Enter an array of numbers separated by commas, then sort it with bubble sort.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 40, 10, 25, 60"
            style={{ flex: 1, minWidth: 220, padding: 12, borderRadius: 10, border: "1px solid #334155", background: "#0f172a", color: "#f8fafc" }}
          />

          <button onClick={parseInput} disabled={isSorting} style={{ padding: "12px 18px", borderRadius: 10, border: "none", background: "#2563eb", color: "white", cursor: "pointer" }}>
            Set Array
          </button>
          <button onClick={generateArray} disabled={isSorting} style={{ padding: "12px 18px", borderRadius: 10, border: "none", background: "#10b981", color: "white", cursor: "pointer" }}>
            Random Array
          </button>
          <button onClick={bubbleSort} disabled={isSorting || array.length === 0} style={{ padding: "12px 18px", borderRadius: 10, border: "none", background: "#f97316", color: "white", cursor: "pointer" }}>
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

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", height: 360, gap: 8, padding: 12, background: "#0b1120", borderRadius: 16 }}>
          {array.map((value, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <div style={{ width: 44, height: value * 3, backgroundColor: getColor(index), borderRadius: 12, border: "1px solid #334155", display: "flex", alignItems: "flex-end", justifyContent: "center", color: "#0f172a", fontWeight: 700 }}>
                <span style={{ marginBottom: 6 }}>{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
