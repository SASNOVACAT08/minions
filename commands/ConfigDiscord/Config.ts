import { SlashModule, ApplicationCommandInteraction, slash, ApplicationCommandPartial } from "harmony";
import { embedConfig } from "/embed/Config.ts";

export const configModule:  ApplicationCommandPartial = {
  name: 'config',
  description: 'config !!'
}

export class ConfigSlash extends SlashModule {
  @slash()
  async config(ctx: ApplicationCommandInteraction): Promise<void> {
    const ping = ctx.client.gateway.ping;
    const servers = await ctx.client.guilds.size();
    const message = embedConfig(ping, servers);
    ctx.reply({embeds: [message]});
  }
}
