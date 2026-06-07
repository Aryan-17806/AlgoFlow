import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function SelectionSortVisualizer() {
  const [input, setInput] = useState("50,-30,80,-10,40");
  const [array, setArray] = useState([50, -30, 80, -10, 40]);

  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);

  const [comparing, setComparing] = useState([]);
  const [currentMin, setCurrentMin] = useState(-1);
  const [sorted, setSorted] = useState([]);

  const timerRef = useRef(null);

  // Parse strings into numbers safely, retaining negative values
  const parseArray = (text) => {
    return text
      .split(",")
      .map((x) => Number(x.trim()))
      .filter((x) => !isNaN(x));
  };

  // Find the highest absolute value to establish proportional bar sizing limits
  const maxAbsVal = array.length > 0 ? Math.max(...array.map(Math.abs), 1) : 1;

  const generateSteps = (startingArray) => {
    const arr = [...startingArray];
    if (!arr.length) return [];

    const temp = [];
    const n = arr.length;
    let sortedIndices = [];

    // Push initial baseline step
    temp.push({
      array: [...arr],
      comparing: [],
      currentMin: -1,
      sorted: [],
    });

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;

      temp.push({
        array: [...arr],
        comparing: [i],
        currentMin: minIdx,
        sorted: [...sortedIndices],
      });

      for (let j = i + 1; j < n; j++) {
        temp.push({
          array: [...arr],
          comparing: [i, j],
          currentMin: minIdx,
          sorted: [...sortedIndices],
        });

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          temp.push({
            array: [...arr],
            comparing: [i, j],
            currentMin: minIdx,
            sorted: [...sortedIndices],
          });
        }
      }

      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        temp.push({
          array: [...arr],
          comparing: [i, minIdx],
          currentMin: minIdx,
          sorted: [...sortedIndices],
        });
      }

      sortedIndices = [...sortedIndices, i];
      temp.push({
        array: [...arr],
        comparing: [],
        currentMin: -1,
        sorted: [...sortedIndices],
      });
    }

    // Mark the last remaining item as sorted
    sortedIndices = Array.from({ length: n }, (_, index) => index);
    temp.push({
      array: [...arr],
      comparing: [],
      currentMin: -1,
      sorted: [...sortedIndices],
    });

    return temp;
  };

  const applyStep = (step) => {
    if (!step) return;
    setArray(step.array);
    setComparing(step.comparing);
    setCurrentMin(step.currentMin);
    setSorted(step.sorted);
  };

  const stepForward = () => {
    let activeSteps = steps;

    if (activeSteps.length === 0) {
      activeSteps = generateSteps(array);
      if (!activeSteps.length) return;
      setSteps(activeSteps);
      setCurrentStep(0);
      applyStep(activeSteps[0]);
      return;
    }

    const next = Math.min(currentStep + 1, activeSteps.length - 1);
    setCurrentStep(next);
    applyStep(activeSteps[next]);
  };

  const play = () => {
    if (timerRef.current) return;

    let activeSteps = steps;

    if (activeSteps.length === 0) {
      activeSteps = generateSteps(array);
      if (!activeSteps.length) return;
      setSteps(activeSteps);
      setCurrentStep(0);
      applyStep(activeSteps[0]);
    }

    let localStep = currentStep === -1 ? 0 : currentStep;

    timerRef.current = setInterval(() => {
      localStep++;
      if (localStep >= activeSteps.length) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        return;
      }
      setCurrentStep(localStep);
      applyStep(activeSteps[localStep]);
    }, 450);
  };

  const pause = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const reset = () => {
    pause();
    const nums = parseArray(input);
    setArray(nums);
    setComparing([]);
    setCurrentMin(-1);
    setSorted([]);
    setSteps([]);
    setCurrentStep(-1);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const nums = parseArray(value);
    setArray(nums);
    setSteps([]);
    setCurrentStep(-1);
    setComparing([]);
    setCurrentMin(-1);
    setSorted([]);
  };

  useEffect(() => {
    return () => pause();
  }, []);

  const graphPoints = `30,140 60,138 90,132 120,120 150,100 180,75 210,45 240,20`;

  return (
    <div className="visualizer-container">
      <div className="container-fluid p-4">
        <h2 className="title mb-4">Selection Sort Bar Visualizer</h2>

        <div className="row g-4">
          {/* LEFT SIDE: CONTROLS & DYNAMIC VISUALIZATION CANVAS */}
          <div className="col-lg-8">
            <div className="card-dark p-3 mb-3">
              <div className="d-flex flex-wrap gap-2 align-items-center">
                <input
                  className="input-dark"
                  placeholder="Type numbers: 50,-30,80..."
                  value={input}
                  onChange={handleInputChange}
                />

                <button className="btn btn-outline-light btn-sm" onClick={stepForward}>
                  Step
                </button>

                <button className="btn btn-warning btn-sm" onClick={play}>
                  Play
                </button>

                <button className="btn btn-danger btn-sm" onClick={pause}>
                  Pause
                </button>

                <button className="btn btn-secondary btn-sm" onClick={reset}>
                  Reset
                </button>
              </div>
            </div>

            <div className="card-dark p-4 text-center">
              {/* Core Bar Graph Container Canvas */}
              <div className="bar-chart-container d-flex align-items-stretch justify-content-center gap-3">
                {array.map((value, index) => {
                  // Calculate heights proportionally out of a max possible 110px half-height container segment
                  const calculatedHeight = `${(Math.abs(value) / maxAbsVal) * 110 + 10}px`;
                  const isNegative = value < 0;

                  return (
                    <div key={index} className="bar-column d-flex flex-column">
                      
                      {/* UPPER BOX SEGMENT: Renders Positive Bars */}
                      <div className="graph-half positive-zone d-flex align-items-end justify-content-center">
                        {!isNegative && (
                          <motion.div
                            className="array-bar"
                            animate={{
                              height: calculatedHeight,
                              backgroundColor: sorted.includes(index)
                                ? "#238636" // Green for sorted elements
                                : index === currentMin
                                ? "#f97316" // Orange for global frame minimum
                                : comparing.includes(index)
                                ? "#d29922" // Yellow for active lookups
                                : "#58a6ff", // Blue default
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          >
                            <span className="bar-value pos-val">{value}</span>
                          </motion.div>
                        )}
                      </div>

                      {/* ZERO LINE MIDPOINT */}
                      <div className="zero-axis-divider" />

                      {/* LOWER BOX SEGMENT: Renders Negative Bars */}
                      <div className="graph-half negative-zone d-flex align-items-start justify-content-center">
                        {isNegative && (
                          <motion.div
                            className="array-bar negative-bar"
                            animate={{
                              height: calculatedHeight,
                              backgroundColor: sorted.includes(index)
                                ? "#238636"
                                : index === currentMin
                                ? "#f97316"
                                : comparing.includes(index)
                                ? "#d29922"
                                : "#58a6ff",
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          >
                            <span className="bar-value neg-val">{value}</span>
                          </motion.div>
                        )}
                      </div>

                      {/* INDEX NUMBERS BELOW PLOTS */}
                      <div className="index-label mt-2">{index}</div>
                    </div>
                  );
                })}
              </div>

              {comparing.length > 0 && (
                <div className="comparison-text mt-4">
                  Active Loop Scope: Elements from Index <strong>{comparing[0]}</strong> to <strong>{array.length - 1}</strong>
                  {currentMin !== -1 && (
                    <span> | Min Found: Index {currentMin} (<strong>{array[currentMin]}</strong>)</span>
                  )}
                </div>
              )}

              {steps.length > 0 && currentStep === steps.length - 1 && (
                <div className="found-text mt-3">✓ Array Sorted Successfully via Selection Sort!</div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: REFERENCE CODE & METRICS */}
          <div className="col-lg-4">
            <div className="card-dark p-3 mb-3">
              <h5 className="mb-3">Code Reference (C++)</h5>
              <pre className="code-box">
                <code>
{`void selectionSort(int arr[], int n){
  for(int i=0; i<n-1; i++){
    int min_idx = i;
    for(int j=i+1; j<n; j++){
      if(arr[j] < arr[min_idx]){
        min_idx = j;
      }
    }
    if(min_idx != i) {
      swap(arr[i], arr[min_idx]);
    }
  }
}`}
                </code>
              </pre>
            </div>

            <div className="card-dark p-3 mb-3">
              <h5>Complexity</h5>
              <p><strong>Best Case:</strong> O(n²)</p>
              <p><strong>Average Case:</strong> O(n²)</p>
              <p><strong>Worst Case:</strong> O(n²)</p>
              <p><strong>Space:</strong> O(1)</p>
            </div>

            <div className="card-dark p-3">
              <h5 className="mb-3">Time Complexity Curve</h5>
              <svg width="260" height="180">
                <line x1="30" y1="140" x2="240" y2="140" stroke="#8b949e" />
                <line x1="30" y1="140" x2="30" y2="20" stroke="#8b949e" />
                <polyline fill="none" stroke="#58a6ff" strokeWidth="3" points={graphPoints} />
                <text x="90" y="165" fill="#8b949e" fontSize="12">Input Size (n)</text>
                <text x="-110" y="15" fill="#8b949e" fontSize="12" transform="rotate(-90)">Operations</text>
              </svg>
              <div className="text-center mt-2">O(n²) Graph</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .visualizer-container {
          background: #000000;
          color: white;
          min-height: 100vh;
        }
        .title {
          font-weight: 700;
          color: #f0f6fc;
        }
        .card-dark {
          background: #020306;
          border: 1px solid #060606;
          border-radius: 14px;
          box-shadow: 0 4px 14px rgba(0,0,0,.5);
        }
        .input-dark {
          background: #000000;
          border: 1px solid #157aed;
          color: white;
          padding: 8px 12px;
          border-radius: 8px;
          min-width: 240px;
          outline: none;
        }
        .input-dark:focus {
          border-color: #58a6ff;
        }
        .bar-chart-container {
          min-height: 280px;
          padding: 20px 0;
        }
        .bar-column {
          width: 55px;
          flex-shrink: 0;
        }
        .graph-half {
          height: 120px;
          position: relative;
        }
        .zero-axis-divider {
          height: 2px;
          background-color: #000000;
          width: 100%;
          z-index: 2;
        }
        .array-bar {
          width: 100%;
          border-radius: 6px 6px 0 0;
          position: relative;
        }
        .negative-bar {
          border-radius: 0 0 6px 6px !important;
        }
        .bar-value {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-weight: bold;
          font-size: 13px;
          color: #ffffff;
        }
        .pos-val {
          top: -22px;
        }
        .neg-val {
          bottom: -22px;
        }
        .index-label {
          color: #ab1616;
          font-size: 13px;
          text-align: center;
        }
        .comparison-text {
          color: #58a6ff;
          font-size: 16px;
        }
        .found-text {
          color: #3fb950;
          font-weight: 600;
          font-size: 18px;
        }
        .code-box {
          background: #000000;
          border: 1px solid #116bd1;
          border-radius: 10px;
          padding: 12px;
          color: #79c0ff;
          overflow-x: auto;
          margin: 0;
        }
      `}</style>
    </div>
  );
}