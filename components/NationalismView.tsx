
import React, { useState } from 'react';
import { GameState, GameAction, Nation, NationAttributeCategory } from '../types';
import { 
    NATION_COST, NATION_REROLL_COST, NATION_ATTRIBUTE_DATA, 
    NATION_EFFECT_DESCRIPTIONS, NationEffect, NATION_EFFECT_BONUSES 
} from '../constants';
import { 
    CountryTimeIcon, CropTimeIcon, SellPriceIcon, MineIcon, FragmentChanceIcon, RuinTimeIcon,
    NationalismIcon, CrownIcon, ShieldIcon, FarmIcon, SystemIcon, TerrainIcon, EntertainmentIcon 
} from './icons';

interface NationalismViewProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const EffectIconMap: Record<NationEffect, React.ReactNode> = {
    [NationEffect.CountryTime]: <CountryTimeIcon />,
    [NationEffect.CropTime]: <CropTimeIcon />,
    [NationEffect.SellPrice]: <SellPriceIcon />,
    [NationEffect.MineTime]: <MineIcon />,
    [NationEffect.FragmentChance]: <FragmentChanceIcon />,
    [NationEffect.RuinTime]: <RuinTimeIcon />,
};

const CategoryIconMap: Record<NationAttributeCategory, React.ReactNode> = {
    ideology: <NationalismIcon />,
    leader: <CrownIcon />,
    hero: <ShieldIcon />,
    agriculture: <FarmIcon />,
    industry: <SystemIcon />,
    terrain: <TerrainIcon />,
    entertainment: <EntertainmentIcon />,
};

