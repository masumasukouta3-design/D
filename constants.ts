

import { Crop, CropType, FacilityCategory, FacilityInfo, RuinType, Product, CompanyInfo, Mineral, Weapon, CountryId, CountryInfo, SpecialtyGood, Ideology, Leader, Hero, Agriculture, Industry, Terrain, Entertainment, NationAttributeCategory } from './types';

export const GROW_TIME_MS = 600 * 1000; // 60 seconds for demo. Original request was 1 hour.

export const STAT_SELL_PRICE_MULTIPLIER = 0.1; // 10% bonus per stat point
export const RESEARCH_COST = 300; // 30 products
export const RESEARCH_SUCCESS_RATE = 0.2; // 20%

export const HARVEST_FRAGMENT_CHANCE = 0.05; // 5%
export const FRAGMENTS_TO_RUIN_COST = 1000;
export const RUIN_PROFIT_DURATION_MS = 60 * 1000; // 60 seconds for demo. Original request was 1 hour.
export const BASE_PROFIT_PER_RUIN = 50000;

// Tenant and Company Constants
export const TENANT_COST = 1000000;
export const TENANT_COMPANY_CAPACITY = 5;
export const TENANT_PROFIT_DURATION_MS = 60 * 60 * 1000; // 1 hour
export const COMPANY_COST = 500000;

export const CITIZEN_VALUE_MULTIPLIER = 10000; // Increase in market value per citizen
export const PRODUCTION_RECORD_MULTIPLIER = 500; // Increase in market value per unit in production record
export const TENANT_PROFIT_MARKET_VALUE_MULTIPLIER = 0.05; // 5% of total market cap
export const TENANT_PROFIT_CITIZEN_BONUS = 10000; // Bonus profit per citizen in tenant

// Mining and Smithing Constants
export const MINING_DURATION_MS = 60 * 60 * 1000; // 1 hour
export const MINERALS_PER_RUN = 20;

export const MINERAL_TYPES = [
    'diamond', 'gold', 'platinum', 'iron', 'copper', 'silver', 'aluminum', 'tin', 'sulfur', 'brass'
];

export const INITIAL_MINERALS: Record<string, Mineral> = {
  diamond: { id: 'diamond', name: 'ダイヤモンド', sellPrice: 50000 },
  gold: { id: 'gold', name: '金', sellPrice: 30000 },
  platinum: { id: 'platinum', name: 'プラチナ', sellPrice: 40000 },
  iron: { id: 'iron', name: '鉄', sellPrice: 5000 },
  copper: { id: 'copper', name: '銅', sellPrice: 4000 },
  silver: { id: 'silver', name: '銀', sellPrice: 10000 },
  aluminum: { id: 'aluminum', name: 'アルミニウム', sellPrice: 3000 },
  tin: { id: 'tin', name: 'スズ', sellPrice: 2000 },
  sulfur: { id: 'sulfur', name: '硫黄', sellPrice: 1500 },
  brass: { id: 'brass', name: '真鍮', sellPrice: 6000 },
};

export const INITIAL_WEAPONS: Record<string, Weapon> = {
  musket: { id: 'musket', name: 'マスケット銃', sellPrice: 150000, recipe: { iron: 1, copper: 1, aluminum: 1, tin: 1, sulfur: 1, brass: 1 } },
  charlemagnes_sword: { id: 'charlemagnes_sword', name: 'カール大帝の剣', sellPrice: 1000000, recipe: { diamond: 2, gold: 2, platinum: 2 } },
};

// Country Constants
export const COUNTRY_PRODUCTION_DURATION_MS = 60 * 60 * 1000; // 1 hour
export const BASE_GOODS_PER_PRODUCTION = 1;
export const BASE_BONDS_PER_PRODUCTION = 20;
export const RANK_UPGRADE_BASE_COST = 20;

export const INITIAL_SPECIALTY_GOODS: Record<string, SpecialtyGood> = {
  taco_bell_tacos: { id: 'taco_bell_tacos', name: 'タコベルのタコス', sellPrice: 50000 },
  maple_syrup: { id: 'maple_syrup', name: 'カナダ産メープルシロップ', sellPrice: 60000 },
   kabulskabulipalaw: { id: 'kabulskabulipalaw', name: 'カブールのカブリパラウ', sellPrice: 750000 },
  vodka: { id: 'vodka', name: 'プーチン愛飲のウォッカ', sellPrice: 80000 },
  shumai_bento: { id: 'shumai_bento', name: '崎陽軒焼売弁当', sellPrice: 40000 },
    DublinsIrishStew: { id: 'DublinsIrishStew', name: 'ダブリンのアイリッシュシチュー', sellPrice: 1200000 },
  BakusPlov: { id: 'BakusPlov', name: 'バクーのプロフ', sellPrice: 980000 },
  DubaisDates: { id: 'DubaisDates', name: 'ドバイのデーツ', sellPrice: 5500000 },
  TiranasTaveKosi: { id: 'TiranasTaveKosi', name: 'ティラナのタヴェ・コシ', sellPrice: 850000 },
  AlgiersCouscous: { id: 'AlgiersCouscous', name: 'アルジェのクスクス', sellPrice: 720000 },
  BuenosAiresAsado: { id: 'BuenosAiresAsado', name: 'ブエノスアイレスのアサード', sellPrice: 3100000 },
  YerevansLavash: { id: 'YerevansLavash', name: 'エレバンのラバシュ', sellPrice: 680000 },
  LuandasMuamba: { id: 'LuandasMuamba', name: 'ルアンダのムケンバ', sellPrice: 910000 },
  StJohnsFungee: { id: 'StJohnsFungee', name: 'セントジョンズのファンジ', sellPrice: 790000 },
};

export const COUNTRY_DATA: Record<CountryId, CountryInfo> = {
  usa: {
    id: 'usa',
    name: 'アメリカ',
    specialtyGoodId: 'taco_bell_tacos',
    conquestRequirements: { musket: 1, charlemagnes_sword: 1 },
    conquestCitizenReward: 5000,
  },
  canada: {
    id: 'canada',
    name: 'カナダ',
    specialtyGoodId: 'maple_syrup',
    conquestRequirements: { musket: 5, charlemagnes_sword: 2 },
    conquestCitizenReward: 15000,
  },
    ireland: {
    id: 'ireland',
    name: 'アイルランド',
    specialtyGoodId: 'DublinsIrishStew',
    conquestRequirements: { musket: 30, charlemagnes_sword: 30 },
    conquestCitizenReward: 5000,
  },
  azerbaijan: {
    id: 'azerbaijan',
    name: 'アゼルバイジャン',
    specialtyGoodId: 'BakusPlov',
    conquestRequirements: { musket: 30, charlemagnes_sword: 30 },
    conquestCitizenReward: 5000,
  },
  unitedarabemirates: {
    id: 'unitedarabemirates',
    name: 'アラブ首長国連邦',
    specialtyGoodId: 'DubaisDates',
    conquestRequirements: { musket: 30, charlemagnes_sword: 30 },
    conquestCitizenReward: 5000,
  },
  albania: {
    id: 'albania',
    name: 'アルバニア',
    specialtyGoodId: 'TiranasTaveKosi',
    conquestRequirements: { musket: 30, charlemagnes_sword: 30 },
    conquestCitizenReward: 5000,
  },
  algeria: {
    id: 'algeria',
    name: 'アルジェリア',
    specialtyGoodId: 'AlgiersCouscous',
    conquestRequirements: { musket: 30, charlemagnes_sword: 30 },
    conquestCitizenReward: 5000,
  },
  argentina: {
    id: 'argentina',
    name: 'アルゼンチン',
    specialtyGoodId: 'BuenosAiresAsado',
    conquestRequirements: { musket: 30, charlemagnes_sword: 30 },
    conquestCitizenReward: 5000,
  },
  armenia: {
    id: 'armenia',
    name: 'アルメニア',
    specialtyGoodId: 'YerevansLavash',
    conquestRequirements: { musket: 30, charlemagnes_sword: 30 },
    conquestCitizenReward: 5000,
  },
  angola: {
    id: 'angola',
    name: 'アンゴラ',
    specialtyGoodId: 'LuandasMuamba',
    conquestRequirements: { musket: 30, charlemagnes_sword: 30 },
    conquestCitizenReward: 5000,
  },
  antiguaandbarbuda: {
    id: 'antiguaandbarbuda',
    name: 'アンティグア・バーブーダ',
    specialtyGoodId: 'StJohnsFungee',
    conquestRequirements: { musket: 30, charlemagnes_sword: 30 },
    conquestCitizenReward: 5000,
  },
    afghanistan: {
    id: 'afghanistan',
    name: 'アフガニスタン',
    specialtyGoodId: 'kabulskabulipalaw',
    conquestRequirements: { musket: 30, charlemagnes_sword: 30 },
    conquestCitizenReward: 5000,
  },
  russia: {
    id: 'russia',
    name: 'ロシア',
    specialtyGoodId: 'vodka',
    conquestRequirements: { musket: 10, charlemagnes_sword: 5 },
    conquestCitizenReward: 2000,
  },
  japan: {
    id: 'japan',
    name: '日本',
    specialtyGoodId: 'shumai_bento',
    conquestRequirements: { musket: 15, charlemagnes_sword: 10 },
    conquestCitizenReward:3000,
  },
};

export const ALL_COUNTRIES: CountryId[] = ['usa', 'canada', 'russia', 'japan', 'afghanistan', 'ireland', 'azerbaijan', 'unitedarabemirates', 'albania', 'algeria', 'argentina', 'armenia', 'angola', 'antiguaandbarbuda'];

// Nationalism Constants
export const NATION_COST = 100000000; // 100M
export const NATION_REROLL_COST = 1000000; // 1M

// Skill Tree Constants
export const SKILL_POINT_RESET_COST = 1000000; // 1M
export const SKILL_BONUSES = {
    cropTime: 0.0005, // 0.5% per 10 points
    mineTime: 0.0005,
    sellPrice: 0.001, // 1% per 10 points
    fragmentChance: 0.0001, // 0.1% absolute per 10 points
    countryTime: 0.0005,
    tenantTime: 0.0005,
};

// Recruiter Constants
export const RECRUITMENT_BASE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours
export const RECRUITMENT_MIN_DURATION_MS = 1 * 60 * 60 * 1000; // 1 hour minimum
export const RECRUITMENT_BASE_CITIZEN_GAIN = 1;

export const RECRUITER_ITEM_CITIZEN_INCREASE_BONUS = 1; // +1 citizen per claim per item
export const RECRUITER_ITEM_TIME_REDUCTION_BONUS_MS = 30 * 60 * 1000; // 30 minutes reduction per item

export const RECRUITER_ITEM_COSTS = {
  citizenIncrease: { base: 10, increment: 5 }, // Cost in citizens
  timeReduction: { base: 10, increment: 5 },   // Cost in citizens
};

// NBA Constants
export const NBA_PLAYER_COST = 10000000; // 10M
export const NBA_ROSTER_LIMIT = 100;
export const NBA_OPPONENT_TEAMS = [
    'ウォリアーズ', 'ピストンズ', 'スパーズ', 'ニックス', 'レイカーズ', 
    'クリッパーズ', 'サンダー', 'ウルヴス', 'マーベリックス', 'ネッツ', 
    'ブルズ', 'ジャズ', 'ペリカンズ', 'ホーネッツ', 'ペイサーズ'
];
export const NBA_CONFERENCE_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours
export const NBA_PRIZE_MONEY: Record<number, number> = {
    1: 500000000, // 1st
    2: 250000000, // 2nd
    4: 100000000, // 3rd-4th
    8: 50000000,  // 5th-8th
    16: 10000000, // 9th-16th
};


export enum NationEffect {
    CountryTime = 'CountryTime',
    CropTime = 'CropTime',
    SellPrice = 'SellPrice',
    MineTime = 'MineTime',
    FragmentChance = 'FragmentChance',
    RuinTime = 'RuinTime',
}

export const NATION_EFFECT_BONUSES = {
    [NationEffect.CountryTime]: 0.05, // 5% reduction per stack
    [NationEffect.CropTime]: 0.05,
    [NationEffect.SellPrice]: 0.1, // 10% multiplier per stack
    [NationEffect.MineTime]: 0.05,
    [NationEffect.FragmentChance]: 0.01, // 1% absolute increase per stack
    [NationEffect.RuinTime]: 0.05,
};

export const NATION_EFFECT_DESCRIPTIONS: Record<NationEffect, string> = {
    [NationEffect.CountryTime]: '国の利益回収時間短縮',
    [NationEffect.CropTime]: '作物の生産時間短縮',
    [NationEffect.SellPrice]: '売却価格ボーナス',
    [NationEffect.MineTime]: '鉱山の回収時間短縮',
    [NationEffect.FragmentChance]: '破片のドロップ確率上昇',
    [NationEffect.RuinTime]: '遺跡の利益回収時間短縮',
};

export const IDEOLOGIES: Record<Ideology, { name: string, effect: NationEffect }> = {
    [Ideology.Fascism]: { name: 'ファシズム', effect: NationEffect.CountryTime },
    [Ideology.Communism]: { name: '共産主義', effect: NationEffect.CropTime },
    [Ideology.Liberalism]: { name: '自由主義', effect: NationEffect.SellPrice },
    [Ideology.AbsoluteMonarchy]: { name: '絶対王政', effect: NationEffect.MineTime },
    [Ideology.ConstitutionalMonarchy]: { name: '立憲君主制', effect: NationEffect.FragmentChance },
    [Ideology.CommunistMonarchy]: { name: '共産王政', effect: NationEffect.RuinTime },
};

