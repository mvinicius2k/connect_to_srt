import { SRTPoint } from "@/components/srt-points-viewer/shared";
import { Result, ResultAction } from "@/helpers/result";
import { sleep } from "@/helpers/utils";

import { invoke } from "@tauri-apps/api/core";
import { times } from "remeda";


export type ErrorIdentifier<TDetails = never> =
  [TDetails] extends [never]
    ? { code: string }
    : { code: string; details: TDetails };
export type ScanSucessResponseDto = { points: SRTPoint[] };
export type ScanFailResponseDto = ErrorIdentifier;

export type PlayRequestDto = { url: string };
export type PlayFailResponseDto = ErrorIdentifier;

export const ActionsAPI = {
  async scan(): Promise<
    ResultAction<ScanSucessResponseDto, ScanFailResponseDto>
  > {
    if (import.meta.env.VITE_MOCK === "true") {
      const { faker } = await import("@faker-js/faker");
      await sleep(2000)
      const points = times(
        faker.number.int({ min: 0, max: 15 }),
        (): SRTPoint => ({
          ip: faker.internet.ipv4(),
          port: faker.number.int({ min: 1000, max: 60_000 }),
          mode: faker.helpers.arrayElement(["listener", "rendezvous"]),
        }),
      );
      return Result.success({points});
    }
    return Result.fromPromise<ScanSucessResponseDto, ScanFailResponseDto>(() => invoke("scan_command"), [], (err) => err as ScanFailResponseDto)
  },
  async play(dto: PlayRequestDto): Promise<ResultAction<undefined, PlayFailResponseDto>> {
    if (import.meta.env.VITE_MOCK === "true") {
      alert("Play: " + JSON.stringify(dto))
      return Result.success(undefined)
    }
    console.log("Chamando 'play_command'")
    return Result.fromPromise<undefined, PlayFailResponseDto>(() => invoke("play_command", { dto }), [], (err) => err as PlayFailResponseDto)
  }
};
