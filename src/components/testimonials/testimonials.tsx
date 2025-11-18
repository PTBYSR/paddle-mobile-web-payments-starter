import { Badge } from "@/components/ui/badge";
import { TestimonialMarquee } from "@/components/testimonials/testimonial-marquee";

export type Testimonial = {
  name: string;
  date: string;
  title: string;
  content: string;
  avatar?: string;
  rating: number;
};

const testimonials = [
  {
    name: "Anonymous | Manager at Kitchen Pastries",
    date: "Nov 18th",
    title: "efficient and reliable",
    content: `"Sakura is very efficient and reliable, it makes services feel smoother, faster, and way less stressful for both the business and the customers."`,
    rating: 5,
  },
  {
    name: "Anonymous | CEO of a Sneaker Retailer",
    date: "Oct 9",
    title: "A must-have",
    content: `"From everything I’ve seen and heard, Sakura looks like a must-have. It honestly seems like one of the best options out there."`,
    rating: 5,
  },
  {
    name: "Anonymous | CS agent for a Wig Store",
    date: "Oct 20",
    title: "Increased my productivity",
    content: `"Sakura increases productivity because sakura handles the redundant tasks and allows me to focus on what matters."`,
    rating: 5,
  },
  {
    name: "Anonymous | CS agent for a FX agency",
    date: "Oct 19",
    title: "It helps me avoid drama",
    content: `"Sakura handles those impatient customers while i focus on loyal customers that deserve my time"`,
    rating: 5,
  },
] satisfies Testimonial[];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative flex w-full flex-col items-center gap-6 overflow-hidden py-12 md:py-24">
      <div className="absolute -right-1/2 -top-1/4 -z-10 h-full w-full">
        <div className="absolute left-1/2 aspect-square w-3/4 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>
      <Badge variant="secondary" className="mb-2 uppercase">
        Testimonial
      </Badge>
      <h2 className="text-center text-3xl leading-[1.1] font-medium tracking-tight sm:text-5xl">
        Don&apos;t Take<div className="text-muted-foreground">Our Word for It</div>
      </h2>
      <p className="mb-3 max-w-lg text-center leading-6 tracking-tight sm:text-xl lg:mb-8">
        Sakura is the solution for solo entreprenuers and small businesses to solve customer support. Check out what our customers have to say.
      </p>
      <div className="relative w-[calc(100%+3rem)] overflow-x-hidden py-4 lg:w-full">
        <TestimonialMarquee testimonials={testimonials} className="mb-4" />
        <TestimonialMarquee testimonials={testimonials} reverse />
      </div>
    </section>
  );
}
