import { Command, CommandContext } from "harmony";
import configServices from "/services/Config.ts";
import guilds from "/bot.ts";

export default class PrefixCommand extends Command {
  name = "Prefix";
  aliases = ["prefix"];

  beforeExecute(ctx: CommandContext): boolean {
    return configServices.getPrefixGuild(ctx);
  }

  execute(ctx: CommandContext) {
    const prefix = ctx.rawArgs[0];
    if (prefix) {
      const prefixes = ctx.client.prefix as Array<string>;
      const inClient = prefixes.every((prefixClient) =>
        prefixClient === prefix
      );
      if (!inClient) {
        prefixes.push(prefix);
        ctx.client.prefix = prefixes;
      }
      const indexGuild = guilds.findIndex((guild) =>
        guild.guildId === ctx.guild?.id
      );
      if (indexGuild === -1) return;
      guilds[indexGuild].prefix = prefix;
      ctx.message.reply(`Le préfixe est maintenant ${prefix}`);
    } else {
      ctx.message.reply(`Pas d'argument !`);
    }
  }
}
