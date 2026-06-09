import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

function LinearSearchVisualizer() {
  const [array, setArray] = useState("5,3,8,2,9");
  const [target, setTarget] = useState("2");
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);

  const timerRef = useRef(null);

  const parseArray = () => {
    if (!array || !array.trim()) return [];
    return array
      .split(",")
      .map((x) => Number(x.trim()))
      .filter((x) => !isNaN(x));
  };

  const initializeSearch = () => {
    const arr = parseArray();
    if (!arr.length || target === "") return null;

    const temp = [];
    for (let i = 0; i < arr.length; i++) {
      temp.push({
        index: i,
        found: arr[i] === Number(target),
      });
      if (arr[i] === Number(target)) break;
    }
    return temp;
  };

  const play = () => {
    if (timerRef.current) return;

    const newSteps = initializeSearch();
    if (!newSteps) return;

    let searchSteps = steps;
    // Reset framework track if new inputs don't match our current step cache
    if (steps.length === 0 || currentStep === steps.length - 1 || JSON.stringify(newSteps) !== JSON.stringify(steps)) {
      searchSteps = newSteps;
      setSteps(searchSteps);
      setCurrentStep(0);
    }

    let p = currentStep === -1 || currentStep === searchSteps.length - 1 ? 0 : currentStep;
    setCurrentStep(p);

    timerRef.current = setInterval(() => {
      p++;
      if (p >= searchSteps.length) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        return;
      }
      setCurrentStep(p);
    }, 700);
  };

  const stepForward = () => {
    const newSteps = initializeSearch();
    if (!newSteps) return;

    if (steps.length === 0 || currentStep === steps.length - 1 || JSON.stringify(newSteps) !== JSON.stringify(steps)) {
      setSteps(newSteps);
      setCurrentStep(0);
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const pause = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const reset = () => {
    pause();
    setSteps([]);
    setCurrentStep(-1);
    setArray("");
    setTarget("");
  };

  useEffect(() => {
    // dynamically drop stale loops during active input transformations
    pause();
    setSteps([]);
    setCurrentStep(-1);
  }, [array, target]);

  useEffect(() => {
    return () => pause();
  }, []);

  const arr = parseArray();

  const points = [
    { x: 30, y: 140 },
    { x: 60, y: 125 },
    { x: 90, y: 110 },
    { x: 120, y: 95 },
    { x: 150, y: 80 },
    { x: 180, y: 65 },
    { x: 210, y: 50 },
    { x: 240, y: 35 },
  ];

  return (
    <div className="visualizer-container">
      <div className="container-fluid p-4">
        <h2 className="title mb-4">Linear Search Visualizer</h2>

        <div className="row g-4">
          {/* LEFT: Controls & Array Sandbox Container */}
          <div className="col-lg-8">
            <div className="card-dark p-3 mb-3">
              <div className="d-flex flex-wrap gap-2">
                <input
                  className="input-dark flex-grow-1"
                  placeholder="Array (e.g. 5,3,8,2,9)"
                  value={array}
                  onChange={(e) => setArray(e.target.value)}
                />
                <input
                  className="input-dark"
                  style={{ width: "110px", minWidth: "110px" }}
                  placeholder="Target"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                />
                <button className="btn btn-info btn-sm fw-bold text-dark" onClick={stepForward}>
                  Step →
                </button>
                <button className="btn btn-warning btn-sm fw-bold text-dark" onClick={play}>
                  Play
                </button>
                <button className="btn btn-outline-light btn-sm fw-bold" onClick={pause}>
                  Pause
                </button>
                <button className="btn btn-danger btn-sm fw-bold" onClick={reset}>
                  Reset
                </button>
              </div>
            </div>

            <div className="card-dark p-4 text-center">
              <div className="d-flex justify-content-center flex-wrap gap-3 py-3">
                {arr.map((num, index) => {
                  const isActive = index === steps[currentStep]?.index;
                  const isFound = isActive && steps[currentStep]?.found;

                  return (
                    <div key={index} className="d-flex flex-column align-items-center">
                      <motion.div
                        animate={{
                          scale: isActive ? 1.15 : 1,
                          backgroundColor: isFound
                            ? "#22c55e"
                            : isActive
                            ? "#eab308"
                            : "#27272a",
                          borderColor: isFound
                            ? "#4ade80"
                            : isActive
                            ? "#fde047"
                            : "#3f3f46",
                        }}
                        transition={{ duration: 0.25 }}
                        className="array-box"
                        style={{
                          color: isActive && !isFound ? "#000000" : "#ffffff",
                          boxShadow: isFound ? "0 0 15px rgba(34,197,94,0.4)" : "none"
                        }}
                      >
                        {num}
                      </motion.div>
                      <div className="index-label">[{index}]</div>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Status Output Blocks */}
              <div className="status-panel-wrapper mt-2">
                {steps[currentStep] && (
                  <div className="comparison-text">
                    Comparing: <code>arr[{steps[currentStep].index}]</code> ➔ <strong>{arr[steps[currentStep].index]}</strong> {steps[currentStep].found ? "==" : "!="} <strong>{target}</strong>
                  </div>
                )}

                {steps[currentStep]?.found && (
                  <div className="found-text mt-2">
                    ✓ Target Found successfully at index {steps[currentStep].index}!
                  </div>
                )}

                {steps.length > 0 &&
                  currentStep === steps.length - 1 &&
                  !steps[currentStep]?.found && (
                    <div className="not-found-text mt-2">
                      ✕ Target value {target} does not exist in the array.
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* RIGHT: Complexity Panels and Graphs */}
          <div className="col-lg-4">
            <div className="card-dark p-3 mb-3">
              <h5 className="mb-3 panel-title">Algorithm Code</h5>
              <pre className="code-box">
                <code>
{`int linearSearch(int[] arr, int target) {
    for(int i = 0; i < arr.length; i++) {
        if(arr[i] == target)
            return i; // Found
    }
    return -1; // Not Found
}`}
                </code>
              </pre>
            </div>

            <div className="card-dark p-3 mb-3">
              <h5 className="mb-3 panel-title">Complexity Analysis</h5>
              <div className="d-flex flex-column gap-2 metric-row">
                <div><strong>Best Case:</strong> <span className="text-success">O(1)</span></div>
                <div><strong>Average Case:</strong> <span className="text-warning">O(n)</span></div>
                <div><strong>Worst Case:</strong> <span className="text-warning">O(n)</span></div>
                <div className="border-top border-zinc pt-2 mt-1"><strong>Space Complexity:</strong> <span className="text-info">O(1)</span></div>
              </div>
            </div>

            <div className="card-dark p-3 text-center">
              <h5 className="mb-3 panel-title text-start">Time Complexity Graph</h5>
              <div className="d-flex justify-content-center bg-black-canvas rounded p-2">
                <svg width="240" height="160">
                  {/* X Axis */}
                  <line x1="35" y1="130" x2="220" y2="130" stroke="#52525b" strokeWidth="1.5" />
                  {/* Y Axis */}
                  <line x1="35" y1="130" x2="35" y2="15" stroke="#52525b" strokeWidth="1.5" />

                  {/* Growth Line Curve */}
                  <polyline
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    points={points.map((p) => `${p.x + 5},${p.y + 10}`).join(" ")}
                  />

                  {/* Graph Labels */}
                  <text x="100" y="152" fill="#a1a1aa" fontSize="11" fontWeight="600">
                    Input Size (n)
                  </text>
                  <text
                    x="-95"
                    y="18"
                    fill="#a1a1aa"
                    fontSize="11"
                    fontWeight="600"
                    transform="rotate(-90)"
                  >
                    Operations
                  </text>
                </svg>
              </div>
              <div className="text-blue-msg mt-2 fw-bold">Linear Growth Graph — O(n)</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .visualizer-container { background: #09090b; color: #f4f4f5; min-height: 100vh; font-family: system-ui, sans-serif; }
        .title { font-weight: 700; color: #ffffff; letter-spacing: -0.5px; }
        .panel-title { color: #a1a1aa; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .card-dark { background: #18181b; border: 1px solid #27272a; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.5); }
        
        .input-dark { background: #09090b; border: 1px solid #3f3f46; color: #ffffff; padding: 8px 14px; border-radius: 6px; outline: none; transition: border-color 0.2s; font-size: 14px; }
        .input-dark:focus { border-color: #3b82f6; }
        
        .array-box { width: 55px; height: 55px; display: flex; align-items: center; justify-content: center; border-radius: 8px; border: 2px solid #3f3f46; font-size: 18px; font-weight: 700; background: #27272a; transition: all 0.2s ease; }
        .index-label { margin-top: 6px; color: #71717a; font-size: 12px; font-family: monospace; font-weight: bold; }
        
        .status-panel-wrapper { min-height: 50px; display: flex; flex-direction: column; justify-content: center; align-items: center; }
        .comparison-text { color: #60a5fa; font-size: 15px; font-weight: 500; }
        .comparison-text code { background: #09090b; padding: 2px 6px; border-radius: 4px; color: #f4f4f5; }
        .found-text { color: #4ade80; font-weight: 700; font-size: 16px; }
        .not-found-text { color: #f87171; font-weight: 700; font-size: 16px; }
        
        .code-box { background: #09090b; border: 1px solid #27272a; border-radius: 8px; padding: 14px; color: #e4e4e7; overflow-x: auto; margin: 0; font-family: 'Courier New', monospace; font-size: 13px; line-height: 1.5; }
        .metric-row { color: #e4e4e7; font-size: 14px; }
        .border-zinc { border-color: #27272a !important; }
        .bg-black-canvas { background: #09090b; }
        .text-blue-msg { color: #3b82f6; font-size: 13px; }
      `}</style>
    </div>
  );
}

export default LinearSearchVisualizer;