import { Queue } from "./Queue.ts";

export interface Account {
  summonerId: string;
  summonerName: string;
  level: number;
  profileIcon: number;
}

export interface Elo {
  queueType: Queue;
  tier: string;
  rank: string;
  lp: number;
  wins: number;
  losses: number;
  hotStreak: boolean;
  winrate: number;
  totalGame: number;
}
