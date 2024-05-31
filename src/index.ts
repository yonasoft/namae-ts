import fs from "fs";
import { parse } from "csv-parse/sync";
import { NameEntry, FullName } from "./types";

const loadNames = (): NameEntry[] => {
  const data = fs.readFileSync("src/assets/names.csv", "utf-8");
  return parse(data, {
    columns: true,
    skip_empty_lines: true,
  });
};

const names = loadNames();

export const getRandomName = (
  type: "surname" | "given",
  gender: "male" | "female" | "all"
): NameEntry | null => {
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

export const getRandomFullName = (
  gender: "male" | "female" | "all"
): FullName | null => {
  const givenName = getRandomName("given", gender);
  const surname = getRandomName("surname", "all");

  if (!givenName || !surname) {
    return null;
  }

  return { given: givenName, surname };
};

export * from "./types";
