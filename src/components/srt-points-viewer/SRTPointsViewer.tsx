import { useState } from "react";
import { SRTPointsViewerProps } from "@/components/srt-points-viewer/shared";
import clsx from "clsx";



function SRTPointsViewer({points, allowTextSelect, ...props}: SRTPointsViewerProps) {
  const [selected, setSelect] = useState<number>();

  function select(index: number) {
    setSelect(index)
  }

  const tableClasses = clsx('w-full [&_th]:h-16 [&_th]:text-start [&_th]:last:text-end [&_th]:border-b [&_td]:last:text-end [&_td]:h-10', {'select-none' : !allowTextSelect})
  return (
    <div {...props} className={clsx("relative w-full", props.className)}>
      <table className={tableClasses}>
        <thead>
          <tr>
            <th>Host</th>
            <th>Porta</th>
            <th>Tipo</th>
            <th>Latência</th>
          </tr>
        </thead>

        <tbody>
          {points.map((p, index) => (
            <tr
              key={`${p.host}:${p.port}`}
              aria-selected={selected === index}
              onClick={() => select(index)}
              className="hover:[&>td]:bg-white/10 active:[&>td]:bg-white/20 aria-selected:[&>td]:bg-white/30"
            >
              <td>{p.host}</td>
              <td>{p.port}</td>
              <td>{p.kind}</td>
              <td>100ms</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}

export default SRTPointsViewer;