const NationBuilderCard: React.FC<{ nation: Nation, gameState: GameState, dispatch: React.Dispatch<GameAction> }> = ({ nation, gameState, dispatch }) => {
    const handleRerollAll = () => {
        if (gameState.money < NATION_REROLL_COST) return;
        dispatch({ type: 'REROLL_NATION_ALL_ATTRIBUTES', payload: { nationId: nation.id, cost: NATION_REROLL_COST } });
    };
    
    const handleFinalize = () => {
        dispatch({ type: 'FINALIZE_NATION', payload: { nationId: nation.id } });
    };

    const isAllSelected = Object.values(nation.attributes).every(attr => attr !== null);
    const attributeCategories: NationAttributeCategory[] = ['ideology', 'leader', 'hero', 'agriculture', 'industry', 'terrain', 'entertainment'];

    return (
        <div className="pixel-card p-6 space-y-4">
            <h3 className="text-xl font-bold text-[#059669] border-b-2 border-[#059669] pb-2">{nation.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {attributeCategories.map(category => {
                    const data = NATION_ATTRIBUTE_DATA[category];
                    const selectedValue = nation.attributes[category];
                    const selectedOption = selectedValue ? data.options[selectedValue] : null;
                    return (
                        <div key={category} className="bg-white border-2 border-[#d1fae5] p-3">
                            <h4 className="font-bold flex items-center space-x-2 text-[#059669] text-sm mb-1">
                                <div className="w-4 h-4">{CategoryIconMap[category]}</div>
                                <span>{data.name}</span>
                            </h4>
                            {selectedOption ? (
                                <div>
                                    <p className="text-md font-bold text-[#2d1b2e]">{selectedOption.name}</p>
                                    <p className="text-xs text-[#b45309]">{NATION_EFFECT_DESCRIPTIONS[selectedOption.effect]}</p>
                                </div>
                            ) : (
                                <p className="text-gray-400 text-sm">- - -</p>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="flex flex-col space-y-2 pt-2">
                <button
                    onClick={handleRerollAll}
                    disabled={gameState.money < NATION_REROLL_COST}
                    className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] disabled:bg-gray-400 text-white font-bold py-2 px-4 pixel-btn"
                >
                    全て厳選 ({new Intl.NumberFormat().format(NATION_REROLL_COST)}円)
                </button>
                <button
                    onClick={handleFinalize}
                    disabled={!isAllSelected}
                    className="w-full bg-[#9333ea] hover:bg-[#7e22ce] disabled:bg-gray-400 text-white font-bold py-2 px-4 pixel-btn"
                >
                    国家を確定
                </button>
            </div>
        </div>
    );
};

const NationalismView: React.FC<NationalismViewProps> = ({ gameState, dispatch }) => {
  const [tab, setTab] = useState<'manage' | 'buy'>('manage');

  const handleBuyNation = () => {
    if (gameState.money < NATION_COST) return;
    const newNation: Nation = {
        id: `nat-${Date.now()}`,
        name: `国家 #${gameState.nations.length + 1}`,
        attributes: {
            ideology: null, leader: null, hero: null, agriculture: null, industry: null, terrain: null, entertainment: null
        },
        isFinalized: false
    };
    dispatch({ type: 'BUY_NATION', payload: { nation: newNation, cost: NATION_COST } });
  };
  
  const handleSetActiveNation = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const nationId = e.target.value;
      dispatch({ type: 'SET_ACTIVE_NATION', payload: { nationId: nationId === 'none' ? null : nationId }});
  }

  const unfinalizedNations = gameState.nations.filter(n => !n.isFinalized);
  const finalizedNations = gameState.nations.filter(n => n.isFinalized);
  const activeNation = gameState.nations.find(n => n.id === gameState.activeNationId);
  const attributeCategories: NationAttributeCategory[] = ['ideology', 'leader', 'hero', 'agriculture', 'industry', 'terrain', 'entertainment'];

  const effectCounts: Partial<Record<NationEffect, number>> = {};
  if (activeNation) {
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
  }
  const activeEffects = Object.entries(effectCounts);


  return (
    <div className="animate-fade-in space-y-8 pb-20">
        <div className="flex justify-center mb-6 space-x-4">
            <button onClick={() => setTab('manage')} className={`px-6 py-2 font-bold text-lg transition-all pixel-btn ${tab === 'manage' ? 'bg-[#059669] text-white translate-y-1 shadow-none' : 'bg-white text-[#4a3b32] hover:-translate-y-1'}`}>🚩 国家管理</button>
            <button onClick={() => setTab('buy')} className={`px-6 py-2 font-bold text-lg transition-all pixel-btn ${tab === 'buy' ? 'bg-[#059669] text-white translate-y-1 shadow-none' : 'bg-white text-[#4a3b32] hover:-translate-y-1'}`}>📜 国家創設</button>
        </div>
        
        {tab === 'manage' && (
            <div className="space-y-6">
                <div className="pixel-card p-6 bg-[#f0fdf4]">
                    <h2 className="text-2xl font-bold text-[#059669] mb-4">効力を発揮する</h2>
                    <p className="text-[#4b5563] mb-4 text-sm">一つの国家を選択して、その効果を発動させることができます。</p>
                    <select
                        value={gameState.activeNationId || 'none'}
                        onChange={handleSetActiveNation}
                        className="w-full bg-white text-[#2d1b2e] p-2 border-2 border-[#059669] focus:outline-none focus:bg-[#dcfce7]"
                    >
                        <option value="none">-- なし --</option>
                        {finalizedNations.map(n => <option key={n.id} value={n.id}>{n.name}</option>)}
                    </select>
                     {activeNation && (
                        <div className="mt-6 bg-white border-2 border-[#86efac] p-4">
                            <h4 className="font-bold text-lg mb-3 text-[#059669]">{activeNation.name} の効果</h4>
                            {activeEffects.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {activeEffects.map(([effect, count]) => {
                                        const effectKey = effect as NationEffect;
                                        const bonus = NATION_EFFECT_BONUSES[effectKey];
                                        let bonusText = '';
                                        if (effectKey === NationEffect.SellPrice || effectKey === NationEffect.FragmentChance) {
                                            bonusText = `+${(count * bonus * 100).toFixed(1)}%`;
                                        } else { // Time reductions
                                            bonusText = `-${(count * bonus * 100).toFixed(1)}%`;
                                        }

                                        return (
                                            <div key={effectKey} className="bg-[#ecfdf5] p-3 border border-[#d1fae5] flex items-center space-x-3">
                                                <div className="text-[#10b981] text-2xl">{EffectIconMap[effectKey]}</div>
                                                <div>
                                                    <p className="font-bold text-xs text-[#065f46]">{NATION_EFFECT_DESCRIPTIONS[effectKey]}</p>
                                                    <p className="text-xl font-bold text-[#059669]">{bonusText}</p>
                                                    <p className="text-xs text-gray-500">({count}スタック)</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">この国には有効な効果がありません。</p>
                            )}
                        </div>
                    )}
                </div>
                
                {unfinalizedNations.length > 0 && (
                     <div>
                        <h2 className="text-2xl font-bold text-[#059669] mb-4 bg-white border-2 border-[#059669] p-2 inline-block">創設中の国家</h2>
                        <div className="space-y-4">
                            {unfinalizedNations.map(n => <NationBuilderCard key={n.id} nation={n} gameState={gameState} dispatch={dispatch} />)}
                        </div>
                     </div>
                )}

                {finalizedNations.length > 0 && (
                     <div>
                        <h2 className="text-2xl font-bold text-[#059669] mb-4 bg-white border-2 border-[#059669] p-2 inline-block">確立した国家</h2>
                         <div className="space-y-2">
                           {finalizedNations.map(n => (
                               <details key={n.id} className="bg-white border-2 border-[#4a3b32] shadow-sm">
                                   <summary className="p-4 cursor-pointer font-bold hover:bg-[#f0fdf4]">{n.name}</summary>
                                   <div className="p-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                        {attributeCategories.map(cat => {
                                             const attr = n.attributes[cat];
                                             if(!attr) return null;
                                             const data = NATION_ATTRIBUTE_DATA[cat];
                                             const option = data.options[attr];
                                             return <p key={cat} className="flex items-center gap-2"><span className="font-bold text-[#059669]">{data.name}:</span> {option.name}</p>
                                        })}
                                   </div>
                               </details>
                           ))}
                        </div>
                     </div>
                )}
            </div>
        )}

        {tab === 'buy' && (
             <div className="pixel-card p-8 max-w-md mx-auto text-center">
                 <h3 className="text-2xl font-bold text-[#059669]">新しい国家</h3>
                 <p className="my-4 text-gray-600 text-sm">国家を創設し、独自の思想や文化を育むことで、あなたの農場に強力な効果をもたらします。</p>
                 <p className="text-xl font-bold text-[#b45309] mb-6">{new Intl.NumberFormat('ja-JP').format(NATION_COST)} 円</p>
                 <button 
                    onClick={handleBuyNation}
                    disabled={gameState.money < NATION_COST}
                    className="w-full bg-[#9333ea] hover:bg-[#7e22ce] disabled:bg-gray-400 text-white font-bold py-3 px-4 pixel-btn"
                >
                    創設する
                 </button>
             </div>
        )}
    </div>
  );
};

export default NationalismView;
