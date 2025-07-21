import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { jobDescription, skillsAndProjects, generatedIntro, userId } = req.body;

  if (!jobDescription || !skillsAndProjects || !generatedIntro) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    if (!supabaseAdmin) {
      return res.status(500).json({ error: 'Database not configured' });
    }

    const { data, error } = await supabaseAdmin
      .from('resume_generations')
      .insert({
        job_description: jobDescription,
        skills_and_projects: skillsAndProjects,
        generated_intro: generatedIntro,
        user_id: userId || null,
      })
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to save generation' });
  }
}