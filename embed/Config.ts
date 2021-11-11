import { Embed } from "../deps.ts";
import {Region} from "../models/Region.ts"

export const embedConfig = (ping: number, servers: number, region?: Region): Embed => {
  const embed = new Embed()
  embed.setTitle("Stat de ```Minions```")
  embed.addField({ name: ":ping_pong: ```Ping```", value:"```" + ping + "```" })
  embed.addField({ name: ":minidisc: ```Serveurs```", value:"```" + servers + "```" })
  embed.addField({ name: ":homes: ```Regions```", value:"```" + (region ?? "Aucun").toUpperCase() + "```" })
  return embed
};
