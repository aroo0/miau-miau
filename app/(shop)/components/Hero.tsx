"use client";
import React, { useRef, useEffect } from "react";
import { useIntersection } from "@mantine/hooks";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.5,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      console.log("arto");
    }
  }, [entry]);

  return (
      <motion.div
        className="relative flex-col flex items-center justify-center"
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ ease: "easeInOut", duration: 1 }}
        
        
        key="hero"
      >
        <Image
          src="/Heretic-Sekhmet-try-2.jpg"
          width={1600}
          height={1106}
          alt="perfume poster"
          className="w-full h-[100vh] object-cover border-t-[70px] border-hero"
          priority={true}

        />
        <Link
          href={entry?.isIntersecting ? "about" : "perfumes/all"}
          className="z-[10] fixed top-[50%]"
        >
          <Button variant="hero" size="lg">
            {" "}
            {entry?.isIntersecting
              ? "Miau Miau, Sesame Street 9, NY"
              : "Discover Our Newest Fragrances"}
          </Button>
        </Link>
        <Image
          src="/ingredients_prague.webp"
          width={1600}
          height={1106}
          alt="perfume poster"
          className="w-full h-[100vh] object-cover"
          ref={ref}
          priority={true}

        />
      </motion.div>
  );
};

export default Hero;
