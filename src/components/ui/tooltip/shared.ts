import { ITooltip } from "react-tooltip";

export interface TooltipProps extends ITooltip {
  /**
   * Texto a exibir quando se motrar
   */
  text?: string;
  /**
   * Identificador data-tooltip-id.
   *
   * @see https://react-tooltip.com/docs/examples/basic-examples
   */
  identifier: string;
}
