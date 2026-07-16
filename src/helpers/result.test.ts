import { describe, expect, it, vi } from "vitest";
import { Result } from "./result";

describe("Result.fromPromise", () => {
  it("deve retornar Success quando a promise resolve", async () => {
    const action = vi.fn().mockResolvedValue(123);

    const result = await Result.fromPromise(
      action,
      () => "erro",
      () => "fallback"
    );

    expect(action).toHaveBeenCalledOnce();
    expect(result).toEqual(Result.success(123));
  });

  it("deve usar o catchMap simples quando a promise rejeita", async () => {
    const error = new Error("boom");

    const result = await Result.fromPromise(
      () => Promise.reject(error),
      err => (err as Error).message,
      () => "fallback"
    );

    expect(result).toEqual(Result.fail("boom"));
  });

  it("deve usar o primeiro CatchMapper que tratar o erro", async () => {
    const mapper1 = vi.fn(() => "mapper1");
    const mapper2 = vi.fn(() => "mapper2");

    const result = await Result.fromPromise(
      () => Promise.reject("erro"),
      [mapper1, mapper2],
      () => "fallback"
    );

    expect(mapper1).toHaveBeenCalledOnce();
    expect(mapper2).not.toHaveBeenCalled();

    expect(result).toEqual(Result.fail("mapper1"));
  });

  it("deve continuar para o próximo CatchMapper quando receber pass()", async () => {
    const mapper1 = vi.fn((_, pass) => pass());
    const mapper2 = vi.fn(() => "mapper2");

    const result = await Result.fromPromise(
      () => Promise.reject("erro"),
      [mapper1, mapper2],
      () => "fallback"
    );

    expect(mapper1).toHaveBeenCalledOnce();
    expect(mapper2).toHaveBeenCalledOnce();

    expect(result).toEqual(Result.fail("mapper2"));
  });

  it("deve usar o fallback quando nenhum CatchMapper tratar o erro", async () => {
    const mapper1 = vi.fn((_, pass) => pass());
    const mapper2 = vi.fn((_, pass) => pass());

    const fallback = vi.fn(() => "fallback");

    const result = await Result.fromPromise(
      () => Promise.reject("erro"),
      [mapper1, mapper2],
      fallback
    );

    expect(mapper1).toHaveBeenCalledOnce();
    expect(mapper2).toHaveBeenCalledOnce();
    expect(fallback).toHaveBeenCalledOnce();

    expect(result).toEqual(Result.fail("fallback"));
  });

  it("deve preservar o valor rejeitado mesmo que não seja Error", async () => {
    const result = await Result.fromPromise(
      () => Promise.reject(404),
      err => `erro ${err}`,
      () => "fallback"
    );

    expect(result).toEqual(Result.fail("erro 404"));
  });

  it("deve capturar exceções lançadas antes da Promise ser criada", async () => {
    const result = await Result.fromPromise(
      () => {
        throw new Error("sync");
      },
      err => (err as Error).message,
      () => "fallback"
    );

    expect(result).toEqual(Result.fail("sync"));
  });
});
