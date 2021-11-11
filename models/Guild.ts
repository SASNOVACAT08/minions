import { Region } from "./Region.ts"

export interface Guild{
  guildId: string
  prefix: string
  region: Region
}