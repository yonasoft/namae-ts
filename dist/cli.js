#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const argv = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .option("gender", {
    alias: "g",
    type: "string",
    description: "Gender of the given name (male, female, all)",
    choices: ["male", "female", "all"],
    default: "all",
})
    .help()
    .alias("help", "h").argv;
const gender = argv.gender;
const fullName = (0, index_1.getRandomFullName)(gender);
if (fullName) {
    console.log(`Surname: ${fullName.surname.kanji} (${fullName.surname.romaji})`);
    console.log(`Given Name: ${fullName.given.kanji} (${fullName.given.romaji})`);
}
else {
    console.log("No names found.");
}
