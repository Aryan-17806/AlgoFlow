import "./Sorting.css";
import { Link } from "react-router-dom";

function SortingPage() {
  return (
    <div className="sorting-page">
      <div className="container py-5">

        <h1 className="text-center mb-5">Sorting Algorithms</h1>

        <div className="row g-4">

          <div className="col-md-4">
            <div className="sort-card p-4 text-center">
              <h4>Bubble Sort</h4>
              <p>Repeatedly swaps adjacent elements if they are in wrong order.
                                <br />
                Time Complexity: O(n²)
              </p>

              <Link to="/sorting/bubble" className="btn btn-primary mt-3">
                Open Visualizer
              </Link>

            </div>
          </div>

          <div className="col-md-4">
            <div className="sort-card p-4 text-center">
              <h4>Selection Sort</h4>
              <p>Selects the smallest element and places it in correct position.
                                <br />
                Time Complexity: O(n²)
              </p>

              <Link to="/sorting/selection" className="btn btn-primary mt-3">
                Open Visualizer
              </Link>

            </div>
          </div>

          <div className="col-md-4">
            <div className="sort-card p-4 text-center">
              <h4>Insertion Sort</h4>
              <p>Builds the sorted array one element at a time.
                                <br />              Time Complexity: O(n²)                      
              </p>

              <Link to="/sorting/insertion" className="btn btn-primary mt-3">
                Open Visualizer
              </Link>

            </div>
          </div>

          <div className="col-md-6">
            <div className="sort-card p-4 text-center">
              <h4>Merge Sort</h4>
              <p>Divide and conquer algorithm that splits arrays and merges them.
                                <br />              Time Complexity: O(n log n)
              </p>

              <Link to="/sorting/merge" className="btn btn-primary mt-3">
                Open Visualizer
              </Link>

            </div>
          </div>

          <div className="col-md-6">
            <div className="sort-card p-4 text-center">
              <h4>Quick Sort</h4>
              <p>Efficient divide-and-conquer sorting algorithm.
                                <br />              Time Complexity: O(n log n) on average        
              </p>

              <Link to="/sorting/quick" className="btn btn-primary mt-3">
                Open Visualizer
              </Link>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default SortingPage;