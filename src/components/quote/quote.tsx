import React from "react";

interface QuoteProps {
  text: string | React.ReactNode;
  author: string;
  role: string;
  className?: string;
}

export function Quote({ text, author, role, className = '' }: QuoteProps) {
  return (
    <figure className={`mx-auto flex max-w-3xl flex-col items-center px-4 py-12 text-center ${className}`}>
      <blockquote className="text-3xl leading-[1.1] font-medium tracking-tighter text-balance md:text-5xl md:text-wrap">
        {typeof text === 'string' ? (
          <span>&ldquo;{text}&rdquo;</span>
        ) : (
          text
        )}
      </blockquote>
      <figcaption className="mt-10">
        <span className="block font-semibold tracking-tight md:text-xl">{author}</span>
        <span className="text-muted-foreground mt-1 block text-xs tracking-tighter md:text-xl">
          {role}
        </span>
      </figcaption>
    </figure>
  );
}

// Default export with the original quote for backward compatibility
export const DefaultQuote = () => (
  <Quote 
    text="Sakura hits a gap that's massively underestimated, solo operators everywhere are drowning in customer DMs, juggling WhatsApp, Instagram, and support flows while trying to run the entire business themselves..."
    author="@ctranbtw"
    role="Social Media Influencer"
  />
);
