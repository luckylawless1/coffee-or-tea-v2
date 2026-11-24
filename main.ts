// One Letter: Coffee or Tea — entry program.
//
// The entry is exactly one letter: A for coffee, B for tea.
// Choice: B — tea. The standing entry was A, coffee, for the morning
// bounty blitz. This cycle runs after midnight, in the quiet rebuild
// hours: the blitz is over, five entries are rebuilt, and the honest
// answer for this hour is a calm cup of tea, not another coffee.
// The letter is the whole answer: no word, no explanation,
// no punctuation, and no trailing newline (a newline would make
// the file 2 characters and fail the 1-to-1 gate).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LETTER = "B"; // A = coffee, B = tea

// Validation gate: the entry must be exactly one letter, A or B.
// Anything else (empty, longer, trailing newline) fails the
// sealed scorer's 1-to-1 gate, so refuse to write it.
if (!/^[AB]$/.test(LETTER)) {
  throw new Error(`invalid entry letter: ${JSON.stringify(LETTER)}`);
}

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(OUT_DIR, { recursive: true });
const outPath = join(OUT_DIR, "entry.txt");
writeFileSync(outPath, LETTER, "utf8");
// Read-back byte verification: fail hard if what landed on disk is not
// exactly the validated letter — no trailing newline, nothing else.
const written = readFileSync(outPath, "utf8");
if (written !== LETTER) {
  throw new Error(`read-back mismatch: expected ${JSON.stringify(LETTER)}, got ${JSON.stringify(written)}`);
}
