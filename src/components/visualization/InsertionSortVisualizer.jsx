import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function InsertionSortVisualizer() {
  const [input, setInput] = useState("50,-30,80,-10,40");
  const [array, setArray] = useState([50, -30, 80, -10, 40]);

  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);

  const [comparing, setComparing] = useState([]);
  const [activeElement, setActiveElement] = useState(-1);
  const [sorted, setSorted] = useState([]);

  const timerRef = useRef(null);

  const parseArray = (text) => {
    return text
      .split(",")
      .map((x) => Number(x.trim()))
      .filter((x) => !isNaN(x));
  };

  const maxAbsVal = array.length > 0 ? Math.max(...array.map(Math.abs), 1) : 1;

  const generateSteps = (startingArray) => {
    const arr = [...startingArray];
    if (!arr.length) return [];

    const temp = [];
    const n = arr.length;
    let sortedIndices = [0]; // The first element is initially considered sorted

    temp.push({
      array: [...arr],
      comparing: [],
      activeElement: -1,
      sorted: [...sortedIndices],
    });

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;

      // Step: Highlight the active item being inserted
      temp.push({
        array: [...arr],
        comparing: [],
        activeElement: i,
        sorted: [...sortedIndices],
      });

      while (j >= 0 && arr[j] > key) {
        // Step: Highlight the element being compared against the key
        temp.push({
          array: [...arr],
          comparing: [j, j + 1],
          activeElement: j + 1,
          sorted: [...sortedIndices],
        });

        arr[j + 1] = arr[j];
        j = j - 1;

        // Step: Save array snapshot after shifting element forward
        temp.push({
          array: [...arr],
          comparing: [j + 1],
          activeElement: j + 2,
          sorted: [...sortedIndices],
        });
      }
      
      arr[j + 1] = key;
      
      // Update sorted partition up to the current outer loop index
      sortedIndices = Array.from({ length: i + 1 }, (_, index) => index);
      
      temp.push({
        array: [...arr],
        comparing: [],
        activeElement: -1,
        sorted: [...sortedIndices],
      });
    }

    // Explicitly mark all items sorted at completion
    sortedIndices = Array.from({ length: n }, (_, index) => index);
    temp.push({
      array: [...arr],
      comparing: [],
      activeElement: -1,
      sorted: [...sortedIndices],
    });

    return temp;
  };

  const applyStep = (step) => {
    if (!step) return;
    setArray(step.array);
    setComparing(step.comparing);
    setActiveElement(step.activeElement);
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
    setActiveElement(-1);
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
    setActiveElement(-1);
    setSorted([]);
  };

  useEffect(() => {
    return () => pause();
  }, []);

  const graphPoints = `30,140 60,138 90,132 120,120 150,100 180,75 210,45 240,20`;

  return (
    <div className="visualizer-container">
      <div className="container-fluid p-4">
        <h2 className="title mb-4">Insertion Sort Bar Visualizer</h2>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card-dark p-3 mb-3">
              <div className="d-flex flex-wrap gap-2 align-items-center">
                <input
                  className="input-dark"
                  placeholder="Type numbers: 50,-30,80..."
                  value={input}
                  onChange={handleInputChange}
                />
                <button className="btn btn-outline-light btn-sm" onClick={stepForward}>Step</button>
                <button className="btn btn-warning btn-sm" onClick={play}>Play</button>
                <button className="btn btn-danger btn-sm" onClick={pause}>Pause</button>
                <button className="btn btn-secondary btn-sm" onClick={reset}>Reset</button>
              </div>
            </div>

            <div className="card-dark p-4 text-center">
              <div className="bar-chart-container d-flex align-items-stretch justify-content-center gap-3">
                {array.map((value, index) => {
                  const calculatedHeight = `${(Math.abs(value) / maxAbsVal) * 110 + 10}px`;
                  const isNegative = value < 0;

                  return (
                    <div key={index} className="bar-column d-flex flex-column">
                      <div className="graph-half positive-zone d-flex align-items-end justify-content-center">
                        {!isNegative && (
                          <motion.div
                            className="array-bar"
                            animate={{
                              height: calculatedHeight,
                              backgroundColor: index === activeElement
                                ? "#f97316" // Orange for key element being shifted
                                : sorted.includes(index)
                                ? "#238636" // Green for structural sorted zone
                                : comparing.includes(index)
                                ? "#d29922" // Yellow for active comparisons
                                : "#58a6ff",
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          >
                            <span className="bar-value pos-val">{value}</span>
                          </motion.div>
                        )}
                      </div>

                      <div className="zero-axis-divider" />

                      <div className="graph-half negative-zone d-flex align-items-start justify-content-center">
                        {isNegative && (
                          <motion.div
                            className="array-bar negative-bar"
                            animate={{
                              height: calculatedHeight,
                              backgroundColor: index === activeElement
                                ? "#f97316"
                                : sorted.includes(index)
                                ? "#238636"
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
                      <div className="index-label mt-2">{index}</div>
                    </div>
                  );
                })}
              </div>

              {activeElement !== -1 && (
                <div className="comparison-text mt-4">
                  Active Element (Key): Index {activeElement} (<strong>{array[activeElement]}</strong>)
                  {comparing.length > 0 && <span> Comparing against position {comparing[0]}</span>}
                </div>
              )}

              {steps.length > 0 && currentStep === steps.length - 1 && (
                <div className="found-text mt-3">✓ Array Sorted Successfully via Insertion Sort!</div>
              )}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card-dark p-3 mb-3">
              <h5 className="mb-3">Code Reference (C++)</h5>
              <pre className="code-box">
                <code>
{`void insertionSort(int arr[], int n){
  for(int i=1; i<n; i++){
    int key = arr[i];
    int j = i - 1;
    while(j >= 0 && arr[j] > key){
      arr[j+1] = arr[j];
      j--;
    }
    arr[j+1] = key;
  }
}`}
                </code>
              </pre>
            </div>

            <div className="card-dark p-3 mb-3">
              <h5>Complexity</h5>
              <p><strong>Best Case:</strong> O(n)</p>
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