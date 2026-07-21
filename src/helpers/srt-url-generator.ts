
import { entries, filter, isEmptyish, join, map, pipe } from "remeda";

export type SRTUrlGenerator = {
  ip: string,
  port: number,
  mode: 'caller' | "rendezvous"
  latency?: number,
  streamid?: string,
  passphrase?: string,
  bandwidth?: number,
  others?: Record<string, string>
}

export function generateSRTUrl({ip, mode, port, bandwidth, latency, passphrase, streamid, others}: SRTUrlGenerator) {
  const paramsStr = paramsOrNothing({
    mode: mode,
    bandwidth: bandwidth,
    latency: latency,
    passphrase: passphrase,
    streamid: streamid,
    ...others
  })
  return `srt://${ip}:${port}?${paramsStr}`
}

export function paramOrNothing(paramName: string | undefined, paramValue: string | number | undefined) {
  if (paramName === undefined || paramValue === undefined)
    return ''
  return paramName + "=" + encodeURIComponent(paramValue)
}

export function paramsOrNothing(params: Record<string, string | number | undefined>): string {
  return pipe(entries(params), map(([paramName, paramValue]) => paramOrNothing(paramName, paramValue)), filter(p => !isEmptyish(p)), join("&"))
}
