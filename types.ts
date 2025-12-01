

export enum FacilityCategory {
  Field = 'Field',
  Sea = 'Sea',
  Ranch = 'Ranch',
}

export enum CropType {
  Plant = 'Plant',
  Fish = 'Fish',
  Livestock = 'Livestock',
}

export enum RuinType {
  Maya = 'Maya',
  NuevaEspana = 'NuevaEspana',
  GizaPyramid = 'GizaPyramid',
  Sphinx = 'Sphinx',
  MemphisNecropolis = 'MemphisNecropolis',
  TutankhamunTomb = 'TutankhamunTomb',
  AbuSimbelTemples = 'AbuSimbelTemples',
  Palmyra = 'Palmyra',
  Babylon = 'Babylon',
  IshtarGate = 'IshtarGate',
  Persepolis = 'Persepolis',
  MohenjoDaro = 'MohenjoDaro',
  TajMahal = 'TajMahal',
  AjantaCaves = 'AjantaCaves',
  ElloraCaves = 'ElloraCaves',
  AngkorWat = 'AngkorWat',
  Borobudur = 'Borobudur',
  Parthenon = 'Parthenon',
  Acropolis = 'Acropolis',
  Corinth = 'Corinth',
  Knossos = 'Knossos',
  Pompeii = 'Pompeii',
  Colosseum = 'Colosseum',
  Pantheon = 'Pantheon',
  RomanForum = 'RomanForum',
  BathsOfCaracalla = 'BathsOfCaracalla',
  BathsOfDiocletian = 'BathsOfDiocletian',
  ArchOfConstantine = 'ArchOfConstantine',
  TreviFountain = 'TreviFountain',
  SpanishSteps = 'SpanishSteps',
  PalaceOfVersailles = 'PalaceOfVersailles',
  NotreDameCathedral = 'NotreDameCathedral',
  MontSaintMichel = 'MontSaintMichel',
  ChartresCathedral = 'ChartresCathedral',
  CologneCathedral = 'CologneCathedral',
  AachenCathedral = 'AachenCathedral',
  HeidelbergCastle = 'HeidelbergCastle',
  TowerOfLondon = 'TowerOfLondon',
  PalaceOfWestminster = 'PalaceOfWestminster',
  Stonehenge = 'Stonehenge',
  ErichPalace = 'ErichPalace',
  Alhambra = 'Alhambra',
  SagradaFamilia = 'SagradaFamilia',
  LeaningTowerOfPisa = 'LeaningTowerOfPisa',
  MilanDuomo = 'MilanDuomo',
  StPetersBasilica = 'StPetersBasilica',
  SistineChapel = 'SistineChapel',
  VaticanPalace = 'VaticanPalace',
  FlorenceCathedral = 'FlorenceCathedral',
  Teotihuacan = 'Teotihuacan',
  ChichenItza = 'ChichenItza',
  MachuPicchu = 'MachuPicchu',
  NazcaLines = 'NazcaLines',
  EasterIslandMoai = 'EasterIslandMoai',
  GreatWallOfChina = 'GreatWallOfChina',
  ForbiddenCity = 'ForbiddenCity',
  TempleOfHeaven = 'TempleOfHeaven',
  MingTombs = 'MingTombs',
  MausoleumOfQinShiHuang = 'MausoleumOfQinShiHuang',
  TerracottaArmy = 'TerracottaArmy',
  MogaoCaves = 'MogaoCaves',
  PotalaPalace = 'PotalaPalace',
  HimejiCastle = 'HimejiCastle',
  Horyuji = 'Horyuji',
  Todaiji = 'Todaiji',
  Kinkakuji = 'Kinkakuji',
  ItsukushimaShrine = 'ItsukushimaShrine',
  ShuriCastle = 'ShuriCastle',
  Samarkand = 'Samarkand',
  BlueMosque = 'BlueMosque',
  HagiaSophia = 'HagiaSophia',
  TopkapiPalace = 'TopkapiPalace',
  ImamSquare = 'ImamSquare',
  JamehMosqueOfIsfahan = 'JamehMosqueOfIsfahan',
  QutubMinar = 'QutubMinar',
  ObeliskOfAxum = 'ObeliskOfAxum',
  RockHewnChurchesOfLalibela = 'RockHewnChurchesOfLalibela',
  GreatZimbabwe = 'GreatZimbabwe',
  SaintExuperyMansion = 'SaintExuperyMansion',
  BerlinWall = 'BerlinWall',
  BigBen = 'BigBen',
  EiffelTower = 'EiffelTower',
  StatueOfLiberty = 'StatueOfLiberty',
  WhiteHouse = 'WhiteHouse',
  USCapitol = 'USCapitol',
  Kremlin = 'Kremlin',
  StBasilsCathedral = 'StBasilsCathedral',
  HistoricCentreOfSaintPetersburg = 'HistoricCentreOfSaintPetersburg',
  WinterPalace = 'WinterPalace',
  PeterAndPaulFortress = 'PeterAndPaulFortress',
  NewWorldColonialChurches = 'NewWorldColonialChurches',
  CathedralOfBrasilia = 'CathedralOfBrasilia',
  SydneyOperaHouse = 'SydneyOperaHouse',
  NiagaraFalls = 'NiagaraFalls',
  Masada = 'Masada',
  Petra = 'Petra',
  ArlesRomanMonuments = 'ArlesRomanMonuments',
  PalaceOfFontainebleau = 'PalaceOfFontainebleau',
  ChateauDeChambord = 'ChateauDeChambord',
}

