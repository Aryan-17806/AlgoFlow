import React, { useState } from "react";

const MergeSortVisualizer = () => {
  const [array, setArray] = useState(generateArray());
  const [active, setActive] = useState([]); 
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
  };


  const startSort = async () => {
    setIsSorting(true);
    let arr = [...array];

    await mergeSort(arr, 0, arr.length - 1);


    setSorted(arr.map((_, i) => i));
    setActive([]);
    setIsSorting(false);
  };

  const mergeSort = async (arr, left, right) => {
    if (left >= right) return;

    let mid = Math.floor((left + right) / 2);

    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid + 1, right);
    await merge(arr, left, mid, right);
  };

  const merge = async (arr, left, mid, right) => {
    let leftArr = arr.slice(left, mid + 1);
    let rightArr = arr.slice(mid + 1, right + 1);

    let i = 0,
      j = 0,
      k = left;

    while (i < leftArr.length && j < rightArr.length) {
      setActive([k]);
      await sleep(400);

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
      await sleep(400);

      arr[k] = leftArr[i];
      setArray([...arr]);
      i++;
      k++;
    }

    while (j < rightArr.length) {
      setActive([k]);
      await sleep(400);

      arr[k] = rightArr[j];
      setArray([...arr]);
      j++;
      k++;
    }
  };


  const getColor = (index) => {
    if (sorted.includes(index)) return "green";
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
      <h2>Merge Sort </h2>

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
            {/* value */}
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

export default MergeSortVisualizer;