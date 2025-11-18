import { Button } from "@/components/ui/button";
import { Mail, MessageCircle } from "lucide-react";
import { XIcon } from "@/components/footer/icons";
import Link from "next/link";

export function Contact() {
  return (
    <section id="contact" className="w-full py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mx-auto mb-8 mt-4 max-w-2xl text-muted-foreground">
            Have questions or want to learn more? Reach out to us through any of these channels.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild variant="outline" className="w-full max-w-xs gap-2 sm:w-auto">
              <Link 
                href="https://x.com/agentsakura_ai" 
                target="_blank"
                rel="noopener noreferrer"
              >
                <XIcon className="h-4 w-4" />
                @agentsakura_ai
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full max-w-xs gap-2 sm:w-auto">
              <Link href="mailto:info@sakurasupport.live">
                <Mail className="h-4 w-4" />
                info@sakurasupport.live
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full max-w-xs gap-2 sm:w-auto">
              <Link 
                href="https://wa.me/2347066499537" 
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                Message on WhatsApp
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