export type CountryId = 'usa' | 'canada' | 'russia' | 'japan' | 'afghanistan' | 'ireland' | 'azerbaijan' | 'unitedarabemirates' | 'albania' | 'algeria' | 'argentina' | 'armenia' | 'angola' | 'antiguaandbarbuda';

export interface Crop {
  id: string;
  name: string;
  type: CropType;
  buyPrice: number;
  baseSellPrice: number;
  stats: {
    taste: number;
    durability: number;
    appearance: number;
  };
}

export interface PlantedCrop {
  cropId: string;
  quantity: number;
  // FIX: Corrected typo 'numberu' to 'number'.
  plantedAt: number;
}

export interface Facility {
  id:string;
  name: string;
  category: FacilityCategory;
  capacity: number;
  plantedCrop: PlantedCrop | null;
}

export interface FacilityInfo {
    name: string;
    category: FacilityCategory;
    capacity: number;
    price: number;
}

export interface Product {
    id: string;
    name: string;
    sellPrice: number;
    recipe: Record<string, number>; // cropId -> quantity
}

export interface CompanyInfo {
    id: string;
    name: string;
    baseMarketValue: number;
    products: string[]; // productId[]
}

export interface Company {
    id: string; // unique instance id
    typeId: string; // CompanyInfo id
    name: string; // "Gemini Foods #1"
    marketValue: number;
    productionRecord: number;
    assignedCitizens: number;
    tenantId: string | null;
}

export interface Tenant {
    id: string;
    name: string;
    assignedCitizens: number;
}

export interface Mineral {
  id: string;
  name: string;
  sellPrice: number;
}

export interface Weapon {
  id: string;
  name: string;
  sellPrice: number;
  recipe: Record<string, number>; // mineralId -> quantity
}

export interface SpecialtyGood {
  id: string;
  name: string;
  sellPrice: number;
}

export interface CountryInfo {
  id: CountryId;
  name: string;
  specialtyGoodId: string;
  conquestRequirements: Record<string, number>; // weaponId -> quantity
  conquestCitizenReward: number;
}

export interface ConqueredCountryState {
  militaryLevel: number;
  economicLevel: number;
  politicalLevel: number;
  bonds: number;
  productionState: {
    startTime: number | null;
  };
}

// Nationalism Types
export enum Ideology {
  Fascism = 'Fascism',
  Communism = 'Communism',
  Liberalism = 'Liberalism',
  AbsoluteMonarchy = 'AbsoluteMonarchy',
  ConstitutionalMonarchy = 'ConstitutionalMonarchy',
  CommunistMonarchy = 'CommunistMonarchy',
}

export enum Leader {
  Populist = 'Populist',
  PolPot = 'PolPot',
  Saladin = 'Saladin',
  Taizong = 'Taizong',
  ShinzoAbe = 'ShinzoAbe',
  FirstSon = 'FirstSon',
}

export enum Hero {
  Charlemagne = 'Charlemagne',
  Baibars = 'Baibars',
  RichardTheLionheart = 'RichardTheLionheart',
  TokugawaIeyasu = 'TokugawaIeyasu',
  FrederickII = 'FrederickII',
  Hitler = 'Hitler',
}

