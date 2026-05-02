import { useState } from "react";
import "./stack.css";

export default function StackVisualizer() {
  const [stack, setStack] = useState([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

<<<<<<< HEAD
=======
  // PUSH
>>>>>>> Anish01
  const handlePush = () => {
    if (input === "") return;

    const newStack = [...stack, input];
    setStack(newStack);
    setInput("");
    setMessage(`Pushed ${input}`);
  };

<<<<<<< HEAD
=======
  // POP
>>>>>>> Anish01
  const handlePop = () => {
    if (stack.length === 0) {
      setMessage("Stack Underflow!");
      return;
    }

    const popped = stack[stack.length - 1];
    setStack(stack.slice(0, -1));
    setMessage(`Popped ${popped}`);
  };

<<<<<<< HEAD
=======
  // PEEK
>>>>>>> Anish01
  const handlePeek = () => {
    if (stack.length === 0) {
      setMessage("Stack is Empty");
      return;
    }

    setMessage(`Top Element: ${stack[stack.length - 1]}`);
  };

<<<<<<< HEAD
=======
  // isEmpty
>>>>>>> Anish01
  const handleIsEmpty = () => {
    setMessage(stack.length === 0 ? "Stack is Empty" : "Stack is NOT Empty");
  };

<<<<<<< HEAD
=======
  // RESET
>>>>>>> Anish01
  const handleReset = () => {
    setStack([]);
    setMessage("Stack Reset");
  };
<<<<<<< HEAD
=======

>>>>>>> Anish01
  return (
    <div className="container">
      <h1>Stack Visualizer</h1>

      <div className="stack-box">
        {stack.map((item, index) => (
          <div
            key={index}
            className={`stack-item ${
              index === stack.length - 1 ? "top" : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>

      <p><b>Top:</b> {stack.length ? stack[stack.length - 1] : "-"}</p>
      <p><b>Size:</b> {stack.length}</p>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter value"
      />

      <div className="buttons">
        <button onClick={handlePush}>Push</button>
        <button onClick={handlePop}>Pop</button>
        <button onClick={handlePeek}>Peek</button>
        <button onClick={handleIsEmpty}>IsEmpty</button>
        <button className="reset" onClick={handleReset}>Reset</button>
      </div>

      <p className="message">{message}</p>
    </div>
  );
}