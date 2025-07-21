"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSupabase } from '@/hooks/useSupabase';
import { toast } from 'sonner';
import { Mail, Lock, User } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp, signIn } = useSupabase();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password);
        if (error) throw error;
        toast.success('Account created successfully!');
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        toast.success('Signed in successfully!');
      }
      onClose();
    } catch (error: any) {
      if (error.message === 'Email not confirmed') {
        toast.error('Please confirm your email address. Check your inbox for a confirmation link.');
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-md mx-4 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200" style={{ fontFamily: 'var(--font-body)' }}>
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
            <User className="h-5 w-5 mr-2" />
            {isSignUp ? 'Create Account' : 'Sign In'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 rounded-2xl font-medium"
                  style={{ fontFamily: 'var(--font-body)' }}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 rounded-2xl font-medium"
                  style={{ fontFamily: 'var(--font-body)' }}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button type="submit" disabled={loading} className="w-full rounded-2xl bg-black hover:bg-gray-900 text-white font-bold" style={{ fontFamily: 'var(--font-body)' }}>
                {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsSignUp(!isSignUp)}
                className="w-full rounded-2xl font-medium"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="w-full rounded-2xl border border-gray-200 font-medium"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}