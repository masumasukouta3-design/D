
import React, { useReducer, useState, useEffect, useMemo, useCallback } from 'react';
import { GameState, GameAction, Facility, FacilityCategory, RuinType, Company, Tenant, CountryId, Nation, NationAttributeCategory, NationAttribute, NBAPlayer, PlayerPosition, Bracket, OpponentTeam, MatchResult, Tournament } from './types';
import { 
    INITIAL_CROPS, FACILITIES_FOR_SALE, RESEARCH_COST, RESEARCH_SUCCESS_RATE, HARVEST_FRAGMENT_CHANCE, 
    FRAGMENTS_TO_RUIN_COST, BASE_PROFIT_PER_RUIN, INITIAL_PRODUCTS, INITIAL_COMPANIES,
    TENANT_COST, COMPANY_COST, CITIZEN_VALUE_MULTIPLIER, PRODUCTION_RECORD_MULTIPLIER, TENANT_PROFIT_MARKET_VALUE_MULTIPLIER, TENANT_PROFIT_CITIZEN_BONUS,
    INITIAL_MINERALS, INITIAL_WEAPONS, COUNTRY_DATA, RANK_UPGRADE_BASE_COST, NATION_ATTRIBUTE_DATA, NATION_EFFECT_BONUSES, CROP_CATEGORY_MAP, GROW_TIME_MS, NationEffect, SKILL_BONUSES, RECRUITER_ITEM_COSTS, NBA_OPPONENT_TEAMS, NBA_PRIZE_MONEY
} from './constants';
import { RUIN_DATA } from './ruins';
import FarmView from './components/FarmView';
import WarehouseView from './components/WarehouseView';
import MarketView from './components/MarketView';
import LabView from './components/LabView';
import RuinsView from './components/RuinsView';
import CompanyView from './components/CompanyView';
import TenantView from './components/TenantView';
import MineView from './components/MineView';
import SmithyView from './components/SmithyView';
import CountryView from './components/CountryView';
import SystemView from './components/SystemView';
import NationalismView from './components/NationalismView';
import RecruiterView from './components/RecruiterView';
import MiniMapView from './components/MiniMapView';
import NBAView from './components/NBAView';
import Tutorial from './components/Tutorial';
import { usePixelArtGen } from './components/PixelArt';
import { FarmIcon, WarehouseIcon, MarketIcon, LabIcon, RuinsIcon, CompanyIcon, TenantIcon, MineIcon, SmithyIcon, CountryIcon, SystemIcon, NationalismIcon, RecruiterIcon, NBAIcon, CitizenIcon, MoneyIcon } from './components/icons';

