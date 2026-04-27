import React, { useState } from "react";

const InsertionSortVisualizer = () => {
  const [array, setArray] = useState([40, 20, 60, 10, 50]);
  const [current, setCurrent] = useState(-1);
  const [comparing, setComparing] = useState(-1);
  const [sorted, setSorted] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const startSort = async () => {
    setIsSorting(true);
    let arr = [...array];

    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      setCurrent(i);

      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        setComparing(j);
        await sleep(600);

        arr[j + 1] = arr[j];
        setArray([...arr]);

        j--;
        await sleep(600);
      }

      arr[j + 1] = key;
      setArray([...arr]);

      setSorted((prev) => [...prev, i]);
      setComparing(-1);
      await sleep(600);
    }

    setCurrent(-1);
    setIsSorting(false);
  };

  const newArray = () => {
    let arr = [];
    for (let i = 0; i < 6; i++) {
      arr.push(Math.floor(Math.random() * 80) + 20);
    }
    setArray(arr);
    setSorted([]);
  };

  const getColor = (index) => {
    if (sorted.includes(index)) return "green";
    if (index === current) return "yellow";
    if (index === comparing) return "red";
    return "white";
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        textAlign: "center",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: '"Times New Roman", Times, serif',
      }}
    >
      <h2>Insertion Sort </h2>

      <button onClick={newArray} disabled={isSorting}>
        New Array
      </button>

      <button onClick={startSort} disabled={isSorting}>
        Start
      </button>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          height: "250px",
          marginTop: "30px",
        }}
      >
        {array.map((value, index) => (
          <div key={index} style={{ margin: "5px", textAlign: "center" }}>
            <div
              style={{
                height: value * 2,
                width: "30px",
                backgroundColor: getColor(index),
              }}
            ></div>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsertionSortVisualizer;