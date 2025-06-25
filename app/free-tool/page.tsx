"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  Copy, 
  Sparkles, 
  ArrowRight, 
  Loader2,
  CheckCircle,
  Zap,
  FileText
} from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="px-4 py-2 rounded-2xl mb-4">
            <Zap className="h-4 w-4 mr-2" />
            Free AI Tool
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Instant Resume Intro Generator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Paste your skills and the job description below. Our AI will craft a tailored introduction that speaks directly to the role.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="skills">Your Skills & Projects</Label>
                  <Textarea
                    id="skills"
                    placeholder="Example: React developer with 3 years experience. Built an e-commerce platform with 10k+ users, a task management app using Node.js and MongoDB, and a mobile app with React Native. Skilled in JavaScript, TypeScript, AWS, and agile development."
                    value={skillsAndProjects}
                    onChange={(e) => setSkillsAndProjects(e.target.value)}
                    className="min-h-[120px] rounded-2xl"
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="job">Job Description</Label>
                  <Textarea
                    id="job"
                    placeholder="Paste the job posting here. Include requirements, company description, and any specific technologies or skills mentioned."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="min-h-[120px] rounded-2xl"
                  />
                </div>
                
                <Button 
                  onClick={handleGenerate}
                  disabled={loading || !skillsAndProjects || !jobDescription}
                  className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
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
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Your Tailored Intro
                </CardTitle>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
                )}
                {intro && (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-2xl border-2 border-dashed border-muted-foreground/20">
                      <p className="text-sm leading-relaxed">{intro}</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        onClick={() => {
                          navigator.clipboard.writeText(intro);
                          toast.success('Intro copied to clipboard!');
                        }}
                        variant="outline"
                        className="rounded-2xl flex-1"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy to Clipboard
                      </Button>
                      <Button 
                        asChild
                        className="rounded-2xl bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                      >
                        <Link href="/pro-tool">
                          <ArrowRight className="mr-2 h-4 w-4" />
                          Try Pro Tool
                        </Link>
                      </Button>
                    </div>
                    
                    <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800">
                      <div className="flex items-center mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span className="font-medium text-green-800 dark:text-green-400">Success Tips</span>
                      </div>
                      <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-2 border-dashed border-purple-200 dark:border-purple-700">
            <h3 className="text-2xl font-bold mb-4">Want Even Better Results?</h3>
            <p className="text-muted-foreground mb-6">
              Upload your full resume with our Pro Tool. Get an AI-edited PDF with a perfectly tailored introduction that maintains your original formatting.
            </p>
            <Button 
              asChild 
              size="lg"
              className="rounded-2xl bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
            >
              <Link href="/pro-tool">
                <ArrowRight className="mr-2 h-5 w-5" />
                Try Pro Tool
              </Link>
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}