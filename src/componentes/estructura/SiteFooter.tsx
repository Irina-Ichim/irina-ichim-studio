import { ArrowUpIcon } from "@phosphor-icons/react/ssr";
import { FOOTER, LEGAL_LINKS } from "@/contenido/footer";
import { CONTACT_LINK, NAVIGATION, type NavigationLink } from "@/contenido/navigation";
import { SITE } from "@/contenido/site";
import { classNames } from "@/utilidades/classNames";
import { HomeLink } from "./HomeLink";
import { Logo } from "./Logo";
import { PageLink } from "./PageLink";
import { TalkLink } from "./TalkLink";
import styles from "./SiteFooter.module.css";

const SECTION_LINKS = NAVIGATION.filter((item) => !item.children && item !== CONTACT_LINK);
const SERVICE_LINKS = NAVIGATION.find((item) => item.children)?.children ?? [];

export function SiteFooter() {
  const { before, highlight, after } = FOOTER.headline;

  return (
    <footer className={styles.footer}>
      <section className={styles.cta} aria-labelledby="pie-llamada">
        <div className={styles.ctaText}>
          <p className="text-eyebrow text-link uppercase">{FOOTER.eyebrow}</p>
          <h2 id="pie-llamada" className="font-display text-display-l">
            {before}
            <em>{highlight}</em>
            {after}
          </h2>
        </div>
        <TalkLink />
      </section>

      {/* Decorative: the link to the home page is the seal below. */}
      <div className={styles.wordmark}>
        <Logo variant="wordmark" className="w-full" />
      </div>

      <div className={styles.columns}>
        <div className={styles.brand}>
          <HomeLink>
            <Logo variant="seal" className="w-14" />
          </HomeLink>
          <p className={styles.tagline}>{SITE.tagline}</p>
        </div>
        <FooterColumn title={FOOTER.sectionsTitle} links={SECTION_LINKS} />
        <FooterColumn title={FOOTER.servicesTitle} links={SERVICE_LINKS} />
        <FooterColumn title={FOOTER.contactTitle} links={[CONTACT_LINK]} />
      </div>

      <div className={styles.legal}>
        <p>
          © {new Date().getFullYear()} {SITE.name}
        </p>
        <nav aria-label={FOOTER.legalTitle}>
          <ul>
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <PageLink link={link} className={styles.legalLink} availableClassName={styles.available} unavailableClassName={styles.unavailable}>
                  {link.label}
                </PageLink>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href="#top"
          aria-label={FOOTER.backToTop}
          className={classNames("control-raised inline-flex size-11 items-center justify-center rounded-pill text-link", styles.top)}
        >
          <ArrowUpIcon weight="duotone" aria-hidden className="size-5" />
        </a>
      </div>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  links: readonly NavigationLink[];
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <nav aria-label={title}>
      <h2 className={styles.columnTitle}>{title}</h2>
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.href}>
            <PageLink link={link} className={styles.link} availableClassName={styles.available} unavailableClassName={styles.unavailable}>
              {link.label}
            </PageLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
