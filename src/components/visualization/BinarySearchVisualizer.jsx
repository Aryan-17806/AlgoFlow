import { useState } from "react";
import { motion } from "framer-motion";

function BinarySearchVisualizer() {
  const [array, setArray] = useState("");
  const [target, setTarget] = useState("");
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);

  const parseArray = () => {
    return array
      .split(",")
      .map((x) => Number(x.trim()))
      .filter((x) => !isNaN(x))
      .sort((a, b) => a - b);
  };

  const generateSteps = () => {
    const arr = parseArray();
    if (!arr.length || target === "") return;

    let left = 0;
    let right = arr.length - 1;
    let tempSteps = [];

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);

      tempSteps.push({
        mid,
        left,
        right,
        found: arr[mid] === Number(target),
      });

      if (arr[mid] === Number(target)) break;
      else if (arr[mid] < target) left = mid + 1;
      else right = mid - 1;
    }

    setSteps(tempSteps);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const autoPlay = () => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setCurrentStep(i);
      if (i >= steps.length - 1) clearInterval(interval);
    }, 800);
  };

  const arr = parseArray();

  return (
    <div className="text-center">

      <div className="mb-4 d-flex justify-content-center gap-2 flex-wrap">
        <input
          className="form-control w-auto"
          placeholder="Array (1,2,3,4)"
          onChange={(e) => setArray(e.target.value)}
        />
        <input
          className="form-control w-auto"
          placeholder="Target"
          onChange={(e) => setTarget(e.target.value)}
        />
        <button className="btn btn-success" onClick={generateSteps}>
          Start
        </button>
        <button className="btn btn-primary" onClick={nextStep}>
          Next
        </button>
        <button className="btn btn-warning" onClick={autoPlay}>
          Auto ▶
        </button>
      </div>

      <div className="d-flex justify-content-center gap-3 flex-wrap">
        {arr.map((num, index) => {
          let bg = "#1e293b";

          if (index === steps[currentStep]?.mid) {
            bg = steps[currentStep]?.found ? "#16a34a" : "#f59e0b";
          }

          return (
            <motion.div
              key={index}
              animate={{
                scale: index === steps[currentStep]?.mid ? 1.4 : 1,
              }}
              transition={{ duration: 0.3 }}
              style={{
                padding: "20px",
                minWidth: "50px",
                textAlign: "center",
                background: bg,
                borderRadius: "10px",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {num}
            </motion.div>
          );
        })}
      </div>

      {steps[currentStep]?.found && (
        <p className="mt-4 text-success fw-bold">
          Element Found
        </p>
      )}
    </div>
  );
}

export default BinarySearchVisualizer;