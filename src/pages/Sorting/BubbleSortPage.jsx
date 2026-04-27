import React, { useState } from "react";

const BubbleSortVisualizer = () => {
  const [array, setArray] = useState([50, 30, 80, 40, 10]);
  const [comparing, setComparing] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    let n = arr.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setComparing([j, j + 1]);
        await sleep(500);

        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;

          setArray([...arr]);
          await sleep(500);
        }
      }
      setSorted((prev) => [...prev, n - i - 1]);
    }

    setComparing([]);
    setIsSorting(false);
  };

  const generateArray = () => {
    let newArr = [];
    for (let i = 0; i < 8; i++) {
      newArr.push(Math.floor(Math.random() * 100) + 20);
    }
    setArray(newArr);
    setSorted([]);
  };

  const getColor = (index) => {
    if (sorted.includes(index)) return "green";
    if (comparing.includes(index)) return "orange";
    return "white"; 
  };

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: '"Times New Roman", Times, serif',
      }}
    >
      <h2>Bubble Sort</h2>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={generateArray} disabled={isSorting}>
          New Array
        </button>

        <button onClick={bubbleSort} disabled={isSorting}>
          Start
        </button>
      </div>

 
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          height: "350px",
        }}
      >
        {array.map((value, index) => (
          <div key={index} style={{ margin: "5px" }}>
            <div
              style={{
                height: value * 2,
                width: "40px",
                backgroundColor: getColor(index),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "black", // text visible on white
                fontWeight: "bold",
                border: "1px solid #555",
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BubbleSortVisualizer;