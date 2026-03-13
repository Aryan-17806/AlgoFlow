import { useNavigate } from "react-router-dom";

function HomePage() {

  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">

      <h1 className="display-4 mb-3">
        AlgoFlow 
      </h1>

      <p className="text-muted mb-5">
        Interactive Data Structures & Algorithms Visualizer
      </p>

      <div className="row g-4">

        <div className="col-md-6">
          <button
            className="btn btn-primary w-100 p-4"
            onClick={() => navigate("/searching")}
          >
            Searching
          </button>
        </div>

        <div className="col-md-6">
          <button
            className="btn btn-success w-100 p-4"
            onClick={() => navigate("/sorting")}
          >
            Sorting
          </button>
        </div>

        <div className="col-md-6">
          <button
            className="btn btn-warning w-100 p-4"
            onClick={() => navigate("/linkedlist")}
          >
            Linked List
          </button>
        </div>

        <div className="col-md-6">
          <button
            className="btn btn-danger w-100 p-4"
            onClick={() => navigate("/stack")}
          >
            Stack
          </button>
        </div>

      </div>

    </div>
  );
}

export default HomePage;