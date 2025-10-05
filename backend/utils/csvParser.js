import fs from "fs";
import csv from "csv-parser";
import XLSX from "xlsx";

/**
 * Parses CSV/XLSX/XLS files and returns an array of rows
 * Expected headers: FirstName, Phone, Notes
 */
export const parseFile = async (filePath) => {
  const extension = filePath.split(".").pop().toLowerCase();

  if (["xlsx", "xls"].includes(extension)) {
    // Parse Excel
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    return data;
  }

  if (extension === "csv") {
    // Parse CSV
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => results.push(row))
        .on("end", () => resolve(results))
        .on("error", (err) => reject(err));
    });
  }

  throw new Error("Invalid file type. Only CSV, XLSX, or XLS are allowed.");
};
