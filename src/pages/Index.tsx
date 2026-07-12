import { ActionsAPI } from "@/api/actions-api";
import searchIcon from "@/assets/search.svg?url";
import { SRTPoint } from "@/components/srt-points-viewer/shared";
import SRTPointsViewer from "@/components/srt-points-viewer/SRTPointsViewer";
import { useState } from "react";
import { ReactSVG } from "react-svg";

function Index() {
  const [allPoints, setAllPoints] = useState<SRTPoint[]>([]);
  const [firstScan, setFirstScan] = useState(true);
  async function scan() {
    const result = await ActionsAPI.invoke("scan");
    if (result.failed) {
      console.error("Falhou");
      return;
    }
    setFirstScan(false);
    setAllPoints(result.data);
  }

  return (
    <div className="w-full flex items-center justify-center h-full">
      {firstScan ? (
        <button onClick={scan} className="size-64 rounded-full bg-linear-to-r from-indigo-600 to-indigo-800 text-cyan-200 text-4xl font-black outline-2 outline-offset-4 flex flex-col justify-center items-center hover:scale-110 duration-200 active:scale-95 active:brightness-150 outline-cyan-500 cursor-pointer select-none">
          ESCANEAR
          <div className="h-0">
            <ReactSVG className="[&_svg]:size-12 mt-4" src={searchIcon} />
          </div>
        </button>
      ) : (
        <SRTPointsViewer className="max-w-11/12" points={allPoints}/>
      )}
    </div>
  );
}
export default Index;
