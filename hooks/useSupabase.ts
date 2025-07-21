import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export function useSupabase() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if Supabase is configured
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Handle auth redirect (email confirmation, etc.)
    const handleAuthRedirect = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        // Clean up the URL by removing the hash parameters
        if (window.location.hash) {
          router.replace(window.location.pathname);
        }
      }
    };

    // Check for auth redirect first
    if (window.location.hash.includes('access_token')) {
      handleAuthRedirect();
    }
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Clean up URL after successful auth
      if (session && window.location.hash.includes('access_token')) {
        router.replace(window.location.pathname);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const signUp = async (email: string, password: string) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } };
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } };
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    if (!supabase) return { error: { message: 'Supabase not configured' } };
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };
}