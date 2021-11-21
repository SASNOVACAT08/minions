import { Region } from "/models/Region.ts";
import { Account, Elo } from "/models/Account.ts";
import { Queue } from "/models/Queue.ts";
import { eloEmbed } from "/embed/Elo.ts";
import { noEmbed } from "/embed/NoEmbed.ts";
import { Embed } from "harmony";

class LeagueOfLegends {
  private options: RequestInit;
  private region: Region = Region.EUROPE_WEST;

  constructor(token: string) {
    this.options = {
      headers: {
        "X-Riot-Token": token,
      },
    };
  }

  getRegion() {
    return this.region;
  }

  setRegion(region: Region) {
    this.region = region;
  }

  async getAccountInfos(summonerName: string): Promise<Account> {
    try {
      const url =
        `https://${this.region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;
      const res = await fetch(url, this.options);
      const data = await res.json();
      return {
        summonerId: data.id,
        summonerName: data.name,
        level: data.summonerLevel,
        profileIcon: data.profileIconId,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async getElo(accountId: string): Promise<Array<Elo>> {
    try {
      const url =
        `https://${this.region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${accountId}`;
      const res = await fetch(url, this.options);
      const data = await res.json();
      const elos: Array<Elo> = [];
      for (const q of data) {
        const totalGame = q.wins + q.losses;
        const winrate = Math.ceil((q.wins / totalGame) * 100);
        elos.push({
          queueType: q.queueType,
          tier: q.tier,
          rank: q.rank,
          lp: q.leaguePoints,
          wins: q.wins,
          losses: q.losses,
          hotStreak: q.hotStreak,
          winrate,
          totalGame,
        });
      }
      return elos;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getMainChampionId(accountId: string): Promise<number> {
    try {
      const url =
        `https://${this.region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${accountId}`;
      const res = await fetch(url, this.options);
      const data = await res.json();
      return data[0].championId;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getChampionName(championId: number): Promise<string> {
    try {
      const url =
        `http://ddragon.leagueoflegends.com/cdn/11.23.1/data/en_US/champion.json`;
      const res = await fetch(url);
      const data = await res.json();
      const allChampions = Object.values(data.data);
      // deno-lint-ignore no-explicit-any
      const mainChampionName: any = allChampions.find((champion: any) =>
        champion.key == championId
      );
      return mainChampionName.name as string;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getMainChampionName(accountId: string): Promise<string> {
    const championId = await this.getMainChampionId(accountId);
    const championName = await this.getChampionName(championId);
    return championName;
  }

  async getEloMessage(
    summonerName: string,
    queueType: Queue,
  ): Promise<Embed> {
    const accountInfos = await this.getAccountInfos(summonerName);
    const elos = await this.getElo(accountInfos.summonerId);
    const game = elos.find((elo) => elo.queueType === queueType);
    if (game) {
      const championName = await this.getMainChampionName(
        accountInfos.summonerId,
      );

      return eloEmbed(accountInfos, championName, game);
    } else {
      return noEmbed("Pas d'elo pour cette queue !");
    }
  }
}

const leagueServices = new LeagueOfLegends(Deno.env.get("LOL_API_KEY") ?? "");
export default leagueServices;
