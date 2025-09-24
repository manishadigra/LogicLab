import platformsData from './data/platforms.json';
import regionalHotspotDataJson from './data/regional-hotspot-data.json';
import trendDataJson from './data/trend-data.json';

export type Platform = {
  id: string;
  name: string;
  category: string;
  marketCap: number;
  revenue: number;
  yoyGrowth: number;
  userBase: number;
  sentiment: number;
  description: string;
};

export const platforms: Platform[] = platformsData;

export type RegionalHotspot = {
  name: string;
  value: number;
};

export const regionalHotspotData: RegionalHotspot[] = regionalHotspotDataJson;

export type TrendData = {
  keyword: string;
  category: string;
  platform: string;
  interestScore: number;
  region: string;
};

export const trendData: TrendData[] = trendDataJson;
