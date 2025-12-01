
import React from 'react';
import { GameState, GameAction, CountryId } from '../types';
import { 
    ALL_COUNTRIES, COUNTRY_DATA, INITIAL_WEAPONS, INITIAL_SPECIALTY_GOODS, RANK_UPGRADE_BASE_COST, 
    COUNTRY_PRODUCTION_DURATION_MS, BASE_GOODS_PER_PRODUCTION, BASE_BONDS_PER_PRODUCTION 
} from '../constants';

interface CountryViewProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  now: number;
  bonuses: { countryTimeReduction: number };
}

const countryEmojis: Record<CountryId, string> = {
    usa: '🇺🇸',
    canada: '🇨🇦',
    russia: '🇷🇺',
    japan: '🇯🇵',
 afghanistan: '🇦🇫',
 ireland: '🇮🇪',
 azerbaijan: '🇦🇿',
 unitedarabemirates: '🇦🇪',
 albania: '🇦🇱',
 algeria: '🇩🇿',
 argentina: '🇦🇷',
 armenia: '🇦🇲',
 angola: '🇦🇴',
 antiguaandbarbuda: '🇦🇬',
};


const CountryCard: React.FC<{
    countryId: CountryId,
    isLocked: boolean,
    gameState: GameState,
    dispatch: React.Dispatch<GameAction>,
    now: number
    bonuses: { countryTimeReduction: number };
}> = ({ countryId, isLocked, gameState, dispatch, now, bonuses }) => {
    const countryInfo = COUNTRY_DATA[countryId];
    const countryState = gameState.countries[countryId];
    const effectiveProductionTime = COUNTRY_PRODUCTION_DURATION_MS * (1 - bonuses.countryTimeReduction);

    if (isLocked) {
        return (
            <div className="pixel-card p-6 text-center text-gray-400 bg-gray-100 opacity-70 border-dashed">
                <div className="text-4xl mb-4 grayscale opacity-50">
                    {countryEmojis[countryId]}
                </div>
                <h3 className="text-2xl font-bold">{countryInfo.name}</h3>
                <p className="mt-2 font-bold">🔒 未到達</p>
            </div>
        );
    }
    
    const handleConquer = () => {
        dispatch({ type: 'CONQUER_COUNTRY', payload: { countryId } });
    }

    if (!countryState) { // Not conquered, but unlocked
        const canConquer = Object.entries(countryInfo.conquestRequirements).every(
            ([weaponId, required]) => (gameState.weapons[weaponId] || 0) >= required
        );
        return (
            <div className="pixel-card p-6 bg-[#fff1f2]">
                 <h3 className="text-2xl font-bold text-[#b91c1c] flex items-center gap-3">{countryEmojis[countryId]} {countryInfo.name}</h3>
                 <p className="mt-2 mb-4 text-[#7f1d1d] text-sm">征服して、新たな国民と特産品を手に入れましょう。</p>
                 <div className="my-4 border-t-2 border-[#b91c1c] pt-4">
                  <h4 className="font-bold text-[#7f1d1d] mb-2">征服条件:</h4>
                  <ul className="space-y-1 text-sm">
                    {Object.entries(countryInfo.conquestRequirements).map(([weaponId, required]) => {
                      const owned = gameState.weapons[weaponId] || 0;
                      const has = owned >= required;
                      return (
                        <li key={weaponId} className={`flex justify-between p-2 border border-[#fecaca] ${has ? 'bg-[#dcfce7] text-[#15803d]' : 'bg-white text-[#b91c1c]'}`}>
                          <span className="font-bold">{INITIAL_WEAPONS[weaponId].name}</span>
                          <span className="font-mono font-bold">{owned} / {required}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <button onClick={handleConquer} disabled={!canConquer} className="w-full mt-4 bg-[#ef4444] hover:bg-[#dc2626] disabled:bg-gray-400 text-white font-bold py-3 px-4 pixel-btn">
                    征服する
                </button>
            </div>
        );
    }

    // Conquered
    const { militaryLevel, economicLevel, politicalLevel, bonds, productionState } = countryState;
    const totalLevels = militaryLevel + economicLevel + politicalLevel;
    const goodsAmount = BASE_GOODS_PER_PRODUCTION + Math.floor((totalLevels-3) / 5);
    const bondsAmount = BASE_BONDS_PER_PRODUCTION + (totalLevels - 3) * 2;

    const ranks: {key: 'militaryLevel' | 'economicLevel' | 'politicalLevel', name: string}[] = [
        { key: 'militaryLevel', name: '軍事力' },
        { key: 'economicLevel', name: '経済力' },
        { key: 'politicalLevel', name: '政治力' },
    ];
    
    const handleUpgrade = (rank: 'militaryLevel' | 'economicLevel' | 'politicalLevel') => {
        dispatch({ type: 'UPGRADE_COUNTRY_RANK', payload: { countryId, rank } });
    };

    const isProfitReady = productionState.startTime !== null && now - productionState.startTime >= effectiveProductionTime;
    const timeLeftMs = productionState.startTime !== null ? (productionState.startTime + effectiveProductionTime) - now : 0;
    
    const formatTimeLeft = (ms: number) => {
        if (ms <= 0) return '回収可能';
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `残り ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleStartProduction = () => {
        dispatch({ type: 'START_COUNTRY_PRODUCTION', payload: { countryId } });
    }
    
    const handleCollect = () => {
        dispatch({ type: 'COLLECT_COUNTRY_PRODUCTION', payload: { countryId, specialtyGoodId: countryInfo.specialtyGoodId, goodsAmount, bondsAmount }});
    }

    return (
         <details className="pixel-card open:bg-[#f0fdf4] mb-4" open>
            <summary className="text-xl font-bold p-4 cursor-pointer list-none flex justify-between items-center text-[#15803d] bg-white border-b-2 border-[#4a3b32]">
                <span className="flex items-center gap-3">{countryEmojis[countryId]} {countryInfo.name}</span>
                <span>▼</span>
            </summary>
            <div className="p-4 space-y-4">
                {/* Production Section */}
                <div className="bg-white border-2 border-[#86efac] p-4">
                    <h4 className="font-bold text-[#15803d] mb-2">特産品生産</h4>
                    <p className="text-sm text-gray-600">生産品: {INITIAL_SPECIALTY_GOODS[countryInfo.specialtyGoodId].name} x{goodsAmount}, 国債 x{bondsAmount}</p>
                    <div className="mt-3">
                         {productionState.startTime === null ? (
                            <button onClick={handleStartProduction} className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-2 px-4 pixel-btn">生産開始</button>
                         ) : isProfitReady ? (
                             <button onClick={handleCollect} className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-[#2d1b2e] font-bold py-2 px-4 pixel-btn animate-bounce-pixel">回収</button>
                         ) : (
                             <div className="text-center">
                                 <p className="text-sm font-mono font-bold text-[#4b5563] mb-1">{formatTimeLeft(timeLeftMs)}</p>
                                 <div className="w-full bg-gray-300 h-3 border border-[#4a3b32]">
                                    <div className="bg-[#16a34a] h-full" style={{ width: `${100 - (timeLeftMs / effectiveProductionTime) * 100}%` }}></div>
                                </div>
                             </div>
                         )}
                    </div>
                </div>

                {/* Ranks Section */}
                <div className="bg-white border-2 border-[#86efac] p-4">
                    <h4 className="font-bold text-[#15803d] mb-2 flex justify-between">国力 <span className="text-sm text-[#4b5563]">国債: {bonds}</span></h4>
                    <div className="space-y-3">
                        {ranks.map(rank => {
                            const level = countryState[rank.key];
                            const cost = RANK_UPGRADE_BASE_COST * (level + 1);
                            const canUpgrade = bonds >= cost && level < 10;
                            return (
                                <div key={rank.key} className="flex items-center justify-between border-b border-gray-100 pb-1">
                                    <div>
                                        <p className="font-bold text-[#2d1b2e]">{rank.name}</p>
                                        <p className="text-xs text-gray-500">Lv. {level} / 10</p>
                                    </div>
                                    <button onClick={() => handleUpgrade(rank.key)} disabled={!canUpgrade} className="bg-[#0ea5e9] hover:bg-[#0284c7] disabled:bg-gray-400 text-white font-bold py-1 px-3 text-xs pixel-btn">
                                        {level < 10 ? `強化 (${cost})` : 'MAX'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </details>
    );
};


const CountryView: React.FC<CountryViewProps> = ({ gameState, dispatch, now, bonuses }) => {
    let prereqConquered = true;

    return (
        <div className="animate-fade-in pb-20">
            <h2 className="text-3xl font-bold text-[#4a3b32] mb-6 text-center bg-[#dcfce7] border-4 border-[#4a3b32] p-4 inline-block shadow-[6px_6px_0px_0px_#4a3b32]">🌍 世界征服</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ALL_COUNTRIES.map(countryId => {
                    const isLocked = !prereqConquered;
                    const isConquered = !!gameState.countries[countryId];
                    if (!isLocked) {
                        prereqConquered = isConquered;
                    }
                    
                    return <CountryCard key={countryId} countryId={countryId} isLocked={isLocked} gameState={gameState} dispatch={dispatch} now={now} bonuses={bonuses} />;
                })}
            </div>
        </div>
    );
};

export default CountryView;
