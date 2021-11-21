import { Embed } from "harmony";
import { Region } from "/models/Region.ts";

export const embedConfig = (
  ping: number,
  servers: number,
  region?: Region,
): Embed => {
  const embed = new Embed();
  embed.setTitle("Stat de **Minions**");
  embed.addField({
    name: ":ping_pong: Ping",
    value: `${ping}`,
    inline: true,
  });
  embed.addField({
    name: ":globe_with_meridians: Regions",
    value: `${(region ?? "Aucun").toUpperCase()}`,
    inline: true,
  });
  embed.addField({
    name: ":computer: Serveurs",
    value: `${servers}`,
    inline: true,
  });
  embed.setTimestamp(Date.now());
  embed.setFooter("Minions");
  return embed;
};
