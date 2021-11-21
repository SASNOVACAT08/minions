import {
  ApplicationCommandInteraction,
  ApplicationCommandPartial,
  slash,
  SlashModule,
} from "harmony";
import { embedConfig } from "/embed/Config.ts";

export const regionModule: ApplicationCommandPartial = {
  name: "region",
  description: "region !!",
};

export class RegionSlash extends SlashModule {
  @slash()
  async region(ctx: ApplicationCommandInteraction): Promise<void> {
    const ping = ctx.client.gateway.ping;
    const servers = await ctx.client.guilds.size();
    const message = embedConfig(ping, servers);
    ctx.reply({ embeds: [message], components: [
      {
        type: "ACTION_ROW",
        components: [{
          type: "SELECT",
          customID: "region_change",
          options: [
            {
              label: "EUW",
              value: "EUW1"
            },
            {
              label: "NA",
              value: "NA1"
            }
          ],
          placeholder: "Choisi"
        }]
      }
    ] });
  }
}
