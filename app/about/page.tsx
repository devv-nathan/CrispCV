"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Target, Users, Mail, Coffee, Lightbulb, TrendingUp, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    let start: number | null = null;
    function step(ts: number) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) raf.current = requestAnimationFrame(step);
      else setCount(target);
    }
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [target, duration]);
  return count;
}

export default function About() {
  // Animated numbers for Our Impact
  const resumes = useCountUp(2500);
  const hours = useCountUp(48);
  const callbacks = useCountUp(3.2 * 10, 1200); // animate to 32, then show 3.2x

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-4 pt-32 pb-16">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-black">About CrispCV</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          We’re building the future of resume personalization—using AI to help everyone stand out.
        </p>
      </div>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[minmax(220px,1fr)]">
        {/* Story Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="rounded-3xl shadow-lg p-8 h-full flex flex-col items-center justify-center text-center">
            <Heart className="h-8 w-8 text-pink-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Our Story</h2>
            <p className="text-gray-700 text-base">
              We were tired of rewriting resume intros for every job. So we built something better—AI that crafts intros tailored to every application, instantly.
            </p>
          </Card>
        </motion.div>
        {/* Mission Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <Card className="rounded-3xl shadow-lg p-8 h-full flex flex-col items-center justify-center text-center">
            <Target className="h-8 w-8 text-blue-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Our Mission</h2>
            <p className="text-gray-700 text-base">
              Make job applications faster, fairer, and more effective for everyone—no matter your background or writing skills.
            </p>
          </Card>
        </motion.div>
        {/* Our Impact Card (tall) */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="md:row-span-2">
          <Card className="rounded-3xl shadow-lg p-8 h-full flex flex-col items-center justify-center text-center">
            <TrendingUp className="h-8 w-8 text-green-500 mb-6" />
            <h2 className="text-xl font-bold mb-6">Our Impact</h2>
            <div className="flex flex-col gap-8 w-full items-center justify-center">
              <div className="flex flex-col items-center">
                <span className="text-5xl md:text-6xl font-extrabold text-green-600 mb-1 tracking-tight">{resumes}+</span>
                <span className="text-lg text-gray-700 font-medium">resumes enhanced</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-5xl md:text-6xl font-extrabold text-blue-600 mb-1 tracking-tight">{hours}</span>
                <span className="text-lg text-gray-700 font-medium">avg. time saved</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-5xl md:text-6xl font-extrabold text-purple-600 mb-1 tracking-tight">{(callbacks/10).toFixed(1)}x</span>
                <span className="text-lg text-gray-700 font-medium">more interview callbacks</span>
              </div>
            </div>
          </Card>
        </motion.div>
        {/* What Makes Us Different Card (wide) */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="md:col-span-2">
          <Card className="rounded-3xl shadow-lg p-8 h-full flex flex-col items-center justify-center text-center">
            <h2 className="text-xl font-bold mb-6">What Makes Us Different</h2>
            <div className="flex flex-col md:flex-row w-full gap-6 items-stretch justify-center">
              <div className="flex-1 flex flex-col items-center justify-center">
                <Target className="h-7 w-7 text-blue-600 mb-2" />
                <span className="font-bold text-blue-600 mb-1">Tailored</span>
                <span className="text-gray-700 text-base">Our AI understands context, not just keywords.</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center">
                <Users className="h-7 w-7 text-green-600 mb-2" />
                <span className="font-bold text-green-600 mb-1">Human-tested</span>
                <span className="text-gray-700 text-base">Real job seekers, real feedback.</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center">
                <Heart className="h-7 w-7 text-pink-500 mb-2" />
                <span className="font-bold text-pink-500 mb-1">Built with care</span>
                <span className="text-gray-700 text-base">We’re job seekers too.</span>
              </div>
            </div>
          </Card>
        </motion.div>
        {/* Contact Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
          <Card className="rounded-3xl shadow-lg p-8 h-full flex flex-col items-center justify-center text-center">
            <MessageSquare className="h-8 w-8 text-blue-400 mb-4" />
            <h2 className="text-xl font-bold mb-2">Contact Us</h2>
            <p className="text-gray-700 text-base mb-4">Have feedback or want to share your story? We’d love to hear from you.</p>
            <Button size="lg" className="rounded-full bg-black hover:bg-gray-900 text-white px-8 py-3 font-bold">
              <Mail className="mr-2 h-5 w-5" />
              Email Us
            </Button>
          </Card>
        </motion.div>
        {/* Creator Note Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
          <Card className="rounded-3xl shadow-lg p-8 h-full flex flex-col items-center justify-center text-center">
            <Coffee className="h-8 w-8 text-brown-400 mb-4" />
            <h2 className="text-xl font-bold mb-2">A Note from the Team</h2>
            <p className="text-gray-500 italic mb-2">“Thanks for using CrispCV. Whether you’re starting your career, making a change, or just trying to stand out—we hope this tool helps you tell your story better.”</p>
            <p className="font-medium">— The CrispCV Team</p>
          </Card>
        </motion.div>
        {/* Created by Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
          <Card className="rounded-3xl shadow-lg p-8 h-full flex flex-col items-center justify-center text-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="text-sm text-gray-500 mb-2">Created by</div>
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-200 mb-2 flex items-center justify-center bg-gray-100">
                <Image src="/image.jpg" alt="Nathan C Rodrigues" width={80} height={80} className="object-cover w-full h-full" onError={(e) => { (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Nathan+C+Rodrigues&background=eee&color=555&size=80'; }} />
              </div>
              <div className="text-base text-black mt-1">Nathan C Rodrigues</div>
              <div className="flex gap-4 mt-2 justify-center">
                <a href="mailto:nathanrodrigues1128@gmail.com" target="_blank" rel="noopener noreferrer" title="Email">
                  <Mail className="h-6 w-6 text-black hover:text-blue-600 transition-colors" />
                </a>
                <a href="https://github.com/devv-nathan" target="_blank" rel="noopener noreferrer" title="GitHub">
                  <svg className="h-6 w-6 text-black hover:text-blue-600 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.984-.399 3.003-.404 1.018.005 2.046.138 3.006.404 2.289-1.552 3.295-1.23 3.295-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.804 5.624-5.475 5.921.43.372.823 1.104.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.299 24 12c0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/nathan-c-rodrigues" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <svg className="h-6 w-6 text-black hover:text-blue-600 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.966 0-1.75-.79-1.75-1.76s.784-1.76 1.75-1.76 1.75.79 1.75 1.76-.784 1.76-1.75 1.76zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.38v4.59h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
                </a>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}