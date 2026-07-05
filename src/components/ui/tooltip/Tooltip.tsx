import { Tooltip as ReactTooltip } from "react-tooltip";
import { TooltipProps } from "@/components/ui/tooltip/shared";

/**
 * Abstração simplificada e estilizada do react-tooltip
 * @see https://react-tooltip.com/docs/getting-started#usage
 */
function Tooltip({ text, identifier, ...props }: TooltipProps) {
  return (
    <ReactTooltip
      clickable
      className="dark:!bg-neutral-300 dark:!text-neutral-900 !bg-neutral-700 !text-neutral-100 !rounded-md"
      id={identifier}
      {...props}
    >
      {text}
    </ReactTooltip>
  );
}

export default Tooltip;
