import { mkdir, copyFile } from 'node:fs/promises';
import { join } from 'node:path';

const sourceFolder = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const destinationFolder = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const inputFile = join(sourceFolder, 'VIDEO.json');
const outputFile = join(destinationFolder, 'VIDEO.json');

try {
  await mkdir(destinationFolder, { recursive: true });
  // Preserve the submitted bytes; parsing and serializing would change formatting.
  await copyFile(inputFile, outputFile);
} catch (failure) {
  const detail = failure instanceof Error ? failure.message : String(failure);
  console.error(`VIDEO.json delivery failed (${inputFile} -> ${outputFile}): ${detail}`);
  process.exitCode = 1;
}
