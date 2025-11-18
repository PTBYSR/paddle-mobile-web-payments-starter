'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function WaitlistPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isMounted) return;
    
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get('email') as string;
      const businessName = formData.get('business_name') as string;
      const needs = formData.get('needs') as string;

      const supabase = createClient();
      const { error } = await supabase
        .from('waitlist')
        .insert([
          { 
            email,
            business_name: businessName,
            needs,
            created_at: new Date().toISOString()
          },
        ]);

      if (error) throw error;
      
      setIsSuccess(true);
      (event.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }
  if (isSuccess) {
    return (
      <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4" style={{
        backgroundImage: 'url(/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(0, 0, 0, 0.9)'
      }}>
        <div className="absolute inset-0 bg-black/90 -z-10"></div>
        <div className="relative w-full max-w-2xl">
          <div className="relative z-10 p-8 md:p-10 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-2xl">
            <div className="bg-green-500/50 border border-green-400/60 rounded-full px-6 py-1.5 text-sm text-white font-medium mb-8 inline-flex items-center gap-2 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              You&apos;re on the list!
            </div>
            <h1 className="text-4xl font-bold tracking-tight  sm:text-5xl md:text-6xl mb-6">
              Thanks for joining our waitlist! 🎉
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              We&apos;ll be in touch soon with more details. In the meantime, follow us on X to stay updated with our progress and get early access to exclusive content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="https://x.com/agentsakura_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
                Follow us on X
              </Link>
              <Link 
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white border border-gray-600 rounded-full hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home mr-2 w-5 h-5">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Return Home
              </Link>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-30"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{
      backgroundImage: 'url(/hero-bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'rgba(0, 0, 0, 0.9)'
    }}>
      <div className="absolute inset-0 bg-black/90 -z-10"></div>
      <div className="relative z-10">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-20 md:grid-cols-2 md:gap-14 md:px-10">
          <div className="flex w-full flex-col gap-6 h-full">
            <Badge variant="secondary" className="mb-2 w-fit uppercase">
              Join Waitlist
            </Badge>
            <h1 className="text-3xl font-medium tracking-tight sm:text-5xl">
              Get Early Access to
              <span className="text-white block">Sakura AI</span>
            </h1>
            <p className="max-w-lg ">
              Be among the first to experience our AI-powered customer support solution. Join our waitlist today and we&apos;ll notify you when we launch.
            </p>
            <div className="mt-auto">
              <Link href="/" className="inline-flex items-center gap-1.5 bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-blue-600 transition-colors w-fit">
                <span>Back to home</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>

          <div className={cn(
            "bg-secondary/30 rounded-lg border border-transparent px-5 py-8 transition-colors md:px-7",
            "space-y-6"
          )}>
            {isSuccess ? (
              <div className="text-center py-8">
                <h3 className="text-xl font-medium mb-2">Thank you!</h3>
                <p className="text-muted-foreground">You&apos;ve been added to our waitlist. We&apos;ll be in touch soon!</p>
                <Button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 w-full"
                  variant="outline"
                >
                  Submit another response
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="Your name" 
                    className="bg-background" 
                    required 
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    className="bg-background" 
                    required 
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="business">Business Name (Optional)</Label>
                  <Input 
                    id="business" 
                    name="business" 
                    placeholder="Your business name" 
                    className="bg-background" 
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="needs">What are you looking to achieve with Sakura? (Optional)</Label>
                  <textarea 
                    id="needs" 
                    name="needs"
                    placeholder="E.g., Automate customer support, handle high query volume, etc." 
                    className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isSubmitting}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
                </Button>
            
                <p className="text-xs text-white text-center">
                  We respect your privacy. Your information will only be used to notify you about our launch.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