const initialGameState: GameState = {
  money: 1000000,
  facilities: [
    { id: `fac-${Date.now()}-1`, name: '畑', category: FacilityCategory.Field, capacity: 10, plantedCrop: null },
    { id: `fac-${Date.now()}-2`, name: '船', category: FacilityCategory.Sea, capacity: 10, plantedCrop: null },
    { id: `fac-${Date.now()}-3`, name: '牧場', category: FacilityCategory.Ranch, capacity: 10, plantedCrop: null },
  ],
  products: {},
  seeds: { apple: 10, tomato: 10, carrot: 10 },
  cropData: INITIAL_CROPS,
  fragments: {
    something: 0,
    maya: 0,
    nuevaEspana: 0,
    gizaPyramid: 0,
    sphinx: 0,
    memphisNecropolis: 0,
    tutankhamunTomb: 0,
    abuSimbelTemples: 0,
    palmyra: 0,
    babylon: 0,
    ishtarGate: 0,
    persepolis: 0,
    mohenjoDaro: 0,
    tajMahal: 0,
    ajantaCaves: 0,
    elloraCaves: 0,
    angkorWat: 0,
    borobudur: 0,
    parthenon: 0,
    acropolis: 0,
    corinth: 0,
    knossos: 0,
    pompeii: 0,
    colosseum: 0,
    pantheon: 0,
    romanForum: 0,
    bathsOfCaracalla: 0,
    bathsOfDiocletian: 0,
    archOfConstantine: 0,
    treviFountain: 0,
    spanishSteps: 0,
    palaceOfVersailles: 0,
    notreDameCathedral: 0,
    montSaintMichel: 0,
    chartresCathedral: 0,
    cologneCathedral: 0,
    aachenCathedral: 0,
    heidelbergCastle: 0,
    towerOfLondon: 0,
    palaceOfWestminster: 0,
    stonehenge: 0,
    erichPalace: 0,
    alhambra: 0,
    sagradaFamilia: 0,
    leaningTowerOfPisa: 0,
    milanDuomo: 0,
    stPetersBasilica: 0,
    sistineChapel: 0,
    vaticanPalace: 0,
    florenceCathedral: 0,
    teotihuacan: 0,
    chichenItza: 0,
    machuPicchu: 0,
    nazcaLines: 0,
    easterIslandMoai: 0,
    greatWallOfChina: 0,
    forbiddenCity: 0,
    templeOfHeaven: 0,
    mingTombs: 0,
    mausoleumOfQinShiHuang: 0,
    terracottaArmy: 0,
    mogaoCaves: 0,
    potalaPalace: 0,
    himejiCastle: 0,
    horyuji: 0,
    todaiji: 0,
    kinkakuji: 0,
    itsukushimaShrine: 0,
    shuriCastle: 0,
    samarkand: 0,
    blueMosque: 0,
    hagiaSophia: 0,
    topkapiPalace: 0,
    imamSquare: 0,
    jamehMosqueOfIsfahan: 0,
    qutubMinar: 0,
    obeliskOfAxum: 0,
    rockHewnChurchesOfLalibela: 0,
    greatZimbabwe: 0,
    saintExuperyMansion: 0,
    berlinWall: 0,
    bigBen: 0,
    eiffelTower: 0,
    statueOfLiberty: 0,
    whiteHouse: 0,
    usCapitol: 0,
    kremlin: 0,
    stBasilsCathedral: 0,
    historicCentreOfSaintPetersburg: 0,
    winterPalace: 0,
    peterAndPaulFortress: 0,
    newWorldColonialChurches: 0,
    cathedralOfBrasilia: 0,
    sydneyOperaHouse: 0,
    niagaraFalls: 0,
    masada: 0,
    petra: 0,
    arlesRomanMonuments: 0,
    palaceOfFontainebleau: 0,
    chateauDeChambord: 0,
  },
  ruins: {
    [RuinType.Maya]: 0,
    [RuinType.NuevaEspana]: 0,
    [RuinType.GizaPyramid]: 0,
    [RuinType.Sphinx]: 0,
    [RuinType.MemphisNecropolis]: 0,
    [RuinType.TutankhamunTomb]: 0,
    [RuinType.AbuSimbelTemples]: 0,
    [RuinType.Palmyra]: 0,
    [RuinType.Babylon]: 0,
    [RuinType.IshtarGate]: 0,
    [RuinType.Persepolis]: 0,
    [RuinType.MohenjoDaro]: 0,
    [RuinType.TajMahal]: 0,
    [RuinType.AjantaCaves]: 0,
    [RuinType.ElloraCaves]: 0,
    [RuinType.AngkorWat]: 0,
    [RuinType.Borobudur]: 0,
    [RuinType.Parthenon]: 0,
    [RuinType.Acropolis]: 0,
    [RuinType.Corinth]: 0,
    [RuinType.Knossos]: 0,
    [RuinType.Pompeii]: 0,
    [RuinType.Colosseum]: 0,
    [RuinType.Pantheon]: 0,
    [RuinType.RomanForum]: 0,
    [RuinType.BathsOfCaracalla]: 0,
    [RuinType.BathsOfDiocletian]: 0,
    [RuinType.ArchOfConstantine]: 0,
    [RuinType.TreviFountain]: 0,
    [RuinType.SpanishSteps]: 0,
    [RuinType.PalaceOfVersailles]: 0,
    [RuinType.NotreDameCathedral]: 0,
    [RuinType.MontSaintMichel]: 0,
    [RuinType.ChartresCathedral]: 0,
    [RuinType.CologneCathedral]: 0,
    [RuinType.AachenCathedral]: 0,
    [RuinType.HeidelbergCastle]: 0,
    [RuinType.TowerOfLondon]: 0,
    [RuinType.PalaceOfWestminster]: 0,
    [RuinType.Stonehenge]: 0,
    [RuinType.ErichPalace]: 0,
    [RuinType.Alhambra]: 0,
    [RuinType.SagradaFamilia]: 0,
    [RuinType.LeaningTowerOfPisa]: 0,
    [RuinType.MilanDuomo]: 0,
    [RuinType.StPetersBasilica]: 0,
    [RuinType.SistineChapel]: 0,
    [RuinType.VaticanPalace]: 0,
    [RuinType.FlorenceCathedral]: 0,
    [RuinType.Teotihuacan]: 0,
    [RuinType.ChichenItza]: 0,
    [RuinType.MachuPicchu]: 0,
    [RuinType.NazcaLines]: 0,
    [RuinType.EasterIslandMoai]: 0,
    [RuinType.GreatWallOfChina]: 0,
    [RuinType.ForbiddenCity]: 0,
    [RuinType.TempleOfHeaven]: 0,
    [RuinType.MingTombs]: 0,
    [RuinType.MausoleumOfQinShiHuang]: 0,
    [RuinType.TerracottaArmy]: 0,
    [RuinType.MogaoCaves]: 0,
    [RuinType.PotalaPalace]: 0,
    [RuinType.HimejiCastle]: 0,
    [RuinType.Horyuji]: 0,
    [RuinType.Todaiji]: 0,
    [RuinType.Kinkakuji]: 0,
    [RuinType.ItsukushimaShrine]: 0,
    [RuinType.ShuriCastle]: 0,
    [RuinType.Samarkand]: 0,
    [RuinType.BlueMosque]: 0,
    [RuinType.HagiaSophia]: 0,
    [RuinType.TopkapiPalace]: 0,
    [RuinType.ImamSquare]: 0,
    [RuinType.JamehMosqueOfIsfahan]: 0,
    [RuinType.QutubMinar]: 0,
    [RuinType.ObeliskOfAxum]: 0,
    [RuinType.RockHewnChurchesOfLalibela]: 0,
    [RuinType.GreatZimbabwe]: 0,
    [RuinType.SaintExuperyMansion]: 0,
    [RuinType.BerlinWall]: 0,
    [RuinType.BigBen]: 0,
    [RuinType.EiffelTower]: 0,
    [RuinType.StatueOfLiberty]: 0,
    [RuinType.WhiteHouse]: 0,
    [RuinType.USCapitol]: 0,
    [RuinType.Kremlin]: 0,
    [RuinType.StBasilsCathedral]: 0,
    [RuinType.HistoricCentreOfSaintPetersburg]: 0,
    [RuinType.WinterPalace]: 0,
    [RuinType.PeterAndPaulFortress]: 0,
    [RuinType.NewWorldColonialChurches]: 0,
    [RuinType.CathedralOfBrasilia]: 0,
    [RuinType.SydneyOperaHouse]: 0,
    [RuinType.NiagaraFalls]: 0,
    [RuinType.Masada]: 0,
    [RuinType.Petra]: 0,
    [RuinType.ArlesRomanMonuments]: 0,
    [RuinType.PalaceOfFontainebleau]: 0,
    [RuinType.ChateauDeChambord]: 0,
  },
  ruinProfitState: {
    startTime: null,
  },
  citizens: 10,
  tenants: [],
  companies: [],
  companyProducts: {},
  productData: INITIAL_PRODUCTS,
  companyData: INITIAL_COMPANIES,
  tenantProfitState: {},
  minerals: {},
  weapons: {
    musket: 1,
    charlemagnes_sword: 1,
  },
  mineState: {
    startTime: null,
  },
  countries: {},
  specialtyGoods: {},
  nations: [],
  activeNationId: null,
  skillTree: {
    cropTime: 0,
    mineTime: 0,
    sellPrice: 0,
    fragmentChance: 0,
    countryTime: 0,
    tenantTime: 0,
  },
  recruiterState: {
    startTime: null,
    citizenIncreaseItems: 0,
    timeReductionItems: 0,
  },
  nbaState: {
    teamName: null,
    roster: [],
    trophies: 0,
    conference: {
      tournament: null,
      status: 'idle',
      finalRank: null,
      lastPlayed: null,
    },
  },
  tutorialCompleted: false,
};

