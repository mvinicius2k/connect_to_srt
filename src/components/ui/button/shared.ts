import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "transparent";
  sticky?: boolean;
  shape?: "default" | "circular";
  children?: ReactNode;
  size?: "medium" | "small";
  selected?: boolean,
  loading?: boolean

}
