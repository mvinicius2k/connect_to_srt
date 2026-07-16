import { ActionsAPI } from "@/api/actions-api";
import { ToolbarActions } from "@/components/srt-points-toolbar/shared";
import { useState } from "react";


export function useToolbarImpl() {
  const [allowTextSelection, setAllowTextSelection]  = useState(false)

  const impl: ToolbarActions = {
    play(srtPoint) {
      return ActionsAPI.invoke('play_command', {point: srtPoint})
    },
    scanAgain() {
      return ActionsAPI.invoke('scan_command')
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
