import { Embed } from "harmony";
import { Elo } from "/models/Account.ts";

export const eloEmbed = (summonerName: string, elo: Elo): Embed => {
  const rank = "```" + `${elo.tier} ${elo.rank} ${elo.lp}lp` + "```";
  const embed = new Embed();
  embed.setAuthor("Minions");
  embed.setTitle(summonerName);
  embed.addField({ name: "Rank", value: rank });
  embed.addField({
    name: "Wins",
    value: "```" + elo.wins + "```",
    inline: true,
  });
  embed.addField({
    name: "Losses",
    value: "```" + elo.losses + "```",
    inline: true,
  });
  embed.addField({
    name: "Total",
    value: "```" + elo.totalGame + "```",
    inline: true,
  });
  embed.addField({
    name: "Winrate",
    value: "```" + elo.winrate + "%```",
  });
  return embed;
};