export enum Agriculture {
  Qanat = 'Qanat',
  GreenRevolution = 'GreenRevolution',
  WhiteRevolution = 'WhiteRevolution',
  PinkRevolution = 'PinkRevolution',
  YurinRigi = 'YurinRigi',
  Agroforestry = 'Agroforestry',
}

export enum Industry {
  Kombinat = 'Kombinat',
  Swordsmith = 'Swordsmith',
  SiliconValley = 'SiliconValley',
  MultipurposeDam = 'MultipurposeDam',
  ResearchCity = 'ResearchCity',
  WovenCity = 'WovenCity',
}

export enum Terrain {
  Desert = 'Desert',
  Mediterranean = 'Mediterranean',
  Jungle = 'Jungle',
  Fjord = 'Fjord',
  Glacier = 'Glacier',
  Taiga = 'Taiga',
}

export enum Entertainment {
  Boxing = 'Boxing',
  ProBaseball = 'ProBaseball',
  NBA = 'NBA',
  Colosseum = 'Colosseum',
  Kabuki = 'Kabuki',
  CoffeeHouse = 'CoffeeHouse',
}

export type NationAttribute = Ideology | Leader | Hero | Agriculture | Industry | Terrain | Entertainment;
export type NationAttributeCategory = 'ideology' | 'leader' | 'hero' | 'agriculture' | 'industry' | 'terrain' | 'entertainment';

export interface Nation {
  id: string;
  name: string;
  attributes: {
    ideology: Ideology | null;
    leader: Leader | null;
    hero: Hero | null;
    agriculture: Agriculture | null;
    industry: Industry | null;
    terrain: Terrain | null;
    entertainment: Entertainment | null;
  };
  isFinalized: boolean;
}

export interface SkillTree {
  cropTime: number;
  mineTime: number;
  sellPrice: number;
  fragmentChance: number;
  countryTime: number;
  tenantTime: number;
}

// NBA Types
export type PlayerPosition = 'Center' | 'Point Guard' | 'Shooting Guard' | 'Forward';

export interface NBAPlayer {
  id: string;
  name: string;
  position: PlayerPosition;
  stats: {
    shooting: number; // 1-5
    dunking: number; // 1-5
    dribbling: number; // 1-5
  };
}

export interface OpponentTeam {
    name: string;
    strength: number;
}

export interface MatchResult {
    matchId: number;
    round: number;
    teams: [string, string]; // team names
    winner: string;
    isPlayerMatch: boolean;
    description?: string;
    playerTeamStrength?: number;
    opponentTeamStrength?: number;
}

export type Bracket = (string | null)[][];

export interface Tournament {
    bracket: Bracket;
    results: MatchResult[];
    playerTeamStrength: number;
    opponents: OpponentTeam[];
}

export interface NBAState {
  teamName: string | null;
  roster: NBAPlayer[];
  trophies: number;
  conference: {
    tournament: Tournament | null;
    status: 'idle' | 'selecting' | 'active' | 'finished';
    finalRank: number | null;
    lastPlayed: number | null;
  }
}