export const LEADERS: Record<Leader, { name: string, effect: NationEffect }> = {
    [Leader.Populist]: { name: 'ポピュリスト', effect: NationEffect.CountryTime },
    [Leader.PolPot]: { name: 'ポルポト', effect: NationEffect.CropTime },
    [Leader.Saladin]: { name: 'サラディン', effect: NationEffect.SellPrice },
    [Leader.Taizong]: { name: '太宗', effect: NationEffect.MineTime },
    [Leader.ShinzoAbe]: { name: '安倍晋三', effect: NationEffect.FragmentChance },
    [Leader.FirstSon]: { name: '1代目の息子', effect: NationEffect.RuinTime },
};

export const HEROES: Record<Hero, { name: string, effect: NationEffect }> = {
    // FIX: Correctly reference the Hero enum for Charlemagne
    [Hero.Charlemagne]: { name: 'カール大帝', effect: NationEffect.CountryTime },
    [Hero.Baibars]: { name: 'バイバルス', effect: NationEffect.CropTime },
    [Hero.RichardTheLionheart]: { name: '獅子王', effect: NationEffect.SellPrice },
    [Hero.TokugawaIeyasu]: { name: '徳川家康', effect: NationEffect.MineTime },
    [Hero.FrederickII]: { name: 'フリードリヒ2世', effect: NationEffect.FragmentChance },
    [Hero.Hitler]: { name: 'ヒトラー', effect: NationEffect.RuinTime },
};

export const AGRICULTURES: Record<Agriculture, { name: string, effect: NationEffect }> = {
    [Agriculture.Qanat]: { name: 'カナート', effect: NationEffect.CountryTime },
    [Agriculture.GreenRevolution]: { name: '緑の革命', effect: NationEffect.CropTime },
    [Agriculture.WhiteRevolution]: { name: '白の革命', effect: NationEffect.SellPrice },
    [Agriculture.PinkRevolution]: { name: 'ピンクの革命', effect: NationEffect.MineTime },
    [Agriculture.YurinRigi]: { name: '有輪棃', effect: NationEffect.FragmentChance },
    [Agriculture.Agroforestry]: { name: 'アグロフォレストリ', effect: NationEffect.RuinTime },
};

export const INDUSTRIES: Record<Industry, { name: string, effect: NationEffect }> = {
    [Industry.Kombinat]: { name: 'コンビナート', effect: NationEffect.CountryTime },
    [Industry.Swordsmith]: { name: '刀鍛冶', effect: NationEffect.CropTime },
    [Industry.SiliconValley]: { name: 'シリコンバレー', effect: NationEffect.SellPrice },
    [Industry.MultipurposeDam]: { name: '多目的ダム', effect: NationEffect.MineTime },
    [Industry.ResearchCity]: { name: '研究都市', effect: NationEffect.FragmentChance },
    [Industry.WovenCity]: { name: 'ウーヴンシティ', effect: NationEffect.RuinTime },
};

export const TERRAINS: Record<Terrain, { name: string, effect: NationEffect }> = {
    [Terrain.Desert]: { name: '砂漠', effect: NationEffect.CountryTime },
    [Terrain.Mediterranean]: { name: '地中海', effect: NationEffect.CropTime },
    [Terrain.Jungle]: { name: 'ジャングル', effect: NationEffect.SellPrice },
    [Terrain.Fjord]: { name: 'フィヨルド', effect: NationEffect.MineTime },
    [Terrain.Glacier]: { name: '氷河', effect: NationEffect.FragmentChance },
    [Terrain.Taiga]: { name: 'タイガ', effect: NationEffect.RuinTime },
};

export const ENTERTAINMENTS: Record<Entertainment, { name: string, effect: NationEffect }> = {
    [Entertainment.Boxing]: { name: 'ボクシング', effect: NationEffect.CountryTime },
    [Entertainment.ProBaseball]: { name: 'プロ野球', effect: NationEffect.CropTime },
    [Entertainment.NBA]: { name: 'NBA', effect: NationEffect.SellPrice },
    [Entertainment.Colosseum]: { name: 'コロッセウム', effect: NationEffect.MineTime },
    [Entertainment.Kabuki]: { name: '歌舞伎', effect: NationEffect.FragmentChance },
    [Entertainment.CoffeeHouse]: { name: 'コーヒーハウス', effect: NationEffect.RuinTime },
};

export const NATION_ATTRIBUTE_DATA: Record<NationAttributeCategory, {
    name: string;
    options: Record<string, { name: string, effect: NationEffect }>;
    enum: any;
}> = {
    ideology: { name: '思想と政治', options: IDEOLOGIES, enum: Ideology },
    leader: { name: '指導者', options: LEADERS, enum: Leader },
    hero: { name: '英雄', options: HEROES, enum: Hero },
    agriculture: { name: '農業力', options: AGRICULTURES, enum: Agriculture },
    industry: { name: '工業力', options: INDUSTRIES, enum: Industry },
    terrain: { name: '地形', options: TERRAINS, enum: Terrain },
    entertainment: { name: '娯楽', options: ENTERTAINMENTS, enum: Entertainment },
};


export const RUIN_DATA = {
    [RuinType.Maya]: {
        name: 'マヤの水捌け装置',
        fragmentName: 'マヤの水捌け装置の破片',
        fragmentId: 'maya',
    },
    [RuinType.NuevaEspana]: {
        name: 'ヌエバエスパーニャ',
        fragmentName: 'ヌエバエスパーニャの破片',
        fragmentId: 'nuevaEspana',
    }
} as const;


