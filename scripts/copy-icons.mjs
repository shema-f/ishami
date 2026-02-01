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
safeCopy(resolve(srcDir, 'apple-touch-icon.png'), resolve(outDir, 'apple-touch-icon.png'));
safeCopy(resolve(srcDir, 'favicon-16x16.png'), resolve(outDir, 'favicon-16x16.png'));
safeCopy(resolve(srcDir, 'favicon-32x32.png'), resolve(outDir, 'favicon-32x32.png'));
// Copy PWA manifest and service worker to root of output
safeCopy(resolve(root, 'src', 'public', 'manifest.json'), resolve(outDir, 'manifest.json'));
safeCopy(resolve(root, 'src', 'public', 'sw.js'), resolve(outDir, 'sw.js'));

console.log('Icon copy step completed');
