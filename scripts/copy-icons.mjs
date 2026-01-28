import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';

const root = process.cwd();
const srcDir = resolve(root, 'src', 'favicon_io');
const outDir = resolve(root, 'build');

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function safeCopy(from, to) {
  try {
    copyFileSync(from, to);
    console.log(`Copied: ${from} -> ${to}`);
  } catch (e) {
    console.warn(`Skip copy: ${from} -> ${to}`, e?.message || e);
  }
}

ensureDir(outDir);
safeCopy(resolve(srcDir, 'favicon.ico'), resolve(outDir, 'favicon.ico'));
safeCopy(resolve(srcDir, 'android-chrome-192x192.png'), resolve(outDir, 'android-chrome-192x192.png'));
safeCopy(resolve(srcDir, 'android-chrome-512x512.png'), resolve(outDir, 'android-chrome-512x512.png'));

console.log('Icon copy step completed');
