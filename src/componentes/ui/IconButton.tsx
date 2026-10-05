import type { ComponentProps } from "react";

type IconButtonProps = Omit<ComponentProps<"button">, "aria-label"> & {
  label: string;
};

export function IconButton({ label, className, type = "button", ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={[
        "inline-flex size-11 shrink-0 items-center justify-center rounded-pill border-2 border-accent-line bg-surface text-link shadow-raised-sm hover:border-link active:shadow-inset-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
