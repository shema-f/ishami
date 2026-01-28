
import { PDFParse } from 'pdf-parse';
import fs from 'fs';
import path from 'path';

const testPdf = async () => {
  try {
    const uploadsDir = path.resolve(process.cwd(), 'server', 'uploads');
    const files = fs.readdirSync(uploadsDir).filter(file => file.toLowerCase().endsWith('.pdf'));
    if (files.length === 0) {
      console.log("No PDFs found to test.");
      return;
    }
    const filePath = path.join(uploadsDir, files[0]);
    console.log(`Testing with ${files[0]}`);
    const dataBuffer = fs.readFileSync(filePath);

    console.log('PDFParse type:', typeof PDFParse);
    
    // Try as function
    try {
      console.log('Trying PDFParse(buffer)...');
      const data = await PDFParse(dataBuffer);
      console.log('Success as function! Text length:', data.text?.length);
    } catch (e) {
      console.log('Failed as function:', e.message);
      
      // Try as class
      try {
        console.log('Trying new PDFParse(buffer)...');
        const pdf = new PDFParse(dataBuffer);
        console.log('Success as class!', pdf);
        // Check if it has text property or method
      } catch (e2) {
        console.log('Failed as class:', e2.message);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

testPdf();
