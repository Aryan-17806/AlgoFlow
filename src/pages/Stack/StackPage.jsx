function StackPage() {

  return (
    <div className="container mt-5">

      <h2 className="mb-4">
        Stack
      </h2>

      <h4>Operations</h4>

      <div className="list-group mb-4">

        <button className="list-group-item list-group-item-action">
          Push
        </button>

        <button className="list-group-item list-group-item-action">
          Pop
        </button>

        <button className="list-group-item list-group-item-action">
          Peek
        </button>

        <button className="list-group-item list-group-item-action">
          Is Empty
        </button>

        <button className="list-group-item list-group-item-action">
          Is Full
        </button>

      </div>

      <h4>Polish Notations</h4>

      <div className="list-group">

        <button className="list-group-item list-group-item-action">
          Prefix Evaluation
        </button>

        <button className="list-group-item list-group-item-action">
          Postfix Evaluation
        </button>

      </div>

    </div>
  );
}

export default StackPage;