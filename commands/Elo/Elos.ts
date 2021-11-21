import {
  ApplicationCommandInteraction,
  ApplicationCommandOptionType,
  ApplicationCommandPartial,
  slash,
  SlashModule,
} from "harmony";
import leagueServices from "/services/LeagueOfLegends.ts";
import { Queue } from "/models/Queue.ts";

export const elosModule: ApplicationCommandPartial = {
  name: "elos",
  description: "Elo - SoloQ",
  options: [
    {
      name: "summonername",
      description: "Summoner Name",
      required: true,
      type: ApplicationCommandOptionType.STRING,
    },
  ],
};

export class ElosSlash extends SlashModule {
  @slash()
  async elos(ctx: ApplicationCommandInteraction): Promise<void> {
    const summonerName = ctx.data.options[0].value as string;
    const message = await leagueServices.getEloMessage(
      summonerName,
      Queue.SOLO,
    );
    ctx.reply({ embeds: [message] });
  }
}
