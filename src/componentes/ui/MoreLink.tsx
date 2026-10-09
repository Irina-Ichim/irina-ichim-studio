import { PageLink } from "@/componentes/estructura/PageLink";
import { pageByHref } from "@/contenido/navigation";
import { classNames } from "@/utilidades/classNames";
import styles from "./MoreLink.module.css";

type MoreLinkProps = {
  href: string;
  label: string;
  className?: string;
};

/* The «… →» link that closes a block and leads to its page. A page that does not exist yet
   keeps the link colour but is not linked (PageLink announces it as coming soon). */
export function MoreLink({ href, label, className }: MoreLinkProps) {
  return (
    <PageLink link={pageByHref(href, label)} className={classNames(styles.link, className)} availableClassName={styles.available} unavailableClassName={styles.unavailable}>
      {label} <span aria-hidden>→</span>
    </PageLink>
  );
}
