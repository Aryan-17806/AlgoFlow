import { Link } from "react-router-dom";
import "./Stack.css";

function StackPage() {
  return (
    <div className="stack-page">
      <h1>Stack</h1>

      <div className="stack-grid">
        <div className="stack-card">
          <h3>Operations</h3>
          <p>
            Perform stack operations like Push, Pop, Peek, IsEmpty, and IsFull.
          </p>
          <Link to="/stack/operations" className="stack-open-btn">
            Open Visualizer
          </Link>
        </div>

        <div className="stack-card">
          <h3>Prefix Evaluation</h3>
          <p>
            Evaluate prefix expressions using stack.
            <br />
            Time Complexity: O(n)
          </p>
          <Link to="/stack/prefix" className="stack-open-btn">
            Open Visualizer
          </Link>
        </div>

        <div className="stack-card">
          <h3>Postfix Evaluation</h3>
          <p>
            Evaluate postfix expressions using stack.
            <br />
            Time Complexity: O(n)
          </p>
          <Link to="/stack/postfix" className="stack-open-btn">
            Open Visualizer
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StackPage;