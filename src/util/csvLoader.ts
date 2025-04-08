import { parse } from "papaparse";
import { NameEntry } from "../types";

// Load names from CSV file in browser environment
export const loadCSVData = async (filePath: string): Promise<NameEntry[]> => {
  const response = await fetch(filePath);
  const csvText = await response.text();
  const parsedData = parse<NameEntry>(csvText, {
    header: true,
    skipEmptyLines: true,
  });
  return parsedData.data;
};
