import { ButtonProps } from "@/components/ui/button/shared";
import clsx from "clsx";

function Button(
  { variant, children, sticky, ...props }: ButtonProps = {
    variant: "primary",
    size: "medium",
  },
) {
  const classes = clsx(
    "cursor-pointer active:scale-90 duration-100 disabled:hover:bg-current disabled:active:scale-100 disabled:opacity-50 disabled:saturate-50",
    {
      "h-10 px-4 min-w-28": !sticky,
      "size-8 p-1": sticky,
      "bg-indigo-700 text-neutral-100": variant === "primary",
      "dark:bg-neutral-100 dark:text-neutral-800 bg-neutral-900 text-neutral-100":
        variant === "secondary",
      " rounded-3xl dark:hover:bg-indigo-800/40 dark:hover:text-indigo-300 dark:text-indigo-400 hover:bg-indigo-200/40 hover:text-indigo-800 text-indigo-700":
        variant === "transparent",
    },
  );
  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
}

export default Button;
