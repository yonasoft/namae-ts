"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomFullName = exports.getRandomName = void 0;
const fs_1 = __importDefault(require("fs"));
const sync_1 = require("csv-parse/sync");
// Load the CSV data once
const loadNames = () => {
    const data = fs_1.default.readFileSync("src/assets/names.csv", "utf-8");
    return (0, sync_1.parse)(data, {
        columns: true,
        skip_empty_lines: true,
    });
};
const names = loadNames();
const getRandomName = (type, gender) => {
    let filteredNames = names.filter((name) => name.type === type);
    if (gender !== "all") {
        filteredNames = filteredNames.filter((name) => name.gender === gender);
    }
    if (filteredNames.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * filteredNames.length);
    return filteredNames[randomIndex];
};
exports.getRandomName = getRandomName;
const getRandomFullName = (gender) => {
    const givenName = (0, exports.getRandomName)("given", gender);
    const surname = (0, exports.getRandomName)("surname", "all");
    if (!givenName || !surname) {
        return null;
    }
    return { given: givenName, surname };
};
exports.getRandomFullName = getRandomFullName;
