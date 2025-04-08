"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomFullName = exports.getRandomName = exports.loadNames = void 0;
const fs_1 = __importDefault(require("fs"));
const papaparse_1 = require("papaparse");
let names = [];
const loadNames = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Loading names from CSV file...');
    const data = yield fs_1.default.readFileSync('src/assets/names.csv', 'utf-8');
    const parsedData = yield (0, papaparse_1.parse)(data, {
        header: true,
        skipEmptyLines: true,
    });
    console.log('Names loaded successfully');
    names = parsedData.data;
});
exports.loadNames = loadNames;
// Get a random name based on type and gender
const getRandomName = (type, gender = 'all') => {
    let filteredNames = names.filter((name) => name.type === type);
    // Filter by gender if type is 'given' and gender is not 'all'
    if (type === 'given') {
        if (gender !== 'all') {
            filteredNames = filteredNames.filter((name) => name.gender === gender);
        }
    }
    if (filteredNames.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * filteredNames.length);
    return filteredNames[randomIndex];
};
exports.getRandomName = getRandomName;
const getRandomFullName = (gender = 'all') => {
    const givenName = (0, exports.getRandomName)('given', gender);
    const surname = (0, exports.getRandomName)('surname');
    console.log(givenName, surname);
    if (!givenName || !surname) {
        return null;
    }
    return { given: givenName, surname };
};
exports.getRandomFullName = getRandomFullName;
__exportStar(require("./types"), exports);
