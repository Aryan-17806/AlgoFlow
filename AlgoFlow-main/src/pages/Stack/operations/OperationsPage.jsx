import { useState } from "react";
import "./OperationsPage.css";

const MAX_LIMIT = 10;

function OperationsPage() {
  const [stack, setStack] = useState([]);
  const [value, setValue] = useState("");
  const [maxSize, setMaxSize] = useState(5);
  const [message, setMessage] = useState("");

  const top = stack.length ? stack[stack.length - 1] : "-";

  const handlePush = () => {
    if (!value) {
      setMessage("Enter a value");
      return;
    }

    if (stack.length >= maxSize) {
      setMessage("Stack Overflow (isFull = true)");
      return;
    }

    setStack([...stack, value]);
    setValue("");
    setMessage("Element pushed");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handlePush();
    }
  };

  const handlePop = () => {
    if (stack.length === 0) {
      setMessage("Stack Underflow (isEmpty = true)");
      return;
    }

    setStack(stack.slice(0, -1));
    setMessage("Element popped");
  };

  const handlePeek = () => {
    if (stack.length === 0) {
      setMessage("Stack is empty");
      return;
    }

    setMessage(`Top element is ${top}`);
  };

  const handleReset = () => {
    setStack([]);
    setMessage("Stack reset");
  };

  const handleIsEmpty = () => {
    setMessage(stack.length === 0 ? "isEmpty = true" : "isEmpty = false");
  };

  const handleIsFull = () => {
    setMessage(
      stack.length === maxSize ? "isFull = true" : "isFull = false"
    );
  };

  const handleSizeChange = (e) => {
    let size = Number(e.target.value);

    if (size > MAX_LIMIT) {
      size = MAX_LIMIT;
      setMessage("Max size limit is 10");
    }

    if (size < 1) size = 1;

    setMaxSize(size);

    if (stack.length > size) {
      setStack(stack.slice(0, size));
    }
  };

  return (
    <div className="stack-visualizer-page">
      <div className="stack-shell">

        <div className="stack-shell-header">
          <h1>Stack Visualizer</h1>
        </div>

        <div className="size-control">
          <label>Stack Size (max 10): </label>
          <input
            type="number"
            value={maxSize}
            onChange={handleSizeChange}
          />
        </div>

        <div className="stack-workspace">

          <div
        className="stack-tube"
        style={{
            height: `${maxSize * 60}px` 
        }}
        >
        {stack.map((item, index) => (
            <div
            key={index}
            className={`stack-item ${
                index === stack.length - 1 ? "top-item" : ""
            }`}
            >
            {item}
            </div>
        ))}
        </div>

          <div className="stack-stats">
            <div className="stat-row">
              <span>Top :</span>
              <div className="stat-pill">{top}</div>
            </div>

            <div className="stat-row">
              <span>Size :</span>
              <div className="stat-pill">{stack.length}</div>
            </div>

            <div className="stat-row">
              <span>Max :</span>
              <div className="stat-pill">{maxSize}</div>
            </div>

            <button className="reset-btn" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>

        <div className="stack-controls">
          <input
            className="stack-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}  
            placeholder="Enter value"
          />

          <button className="ctrl-btn" onClick={handlePush}>Push</button>
          <button className="ctrl-btn" onClick={handlePop}>Pop</button>
          <button className="ctrl-btn" onClick={handlePeek}>Peek</button>
          <button className="ctrl-btn" onClick={handleIsEmpty}>isEmpty</button>
          <button className="ctrl-btn" onClick={handleIsFull}>isFull</button>
        </div>

        <p className="stack-message">{message}</p>

      </div>
    </div>
  );
}

export default OperationsPage;