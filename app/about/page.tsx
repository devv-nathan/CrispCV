"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Target, 
  Users, 
  Mail,
  Coffee,
  Lightbulb,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="px-4 py-2 rounded-2xl mb-4">
            <Heart className="h-4 w-4 mr-2" />
            Our Story
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Built by Job Seekers,
            <br />
            for Job Seekers
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We understand the frustration of rewriting resume introductions for every application. 
            That's why we built something better.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-16">
          {/* Origin Story */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mr-4">
                  <Lightbulb className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">The Problem We Solved</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  "I was tired of rewriting intros 20 times a week. Every job application meant 
                  spending 30+ minutes crafting a 'unique' introduction that somehow always 
                  ended up sounding generic anyway."
                </p>
                <p>
                  After landing my dream job, I realized the introduction that got me noticed 
                  wasn't just well-written—it was specifically tailored to what that company 
                  was looking for. The keywords matched, the tone fit, and it told a story 
                  that connected my experience to their needs.
                </p>
                <p>
                  That's when it clicked: <strong>what if AI could do this tailoring automatically?</strong>
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-8 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mr-4">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold">Our Mission</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                    Make Job Applications Faster
                  </h3>
                  <p className="text-muted-foreground">
                    Transform hours of writing into seconds of smart AI generation, 
                    so you can apply to more opportunities.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-600" />
                    Level the Playing Field
                  </h3>
                  <p className="text-muted-foreground">
                    Give everyone access to professionally crafted introductions, 
                    regardless of writing experience or background.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* What Makes Us Different */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-center mb-8">What Makes Us Different</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Actually Tailored</h3>
                <p className="text-sm text-muted-foreground">
                  We don't just swap out company names. Our AI understands context and creates 
                  genuinely relevant introductions.
                </p>
              </Card>
              
              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Coffee className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Human-Tested</h3>
                <p className="text-sm text-muted-foreground">
                  Every output is tested by real job seekers and refined based on 
                  actual hiring feedback.
                </p>
              </Card>
              
              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Built with Care</h3>
                <p className="text-sm text-muted-foreground">
                  We're job seekers too. We understand the stress and want to make 
                  the process genuinely better.
                </p>
              </Card>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
              <h2 className="text-2xl font-bold text-center mb-8">Impact So Far</h2>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">2,500+</div>
                  <p className="text-muted-foreground">Resumes Enhanced</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">48 hrs</div>
                  <p className="text-muted-foreground">Average Time Saved</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">3.2x</div>
                  <p className="text-muted-foreground">More Interview Callbacks</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <Card className="p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mr-4">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">Get in Touch</h2>
              </div>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Have feedback, questions, or just want to share your success story? 
                We'd love to hear from you. Every message helps us improve the tool 
                for everyone.
              </p>
              <Button 
                size="lg"
                className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </Card>
          </motion.div>

          {/* Creator Note */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-8 border-2 border-dashed border-muted-foreground/20">
              <div className="text-center">
                <p className="text-muted-foreground italic mb-4">
                  "Thanks for using ResumeAI. Whether you're starting your career, 
                  making a change, or just trying to stand out in a crowded field—
                  I hope this tool helps you tell your story better."
                </p>
                <p className="font-medium">— The ResumeAI Team</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}