"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { Zap, FileText, Target, Users, CheckCircle, Star, Brain, ArrowRight } from 'lucide-react';

// Animated text component for the hero
interface AnimatedWordProps {
  words: string[];
  speed?: number;
  pause?: number;
}
const AnimatedWord: React.FC<AnimatedWordProps> = ({ words, speed = 120, pause = 1200 }) => {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState(words[0]);
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(words[0].length);
  const timeout = useRef<NodeJS.Timeout | number>();

  useEffect(() => {
    if (deleting) {
      if (charIdx > 0) {
        timeout.current = setTimeout(() => setCharIdx(charIdx - 1), speed / 2);
      } else {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      if (charIdx < words[index].length) {
        timeout.current = setTimeout(() => setCharIdx(charIdx + 1), speed);
      } else {
        timeout.current = setTimeout(() => setDeleting(true), pause);
      }
    }
    setDisplay(words[index].slice(0, charIdx));
    return () => clearTimeout(timeout.current as number);
  }, [charIdx, deleting, index, words, speed, pause]);

  useEffect(() => {
    if (!deleting && charIdx === 0) setCharIdx(1);
  }, [deleting, charIdx]);

  return <span className="inline-block align-baseline font-bold text-black animate-pulse" style={{minWidth: '0.8em'}}>{display}&nbsp;</span>;
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-center items-center">
      {/* Hero Section */}
      <section className="w-full flex flex-col justify-center items-center flex-1 py-24 px-4 mt-24">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center">
          <h1 className="hero-title mb-4 leading-tight text-5xl md:text-6xl font-extrabold tracking-tight" style={{lineHeight: 1.08, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <span>Write resume intros</span>
            <span className="flex flex-row flex-wrap justify-center items-baseline gap-2 mt-1">
              that get you
              <span style={{display: 'inline-block', verticalAlign: 'baseline', fontWeight: 800, marginLeft: '0.2em'}}>
                <AnimatedWord words={["interviews", "results", "noticed", "offers"]} />
              </span>
            </span>
          </h1>
          <h2 className="hero-subtitle mb-6 text-lg md:text-xl font-medium text-gray-700 max-w-xl mx-auto">
            Paste your skills, projects, and job description. Our AI crafts a tailored, ATS-friendly introduction for every job.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto justify-center items-center mb-4">
            <Button asChild className="btn w-full sm:w-auto text-lg py-4 px-8" style={{ fontWeight: 700 }}>
              <Link href="/free-tool">
                <Zap className="mr-2 h-5 w-5" />
                Try Free Tool
              </Link>
            </Button>
            <Button asChild variant="outline" className="btn border border-gray-200 bg-white text-black w-full sm:w-auto text-lg py-4 px-8" style={{ fontWeight: 700 }}>
              <Link href="/pro-tool">
                <FileText className="mr-2 h-5 w-5" />
                Use Pro Tool
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-10 w-full flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full mx-auto flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-bold mb-4">Generic Introductions Are <span className="text-red-500">Killing</span> Your First Impression</h2>
          <p className="text-base text-gray-600 mb-8 max-w-2xl mx-auto">Recruiters see hundreds of identical "hardworking professional" intros every day. Stand out with AI-crafted introductions that speak directly to each role.</p>
          <div className="grid md:grid-cols-2 gap-8 w-full items-stretch justify-center">
            <div className="glass-card bg-white border border-gray-100 flex flex-col items-center text-center mx-auto h-full min-h-[260px] py-8 px-4">
              <div className="flex items-center mb-4 justify-center">
                <div className="w-5 h-5 bg-red-500 rounded-full mr-3 animate-glow-red" style={{boxShadow: '0 0 18px 6px rgba(239,68,68,0.5), 0 0 48px 16px rgba(239,68,68,0.18)'}}></div>
                <h3 className="text-xl font-extrabold text-red-700">Generic & Boring</h3>
              </div>
              <p className="italic text-gray-500 mb-4">"I am a hardworking and dedicated software developer with strong problem-solving skills. I have experience in various programming languages and am looking for new opportunities to grow my career in technology."</p>
              <ul className="text-base text-red-600 space-y-1 text-left mx-auto font-semibold" style={{maxWidth:'260px'}}>
                <li className="flex items-center"><Target className="h-4 w-4 mr-2" />Zero job-specific keywords</li>
                <li className="flex items-center"><Users className="h-4 w-4 mr-2" />Could be anyone's resume</li>
              </ul>
            </div>
            <div className="glass-card bg-white border border-gray-100 flex flex-col items-center text-center mx-auto h-full min-h-[260px] py-8 px-4">
              <div className="flex items-center mb-4 justify-center">
                <div className="w-5 h-5 bg-green-500 rounded-full mr-3 animate-glow-green" style={{boxShadow: '0 0 18px 6px rgba(34,197,94,0.5), 0 0 48px 16px rgba(34,197,94,0.18)'}}></div>
                <h3 className="text-xl font-extrabold text-green-700">AI-Tailored & Compelling</h3>
              </div>
              <p className="italic text-gray-500 mb-4">"React developer with 3 fintech projects and expertise in TypeScript, Node.js, and AWS. Passionate about building scalable payment systems and excited to contribute to your blockchain-powered trading platform using my experience with real-time data processing."</p>
              <ul className="text-base text-green-600 space-y-1 text-left mx-auto font-semibold" style={{maxWidth:'260px'}}>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2" />Job-specific keywords included</li>
                <li className="flex items-center"><Star className="h-4 w-4 mr-2" />Shows relevant experience</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 border-t border-b border-gray-100 bg-gray-50 w-full flex flex-col items-center justify-center">
        <div className="max-w-5xl w-full mx-auto flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-bold mb-8">From Hours to <span className="text-blue-600">Seconds</span></h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12 w-full items-center justify-center">
            <div className="text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">1. Paste Job Description</h3>
              <p className="text-sm text-gray-600">Copy the job posting you're applying for</p>
                </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
              <h3 className="font-semibold mb-2">2. Add Your Experience</h3>
              <p className="text-sm text-gray-600">Share your skills and projects (or upload resume)</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-green-600" />
                </div>
              <h3 className="font-semibold mb-2">3. Instant AI Magic</h3>
              <p className="text-sm text-gray-600">Get a tailored intro ready to copy & paste</p>
                </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 w-full flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full mx-auto flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Stand Out?</h2>
          <p className="text-base mb-8 text-gray-600">Join thousands of job seekers who've already upgraded their resume introductions. Start getting noticed today.</p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto justify-center items-center">
            <Button asChild className="btn w-full sm:w-auto text-lg py-4 px-8" style={{ fontWeight: 700 }}>
                <Link href="/free-tool">
                  <Zap className="mr-2 h-5 w-5" />
                  Try Free Tool Now
                </Link>
              </Button>
            <Button asChild variant="outline" className="btn border border-gray-200 bg-white text-black w-full sm:w-auto text-lg py-4 px-8" style={{ fontWeight: 700 }}>
                <Link href="/pro-tool">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Upgrade to Pro
                </Link>
              </Button>
            </div>
        </div>
      </section>
    </div>
  );
}