export interface GameState {
  money: number;
  facilities: Facility[];
  products: Record<string, number>; // Harvested crops: cropId -> quantity
  seeds: Record<string, number>; // Seeds/Juveniles: cropId -> quantity
  cropData: Record<string, Crop>;
  fragments: {
    something: number;
    maya: number;
    nuevaEspana: number;
    gizaPyramid: number;
    sphinx: number;
    memphisNecropolis: number;
    tutankhamunTomb: number;
    abuSimbelTemples: number;
    palmyra: number;
    babylon: number;
    ishtarGate: number;
    persepolis: number;
    mohenjoDaro: number;
    tajMahal: number;
    ajantaCaves: number;
    elloraCaves: number;
    angkorWat: number;
    borobudur: number;
    parthenon: number;
    acropolis: number;
    corinth: number;
    knossos: number;
    pompeii: number;
    colosseum: number;
    pantheon: number;
    romanForum: number;
    bathsOfCaracalla: number;
    bathsOfDiocletian: number;
    archOfConstantine: number;
    treviFountain: number;
    spanishSteps: number;
    palaceOfVersailles: number;
    notreDameCathedral: number;
    montSaintMichel: number;
    chartresCathedral: number;
    cologneCathedral: number;
    aachenCathedral: number;
    heidelbergCastle: number;
    towerOfLondon: number;
    palaceOfWestminster: number;
    stonehenge: number;
    erichPalace: number;
    alhambra: number;
    sagradaFamilia: number;
    leaningTowerOfPisa: number;
    milanDuomo: number;
    stPetersBasilica: number;
    sistineChapel: number;
    vaticanPalace: number;
    florenceCathedral: number;
    teotihuacan: number;
    chichenItza: number;
    machuPicchu: number;
    nazcaLines: number;
    easterIslandMoai: number;
    greatWallOfChina: number;
    forbiddenCity: number;
    templeOfHeaven: number;
    mingTombs: number;
    mausoleumOfQinShiHuang: number;
    terracottaArmy: number;
    mogaoCaves: number;
    potalaPalace: number;
    himejiCastle: number;
    horyuji: number;
    todaiji: number;
    kinkakuji: number;
    itsukushimaShrine: number;
    shuriCastle: number;
    samarkand: number;
    blueMosque: number;
    hagiaSophia: number;
    topkapiPalace: number;
    imamSquare: number;
    jamehMosqueOfIsfahan: number;
    qutubMinar: number;
    obeliskOfAxum: number;
    rockHewnChurchesOfLalibela: number;
    greatZimbabwe: number;
    saintExuperyMansion: number;
    berlinWall: number;
    bigBen: number;
    eiffelTower: number;
    statueOfLiberty: number;
    whiteHouse: number;
    usCapitol: number;
    kremlin: number;
    stBasilsCathedral: number;
    historicCentreOfSaintPetersburg: number;
    winterPalace: number;
    peterAndPaulFortress: number;
    newWorldColonialChurches: number;
    cathedralOfBrasilia: number;
    sydneyOperaHouse: number;
    niagaraFalls: number;
    masada: number;
    petra: number;
    arlesRomanMonuments: number;
    palaceOfFontainebleau: number;
    chateauDeChambord: number;
  };
  ruins: Record<RuinType, number>;
  ruinProfitState: {
    startTime: number | null;
  };
  // New State for Tenant/Company feature
  citizens: number;
  tenants: Tenant[];
  companies: Company[];
  companyProducts: Record<string, number>; // productId -> quantity
  productData: Record<string, Product>;
  companyData: Record<string, CompanyInfo>;
  tenantProfitState: Record<string, { startTime: number | null }>; // tenantId -> state
  // New State for Mine/Smithy feature
  minerals: Record<string, number>; // mineralId -> quantity
  weapons: Record<string, number>; // weaponId -> quantity
  mineState: {
    startTime: number | null;
  };
  // New State for Country feature
  countries: Partial<Record<CountryId, ConqueredCountryState>>;
  specialtyGoods: Record<string, number>; // specialtyGoodId -> quantity
  // New State for Nationalism feature
  nations: Nation[];
  activeNationId: string | null;
  // New State for Skill Tree
  skillTree: SkillTree;
  // New State for Recruiter
  recruiterState: {
    startTime: number | null;
    citizenIncreaseItems: number;
    timeReductionItems: number;
  };
  // New State for NBA
  nbaState: NBAState;
  tutorialCompleted: boolean;
}

