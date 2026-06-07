import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

function LinearSearchVisualizer() {
  const [array, setArray] = useState("");
  const [target, setTarget] = useState("");
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
  if (steps.length === 0 || JSON.stringify(newSteps) !== JSON.stringify(steps)) {
    searchSteps = newSteps;
    setSteps(searchSteps);
    setCurrentStep(0);
  }

  timerRef.current = setInterval(() => {
    setCurrentStep((prev) => {
      const next = prev + 1;

      if (next >= searchSteps.length) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        return prev;
      }

      return next;
    });
  }, 700);
};

const stepForward = () => {
  const newSteps = initializeSearch();
  if (!newSteps) return;

  if (steps.length === 0 || JSON.stringify(newSteps) !== JSON.stringify(steps)) {
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
    // pause animation when inputs change to avoid stale intervals
    pause();
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

        <h2 className="title mb-4">
          Linear Search Visualizer
        </h2>

        <div className="row g-4">

          {/* LEFT */}
          <div className="col-lg-8">

            {/* Controls */}
            <div className="card-dark p-3 mb-3">
                <div className="d-flex flex-wrap gap-2">

  <input
    className="input-dark"
    placeholder="Array (e.g. 5,3,8,2,9)"
    value={array}
    onChange={(e) => setArray(e.target.value)}
  />

  <input
    className="input-dark"
    placeholder="Target"
    value={target}
    onChange={(e) => setTarget(e.target.value)}
  />

  <button
    className="btn btn-outline-light btn-sm"
    onClick={stepForward}
  >
    Step
  </button>

  <button
    className="btn btn-warning btn-sm"
    onClick={play}
  >
    Play
  </button>

  <button
    className="btn btn-danger btn-sm"
    onClick={pause}
  >
    Pause
  </button>

  <button
    className="btn btn-secondary btn-sm"
    onClick={reset}
  >
    Reset
  </button>

</div>
            </div>

            <div className="card-dark p-4 text-center">

              <div className="d-flex justify-content-center flex-wrap gap-3">

                {arr.map((num, index) => {
                  const isActive =
                    index === steps[currentStep]?.index;

                  const isFound =
                    isActive &&
                    steps[currentStep]?.found;

                  return (
                    <div key={index}>
                      <motion.div
                        animate={{
                          scale: isActive ? 1.15 : 1,
                          backgroundColor: isFound
                            ? "#238636"
                            : isActive
                            ? "#d29922"
                            : "#21262d",
                        }}
                        transition={{ duration: 0.3 }}
                        className="array-box"
                      >
                        {num}
                      </motion.div>

                      <div className="index-label">
                        {index}
                      </div>
                    </div>
                  );
                })}
              </div>

              {steps[currentStep] && (
                <div className="comparison-text mt-4">
                  Comparing arr[
                  {steps[currentStep].index}] ={" "}
                  {arr[steps[currentStep].index]}
                </div>
              )}

              {steps[currentStep]?.found && (
                <div className="found-text mt-3">
                  ✓ Found at index{" "}
                  {steps[currentStep].index}
                </div>
              )}

              {steps.length > 0 &&
                currentStep === steps.length - 1 &&
                !steps[currentStep]?.found && (
                  <div className="text-danger mt-3">
                    Target not found
                  </div>
                )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-lg-4">

            {/* Code */}
            <div className="card-dark p-3 mb-3">
              <h5 className="mb-3">Code</h5>

              <pre className="code-box">
                <code>
              {`int linearSearch(int[] arr, int target) {
                  for(int i = 0; i < arr.length; i++) {
                      if(arr[i] == target)
                          return i;
                  }
                  return -1;
              }`}
                </code>
              </pre>
            </div>

         
            <div className="card-dark p-3 mb-3">
              <h5>Complexity</h5>

              <p className="mb-2">
                <strong>Best Case:</strong> O(1)
              </p>

              <p className="mb-2">
                <strong>Average Case:</strong> O(n)
              </p>

              <p className="mb-2">
                <strong>Worst Case:</strong> O(n)
              </p>

              <p>
                <strong>Space:</strong> O(1)
              </p>
            </div>


            <div className="card-dark p-3">
              <h5 className="mb-3">
                Time Complexity Graph
              </h5>

              <svg width="260" height="180">

                <line
                  x1="30"
                  y1="140"
                  x2="240"
                  y2="140"
                  stroke="#8b949e"
                />

                <line
                  x1="30"
                  y1="140"
                  x2="30"
                  y2="20"
                  stroke="#8b949e"
                />

                {/* Graph */}
                <polyline
                  fill="none"
                  stroke="#58a6ff"
                  strokeWidth="3"
                  points={points
                    .map(
                      (p) => `${p.x},${p.y}`
                    )
                    .join(" ")}
                />

                <text
                  x="90"
                  y="165"
                  fill="#8b949e"
                  fontSize="12"
                >
                  Input Size (n)
                </text>

                <text
                  x="-110"
                  y="15"
                  fill="#8b949e"
                  fontSize="12"
                  transform="rotate(-90)"
                >
                  Operations
                </text>
              </svg>

              <div className="text-center mt-2">
                O(n)
              </div>
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
          background: #000000;
          border: 1px solid #363131;
          border-radius: 14px;
          box-shadow: 0 4px 14px rgba(0,0,0,.35);
        }

        .input-dark {
          background: #0d1117;
          border: 1px solid #30363d;
          color: white;
          padding: 8px 12px;
          border-radius: 8px;
          min-width: 180px;
          outline: none;
        }

        .input-dark:focus {
          border-color: #58a6ff;
        }

        .array-box {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          border: 1px solid #bb3b3b;
          font-size: 18px;
          font-weight: 600;
          color: white;
        }

        .index-label {
          margin-top: 6px;
          color: #109734;
          font-size: 12px;
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
          border: 1px solid #30363d;
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

export default LinearSearchVisualizer;