import { SiteFooter } from "@/componentes/estructura/SiteFooter";
import { SiteHeader } from "@/componentes/estructura/SiteHeader";
import { classNames } from "@/utilidades/classNames";
import styles from "./layout.module.css";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <div className={classNames("rail:pl-rail rail:rail-collapsed:pl-rail-collapsed", styles.shell)}>
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
