import { Embed } from "harmony";

export const noEmbed = (message: string): Embed => {
  const embed = new Embed();
  embed.setAuthor(message);
  return embed;
};
