
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Agents from "./pages/Agents.jsx";
import UploadForm from "./components/UploadForm.jsx";
import DistributedList from "./components/DistributedList.jsx";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />}>
        <Route path="agents" element={<Agents />} />
        <Route path="upload" element={<UploadForm />} />
        <Route path="lists" element={<DistributedList />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
