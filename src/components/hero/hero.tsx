import { Nav } from "@/components/hero/nav";
import { BackgroundBlur } from "@/components/ui/background-blur";
import { Button } from "@/components/ui/button";
import { Pill, PillAvatar, PillAvatarGroup } from "@/components/ui/pill";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative z-1 grid w-full place-items-center p-8 overflow-hidden">
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: 'url("/hero-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1,
          filter: 'blur(1px)'
        }}
      />
      <BackgroundBlur className="-top-40 md:-top-0" />
      <div className="relative z-10 w-full">
        <Nav />
      <div className="mt-16 flex flex-col items-center gap-6">
        <div>
          <a
  href="https://www.producthunt.com/products/sakura-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-sakura-2"
  target="_blank"
  rel="noopener noreferrer"
>
  <img
    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1039821&theme=neutral&t=1763522088833"
    alt="Sakura - AI customer support for solo business owners | Product Hunt"
    width={250}
    height={54}
    style={{ width: 250, height: 54 }}
  />
</a>

        </div>
        <Pill>
          <PillAvatarGroup className="hidden sm:flex">
            <PillAvatar src="/avatars/1.jpg" />
            <PillAvatar src="/avatars/2.jpg" />
            <PillAvatar src="/avatars/3.jpg" />
            <PillAvatar src="/avatars/4.jpg" />
          </PillAvatarGroup>
          <p className="text-muted-foreground px-2 text-xs font-medium sm:border-l-1 sm:text-sm">
            Join <span className="text-foreground">businesses</span> already on board
          </p>
        </Pill>
        <h1 className="text-center text-4xl leading-[1.1] font-medium tracking-tight sm:text-7xl">
          Let AI handle your<span className="text-muted-foreground block">Customer support for you.</span>
        </h1>
        <p className="max-w-lg text-center leading-6 tracking-tight sm:text-xl">
          Sakura connects to your business apps—like WhatsApp and Instagram—and automatically replies to customer messages based on your own business rules and business guidelines.
        </p>
        <Button className="mb-10 w-fit" size="lg" asChild>
          <Link href="/waitlist">Get Started</Link>
        </Button>
        <Image src="/app-image-1.png" alt="Hero" width={304} height={445} className="relative z-10" />
      </div>
      </div>
    </div>
  );
}