export const INITIAL_CROPS: Record<string, Crop> = {
  spinach: { id: 'spinach', name: 'ホウレンソウ', type: CropType.Plant, buyPrice: 90, baseSellPrice: 180, stats: { taste: 0, durability: 0, appearance: 0 } },
komatsuna: { id: 'komatsuna', name: '小松菜', type: CropType.Plant, buyPrice: 60, baseSellPrice: 120, stats: { taste: 0, durability: 0, appearance: 0 } },
chingensai: { id: 'chingensai', name: 'チンゲンサイ', type: CropType.Plant, buyPrice: 70, baseSellPrice: 140, stats: { taste: 0, durability: 0, appearance: 0 } },
mizuna: { id: 'mizuna', name: '水菜', type: CropType.Plant, buyPrice: 80, baseSellPrice: 160, stats: { taste: 0, durability: 0, appearance: 0 } },
shungiku: { id: 'shungiku', name: '春菊', type: CropType.Plant, buyPrice: 90, baseSellPrice: 180, stats: { taste: 0, durability: 0, appearance: 0 } },
mini_tomato: { id: 'mini_tomato', name: 'ミニトマト', type: CropType.Plant, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
eggplant: { id: 'eggplant', name: 'ナス', type: CropType.Plant, buyPrice: 80, baseSellPrice: 160, stats: { taste: 0, durability: 0, appearance: 0 } },
green_pepper: { id: 'green_pepper', name: 'ピーマン', type: CropType.Plant, buyPrice: 70, baseSellPrice: 140, stats: { taste: 0, durability: 0, appearance: 0 } },
paprika: { id: 'paprika', name: 'パプリカ', type: CropType.Plant, buyPrice: 150, baseSellPrice: 300, stats: { taste: 0, durability: 0, appearance: 0 } },
cucumber: { id: 'cucumber', name: 'キュウリ', type: CropType.Plant, buyPrice: 60, baseSellPrice: 120, stats: { taste: 0, durability: 0, appearance: 0 } },
zucchini: { id: 'zucchini', name: 'ズッキーニ', type: CropType.Plant, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
okra: { id: 'okra', name: 'オクラ', type: CropType.Plant, buyPrice: 80, baseSellPrice: 160, stats: { taste: 0, durability: 0, appearance: 0 } },
bitter_melon: { id: 'bitter_melon', name: 'ゴーヤ', type: CropType.Plant, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
shishito_pepper: { id: 'shishito_pepper', name: 'シシトウ', type: CropType.Plant, buyPrice: 90, baseSellPrice: 180, stats: { taste: 0, durability: 0, appearance: 0 } },
pumpkin: { id: 'pumpkin', name: 'カボチャ', type: CropType.Plant, buyPrice: 150, baseSellPrice: 300, stats: { taste: 0, durability: 0, appearance: 0 } },
chili_pepper: { id: 'chili_pepper', name: 'トウガラシ', type: CropType.Plant, buyPrice: 60, baseSellPrice: 120, stats: { taste: 0, durability: 0, appearance: 0 } },
potato: { id: 'potato', name: 'ジャガイモ', type: CropType.Plant, buyPrice: 50, baseSellPrice: 100, stats: { taste: 0, durability: 0, appearance: 0 } },
sweet_potato: { id: 'sweet_potato', name: 'サツマイモ', type: CropType.Plant, buyPrice: 60, baseSellPrice: 120, stats: { taste: 0, durability: 0, appearance: 0 } },
taro: { id: 'taro', name: 'サトイモ', type: CropType.Plant, buyPrice: 70, baseSellPrice: 140, stats: { taste: 0, durability: 0, appearance: 0 } },
yam: { id: 'yam', name: 'ヤマイモ', type: CropType.Plant, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
daikon_radish: { id: 'daikon_radish', name: 'ダイコン', type: CropType.Plant, buyPrice: 70, baseSellPrice: 140, stats: { taste: 0, durability: 0, appearance: 0 } },
turnip: { id: 'turnip', name: 'カブ', type: CropType.Plant, buyPrice: 60, baseSellPrice: 120, stats: { taste: 0, durability: 0, appearance: 0 } },
lotus_root: { id: 'lotus_root', name: 'レンコン', type: CropType.Plant, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
burdock: { id: 'burdock', name: 'ゴボウ', type: CropType.Plant, buyPrice: 80, baseSellPrice: 160, stats: { taste: 0, durability: 0, appearance: 0 } },
celery: { id: 'celery', name: 'セロリ', type: CropType.Plant, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
asparagus: { id: 'asparagus', name: 'アスパラガス', type: CropType.Plant, buyPrice: 200, baseSellPrice: 400, stats: { taste: 0, durability: 0, appearance: 0 } },
onion: { id: 'onion', name: 'タマネギ', type: CropType.Plant, buyPrice: 50, baseSellPrice: 100, stats: { taste: 0, durability: 0, appearance: 0 } },
garlic: { id: 'garlic', name: 'ニンニク', type: CropType.Plant, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
ginger: { id: 'ginger', name: 'ショウガ', type: CropType.Plant, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
green_onion: { id: 'green_onion', name: 'ネギ', type: CropType.Plant, buyPrice: 60, baseSellPrice: 120, stats: { taste: 0, durability: 0, appearance: 0 } },
wakegi: { id: 'wakegi', name: 'ワケギ', type: CropType.Plant, buyPrice: 70, baseSellPrice: 140, stats: { taste: 0, durability: 0, appearance: 0 } },
rakkyo: { id: 'rakkyo', name: 'ラッキョウ', type: CropType.Plant, buyPrice: 80, baseSellPrice: 160, stats: { taste: 0, durability: 0, appearance: 0 } },
shallot: { id: 'shallot', name: 'エシャロット', type: CropType.Plant, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
pea: { id: 'pea', name: 'エンドウ', type: CropType.Plant, buyPrice: 70, baseSellPrice: 140, stats: { taste: 0, durability: 0, appearance: 0 } },
broad_bean: { id: 'broad_bean', name: 'ソラマメ', type: CropType.Plant, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
green_bean: { id: 'green_bean', name: 'サヤインゲン', type: CropType.Plant, buyPrice: 80, baseSellPrice: 160, stats: { taste: 0, durability: 0, appearance: 0 } },
snap_pea: { id: 'snap_pea', name: 'スナップエンドウ', type: CropType.Plant, buyPrice: 90, baseSellPrice: 180, stats: { taste: 0, durability: 0, appearance: 0 } },
corn: { id: 'corn', name: 'トウモロコシ', type: CropType.Plant, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
edamame: { id: 'edamame', name: 'エダマメ', type: CropType.Plant, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
shiso: { id: 'shiso', name: 'シソ', type: CropType.Plant, buyPrice: 150, baseSellPrice: 300, stats: { taste: 0, durability: 0, appearance: 0 } },
mitsuba: { id: 'mitsuba', name: 'ミツバ', type: CropType.Plant, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
basil: { id: 'basil', name: 'バジル', type: CropType.Plant, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
parsley: { id: 'parsley', name: 'パセリ', type: CropType.Plant, buyPrice: 80, baseSellPrice: 160, stats: { taste: 0, durability: 0, appearance: 0 } },
dill: { id: 'dill', name: 'ディル', type: CropType.Plant, buyPrice: 150, baseSellPrice: 300, stats: { taste: 0, durability: 0, appearance: 0 } },
fennel: { id: 'fennel', name: 'フェンネル', type: CropType.Plant, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
rosemary: { id: 'rosemary', name: 'ローズマリー', type: CropType.Plant, buyPrice: 200, baseSellPrice: 400, stats: { taste: 0, durability: 0, appearance: 0 } },
thyme: { id: 'thyme', name: 'タイム', type: CropType.Plant, buyPrice: 180, baseSellPrice: 360, stats: { taste: 0, durability: 0, appearance: 0 } },
sage: { id: 'sage', name: 'セージ', type: CropType.Plant, buyPrice: 170, baseSellPrice: 340, stats: { taste: 0, durability: 0, appearance: 0 } },
coriander: { id: 'coriander', name: 'コリアンダー', type: CropType.Plant, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
artichoke: { id: 'artichoke', name: 'アーティチョーク', type: CropType.Plant, buyPrice: 250, baseSellPrice: 500, stats: { taste: 0, durability: 0, appearance: 0 } },
radish: { id: 'radish', name: 'ラディッシュ', type: CropType.Plant, buyPrice: 60, baseSellPrice: 120, stats: { taste: 0, durability: 0, appearance: 0 } },
arugula: { id: 'arugula', name: 'ルッコラ', type: CropType.Plant, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
watercress: { id: 'watercress', name: 'クレソン', type: CropType.Plant, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
ice_plant: { id: 'ice_plant', name: 'アイスプラント', type: CropType.Plant, buyPrice: 150, baseSellPrice: 300, stats: { taste: 0, durability: 0, appearance: 0 } },
molokheiya: { id: 'molokheiya', name: 'モロヘイヤ', type: CropType.Plant, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
chorogi: { id: 'chorogi', name: 'チョロギ', type: CropType.Plant, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
wasabi: { id: 'wasabi', name: 'ワサビ', type: CropType.Plant, buyPrice: 300, baseSellPrice: 600, stats: { taste: 0, durability: 0, appearance: 0 } },
truffle: { id: 'truffle', name: 'トリュフ', type: CropType.Plant, buyPrice: 1000, baseSellPrice: 2000, stats: { taste: 0, durability: 0, appearance: 0 } },
mushroom: { id: 'mushroom', name: 'マッシュルーム', type: CropType.Plant, buyPrice: 150, baseSellPrice: 300, stats: { taste: 0, durability: 0, appearance: 0 } },
shiitake: { id: 'shiitake', name: 'シイタケ', type: CropType.Plant, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
eringi: { id: 'eringi', name: 'エリンギ', type: CropType.Plant, buyPrice: 140, baseSellPrice: 280, stats: { taste: 0, durability: 0, appearance: 0 } },
maitake: { id: 'maitake', name: 'マイタケ', type: CropType.Plant, buyPrice: 160, baseSellPrice: 320, stats: { taste: 0, durability: 0, appearance: 0 } },
shimeji: { id: 'shimeji', name: 'シメジ', type: CropType.Plant, buyPrice: 130, baseSellPrice: 260, stats: { taste: 0, durability: 0, appearance: 0 } },
nameko: { id: 'nameko', name: 'ナメコ', type: CropType.Plant, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
kikurage: { id: 'kikurage', name: 'キクラゲ', type: CropType.Plant, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
enoki: { id: 'enoki', name: 'エノキ', type: CropType.Plant, buyPrice: 110, baseSellPrice: 220, stats: { taste: 0, durability: 0, appearance: 0 } },
sprout: { id: 'sprout', name: 'スプラウト', type: CropType.Plant, buyPrice: 40, baseSellPrice: 80, stats: { taste: 0, durability: 0, appearance: 0 } },
kaiware_daikon: { id: 'kaiware_daikon', name: 'カイワレダイコン', type: CropType.Plant, buyPrice: 50, baseSellPrice: 100, stats: { taste: 0, durability: 0, appearance: 0 } },
beet: { id: 'beet', name: 'ビーツ', type: CropType.Plant, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
swiss_chard: { id: 'swiss_chard', name: 'スイスチャード', type: CropType.Plant, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
hakusai: { id: 'hakusai', name: '白菜', type: CropType.Plant, buyPrice: 80, baseSellPrice: 160, stats: { taste: 0, durability: 0, appearance: 0 } },
kohlrabi: { id: 'kohlrabi', name: 'コールラビ', type: CropType.Plant, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
bamboo_shoot: { id: 'bamboo_shoot', name: 'タケノコ', type: CropType.Plant, buyPrice: 200, baseSellPrice: 400, stats: { taste: 0, durability: 0, appearance: 0 } },
kuwai: { id: 'kuwai', name: 'クワイ', type: CropType.Plant, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
yacon: { id: 'yacon', name: 'ヤーコン', type: CropType.Plant, buyPrice: 150, baseSellPrice: 300, stats: { taste: 0, durability: 0, appearance: 0 } },
cassava: { id: 'cassava', name: 'キャッサバ', type: CropType.Plant, buyPrice: 80, baseSellPrice: 160, stats: { taste: 0, durability: 0, appearance: 0 } },
sesame: { id: 'sesame', name: 'ゴマ', type: CropType.Plant, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
sunflower_seed: { id: 'sunflower_seed', name: 'ひまわりの種', type: CropType.Plant, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
kale: { id: 'kale', name: 'ケール', type: CropType.Plant, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
romanesco: { id: 'romanesco', name: 'ロマネスコ', type: CropType.Plant, buyPrice: 180, baseSellPrice: 360, stats: { taste: 0, durability: 0, appearance: 0 } },
chestnut_pumpkin: { id: 'chestnut_pumpkin', name: 'カボチャ（栗かぼちゃ）', type: CropType.Plant, buyPrice: 160, baseSellPrice: 320, stats: { taste: 0, durability: 0, appearance: 0 } },
western_pumpkin: { id: 'western_pumpkin', name: 'カボチャ（西洋かぼちゃ）', type: CropType.Plant, buyPrice: 150, baseSellPrice: 300, stats: { taste: 0, durability: 0, appearance: 0 } },
luffa: { id: 'luffa', name: 'ヘチマ', type: CropType.Plant, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
fudansou: { id: 'fudansou', name: 'フダンソウ', type: CropType.Plant, buyPrice: 90, baseSellPrice: 180, stats: { taste: 0, durability: 0, appearance: 0 } },
jalapeno_pepper: { id: 'jalapeno_pepper', name: '唐辛子（ハラペーニョ）', type: CropType.Plant, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
habanero_pepper: { id: 'habanero_pepper', name: '唐辛子（ハバネロ）', type: CropType.Plant, buyPrice: 150, baseSellPrice: 300, stats: { taste: 0, durability: 0, appearance: 0 } },
cayenne_pepper: { id: 'cayenne_pepper', name: '唐辛子（カイエン）', type: CropType.Plant, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
radish_red_white: { id: 'radish_red_white', name: 'ラディッシュ（紅白）', type: CropType.Plant, buyPrice: 70, baseSellPrice: 140, stats: { taste: 0, durability: 0, appearance: 0 } },
salad_greens: { id: 'salad_greens', name: 'サラダ菜', type: CropType.Plant, buyPrice: 80, baseSellPrice: 160, stats: { taste: 0, durability: 0, appearance: 0 } },
microgreen: { id: 'microgreen', name: 'マイクログリーン', type: CropType.Plant, buyPrice: 200, baseSellPrice: 400, stats: { taste: 0, durability: 0, appearance: 0 } },
suizenjina: { id: 'suizenjina', name: '水前寺菜', type: CropType.Plant, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
  apple: { id: 'apple', name: 'りんご', type: CropType.Plant, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
  tomato: { id: 'tomato', name: 'トマト', type: CropType.Plant, buyPrice: 80, baseSellPrice: 160, stats: { taste: 0, durability: 0, appearance: 0 } },
  carrot: { id: 'carrot', name: 'にんじん', type: CropType.Plant, buyPrice: 60, baseSellPrice: 120, stats: { taste: 0, durability: 0, appearance: 0 } },
grape: { id: 'grape', name: 'ぶどう', type: CropType.Plant, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
orange: { id: 'orange', name: 'オレンジ', type: CropType.Plant, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
banana: { id: 'banana', name: 'バナナ', type: CropType.Plant, buyPrice: 80, baseSellPrice: 160, stats: { taste: 0, durability: 0, appearance: 0 } },
mango: { id: 'mango', name: 'マンゴー', type: CropType.Plant, buyPrice: 200, baseSellPrice: 400, stats: { taste: 0, durability: 0, appearance: 0 } },
peach: { id: 'peach', name: 'もも', type: CropType.Plant, buyPrice: 150, baseSellPrice: 300, stats: { taste: 0, durability: 0, appearance: 0 } },
cherry: { id: 'cherry', name: 'さくらんぼ', type: CropType.Plant, buyPrice: 180, baseSellPrice: 360, stats: { taste: 0, durability: 0, appearance: 0 } },
pineapple: { id: 'pineapple', name: 'パイナップル', type: CropType.Plant, buyPrice: 250, baseSellPrice: 500, stats: { taste: 0, durability: 0, appearance: 0 } },
strawberry: { id: 'strawberry', name: 'イチゴ', type: CropType.Plant, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
melon: { id: 'melon', name: 'メロン', type: CropType.Plant, buyPrice: 300, baseSellPrice: 600, stats: { taste: 0, durability: 0, appearance: 0 } },
watermelon: { id: 'watermelon', name: 'スイカ', type: CropType.Plant, buyPrice: 200, baseSellPrice: 400, stats: { taste: 0, durability: 0, appearance: 0 } },
lemon: { id: 'lemon', name: 'レモン', type: CropType.Plant, buyPrice: 90, baseSellPrice: 180, stats: { taste: 0, durability: 0, appearance: 0 } },
lime: { id: 'lime', name: 'ライム', type: CropType.Plant, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
kiwi: { id: 'kiwi', name: 'キウイ', type: CropType.Plant, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
blueberry: { id: 'blueberry', name: 'ブルーベリー', type: CropType.Plant, buyPrice: 150, baseSellPrice: 300, stats: { taste: 0, durability: 0, appearance: 0 } },
raspberry: { id: 'raspberry', name: 'ラズベリー', type: CropType.Plant, buyPrice: 160, baseSellPrice: 320, stats: { taste: 0, durability: 0, appearance: 0 } },
blackberry: { id: 'blackberry', name: 'ブラックベリー', type: CropType.Plant, buyPrice: 160, baseSellPrice: 320, stats: { taste: 0, durability: 0, appearance: 0 } },
apricot: { id: 'apricot', name: 'アプリコット', type: CropType.Plant, buyPrice: 140, baseSellPrice: 280, stats: { taste: 0, durability: 0, appearance: 0 } },
prune: { id: 'prune', name: 'プルーン', type: CropType.Plant, buyPrice: 130, baseSellPrice: 260, stats: { taste: 0, durability: 0, appearance: 0 } },
persimmon: { id: 'persimmon', name: '柿', type: CropType.Plant, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
pear: { id: 'pear', name: '梨', type: CropType.Plant, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
pomegranate: { id: 'pomegranate', name: 'ザクロ', type: CropType.Plant, buyPrice: 180, baseSellPrice: 360, stats: { taste: 0, durability: 0, appearance: 0 } },
grapefruit: { id: 'grapefruit', name: 'グレープフルーツ', type: CropType.Plant, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
dragon_fruit: { id: 'dragon_fruit', name: 'ドラゴンフルーツ', type: CropType.Plant, buyPrice: 300, baseSellPrice: 600, stats: { taste: 0, durability: 0, appearance: 0 } },
passion_fruit: { id: 'passion_fruit', name: 'パッションフルーツ', type: CropType.Plant, buyPrice: 250, baseSellPrice: 500, stats: { taste: 0, durability: 0, appearance: 0 } },
mangosteen: { id: 'mangosteen', name: 'マンゴスチン', type: CropType.Plant, buyPrice: 400, baseSellPrice: 800, stats: { taste: 0, durability: 0, appearance: 0 } },
coconut: { id: 'coconut', name: 'ココナッツ', type: CropType.Plant, buyPrice: 150, baseSellPrice: 300, stats: { taste: 0, durability: 0, appearance: 0 } },
cacao: { id: 'cacao', name: 'カカオ', type: CropType.Plant, buyPrice: 200, baseSellPrice: 400, stats: { taste: 0, durability: 0, appearance: 0 } },
feijoa: { id: 'feijoa', name: 'フェイジョア', type: CropType.Plant, buyPrice: 180, baseSellPrice: 360, stats: { taste: 0, durability: 0, appearance: 0 } },
mulberry: { id: 'mulberry', name: 'クワ', type: CropType.Plant, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
nectarine: { id: 'nectarine', name: 'ネクタリン', type: CropType.Plant, buyPrice: 160, baseSellPrice: 320, stats: { taste: 0, durability: 0, appearance: 0 } },
quince: { id: 'quince', name: 'マルメロ', type: CropType.Plant, buyPrice: 140, baseSellPrice: 280, stats: { taste: 0, durability: 0, appearance: 0 } },
pawpaw: { id: 'pawpaw', name: 'ポポー', type: CropType.Plant, buyPrice: 220, baseSellPrice: 440, stats: { taste: 0, durability: 0, appearance: 0 } },
finger_lime: { id: 'finger_lime', name: 'フィンガーライム', type: CropType.Plant, buyPrice: 300, baseSellPrice: 600, stats: { taste: 0, durability: 0, appearance: 0 } },
star_fruit: { id: 'star_fruit', name: 'スターフルーツ', type: CropType.Plant, buyPrice: 250, baseSellPrice: 500, stats: { taste: 0, durability: 0, appearance: 0 } },
jackfruit: { id: 'jackfruit', name: 'ジャックフルーツ', type: CropType.Plant, buyPrice: 350, baseSellPrice: 700, stats: { taste: 0, durability: 0, appearance: 0 } },
durian: { id: 'durian', name: 'ドリアン', type: CropType.Plant, buyPrice: 500, baseSellPrice: 1000, stats: { taste: 0, durability: 0, appearance: 0 } },
tamarillo: { id: 'tamarillo', name: 'タマリロ', type: CropType.Plant, buyPrice: 200, baseSellPrice: 400, stats: { taste: 0, durability: 0, appearance: 0 } },
acerola: { id: 'acerola', name: 'アセロラ', type: CropType.Plant, buyPrice: 180, baseSellPrice: 360, stats: { taste: 0, durability: 0, appearance: 0 } },
gumi: { id: 'gumi', name: 'グミの実', type: CropType.Plant, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
rose_hip: { id: 'rose_hip', name: 'ローズヒップ', type: CropType.Plant, buyPrice: 150, baseSellPrice: 300, stats: { taste: 0, durability: 0, appearance: 0 } },
white_sapote: { id: 'white_sapote', name: 'ホワイトサポテ', type: CropType.Plant, buyPrice: 200, baseSellPrice: 400, stats: { taste: 0, durability: 0, appearance: 0 } },
cherimoya: { id: 'cherimoya', name: 'チェリモヤ', type: CropType.Plant, buyPrice: 300, baseSellPrice: 600, stats: { taste: 0, durability: 0, appearance: 0 } },
rambutan: { id: 'rambutan', name: 'ランブータン', type: CropType.Plant, buyPrice: 250, baseSellPrice: 500, stats: { taste: 0, durability: 0, appearance: 0 } },
sapodilla: { id: 'sapodilla', name: 'サポジラ', type: CropType.Plant, buyPrice: 180, baseSellPrice: 360, stats: { taste: 0, durability: 0, appearance: 0 } },
jaboticaba: { id: 'jaboticaba', name: 'ジャボチカバ', type: CropType.Plant, buyPrice: 220, baseSellPrice: 440, stats: { taste: 0, durability: 0, appearance: 0 } },
carambola: { id: 'carambola', name: 'カランボラ', type: CropType.Plant, buyPrice: 200, baseSellPrice: 400, stats: { taste: 0, durability: 0, appearance: 0 } },
camellia_fruit: { id: 'camellia_fruit', name: 'ヤブツバキの実', type: CropType.Plant, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
guava: { id: 'guava', name: 'グアバ', type: CropType.Plant, buyPrice: 150, baseSellPrice: 300, stats: { taste: 0, durability: 0, appearance: 0 } },
currant: { id: 'currant', name: 'スグリ', type: CropType.Plant, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
horse_mackerel: { id: 'horse_mackerel', name: 'アジ', type: CropType.Fish, buyPrice: 80, baseSellPrice: 160, stats: { taste: 0, durability: 0, appearance: 0 } },
mackerel: { id: 'mackerel', name: 'サバ', type: CropType.Fish, buyPrice: 70, baseSellPrice: 140, stats: { taste: 0, durability: 0, appearance: 0 } },
tuna: { id: 'tuna', name: 'マグロ', type: CropType.Fish, buyPrice: 300, baseSellPrice: 600, stats: { taste: 0, durability: 0, appearance: 0 } },
sea_bream: { id: 'sea_bream', name: 'タイ', type: CropType.Fish, buyPrice: 200, baseSellPrice: 400, stats: { taste: 0, durability: 0, appearance: 0 } },
flounder: { id: 'flounder', name: 'ヒラメ', type: CropType.Fish, buyPrice: 250, baseSellPrice: 500, stats: { taste: 0, durability: 0, appearance: 0 } },
bonito: { id: 'bonito', name: 'カツオ', type: CropType.Fish, buyPrice: 150, baseSellPrice: 300, stats: { taste: 0, durability: 0, appearance: 0 } },
yellowtail: { id: 'yellowtail', name: 'ブリ', type: CropType.Fish, buyPrice: 180, baseSellPrice: 360, stats: { taste: 0, durability: 0, appearance: 0 } },
amberjack: { id: 'amberjack', name: 'カンパチ', type: CropType.Fish, buyPrice: 220, baseSellPrice: 440, stats: { taste: 0, durability: 0, appearance: 0 } },
kelp_bass: { id: 'kelp_bass', name: 'クエ', type: CropType.Fish, buyPrice: 400, baseSellPrice: 800, stats: { taste: 0, durability: 0, appearance: 0 } },
blackthroat_seaperch: { id: 'blackthroat_seaperch', name: 'ノドグロ', type: CropType.Fish, buyPrice: 500, baseSellPrice: 1000, stats: { taste: 0, durability: 0, appearance: 0 } },
abalone: { id: 'abalone', name: 'アワビ', type: CropType.Fish, buyPrice: 350, baseSellPrice: 700, stats: { taste: 0, durability: 0, appearance: 0 } },
scallop: { id: 'scallop', name: 'ホタテ', type: CropType.Fish, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
crab: { id: 'crab', name: 'カニ', type: CropType.Fish, buyPrice: 200, baseSellPrice: 400, stats: { taste: 0, durability: 0, appearance: 0 } },
shrimp: { id: 'shrimp', name: 'エビ', type: CropType.Fish, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
squid: { id: 'squid', name: 'イカ', type: CropType.Fish, buyPrice: 90, baseSellPrice: 180, stats: { taste: 0, durability: 0, appearance: 0 } },
octopus: { id: 'octopus', name: 'タコ', type: CropType.Fish, buyPrice: 150, baseSellPrice: 300, stats: { taste: 0, durability: 0, appearance: 0 } },
smelt: { id: 'smelt', name: 'シシャモ', type: CropType.Fish, buyPrice: 60, baseSellPrice: 120, stats: { taste: 0, durability: 0, appearance: 0 } },
pufferfish: { id: 'pufferfish', name: 'フグ', type: CropType.Fish, buyPrice: 300, baseSellPrice: 600, stats: { taste: 0, durability: 0, appearance: 0 } },
conger_eel: { id: 'conger_eel', name: 'ハモ', type: CropType.Fish, buyPrice: 180, baseSellPrice: 360, stats: { taste: 0, durability: 0, appearance: 0 } },
anglerfish: { id: 'anglerfish', name: 'アンコウ', type: CropType.Fish, buyPrice: 250, baseSellPrice: 500, stats: { taste: 0, durability: 0, appearance: 0 } },
rockfish: { id: 'rockfish', name: 'メバル', type: CropType.Fish, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
alfonsin: { id: 'alfonsin', name: 'キンメダイ', type: CropType.Fish, buyPrice: 200, baseSellPrice: 400, stats: { taste: 0, durability: 0, appearance: 0 } },
okhotsk_atka_mackerel: { id: 'okhotsk_atka_mackerel', name: 'ホッケ', type: CropType.Fish, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
sea_bass: { id: 'sea_bass', name: 'スズキ', type: CropType.Fish, buyPrice: 150, baseSellPrice: 300, stats: { taste: 0, durability: 0, appearance: 0 } },
greenling: { id: 'greenling', name: 'アイナメ', type: CropType.Fish, buyPrice: 130, baseSellPrice: 260, stats: { taste: 0, durability: 0, appearance: 0 } },
mahi_mahi: { id: 'mahi_mahi', name: 'シイラ', type: CropType.Fish, buyPrice: 180, baseSellPrice: 360, stats: { taste: 0, durability: 0, appearance: 0 } },
mullet: { id: 'mullet', name: 'ボラ', type: CropType.Fish, buyPrice: 80, baseSellPrice: 160, stats: { taste: 0, durability: 0, appearance: 0 } },
catfish: { id: 'catfish', name: 'ナマズ', type: CropType.Fish, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
cornetfish: { id: 'cornetfish', name: 'ヤガラ', type: CropType.Fish, buyPrice: 140, baseSellPrice: 280, stats: { taste: 0, durability: 0, appearance: 0 } },
devil_stinger: { id: 'devil_stinger', name: 'オコゼ', type: CropType.Fish, buyPrice: 160, baseSellPrice: 320, stats: { taste: 0, durability: 0, appearance: 0 } },
lionfish: { id: 'lionfish', name: 'ミノカサゴ', type: CropType.Fish, buyPrice: 200, baseSellPrice: 400, stats: { taste: 0, durability: 0, appearance: 0 } },
hairtail: { id: 'hairtail', name: 'タチウオ', type: CropType.Fish, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
flathead: { id: 'flathead', name: 'コチ', type: CropType.Fish, buyPrice: 110, baseSellPrice: 220, stats: { taste: 0, durability: 0, appearance: 0 } },
filefish: { id: 'filefish', name: 'カワハギ', type: CropType.Fish, buyPrice: 130, baseSellPrice: 260, stats: { taste: 0, durability: 0, appearance: 0 } },
pleuronectidae: { id: 'pleuronectidae', name: 'カレイ', type: CropType.Fish, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
salmon: { id: 'salmon', name: 'サケ', type: CropType.Fish, buyPrice: 150, baseSellPrice: 300, stats: { taste: 0, durability: 0, appearance: 0 } },
mantis_shrimp: { id: 'mantis_shrimp', name: 'シャコ', type: CropType.Fish, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
sea_squirt: { id: 'sea_squirt', name: 'ホヤ', type: CropType.Fish, buyPrice: 90, baseSellPrice: 180, stats: { taste: 0, durability: 0, appearance: 0 } },
flying_fish: { id: 'flying_fish', name: 'トビウオ', type: CropType.Fish, buyPrice: 110, baseSellPrice: 220, stats: { taste: 0, durability: 0, appearance: 0 } },
blenny: { id: 'blenny', name: 'ギンポ', type: CropType.Fish, buyPrice: 80, baseSellPrice: 160, stats: { taste: 0, durability: 0, appearance: 0 } },
sea_robin: { id: 'sea_robin', name: 'ホウボウ', type: CropType.Fish, buyPrice: 140, baseSellPrice: 280, stats: { taste: 0, durability: 0, appearance: 0 } },
black_sea_bream: { id: 'black_sea_bream', name: 'クロダイ', type: CropType.Fish, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
surfperch: { id: 'surfperch', name: 'ウミタナゴ', type: CropType.Fish, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
loach: { id: 'loach', name: 'ドジョウ', type: CropType.Fish, buyPrice: 60, baseSellPrice: 120, stats: { taste: 0, durability: 0, appearance: 0 } },
moray_eel: { id: 'moray_eel', name: 'ウツボ', type: CropType.Fish, buyPrice: 200, baseSellPrice: 400, stats: { taste: 0, durability: 0, appearance: 0 } },
cherry_salmon: { id: 'cherry_salmon', name: 'アメマス', type: CropType.Fish, buyPrice: 160, baseSellPrice: 320, stats: { taste: 0, durability: 0, appearance: 0 } },
goatfish: { id: 'goatfish', name: 'ヒメジ', type: CropType.Fish, buyPrice: 90, baseSellPrice: 180, stats: { taste: 0, durability: 0, appearance: 0 } },
wrasse: { id: 'wrasse', name: 'ベラ', type: CropType.Fish, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
red_spotted_grouper: { id: 'red_spotted_grouper', name: 'キジハタ', type: CropType.Fish, buyPrice: 220, baseSellPrice: 440, stats: { taste: 0, durability: 0, appearance: 0 } },
halibut: { id: 'halibut', name: 'オヒョウ', type: CropType.Fish, buyPrice: 300, baseSellPrice: 600, stats: { taste: 0, durability: 0, appearance: 0 } },
ito: { id: 'ito', name: 'イトウ', type: CropType.Fish, buyPrice: 400, baseSellPrice: 800, stats: { taste: 0, durability: 0, appearance: 0 } },
yamame: { id: 'yamame', name: 'ヤマメ', type: CropType.Fish, buyPrice: 140, baseSellPrice: 280, stats: { taste: 0, durability: 0, appearance: 0 } },
oikawa: { id: 'oikawa', name: 'オイカワ', type: CropType.Fish, buyPrice: 70, baseSellPrice: 140, stats: { taste: 0, durability: 0, appearance: 0 } },
barracuda: { id: 'barracuda', name: 'カマス', type: CropType.Fish, buyPrice: 130, baseSellPrice: 260, stats: { taste: 0, durability: 0, appearance: 0 } },
gnomefish: { id: 'gnomefish', name: 'ムツ', type: CropType.Fish, buyPrice: 180, baseSellPrice: 360, stats: { taste: 0, durability: 0, appearance: 0 } },
red_stingray: { id: 'red_stingray', name: 'アカエイ', type: CropType.Fish, buyPrice: 150, baseSellPrice: 300, stats: { taste: 0, durability: 0, appearance: 0 } },
silver_whiting: { id: 'silver_whiting', name: 'シロギス', type: CropType.Fish, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
plotosus: { id: 'plotosus', name: 'ゴンズイ', type: CropType.Fish, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
cod: { id: 'cod', name: 'タラ', type: CropType.Fish, buyPrice: 110, baseSellPrice: 220, stats: { taste: 0, durability: 0, appearance: 0 } },
sand_borer: { id: 'sand_borer', name: 'キス', type: CropType.Fish, buyPrice: 90, baseSellPrice: 180, stats: { taste: 0, durability: 0, appearance: 0 } },
red_sea_bream: { id: 'red_sea_bream', name: 'アカムツ', type: CropType.Fish, buyPrice: 250, baseSellPrice: 500, stats: { taste: 0, durability: 0, appearance: 0 } },
spanish_mackerel: { id: 'spanish_mackerel', name: 'サワラ', type: CropType.Fish, buyPrice: 170, baseSellPrice: 340, stats: { taste: 0, durability: 0, appearance: 0 } },
flat_seabass: { id: 'flat_seabass', name: 'ヒラスズキ', type: CropType.Fish, buyPrice: 200, baseSellPrice: 400, stats: { taste: 0, durability: 0, appearance: 0 } },
ugui: { id: 'ugui', name: 'ウグイ', type: CropType.Fish, buyPrice: 80, baseSellPrice: 160, stats: { taste: 0, durability: 0, appearance: 0 } },
marlin: { id: 'marlin', name: 'カジキ', type: CropType.Fish, buyPrice: 400, baseSellPrice: 800, stats: { taste: 0, durability: 0, appearance: 0 } },
marbled_rockfish: { id: 'marbled_rockfish', name: 'メゴチ', type: CropType.Fish, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
goby: { id: 'goby', name: 'ハゼ', type: CropType.Fish, buyPrice: 70, baseSellPrice: 140, stats: { taste: 0, durability: 0, appearance: 0 } },
giant_pacific_octopus: { id: 'giant_pacific_octopus', name: 'ミズダコ', type: CropType.Fish, buyPrice: 280, baseSellPrice: 560, stats: { taste: 0, durability: 0, appearance: 0 } },
pacific_bluefin_tuna: { id: 'pacific_bluefin_tuna', name: 'クロマグロ', type: CropType.Fish, buyPrice: 500, baseSellPrice: 1000, stats: { taste: 0, durability: 0, appearance: 0 } },
guineafowl_puffer: { id: 'guineafowl_puffer', name: 'ネズミフグ', type: CropType.Fish, buyPrice: 220, baseSellPrice: 440, stats: { taste: 0, durability: 0, appearance: 0 } },
anthias: { id: 'anthias', name: 'ハナダイ', type: CropType.Fish, buyPrice: 130, baseSellPrice: 260, stats: { taste: 0, durability: 0, appearance: 0 } },
kawamutsu: { id: 'kawamutsu', name: 'カワムツ', type: CropType.Fish, buyPrice: 90, baseSellPrice: 180, stats: { taste: 0, durability: 0, appearance: 0 } },
hime_dai: { id: 'hime_dai', name: 'ヒメダイ', type: CropType.Fish, buyPrice: 160, baseSellPrice: 320, stats: { taste: 0, durability: 0, appearance: 0 } },
grouper: { id: 'grouper', name: 'マハタ', type: CropType.Fish, buyPrice: 300, baseSellPrice: 600, stats: { taste: 0, durability: 0, appearance: 0 } },
sea_snake: { id: 'sea_snake', name: 'ウミヘビ', type: CropType.Fish, buyPrice: 180, baseSellPrice: 360, stats: { taste: 0, durability: 0, appearance: 0 } },
japanese_barracuda: { id: 'japanese_barracuda', name: 'ヤマトカマス', type: CropType.Fish, buyPrice: 140, baseSellPrice: 280, stats: { taste: 0, durability: 0, appearance: 0 } },
walleye_pollock: { id: 'walleye_pollock', name: 'スケトウダラ', type: CropType.Fish, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
jewel_bass: { id: 'jewel_bass', name: 'ホウセキハタ', type: CropType.Fish, buyPrice: 350, baseSellPrice: 700, stats: { taste: 0, durability: 0, appearance: 0 } },
red_grouper: { id: 'red_grouper', name: 'アカハタ', type: CropType.Fish, buyPrice: 200, baseSellPrice: 400, stats: { taste: 0, durability: 0, appearance: 0 } },
japanese_common_squid: { id: 'japanese_common_squid', name: 'スルメイカ', type: CropType.Fish, buyPrice: 110, baseSellPrice: 220, stats: { taste: 0, durability: 0, appearance: 0 } },
red_queen_crab: { id: 'red_queen_crab', name: 'ベニズワイガニ', type: CropType.Fish, buyPrice: 250, baseSellPrice: 500, stats: { taste: 0, durability: 0, appearance: 0 } },
snow_crab: { id: 'snow_crab', name: 'ズワイガニ', type: CropType.Fish, buyPrice: 300, baseSellPrice: 600, stats: { taste: 0, durability: 0, appearance: 0 } },
sea_chub: { id: 'sea_chub', name: 'タカベ', type: CropType.Fish, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
black_rockfish: { id: 'black_rockfish', name: 'クロソイ', type: CropType.Fish, buyPrice: 150, baseSellPrice: 300, stats: { taste: 0, durability: 0, appearance: 0 } },
barracuda_mackerel: { id: 'barracuda_mackerel', name: 'カマスサワラ', type: CropType.Fish, buyPrice: 180, baseSellPrice: 360, stats: { taste: 0, durability: 0, appearance: 0 } },
armored_seabream: { id: 'armored_seabream', name: 'ヨロイアジ', type: CropType.Fish, buyPrice: 160, baseSellPrice: 320, stats: { taste: 0, durability: 0, appearance: 0 } },
northern_red_ray: { id: 'northern_red_ray', name: 'ナルトビエイ', type: CropType.Fish, buyPrice: 140, baseSellPrice: 280, stats: { taste: 0, durability: 0, appearance: 0 } },
halfbeak: { id: 'halfbeak', name: 'サヨリ', type: CropType.Fish, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
porcupinefish: { id: 'porcupinefish', name: 'ハリセンボン', type: CropType.Fish, buyPrice: 200, baseSellPrice: 400, stats: { taste: 0, durability: 0, appearance: 0 } },
drum_fish: { id: 'drum_fish', name: 'ニベ', type: CropType.Fish, buyPrice: 130, baseSellPrice: 260, stats: { taste: 0, durability: 0, appearance: 0 } },
murasoi: { id: 'murasoi', name: 'ムラソイ', type: CropType.Fish, buyPrice: 170, baseSellPrice: 340, stats: { taste: 0, durability: 0, appearance: 0 } },
takanohadai: { id: 'takanohadai', name: 'タカノハダイ', type: CropType.Fish, buyPrice: 150, baseSellPrice: 300, stats: { taste: 0, durability: 0, appearance: 0 } },
john_dory: { id: 'john_dory', name: 'マトウダイ', type: CropType.Fish, buyPrice: 220, baseSellPrice: 440, stats: { taste: 0, durability: 0, appearance: 0 } },
large_drum_fish: { id: 'large_drum_fish', name: 'オオニベ', type: CropType.Fish, buyPrice: 250, baseSellPrice: 500, stats: { taste: 0, durability: 0, appearance: 0 } },
yellow_seabream: { id: 'yellow_seabream', name: 'キダイ', type: CropType.Fish, buyPrice: 140, baseSellPrice: 280, stats: { taste: 0, durability: 0, appearance: 0 } },
medai: { id: 'medai', name: 'メダイ', type: CropType.Fish, buyPrice: 160, baseSellPrice: 320, stats: { taste: 0, durability: 0, appearance: 0 } },
bumphead_parrotfish: { id: 'bumphead_parrotfish', name: 'コブダイ', type: CropType.Fish, buyPrice: 300, baseSellPrice: 600, stats: { taste: 0, durability: 0, appearance: 0 } },
threadfin_bream: { id: 'threadfin_bream', name: 'キントキダイ', type: CropType.Fish, buyPrice: 180, baseSellPrice: 360, stats: { taste: 0, durability: 0, appearance: 0 } },
saury: { id: 'saury', name: 'サンマ', type: CropType.Fish, buyPrice: 200, baseSellPrice: 400, stats: { taste: 0, durability: 0, appearance: 0 } },
  eel: { id: 'eel', name: 'うなぎ', type: CropType.Fish, buyPrice: 800, baseSellPrice: 1600, stats: { taste: 0, durability: 0, appearance: 0 } },        
  beef_sirloin: { id: 'beef_sirloin', name: '牛(サーロイン)', type: CropType.Livestock, buyPrice: 300, baseSellPrice: 600, stats: { taste: 0, durability: 0, appearance: 0 } },
beef_fillet: { id: 'beef_fillet', name: '牛(ヒレ)', type: CropType.Livestock, buyPrice: 400, baseSellPrice: 800, stats: { taste: 0, durability: 0, appearance: 0 } },
beef_belly: { id: 'beef_belly', name: '牛(バラ)', type: CropType.Livestock, buyPrice: 200, baseSellPrice: 400, stats: { taste: 0, durability: 0, appearance: 0 } },
beef_thigh: { id: 'beef_thigh', name: '牛(モモ)', type: CropType.Livestock, buyPrice: 250, baseSellPrice: 500, stats: { taste: 0, durability: 0, appearance: 0 } },
beef_rump: { id: 'beef_rump', name: '牛(ランプ)', type: CropType.Livestock, buyPrice: 280, baseSellPrice: 560, stats: { taste: 0, durability: 0, appearance: 0 } },
beef_neck: { id: 'beef_neck', name: '牛(ネック)', type: CropType.Livestock, buyPrice: 150, baseSellPrice: 300, stats: { taste: 0, durability: 0, appearance: 0 } },
beef_shank: { id: 'beef_shank', name: '牛(スネ)', type: CropType.Livestock, buyPrice: 180, baseSellPrice: 360, stats: { taste: 0, durability: 0, appearance: 0 } },
beef_tail: { id: 'beef_tail', name: '牛(テール)', type: CropType.Livestock, buyPrice: 220, baseSellPrice: 440, stats: { taste: 0, durability: 0, appearance: 0 } },
pork_loin: { id: 'pork_loin', name: '豚(ロース)', type: CropType.Livestock, buyPrice: 200, baseSellPrice: 400, stats: { taste: 0, durability: 0, appearance: 0 } },
pork_belly: { id: 'pork_belly', name: '豚(バラ)', type: CropType.Livestock, buyPrice: 150, baseSellPrice: 300, stats: { taste: 0, durability: 0, appearance: 0 } },
pork_shoulder_loin: { id: 'pork_shoulder_loin', name: '豚(肩ロース)', type: CropType.Livestock, buyPrice: 180, baseSellPrice: 360, stats: { taste: 0, durability: 0, appearance: 0 } },
pork_fillet: { id: 'pork_fillet', name: '豚(ヒレ)', type: CropType.Livestock, buyPrice: 250, baseSellPrice: 500, stats: { taste: 0, durability: 0, appearance: 0 } },
pork_thigh: { id: 'pork_thigh', name: '豚(モモ)', type: CropType.Livestock, buyPrice: 170, baseSellPrice: 340, stats: { taste: 0, durability: 0, appearance: 0 } },
pork_spare_rib: { id: 'pork_spare_rib', name: '豚(スペアリブ)', type: CropType.Livestock, buyPrice: 220, baseSellPrice: 440, stats: { taste: 0, durability: 0, appearance: 0 } },
pork_hormone: { id: 'pork_hormone', name: '豚(ホルモン)', type: CropType.Livestock, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
pork_ear: { id: 'pork_ear', name: '豚(耳)', type: CropType.Livestock, buyPrice: 80, baseSellPrice: 160, stats: { taste: 0, durability: 0, appearance: 0 } },
pork_foot: { id: 'pork_foot', name: '豚(足)', type: CropType.Livestock, buyPrice: 90, baseSellPrice: 180, stats: { taste: 0, durability: 0, appearance: 0 } },
pork_heart: { id: 'pork_heart', name: '豚(ハツ)', type: CropType.Livestock, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
chicken_wing_meat: { id: 'chicken_wing_meat', name: 'にわとり(手羽元)', type: CropType.Livestock, buyPrice: 120, baseSellPrice: 240, stats: { taste: 0, durability: 0, appearance: 0 } },
chicken_wing_tip: { id: 'chicken_wing_tip', name: 'にわとり(手羽先)', type: CropType.Livestock, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
chicken_thigh: { id: 'chicken_thigh', name: 'にわとり(もも)', type: CropType.Livestock, buyPrice: 150, baseSellPrice: 300, stats: { taste: 0, durability: 0, appearance: 0 } },
chicken_breast: { id: 'chicken_breast', name: 'にわとり(むね)', type: CropType.Livestock, buyPrice: 130, baseSellPrice: 260, stats: { taste: 0, durability: 0, appearance: 0 } },
chicken_tenderloin: { id: 'chicken_tenderloin', name: 'にわとり(ささみ)', type: CropType.Livestock, buyPrice: 160, baseSellPrice: 320, stats: { taste: 0, durability: 0, appearance: 0 } },
chicken_tail: { id: 'chicken_tail', name: 'にわとり(ぼんじり)', type: CropType.Livestock, buyPrice: 90, baseSellPrice: 180, stats: { taste: 0, durability: 0, appearance: 0 } },
chicken_liver: { id: 'chicken_liver', name: 'にわとり(レバー)', type: CropType.Livestock, buyPrice: 110, baseSellPrice: 220, stats: { taste: 0, durability: 0, appearance: 0 } },
chicken_gizzard: { id: 'chicken_gizzard', name: 'にわとり(砂肝)', type: CropType.Livestock, buyPrice: 100, baseSellPrice: 200, stats: { taste: 0, durability: 0, appearance: 0 } },
chicken_heart: { id: 'chicken_heart', name: 'にわとり(ハツ)', type: CropType.Livestock, buyPrice: 110, baseSellPrice: 220, stats: { taste: 0, durability: 0, appearance: 0 } },
chicken_cartilage: { id: 'chicken_cartilage', name: 'にわとり(ナンコツ)', type: CropType.Livestock, buyPrice: 80, baseSellPrice: 160, stats: { taste: 0, durability: 0, appearance: 0 } },
horse_loin: { id: 'horse_loin', name: '馬(ロース)', type: CropType.Livestock, buyPrice: 300, baseSellPrice: 600, stats: { taste: 0, durability: 0, appearance: 0 } },
horse_fillet: { id: 'horse_fillet', name: '馬(ヒレ)', type: CropType.Livestock, buyPrice: 350, baseSellPrice: 700, stats: { taste: 0, durability: 0, appearance: 0 } },
horse_thigh: { id: 'horse_thigh', name: '馬(モモ)', type: CropType.Livestock, buyPrice: 280, baseSellPrice: 560, stats: { taste: 0, durability: 0, appearance: 0 } },
horse_belly: { id: 'horse_belly', name: '馬(バラ)', type: CropType.Livestock, buyPrice: 200, baseSellPrice: 400, stats: { taste: 0, durability: 0, appearance: 0 } },
horse_neck: { id: 'horse_neck', name: '馬(ネック)', type: CropType.Livestock, buyPrice: 180, baseSellPrice: 360, stats: { taste: 0, durability: 0, appearance: 0 } },
horse_sinew: { id: 'horse_sinew', name: '馬(スジ)', type: CropType.Livestock, buyPrice: 150, baseSellPrice: 300, stats: { taste: 0, durability: 0, appearance: 0 } },
horse_tongue: { id: 'horse_tongue', name: '馬(タン)', type: CropType.Livestock, buyPrice: 250, baseSellPrice: 500, stats: { taste: 0, durability: 0, appearance: 0 } },
horse_liver: { id: 'horse_liver', name: '馬(レバー)', type: CropType.Livestock, buyPrice: 200, baseSellPrice: 400, stats: { taste: 0, durability: 0, appearance: 0 } },
horse_heart: { id: 'horse_heart', name: '馬(ハツ)', type: CropType.Livestock, buyPrice: 220, baseSellPrice: 440, stats: { taste: 0, durability: 0, appearance: 0 } },
horse_diaphragm: { id: 'horse_diaphragm', name: '馬(フタエゴ)', type: CropType.Livestock, buyPrice: 180, baseSellPrice: 360, stats: { taste: 0, durability: 0, appearance: 0 } },
wild_boar_loin: { id: 'wild_boar_loin', name: 'いのしし(ロース)', type: CropType.Livestock, buyPrice: 280, baseSellPrice: 560, stats: { taste: 0, durability: 0, appearance: 0 } },
wild_boar_belly: { id: 'wild_boar_belly', name: 'いのしし(バラ)', type: CropType.Livestock, buyPrice: 200, baseSellPrice: 400, stats: { taste: 0, durability: 0, appearance: 0 } },
wild_boar_thigh: { id: 'wild_boar_thigh', name: 'いのしし(モモ)', type: CropType.Livestock, buyPrice: 250, baseSellPrice: 500, stats: { taste: 0, durability: 0, appearance: 0 } },
wild_boar_shoulder_loin: { id: 'wild_boar_shoulder_loin', name: 'いのしし(肩ロース)', type: CropType.Livestock, buyPrice: 230, baseSellPrice: 460, stats: { taste: 0, durability: 0, appearance: 0 } },
wild_boar_shank: { id: 'wild_boar_shank', name: 'いのしし(スネ)', type: CropType.Livestock, buyPrice: 180, baseSellPrice: 360, stats: { taste: 0, durability: 0, appearance: 0 } },
wild_boar_neck: { id: 'wild_boar_neck', name: 'いのしし(ネック)', type: CropType.Livestock, buyPrice: 160, baseSellPrice: 320, stats: { taste: 0, durability: 0, appearance: 0 } },
wild_boar_fillet: { id: 'wild_boar_fillet', name: 'いのしし(ヒレ)', type: CropType.Livestock, buyPrice: 300, baseSellPrice: 600, stats: { taste: 0, durability: 0, appearance: 0 } },
wild_boar_heart: { id: 'wild_boar_heart', name: 'いのしし(ハツ)', type: CropType.Livestock, buyPrice: 150, baseSellPrice: 300, stats: { taste: 0, durability: 0, appearance: 0 } },
wild_boar_liver: { id: 'wild_boar_liver', name: 'いのしし(レバー)', type: CropType.Livestock, buyPrice: 140, baseSellPrice: 280, stats: { taste: 0, durability: 0, appearance: 0 } },
wild_boar_tongue: { id: 'wild_boar_tongue', name: 'いのしし(タン)', type: CropType.Livestock, buyPrice: 200, baseSellPrice: 400, stats: { taste: 0, durability: 0, appearance: 0 } },
deer_loin: { id: 'deer_loin', name: 'しか(ロース)', type: CropType.Livestock, buyPrice: 3200, baseSellPrice: 6040, stats: { taste: 0, durability: 0, appearance: 0 } },
deer_thigh: { id: 'deer_thigh', name: 'しか(モモ)', type: CropType.Livestock, buyPrice: 3000, baseSellPrice: 6000, stats: { taste: 0, durability: 0, appearance: 0 } },
deer_belly: { id: 'deer_belly', name: 'しか(バラ)', type: CropType.Livestock, buyPrice: 2200, baseSellPrice: 4400, stats: { taste: 0, durability: 0, appearance: 0 } },
deer_fillet: { id: 'deer_fillet', name: 'しか(ヒレ)', type: CropType.Livestock, buyPrice: 3500, baseSellPrice: 7000, stats: { taste: 0, durability: 0, appearance: 0 } },
deer_shank: { id: 'deer_shank', name: 'しか(スネ)', type: CropType.Livestock, buyPrice: 2000, baseSellPrice: 4000, stats: { taste: 0, durability: 0, appearance: 0 } },
deer_neck: { id: 'deer_neck', name: 'しか(ネック)', type: CropType.Livestock, buyPrice: 1080, baseSellPrice: 3060, stats: { taste: 0, durability: 0, appearance: 0 } },
deer_tongue: { id: 'deer_tongue', name: 'しか(タン)', type: CropType.Livestock, buyPrice: 2500, baseSellPrice: 5000, stats: { taste: 0, durability: 0, appearance: 0 } },
deer_heart: { id: 'deer_heart', name: 'しか(ハツ)', type: CropType.Livestock, buyPrice: 2000, baseSellPrice: 4000, stats: { taste: 0, durability: 0, appearance: 0 } },
deer_liver: { id: 'deer_liver', name: 'しか(レバー)', type: CropType.Livestock, buyPrice: 1900, baseSellPrice: 3800, stats: { taste: 0, durability: 0, appearance: 0 } },
deer_rib_loin: { id: 'deer_rib_loin', name: 'しか(リブロース)', type: CropType.Livestock, buyPrice: 3040, baseSellPrice: 6800, stats: { taste: 0, durability: 0, appearance: 0 } },
  beef_loin: { id: 'beef_loin', name: '牛(ロース)', type: CropType.Livestock, buyPrice: 1000, baseSellPrice: 2000, stats: { taste: 0, durability: 0, appearance: 0 } },
};

export const INITIAL_PRODUCTS: Record<string, Product> = {
    apple_pie: { id: 'apple_pie', name: 'アップルパイ', sellPrice: 500, recipe: { apple: 10 } },
  spinach_and_komatsuna_green_dance: { id: 'spinach_and_komatsuna_green_dance', name: 'ホウレンソウと小松菜の緑のダンス', sellPrice: 6000, recipe: { spinach: 2, komatsuna: 2 } },
chingensai_and_mizuna_spring_bowl: { id: 'chingensai_and_mizuna_spring_bowl', name: 'チンゲンサイと水菜の春の息吹き丼', sellPrice: 6000, recipe: { chingensai: 2, mizuna: 2 } },
shungiku_and_mitsuba_japanese_risotto: { id: 'shungiku_and_mitsuba_japanese_risotto', name: '春菊とミツバの和風リゾット', sellPrice: 7600, recipe: { shungiku: 2, mitsuba: 2 } },
mini_tomato_and_paprika_sun_marinate: { id: 'mini_tomato_and_paprika_sun_marinate', name: 'ミニトマトとパプリカの太陽のマリネ', sellPrice: 10800, recipe: { mini_tomato: 2, paprika: 2 } },
eggplant_and_zucchini_purple_green_confit: { id: 'eggplant_and_zucchini_purple_green_confit', name: 'ナスとズッキーニの紫と緑のコンフィ', sellPrice: 7200, recipe: { eggplant: 2, zucchini: 2 } },
green_pepper_and_okra_summer_grill: { id: 'green_pepper_and_okra_summer_grill', name: 'ピーマンとオクラの夏畑のグリル', sellPrice: 6000, recipe: { green_pepper: 2, okra: 2 } },
bitter_melon_and_shishito_pepper_cool_stir_fry: { id: 'bitter_melon_and_shishito_pepper_cool_stir_fry', name: 'ゴーヤとシシトウの涼しげな炒め物', sellPrice: 8400, recipe: { bitter_melon: 2, shishito_pepper: 2 } },
pumpkin_and_sweet_potato_hearty_stew: { id: 'pumpkin_and_sweet_potato_hearty_stew', name: 'カボチャとサツマイモのほっこり煮', sellPrice: 8400, recipe: { pumpkin: 2, sweet_potato: 2 } },
potato_and_taro_earth_potage: { id: 'potato_and_taro_earth_potage', name: 'ジャガイモとサトイモの大地のポタージュ', sellPrice: 5000, recipe: { potato: 2, taro: 2 } },
yam_and_lotus_root_sticky_salad: { id: 'yam_and_lotus_root_sticky_salad', name: 'ヤマイモとレンコンのねばねば和え', sellPrice: 8800, recipe: { yam: 2, lotus_root: 2 } },
daikon_radish_and_burdock_flavorful_stew: { id: 'daikon_radish_and_burdock_flavorful_stew', name: 'ダイコンとゴボウの風味しみしみ煮', sellPrice: 6000, recipe: { daikon_radish: 2, burdock: 2 } },
celery_and_asparagus_crunchy_salad: { id: 'celery_and_asparagus_crunchy_salad', name: 'セロリとアスパラガスのシャキシャキサラダ', sellPrice: 12000, recipe: { celery: 2, asparagus: 2 } },
onion_and_garlic_sweet_sauce: { id: 'onion_and_garlic_sweet_sauce', name: 'タマネギとニンニクの甘みじっくりソース', sellPrice: 6000, recipe: { onion: 2, garlic: 2 } },
ginger_and_green_onion_seasoning_soup: { id: 'ginger_and_green_onion_seasoning_soup', name: 'ショウガとネギの薬味たっぷりスープ', sellPrice: 7200, recipe: { ginger: 2, green_onion: 2 } },
wakegi_and_rakkyo_small_accent: { id: 'wakegi_and_rakkyo_small_accent', name: 'ワケギとラッキョウの小粒アクセント', sellPrice: 6000, recipe: { wakegi: 2, rakkyo: 2 } },
shallot_and_pea_french_flavor: { id: 'shallot_and_pea_french_flavor', name: 'エシャロットとエンドウのフレンチ風味', sellPrice: 6800, recipe: { shallot: 2, pea: 2 } },
broad_bean_and_green_bean_bean_feast: { id: 'broad_bean_and_green_bean_bean_feast', name: 'ソラマメとサヤインゲンの豆たちの饗宴', sellPrice: 7200, recipe: { broad_bean: 2, green_bean: 2 } },
snap_pea_and_corn_sweet_stir_fry: { id: 'snap_pea_and_corn_sweet_stir_fry', name: 'スナップエンドウとトウモロコシの甘み炒め', sellPrice: 7600, recipe: { snap_pea: 2, corn: 2 } },
edamame_and_shiso_japanese_tempura: { id: 'edamame_and_shiso_japanese_tempura', name: 'エダマメとシソの和の香り天ぷら', sellPrice: 10800, recipe: { edamame: 2, shiso: 2 } },
mitsuba_and_basil_japanese_western_harmony: { id: 'mitsuba_and_basil_japanese_western_harmony', name: 'ミツバとバジルの和洋ハーモニー', sellPrice: 8800, recipe: { mitsuba: 2, basil: 2 } },
parsley_and_dill_herb_paradise: { id: 'parsley_and_dill_herb_paradise', name: 'パセリとディルの香草の楽園', sellPrice: 92000, recipe: { parsley: 2, dill: 2 } },
fennel_and_rosemary_mediterranean_grill: { id: 'fennel_and_rosemary_mediterranean_grill', name: 'フェンネルとローズマリーの地中海香るグリル', sellPrice: 12800, recipe: { fennel: 2, rosemary: 2 } },
thyme_and_sage_herb_garden_chicken: { id: 'thyme_and_sage_herb_garden_chicken', name: 'タイムとセージのハーブ畑のチキン', sellPrice: 14000, recipe: { thyme: 2, sage: 2, chicken_breast: 2 } },
coriander_and_arugula_ethnic_salad: { id: 'coriander_and_arugula_ethnic_salad', name: 'コリアンダーとルッコラのエスニックサラダ', sellPrice: 8000, recipe: { coriander: 2, arugula: 2 } },
artichoke_and_radish_western_appetizer: { id: 'artichoke_and_radish_western_appetizer', name: 'アーティチョークとラディッシュの洋風前菜', sellPrice: 12400, recipe: { artichoke: 2, radish: 2 } },
watercress_and_ice_plant_waterside_salad: { id: 'watercress_and_ice_plant_waterside_salad', name: 'クレソンとアイスプラントの水辺のサラダ', sellPrice: 10000, recipe: { watercress: 2, ice_plant: 2 } },
molokheiya_and_chorogi_sticky_bowl: { id: 'molokheiya_and_chorogi_sticky_bowl', name: 'モロヘイヤとチョロギのネバネバ丼', sellPrice: 8800, recipe: { molokheiya: 2, chorogi: 2 } },
wasabi_and_ginger_refreshing_salad: { id: 'wasabi_and_ginger_refreshing_salad', name: 'ワサビとショウガの爽快和え物', sellPrice: 16800, recipe: { wasabi: 2, ginger: 2 } },
truffle_and_mushroom_aromatic_pasta: { id: 'truffle_and_mushroom_aromatic_pasta', name: 'トリュフとマッシュルームの芳香パスタ', sellPrice: 46000, recipe: { truffle: 2, mushroom: 2 } },
shiitake_and_eringi_forest_saute: { id: 'shiitake_and_eringi_forest_saute', name: 'シイタケとエリンギの森の香り炒め', sellPrice: 14000, recipe: { shiitake: 2, eringi: 2 } },
maitake_and_shimeji_autumn_mushroom_hot_pot: { id: 'maitake_and_shimeji_autumn_mushroom_hot_pot', name: 'マイタケとシメジの秋のきのこ鍋', sellPrice: 11000, recipe: { maitake: 2, shimeji: 2 } },
nameko_and_kikurage_smooth_soup: { id: 'nameko_and_kikurage_smooth_soup', name: 'ナメコとキクラゲのつるんと汁物', sellPrice: 8800, recipe: { nameko: 2, kikurage: 2 } },
enoki_and_sprout_crunchy_salad: { id: 'enoki_and_sprout_crunchy_salad', name: 'エノキとスプラウトのシャキシャキ和え', sellPrice: 6000, recipe: { enoki: 2, sprout: 2 } },
kaiware_daikon_and_sprout_refreshing_salad: { id: 'kaiware_daikon_and_sprout_refreshing_salad', name: 'カイワレダイコンと貝割れの爽快サラダ', sellPrice: 3600, recipe: { kaiware_daikon: 2, sprout: 2 } },
beet_and_swiss_chard_colorful_roast: { id: 'beet_and_swiss_chard_colorful_roast', name: 'ビーツとスイスチャードの色鮮やかロースト', sellPrice: 8800, recipe: { beet: 2, swiss_chard: 2 } },
hakusai_and_kohlrabi_light_pickle_salad: { id: 'hakusai_and_kohlrabi_light_pickle_salad', name: '白菜とコールラビの浅漬けサラダ', sellPrice: 7200, recipe: { hakusai: 2, kohlrabi: 2 } },
bamboo_shoot_and_kuwai_spring_simmer: { id: 'bamboo_shoot_and_kuwai_spring_simmer', name: 'タケノコとクワイの春の煮物', sellPrice: 12800, recipe: { bamboo_shoot: 2, kuwai: 2 } },
yacon_and_cassava_exotic_salad: { id: 'yacon_and_cassava_exotic_salad', name: 'ヤーコンとキャッサバのエキゾチックサラダ', sellPrice: 9200, recipe: { yacon: 2, cassava: 2 } },
sesame_and_sunflower_seed_nutty_dressing: { id: 'sesame_and_sunflower_seed_nutty_dressing', name: 'ゴマとひまわりの種の香ばしドレッシング', sellPrice: 8800, recipe: { sesame: 2, sunflower_seed: 2 } },
kale_and_romanesco_green_power_smoothie: { id: 'kale_and_romanesco_green_power_smoothie', name: 'ケールとロマネスコの緑のパワースムージー', sellPrice: 11200, recipe: { kale: 2, romanesco: 2 } },
chestnut_pumpkin_and_western_pumpkin_sweet_potage: { id: 'chestnut_pumpkin_and_western_pumpkin_sweet_potage', name: '栗かぼちゃと西洋かぼちゃの甘み比べポタージュ', sellPrice: 124000, recipe: { chestnut_pumpkin: 2, western_pumpkin: 2 } },
luffa_and_fudansou_rare_stir_fry: { id: 'luffa_and_fudansou_rare_stir_fry', name: 'ヘチマとフダンソウの珍味炒め', sellPrice: 7600, recipe: { luffa: 2, fudansou: 2 } },
jalapeno_pepper_and_habanero_pepper_fire_sauce: { id: 'jalapeno_pepper_and_habanero_pepper_fire_sauce', name: 'ハラペーニョとハバネロの炎のソース', sellPrice: 10000, recipe: { jalapeno_pepper: 2, habanero_pepper: 2 } },
cayenne_pepper_and_radish_red_white_spicy_marinate: { id: 'cayenne_pepper_and_radish_red_white_spicy_marinate', name: 'カイエンと紅白ラディッシュのピリ辛マリネ', sellPrice: 76000, recipe: { cayenne_pepper: 2, radish_red_white: 2 } },
salad_greens_and_microgreen_delicate_salad: { id: 'salad_greens_and_microgreen_delicate_salad', name: 'サラダ菜とマイクログリーンの繊細サラダ', sellPrice: 11000, recipe: { salad_greens: 2, microgreen: 2 } },
suizenjina_and_spinach_green_gratin: { id: 'suizenjina_and_spinach_green_gratin', name: '水前寺菜とホウレンソウの緑のグラタン', sellPrice: 7600, recipe: { suizenjina: 2, spinach: 2 } },
apple_and_tomato_sweet_sour_compote: { id: 'apple_and_tomato_sweet_sour_compote', name: 'りんごとトマトの甘酸っぱいコンポート', sellPrice: 7000, recipe: { apple: 2, tomato: 2 } },
carrot_and_grape_orange_risotto: { id: 'carrot_and_grape_orange_risotto', name: 'にんじんとぶどうのオレンジ色のリゾット', sellPrice: 7200, recipe: { carrot: 2, grape: 2 } },
orange_and_banana_sun_fruit_salad: { id: 'orange_and_banana_sun_fruit_salad', name: 'オレンジとバナナの太陽のフルーツサラダ', sellPrice: 7200, recipe: { orange: 2, banana: 2 } },
mango_and_peach_tropical_dessert: { id: 'mango_and_peach_tropical_dessert', name: 'マンゴーとももの南国風デザート', sellPrice: 14000, recipe: { mango: 2, peach: 2 } },
cherry_and_pineapple_red_yellow_tart: { id: 'cherry_and_pineapple_red_yellow_tart', name: 'さくらんぼとパイナップルの赤と黄色のタルト', sellPrice: 17200, recipe: { cherry: 2, pineapple: 2 } },
strawberry_and_melon_sweet_jewel_box: { id: 'strawberry_and_melon_sweet_jewel_box', name: 'イチゴとメロンの甘い宝石箱', sellPrice: 16800, recipe: { strawberry: 2, melon: 2 } },
watermelon_and_lemon_refreshing_drink: { id: 'watermelon_and_lemon_refreshing_drink', name: 'スイカとレモンの爽快ドリンク', sellPrice: 11000, recipe: { watermelon: 2, lemon: 2 } },
lime_and_kiwi_sour_sherbet: { id: 'lime_and_kiwi_sour_sherbet', name: 'ライムとキウイの酸っぱいシャーベット', sellPrice: 8000, recipe: { lime: 2, kiwi: 2 } },
blueberry_and_raspberry_berry_parfait: { id: 'blueberry_and_raspberry_berry_parfait', name: 'ブルーベリーとラズベリーのベリーパフェ', sellPrice: 12000, recipe: { blueberry: 2, raspberry: 2 } },
blackberry_and_apricot_deep_jam: { id: 'blackberry_and_apricot_deep_jam', name: 'ブラックベリーとアプリコットの深みのジャム', sellPrice: 12000, recipe: { blackberry: 2, apricot: 2 } },
prune_and_persimmon_japanese_compote: { id: 'prune_and_persimmon_japanese_compote', name: 'プルーンと柿の和風コンポート', sellPrice: 10000, recipe: { prune: 2, persimmon: 2 } },
pear_and_pomegranate_moist_salad: { id: 'pear_and_pomegranate_moist_salad', name: '梨とザクロのみずみずしいサラダ', sellPrice: 11200, recipe: { pear: 2, pomegranate: 2 } },
grapefruit_and_dragon_fruit_vitamin_cocktail: { id: 'grapefruit_and_dragon_fruit_vitamin_cocktail', name: 'グレープフルーツとドラゴンフルーツのビタミンカクテル', sellPrice: 168000, recipe: { grapefruit: 2, dragon_fruit: 2 } },
passion_fruit_and_mangosteen_tropical_dessert: { id: 'passion_fruit_and_mangosteen_tropical_dessert', name: 'パッションフルーツとマンゴスチンのトロピカルデザート', sellPrice: 260000, recipe: { passion_fruit: 2, mangosteen: 2 } },
coconut_and_cacao_rich_mousse: { id: 'coconut_and_cacao_rich_mousse', name: 'ココナッツとカカオのリッチなムース', sellPrice: 14000, recipe: { coconut: 2, cacao: 2 } },
feijoa_and_mulberry_rare_jam: { id: 'feijoa_and_mulberry_rare_jam', name: 'フェイジョアとクワの珍しいジャム', sellPrice: 2000, recipe: { feijoa: 2, mulberry: 2 } },
nectarine_and_quince_baked_fruit: { id: 'nectarine_and_quince_baked_fruit', name: 'ネクタリンとマルメロの焼きフルーツ', sellPrice: 12000, recipe: { nectarine: 2, quince: 2 } },
pawpaw_and_finger_lime_exotic_salad: { id: 'pawpaw_and_finger_lime_exotic_salad', name: 'ポポーとフィンガーライムのエキゾチックサラダ', sellPrice: 14800, recipe: { pawpaw: 2, finger_lime: 2 } },
star_fruit_and_jackfruit_mystery_dessert: { id: 'star_fruit_and_jackfruit_mystery_dessert', name: 'スターフルーツとジャックフルーツの不思議デザート', sellPrice: 24000, recipe: { star_fruit: 2, jackfruit: 2 } },
durian_and_tamarillo_strong_marinate: { id: 'durian_and_tamarillo_strong_marinate', name: 'ドリアンとタマリロの強烈マリネ', sellPrice: 28000, recipe: { durian: 2, tamarillo: 2 } },
acerola_and_gumi_vitamin_bomb: { id: 'acerola_and_gumi_vitamin_bomb', name: 'アセロラとグミの実のビタミン爆弾', sellPrice: 12000, recipe: { acerola: 2, gumi: 2 } },
rose_hip_and_white_sapote_herb_tea_jelly: { id: 'rose_hip_and_white_sapote_herb_tea_jelly', name: 'ローズヒップとホワイトサポテのハーブティーゼリー', sellPrice: 14000, recipe: { rose_hip: 2, white_sapote: 2 } },
cherimoya_and_rambutan_creamy_dessert: { id: 'cherimoya_and_rambutan_creamy_dessert', name: 'チェリモヤとランブータンのクリーミーデザート', sellPrice: 22000, recipe: { cherimoya: 2, rambutan: 2 } },
sapodilla_and_jaboticaba_south_american_fruit_plate: { id: 'sapodilla_and_jaboticaba_south_american_fruit_plate', name: 'サポジラとジャボチカバの南米フルーツプレート', sellPrice: 160000, recipe: { sapodilla: 2, jaboticaba: 2 } },
carambola_and_camellia_fruit_garnish: { id: 'carambola_and_camellia_fruit_garnish', name: 'カランボラとヤブツバキの実の飾り切り', sellPrice: 12000, recipe: { carambola: 2, camellia_fruit: 2 } },
guava_and_currant_tropical_sauce: { id: 'guava_and_currant_tropical_sauce', name: 'グアバとスグリのトロピカルソース', sellPrice: 10800, recipe: { guava: 2, currant: 2 } },
horse_mackerel_and_mackerel_japanese_marinate: { id: 'horse_mackerel_and_mackerel_japanese_marinate', name: 'アジとサバの和風マリネ', sellPrice: 6000, recipe: { horse_mackerel: 2, mackerel: 2 } },
tuna_and_sea_bream_luxurious_bowl: { id: 'tuna_and_sea_bream_luxurious_bowl', name: 'マグロとタイの豪華づくし丼', sellPrice: 20000, recipe: { tuna: 2, sea_bream: 2 } },
flounder_and_bonito_skillful_sear: { id: 'flounder_and_bonito_skillful_sear', name: 'ヒラメとカツオのわざと炙り', sellPrice: 16000, recipe: { flounder: 2, bonito: 2 } },
yellowtail_and_amberjack_cold_selection: { id: 'yellowtail_and_amberjack_cold_selection', name: 'ブリとカンパチの寒じめ盛り合わせ', sellPrice: 16000, recipe: { yellowtail: 2, amberjack: 2 } },
kelp_bass_and_blackthroat_seaperch_premium_simmer: { id: 'kelp_bass_and_blackthroat_seaperch_premium_simmer', name: 'クエとノドグロの高級煮付け', sellPrice: 36000, recipe: { kelp_bass: 2, blackthroat_seaperch: 2 } },
abalone_and_scallop_shell_steam: { id: 'abalone_and_scallop_shell_steam', name: 'アワビとホタテの貝尽くし蒸し', sellPrice: 18000, recipe: { abalone: 2, scallop: 2 } },
crab_and_shrimp_seafood_paella: { id: 'crab_and_shrimp_seafood_paella', name: 'カニとエビの海鮮パエリア', sellPrice: 12000, recipe: { crab: 2, shrimp: 2 } },
squid_and_octopus_mediterranean_grill: { id: 'squid_and_octopus_mediterranean_grill', name: 'イカとタコの地中海風グリル', sellPrice: 9600, recipe: { squid: 2, octopus: 2 } },
smelt_and_pufferfish_rare_fry: { id: 'smelt_and_pufferfish_rare_fry', name: 'シシャモとフグの珍味揚げ', sellPrice: 14400, recipe: { smelt: 2, pufferfish: 2 } },
conger_eel_and_anglerfish_deep_hot_pot: { id: 'conger_eel_and_anglerfish_deep_hot_pot', name: 'ハモとアンコウの深みある鍋', sellPrice: 17200, recipe: { conger_eel: 2, anglerfish: 2 } },
rockfish_and_alfonsin_salt_grill_assortment: { id: 'rockfish_and_alfonsin_salt_grill_assortment', name: 'メバルとキンメダイの塩焼き盛り合わせ', sellPrice: 12000, recipe: { rockfish: 2, alfonsin: 2 } },
okhotsk_atka_mackerel_and_sea_bass_dried_plate: { id: 'okhotsk_atka_mackerel_and_sea_bass_dried_plate', name: 'ホッケとスズキの干物プレート', sellPrice: 10000, recipe: { okhotsk_atka_mackerel: 2, sea_bass: 2 } },
greenling_and_mahi_mahi_white_fry: { id: 'greenling_and_mahi_mahi_white_fry', name: 'アイナメとシイラの白身フライ', sellPrice: 12000, recipe: { greenling: 2, mahi_mahi: 2 } },
mullet_and_catfish_fry_two_kinds: { id: 'mullet_and_catfish_fry_two_kinds', name: 'ボラとナマズの揚げ物二種', sellPrice: 7200, recipe: { mullet: 2, catfish: 2 } },
cornetfish_and_devil_stinger_aspic: { id: 'cornetfish_and_devil_stinger_aspic', name: 'ヤガラとオコゼの煮凝り', sellPrice: 12000, recipe: { cornetfish: 2, devil_stinger: 2 } },
lionfish_and_hairtail_showy_grill: { id: 'lionfish_and_hairtail_showy_grill', name: 'ミノカサゴとタチウオの華やかグリル', sellPrice: 12800, recipe: { lionfish: 2, hairtail: 2 } },
flathead_and_filefish_liver_salad: { id: 'flathead_and_filefish_liver_salad', name: 'コチとカワハギの肝和え', sellPrice: 9600, recipe: { flathead: 2, filefish: 2 } },
pleuronectidae_and_salmon_butter_saute: { id: 'pleuronectidae_and_salmon_butter_saute', name: 'カレイとサケのバターソテー', sellPrice: 10000, recipe: { pleuronectidae: 2, salmon: 2 } },
mantis_shrimp_and_sea_squirt_sea_pasta: { id: 'mantis_shrimp_and_sea_squirt_sea_pasta', name: 'シャコとホヤの磯香るパスタ', sellPrice: 8400, recipe: { mantis_shrimp: 2, sea_squirt: 2 } },
flying_fish_and_blenny_light_marinate: { id: 'flying_fish_and_blenny_light_marinate', name: 'トビウオとギンポのさっぱりマリネ', sellPrice: 7600, recipe: { flying_fish: 2, blenny: 2 } },
sea_robin_and_black_sea_bream_tide_soup: { id: 'sea_robin_and_black_sea_bream_tide_soup', name: 'ホウボウとクロダイの潮汁', sellPrice: 10400, recipe: { sea_robin: 2, black_sea_bream: 2 } },
surfperch_and_loach_country_simmer: { id: 'surfperch_and_loach_country_simmer', name: 'ウミタナゴとドジョウの田舎風煮', sellPrice: 6400, recipe: { surfperch: 2, loach: 2 } },
moray_eel_and_cherry_salmon_intimidating_grill: { id: 'moray_eel_and_cherry_salmon_intimidating_grill', name: 'ウツボとアメマスの強面グリル', sellPrice: 14000, recipe: { moray_eel: 2, cherry_salmon: 2 } },
goatfish_and_wrasse_tropical_salad: { id: 'goatfish_and_wrasse_tropical_salad', name: 'ヒメジとベラの南国風サラダ', sellPrice: 7600, recipe: { goatfish: 2, wrasse: 2 } },
red_spotted_grouper_and_halibut_steamed_dish: { id: 'red_spotted_grouper_and_halibut_steamed_dish', name: 'キジハタとオヒョウの蒸し物', sellPrice: 20000, recipe: { red_spotted_grouper: 2, halibut: 2 } },
ito_and_yamame_river_fish_fry: { id: 'ito_and_yamame_river_fish_fry', name: 'イトウとヤマメの川魚フライ', sellPrice: 21000, recipe: { ito: 2, yamame: 2 } },
oikawa_and_barracuda_karaage: { id: 'oikawa_and_barracuda_karaage', name: 'オイカワとカマスのから揚げ', sellPrice: 8000, recipe: { oikawa: 2, barracuda: 2 } },
beef_loin_and_pork_belly_meaty_stew: { id: 'beef_loin_and_pork_belly_meaty_stew', name: '牛ロースと豚バラの肉々しい煮込み', sellPrice: 46000, recipe: { beef_loin: 2, pork_belly: 2 } },
  tomato_soup: { id: 'tomato_soup', name: 'トマトスープ', sellPrice: 400, recipe: { tomato: 10 } },
    grilled_saury: { id: 'grilled_saury', name: 'サンマの塩焼き', sellPrice: 800, recipe: { saury: 10 } },
    eel_bowl: { id: 'eel_bowl', name: 'うな重', sellPrice: 3500, recipe: { eel: 10 } },
};

export const INITIAL_COMPANIES: Record<string, CompanyInfo> = {
  
  Tokiwa_Table: { id: 'Tokiwa_Table', name: 'トキワテーブル', baseMarketValue: 250000, products: ['spinach_and_komatsuna_green_dance', 'chingensai_and_mizuna_spring_bowl', 'shungiku_and_mitsuba_japanese_risotto', 'mini_tomato_and_paprika_sun_marinate'] },
  Cafe_Nord: { id: 'Cafe_Nord', name: 'カフェ・ノルド', baseMarketValue: 250000, products: ['eggplant_and_zucchini_purple_green_confit', 'green_pepper_and_okra_summer_grill', 'bitter_melon_and_shishito_pepper_cool_stir_fry', 'pumpkin_and_sweet_potato_hearty_stew'] },
  Yamato_Diner: { id: 'Yamato_Diner', name: 'ヤマトダイナー', baseMarketValue: 250000, products: ['potato_and_taro_earth_potage', 'yam_and_lotus_root_sticky_salad', 'daikon_radish_and_burdock_flavorful_stew', 'celery_and_asparagus_crunchy_salad'] },
  Lodge_Haruna: { id: 'Lodge_Haruna', name: 'ロッジ・ハルナ', baseMarketValue: 250000, products: ['onion_and_garlic_sweet_sauce', 'ginger_and_green_onion_seasoning_soup', 'wakegi_and_rakkyo_small_accent', 'shallot_and_pea_french_flavor'] },
  Nanami_Shokudo: { id: 'Nanami_Shokudo', name: 'ナナミ食堂', baseMarketValue: 250000, products: ['broad_bean_and_green_bean_bean_feast', 'snap_pea_and_corn_sweet_stir_fry', 'edamame_and_shiso_japanese_tempura', 'mitsuba_and_basil_japanese_western_harmony'] },
  Otome_Yokocho: { id: 'Otome_Yokocho', name: 'オトメ横丁', baseMarketValue: 250000, products: ['parsley_and_dill_herb_paradise', 'fennel_and_rosemary_mediterranean_grill', 'thyme_and_sage_herb_garden_chicken', 'coriander_and_arugula_ethnic_salad'] },
  Sakura_Dori_Shokai: { id: 'Sakura_Dori_Shokai', name: 'サクラ通り商会', baseMarketValue: 250000, products: ['artichoke_and_radish_western_appetizer', 'watercress_and_ice_plant_waterside_salad', 'molokheiya_and_chorogi_sticky_bowl', 'wasabi_and_ginger_refreshing_salad'] },
  Grill_Asakura: { id: 'Grill_Asakura', name: 'グリル・アサクラ', baseMarketValue: 250000, products: ['truffle_and_mushroom_aromatic_pasta', 'shiitake_and_eringi_forest_saute', 'maitake_and_shimeji_autumn_mushroom_hot_pot', 'nameko_and_kikurage_smooth_soup'] },
  Minato_Base: { id: 'Minato_Base', name: 'ミナトベース', baseMarketValue: 250000, products: ['enoki_and_sprout_crunchy_salad', 'kaiware_daikon_and_sprout_refreshing_salad', 'beet_and_swiss_chard_colorful_roast', 'hakusai_and_kohlrabi_light_pickle_salad'] },
  Kanna_Building: { id: 'Kanna_Building', name: 'カンナビルヂング', baseMarketValue: 250000, products: ['bamboo_shoot_and_kuwai_spring_simmer', 'yacon_and_cassava_exotic_salad', 'sesame_and_sunflower_seed_nutty_dressing', 'kale_and_romanesco_green_power_smoothie'] },
  Hoshino_House: { id: 'Hoshino_House', name: 'ホシノハウス', baseMarketValue: 250000, products: ['chestnut_pumpkin_and_western_pumpkin_sweet_potage', 'luffa_and_fudansou_rare_stir_fry', 'jalapeno_pepper_and_habanero_pepper_fire_sauce', 'cayenne_pepper_and_radish_red_white_spicy_marinate'] },
  TOKYO_COMMONS: { id: 'TOKYO_COMMONS', name: 'TOKYO COMMONS', baseMarketValue: 250000, products: ['salad_greens_and_microgreen_delicate_salad', 'suizenjina_and_spinach_green_gratin', 'apple_and_tomato_sweet_sour_compote', 'carrot_and_grape_orange_risotto'] },
  Kotono_Ha_Shokudo: { id: 'Kotono_Ha_Shokudo', name: 'コトノハ食堂', baseMarketValue: 250000, products: ['orange_and_banana_sun_fruit_salad', 'mango_and_peach_tropical_dessert', 'cherry_and_pineapple_red_yellow_tart', 'strawberry_and_melon_sweet_jewel_box'] },
  Tsukikage_Parlor: { id: 'Tsukikage_Parlor', name: '月影パーラー', baseMarketValue: 250000, products: ['watermelon_and_lemon_refreshing_drink', 'lime_and_kiwi_sour_sherbet', 'blueberry_and_raspberry_berry_parfait', 'blackberry_and_apricot_deep_jam'] },
  BLUE_HILL_TABLE: { id: 'BLUE_HILL_TABLE', name: 'BLUE HILL TABLE', baseMarketValue: 250000, products: ['prune_and_persimmon_japanese_compote', 'pear_and_pomegranate_moist_salad', 'grapefruit_and_dragon_fruit_vitamin_cocktail', 'passion_fruit_and_mangosteen_tropical_dessert'] },
  Nishikawa_Shoten: { id: 'Nishikawa_Shoten', name: 'ニシカワ商店', baseMarketValue: 250000, products: ['coconut_and_cacao_rich_mousse', 'feijoa_and_mulberry_rare_jam', 'nectarine_and_quince_baked_fruit', 'pawpaw_and_finger_lime_exotic_salad'] },
  Lumine_Garden: { id: 'Lumine_Garden', name: 'ルミネ・ガーデン', baseMarketValue: 250000, products: ['star_fruit_and_jackfruit_mystery_dessert', 'durian_and_tamarillo_strong_marinate', 'acerola_and_gumi_vitamin_bomb', 'rose_hip_and_white_sapote_herb_tea_jelly'] },
  Kissaten_Paradise_Street: { id: 'Kissaten_Paradise_Street', name: '喫茶パラダイス通り', baseMarketValue: 250000, products: ['cherimoya_and_rambutan_creamy_dessert', 'sapodilla_and_jaboticaba_south_american_fruit_plate', 'carambola_and_camellia_fruit_garnish', 'guava_and_currant_tropical_sauce'] },
  Aoi_Lane: { id: 'Aoi_Lane', name: 'アオイレーン', baseMarketValue: 250000, products: ['horse_mackerel_and_mackerel_japanese_marinate', 'tuna_and_sea_bream_luxurious_bowl', 'flounder_and_bonito_skillful_sear', 'yellowtail_and_amberjack_cold_selection'] },
  Hanare_Yokocho: { id: 'Hanare_Yokocho', name: 'ハナレ横町', baseMarketValue: 250000, products: ['kelp_bass_and_blackthroat_seaperch_premium_simmer', 'abalone_and_scallop_shell_steam', 'crab_and_shrimp_seafood_paella', 'squid_and_octopus_mediterranean_grill'] },
  Kamiya_Holdings: { id: 'Kamiya_Holdings', name: 'カミヤ・ホールディングス', baseMarketValue: 250000, products: ['smelt_and_pufferfish_rare_fry', 'conger_eel_and_anglerfish_deep_hot_pot', 'rockfish_and_alfonsin_salt_grill_assortment', 'okhotsk_atka_mackerel_and_sea_bass_dried_plate'] },
  Diner_Central: { id: 'Diner_Central', name: 'ダイナー・セントラル', baseMarketValue: 250000, products: ['greenling_and_mahi_mahi_white_fry', 'mullet_and_catfish_fry_two_kinds', 'cornetfish_and_devil_stinger_aspic', 'lionfish_and_hairtail_showy_grill'] },
  Toudai_Club: { id: 'Toudai_Club', name: '灯台倶楽部', baseMarketValue: 250000, products: ['flathead_and_filefish_liver_salad', 'pleuronectidae_and_salmon_butter_saute', 'mantis_shrimp_and_sea_squirt_sea_pasta', 'flying_fish_and_blenny_light_marinate'] },
  Retro_Avenue: { id: 'Retro_Avenue', name: 'レトロアベニュー', baseMarketValue: 250000, products: ['sea_robin_and_black_sea_bream_tide_soup', 'surfperch_and_loach_country_simmer', 'moray_eel_and_cherry_salmon_intimidating_grill', 'goatfish_and_wrasse_tropical_salad'] },
  Nemoto_Republic: { id: 'Nemoto_Republic', name: 'ネモト・リパブリック', baseMarketValue: 250000, products: ['red_spotted_grouper_and_halibut_steamed_dish', 'ito_and_yamame_river_fish_fry', 'oikawa_and_barracuda_karaage', 'beef_loin_and_pork_belly_meaty_stew'] },
    gemini_foods: { id: 'gemini_foods', name: '富士山麓フーズ', baseMarketValue: 200000, products: ['apple_pie', 'tomato_soup'] },
    oceans_bounty: { id: 'oceans_bounty', name: '町田商店', baseMarketValue: 350000, products: ['grilled_saury', 'eel_bowl'] },
};


export const CROP_CATEGORY_MAP: Record<CropType, FacilityCategory> = {
    [CropType.Plant]: FacilityCategory.Field,
    [CropType.Fish]: FacilityCategory.Sea,
    [CropType.Livestock]: FacilityCategory.Ranch,
};

export const FACILITIES_FOR_SALE: Record<string, FacilityInfo> = {
    field: { name: '畑', category: FacilityCategory.Field, capacity: 10, price: 50000 },
    ship: { name: '船', category: FacilityCategory.Sea, capacity: 10, price: 70000 },
    ranch: { name: '牧場', category: FacilityCategory.Ranch, capacity: 10, price: 60000 },
    center_pivot: { name: 'センターピボット', category: FacilityCategory.Field, capacity: 100, price: 2500000 },
    large_fishing_boat: { name: '大型漁船', category: FacilityCategory.Sea, capacity: 100, price: 3500000 },
    feedlot: { name: 'フィードロット', category: FacilityCategory.Ranch, capacity: 100, price: 3000000 },
};