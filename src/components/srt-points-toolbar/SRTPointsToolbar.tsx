import { SRTPointsToolbarProps } from "@/components/srt-points-toolbar/shared";
import Button from "@/components/ui/button/Button";
import { useState } from "react";
import reloadIcon from "@/assets/reload.svg?url";
import playIcon from "@/assets/play.svg?url";
import textSelectionIcon from "@/assets/text-selection.svg?url";
import { ReactSVG } from "react-svg";
import clsx from "clsx";
import { useAsyncResult } from "@/hooks/use-async-result";
import { ActionsAPI } from "@/api/actions-api";

function SRTPointsToolbar({ actions, selectedPoint, onScanFinished, onScanStarted }: SRTPointsToolbarProps) {
  const [allowTextSelection, setAllowTextSelection] = useState(false);
  const [scanning, setScanning] = useState(false)
  const scanCommand = useAsyncResult(ActionsAPI.scan)
  async function scan() {
    setScanning(true)
    onScanStarted?.()
    const res = await scanCommand.execute()
    onScanFinished?.(res);
    setScanning(false)
  }

  return (
    <nav className="flex justify-between gap-2 w-full [&_button]:size-14">
      <div className="">
        <Button
          variant="transparent"
          sticky
          disabled={!selectedPoint}
          onClick={() => actions.play(selectedPoint!)}
        >
          <ReactSVG src={playIcon} />
        </Button>
        <Button variant="transparent" sticky onClick={() => scan()} loading={scanning}>
          <ReactSVG src={reloadIcon} />
        </Button>
      </div>
      <div className="flex justify-end items-center">
        <Button
          variant="transparent"
          sticky
          selected={allowTextSelection}
          className={ clsx({'bg-indigo-700/50 dark:bg-indigo-300/50' : allowTextSelection}) }
          onClick={() => setAllowTextSelection(!allowTextSelection)}
        >
          <ReactSVG src={textSelectionIcon} />
        </Button>
      </div>
    </nav>
  );
}

export default SRTPointsToolbar;
