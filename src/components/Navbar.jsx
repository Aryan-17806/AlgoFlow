import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        AlgoFlow
      </Link>
    </nav>
  );
}

export default Navbar;