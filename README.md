
# namae-ts

### [npm](https://www.npmjs.com/package/namae-ts)

A random Japanese name generator with CLI support.

## Installation

```bash
# Install globally
npm install -g namae-ts

# OR use directly with npx
npx namae-ts

# OR install as a dependency in your project
npm install namae-ts

```

## Usage
### CLI
The namae-ts command line tool allows you to generate random Japanese names with optional gender specification:
``` bash
# Generate a random name (any gender)
namae-ts

# Generate a male name
namae-ts --gender male
# OR
namae-ts -g male

# Generate a female name
namae-ts --gender female
# OR
namae-ts -g female

# Show help
namae-ts --help
```

## API
You can also use namae-ts as a library in your JavaScript/TypeScript projects:

``` javascript
import { loadNames, getRandomFullName, getRandomName } from 'namae-ts';

// First, load the names database
await loadNames();

// Generate a random full name (any gender)
const fullName = getRandomFullName();
console.log(`${fullName.surname.kanji} ${fullName.given.kanji}`);
console.log(`${fullName.surname.romaji} ${fullName.given.romaji}`);

// Generate a gender-specific name
const maleName = getRandomFullName('male');
const femaleName = getRandomFullName('female');

// Get individual name parts
const surname = getRandomName('surname');
const givenName = getRandomName('given', 'female'); // For given names, you can specify gender
```

# Types

``` typescript
export interface NameEntry {
  romaji: string;
  kanji: string;
  kana: string;
  gender?: "male" | "female" | "all";
  type: "surname" | "given";
}

export interface FullName {
  given: NameEntry;
  surname: NameEntry;
}
```

# Example Output


Surname: 佐藤 (Sato)
Given Name: 花子 (Hanako)
