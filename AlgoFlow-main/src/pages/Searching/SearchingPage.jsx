import "./SearchingPage.css";
import { Link } from "react-router-dom";

function SearchingPage() {
  return (
    <div className="search-page">
      <div className="container py-5">

        <h1 className="mb-5">Searching Algorithms</h1>

        <div className="row g-4">

          <div className="col-md-6">
            <div className="algo-card p-4">
              <h4>Linear Search</h4>

              <p>
                Checks each element one by one.
                <br />
                Time Complexity: O(n)
              </p>

              <Link to="/searching/linear" className="btn btn-primary mt-3">
                Open Visualizer →
              </Link>
            </div>
          </div>

          <div className="col-md-6">
            <div className="algo-card p-4">
              <h4>Binary Search</h4>

              <p>
                Works on sorted arrays by dividing search space.
                <br />
                Time Complexity: O(log n)
              </p>

              <Link to="/searching/binary" className="btn btn-primary mt-3">
                Open Visualizer →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default SearchingPage;