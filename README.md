# namae-ts

A random Japanese name generator with CLI and library support.

<a href="https://www.npmjs.com/package/namae-ts">
  <img src="https://img.shields.io/npm/v/namae-ts?style=flat-square" alt="npm version"/>
</a>
<a href="https://npm-stat.com/charts.html?package=namae-ts&from=2023-01-01&to=2028-12-31">
  <img src="https://img.shields.io/badge/npm--stat-View%20Downloads-blue?style=flat-square" alt="View download stats on npm-stat"/>
</a>
<img src="https://img.shields.io/badge/Language-TypeScript-blue?logo=typescript&style=flat-square" alt="TypeScript"/>
<img src="https://img.shields.io/badge/Node.js-Compatible-green?logo=node.js&style=flat-square" alt="Node.js"/>

---

## Installation

```bash
# Install globally for CLI use
npm install -g namae-ts

# Use without installing
npx namae-ts

# Install as a project dependency
npm install namae-ts
```

---

## CLI Usage

```bash
# Generate a random name (any gender)
namae-ts

# Generate a male name
namae-ts --gender male
namae-ts -g male

# Generate a female name
namae-ts --gender female
namae-ts -g female

# Show help
namae-ts --help
```

---

## API Usage

```typescript
import { loadNames, getRandomFullName, getRandomName } from 'namae-ts';

// Load the names database first
await loadNames();

// Generate a random full name
const fullName = getRandomFullName();
console.log(`${fullName.surname.kanji} ${fullName.given.kanji}`);
// → 佐藤 花子
console.log(`${fullName.surname.romaji} ${fullName.given.romaji}`);
// → Sato Hanako

// Generate a gender-specific full name
const maleName = getRandomFullName('male');
const femaleName = getRandomFullName('female');

// Get individual name parts
const surname = getRandomName('surname');
const givenName = getRandomName('given', 'female');
```

---

## Types

```typescript
export interface NameEntry {
  romaji: string;
  kanji: string;
  kana: string;
  gender?: 'male' | 'female' | 'all';
  type: 'surname' | 'given';
}

export interface FullName {
  given: NameEntry;
  surname: NameEntry;
}
```

---

## Related

- [mingzi-ts](https://www.npmjs.com/package/mingzi-ts) — Chinese name generator by the same author

---

## Contact

- Email: [yonasoft7@gmail.com](mailto:yonasoft7@gmail.com)
- GitHub: [github.com/yonasoft](https://github.com/yonasoft)
