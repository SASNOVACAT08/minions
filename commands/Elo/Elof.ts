import { SlashModule, ApplicationCommandInteraction, ApplicationCommandOptionType, slash, ApplicationCommandPartial } from "harmony";
import leagueServices from "/services/LeagueOfLegends.ts";
import { Queue } from "/models/Queue.ts";

export const elofModule:  ApplicationCommandPartial = {
  name: 'elof',
  description: 'Elo - Flex !!',
  options: [
    {
      name: 'summonername',
      description: 'Summoner Name',
      required: true,
      type: ApplicationCommandOptionType.STRING
    }
  ]
}

export class ElofSlash extends SlashModule {
  @slash()
  async elof(ctx: ApplicationCommandInteraction): Promise<void> {
    const summonerName = ctx.data.options[0].value as string;
    const message = await leagueServices.getEloMessage(
      summonerName,
      Queue.FLEX,
    );
    ctx.reply({ embeds: [message] });
  }
}

