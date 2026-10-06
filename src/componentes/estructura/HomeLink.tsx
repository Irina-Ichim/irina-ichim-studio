import Link from "next/link";
import type { ReactNode } from "react";
import { SITE } from "@/contenido/site";

type HomeLinkProps = {
  children: ReactNode;
  onClick?: () => void;
};

export function HomeLink({ children, onClick }: HomeLinkProps) {
  return (
    <Link href="/" aria-label={SITE.homeLinkLabel} onClick={onClick} className="inline-block rounded-md">
      {children}
    </Link>
  );
}
