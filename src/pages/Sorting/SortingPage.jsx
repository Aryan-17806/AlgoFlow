function SortingPage() {

  return (
    <div className="container mt-5">

      <h2 className="mb-4">
        Sorting Algorithms
      </h2>

      <div className="list-group">

        <button className="list-group-item list-group-item-action">
          Bubble Sort
        </button>

        <button className="list-group-item list-group-item-action">
          Selection Sort
        </button>

        <button className="list-group-item list-group-item-action">
          Insertion Sort
        </button>

        <button className="list-group-item list-group-item-action">
          Merge Sort
        </button>

        <button className="list-group-item list-group-item-action">
          Quick Sort
        </button>

      </div>

    </div>
  );
}

export default SortingPage;