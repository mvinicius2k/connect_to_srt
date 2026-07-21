import { ActionsAPI } from "@/api/actions-api";
import searchIcon from "@/assets/search.svg?url";
import SRTPointsToolbar from "@/components/srt-points-toolbar/SRTPointsToolbar";
import { SRTPoint } from "@/components/srt-points-viewer/shared";
import SRTPointsViewer from "@/components/srt-points-viewer/SRTPointsViewer";
import BouncingLoading from "@/components/ui/loading/BouncingLoading";
import { generateSRTUrl } from "@/helpers/srt-url-generator";
import { useAsyncResult } from "@/hooks/use-async-result";
import { useToolbar as useToolbar } from "@/hooks/use-toolbar";
import clsx from "clsx";
import { useState } from "react";
import { ReactSVG } from "react-svg";

function Index() {
  const [allPoints, setAllPoints] = useState<SRTPoint[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<SRTPoint>();
  const scanCommand = useAsyncResult(ActionsAPI.scan);
  const playCommand = useAsyncResult(ActionsAPI.play)
  const toolbar = useToolbar();

  async function scan() {
    console.log("result.data.points")
    const result = await scanCommand.execute();

    if (result.failed) {
      console.error("Falhou");
      return;
    }

    setAllPoints(result.data.points);
  }

  function onSelectedPoint(point: SRTPoint | undefined) {
    setSelectedPoint(point);
  }
  function onPlayPoint(point: SRTPoint) {
    const url = generateSRTUrl({
      ip: point.ip,
      mode: point.mode === 'listener' ? 'caller' : 'rendezvous',
      port: point.port
    })
    playCommand.execute({url})
  }

  const buttonClasses = clsx(
    "size-64 relative group rounded-full bg-linear-to-r from-indigo-600 to-indigo-800 text-cyan-200 text-4xl font-black outline-2 outline-offset-4 flex flex-col justify-center items-center hover:scale-110 duration-200 active:scale-95 active:brightness-150 outline-cyan-500 cursor-pointer select-none",
    {},
  );
  const bouncingLoadingClasses = clsx("", {
    hidden: scanCommand.state !== "busy",
  });
  const iconSearchClasses = clsx("[&_svg]:size-12 mt-4", {
    hidden: scanCommand.state === "busy",
  });

  return (
    <div className="w-full flex items-center justify-center h-full">
      {scanCommand.state !== "done" ? (
        <button onClick={scan} className={buttonClasses}>
          {scanCommand.state !== "busy" ? "ESCANEAR" : "BUSCANDO"}
          <div className="h-0">
            <BouncingLoading className={bouncingLoadingClasses} />

            <ReactSVG className={iconSearchClasses} src={searchIcon} />
          </div>
        </button>
      ) : (
        <div className="w-full max-w-11/12 flex flex-col items-center">
          <SRTPointsToolbar
            actions={toolbar.impl}
            selectedPoint={selectedPoint}
          />
          <SRTPointsViewer
            onSelectedPoint={onSelectedPoint}
            onPlaySelected={onPlayPoint}
            points={allPoints}
          />
        </div>
      )}
    </div>
  );
}
export default Index;
