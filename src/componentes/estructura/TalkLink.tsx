import Link from "next/link";
import { ArrowDownRightIcon } from "@phosphor-icons/react/ssr";
import { UI_LABELS } from "@/contenido/interfaceLabels";
import { CONTACT_HREF, isContactAvailable } from "@/contenido/navigation";
import { classNames } from "@/utilidades/classNames";

type TalkLinkProps = {
  compact?: boolean;
};

const PILL_CLASSES =
  "inline-flex min-h-11 items-center gap-2.5 rounded-pill border-2 border-accent-line bg-surface px-5 text-eyebrow uppercase shadow-raised-sm";

export function TalkLink({ compact = false }: TalkLinkProps) {
  const label = <span className={classNames(compact && "narrow:sr-only")}>{UI_LABELS.talk}</span>;
  const arrow = <ArrowDownRightIcon weight="duotone" aria-hidden className="size-5 text-link" />;
  const shape = classNames(PILL_CLASSES, compact && "narrow:size-11 narrow:justify-center narrow:px-0");

  if (!isContactAvailable) {
    return (
      <a role="link" aria-disabled="true" className={classNames(shape, "text-ink-muted opacity-disabled")}>
        {label}
        <span className="sr-only">, {UI_LABELS.comingSoon}</span>
        {arrow}
      </a>
    );
  }

  return (
    <Link href={CONTACT_HREF} className={classNames(shape, "text-ink hover:border-ink")}>
      {label}
      {arrow}
    </Link>
  );
}
