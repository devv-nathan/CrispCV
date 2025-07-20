"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, FileText } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

export default function ProTool() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'loading'>('idle');
  const [error, setError] = useState('');

  // Replace with your SheetDB endpoint
  const SHEETDB_ENDPOINT = 'https://sheetdb.io/api/v1/mpxh5y00nkj5s';

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch(SHEETDB_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [{ email, timestamp: new Date().toISOString() }] }),
      });
      if (!res.ok) throw new Error('Failed to join waitlist');
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-4 pt-40 pb-16">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-black">Pro Resume Intro Generator</h1>
        <h2 className="text-lg md:text-xl text-gray-700 mb-10 font-medium max-w-xl mx-auto">
          Upload your full resume and job description. Our AI will edit your PDF and generate a perfectly tailored introduction, keeping your original formatting.
        </h2>
        <Card className="w-full bg-white border border-gray-200 shadow-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Upload Resume (Coming Soon)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-500 text-base py-8">PDF upload and AI editing features coming soon.</div>
          </CardContent>
        </Card>

        {/* Waitlist Section */}
        <div className="w-full max-w-lg mx-auto mb-12 flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-2">Join Waitlist</h3>
          <p className="text-gray-600 mb-6">Enter your email and we’ll notify you as soon as this feature is live.</p>
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-2">
            <div className="flex w-full bg-[#f7f7f7] rounded-full p-1 shadow-sm">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 bg-transparent outline-none px-5 py-3 rounded-full text-base font-medium"
                required
                aria-label="Your email"
                style={{ minWidth: 0 }}
              />
              <button
                type="submit"
                className="rounded-full bg-black text-white font-bold px-7 py-3 text-base transition-colors hover:bg-gray-900"
                disabled={status === 'loading'}
                style={{ whiteSpace: 'nowrap' }}
              >
                {status === 'loading' ? 'Joining...' : 'Notify me when live'}
              </button>
            </div>
            {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
            {status === 'success' && <div className="text-green-700 text-sm mt-1">You’re on the waitlist!</div>}
          </form>
        </div>

        <Button asChild size="lg" className="rounded-2xl bg-black hover:bg-gray-900 text-white px-8 py-3 font-bold">
          <Link href="/free-tool">
            <ArrowRight className="mr-2 h-5 w-5" />
            Try Free Tool
          </Link>
        </Button>
      </div>
    </div>
  );
}
