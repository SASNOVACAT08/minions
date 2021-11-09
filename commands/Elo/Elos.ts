import { Command, CommandContext } from "../../deps.ts";
import leagueServices from "../../services/LeagueOfLegends.ts";
import { Queue } from "../../models/Queue.ts";

export default class ElosCommand extends Command {
  name = "Elo - Solo Q";
  aliases = ["elos"];

  async execute(ctx: CommandContext) {
    const summonerName = ctx.rawArgs.join(" ");
    const message = await leagueServices.getEloMessage(
      summonerName,
      Queue.SOLO,
    );
    ctx.message.reply(message);
  }
}
