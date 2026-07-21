import { ActionsAPI, ErrorIdentifier } from "@/api/actions-api";

import { useState } from "react";
import { useAsyncResult } from "@/hooks/use-async-result";
import { generateSRTUrl } from "@/helpers/srt-url-generator";
import { SRTPoint } from "@/components/srt-points-viewer/shared";
import { Result, ResultAction } from "@/helpers/result";

export interface ToolbarActions {

  play: (point: SRTPoint) => Promise<ResultAction<void, ErrorIdentifier>>,
  scanAgain: () => Promise<ResultAction<SRTPoint[], ErrorIdentifier>>,
  toggleAllowTextSelection: () => void


}


export function useToolbar() {
  const [allowTextSelection, setAllowTextSelection]  = useState(false)
  const playCommandStatus = useAsyncResult(ActionsAPI.play)
  const scanCommandStatus = useAsyncResult(ActionsAPI.scan)
  const impl: ToolbarActions = {
    play(srtPoint) {
      const url = generateSRTUrl(srtPoint)
      return playCommandStatus.execute({ url: url })
    },
    async scanAgain() {
      const result = await scanCommandStatus.execute()
      return Result.transform(result, {
        onSuccess(dto) {
          return dto.points
        },
        onError(err) {
          return err
        }

      })
    },
    toggleAllowTextSelection() {

      setAllowTextSelection(!allowTextSelection)
    }
  }

  return {
    impl,
    allowTextSelection
  }
}
