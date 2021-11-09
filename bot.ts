import { CommandClient, config, GatewayIntents } from "./deps.ts";

config({ safe: true, export: true });

import ElosCommand from "./commands/Elo/Elos.ts";
import ElofCommand from "./commands/Elo/Elof.ts";
import Prefix from "./commands/ConfigDiscord/Prefix.ts";

const client = new CommandClient({
  prefix: "?",
});

client.on("ready", () => {
  console.log(`Ready! User: ${client.user?.tag}`);
});

client.commands.add(ElosCommand);
client.commands.add(ElofCommand);
client.commands.add(Prefix);

client.connect(Deno.env.get("DISCORD_API_KEY"), [
  GatewayIntents.DIRECT_MESSAGES,
  GatewayIntents.GUILDS,
  GatewayIntents.GUILD_MESSAGES,
]);

export default client;