function calculateMarketValue(company: Company, companyData: GameState['companyData']): number {
    const baseInfo = companyData[company.typeId];
    if (!baseInfo) return 0;
    return baseInfo.baseMarketValue + (company.productionRecord * PRODUCTION_RECORD_MULTIPLIER) + (company.assignedCitizens * CITIZEN_VALUE_MULTIPLIER);
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'BUY_SEEDS': {
      const { cropId, quantity, cost } = action.payload;
      return {
        ...state,
        money: state.money - cost,
        seeds: {
          ...state.seeds,
          [cropId]: (state.seeds[cropId] || 0) + quantity,
        },
      };
    }
    case 'BUY_FACILITY': {
      if (state.facilities.length >= 300) {
        return state; 
      }
      const { facility, cost } = action.payload;
      const sameTypeCount = state.facilities.filter(f => f.name === facility.name).length;
      if (sameTypeCount >= 30) {
        return state;
      }
      return {
        ...state,
        money: state.money - cost,
        facilities: [...state.facilities, facility],
      };
    }
    case 'PLANT': {
      const { facilityId, cropId } = action.payload;
      const facility = state.facilities.find(f => f.id === facilityId);
      if (!facility) return state;

      return {
        ...state,
        seeds: {
          ...state.seeds,
          [cropId]: (state.seeds[cropId] || 0) - facility.capacity,
        },
        facilities: state.facilities.map(f =>
          f.id === facilityId
            ? { ...f, plantedCrop: { cropId, quantity: f.capacity, plantedAt: Date.now() } }
            : f
        ),
      };
    }
    case 'PLANT_ALL': {
        const { cropId } = action.payload;
        const crop = state.cropData[cropId];
        if (!crop) return state;

        const compatibleCategory = CROP_CATEGORY_MAP[crop.type];
        let seedsToUse = state.seeds[cropId] || 0;
        
        const emptyCompatibleFacilities = state.facilities.filter(f => 
            f.plantedCrop === null && f.category === compatibleCategory
        );

        if (seedsToUse === 0 || emptyCompatibleFacilities.length === 0) {
            return state;
        }

        const updatedFacilities = [...state.facilities];
        let facilitiesPlanted = 0;

        for (const facility of emptyCompatibleFacilities) {
            if (seedsToUse >= facility.capacity) {
                const facilityIndex = updatedFacilities.findIndex(f => f.id === facility.id);
                if (facilityIndex !== -1) {
                    updatedFacilities[facilityIndex] = {
                        ...facility,
                        plantedCrop: {
                            cropId,
                            quantity: facility.capacity,
                            plantedAt: Date.now(),
                        },
                    };
                    seedsToUse -= facility.capacity;
                    facilitiesPlanted++;
                }
            } else {
                break; 
            }
        }

        if (facilitiesPlanted === 0) {
            return state;
        }

        return {
            ...state,
            seeds: {
                ...state.seeds,
                [cropId]: seedsToUse,
            },
            facilities: updatedFacilities,
        };
    }
    case 'HARVEST': {
      const { facilityId } = action.payload;
      const facility = state.facilities.find(f => f.id === facilityId);
      if (!facility || !facility.plantedCrop) return state;

      const { cropId, quantity } = facility.plantedCrop;

      let fragmentChanceIncrease = 0;
      const activeNation = state.nations.find(n => n.id === state.activeNationId);
      if (activeNation) {
        Object.values(activeNation.attributes).forEach(attr => {
            if(!attr) return;
            const effect = Object.values(NATION_ATTRIBUTE_DATA).flatMap(d => Object.entries(d.options).map(([key, val]) => ({key, ...val})))
                .find(opt => opt.key === attr)?.effect;
            if(effect === 'FragmentChance') {
                fragmentChanceIncrease += NATION_EFFECT_BONUSES.FragmentChance;
            }
        });
      }
      const skillFragmentBonus = state.skillTree.fragmentChance * SKILL_BONUSES.fragmentChance;
      const effectiveFragmentChance = HARVEST_FRAGMENT_CHANCE + fragmentChanceIncrease + skillFragmentBonus;
      const getsFragment = Math.random() < effectiveFragmentChance;

      return {
        ...state,
        products: {
          ...state.products,
          [cropId]: (state.products[cropId] || 0) + quantity,
        },
        facilities: state.facilities.map(f =>
          f.id === facilityId ? { ...f, plantedCrop: null } : f
        ),
        fragments: {
          ...state.fragments,
          something: state.fragments.something + (getsFragment ? 1 : 0),
        }
      };
    }
    case 'HARVEST_ALL': {
        const now = Date.now();
        const activeNation = state.nations.find(n => n.id === state.activeNationId);

        let cropTimeReduction = 0;
        let fragmentChanceIncrease = 0;

        if (activeNation) {
            const effectCounts: Partial<Record<NationEffect, number>> = {};
            Object.entries(activeNation.attributes).forEach(([category, attribute]) => {
                if (attribute) {
                    const data = NATION_ATTRIBUTE_DATA[category as NationAttributeCategory];
                    if (data && data.options[attribute as string]) {
                        const effect = data.options[attribute as string].effect;
                        effectCounts[effect] = (effectCounts[effect] || 0) + 1;
                    }
                }
            });

            if (effectCounts.CropTime) {
                cropTimeReduction = effectCounts.CropTime * NATION_EFFECT_BONUSES.CropTime;
            }
            if (effectCounts.FragmentChance) {
                fragmentChanceIncrease = effectCounts.FragmentChance * NATION_EFFECT_BONUSES.FragmentChance;
            }
        }
        
        cropTimeReduction += state.skillTree.cropTime * SKILL_BONUSES.cropTime;
        const effectiveGrowTime = GROW_TIME_MS * (1 - cropTimeReduction);
        
        const skillFragmentBonus = state.skillTree.fragmentChance * SKILL_BONUSES.fragmentChance;
        const effectiveFragmentChance = HARVEST_FRAGMENT_CHANCE + fragmentChanceIncrease + skillFragmentBonus;

        const facilitiesToHarvest = state.facilities.filter(f => 
            f.plantedCrop && (now - f.plantedCrop.plantedAt >= effectiveGrowTime)
        );

        if (facilitiesToHarvest.length === 0) {
            return state;
        }

        const updatedProducts = { ...state.products };
        let fragmentsFound = 0;

        for (const facility of facilitiesToHarvest) {
            if (facility.plantedCrop) {
                const { cropId, quantity } = facility.plantedCrop;
                updatedProducts[cropId] = (updatedProducts[cropId] || 0) + quantity;
                if (Math.random() < effectiveFragmentChance) {
                    fragmentsFound++;
                }
            }
        }

        const facilityIdsToHarvest = new Set(facilitiesToHarvest.map(f => f.id));

        const updatedFacilities = state.facilities.map(f => 
            facilityIdsToHarvest.has(f.id) ? { ...f, plantedCrop: null } : f
        );

        return {
            ...state,
            products: updatedProducts,
            facilities: updatedFacilities,
            fragments: {
                ...state.fragments,
                something: state.fragments.something + fragmentsFound,
            }
        };
    }
    case 'SELL': {
      const { cropId, quantity, earnings } = action.payload;
      return {
        ...state,
        money: state.money + earnings,
        products: {
          ...state.products,
          [cropId]: (state.products[cropId] || 0) - quantity,
        },
      };
    }
    case 'RESEARCH': {
      const { cropId, statToUpgrade } = action.payload;
      const newCropData = { ...state.cropData };
      
      if (statToUpgrade && newCropData[cropId].stats[statToUpgrade] < 5) {
        newCropData[cropId] = {
            ...newCropData[cropId],
            stats: {
                ...newCropData[cropId].stats,
                [statToUpgrade]: newCropData[cropId].stats[statToUpgrade] + 1
            }
        };
      }

      return {
        ...state,
        products: {
          ...state.products,
          [cropId]: (state.products[cropId] || 0) - RESEARCH_COST,
        },
        cropData: newCropData,
      };
    }
    case 'EXCHANGE_FRAGMENT': {
        const { toFragment } = action.payload;
        if (state.fragments.something < 1) return state;
        const fragmentKey = toFragment as keyof Omit<GameState['fragments'], 'something'>;
        return {
            ...state,
            fragments: {
                ...state.fragments,
                something: state.fragments.something - 1,
                [fragmentKey]: (state.fragments[fragmentKey] || 0) + 1,
            },
        };
    }
    case 'ASSEMBLE_RUIN': {
        const { ruinType } = action.payload;
        const fragmentId = RUIN_DATA[ruinType].fragmentId as keyof Omit<GameState['fragments'], 'something'>;
        if ((state.fragments[fragmentId] || 0) < FRAGMENTS_TO_RUIN_COST) return state;
        return {
            ...state,
            fragments: {
                ...state.fragments,
                [fragmentId]: state.fragments[fragmentId] - FRAGMENTS_TO_RUIN_COST,
            },
            ruins: {
                ...state.ruins,
                [ruinType]: state.ruins[ruinType] + 1,
            },
        };
    }
    case 'START_PROFIT_COLLECTION': {
        const totalRuins = Object.values(state.ruins).reduce((sum: number, count: number) => sum + count, 0);
        if (totalRuins === 0 || state.ruinProfitState.startTime !== null) return state;
        return {
            ...state,
            ruinProfitState: {
                startTime: Date.now(),
            }
        };
    }
    case 'CLAIM_PROFIT': {
        const { earnings } = action.payload;
        return {
            ...state,
            money: state.money + earnings,
            ruinProfitState: {
                startTime: null,
            }
        };
    }
    case 'BUY_TENANT': {
        const { tenant, cost } = action.payload;
        return {
            ...state,
            money: state.money - cost,
            tenants: [...state.tenants, tenant],
            tenantProfitState: {
                ...state.tenantProfitState,
                [tenant.id]: { startTime: null }
            }
        };
    }
    case 'BUY_COMPANY': {
        const { company, cost } = action.payload;
        const existingCount = state.companies.filter(c => c.typeId === company.typeId).length;
        if (existingCount >= 10) {
            return state; 
        }
        return {
            ...state,
            money: state.money - cost,
            companies: [...state.companies, company],
        };
    }
    case 'ASSIGN_COMPANY_TO_TENANT': {
        const { companyId, tenantId } = action.payload;
        return {
            ...state,
            companies: state.companies.map(c => c.id === companyId ? { ...c, tenantId } : c)
        };
    }
    case 'REMOVE_COMPANY_FROM_TENANT': {
         const { companyId } = action.payload;
        return {
            ...state,
            companies: state.companies.map(c => c.id === companyId ? { ...c, tenantId: null } : c)
        };
    }
    case 'PRODUCE_PRODUCT': {
        const { companyId, productId, quantity } = action.payload;
        const product = state.productData[productId];
        const company = state.companies.find(c => c.id === companyId);
        if (!product || !company) return state;

        let canProduce = true;
        const updatedProducts = { ...state.products };
        Object.entries(product.recipe).forEach(([cropId, required]) => {
            if ((updatedProducts[cropId] || 0) < required * quantity) {
                canProduce = false;
            }
            updatedProducts[cropId] -= required * quantity;
        });

        if (!canProduce) return state;

        const newProductionRecord = Math.max(company.productionRecord, quantity);
        const updatedCompanies = state.companies.map(c => {
            if (c.id === companyId) {
                const updatedCompany = { ...c, productionRecord: newProductionRecord };
                return { ...updatedCompany, marketValue: calculateMarketValue(updatedCompany, state.companyData) };
            }
            return c;
        });

        return {
            ...state,
            products: updatedProducts,
            companyProducts: {
                ...state.companyProducts,
                [productId]: (state.companyProducts[productId] || 0) + quantity,
            },
            companies: updatedCompanies,
        };
    }
    case 'SELL_COMPANY_PRODUCT': {
        const { productId, quantity, earnings } = action.payload;
        return {
            ...state,
            money: state.money + earnings,
            companyProducts: {
                ...state.companyProducts,
                [productId]: (state.companyProducts[productId] || 0) - quantity,
            },
        };
    }
    case 'ASSIGN_CITIZENS': {
        const { targetId, targetType, amount } = action.payload;
        if (state.citizens < amount) return state;

        let updatedCompanies = [...state.companies];
        let updatedTenants = [...state.tenants];

        if (targetType === 'company') {
            updatedCompanies = state.companies.map(c => {
                if (c.id === targetId) {
                    const updatedCompany = { ...c, assignedCitizens: c.assignedCitizens + amount };
                    return { ...updatedCompany, marketValue: calculateMarketValue(updatedCompany, state.companyData) };
                }
                return c;
            });
        } else { 
            updatedTenants = state.tenants.map(t => t.id === targetId ? { ...t, assignedCitizens: t.assignedCitizens + amount } : t);
        }

        return {
            ...state,
            citizens: state.citizens - amount,
            companies: updatedCompanies,
            tenants: updatedTenants,
        };
    }
    case 'WITHDRAW_CITIZENS': {
        const { targetId, targetType, amount } = action.payload;

        let updatedCompanies = [...state.companies];
        let updatedTenants = [...state.tenants];
        let citizensToReturn = 0;

        if (targetType === 'company') {
            updatedCompanies = state.companies.map(c => {
                if (c.id === targetId) {
                    citizensToReturn = Math.min(c.assignedCitizens, amount);
                    const updatedCompany = { ...c, assignedCitizens: c.assignedCitizens - citizensToReturn };
                    return { ...updatedCompany, marketValue: calculateMarketValue(updatedCompany, state.companyData) };
                }
                return c;
            });
        } else { 
            updatedTenants = state.tenants.map(t => {
                if (t.id === targetId) {
                    citizensToReturn = Math.min(t.assignedCitizens, amount);
                    return { ...t, assignedCitizens: t.assignedCitizens - citizensToReturn };
                }
                return t;
            });
        }
        return {
            ...state,
            citizens: state.citizens + citizensToReturn,
            companies: updatedCompanies,
            tenants: updatedTenants,
        };
    }
    case 'START_TENANT_PROFIT_COLLECTION': {
        const { tenantId } = action.payload;
        return {
            ...state,
            tenantProfitState: {
                ...state.tenantProfitState,
                [tenantId]: { startTime: Date.now() },
            }
        };
    }
    case 'CLAIM_TENANT_PROFIT': {
        const { tenantId, earnings } = action.payload;
        return {
            ...state,
            money: state.money + earnings,
            tenantProfitState: {
                ...state.tenantProfitState,
                [tenantId]: { startTime: null },
            }
        };
    }
    case 'START_MINING': {
        if (state.mineState.startTime !== null) return state;
        return { ...state, mineState: { startTime: Date.now() } };
    }
    case 'COLLECT_MINERALS': {
        const { collected } = action.payload;
        const updatedMinerals = { ...state.minerals };
        for (const mineralId in collected) {
            updatedMinerals[mineralId] = (updatedMinerals[mineralId] || 0) + collected[mineralId];
        }
        return {
            ...state,
            minerals: updatedMinerals,
            mineState: { startTime: null },
        };
    }
    case 'SELL_MINERAL': {
        const { mineralId, quantity, earnings } = action.payload;
        return {
            ...state,
            money: state.money + earnings,
            minerals: {
                ...state.minerals,
                [mineralId]: (state.minerals[mineralId] || 0) - quantity,
            },
        };
    }
    case 'CRAFT_WEAPON': {
        const { weaponId } = action.payload;
        const weaponInfo = INITIAL_WEAPONS[weaponId];
        if (!weaponInfo) return state;

        const canCraft = Object.entries(weaponInfo.recipe).every(
            ([mineralId, required]) => (state.minerals[mineralId] || 0) >= required
        );

        if (!canCraft) return state;

        const updatedMinerals = { ...state.minerals };
        Object.entries(weaponInfo.recipe).forEach(
            ([mineralId, required]) => {
                updatedMinerals[mineralId] -= required;
            }
        );

        return {
            ...state,
            minerals: updatedMinerals,
            weapons: {
                ...state.weapons,
                [weaponId]: (state.weapons[weaponId] || 0) + 1,
            },
        };
    }
    case 'SELL_WEAPON': {
        const { weaponId, quantity, earnings } = action.payload;
        return {
            ...state,
            money: state.money + earnings,
            weapons: {
                ...state.weapons,
                [weaponId]: (state.weapons[weaponId] || 0) - quantity,
            },
        };
    }
    case 'CONQUER_COUNTRY': {
        const { countryId } = action.payload;
        const countryInfo = COUNTRY_DATA[countryId];
        if (!countryInfo || state.countries[countryId]) return state;

        const hasEnoughWeapons = Object.entries(countryInfo.conquestRequirements).every(
            ([weaponId, required]) => (state.weapons[weaponId] || 0) >= required
        );
        if (!hasEnoughWeapons) return state;

        const updatedWeapons = { ...state.weapons };
        Object.entries(countryInfo.conquestRequirements).forEach(
            ([weaponId, required]) => {
                updatedWeapons[weaponId] -= required;
            }
        );

        return {
            ...state,
            weapons: updatedWeapons,
            citizens: state.citizens + countryInfo.conquestCitizenReward,
            countries: {
                ...state.countries,
                [countryId]: {
                    militaryLevel: 1,
                    economicLevel: 1,
                    politicalLevel: 1,
                    bonds: 0,
                    productionState: { startTime: null },
                }
            }
        };
    }
    case 'START_COUNTRY_PRODUCTION': {
        const { countryId } = action.payload;
        const countryState = state.countries[countryId];
        if (!countryState || countryState.productionState.startTime !== null) return state;
        
        return {
            ...state,
            countries: {
                ...state.countries,
                [countryId]: {
                    ...countryState,
                    productionState: { startTime: Date.now() }
                }
            }
        };
    }
    case 'COLLECT_COUNTRY_PRODUCTION': {
        const { countryId, specialtyGoodId, goodsAmount, bondsAmount } = action.payload;
        const countryState = state.countries[countryId];
        if (!countryState) return state;

        return {
            ...state,
            specialtyGoods: {
                ...state.specialtyGoods,
                [specialtyGoodId]: (state.specialtyGoods[specialtyGoodId] || 0) + goodsAmount,
            },
            countries: {
                ...state.countries,
                [countryId]: {
                    ...countryState,
                    bonds: countryState.bonds + bondsAmount,
                    productionState: { startTime: null }
                }
            }
        };
    }
    case 'UPGRADE_COUNTRY_RANK': {
        const { countryId, rank } = action.payload;
        const countryState = state.countries[countryId];
        if (!countryState) return state;
        
        const currentLevel = countryState[rank];
        if (currentLevel >= 10) return state;

        const cost = RANK_UPGRADE_BASE_COST * (currentLevel + 1);
        if (countryState.bonds < cost) return state;

        return {
            ...state,
            countries: {
                ...state.countries,
                [countryId]: {
                    ...countryState,
                    [rank]: currentLevel + 1,
                    bonds: countryState.bonds - cost,
                }
            }
        };
    }
    case 'SELL_SPECIALTY_GOOD': {
        const { specialtyGoodId, quantity, earnings } = action.payload;
        return {
            ...state,
            money: state.money + earnings,
            specialtyGoods: {
                ...state.specialtyGoods,
                [specialtyGoodId]: (state.specialtyGoods[specialtyGoodId] || 0) - quantity,
            },
        };
    }
    case 'BUY_NATION': {
        const { nation, cost } = action.payload;
        return {
            ...state,
            money: state.money - cost,
            nations: [...state.nations, nation],
        };
    }
    case 'REROLL_NATION_ALL_ATTRIBUTES': {
        const { nationId, cost } = action.payload;
        if (state.money < cost) return state;

        const newAttributes: Nation['attributes'] = {
            ideology: null, leader: null, hero: null, agriculture: null, industry: null, terrain: null, entertainment: null
        };

        (Object.keys(NATION_ATTRIBUTE_DATA) as NationAttributeCategory[]).forEach(category => {
            const data = NATION_ATTRIBUTE_DATA[category];
            const options = Object.keys(data.enum);
            const randomValue = options[Math.floor(Math.random() * options.length)] as NationAttribute;
            (newAttributes as any)[category] = randomValue;
        });

        return {
            ...state,
            money: state.money - cost,
            nations: state.nations.map(n =>
                n.id === nationId
                    ? { ...n, attributes: newAttributes }
                    : n
            ),
        };
    }
    case 'FINALIZE_NATION': {
        return {
            ...state,
            nations: state.nations.map(n => 
                n.id === action.payload.nationId ? { ...n, isFinalized: true } : n
            ),
        };
    }
    case 'SET_ACTIVE_NATION': {
        return {
            ...state,
            activeNationId: action.payload.nationId,
        };
    }
    case 'ALLOCATE_SKILL_POINTS': {
        return {
            ...state,
            skillTree: action.payload.newSkillTree,
        };
    }
    case 'RESET_SKILL_POINTS': {
        const { cost } = action.payload;
        if (state.money < cost) return state;
        return {
            ...state,
            money: state.money - cost,
            skillTree: {
                cropTime: 0,
                mineTime: 0,
                sellPrice: 0,
                fragmentChance: 0,
                countryTime: 0,
                tenantTime: 0,
            },
        };
    }
    case 'START_RECRUITMENT': {
        if (state.recruiterState.startTime !== null) return state;
        return {
            ...state,
            recruiterState: {
                ...state.recruiterState,
                startTime: Date.now(),
            }
        };
    }
    case 'CLAIM_CITIZENS': {
        return {
            ...state,
            citizens: state.citizens + action.payload.amount,
            recruiterState: {
                ...state.recruiterState,
                startTime: null,
            }
        };
    }
    case 'BUY_RECRUITER_ITEM': {
        const { itemType, cost } = action.payload;
        if (state.citizens < cost) return state;
        
        const newRecruiterState = { ...state.recruiterState };
        if (itemType === 'citizenIncrease') {
            newRecruiterState.citizenIncreaseItems += 50;
        } else {
            newRecruiterState.timeReductionItems += 50;
        }

        return {
            ...state,
            citizens: state.citizens - cost,
            recruiterState: newRecruiterState,
        };
    }
    case 'LOAD_GAME': {
        const { newState } = action.payload;
        return {
            ...newState,
            nations: newState.nations || [],
            activeNationId: newState.activeNationId || null,
            skillTree: newState.skillTree || initialGameState.skillTree,
            recruiterState: newState.recruiterState || initialGameState.recruiterState,
            nbaState: newState.nbaState || initialGameState.nbaState,
            tutorialCompleted: newState.tutorialCompleted ?? true,
        };
    }
    case 'SET_NBA_TEAM_NAME':
        return {
            ...state,
            nbaState: { ...state.nbaState, teamName: action.payload.name },
        };
    case 'HIRE_NBA_PLAYER':
        return {
            ...state,
            money: state.money - action.payload.cost,
            nbaState: {
                ...state.nbaState,
                roster: [...state.nbaState.roster, action.payload.player],
            },
        };
    case 'FIRE_NBA_PLAYER':
        return {
            ...state,
            nbaState: {
                ...state.nbaState,
                roster: state.nbaState.roster.filter(p => p.id !== action.payload.playerId),
            },
        };
    case 'SET_CONFERENCE_STATUS':
        return {
            ...state,
            nbaState: {
                ...state.nbaState,
                conference: {
                    ...state.nbaState.conference,
                    status: action.payload.status,
                },
            },
        };
    case 'CREATE_NBA_TOURNAMENT': {
        const { selectedPlayers } = action.payload;

        let strength = selectedPlayers.reduce((sum, player) => sum + player.stats.shooting + player.stats.dunking + player.stats.dribbling, 0);

        const positions = new Set(selectedPlayers.map(p => p.position));
        const forwardCount = selectedPlayers.filter(p => p.position === 'Forward').length;
        if (positions.has('Center') && positions.has('Point Guard') && positions.has('Shooting Guard') && forwardCount === 2 && selectedPlayers.length === 5) {
            strength *= 2;
        }
        
        const opponents: OpponentTeam[] = NBA_OPPONENT_TEAMS.map(name => ({
            name,
            strength: Math.floor(Math.random() * (100 - 40 + 1)) + 40,
        }));

        const playerTeamName = state.nbaState.teamName!;
        const allTeams = [playerTeamName, ...opponents.map(o => o.name)];
        for (let i = allTeams.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allTeams[i], allTeams[j]] = [allTeams[j], allTeams[i]];
        }
        const bracket: Bracket = [allTeams];
        let remainingTeams = allTeams.length;
        while(remainingTeams > 1) {
            remainingTeams /= 2;
            bracket.push(new Array(remainingTeams).fill(null));
        }

        const newTournament: Tournament = {
            bracket,
            results: [],
            playerTeamStrength: strength,
            opponents,
        };

        return {
            ...state,
            nbaState: {
                ...state.nbaState,
                conference: {
                    ...state.nbaState.conference,
                    status: 'active',
                    tournament: newTournament,
                },
            },
        };
    }
    case 'SIMULATE_NBA_TOURNAMENT': {
        if (!state.nbaState.conference.tournament) return state;

        const playerTeamName = state.nbaState.teamName!;
        const { bracket, playerTeamStrength, opponents } = state.nbaState.conference.tournament;
        const newBracket = JSON.parse(JSON.stringify(bracket));
        const results: MatchResult[] = [];
        let matchIdCounter = 0;

        const getTeamStrength = (name: string): number => {
            if (name === playerTeamName) return playerTeamStrength;
            return opponents.find(o => o.name === name)?.strength || 0;
        };

        for (let round = 0; round < newBracket.length - 1; round++) {
            const currentRoundTeams = newBracket[round];
            const nextRoundTeams = newBracket[round + 1];

            for (let i = 0; i < currentRoundTeams.length; i += 2) {
                const teamAName = currentRoundTeams[i]!;
                const teamBName = currentRoundTeams[i + 1]!;
                const teamAStrength = getTeamStrength(teamAName);
                const teamBStrength = getTeamStrength(teamBName);

                let winnerName: string;
                if (teamAStrength > teamBStrength) {
                    winnerName = Math.random() < 0.8 ? teamAName : teamBName;
                } else if (teamBStrength > teamAStrength) {
                    winnerName = Math.random() < 0.8 ? teamBName : teamAName;
                } else { 
                    winnerName = Math.random() < 0.5 ? teamAName : teamBName;
                }
                
                nextRoundTeams[i / 2] = winnerName;

                results.push({
                    matchId: matchIdCounter++,
                    round: round + 1,
                    teams: [teamAName, teamBName],
                    winner: winnerName,
                    isPlayerMatch: teamAName === playerTeamName || teamBName === playerTeamName,
                    playerTeamStrength: teamAName === playerTeamName ? teamAStrength : (teamBName === playerTeamName ? teamBStrength : undefined),
                    opponentTeamStrength: teamAName === playerTeamName ? teamBStrength : (teamBName === playerTeamName ? teamAStrength : undefined),
                });
            }
        }
        
        return {
            ...state,
            nbaState: {
                ...state.nbaState,
                conference: {
                    ...state.nbaState.conference,
                    status: 'finished',
                    tournament: {
                        ...state.nbaState.conference.tournament,
                        bracket: newBracket,
                        results: results,
                    },
                },
            },
        };
    }
    case 'END_NBA_TOURNAMENT': {
        const { earnings, trophyWon } = action.payload;
        return {
            ...state,
            money: state.money + earnings,
            nbaState: {
                ...state.nbaState,
                trophies: (typeof state.nbaState.trophies === 'number' ? state.nbaState.trophies : 0) + (trophyWon ? 1 : 0),
                conference: {
                    ...initialGameState.nbaState.conference,
                    lastPlayed: Date.now(),
                },
            },
        };
    }
    case 'COMPLETE_TUTORIAL':
        return {
            ...state,
            tutorialCompleted: true,
        };
    default:
      return state;
  }
}

