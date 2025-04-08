import fs from 'fs';
import { parse } from 'papaparse';
import { NameEntry, FullName } from './types';

let names: NameEntry[] = [];

export const loadNames = async () => {
  console.log('Loading names from CSV file...');
  const data = await fs.readFileSync('src/assets/names.csv', 'utf-8');
  const parsedData = await parse<NameEntry>(data, {
    header: true,
    skipEmptyLines: true,
  });
  console.log('Names loaded successfully');
  names = parsedData.data;
};

// Get a random name based on type and gender
export const getRandomName = (
  type: 'surname' | 'given',
  gender: 'male' | 'female' | 'all' = 'all'
): NameEntry | null => {
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

export const getRandomFullName = (
  gender: 'male' | 'female' | 'all' = 'all'
): FullName | null => {
  const givenName = getRandomName('given', gender);
  const surname = getRandomName('surname');

  console.log(givenName, surname);
  if (!givenName || !surname) {
    return null;
  }

  return { given: givenName, surname };
};

export * from './types';
