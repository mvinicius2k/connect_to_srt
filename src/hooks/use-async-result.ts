import { ResultAction } from "@/helpers/result";
import { useState } from "react";

export type PromiseState = "not-called" | "busy" | "done" | "fail";

export function useAsyncResult<
  TArgs extends unknown[],
  TSuccess,
  TError
>(
  operation: (...args: TArgs) => Promise<ResultAction<TSuccess, TError>>
) {
  const [state, setState] = useState<PromiseState>("not-called");

  async function execute(...args: TArgs): Promise<ResultAction<TSuccess, TError>> {
    setState("busy");

    const result = await operation(...args);

    setState(result.sucess ? "done" : "fail");

    return result;
  }

  return {
    execute,
    state,
  };
}
