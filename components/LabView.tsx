
import React, { useState, useMemo } from 'react';
import { GameState, Crop, GameAction } from '../types';
import { RESEARCH_COST, RESEARCH_SUCCESS_RATE } from '../constants';
import SkillAllocationModal from './SkillAllocationModal';

interface LabViewProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  onResearch: (cropId: string, targetStat: keyof Crop['stats']) => void;
}

const StatUpgradeRow: React.FC<{
    label: string;
    icon: string;
    value: number;
    canResearch: boolean;
    onResearch: () => void;
}> = ({ label, icon, value, canResearch, onResearch }) => {
    return (
        <div className="flex items-center justify-between bg-white p-3 border-2 border-[#4a3b32] shadow-[2px_2px_0px_0px_#d2b48c]">
            <div className="flex items-center gap-2">
                <span className="text-2xl">{icon}</span>
                <div>
                    <span className="text-sm font-bold text-[#4a3b32] block">{label}</span>
                    <div className="flex space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                            <div 
                                key={i} 
                                className={`w-3 h-3 border border-[#4a3b32] ${i < value ? 'bg-[#facc15]' : 'bg-gray-200'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <button
                onClick={onResearch}
                disabled={!canResearch || value >= 5}
                className={`pixel-btn text-xs py-2 px-4 min-w-[80px] ${
                    value >= 5 
                    ? 'bg-gray-400 text-white border-gray-500 cursor-default'
                    : canResearch
                    ? 'bg-[#6366f1] hover:bg-[#4f46e5] text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
                {value >= 5 ? 'MAX' : '研究'}
            </button>
        </div>
    );
};

const LabView: React.FC<LabViewProps> = ({ gameState, dispatch, onResearch }) => {
  const { products, cropData } = gameState;
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  
  const totalSkillPoints = useMemo(() => {
    return (Object.values(cropData) as Crop[]).reduce((total, crop: Crop) => {
        return total + crop.stats.taste + crop.stats.durability + crop.stats.appearance;
    }, 0);
  }, [cropData]);

  return (
    <div className="animate-fade-in space-y-8 pb-20">
        <div className="pixel-card-lab p-6">
            <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4 flex items-center gap-2">🌟 スキルポイント</h2>
            <div className="flex flex-col md:flex-row items-center justify-between bg-white border-4 border-[#1e3a8a] p-4 gap-4">
                <div>
                    <p className="text-[#4b5563]">現在のスキルポイント合計</p>
                    <p className="text-4xl font-bold text-[#1e3a8a] tracking-wider">{totalSkillPoints}</p>
                </div>
                <button
                    onClick={() => setIsSkillModalOpen(true)}
                    className="pixel-btn bg-[#fbbf24] hover:bg-[#f59e0b] text-[#2d1b2e] py-3 px-8 w-full md:w-auto font-bold"
                >
                    スキル振り分け
                </button>
            </div>
        </div>
        <div>
            <h2 className="text-2xl font-bold text-[#4a3b32] mb-4 flex items-center gap-3 bg-[#e0e7ff] border-2 border-[#4a3b32] p-2 inline-block shadow-[4px_4px_0px_0px_#4a3b32]">🔬 品種改良</h2>
            <div className="bg-[#fff8dc] border-4 border-[#4a3b32] p-4 mb-6 text-[#4b5563]">
                <p className="font-bold text-[#4a3b32]">作物を消費して能力を強化</p>
                <ul className="list-disc list-inside mt-2 text-sm">
                    <li>コスト: <span className="font-bold text-[#b45309]">{RESEARCH_COST}個</span> / 回</li>
                    <li>成功率: <span className="font-bold text-[#b45309]">{RESEARCH_SUCCESS_RATE * 100}%</span></li>
                    <li>効果: 各ステータスLv1ごとに売却価格が10%上昇</li>
                </ul>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.values(cropData).map((crop: Crop) => {
                    const canResearch = (products[crop.id] || 0) >= RESEARCH_COST;
                    return (
                        <div key={crop.id} className="pixel-card p-4 flex flex-col justify-between bg-white">
                            <div>
                                <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-[#4a3b32]">
                                    <h3 className="text-xl font-bold text-[#4a3b32]">{crop.name}</h3>
                                    <span className={`text-xs px-2 py-1 font-bold border border-[#4a3b32] ${canResearch ? 'bg-[#dcfce7] text-[#166534]' : 'bg-gray-200 text-gray-600'}`}>
                                        所持: {products[crop.id] || 0}
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    <StatUpgradeRow 
                                        label="美味しさ" 
                                        icon="👅"
                                        value={crop.stats.taste} 
                                        canResearch={canResearch} 
                                        onResearch={() => onResearch(crop.id, 'taste')}
                                    />
                                    <StatUpgradeRow 
                                        label="長持ち" 
                                        icon="🛡️"
                                        value={crop.stats.durability} 
                                        canResearch={canResearch} 
                                        onResearch={() => onResearch(crop.id, 'durability')}
                                    />
                                    <StatUpgradeRow 
                                        label="見た目" 
                                        icon="✨"
                                        value={crop.stats.appearance} 
                                        canResearch={canResearch} 
                                        onResearch={() => onResearch(crop.id, 'appearance')}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
         <SkillAllocationModal
            isOpen={isSkillModalOpen}
            onClose={() => setIsSkillModalOpen(false)}
            gameState={gameState}
            dispatch={dispatch}
            totalSkillPoints={totalSkillPoints}
        />
    </div>
  );
};

export default LabView;
