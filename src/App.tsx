
import "@/App.css";
import settingsIcon from "@/assets/settings.svg?url";
import Button from "@/components/ui/button/Button";
import Tooltip from "@/components/ui/tooltip/Tooltip";
import { Outlet } from "react-router";
import { ReactSVG } from "react-svg";

function App() {


  return (
    <div className="flex flex-col w-dvw h-dvh bg-linear-150 bg-fixed to-indigo-200 from-neutral-200 dark:from-indigo-950 dark:to-neutral-950 bg-indigo-100 dark:text-neutral-100 text-neutral-900">
      <header className="mt-4 flex flex-row-reverse items-center gap-2.5 pr-4 absolute w-full">
        <Button
          data-tooltip-id="settings"
          data-tooltip-content="Configurações"
          sticky
          variant="transparent"
        >
          <ReactSVG src={settingsIcon} draggable="false" />
        </Button>
        <Tooltip place="bottom-end" identifier="settings" />
      </header>
      <main className="flex-1 py-12">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
