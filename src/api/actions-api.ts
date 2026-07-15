import { defineCommands, ErrorIdentifier } from "@/api/tauri";
import { SRTPoint } from "@/components/srt-points-viewer/shared";
import { ActionsMock } from "@/mock/actions-mock";

export type ScanSucessResponseDto = SRTPoint[];
export type ScanFailResponseDto = ErrorIdentifier;

export type ViewSucessResponseDto = void;
export type ViewFailResponseDto = ErrorIdentifier;
export const ActionsAPI = defineCommands({
  scan_command: {
    mock: ActionsMock.scan,
  },
  play_command: {
    mock: ActionsMock.play,
  },
});
