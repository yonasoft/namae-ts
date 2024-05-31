#!/usr/bin/env node
import { getRandomFullName } from "./index";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

interface Argv {
  gender: "male" | "female" | "all";
}

const argv = yargs(hideBin(process.argv))
  .option("gender", {
    alias: "g",
    type: "string",
    description: "Gender of the given name (male, female, all)",
    choices: ["male", "female", "all"],
    default: "all",
  })
  .help()
  .alias("help", "h").argv as Argv;

const gender = argv.gender;
const fullName = getRandomFullName(gender);

if (fullName) {
  console.log(
    `Surname: ${fullName.surname.kanji} (${fullName.surname.romaji})`
  );
  console.log(`Given Name: ${fullName.given.kanji} (${fullName.given.romaji})`);
} else {
  console.log("No names found.");
}
