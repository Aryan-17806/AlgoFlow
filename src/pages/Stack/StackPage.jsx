import "./Stack.css";
import { Link } from "react-router-dom";

function StackPage() {
  return (
    <div className="stack-page">
      <div className="container py-5">

        <h1 className="text-center mb-5">Stack</h1>

        <h3 className="mb-4">Operations</h3>

        <div className="row g-4 mb-5">

          <div className="col-md-4">
            <div className="stack-card p-4 text-center">
              <h4>Push</h4>
              <p>Add an element to the top of the stack.
                <br />      Time Complexity: O(1) 
              </p>

              <Link to="/stack/push" className="btn btn-primary mt-3">
                Open Visualizer
              </Link>
            </div>
          </div>

          <div className="col-md-4">
            <div className="stack-card p-4 text-center">
              <h4>Pop</h4>
              <p>Remove the top element from the stack.
                <br />      Time Complexity: O(1) 
              </p>

              <Link to="/stack/pop" className="btn btn-primary mt-3">
                Open Visualizer
              </Link>
            </div>
          </div>

          <div className="col-md-4">
            <div className="stack-card p-4 text-center">
              <h4>Peek</h4>
              <p>View the top element without removing it.
                <br />      Time Complexity: O(1)
              </p>

              <Link to="/stack/peek" className="btn btn-primary mt-3">
                Open Visualizer
              </Link>
            </div>
          </div>

          <div className="col-md-6">
            <div className="stack-card p-4 text-center">
              <h4>Is Empty</h4>
              <p>Check whether the stack is empty.
                <br />      Time Complexity: O(1)
              </p>

              <Link to="/stack/isempty" className="btn btn-primary mt-3">
                Open Visualizer
              </Link>
            </div>
          </div>

          <div className="col-md-6">
            <div className="stack-card p-4 text-center">
              <h4>Is Full</h4>
              <p>Check whether the stack is full.
                <br />      Time Complexity: O(1)
              </p>

              <Link to="/stack/isfull" className="btn btn-primary mt-3">
                Open Visualizer
              </Link>
            </div>
          </div>

        </div>

        <h3 className="mb-4">Polish Notations</h3>

        <div className="row g-4">

          <div className="col-md-6">
            <div className="stack-card p-4 text-center">
              <h4>Prefix Evaluation</h4>
              <p>Evaluate prefix expressions using stack.
                <br />      Time Complexity: O(n)
              </p>

              <Link to="/stack/prefix" className="btn btn-primary mt-3">
                Open Visualizer
              </Link>
            </div>
          </div>

          <div className="col-md-6">
            <div className="stack-card p-4 text-center">
              <h4>Postfix Evaluation</h4>
              <p>Evaluate postfix expressions using stack.
                <br />      Time Complexity: O(n)
              </p>

              <Link to="/stack/postfix" className="btn btn-primary mt-3">
                Open Visualizer
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default StackPage;