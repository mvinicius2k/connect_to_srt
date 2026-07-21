import { ButtonProps } from "@/components/ui/button/shared";
import clsx from "clsx";
import { MouseEvent } from "react";

function Button(
  { variant, children, sticky, selected, loading, ...props }: ButtonProps = {
    variant: "primary",
  },
) {
  const classes = clsx(
    "not-disabled:cursor-pointer not-disabled:active:scale-90 duration-100 disabled:opacity-50 disabled:saturate-50 inline-flex items-center justify-center aria-busy:animate-pulse",

    {
      "h-10 px-4 min-w-28": !sticky,
      "size-8 p-1 rounded-full": sticky,
      "bg-indigo-700 text-neutral-100 aria-selected:saturate-200 aria-busy:saturate-50":
        variant === "primary",
      "dark:bg-neutral-100 dark:text-neutral-800 bg-neutral-900 text-neutral-100 aria-selected:bg-indigo-400 aria-busy:dark:bg-indigo-950 aria-busy:bg-indigo-400":
        variant === "secondary",
      "rounded-3xl dark:not-disabled:hover:bg-indigo-800/40 not-disabled:dark:hover:text-indigo-300 dark:text-indigo-400 not-disabled:hover:bg-indigo-200/40 not-disabled:hover:text-indigo-800 text-indigo-700 aria-selected:bg-indigo-600/50 aria-selected:dark:text-white aria-selected:text-black":
        variant === "transparent",

    },
    props.className,
  );
  function callOnClick(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) {
    if (loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    props.onClick?.(e);
  }
  return (
    <button
      {...props}
      aria-selected={selected}
      className={classes}
      onClick={callOnClick}
      aria-busy={loading}
    >
      {children}
    </button>
  );
}

export default Button;
