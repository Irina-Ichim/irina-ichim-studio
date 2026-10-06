import { ArrowDownRightIcon } from "@phosphor-icons/react/ssr";
import { UI_LABELS } from "@/contenido/interfaceLabels";
import { CONTACT_LINK } from "@/contenido/navigation";
import { classNames } from "@/utilidades/classNames";
import { PageLink } from "./PageLink";

type TalkLinkProps = {
  compact?: boolean;
};

// In the top bar of the narrowest phones there is no room next to the logo and the menu
// button; the full-screen menu still leads to Contacto.
export function TalkLink({ compact = false }: TalkLinkProps) {
  return (
    <PageLink
      link={CONTACT_LINK}
      className={classNames(
        "control-raised inline-flex min-h-11 items-center gap-2.5 rounded-pill px-5 text-eyebrow uppercase",
        compact && "narrow:hidden",
      )}
      availableClassName="text-ink"
      unavailableClassName="text-ink-muted opacity-disabled"
    >
      {UI_LABELS.talk}
      <ArrowDownRightIcon weight="duotone" aria-hidden className="size-5 text-link" />
    </PageLink>
  );
}
