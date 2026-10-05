import type { ComponentProps } from "react";
import styles from "./IconButton.module.css";

type IconButtonProps = Omit<ComponentProps<"button">, "aria-label" | "disabled"> & {
  label: string;
};

export function IconButton({ label, className, type = "button", ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={[
        styles.iconButton,
        "inline-flex size-11 shrink-0 items-center justify-center rounded-pill border-2 border-accent-line bg-surface text-link shadow-raised-sm hover:border-ink active:border-ink active:text-ink active:shadow-inset-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
