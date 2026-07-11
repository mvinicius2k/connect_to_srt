import { ReactSVG } from "react-svg";
import searchIcon from "@/assets/search.svg?url";

function Index() {
  return (
    <div className="w-full flex items-center justify-center h-full">
      <button className="size-64 rounded-full bg-linear-to-r from-indigo-600 to-indigo-800 text-cyan-200 text-4xl font-black outline-2 outline-offset-4 flex flex-col justify-center items-center hover:scale-110 duration-200 active:scale-95 active:brightness-150 outline-cyan-500 cursor-pointer select-none">
        ESCANEAR
        <div className="h-0">
          <ReactSVG className="[&_svg]:size-12 mt-4" src={searchIcon} />
        </div>
      </button>
    </div>
  );
}
export default Index;
