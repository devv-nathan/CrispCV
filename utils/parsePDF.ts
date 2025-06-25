import pdf from 'pdf-parse';

export async function extractText(fileBuffer: Buffer): Promise<string> {
  const data = await pdf(fileBuffer);
  return data.text;
} 