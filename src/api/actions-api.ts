import { defineCommands, ErrorIdentifier, TauriCommand } from "@/api/tauri";
import { SRTPoint } from "@/components/srt-points-viewer/shared";
import { ActionsMock } from "@/mock/actions-mock";

export type ScanSucessResponseDto = SRTPoint[];
export type ScanFailResponseDto = ErrorIdentifier;

export type PlayRequestDto = { point: SRTPoint }
export type PlaySucessResponseDto = undefined;
export type PlayFailResponseDto = ErrorIdentifier;
export const ActionsAPI = defineCommands({
  scan_command: {
    mock: ActionsMock.scan,
  } satisfies TauriCommand<undefined, ScanSucessResponseDto, ScanFailResponseDto>,
  play_command: {
    mock: ActionsMock.play,
  }  satisfies TauriCommand<PlayRequestDto, PlaySucessResponseDto, PlayFailResponseDto>,
});
