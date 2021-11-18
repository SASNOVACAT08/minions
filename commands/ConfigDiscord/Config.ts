import { Command, CommandContext } from "../../deps.ts";
import configServices from "../../services/Config.ts";
import { embedConfig } from "../../embed/Config.ts";
import guilds from "../../bot.ts";

export default class ConfigCommand extends Command {
  name = "Config";
  aliases = ["config"];

  beforeExecute(ctx: CommandContext): boolean {
    return configServices.getPrefixGuild(ctx);
  }

  async execute(ctx: CommandContext): Promise<void> {
    const ping = ctx.client.gateway.ping;
    const servers = await ctx.client.guilds.size();
    const region = guilds.find((guild) => guild.guildId === ctx.guild?.id)
      ?.region;
    const message = embedConfig(ping, servers, region);
    ctx.message.reply(message);
  }
}
