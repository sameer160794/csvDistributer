import { useState, useEffect } from "react";
import axios from "../api/axiosInstance.js";

function Agents() {
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", mobile: "", password: "" });

  // Fetch agents from backend
  const fetchAgents = async () => {
    try {
      const res = await axios.get("/agents"); // JWT added via axios instance
      setAgents(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        alert("Failed to fetch agents");
      }
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  // Handle input changes
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submit to add agent
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/agents", form); // JWT added via axios instance
      alert(res.data.message); // show success message
      setForm({ name: "", email: "", mobile: "", password: "" });
      fetchAgents(); // refresh agent list
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error adding agent");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Add Agent</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required style={{ marginBottom: "0.5rem" }} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ marginBottom: "0.5rem" }} />
        <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} required style={{ marginBottom: "0.5rem" }} />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required style={{ marginBottom: "0.5rem" }} />
        <button type="submit" style={{ padding: "0.5rem", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}>Add Agent</button>
      </form>

      <h3 style={{ marginTop: "2rem" }}>Existing Agents</h3>
      <ul>
        {agents.map((agent) => (
          <li key={agent._id}>{agent.name} - {agent.email} - {agent.mobile}</li>
        ))}
      </ul>
    </div>
  );
}

export default Agents;
