import { useState } from "react";
import axios from "../api/axiosInstance.js";

function UploadForm() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files)); // convert FileList to array
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (files.length === 0) return alert("Select at least one file");

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file)); // must match backend

    try {
      const res = await axios.post("/upload/multiple", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message); // show backend message
      setFiles([]);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Upload CSV/XLSX Files</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          multiple
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>

      {files.length > 0 && (
        <div>
          <h4>Files selected:</h4>
          <ul>
            {files.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UploadForm;

