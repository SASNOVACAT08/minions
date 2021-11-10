import { Region } from "../models/Region.ts";
import { Account, Elo } from "../models/Account.ts";
import { Queue } from "../models/Queue.ts";
import { eloEmbed } from "../embed/Elo.ts";
import { Embed } from "../deps.ts";

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

  async getEloMessage(
    summonerName: string,
    queueType: Queue,
  ): Promise<string | Embed> {
    const accountInfos = await this.getAccountInfos(summonerName);
    const elos = await this.getElo(accountInfos.summonerId);
    const game = elos.find((elo) => elo.queueType === queueType);
    if (game) {
      return eloEmbed(summonerName, game);
    } else {
      return JSON.stringify(`Pas d'elo dans cette queue`);
    }
  }
}

const leagueServices = new LeagueOfLegends(Deno.env.get("LOL_API_KEY") ?? "");
export default leagueServices;
