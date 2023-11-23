"use client";

import { usePathname } from "next/navigation";
import Container from "./ui/container";
import Link from "next/link";
import { cn } from "@/lib/utils";

const AboutLink = () => {
  const pathName = usePathname();

  return (
    <Container>
      <Link href="/#about-us" className="self">
        <p
          className={cn(
            "text-md font-medium transition-colors text-fontColorWhite hover:text-white",
            pathName === "/about" ? "text-white" : "text-neutral-400"
          )}
        >
          Sobre Nosotros
        </p>
      </Link>
    </Container>
  );
};

export default AboutLink;
