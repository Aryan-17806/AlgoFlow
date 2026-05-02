import React, { useState } from "react";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function generateRandomArray() {
  return Array.from({ length: 10 }, () => Math.floor(Math.random() * 80) + 20);
}

export default function QuickSortVisualizer() {
  const [array, setArray] = useState(generateRandomArray());
  const [active, setActive] = useState([]);
  const [pivot, setPivot] = useState(-1);
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
    setActive([]);
    setPivot(-1);
    setSorted([]);
    setStatus("Array updated");
  };

  const resetArray = () => {
    setArray(generateRandomArray());
    setActive([]);
    setPivot(-1);
    setSorted([]);
    setStatus("Random array generated");
  };

  const startSort = async () => {
    if (array.length === 0) return;
    setIsSorting(true);
    setStatus("Sorting...");
    setActive([]);
    setSorted([]);
    setPivot(-1);

    const arr = [...array];
    await quickSort(arr, 0, arr.length - 1);

    setSorted(arr.map((_, i) => i));
    setActive([]);
    setPivot(-1);
    setIsSorting(false);
    setStatus("Sorted");
  };

  const quickSort = async (arr, low, high) => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  };

  const partition = async (arr, low, high) => {
    const pivotValue = arr[high];
    setPivot(high);
    let i = low - 1;

    for (let j = low; j < high; j++) {
      setActive([j]);
      await sleep(300);

      if (arr[j] < pivotValue) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await sleep(300);
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await sleep(300);
    return i + 1;
  };

  const getColor = (index) => {
    if (sorted.includes(index)) return "#4ade80";
    if (index === pivot) return "#facc15";
    if (active.includes(index)) return "#fb923c";
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
        <h2 style={{ marginBottom: 12 }}>Quick Sort Visualizer</h2>
        <p style={{ color: "#cbd5e1", marginBottom: 24 }}>
          Input a custom array or generate a random one, then watch quick sort partition and reorder elements.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 12, 45, 32, 27"
            style={{ flex: 1, minWidth: 220, padding: 12, borderRadius: 10, border: "1px solid #334155", background: "#0f172a", color: "#f8fafc" }}
          />
          <button onClick={parseInput} disabled={isSorting} style={{ padding: "12px 18px", borderRadius: 10, border: "none", background: "#2563eb", color: "white", cursor: "pointer" }}>
            Set Array
          </button>
          <button onClick={resetArray} disabled={isSorting} style={{ padding: "12px 18px", borderRadius: 10, border: "none", background: "#10b981", color: "white", cursor: "pointer" }}>
            Random Array
          </button>
          <button onClick={startSort} disabled={isSorting || array.length === 0} style={{ padding: "12px 18px", borderRadius: 10, border: "none", background: "#f97316", color: "white", cursor: "pointer" }}>
            Start Sort
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
