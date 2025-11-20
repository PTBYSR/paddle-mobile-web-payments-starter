"use client";

import { FAQs } from "@/components/faqs/faqs";
import { Features } from "@/components/features/features";
import { Footer } from "@/components/footer/footer";
import { Hero } from "@/components/hero/hero";
import { Showcase } from "@/components/showcase/showcase";
import { Testimonials } from "@/components/testimonials/testimonials";
import { Quote } from "@/components/quote/quote";
import { HowItWorks } from "@/components/how-it-works/how-it-works";
import { useRedirectWarning } from "@/lib/redirect";
import { Contact } from "@/components/contact/contact";

export default function Home() {
  useRedirectWarning();

  return (
    <>
      <Hero />
      <Showcase />
      <Quote 
          text="Sakura hits a gap that's massively underestimated, solo operators everywhere are drowning in customer DMs, juggling WhatsApp, Instagram, and support flows while trying to run the entire business themselves..."
          author="@ctranbtw"
          role="Social Media Influencer"
      />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQs />
      <Quote 
          text="...The tool is awesome."
          author="Hunter Kallay"
          role="Co-founder of FryAI "
      />
      <Contact />
      <Footer />
    </>
  );
}
