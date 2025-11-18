import { XIcon } from "@/components/footer/icons";
import Link from "next/link";
import { useState, useRef, useEffect } from 'react';
import { Volume2 } from "lucide-react";
const socialLinks = [
  {
    label: <XIcon className="h-6 w-6" />,
    href: "https://x.com/agentsakura_ai",
    title: "Follow us on X (Twitter)",
  },
];



export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground">
              CEO and Co-founder of Sakura:{' '}
              <Link 
                href="https://x.com/ptbthefirst" 
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:underline"
              >
                Paul-Simon
              </Link>
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                title={link.title}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground space-y-2">
          <p> {new Date().getFullYear()} Sakura. All rights reserved.</p>
          <div className="flex justify-center flex-row-reverse items-center gap-2 self-center">
            <p>Plage Coquillage (kiss song) Best Part Only</p>
            <Volume2 className="h-4 w-4" />
          </div>
        </div>
      </div>
    </footer>
  );
}
