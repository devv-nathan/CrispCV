"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  Zap, 
  Target, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Sparkles,
  FileText,
  Brain,
  Star,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        <div className="container mx-auto px-4 py-24 relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <Badge variant="secondary" className="px-4 py-2 rounded-2xl">
                <Sparkles className="h-4 w-4 mr-2" />
                AI-Powered Resume Enhancement
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight"
            >
              Craft the Perfect Resume Intro for Every Job in 
              <span className="text-purple-600"> Seconds</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
            >
              Paste your skills, projects, and job description — let AI do the rest.
              <br />
              Get tailored, ATS-friendly introductions that actually get noticed.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button 
                asChild 
                size="lg" 
                className="rounded-2xl px-8 py-6 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Link href="/free-tool">
                  <Zap className="mr-2 h-5 w-5" />
                  Try Free Tool
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="rounded-2xl px-8 py-6 text-lg border-2"
              >
                <Link href="/pro-tool">
                  <FileText className="mr-2 h-5 w-5" />
                  Use Pro Tool
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Generic Introductions Are 
              <span className="text-red-500"> Killing </span>
              Your First Impression
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Recruiters see hundreds of identical "hardworking professional" intros every day. 
              Stand out with AI-crafted introductions that speak directly to each role.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 border-red-200 bg-red-50/50 dark:bg-red-900/10 dark:border-red-800">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <h3 className="text-xl font-semibold text-red-700 dark:text-red-400">Generic & Boring</h3>
                </div>
                <CardContent className="p-0">
                  <p className="text-gray-600 dark:text-gray-300 italic">
                    "I am a hardworking and dedicated software developer with strong problem-solving skills. 
                    I have experience in various programming languages and am looking for new opportunities 
                    to grow my career in technology."
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-red-600 dark:text-red-400">
                      <Target className="h-4 w-4 mr-2" />
                      <span className="text-sm">Zero job-specific keywords</span>
                    </div>
                    <div className="flex items-center text-red-600 dark:text-red-400">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">Could be anyone's resume</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 border-green-200 bg-green-50/50 dark:bg-green-900/10 dark:border-green-800">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <h3 className="text-xl font-semibold text-green-700 dark:text-green-400">AI-Tailored & Compelling</h3>
                </div>
                <CardContent className="p-0">
                  <p className="text-gray-600 dark:text-gray-300 italic">
                    "React developer with 3 fintech projects and expertise in TypeScript, Node.js, and AWS. 
                    Passionate about building scalable payment systems and excited to contribute to your 
                    blockchain-powered trading platform using my experience with real-time data processing."
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span className="text-sm">Job-specific keywords included</span>
                    </div>
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <Star className="h-4 w-4 mr-2" />
                      <span className="text-sm">Shows relevant experience</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-red-600" />
              </div>
              <h4 className="font-semibold mb-2">Recruiter Fatigue</h4>
              <p className="text-sm text-muted-foreground">Same generic intros in every resume pile</p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-yellow-600" />
              </div>
              <h4 className="font-semibold mb-2">Missed Keywords</h4>
              <p className="text-sm text-muted-foreground">ATS systems filter out non-matching resumes</p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">One-Size-Fits-All</h4>
              <p className="text-sm text-muted-foreground">Generic intros = ignored applications</p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* How It Saves Time Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              From Hours to 
              <span className="text-blue-500"> Seconds</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stop rewriting the same introduction 20 times. Our AI understands your experience 
              and crafts perfect intros for every application.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Paste Job Description</h3>
              <p className="text-muted-foreground">Copy the job posting you're applying for</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Add Your Experience</h3>
              <p className="text-muted-foreground">Share your skills and projects (or upload resume)</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Instant AI Magic</h3>
              <p className="text-muted-foreground">Get a tailored intro ready to copy & paste</p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mr-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah M., Software Engineer</h4>
                    <p className="text-sm text-muted-foreground">Applying to 15+ companies</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "Saved me hours before every application. I used to spend 30 minutes 
                  rewriting my intro for each job. Now it takes 30 seconds!"
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mr-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Mike T., Product Manager</h4>
                    <p className="text-sm text-muted-foreground">Career changer</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "I finally sound like I know what I'm doing 😭 The AI picked up on details 
                  I never thought to highlight. Got 3x more interviews!"
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why It's Better Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Built with 
              <span className="text-purple-500"> Hiring Data </span>
              + AI
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI understands what recruiters and ATS systems are looking for. 
              Get introductions that actually work.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 h-full">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Custom-Tailored</h3>
                <p className="text-sm text-muted-foreground">
                  Every intro is crafted specifically for the job you're applying to
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 h-full">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Understands Context</h3>
                <p className="text-sm text-muted-foreground">
                  AI analyzes your projects and matches them to job requirements
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 h-full">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">ATS-Friendly</h3>
                <p className="text-sm text-muted-foreground">
                  Optimized keywords and format that passes applicant tracking systems
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 h-full">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Ready to Use</h3>
                <p className="text-sm text-muted-foreground">
                  Clean, professional output that you can copy and paste immediately
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Stand Out?
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Join thousands of job seekers who've already upgraded their resume introductions. 
              Start getting noticed today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                variant="secondary"
                className="rounded-2xl px-8 py-6 text-lg"
              >
                <Link href="/free-tool">
                  <Zap className="mr-2 h-5 w-5" />
                  Try Free Tool Now
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="rounded-2xl px-8 py-6 text-lg bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Link href="/pro-tool">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Upgrade to Pro
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}