"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Copy, Sparkles, ArrowRight, Loader2, CheckCircle, Zap, FileText } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FreeTool() {
  const [skillsAndProjects, setSkillsAndProjects] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [intro, setIntro] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setIntro('');
    try {
      const res = await fetch('/api/generate-intro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skillsAndProjects, jobDescription }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setIntro(data.intro);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black pt-32">
      <div className="container mx-auto px-2 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Badge variant="secondary" className="px-3 py-1.5 rounded-2xl mb-3 bg-gray-100 text-black border border-gray-200 text-base">
            <Zap className="h-4 w-4 mr-2" />
            Free AI Tool
          </Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-black">Instant Resume Intro Generator</h1>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Paste your skills and the job description below. Our AI will craft a tailored introduction that speaks directly to the role.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Card className="h-[420px] bg-white border border-gray-200 shadow-sm p-6 flex flex-col justify-between">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg md:text-xl">
                  <FileText className="h-5 w-5 mr-2" />
                  Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between gap-3">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="skills" className="text-sm font-semibold">Your Skills & Projects</Label>
                  <Textarea
                    id="skills"
                    placeholder="Example: React developer with 3 years experience. Built an e-commerce platform with 10k+ users, a task management app using Node.js and MongoDB, and a mobile app with React Native. Skilled in JavaScript, TypeScript, AWS, and agile development."
                    value={skillsAndProjects}
                    onChange={(e) => setSkillsAndProjects(e.target.value)}
                    className="rounded-2xl text-base p-3 resize-none w-full min-h-[90px] max-h-[120px]"
                    style={{height: '90px'}}
                  />
                </div>
                <div className="space-y-2 flex-1 mt-2">
                  <Label htmlFor="job" className="text-sm font-semibold">Job Description</Label>
                  <Textarea
                    id="job"
                    placeholder="Paste the job posting here. Include requirements, company description, and any specific technologies or skills mentioned."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="rounded-2xl text-base p-3 resize-none w-full min-h-[90px] max-h-[120px]"
                    style={{height: '90px'}}
                  />
                </div>
                <Button 
                  onClick={handleGenerate}
                  disabled={loading || !skillsAndProjects || !jobDescription}
                  className="w-full rounded-2xl bg-black hover:bg-gray-900 text-white text-base py-3 px-4 font-bold mt-4"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Intro
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Output Section */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="h-[420px] bg-white border border-gray-200 shadow-sm p-6 flex flex-col justify-between">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg md:text-xl">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Your Tailored Intro
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                {error && (
                  <div className="mt-2 p-2 bg-red-100 text-red-700 rounded text-sm">{error}</div>
                )}
                {intro && (
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-base text-black">
                      <p className="leading-relaxed">{intro}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button 
                        onClick={() => {
                          navigator.clipboard.writeText(intro);
                          toast.success('Intro copied to clipboard!');
                        }}
                        variant="outline"
                        className="rounded-2xl flex-1 border border-gray-200 text-black font-bold text-base"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy to Clipboard
                      </Button>
                      <Button 
                        asChild
                        className="rounded-2xl bg-black hover:bg-gray-900 text-white font-bold text-base"
                      >
                        <Link href="/pro-tool">
                          <ArrowRight className="mr-2 h-4 w-4" />
                          Try Pro Tool
                        </Link>
                      </Button>
                    </div>
                    <div className="mt-4 p-3 bg-green-50 rounded-2xl border border-green-200 text-xs">
                      <div className="flex items-center mb-1">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="font-medium text-green-800">Success Tips</span>
                      </div>
                      <ul className="text-green-700 space-y-1">
                        <li>• This intro includes job-specific keywords</li>
                        <li>• Your projects are highlighted contextually</li>
                        <li>• Ready to paste into your resume</li>
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Pro Tool CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-10 text-center">
          <Card className="max-w-2xl mx-auto p-6 bg-white border-2 border-dashed border-gray-200">
            <h3 className="text-xl font-bold mb-2">Want Even Better Results?</h3>
            <p className="text-gray-700 mb-4 text-sm">
              Upload your full resume with our Pro Tool. Get an AI-edited PDF with a perfectly tailored introduction that maintains your original formatting.
            </p>
            <Button asChild size="sm" className="rounded-2xl bg-black hover:bg-gray-900 text-white px-6 py-2 font-bold text-base">
              <Link href="/pro-tool">
                <ArrowRight className="mr-2 h-4 w-4" />
                Try Pro Tool
              </Link>
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}