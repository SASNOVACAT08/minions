import { Command, CommandContext } from "../../deps.ts";
import configServices from "../../services/ConfigDiscord.ts";

export default class PrefixCommand extends Command {
  name = "Prefix";
  aliases = ["prefix"];

  execute(ctx: CommandContext) {
    const prefix = ctx.rawArgs[0];
    if (prefix) {
      configServices.changePrefix(prefix);
      ctx.message.reply(`Le préfixe est maintenant ${prefix}`);
    } else {
      ctx.message.reply(`Pas d'argument !`);
    }
  }
}
