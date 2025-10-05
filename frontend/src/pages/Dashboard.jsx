import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

function Dashboard() {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", gap: "2rem", padding: "1rem" }}>
        <Link to="agents">Manage Agents</Link>
        <Link to="upload">Upload CSV</Link>
        <Link to="lists">Distributed Lists</Link>
      </div>

      <Outlet />
    </div>
  );
}

export default Dashboard;


