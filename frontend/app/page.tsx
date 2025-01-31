import Link from "next/link";
import Image from "next/image"; // Import Image component

import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      {/* Image Section */}
      <div className="flex justify-center mb-6">
        <Image
          src="https://images.pexels.com/photos/7054408/pexels-photo-7054408.jpeg"
          alt="A person working on a laptop"
          width={700}
          height={400}
          className="object-cover rounded-lg"
        />
      </div>

      {/* Text Section with 10px space above and centered */}
      <div className="flex flex-col items-center text-center gap-2 mt-0">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Transform your spending habits:<br className="hidden sm:inline" />
          Every expense tells a story!
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Start tracking your expenses today
        </p>
      </div>
      
      {/* Centered Button */}
      <div className="flex justify-center mt-4">
        <Link
          href={siteConfig.links.home}
          rel="noreferrer"
          className={buttonVariants()}
        >
          Click to Start
        </Link>
      </div>
    </section>
  );
}