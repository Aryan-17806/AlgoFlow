import React, { useState } from "react";

const QuickSortVisualizer = () => {
  const [array, setArray] = useState(generateArray());
  const [active, setActive] = useState([]);
  const [pivot, setPivot] = useState(-1);
  const [sorted, setSorted] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

 
  function generateArray() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(Math.floor(Math.random() * 80) + 20);
    }
    return arr;
  }

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const newArray = () => {
    setArray(generateArray());
    setActive([]);
    setSorted([]);
    setPivot(-1);
  };

  const startSort = async () => {
    setIsSorting(true);
    let arr = [...array];

    await quickSort(arr, 0, arr.length - 1);

    setSorted(arr.map((_, i) => i));
    setActive([]);
    setPivot(-1);
    setIsSorting(false);
  };

  const quickSort = async (arr, low, high) => {
    if (low < high) {
      let pi = await partition(arr, low, high);

      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  };

  const partition = async (arr, low, high) => {
    let pivotValue = arr[high];
    setPivot(high);

    let i = low - 1;

    for (let j = low; j < high; j++) {
      setActive([j]);
      await sleep(400);

      if (arr[j] < pivotValue) {
        i++;

     
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        setArray([...arr]);
        await sleep(400);
      }
    }

    
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    setArray([...arr]);
    await sleep(400);

    setPivot(-1);
    return i + 1;
  };

 
  const getColor = (index) => {
    if (sorted.includes(index)) return "green";
    if (index === pivot) return "yellow";
    if (active.includes(index)) return "orange";
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
      <h2>Quick Sort</h2>

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
          height: "300px",
          marginTop: "30px",
        }}
      >
        {array.map((value, index) => (
          <div key={index} style={{ margin: "5px", textAlign: "center" }}>
            
            <div style={{ marginBottom: "5px" }}>{value}</div>

           
            <div
              style={{
                height: value * 2,
                width: "30px",
                backgroundColor: getColor(index),
                border: "1px solid gray",
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickSortVisualizer;