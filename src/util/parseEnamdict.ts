import fs from "fs";
import { stringify } from "csv-stringify/sync";

interface NameEntry {
  romaji: string;
  kanji: string;
  kana: string;
  gender?: "male" | "female";
  type: "surname" | "given";
}

const parseEnamdict = (filePath: string): NameEntry[] => {
  const data = fs.readFileSync(filePath, "utf-8");
  const lines = data.split("\n");
  const entries: NameEntry[] = [];

  lines.forEach((line) => {
    const match = line.match(/(.+?) \[(.+?)\] \/\((.)\) (.+?)\//);
    if (match) {
      const [, kanji, kana, type, romaji] = match;
      if (/^[ぁ-ん一-龯]+$/.test(kana)) {
        let gender: "male" | "female" | undefined;
        if (type === "m") gender = "male";
        if (type === "f") gender = "female";

        // Include only surnames and given names, exclude full names (h)
        if (type === "s" || gender) {
          entries.push({
            romaji,
            kanji,
            kana,
            gender,
            type: type === "s" ? "surname" : "given",
          });
        }
      }
    }
  });

  return entries;
};

const saveToCSV = (entries: NameEntry[], filePath: string) => {
  const csvData = stringify(entries, { header: true });
  fs.writeFileSync(filePath, csvData);
};

const entries = parseEnamdict("src/assets/enamdictu");
saveToCSV(entries, "src/assets/names.csv");
console.log("Data saved to CSV file");
