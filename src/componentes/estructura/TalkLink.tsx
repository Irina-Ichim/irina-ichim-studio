import Link from "next/link";
import { ArrowDownRightIcon } from "@phosphor-icons/react/ssr";
import { UI_LABELS } from "@/contenido/interfaceLabels";
import { CONTACT_HREF, isContactAvailable } from "@/contenido/navigation";
import { classNames } from "@/utilidades/classNames";

type TalkLinkProps = {
  compact?: boolean;
};

const PILL_CLASSES = "control-raised inline-flex min-h-11 items-center gap-2.5 rounded-pill px-5 text-eyebrow uppercase";

// In the top bar of the narrowest phones there is no room next to the logo and the menu
// button; the full-screen menu still leads to Contacto.
export function TalkLink({ compact = false }: TalkLinkProps) {
  const shape = classNames(PILL_CLASSES, compact && "narrow:hidden");
  const arrow = <ArrowDownRightIcon weight="duotone" aria-hidden className="size-5 text-link" />;

  if (!isContactAvailable) {
    return (
      <a role="link" aria-disabled="true" className={classNames(shape, "text-ink-muted opacity-disabled")}>
        {UI_LABELS.talk}
        <span className="sr-only">, {UI_LABELS.comingSoon}</span>
        {arrow}
      </a>
    );
  }

  return (
    <Link href={CONTACT_HREF} className={classNames(shape, "text-ink")}>
      {UI_LABELS.talk}
      {arrow}
    </Link>
  );
}
