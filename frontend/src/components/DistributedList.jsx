import { useEffect, useState } from "react";
import axios from "../api/axiosInstance.js";

function DistributedList() {
  const [lists, setLists] = useState([]);

  const fetchLists = async () => {
    try {
      const res = await axios.get("/lists");
      setLists(res.data);
    } catch (err) {
      alert("Failed to fetch distributed lists");
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Distributed Lists</h2>
      {lists.map((list) => (
        <div key={list._id} style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "1rem" }}>
          <h3>Agent: {list.agent.name} ({list.agent.email})</h3>
          <ul>
            {list.items.map((item, idx) => (
              <li key={idx}>{item.FirstName} - {item.Phone} - {item.Notes}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default DistributedList;
