import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API called:', req.method, req.body);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { skillsAndProjects, jobDescription } = req.body || {};

  if (
    typeof skillsAndProjects !== 'string' ||
    typeof jobDescription !== 'string' ||
    !skillsAndProjects.trim() ||
    !jobDescription.trim()
  ) {
    console.log('Validation failed:', { skillsAndProjects, jobDescription });
    return res.status(400).json({ error: 'Missing or invalid fields: skillsAndProjects, jobDescription' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct', // Or llama3 etc.
        messages: [
            {
              role: 'system',
              content: `You are a professional resume strategist who helps job seekers craft compelling, brief, and highly tailored 2–3 line introductions for their resumes. Keep it concise, focused on alignment with the job, and avoid listing all skills — only highlight the ones that matter for the role.`
            },
            {
              role: 'user',
              content: `Generate a 2–3 line resume introduction tailored to the following job description and candidate's relevant skills.
          
          Job Description:
          ${jobDescription}
          
          Candidate's Skills and Projects:
          ${skillsAndProjects}
          
          Only output a 2–3 line professional resume introduction. Prioritize conciseness, avoid filler words like 'enthusiastic' or 'passionate'. Adjust the tone to match the voice of the job description — whether formal, innovative, or technical. Only mention projects or technologies if they directly reinforce the candidate's fit for this specific role.
`
            }
          ]
          
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return res.status(response.status).json({ error: errorData.error || 'Failed to generate intro' });
    }

    const data = await response.json();
    const generatedIntro = data.choices?.[0]?.message?.content?.trim();

    if (!generatedIntro) {
      return res.status(500).json({ error: 'No intro generated' });
    }

    return res.status(200).json({ intro: generatedIntro });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}