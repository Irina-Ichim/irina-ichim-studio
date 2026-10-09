import type { ComponentProps } from "react";
import { classNames } from "@/utilidades/classNames";

type IconButtonProps = Omit<ComponentProps<"button">, "aria-label" | "disabled"> & {
  label: string;
  variant?: "raised" | "outline" | "quiet";
};

const VARIANT_CLASSES = {
  raised: "control-raised text-link",
  outline: "control-outline",
  quiet: "control-quiet",
} as const;

export function IconButton({ label, variant = "raised", className, type = "button", ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={classNames(
        "inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-pill",
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    />
  );
}
