import type { ComponentProps } from "react";
import { classNames } from "@/utilidades/classNames";

type IconButtonProps = Omit<ComponentProps<"button">, "aria-label" | "disabled"> & {
  label: string;
  variant?: "raised" | "quiet";
};

export function IconButton({ label, variant = "raised", className, type = "button", ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={classNames(
        "inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-pill",
        variant === "raised" ? "control-raised text-link" : "control-quiet",
        className,
      )}
      {...props}
    />
  );
}
