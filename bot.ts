import { CommandClient, config, GatewayIntents } from "./deps.ts";
import { Guild } from "./models/Guild.ts"
import { Region } from "./models/Region.ts"

if(Deno.env.get("ENVIRONMENT") === "local"){
  config({ safe: true, export: true });
}

import ElosCommand from "./commands/Elo/Elos.ts";
import ElofCommand from "./commands/Elo/Elof.ts";
import Prefix from "./commands/ConfigDiscord/Prefix.ts";
import Config from "./commands/ConfigDiscord/Config.ts"

const guilds: Array<Guild> = []

const client = new CommandClient({
  prefix: ["?"],
});

client.on("ready",async () => {
  const servers = await client.guilds.collection()
  for(const guild of servers){
    guilds.push({
      guildId: guild[0],
      prefix: "?",
      region: Region.EUROPE_WEST
    })
  }
});

client.commands.add(ElosCommand);
client.commands.add(ElofCommand);
client.commands.add(Prefix);
client.commands.add(Config)

client.connect(Deno.env.get("DISCORD_API_KEY"), [
  GatewayIntents.DIRECT_MESSAGES,
  GatewayIntents.GUILDS,
  GatewayIntents.GUILD_MESSAGES,
]);

export default guilds;
