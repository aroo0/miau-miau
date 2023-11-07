"use client";
import React, { useRef, useEffect } from "react";
import { useIntersection } from "@mantine/hooks";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {}

const Hero: React.FC<HeroProps> = ({}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: .5,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      console.log("arto");
    }
  }, [entry]);

  return (
    <div
      className="relative flex-col flex items-center justify-center"
    >
      <Image
        src="/Heretic-Sekhmet-try-2.jpg"
        width={1600}
        height={1106}
        alt="perfume poster"
        className="w-full h-[100vh] object-cover"
      />
      <Link href={entry?.isIntersecting
          ? "about" : 'perfumes/all'
          } className="z-[10] fixed top-[50%]">
      <Button variant="hero" size="lg" >
        {" "}
        {entry?.isIntersecting
          ? "Miau Miau, Sesame Street 9, NY" : "Discover Our Newest Fragrances"
          }
      </Button>
      </Link>
      <Image
        src="/ingredients_prague.webp"
        width={1600}
        height={1106}
        alt="perfume poster"
        className="w-full h-[100vh] object-cover"
        ref={ref}
      />
    </div>
  );
};

export default Hero;
