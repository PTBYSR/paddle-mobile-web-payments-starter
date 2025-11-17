import { FeaturesCarousel } from "@/components/features/features-carousel";
import { FeaturesTabs } from "@/components/features/features-tabs";
import { Badge } from "@/components/ui/badge";
import { ActivityIcon, ChartNoAxesColumnIcon, SlidersIcon, ZapIcon } from "lucide-react";

export type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
};

const features = [
  {
    icon: <SlidersIcon size={20} />,
    title: "Connect all your apps",
    description: "Connect with all your apps like Whatsapp or Instagram so that Sakura can see your customer DMs and help you reply to them automatically.",
    image: "/app-image-1.png",
  },
  {
    icon: <ZapIcon size={20} />,
    title: "Connect with your Business tools",
    description: "Connect with your business tools like Shopify, Excel, Paystack so that Sakura can know your business details",
    image: "/app-image-1.png",
  },
  {
    icon: <ActivityIcon size={20} />,
    title: "Train your AI",
    description: "Train the AI on the app, very easily, to respond based on your business details",
    image: "/app-image-1.png",
  },
  {
    icon: <ChartNoAxesColumnIcon size={20} />,
    title: "Monitor the performance of your AI",
    description: "Monitor activity and performance of your AI",
    image: "/app-image-1.png",
  },
] satisfies Feature[];

export function Features() {
  return (
    <div id="features" className="flex w-full flex-col items-center gap-6 px-6 py-14 md:px-10 md:py-25">
      <Badge variant="secondary" className="uppercase">
        Features
      </Badge>
      <h2 className="text-center text-3xl leading-[1.1] font-medium tracking-tight sm:text-5xl">
        Discover our<div className="text-muted-foreground">app features</div>
      </h2>
      <p className="mb-3 max-w-lg text-center leading-6 tracking-tight sm:text-xl lg:mb-8">
        Discover the features of our app that allows you to completely handle your customers automatically with ease.
      </p>
      <FeaturesCarousel features={features} className="block lg:hidden" />
      <FeaturesTabs features={features} className="hidden lg:block" />
    </div>
  );
}
