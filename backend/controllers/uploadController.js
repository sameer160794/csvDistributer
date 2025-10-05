import DistributedList from "../models/distributedModel.js";
import User from "../models/userModel.js";
import fs from "fs";
import path from "path";
import XLSX from "xlsx";

export const uploadAndDistributeMultiple = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const agents = await User.find({ role: "agent" });
    if (agents.length === 0) {
      return res.status(400).json({ message: "No agents found" });
    }

    let allItems = [];

    for (const file of req.files) {
      const ext = path.extname(file.originalname).toLowerCase();

      if (ext === ".csv" || ext === ".xlsx" || ext === ".xls") {
        const workbook = XLSX.readFile(file.path);
        const sheetName = workbook.SheetNames[0];
        const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        console.log(`Read ${rows.length} rows from ${file.originalname}`);
        allItems = allItems.concat(rows);
      } else {
        console.log(`Skipped unsupported file: ${file.originalname}`);
      }

      fs.unlinkSync(file.path); // delete file after processing
    }

    if (allItems.length === 0) {
      return res.status(400).json({ message: "No valid rows found in uploaded files" });
    }

    // Split rows evenly among agents
    const chunkSize = Math.ceil(allItems.length / agents.length);
    const distributedLists = agents.map((agent, index) => {
      const start = index * chunkSize;
      const end = start + chunkSize;
      const agentItems = allItems.slice(start, end);

      if (agentItems.length === 0) return null;

      return DistributedList.create({ agent: agent._id, items: agentItems });
    }).filter(Boolean);

    const savedLists = await Promise.all(distributedLists);

    res.status(200).json({
      message: "Files uploaded and distributed successfully",
      lists: savedLists,
    });

  } catch (error) {
    console.error("Upload and distribute error:", error);
    res.status(500).json({ message: error.message || "Upload failed" });
  }
};
