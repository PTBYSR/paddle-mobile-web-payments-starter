import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

export function CTABanner() {
  return (
    <section className="relative w-full overflow-hidden py-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="/banner-img.png"
          alt="Background"
          fill
          className="object-cover"
        //   style={{ opacity: 0.1 }}
          priority
        />
      </div>
      
      {/* Overlay */}
      {/* <div className="absolute inset-0 z-0 bg-gradient-to-br from-background/90 via-background/80 to-background/90" /> */}
      
      {/* Content */}
      <div className="container relative z-10 px-4 mx-auto text-center">
        <h2 className="mb-6 text-3xl text-white tracking-tight sm:text-4xl md:text-5xl">
          Use Sakura to stop wasting time <br /> on replying customer DMs
        </h2>
        {/* <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          Join thousands of businesses already using Sakura to streamline their customer communications and boost engagement.
        </p> */}
        <Button size="lg" asChild>
          <Link href="/waitlist" className="text-base">
            Get Started for Free
          </Link>
        </Button>
      </div>
    </section>
  );
}
