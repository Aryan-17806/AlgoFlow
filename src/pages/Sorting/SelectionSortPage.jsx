import React, { useState } from "react";

const SelectionSortVisualizer = () => {
  const [array, setArray] = useState([50, 30, 80, 40, 10]);
  const [current, setCurrent] = useState(-1);
  const [comparing, setComparing] = useState(-1);
  const [minIndex, setMinIndex] = useState(-1);
  const [sorted, setSorted] = useState([]);
  const [isSorting, setIsSorting] = useState(false);


  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


  const startSort = async () => {
    setIsSorting(true);
    let arr = [...array];

    for (let i = 0; i < arr.length; i++) {
      let min = i;
      setCurrent(i);
      setMinIndex(i);

      for (let j = i + 1; j < arr.length; j++) {
        setComparing(j);
        await sleep(500);

        if (arr[j] < arr[min]) {
          min = j;
          setMinIndex(j);
          await sleep(500);
        }
      }

    
      let temp = arr[i];
      arr[i] = arr[min];
      arr[min] = temp;

      setArray([...arr]);
      setSorted((prev) => [...prev, i]);

      setComparing(-1);
      await sleep(500);
    }

    setCurrent(-1);
    setMinIndex(-1);
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
    if (index === minIndex) return "red";
    if (index === comparing) return "yellow";
    if (index === current) return "orange";
    return "blue";
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
      <h2>Selection Sort </h2>

      

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
              }}
            ></div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectionSortVisualizer;