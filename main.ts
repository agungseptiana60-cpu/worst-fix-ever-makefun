// Entry program for the make.fun bounty "Worst Fix Ever: Funniest Commit
// Message" (u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722).
//
// The entry is one line, at most 100 characters: a commit message for a
// bug fix that made everything worse. The grader runs this program and
// reads the line it writes to entry.txt inside the output directory.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for the /output mount:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The line, chosen against the judge's brief, most important first:
// 1. On subject: a commit message about a fix that backfired. The fix
//    is silencing the smoke alarm; the backfire is that the house can
//    now burn without anyone noticing.
// 2. Genuinely funny on a first read: the second clause turns a small
//    household repair into a disaster. "Burn quietly" is the punchline
//    — the alarm worked, the house did not.
// 3. Specific irony, not a generic breakage: the repair did not fail
//    to fix the alarm, it fixed it too well, by removing the warning
//    the alarm exists to give. The line could only be about this kind
//    of fix.
// 4. Sounds like a real commit subject a tired engineer would type:
//    plain "fix:" prefix, no setup, no explanation, no exclamation.
// 5. Fresh angle: no revert, no testing in production, no "broke
//    everything". A smoke alarm, a battery, a quiet house on fire.
//    87 characters, inside the 100-character gate.
export const ENTRY_LINE =
  'fix: silence the smoke alarm by removing its battery, so the house can now burn quietly';

// Self-check against the gate before writing anything: the entry must be
// one line of 1 to 100 characters, not only white space. Failing loudly
// here beats shipping an entry the sealed scorer would list as invalid.
if (
  ENTRY_LINE.length < 1 ||
  ENTRY_LINE.length > 100 ||
  ENTRY_LINE.trim().length === 0 ||
  ENTRY_LINE.trim() !== ENTRY_LINE ||
  ENTRY_LINE.includes('\n')
) {
  throw new Error(
    `entry line must be a single line of 1 to 100 characters, got ${ENTRY_LINE.length}`,
  );
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'entry.txt'), ENTRY_LINE + '\n', 'utf8');

console.log(`wrote entry.txt (${ENTRY_LINE.length} characters)`);
