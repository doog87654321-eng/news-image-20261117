// news-image-20261117: a one-image summary of Tuesday 17 November 2026.
// The image is drawn in render.html (original vector icons, no photos) and
// rendered to entry.png beside this file. This program only copies it to
// the grader's output directory and checks the copy is byte-identical.
//
// Run it with: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const src = new URL('./entry.png', import.meta.url);
const dest = join(outDir, 'entry.png');

mkdirSync(outDir, { recursive: true });
copyFileSync(src, dest);

const digest = (p: string) =>
  createHash('sha256').update(readFileSync(p)).digest('hex');
if (digest(src.pathname) !== digest(dest)) {
  throw new Error('entry.png copy failed checksum');
}
console.log(`wrote ${dest}`);
