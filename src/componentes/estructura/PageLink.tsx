import Link from "next/link";
import type { ReactNode, Ref } from "react";
import { UI_LABELS } from "@/contenido/interfaceLabels";
import type { NavigationLink } from "@/contenido/navigation";
import { classNames } from "@/utilidades/classNames";

type PageLinkProps = {
  link: NavigationLink;
  children: ReactNode;
  className?: string;
  availableClassName?: string;
  unavailableClassName?: string;
  isCurrent?: boolean;
  onNavigate?: () => void;
  ref?: Ref<HTMLAnchorElement>;
};

// A page that does not exist yet is shown but not linked, so no link ever leads to a 404;
// screen readers hear it as an unavailable link that is coming soon.
export function PageLink({
  link,
  children,
  className,
  availableClassName,
  unavailableClassName,
  isCurrent = false,
  onNavigate,
  ref,
}: PageLinkProps) {
  if (!link.available) {
    return (
      <a ref={ref} role="link" aria-disabled="true" className={classNames(className, unavailableClassName)}>
        {children}
        <span className="sr-only">, {UI_LABELS.comingSoon}</span>
      </a>
    );
  }

  return (
    <Link
      ref={ref}
      href={link.href}
      aria-current={isCurrent ? "page" : undefined}
      onClick={onNavigate}
      className={classNames(className, availableClassName)}
    >
      {children}
    </Link>
  );
}
