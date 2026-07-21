import { SRTPoint } from "@/components/srt-points-viewer/shared";
import { entries, join, map, pipe } from "remeda";

export type SRTUrlGenerator = SRTPoint & {
  latency?: number,
  streamid?: string,
  passphrase?: string,
  bandwidth?: number,
  others?: Record<string, string>
}

export function generateSRTUrl({host, kind, port, bandwidth, latency, passphrase, streamid, others}: SRTUrlGenerator) {
  const paramsStr = paramsOrNothing({
    mode: kind,
    bandwidth: bandwidth,
    latency: latency,
    passphrase: passphrase,
    streamid: streamid,
    ...others
  })
  return `srt://${host}:${port}?${paramsStr}`
}

export function paramOrNothing(paramName: string | undefined, paramValue: string | number | undefined) {
  if (paramName === undefined || paramValue === undefined)
    return ''
  return paramName + "=" + encodeURIComponent(paramValue)
}

export function paramsOrNothing(params: Record<string, string | number | undefined>): string {
  return pipe(entries(params), map(([paramName, paramValue]) => paramOrNothing(paramName, paramValue)), join("&"))
}
