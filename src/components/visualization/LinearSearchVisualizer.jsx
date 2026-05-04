import { useState, useRef } from "react";
import { motion } from "framer-motion";

function LinearSearchVisualizer() {
  const [array, setArray] = useState("");
  const [target, setTarget] = useState("");
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const timerRef = useRef(null);

  const parseArray = () =>
    array
      .split(",")
      .map((x) => Number(x.trim()))
      .filter((x) => !isNaN(x));

  const generateSteps = () => {
    const arr = parseArray();
    if (!arr.length || target === "") return;

    let temp = [];
    for (let i = 0; i < arr.length; i++) {
      temp.push({
        index: i,
        found: arr[i] === Number(target),
      });
      if (arr[i] === Number(target)) break;
    }

    setSteps(temp);
    setCurrentStep(0);

    if (timerRef.current) clearInterval(timerRef.current);
  };

  const play = () => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev + 1;
        if (next >= steps.length) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          return prev;
        }
        return next;
      });
    }, 700);
  };

  const pause = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const arr = parseArray();

  const points = Array.from({ length: 8 }, (_, i) => ({
    x: i * 40 + 30,
    y: 150 - i * 15,
  }));

  return (
    <div style={{ background: "#000000", color: "white", minHeight: "100vh" }}>

      <div className="container-fluid p-4">

        <h4 className="mb-4">Linear Search</h4>

        <div className="row g-3">

          <div className="col-lg-8">

            <div className="card-dark p-3 mb-3 d-flex flex-wrap gap-2">
              <input
                className="input-dark"
                placeholder="Array (1,2,3)"
                onChange={(e) => setArray(e.target.value)}
              />

              <input
                className="input-dark"
                placeholder="Target"
                onChange={(e) => setTarget(e.target.value)}
              />

              <button className="btn btn-success btn-sm" onClick={generateSteps}>
                Run
              </button>

              <button
                className="btn btn-outline-light btn-sm"
                onClick={() => setCurrentStep((p) => p + 1)}
              >
                Step
              </button>

              <button className="btn btn-warning btn-sm" onClick={play}>
                Play 
              </button>

              <button className="btn btn-danger btn-sm" onClick={pause}>
                Pause 
              </button>
            </div>

            <div className="card-dark p-4 text-center">
              <div className="d-flex justify-content-center flex-wrap gap-2">
                {arr.map((num, index) => {
                  const isActive = index === steps[currentStep]?.index;
                  const isFound = isActive && steps[currentStep]?.found;

                  return (
                    <motion.div
                      key={index}
                      animate={{
                        scale: isActive ? 1.2 : 1,
                        backgroundColor: isFound
                          ? "#238636"
                          : isActive
                          ? "#d29922"
                          : "#21262d",
                      }}
                      className="array-box"
                    >
                      {num}
                    </motion.div>
                  );
                })}
              </div>

              {steps[currentStep]?.found && (
                <div className="text-success mt-3">
                  Found at index {steps[currentStep]?.index}
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-4">

            <div className="card-dark p-3 mb-3">
              <h6>Code</h6>
              <pre className="code-box">
                {`int linearSearch(int[] arr, int target){
                for(int i=0;i<arr.length;i++){
                    if(arr[i]==target)
                    return i;
                }
                return -1;
                }`}
              </pre>
            </div>

            <div className="card-dark p-3 mb-3">
              <h6>Complexity</h6>
              <p className="mb-1">Time: O(n)</p>
              <p>Space: O(1)</p>
            </div>

            <div className="card-dark p-3">
              <h6>Time Complexity</h6>

              <svg width="260" height="170">
                <line x1="30" y1="140" x2="240" y2="140" stroke="#8b949e" />
                <line x1="30" y1="140" x2="30" y2="20" stroke="#8b949e" />

                <polyline
                  fill="none"
                  stroke="#58a6ff"
                  strokeWidth="2"
                  points={points.map(p => `${p.x},${p.y}`).join(" ")}
                />
              </svg>

              <small>O(n)</small>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .card-dark {
          background: #000000;
          border: 1px solid #30363d;
          border-radius: 8px;
        }

        .input-dark {
          background: #000000;
          border: 1px solid #30363d;
          color: white;
          padding: 6px 10px;
          border-radius: 6px;
        }

        .array-box {
          padding: 14px;
          min-width: 50px;
          border-radius: 6px;
          background: #000000;
          border: 1px solid #30363d;
        }

        .code-box {
          background: #000000;
          border: 1px solid #30363d;
          padding: 10px;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}

export default LinearSearchVisualizer;