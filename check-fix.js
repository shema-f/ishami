
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { askAssistant } from './server/services/aiService.js';

// Simulate index.js logic
const here = path.resolve(process.cwd(), '.env');
const parent = path.resolve(process.cwd(), '..', '.env');
const serverEnv = path.resolve(process.cwd(), 'server', '.env');
const chosen = fs.existsSync(here) ? here : (fs.existsSync(serverEnv) ? serverEnv : (fs.existsSync(parent) ? parent : null));

console.log('--- Environment Loading Check ---');
console.log('CWD:', process.cwd());
console.log('Checking paths:');
console.log('1. Root .env:', here, fs.existsSync(here));
console.log('2. Server .env:', serverEnv, fs.existsSync(serverEnv));
console.log('Chosen config path:', chosen);

if (chosen) dotenv.config({ path: chosen });

console.log('GEMINI_API_KEY loaded:', !!process.env.GEMINI_API_KEY);
if (process.env.GEMINI_API_KEY) {
    console.log('Key length:', process.env.GEMINI_API_KEY.length);
}

console.log('\n--- AI Service Check ---');
try {
    const response = await askAssistant('Mwaramutse? Amategeko yumuhanda niki?', 'TestUser', 'neutral', []);
    console.log('AI Response:', response.slice(0, 100) + '...');
} catch (error) {
    console.error('AI Service Failed:', error);
}
