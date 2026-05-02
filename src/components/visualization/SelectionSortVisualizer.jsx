import React, { useState } from "react";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function SelectionSortVisualizer() {
  const [array, setArray] = useState([50, 30, 80, 40, 10]);
  const [current, setCurrent] = useState(-1);
  const [comparing, setComparing] = useState(-1);
  const [minIndex, setMinIndex] = useState(-1);
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
    setCurrent(-1);
    setComparing(-1);
    setMinIndex(-1);
    setStatus("Array updated");
  };

  const generateArray = () => {
    const arr = Array.from({ length: 7 }, () => Math.floor(Math.random() * 80) + 20);
    setArray(arr);
    setSorted([]);
    setCurrent(-1);
    setComparing(-1);
    setMinIndex(-1);
    setStatus("Random array generated");
  };

  const startSort = async () => {
    if (array.length === 0) return;
    setIsSorting(true);
    setStatus("Sorting...");
    setSorted([]);

    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      let min = i;
      setCurrent(i);
      setMinIndex(i);
      await sleep(300);

      for (let j = i + 1; j < arr.length; j++) {
        setComparing(j);
        await sleep(300);

        if (arr[j] < arr[min]) {
          min = j;
          setMinIndex(j);
          await sleep(300);
        }
      }

      if (min !== i) {
        [arr[i], arr[min]] = [arr[min], arr[i]];
        setArray([...arr]);
        await sleep(300);
      }

      setSorted((prev) => [...prev, i]);
      setComparing(-1);
      await sleep(200);
    }

    setCurrent(-1);
    setMinIndex(-1);
    setIsSorting(false);
    setStatus("Sorted");
  };

  const reset = () => {
    setArray([]);
    setInput("");
    setSorted([]);
    setCurrent(-1);
    setComparing(-1);
    setMinIndex(-1);
    setStatus("Ready");
  };

  const getColor = (index) => {
    if (sorted.includes(index)) return "#4ade80";
    if (index === minIndex) return "#f97316";
    if (index === comparing) return "#fbbf24";
    if (index === current) return "#38bdf8";
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
        <h2 style={{ marginBottom: 12 }}>Selection Sort Visualizer</h2>
        <p style={{ color: "#cbd5e1", marginBottom: 24 }}>
          Enter numbers separated by commas or generate a fresh array, then run selection sort.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 50, 20, 70, 30"
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
              <div style={{ width: 34, height: value * 3, backgroundColor: getColor(index), borderRadius: 12, border: "1px solid #334155", display: "flex", alignItems: "flex-end", justifyContent: "center", color: "#0f172a", fontWeight: 700 }}>
                <span style={{ marginBottom: 6 }}>{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
