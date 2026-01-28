import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { PDFParse } from 'pdf-parse';

import definations from '../definations.js';
import roadsigns from '../roadsigns.js';
import speedlimits from '../speedlimits.js';
import evaluationQuestions from '../evaluation_questions.js';
import * as quizSource from '../data.js';

dotenv.config();

const getModel = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    return genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      // tools: [
    //   {
    //     googleSearch: {},
    //   },
    // ],
  });
};

let PDF_CONTENT = "";

// Function to load PDF content
const loadPdfContent = async () => {
  try {
    const uploadsDir = path.resolve(process.cwd(), 'server', 'uploads');
    if (!fs.existsSync(uploadsDir)) return;

    const files = fs.readdirSync(uploadsDir).filter(file => file.toLowerCase().endsWith('.pdf'));
    
    for (const file of files) {
      const filePath = path.join(uploadsDir, file);
      const dataBuffer = fs.readFileSync(filePath);
      const pdf = new PDFParse({ data: dataBuffer });
      const data = await pdf.getText();
      PDF_CONTENT += `\n--- SOURCE PDF: ${file} ---\n${data.text.slice(0, 50000)}... (truncated)\n`; // Limit per PDF to avoid context overflow if huge
    }
    console.log(`Loaded ${files.length} PDF documents for AI context.`);
  } catch (error) {
    console.error("Error loading PDF documents:", error);
  }
};

// Load PDFs on startup
loadPdfContent();

const getSystemInstruction = () => {
  const trafficData = JSON.stringify({
    definitions: definations,
    roadSigns: roadsigns,
    speedLimits: speedlimits,
    evaluationQuestions: evaluationQuestions,
    quizData: quizSource.default || quizSource // Handle potential export differences
  });

  return `
 Wowe uri mwarimu w'amategeko y'umuhanda mu Rwanda kuri Ishami PWA.
 Amabwiriza y'imyandikire n'ibikwiye kwitabwaho:
 - Subiza mu Kinyarwanda gusa; imvugo ibe isobanutse, igufi, kandi y'umwuga.
 - Ntukavuge cyangwa ugaragaze "backend", "JSON", "PDF", cyangwa izindi nyandiko z'imbere; ntutange uko wabonye amakuru.
 - Tangira n'umutwe usobanutse ukoresheje Markdown headers (##).
 - Koresha lisiti z'umwuga: imibare (1., 2., 3.) cyangwa uturongo (-); wirinde inyenyeri (* cyangwa **).
 - Tandukanya ibice binini ukoresheje imirongo (---).
 - Koresha quote block (>) mu kuburira no mu bisobanuro by'amategeko.
 - Ku bipimo by'umuvuduko (Speed), amande (Fines), cyangwa ugereranya ibisobanuro, koresha Markdown Tables.
 - Iyo usobanuye ibyapa by'umuhanda (Road Signs), hintera ako kanya iyi ndeshyo ku murongo ukurikira: Icyitonderwa: Kuri ubu, amafoto y’ibyapa ntabwo arahari kuko sisitemu igitunganywa.
 - Koresha Kinyarwanda ufatanya na French/English mu mabendera y'inyito mu nyuguti z'agafupfo (nko: Umuvuduko (Speed), Icyapa (Road Sign)).
 - Baho nk'inzobere itazimiza; jya ku ngingo vuba.
 - Buri gisubizo gisozwe na #GerayoAmahoro.
 
 DATA (NTUGAYIVUGE MU GISUBIZO):
 ${trafficData}
 ${PDF_CONTENT}
 `;
};


export const askAssistant = async (prompt, userName, sentiment, history = []) => {
  try {
    let greeting = "";
    if (sentiment === 'saluting') {
      greeting = `Muraho neza ${userName}, ni gute nagufasha uyu munsi? `;
    } else if (sentiment === 'angry') {
      greeting = `Mbabarira ${userName}, tuza. Ndi hano kugirango tugufashe gukemura ikibazo. `;
    } else if (sentiment === 'happy') {
      greeting = `Nejeje cyane no kumva ko umeze neza ${userName}! Reka dukomeze. `;
    } else {
      greeting = `Muraho ${userName}. `;
    }

    const aiModel = getModel();
    const chat = aiModel.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: getSystemInstruction() }],
        },
        {
          role: "model",
          parts: [{ text: "Ndabyumva neza. Ndi mwarimu w'amategeko y'umuhanda. Niteguye gufasha abanyarwanda mu rurimi rw'Ikinyarwanda nshingiye ku mategeko dufite, ibitabo by'amategeko, n'amakuru mashya." }],
        },
        ...history.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }))
      ],
    });

    const fullPrompt = `${greeting}\n\n${prompt}\n\n(Remember to end with #GerayoAmahoro)`;
    
    const result = await chat.sendMessage(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "Habaye ikibazo mu gutunganya igisubizo. Mwongere mugerageze mukanya. #GerayoAmahoro";
  }
};
