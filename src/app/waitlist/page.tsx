'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function WaitlistPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData.entries());
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSuccess(true);
      (event.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
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
                <p className="text-muted-foreground">You've been added to our waitlist. We'll be in touch soon!</p>
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
