'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Footer } from "@/components/footer/footer";

// Custom Card Component for Options
const OptionCard = ({
  selected,
  onClick,
  children,
  className
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    onClick={onClick}
    className={cn(
      "relative flex cursor-pointer items-center justify-center rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all duration-200",
      selected
        ? "border-blue-500 bg-blue-500/10 text-white shadow-[0_0_20px_rgba(59,130,246,0.2)]"
        : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10 hover:text-gray-200",
      className
    )}
  >
    {selected && (
      <div className="absolute top-2 right-2 text-blue-500">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    )}
    {children}
  </div>
);

export default function WaitlistPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [country, setCountry] = useState('Detecting...');
  const [role, setRole] = useState('');
  const [source, setSource] = useState('');
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  // States for "Other" inputs
  const [roleOther, setRoleOther] = useState('');
  const [sourceOther, setSourceOther] = useState('');

  useEffect(() => {
    setIsMounted(true);
    const supabase = createClient();

    // Auto-detect country
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.country_name) {
          setCountry(data.country_name);
        } else {
          setCountry('Unknown');
        }
      })
      .catch(() => setCountry('Unknown'));

    // Fetch waitlist count
    const fetchCount = async () => {
      const { count } = await supabase
        .from('wait_list')
        .select('*', { count: 'exact', head: true });

      if (count !== null) {
        setWaitlistCount(count + 37);
      }
    };

    fetchCount();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isMounted) return;

    // Basic validation
    if (!role || !source) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);

      const fullName = formData.get('full_name') as string;
      const dailyCustomers = formData.get('daily_customers') as string;
      const companyName = formData.get('company_name') as string;

      // Handle Role
      let finalRole = role;
      if (role === 'Other') {
        finalRole = roleOther;
      }

      // Handle Source
      let finalSource = source;
      if (source === 'Other') {
        finalSource = sourceOther;
      }

      const supabase = createClient();
      const { error } = await supabase
        .from('wait_list')
        .insert([
          {
            full_name: fullName,
            country: country,
            role: finalRole,
            daily_customers: dailyCustomers ? parseInt(dailyCustomers) : null,
            company_name: companyName,
            source: finalSource,
            created_at: new Date().toISOString()
          },
        ]);

      if (error) throw error;

      setIsSuccess(true);
      // Reset form
      setRole('');
      setSource('');
      setRoleOther('');
      setSourceOther('');
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
      <div className="min-h-screen w-full relative flex flex-col">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0 select-none">
          <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/80"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 flex-1 flex items-center justify-center p-4">
          <div className="relative p-8 md:p-12 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl overflow-hidden w-full max-w-2xl">
            {/* Success Animation Decoration */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/20 rounded-full blur-3xl"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6 ring-1 ring-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                You're on the list!
              </h1>

              <p className="text-lg text-gray-300 mb-10 max-w-lg">
                Thanks for joining. We'll verify your details and get in touch with you shortly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <Link
                  href="https://x.com/agentsakura_ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-black/50 border border-white/10 rounded-xl hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                  Get more updates on X
                </Link>
                <Link
                  href="https://www.linkedin.com/company/sakura-agent/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                  Get more updates on LinkedIn
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3.5 text-base font-medium text-gray-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/20 transition-all hover:-translate-y-0.5"
                >
                  Return Home
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 w-full mt-auto">
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative flex flex-col">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 text-left select-none">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-black/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>
      </div>

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:-translate-x-0.5 transition-transform"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </div>
          Back to Home
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 py-10">
        <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-12 gap-12 items-start mt-12 md:mt-0 px-4 md:px-8">
          {/* Left Side: Content */}
          <div className="md:col-span-5 flex flex-col pt-4 md:pt-10">
            <Badge variant="outline" className="mb-6 w-fit border-blue-500/30 text-blue-400 bg-blue-500/10 px-3 py-1 text-xs uppercase tracking-wider backdrop-blur-sm">
              Beta Access
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6 leading-[1.1]">
              Join the future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Customer Support
              </span>
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-md leading-relaxed">
              We just launched and are accommodating beta users only. Fill the form to get first-hand access to Sakura AI.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {/* Live Count Display */}
                <div className="flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm text-gray-300">
                  <span className="relative flex h-2 w-2 mr-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  {waitlistCount !== null ? (
                    <>
                      <span className="text-white font-semibold mr-1">{waitlistCount}</span> beta testers
                    </>
                  ) : (
                    <span className="animate-pulse">Loading count...</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="md:col-span-7">
            <div className="relative rounded-3xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] p-6 md:p-8">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent rounded-3xl pointer-events-none"></div>

              <form onSubmit={handleSubmit} className="relative space-y-8">
                {/* Personal Info Section */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <Label htmlFor="full_name" className="text-gray-300 text-sm font-medium ml-1 mb-2 block">Full Name</Label>
                    <Input
                      id="full_name"
                      name="full_name"
                      placeholder="John Doe"
                      className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 rounded-xl"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="country" className="text-gray-300 text-sm font-medium ml-1 mb-2 block">Country</Label>
                    <div className="relative">
                      <Input
                        id="country"
                        name="country"
                        value={country}
                        readOnly
                        className="h-12 bg-white/5 border-white/10 text-gray-400 cursor-not-allowed rounded-xl pl-10"
                        disabled
                      />
                      <div className="absolute left-3.5 top-3.5 text-gray-500">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><path d="M2 12h20" /></svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Role Section */}
                <div className="space-y-1">
                  <Label className="text-gray-300 text-sm font-medium ml-1 mb-3 block">What describes you best? <span className="text-red-400">*</span></Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {['Entrepreneur', 'Customer support agent', 'Other'].map((option) => (
                      <OptionCard
                        key={option}
                        selected={role === option}
                        onClick={() => setRole(option)}
                      >
                        {option === 'Other' ? 'Other' : option}
                      </OptionCard>
                    ))}
                  </div>
                  {role === 'Other' && (
                    <Input
                      name="role_other"
                      value={roleOther}
                      onChange={(e) => setRoleOther(e.target.value)}
                      placeholder="Please specify your role"
                      className="h-11 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus-visible:ring-blue-500/50 animate-in fade-in slide-in-from-top-2 duration-200 mt-2"
                      required
                      disabled={isSubmitting}
                    />
                  )}
                </div>

                {/* Company Details */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <Label htmlFor="company_name" className="text-gray-300 text-sm font-medium ml-1 mb-2 block">Company Name</Label>
                    <Input
                      id="company_name"
                      name="company_name"
                      placeholder="Acme Inc."
                      className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 rounded-xl"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="daily_customers" className="text-gray-300 text-sm font-medium ml-1 mb-2 block">How many customers do you respond to online on an average</Label>
                    <Input
                      id="daily_customers"
                      name="daily_customers"
                      type="number"
                      placeholder="e.g. 50"
                      className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 rounded-xl"
                      required
                      disabled={isSubmitting}
                      min="0"
                    />
                  </div>
                </div>

                {/* Source Section */}
                <div className="space-y-1">
                  <Label className="text-gray-300 text-sm font-medium ml-1 mb-3 block">How did you hear about us? <span className="text-red-400">*</span></Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["X/Twitter", "Instagram", "Product Hunt", "LinkedIn", "Other"].map((item) => (
                      <OptionCard
                        key={item}
                        selected={source === item}
                        onClick={() => setSource(item)}
                      >
                        {item}
                      </OptionCard>
                    ))}
                  </div>
                  {source === 'Other' && (
                    <Input
                      name="source_other"
                      value={sourceOther}
                      onChange={(e) => setSourceOther(e.target.value)}
                      placeholder="Please specify where you found us"
                      className="h-11 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus-visible:ring-blue-500/50 animate-in fade-in slide-in-from-top-2 duration-200 mt-2"
                      required
                      disabled={isSubmitting}
                    />
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-300"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : 'Join the Waitlist'}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By joining, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full mt-10">
        <Footer />
      </div>
    </div>
  );
}
