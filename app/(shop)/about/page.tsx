"use client"

import Container from "@/components/ui/Container";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  return (
    <Container>
      <motion.div
        className="relative flex-col flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 1 }}
        key="hero"
      >
        <div className="flex-col  flex gap-10 items-center md:h-[100vh] justify-between  px-4 pt-20 pb-4">
          <Image
            src="/fragonard-perfume-museum-Getty-Laurent-Giraudou-5a9595a51f4e1300373be04b.jpg"
            alt="perfumes"
            width={600}
            height={600}

          />
          <h1 className="md:text-lg tracking-widest uppercase text-center">
            Miau Miau, Sesame Street 9, NY
          </h1>
          <div className="border rounded-full p-1">
            <ChevronDown size={20} strokeWidth="1" className="mt-0.5" />
          </div>
        </div>
        <div className="max-w-[650px] flex flex-col gap-4 items-center mx-auto py-16 px-4 text-sm">
          <p>
            Located on Sesame Street in the heart of New York City, Miau Miau
            embarked on a creative journey by teaming up with a renowned perfume
            artist to design their boutique. Their goal was to challenge the
            traditional idea of a perfume store. Unlike the usual luxury
            fragrance retail model, Miau Miau went for an innovative and
            ever-evolving approach. This approach aimed to reflect the brand&apos;s
            growth and willingness to embrace change as a fundamental element of
            the store&apos;s identity. This venture began in September 2021, marking
            the start of a fragrance sanctuary that was part of a larger
            project.
          </p>
          <p>
            Similar to a living organism that grows and changes over time, the
            design of the fragrance boutique is an ongoing process. While
            keeping the original layout, they&apos;ve added new elements to the
            space, emphasizing the concept of impermanence. This unique approach
            creates an intriguing connection between the fragrances of the past
            and those of the present. As the perfume artist and Miau Miau
            collaborate intuitively, the store represents a continuous
            evolution, embodying the values and ideas developed over the years.
            This partnership showcases the power of creative synergy, resulting
            in a distinctive olfactory experience.
          </p>
          <p>
            The final version on Sesame Street in New York is a testament to
            Miau Miau&apos;s commitment to embracing change and growing with the
            brand. This aromatic oasis, born from the harmonious collaboration
            between the perfume artist and Miau Miau, serves as a symbol of
            innovation and a dynamic approach to luxury fragrance retail. With
            each stage of development, the boutique becomes a reflection of the
            brand&apos;s growth and transformation, constantly adapting to the
            ever-changing world of perfumery. It offers an immersive olfactory
            journey where the past and present come together, providing a unique
            and fleeting fragrance experience in the heart of the city.
          </p>
        </div>
      </motion.div>
    </Container>
  );
};
export default page;
