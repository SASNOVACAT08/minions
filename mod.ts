import "./env.ts";

import { Client, event, GatewayIntents, Interaction, InteractionApplicationCommandData, InteractionMessageComponentData } from "harmony";
import { elosModule, ElosSlash } from "./commands/Elo/Elos.ts";
import { elofModule, ElofSlash } from "./commands/Elo/Elof.ts";
import { regionModule, RegionSlash } from "./commands/ConfigDiscord/Region.ts";
// import { RegionEvent } from "./events/RegionEvent.ts"
import { configModule, ConfigSlash } from "./commands/ConfigDiscord/Config.ts";

export class MyClient extends Client {
  @event()
  ready(): void {
    this.interactions.commands.bulkEdit([configModule, elosModule, elofModule, regionModule]);
    this.interactions.loadModule(new ElosSlash());
    this.interactions.loadModule(new ElofSlash());
    this.interactions.loadModule(new ConfigSlash());
    this.interactions.loadModule(new RegionSlash());
    console.log(`Bot lancé ...`);
  }

  @event()
  interactionCreate(interaction: Interaction): void {
    let eventApplication = interaction.data as InteractionApplicationCommandData
    switch(eventApplication.id){}
    let eventComponent = interaction.data as InteractionMessageComponentData
    switch(eventComponent.custom_id){
      case 'region_change':
        let data = eventComponent.values ?? "string"
        interaction.message?.reply(data[0])
    }
  }
}

const client = new MyClient();

client.connect(Deno.env.get("DISCORD_API_KEY"), [
  GatewayIntents.DIRECT_MESSAGES,
  GatewayIntents.GUILDS,
  GatewayIntents.GUILD_MESSAGES,
]);
