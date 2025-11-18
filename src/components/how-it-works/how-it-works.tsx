import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Bot, Zap } from "lucide-react";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <Badge variant="secondary" className="uppercase mb-4 mx-auto block w-fit">
          How It Works
        </Badge>
        <h2 className="text-3xl font-medium tracking-tight mb-4 text-center sm:text-4xl">
          How to use Sakura in <span className="text-muted-foreground">3 simple steps</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Using Sakura is very straightforward and simple.
        </p>
        
        <div className="grid gap-6 md:grid-cols-3">
          {/* Step 1 */}
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Step 1</span>
              </div>
              <CardTitle className="text-xl">Connect Your Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Connect Sakura to WhatsApp, Instagram, Shopify, and other platforms to start managing all your customer interactions in one place.
              </p>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Step 2</span>
              </div>
              <CardTitle className="text-xl">Customize Your AI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Train the AI with your business details, products, and FAQs to ensure responses match your brand voice and knowledge base.
              </p>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Step 3</span>
              </div>
              <CardTitle className="text-xl">Launch & Monitor</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Go live with your AI agent and monitor its performance through our intuitive dashboard, making adjustments as needed.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
