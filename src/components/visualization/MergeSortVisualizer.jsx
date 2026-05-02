import React, { useState } from "react";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function generateRandomArray() {
  return Array.from({ length: 10 }, () => Math.floor(Math.random() * 80) + 20);
}

export default function MergeSortVisualizer() {
  const [array, setArray] = useState(generateRandomArray());
  const [active, setActive] = useState([]);
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
    setSorted([]);
    setStatus("Array updated");
  };

  const resetArray = () => {
    setArray(generateRandomArray());
    setActive([]);
    setSorted([]);
    setStatus("Random array generated");
  };

  const startSort = async () => {
    if (array.length === 0) return;
    setIsSorting(true);
    setStatus("Sorting...");
    setActive([]);
    setSorted([]);

    const arr = [...array];
    await mergeSort(arr, 0, arr.length - 1);

    setSorted(arr.map((_, i) => i));
    setActive([]);
    setIsSorting(false);
    setStatus("Sorted");
  };

  const mergeSort = async (arr, left, right) => {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid + 1, right);
    await merge(arr, left, mid, right);
  };

  const merge = async (arr, left, mid, right) => {
    let leftArr = arr.slice(left, mid + 1);
    let rightArr = arr.slice(mid + 1, right + 1);
    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArr.length && j < rightArr.length) {
      setActive([k]);
      await sleep(300);

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }

      setArray([...arr]);
      k++;
    }

    while (i < leftArr.length) {
      setActive([k]);
      await sleep(300);
      arr[k] = leftArr[i];
      setArray([...arr]);
      i++;
      k++;
    }

    while (j < rightArr.length) {
      setActive([k]);
      await sleep(300);
      arr[k] = rightArr[j];
      setArray([...arr]);
      j++;
      k++;
    }
  };

  const getColor = (index) => {
    if (sorted.includes(index)) return "#4ade80";
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
        <h2 style={{ marginBottom: 12 }}>Merge Sort Visualizer</h2>
        <p style={{ color: "#cbd5e1", marginBottom: 24 }}>
          Provide a custom array or generate random numbers. Then run merge sort to watch the divide and conquer process.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 75, 25, 45, 10"
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