type Tab = 'Farm' | 'Warehouse' | 'Market' | 'Lab' | 'Ruins' | 'Company' | 'Tenant' | 'Mine' | 'Smithy' | 'Country' | 'Nationalism' | '斡旋業者' | 'NBA' | 'System';

const App: React.FC = () => {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
  const [activeTab, setActiveTab] = useState<Tab>('Farm');
  const [now, setNow] = useState(Date.now());
  const { imageUrl: bgImageUrl, loading: bgLoading } = usePixelArtGen("beautiful farm landscape, green fields, blue sky, white clouds, distant mountains, pixel art style, 16-bit, detailed", "16:9");

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const gameBonuses = useMemo(() => {
    const bonuses = {
        countryTimeReduction: 0,
        cropTimeReduction: 0,
        sellPriceMultiplier: 1,
        mineTimeReduction: 0,
        fragmentChanceIncrease: 0,
        ruinTimeReduction: 0,
        tenantTimeReduction: 0,
    };

    let nationSellPriceBonus = 0;
    
    if (gameState.activeNationId) {
        const activeNation = gameState.nations.find(n => n.id === gameState.activeNationId);
        if (activeNation) {
            const effectCounts: Partial<Record<NationEffect, number>> = {};
            const attributeCategories: NationAttributeCategory[] = ['ideology', 'leader', 'hero', 'agriculture', 'industry', 'terrain', 'entertainment'];
            attributeCategories.forEach(category => {
                const attribute = activeNation.attributes[category];
                if (attribute) {
                    const data = NATION_ATTRIBUTE_DATA[category];
                    if (data && data.options[attribute]) {
                        const effect = data.options[attribute].effect;
                        effectCounts[effect] = (effectCounts[effect] || 0) + 1;
                    }
                }
            });

            const countryTimeCount = effectCounts[NationEffect.CountryTime];
            if (typeof countryTimeCount === 'number') bonuses.countryTimeReduction += countryTimeCount * NATION_EFFECT_BONUSES[NationEffect.CountryTime];
            
            const cropTimeCount = effectCounts[NationEffect.CropTime];
            if (typeof cropTimeCount === 'number') bonuses.cropTimeReduction += cropTimeCount * NATION_EFFECT_BONUSES[NationEffect.CropTime];
            
            const sellPriceCount = effectCounts[NationEffect.SellPrice];
            if (typeof sellPriceCount === 'number') nationSellPriceBonus = sellPriceCount * NATION_EFFECT_BONUSES[NationEffect.SellPrice];
            
            const mineTimeCount = effectCounts[NationEffect.MineTime];
            if (typeof mineTimeCount === 'number') bonuses.mineTimeReduction += mineTimeCount * NATION_EFFECT_BONUSES[NationEffect.MineTime];

            const ruinTimeCount = effectCounts[NationEffect.RuinTime];
            if (typeof ruinTimeCount === 'number') bonuses.ruinTimeReduction += ruinTimeCount * NATION_EFFECT_BONUSES[NationEffect.RuinTime];

            const fragmentChanceCount = effectCounts[NationEffect.FragmentChance];
            if (typeof fragmentChanceCount === 'number') bonuses.fragmentChanceIncrease += fragmentChanceCount * NATION_EFFECT_BONUSES[NationEffect.FragmentChance];
        }
    }
    
    bonuses.cropTimeReduction += gameState.skillTree.cropTime * SKILL_BONUSES.cropTime;
    bonuses.mineTimeReduction += gameState.skillTree.mineTime * SKILL_BONUSES.mineTime;
    bonuses.countryTimeReduction += gameState.skillTree.countryTime * SKILL_BONUSES.countryTime;
    bonuses.tenantTimeReduction += gameState.skillTree.tenantTime * SKILL_BONUSES.tenantTime;
    
    const skillSellPriceBonus = gameState.skillTree.sellPrice * SKILL_BONUSES.sellPrice;
    bonuses.sellPriceMultiplier = 1 + nationSellPriceBonus + skillSellPriceBonus;

    return bonuses;
  }, [gameState.activeNationId, gameState.nations, gameState.skillTree]);


  const handleResearch = useCallback((cropId: string) => {
    let statToUpgrade: keyof GameState['cropData'][string]['stats'] | null = null;
    if (Math.random() < RESEARCH_SUCCESS_RATE) {
        const stats: (keyof GameState['cropData'][string]['stats'])[] = ['taste', 'durability', 'appearance'];
        statToUpgrade = stats[Math.floor(Math.random() * stats.length)];
    }
    dispatch({ type: 'RESEARCH', payload: { cropId, statToUpgrade } });
  }, []);

  const handleClaimProfit = (tenantId: string) => {
    const tenant = gameState.tenants.find(t => t.id === tenantId);
    if (!tenant) return;
    const companiesInTenant = gameState.companies.filter(c => c.tenantId === tenantId);
    const totalMarketValue = companiesInTenant.reduce((sum, c) => sum + c.marketValue, 0);
    const earnings = (totalMarketValue * TENANT_PROFIT_MARKET_VALUE_MULTIPLIER) + (tenant.assignedCitizens * TENANT_PROFIT_CITIZEN_BONUS);
    
    dispatch({ type: 'CLAIM_TENANT_PROFIT', payload: { tenantId, earnings: Math.floor(earnings) } });
  };
  
  const handleClaimRuinProfit = () => {
      const totalRuins = Object.values(gameState.ruins).reduce((sum: number, count: number) => sum + count, 0);
      dispatch({ type: 'CLAIM_PROFIT', payload: { earnings: totalRuins * BASE_PROFIT_PER_RUIN } });
  };

  const tabItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'Market', label: '市場', icon: <MarketIcon /> },
    { id: 'Farm', label: '農場', icon: <FarmIcon /> },
    { id: 'Warehouse', label: '倉庫', icon: <WarehouseIcon /> },
    { id: 'Lab', label: '研究所', icon: <LabIcon /> },
    { id: 'Company', label: '会社', icon: <CompanyIcon /> },
    { id: 'Tenant', label: 'テナント', icon: <TenantIcon /> },
    { id: 'Mine', label: '鉱山', icon: <MineIcon /> },
    { id: 'Smithy', label: '鍛冶屋', icon: <SmithyIcon /> },
    { id: 'Ruins', label: '遺跡', icon: <RuinsIcon /> },
    { id: 'Country', label: '世界征服', icon: <CountryIcon /> },
    { id: 'Nationalism', label: '国家', icon: <NationalismIcon /> },
    { id: '斡旋業者', label: '斡旋', icon: <RecruiterIcon /> },
    { id: 'NBA', label: 'NBA', icon: <NBAIcon /> },
    { id: 'System', label: 'システム', icon: <SystemIcon /> },
  ];

  return (
    <div className="min-h-screen bg-[#fdf6e3] text-[#4a3b32] font-sans selection:bg-[#facc15] selection:text-[#4a3b32] overflow-x-hidden">
        {/* Background Image Layer */}
        <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
             {bgLoading ? (
                 <div className="w-full h-full bg-gray-200 animate-pulse"></div>
             ) : (
                 <img src={bgImageUrl} alt="Background" className="w-full h-full object-cover" style={{ imageRendering: 'pixelated' }} />
             )}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 pb-24">
            {/* Header Stats */}
            <header className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white/90 backdrop-blur-sm border-4 border-[#4a3b32] p-4 shadow-[8px_8px_0px_0px_#000] sticky top-4 z-30 animate-slide-down">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#4a3b32] tracking-wider flex items-center gap-2">
                        <span>🌾</span> ますえり鬼畜農場
                    </h1>
                    {gameState.activeNationId && (
                        <span className="px-2 py-1 bg-[#dcfce7] border border-[#16a34a] text-[#16a34a] text-xs font-bold rounded">
                            {gameState.nations.find(n => n.id === gameState.activeNationId)?.name}
                        </span>
                    )}
                </div>
                <div className="flex flex-wrap justify-center gap-6">
                    <div className="flex items-center bg-[#fef3c7] px-4 py-2 border-2 border-[#d97706] shadow-sm" data-tutorial-id="money-display">
                        <MoneyIcon />
                        <span className="text-xl md:text-2xl font-bold text-[#b45309] ml-2 font-mono">{new Intl.NumberFormat('ja-JP').format(gameState.money)} 円</span>
                    </div>
                     <div className="flex items-center bg-[#e0f2fe] px-4 py-2 border-2 border-[#0284c7] shadow-sm">
                        <CitizenIcon />
                        <span className="text-xl md:text-2xl font-bold text-[#0369a1] ml-2 font-mono">{new Intl.NumberFormat('ja-JP').format(gameState.citizens)} 人</span>
                    </div>
                </div>
            </header>

            <main>
                {activeTab === 'Farm' && <FarmView gameState={gameState} dispatch={dispatch} now={now} bonuses={gameBonuses} />}
                {activeTab === 'Warehouse' && <WarehouseView gameState={gameState} dispatch={dispatch} bonuses={gameBonuses} />}
                {activeTab === 'Market' && <MarketView gameState={gameState} dispatch={dispatch} />}
                {activeTab === 'Lab' && <LabView gameState={gameState} dispatch={dispatch} onResearch={handleResearch} />}
                {activeTab === 'Ruins' && <RuinsView gameState={gameState} dispatch={dispatch} now={now} onClaimProfit={handleClaimRuinProfit} bonuses={gameBonuses} />}
                {activeTab === 'Company' && <CompanyView gameState={gameState} dispatch={dispatch} />}
                {activeTab === 'Tenant' && <TenantView gameState={gameState} dispatch={dispatch} now={now} onClaimProfit={handleClaimProfit} bonuses={gameBonuses} />}
                {activeTab === 'Mine' && <MineView gameState={gameState} dispatch={dispatch} now={now} bonuses={gameBonuses} />}
                {activeTab === 'Smithy' && <SmithyView gameState={gameState} dispatch={dispatch} />}
                {activeTab === 'Country' && <CountryView gameState={gameState} dispatch={dispatch} now={now} bonuses={gameBonuses} />}
                {activeTab === 'Nationalism' && <NationalismView gameState={gameState} dispatch={dispatch} />}
                {activeTab === '斡旋業者' && <RecruiterView gameState={gameState} dispatch={dispatch} now={now} />}
                {activeTab === 'NBA' && <NBAView gameState={gameState} dispatch={dispatch} now={now} />}
                {activeTab === 'System' && <SystemView gameState={gameState} dispatch={dispatch} />}
            </main>
        </div>

        {/* Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 w-full bg-[#4a3b32] text-[#fdf6e3] p-2 overflow-x-auto z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)]" data-tutorial-id="tabs-nav">
            <div className="flex space-x-2 min-w-max px-2 justify-center">
                {tabItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        id={`${item.id.toLowerCase()}-tab`}
                        data-tutorial-id={`${item.id.toLowerCase()}-tab`}
                        className={`flex flex-col items-center justify-center min-w-[70px] py-2 px-3 transition-all duration-200 border-t-4 ${
                            activeTab === item.id
                            ? 'bg-[#fef3c7] text-[#4a3b32] border-[#facc15] -translate-y-2 rounded-t-lg shadow-lg'
                            : 'hover:bg-[#5d4b3e] border-transparent hover:border-[#a8a29e]'
                        }`}
                    >
                        <div className="text-2xl mb-1">{item.icon}</div>
                        <span className="text-xs font-bold whitespace-nowrap">{item.label}</span>
                    </button>
                ))}
            </div>
        </nav>
        
        <MiniMapView gameState={gameState} now={now} bonuses={gameBonuses} />
        
        {!gameState.tutorialCompleted && <Tutorial dispatch={dispatch} />}
    </div>
  );
};

export default App;
