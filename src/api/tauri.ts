import { ResultAction } from "@/helpers/result";
import { invoke, InvokeArgs, InvokeOptions } from "@tauri-apps/api/core";

/**
 * Representa um comando **invoke** do tauri, com um corpo de dados.
 */
export type TauriCommand<TData = any, TSucess = void, TError = void, > = {

  mock: (
    data: TData,
    args?: InvokeArgs,
    options?: InvokeOptions,
  ) => Promise<ResultAction<TSucess, TError>>;
};

/**
 * Tipo para fazer a inferência de quando command tem ou não tem argumentos.
 */
type InvokeParams<T extends TauriCommand<any, any, any>> = Parameters<
  T["mock"]
>[1] extends void
  ? [args?: InvokeArgs, options?: InvokeOptions]
  : [
      data: Parameters<T["mock"]>[1],
      args?: InvokeArgs,
      options?: InvokeOptions,
    ];

/**
 * Cria um wrapper fortemente tipado para comandos do Tauri.
 *
 * Cada comando é definido por uma implementação `mock`, cuja assinatura é
 * utilizada para inferir automaticamente os parâmetros aceitos por
 * {@link invoke}. Durante o desenvolvimento em mock (`import.meta.env.VITE_MOCK`), a
 * implementação `mock` é executada. Em produção, o comando real do Tauri é
 * invocado.
 *
 * A assinatura de {@link invoke} adapta-se automaticamente a cada comando:
 *
 * - Comandos cujo tipo de `data` é `void` não exigem o parâmetro `data`.
 * - Comandos com um tipo diferente de `void` exigem `data` em tempo de compilação.
 *
 * @example
 * ```ts
 * const api = defineCommands({
 *   scan: {
 *     mock: async () => Result.success(...),
 *   },
 *   view: {
 *     mock: async (data: { runner: string }) => Result.success(...),
 *   },
 * });
 *
 * api.invoke("scan");
 * api.invoke("view", { runner: "vlc" });
 * ```
 *
 * @param definition Objeto contendo as definições dos comandos, indexadas pelo nome.
 * @returns Um objeto que expõe a função `invoke` com tipagem inferida para cada comando.
 */
export function defineCommands<
  T extends Record<string, TauriCommand<any, any, any>>,
>(definition: T) {
  return {
    /**
     * Invoca um comando.
     *
     * Em ambiente de desenvolvimento, executa a implementação `mock`
     * correspondente ao comando. Em produção, invoca o comando real do Tauri.
     *
     * Os parâmetros aceitos são inferidos automaticamente de acordo com a
     * assinatura do comando:
     *
     * - Comandos sem `data` recebem apenas `args` e `options`.
     * - Comandos com `data` exigem esse parâmetro antes dos demais.
     *
     * @param name Nome do comando a ser executado.
     * @param params Parâmetros inferidos automaticamente a partir da definição do comando.
     * @returns O resultado retornado pela implementação do comando.
     */
    invoke<K extends keyof T>(
      name: K,
      ...params: InvokeParams<T[K]>
    ): ReturnType<T[K]["mock"]> {
      if (import.meta.env.VITE_MOCK == 'true') {
        return definition[name].mock(
          params[0],
          getInvokeArgs(),
          params[2],
        ) as ReturnType<T[K]["mock"]>;
      }

      return invoke(name as string, getInvokeArgs(), params[2]) as ReturnType<
        T[K]["mock"]
      >;

      function getInvokeArgs(): InvokeArgs | undefined {
        if (params.length <= 2) return params[0] as InvokeArgs | undefined;
        return params[1] as InvokeArgs | undefined;
      }
    },
  };
}

export type ErrorIdentifier<TDetails = never> =
  [TDetails] extends [never]
    ? { code: string }
    : { code: string; details: TDetails };
