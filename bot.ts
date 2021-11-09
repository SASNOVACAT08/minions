import "./env.ts"

import { CommandClient, GatewayIntents } from "./deps.ts";
import ElosCommand from "./commands/Elo/Elos.ts";
import ElofCommand from "./commands/Elo/Elof.ts";
import Prefix from "./commands/ConfigDiscord/Prefix.ts";
import Config from "./commands/ConfigDiscord/Config.ts"

import { Guild } from "./models/Guild.ts"
import { Region } from "./models/Region.ts"

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
    console.log(guild)
  }
  console.log(servers)
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
