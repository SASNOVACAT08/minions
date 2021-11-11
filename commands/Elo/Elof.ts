import { Command, CommandContext } from "harmony";
import leagueServices from "/services/LeagueOfLegends.ts";
import { Queue } from "/models/Queue.ts";
import configServices from "/services/Config.ts";

export default class ElofCommand extends Command {
  name = "Elo - Flex";
  aliases = ["elof"];

  beforeExecute(ctx: CommandContext): boolean {
    return configServices.getPrefixGuild(ctx);
  }

  async execute(ctx: CommandContext) {
    const summonerName = ctx.rawArgs.join(" ");
    const message = await leagueServices.getEloMessage(
      summonerName,
      Queue.FLEX,
    );
    ctx.message.reply(message);
  }
}
