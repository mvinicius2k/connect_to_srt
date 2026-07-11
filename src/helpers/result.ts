export type ResultSuccess<T = void> = {
  sucess: true;
  failed: false;
  data: T;
};

export type ResultError<T = void> = {
  sucess: false;
  failed: true;
  error: T;
};

export type ResultAction<TSuccess = void, TError = void> =
  | ResultSuccess<TSuccess>
  | ResultError<TError>;

export const Result = {
  /**
   * Cria um resultado de sucesso.
   * @param data Os dados do resultado. Caso não tenha nenhum, passe `undefined`.
   */
  success<T = void>(data: T): ResultSuccess<T> {
    return {
      data: data,
      sucess: true,
      failed: false,
    };
  },
  /**
   * Cria um resultado de falha.
   * @param data Os dados do resultado. Caso não tenha nenhum, passe `undefined`.
   */
  fail<T = void>(error: T): ResultError<T> {
    return {
      error: error,
      sucess: false,
      failed: true,
    };
  },
  /**
   * Faz uma ação de acordo com o resultado.
   * @param result O objeto resultado
   * @param handling O que acontecerá em caso de sucesso ou falha
   */
  resolve<TResolved = void, TSuccess = void, TError = void>(
    result: ResultAction<TSuccess, TError>,
    handling: {
      onSuccess: (data: TSuccess) => TResolved;
      onFail: (error: TError) => TResolved;
    },
  ) {
    if (result.sucess) return handling.onSuccess(result.data);
    else return handling.onFail(result.error);
  },
  /**
   * Versão assíncrona do {@link resolve}
   * @see resolve
   */
  async resolveAsync<TResolved = void, TSuccess = void, TError = void>(
    result: Promise<ResultAction<TSuccess, TError>>,
    handling: {
      onSuccess: (data: TSuccess) => TResolved;
      onFail: (error: TError) => TResolved;
    },
  ) {
    const resolvedPromise = await Promise.resolve(result);
    return this.resolve(resolvedPromise, {
      onSuccess: handling.onSuccess,
      onFail: handling.onFail,
    });
  },
  /**
   * Cria um Result sem dados com base no resultado {@link result}
   */
  empty(result: ResultAction<unknown, unknown>): ResultAction {
    return result.sucess ? Result.success(undefined) : Result.fail(undefined);
  },
  /**
   * Transforma os dados de um resultado para outro tipo.
   * @param result Objeto resultado
   * @param transformers Funções para transformar os dados em outros
   */
  transform<TSucessInput, TSucessOutput, TErrorInput, TErrorOutput>(
    result: ResultAction<TSucessInput, TErrorInput>,
    transformers: {
      onSucess: (sucess: TSucessInput) => TSucessOutput;
      onError: (error: TErrorInput) => TErrorOutput;
    },
  ): ResultAction<TSucessOutput, TErrorOutput> {
    if (result.sucess)
      return Result.success(transformers.onSucess(result.data));
    return Result.fail(transformers.onError(result.error));
  },
};
