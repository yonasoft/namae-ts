"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const sync_1 = require("csv-stringify/sync");
const parseEnamdict = (filePath) => {
    const data = fs_1.default.readFileSync(filePath, "utf-8");
    const lines = data.split("\n");
    const entries = [];
    lines.forEach((line) => {
        const match = line.match(/(.+?) \[(.+?)\] \/\((.)\) (.+?)\//);
        if (match) {
            const [, kanji, kana, type, romaji] = match;
            if (/^[ぁ-ん一-龯]+$/.test(kana)) {
                let gender;
                if (type === "m")
                    gender = "male";
                if (type === "f")
                    gender = "female";
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
const saveToCSV = (entries, filePath) => {
    const csvData = (0, sync_1.stringify)(entries, { header: true });
    fs_1.default.writeFileSync(filePath, csvData);
};
const entries = parseEnamdict("src/assets/enamdictu");
saveToCSV(entries, "src/assets/names.csv");
console.log("Data saved to CSV file");
