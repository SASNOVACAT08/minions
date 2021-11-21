import "./env.ts";

import { GatewayIntents, Client, event } from "harmony";
import { elosModule, ElosSlash } from "./commands/Elo/Elos.ts";
import { elofModule, ElofSlash } from "./commands/Elo/Elof.ts";
import { configModule, ConfigSlash } from "./commands/ConfigDiscord/Config.ts";

export class MyClient extends Client {
  @event()
  async ready(): Promise<void> {
    this.interactions.commands.bulkEdit([configModule, elosModule, elofModule])
    this.interactions.loadModule(new ElosSlash());
    this.interactions.loadModule(new ElofSlash());
    this.interactions.loadModule(new ConfigSlash());
    console.log(`Bot lancé ...`)
  }
}

const client = new MyClient()

client.connect(Deno.env.get("DISCORD_API_KEY"), [
  GatewayIntents.DIRECT_MESSAGES,
  GatewayIntents.GUILDS,
  GatewayIntents.GUILD_MESSAGES,
]);
