import { CommandContext } from "../deps.ts";
import guilds from "../bot.ts"

class Config {
  getPrefixGuild(ctx: CommandContext): boolean{
    const prefix = guilds.find(guild => guild.guildId === ctx.guild?.id)?.prefix
    const goodPrefix = ctx.prefix === prefix
    return goodPrefix
  }
}

const configServices = new Config();
export default configServices;