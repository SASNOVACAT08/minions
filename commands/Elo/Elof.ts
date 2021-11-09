import { Command, CommandContext } from "../../deps.ts";
import leagueServices from "../../services/LeagueOfLegends.ts";
import { Queue } from "../../models/Queue.ts";

export default class ElofCommand extends Command {
  name = "Elo - Flex";
  aliases = ["elof"];

  async execute(ctx: CommandContext) {
    const summonerName = ctx.rawArgs.join(" ");
    const message = await leagueServices.getEloMessage(
      summonerName,
      Queue.FLEX,
    );
    ctx.message.reply(message);
  }
}
