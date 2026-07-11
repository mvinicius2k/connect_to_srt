import { useState } from "react";

import { invoke } from "@tauri-apps/api/core";
import "@/App.css";
import settingsIcon from "@/assets/settings.svg?url";
import { Outlet } from "react-router";
import Button from "@/components/ui/button/Button";
import { ReactSVG } from "react-svg";
import Tooltip from "@/components/ui/tooltip/Tooltip";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="flex flex-col w-dvw h-dvh bg-linear-150 bg-fixed from-indigo-950 to-neutral-950 bg-indigo-100">
      <header className="mt-4 mb-20 flex flex-row-reverse items-center gap-2.5 pr-4">
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
      <main className=" flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
