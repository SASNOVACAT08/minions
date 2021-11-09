import client from "../bot.ts";

class ConfigDiscord {
  changePrefix(prefix: string) {
    client.prefix = prefix;
  }
}

const configServices = new ConfigDiscord();
export default configServices;
