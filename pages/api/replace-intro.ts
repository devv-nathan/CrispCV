import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import type { File } from 'formidable';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import axios from 'axios';
import fs from 'fs';
import { extractText } from '../../utils/parsePDF';
import { locateIntroSection_Mistral } from '../../utils/identifyIntro';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function generateNewIntro_Mistral(jobDescription: string, skillsAndProjects: string): Promise<string> {
  const system = `You are a resume writing assistant. Write a concise, tailored 2–3 line resume introduction for a candidate based on their skills/projects and the job description. Be specific, professional, and engaging.`;
  const user = `Skills & Projects: ${skillsAndProjects}\nJob Description: ${jobDescription}`;

  const res = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'mistralai/mistral-7b-instruct',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ]
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return res.data.choices[0].message.content.trim();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({ multiples: false });

  try {
    // Await form.parse using a Promise
    const { fields, files } = await new Promise<{ fields: Record<string, any>, files: Record<string, File | File[]> }>((resolve, reject) => {
      form.parse(req, (err: any, fields: Record<string, any>, files: Record<string, File | File[]>) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    // Support both single and array file
    let file: File | undefined;
    if (Array.isArray(files.resume)) {
      file = files.resume[0];
    } else {
      file = files.resume as File;
    }
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Robustly get the file buffer (support all formidable/file scenarios)
    let fileBuffer: Buffer | undefined = undefined;
    if ((file as any).filepath) {
      // If formidable saved to disk, read from disk
      fileBuffer = fs.readFileSync((file as any).filepath);
    } else if ((file as any).buffer) {
      // If formidable provided a buffer
      fileBuffer = (file as any).buffer;
    } else if (typeof (file as any).toBuffer === 'function') {
      // If formidable provides a toBuffer method
      fileBuffer = await (file as any).toBuffer();
    }
    if (!fileBuffer) {
      return res.status(400).json({ error: 'Could not read uploaded file as buffer' });
    }

    const jobDescription = fields.jobDescription as string;
    const skillsAndProjects = (fields.skills as string) || '';

    // Extract full text from PDF
    const fullText = await extractText(fileBuffer);
    // Identify old intro
    const oldIntro = await locateIntroSection_Mistral(fullText);
    // Generate new intro using AI
    const newIntro = await generateNewIntro_Mistral(jobDescription, skillsAndProjects);

    // Convert Buffer to ArrayBuffer for pdf-lib
    let arrayBuffer: ArrayBuffer;
    if (fileBuffer.buffer instanceof ArrayBuffer) {
      arrayBuffer = fileBuffer.buffer.slice(fileBuffer.byteOffset, fileBuffer.byteOffset + fileBuffer.byteLength);
    } else {
      arrayBuffer = Uint8Array.from(fileBuffer).buffer;
    }
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Overlay white box and redraw new intro
    firstPage.drawRectangle({
      x: 50,
      y: height - 100,
      width: width - 100,
      height: 80,
      color: rgb(1, 1, 1),
    });
    firstPage.drawText(newIntro, {
      x: 50,
      y: height - 80,
      size: 12,
      font,
      color: rgb(0, 0, 0),
      maxWidth: width - 100,
    });

    // Save new PDF to buffer
    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = Buffer.from(pdfBytes).toString('base64');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
      intro: newIntro,
      pdf: pdfBase64
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
} 