export type GameAction =
  | { type: 'BUY_SEEDS'; payload: { cropId: string; quantity: number; cost: number } }
  | { type: 'BUY_FACILITY'; payload: { facility: Facility; cost: number } }
  | { type: 'PLANT'; payload: { facilityId: string; cropId: string } }
  | { type: 'PLANT_ALL'; payload: { cropId: string } }
  | { type: 'HARVEST'; payload: { facilityId: string } }
  | { type: 'HARVEST_ALL' }
  | { type: 'SELL'; payload: { cropId: string; quantity: number; earnings: number } }
  | { type: 'RESEARCH'; payload: { cropId: string; statToUpgrade: keyof Crop['stats'] | null } }
  | { type: 'EXCHANGE_FRAGMENT'; payload: { toFragment: string } }
  | { type: 'ASSEMBLE_RUIN'; payload: { ruinType: RuinType } }
  | { type: 'START_PROFIT_COLLECTION' }
  | { type: 'CLAIM_PROFIT'; payload: { earnings: number } }
  // New Actions for Tenant/Company feature
  | { type: 'BUY_TENANT'; payload: { tenant: Tenant; cost: number } }
  | { type: 'BUY_COMPANY'; payload: { company: Company; cost: number } }
  | { type: 'ASSIGN_COMPANY_TO_TENANT'; payload: { companyId: string; tenantId: string } }
  | { type: 'REMOVE_COMPANY_FROM_TENANT'; payload: { companyId: string } }
  | { type: 'PRODUCE_PRODUCT'; payload: { companyId: string; productId: string; quantity: number } }
  | { type: 'SELL_COMPANY_PRODUCT'; payload: { productId: string; quantity: number; earnings: number } }
  | { type: 'ASSIGN_CITIZENS'; payload: { targetId: string; targetType: 'company' | 'tenant'; amount: number } }
  | { type: 'WITHDRAW_CITIZENS'; payload: { targetId: string; targetType: 'company' | 'tenant'; amount: number } }
  | { type: 'START_TENANT_PROFIT_COLLECTION'; payload: { tenantId: string } }
  | { type: 'CLAIM_TENANT_PROFIT'; payload: { tenantId: string; earnings: number } }
  // New Actions for Mine/Smithy feature
  | { type: 'START_MINING' }
  | { type: 'COLLECT_MINERALS'; payload: { collected: Record<string, number> } }
  | { type: 'SELL_MINERAL'; payload: { mineralId: string; quantity: number; earnings: number } }
  | { type: 'CRAFT_WEAPON'; payload: { weaponId: string } }
  | { type: 'SELL_WEAPON'; payload: { weaponId: string; quantity: number; earnings: number } }
  // New Actions for Country feature
  | { type: 'CONQUER_COUNTRY'; payload: { countryId: CountryId } }
  | { type: 'START_COUNTRY_PRODUCTION'; payload: { countryId: CountryId } }
  | { type: 'COLLECT_COUNTRY_PRODUCTION'; payload: { countryId: CountryId, specialtyGoodId: string, goodsAmount: number, bondsAmount: number } }
  | { type: 'UPGRADE_COUNTRY_RANK'; payload: { countryId: CountryId; rank: 'militaryLevel' | 'economicLevel' | 'politicalLevel' } }
  | { type: 'SELL_SPECIALTY_GOOD'; payload: { specialtyGoodId: string; quantity: number; earnings: number } }
  | { type: 'LOAD_GAME'; payload: { newState: GameState } }
  // New Actions for Nationalism feature
  | { type: 'BUY_NATION'; payload: { nation: Nation, cost: number } }
  | { type: 'REROLL_NATION_ALL_ATTRIBUTES'; payload: { nationId: string; cost: number } }
  | { type: 'FINALIZE_NATION'; payload: { nationId: string } }
  | { type: 'SET_ACTIVE_NATION'; payload: { nationId: string | null } }
  // New Actions for Skill Tree
  | { type: 'ALLOCATE_SKILL_POINTS'; payload: { newSkillTree: SkillTree } }
  | { type: 'RESET_SKILL_POINTS'; payload: { cost: number } }
  // New Actions for Recruiter
  | { type: 'START_RECRUITMENT' }
  | { type: 'CLAIM_CITIZENS'; payload: { amount: number } }
  | { type: 'BUY_RECRUITER_ITEM'; payload: { itemType: 'citizenIncrease' | 'timeReduction'; cost: number } }
  | { type: 'UPGRADE_RECRUITER_WITH_MONEY'; payload: { cost: number } }
  // New Actions for NBA feature
  | { type: 'SET_NBA_TEAM_NAME'; payload: { name: string } }
  | { type: 'HIRE_NBA_PLAYER'; payload: { player: NBAPlayer; cost: number } }
  | { type: 'FIRE_NBA_PLAYER'; payload: { playerId: string } }
  | { type: 'SET_CONFERENCE_STATUS'; payload: { status: NBAState['conference']['status'] } }
  | { type: 'CREATE_NBA_TOURNAMENT'; payload: { selectedPlayers: NBAPlayer[] } }
  | { type: 'SIMULATE_NBA_TOURNAMENT' }
  | { type: 'END_NBA_TOURNAMENT'; payload: { earnings: number; trophyWon: boolean } }
  | { type: 'COMPLETE_TUTORIAL' };
