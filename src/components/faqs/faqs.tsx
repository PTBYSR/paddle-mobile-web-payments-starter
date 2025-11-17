import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Link from "next/link";

function AccordionItemFAQs(props: React.ComponentProps<typeof AccordionItem>) {
  return (
    <AccordionItem
      {...props}
      className={cn(
        "bg-secondary/30 data-[state=open]:bg-card data-[state=open]:border-border rounded-lg border border-transparent px-5 py-2 transition-colors data-[state=open]:shadow-sm lg:px-7",
        props.className,
      )}
    />
  );
}

function AccordionTriggerFAQs(props: React.ComponentProps<typeof AccordionTrigger>) {
  return (
    <AccordionTrigger
      {...props}
      className={cn("[&[data-state=open]>svg]:text-foreground text-base lg:text-lg", props.className)}
    />
  );
}

function AccordionContentFAQs(props: React.ComponentProps<typeof AccordionContent>) {
  return <AccordionContent {...props} className={cn("text-muted-foreground lg:text-base", props.className)} />;
}

export function FAQs() {
  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-6 py-14 md:grid-cols-2 md:gap-14 md:px-10 md:py-25">
      <div className="flex w-full flex-col gap-6">
        <Badge variant="secondary" className="mb-2 uppercase">
          FAQ
        </Badge>
        <h2 className="text-3xl leading-[1.1] font-medium tracking-tight sm:text-5xl">
          Frequently
          <br />
          Asked <span className="text-muted-foreground">Questions</span>
        </h2>
        <p className="max-w-lg text-xs leading-6 tracking-tight sm:text-base">
          Get answers to commonly asked questions.
        </p>
        <Button className="w-fit" size="lg" asChild>
          <Link href="/pricing">Get Started</Link>
        </Button>
      </div>
      <Accordion type="single" collapsible defaultValue="branding" className="grid w-full gap-4">
        <AccordionItemFAQs value="branding">
          <AccordionTriggerFAQs>What is Sakura?</AccordionTriggerFAQs>
          <AccordionContentFAQs>
            <p>
              Sakura is an app that can connect your business apps ( e.g Whatsapp ) and automatically answer customer DMs using AI.
            </p>
          </AccordionContentFAQs>
        </AccordionItemFAQs>
        <AccordionItemFAQs value="skills">
          <AccordionTriggerFAQs>Is Sakura a mobile app or web app?</AccordionTriggerFAQs>
          <AccordionContentFAQs>
            <p>
              Currently Sakura is a web app but can be used on mobile phones. Mobile app is in development and will be available soon.
            </p>
          </AccordionContentFAQs>
        </AccordionItemFAQs>
        <AccordionItemFAQs value="devices">
          <AccordionTriggerFAQs>What is AI?</AccordionTriggerFAQs>
          <AccordionContentFAQs>
            <p>In simple terms, AI is technology that helps apps do smart things automatically, like answering customer questions without a human.</p>
          </AccordionContentFAQs>
        </AccordionItemFAQs>
        <AccordionItemFAQs value="notifcations">
          <AccordionTriggerFAQs>What is the difference between ChatGPT and Sakura</AccordionTriggerFAQs>
          <AccordionContentFAQs>
            <p>ChatGPT is an app that can only answer questions you ask it. But Sakura can connect with your other apps like Whatsapp, Instagram, Shopify etc. and automatically answer customer DMs using AI.</p>
          </AccordionContentFAQs>
        </AccordionItemFAQs>
      </Accordion>
    </div>
  );
}
