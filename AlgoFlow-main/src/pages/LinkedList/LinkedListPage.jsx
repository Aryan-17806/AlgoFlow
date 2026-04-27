import "./LinkedList.css";
import { Link } from "react-router-dom";

function LinkedListPage() {
  return (
    <div className="linkedlist-page">
      <div className="container py-5">

        <h1 className="text-center mb-5">Linked List Operations</h1>

        <div className="row g-4">

          <div className="col-md-6">
            <div className="ll-card p-4 text-center">
              <h4>Insertion</h4>
              <p>
                Add a new node at beginning, end, or specific position.
                <br /> Time Complexity: O(1) for head/tail
                <br /> Time Complexity: O(n) for position
              </p>

              <Link to="/linkedlist/insert" className="btn btn-primary mt-3">
                Open Visualizer
              </Link>
            </div>
          </div>

          <div className="col-md-6">
            <div className="ll-card p-4 text-center">
              <h4>Deletion</h4>
              <p>
                Remove a node from the linked list.
                <br /> Time Complexity: O(1) for head/tail
                <br /> Time Complexity: O(n) for position  
              </p>

              <Link to="/linkedlist/delete" className="btn btn-primary mt-3">
                Open Visualizer
              </Link>
            </div>
          </div>

          <div className="col-md-6">
            <div className="ll-card p-4 text-center">
              <h4>Traversal</h4>
              <p>
                Visit each node sequentially from head to tail.
                <br /> Time Complexity: O(n) 
              </p>

              <Link to="/linkedlist/traversal" className="btn btn-primary mt-3">
                Open Visualizer
              </Link>
            </div>
          </div>

          <div className="col-md-6">
            <div className="ll-card p-4 text-center">
              <h4>Searching</h4>
              <p>
                Find a specific element in the linked list.
                <br /> Time Complexity: O(n)
              </p>

              <Link to="/linkedlist/search" className="btn btn-primary mt-3">
                Open Visualizer
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default LinkedListPage;