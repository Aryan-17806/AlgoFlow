import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar px-4 py-3 shadow"
      style={{
        background: "linear-gradient(90deg, #00030a, #00020a)",
      }}
    >
        <Link
        to="/"
        className="navbar-brand m-0"
        style={{
          fontFamily: "Times New Roman, serif",
          fontSize: "28px",
          fontWeight: "bold",
          color: "white",
          letterSpacing: "6px"
        }}
      >
         AlgoFlow
      </Link>
    </nav>
  );
}

export default Navbar;