import { Embed } from "harmony";
import { Account, Elo } from "/models/Account.ts";

export const eloEmbed = (
  account: Account,
  mainChampion: string,
  elo: Elo,
): Embed => {
  const rank = "**```" + `${elo.tier} ${elo.rank} ${elo.lp}lp` + "```**";
  const embed = new Embed();
  embed.setAuthor(
    account.summonerName,
    `http://ddragon.leagueoflegends.com/cdn/11.23.1/img/profileicon/${account.profileIcon}.png`,
  );
  embed.addField({ name: "Rank", value: rank });
  embed.addField({
    name: "Wins",
    value: "**```" + elo.wins + "```**",
    inline: true,
  });
  embed.addField({
    name: "Losses",
    value: "**```" + elo.losses + "```**",
    inline: true,
  });
  embed.addField({
    name: "Total",
    value: "**```" + elo.totalGame + "```**",
    inline: true,
  });
  embed.addField({
    name: "Winrate",
    value: "**```" + elo.winrate + "%```**",
  });
  embed.setThumbnail({
    url:
      `http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${mainChampion}.png`,
  });
  return embed;
};
