import axios from 'axios';

export async function locateIntroSection_Mistral(fullText: string): Promise<string> {
  const system = `You are an expert resume parser. Extract the 2–4 line introductory summary from this resume.`;
  const user = `Full Resume Text:\n${fullText}\n\nExtract only the resume introduction.`;

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