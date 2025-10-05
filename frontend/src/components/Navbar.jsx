import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "1rem", background: "#333", color: "#fff" }}>
      <h3 style={{ display: "inline", marginRight: "2rem" }}>CSV Distributor</h3>
      <button onClick={handleLogout} style={{ float: "right" }}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
