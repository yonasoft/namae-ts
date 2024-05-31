export interface NameEntry {
  romaji: string;
  kanji: string;
  kana: string;
  gender?: "male" | "female";
  type: "surname" | "given";
}

export interface FullName {
  given: NameEntry;
  surname: NameEntry;
}
