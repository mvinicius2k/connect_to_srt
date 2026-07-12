import {
  ScanFailResponseDto,
  ScanSucessResponseDto,
  ViewFailResponseDto,
  ViewSucessResponseDto,
} from "@/api/actions-api";
import { Result, ResultAction } from "@/helpers/result";
import { sleep } from "@/helpers/utils";

export const ActionsMock = {
  async scan(): Promise<
    ResultAction<ScanSucessResponseDto, ScanFailResponseDto>
  > {
    await sleep(0);
    return Result.success([
      {
        host: "192.168.0.13",
        port: 10000,
        kind: "listener",
      },
      {
        host: "192.168.0.14",
        port: 10000,
        kind: "listener",
      },
      {
        host: "192.168.0.17",
        port: 10000,
        kind: "rez",
      },
    ]);
  },
  async view(data: {
    runner: string;
    args?: string[];
  }): Promise<ResultAction<ViewSucessResponseDto, ViewFailResponseDto>> {
    console.log(data);
    return Result.success(undefined);
  },
};
