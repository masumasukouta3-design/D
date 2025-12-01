
import React from 'react';
import { GameState, GameAction } from '../types';
import {
    RECRUITMENT_BASE_DURATION_MS,
    RECRUITMENT_MIN_DURATION_MS,
    RECRUITER_ITEM_CITIZEN_INCREASE_BONUS,
    RECRUITER_ITEM_TIME_REDUCTION_BONUS_MS,
    RECRUITER_ITEM_COSTS
} from '../constants';
import { CitizenIcon } from './icons';

interface RecruiterViewProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  now: number;
}

const formatTimeLeft = (ms: number) => {
    if (ms <= 0) return '獲得可能';
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `残り ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const RecruiterView: React.FC<RecruiterViewProps> = ({ gameState, dispatch, now }) => {
    const { recruiterState, citizens } = gameState;

    // Calculations
    const timeReductionBonus = recruiterState.timeReductionItems * RECRUITER_ITEM_TIME_REDUCTION_BONUS_MS;
    const effectiveDuration = Math.max(RECRUITMENT_MIN_DURATION_MS, RECRUITMENT_BASE_DURATION_MS - timeReductionBonus);
    
    const citizenIncreaseBonus = recruiterState.citizenIncreaseItems * RECRUITER_ITEM_CITIZEN_INCREASE_BONUS;
    const citizensToClaim = 3000 + citizenIncreaseBonus;

    const isReadyToClaim = recruiterState.startTime !== null && now - recruiterState.startTime >= effectiveDuration;
    const timeLeftMs = recruiterState.startTime !== null ? (recruiterState.startTime + effectiveDuration) - now : 0;
    const progress = recruiterState.startTime !== null ? Math.min(100, ((now - recruiterState.startTime) / effectiveDuration) * 100) : 0;

    const citizenIncreaseItemCost = RECRUITER_ITEM_COSTS.citizenIncrease.base + (recruiterState.citizenIncreaseItems * RECRUITER_ITEM_COSTS.citizenIncrease.increment);
    const timeReductionItemCost = RECRUITER_ITEM_COSTS.timeReduction.base + (recruiterState.timeReductionItems * RECRUITER_ITEM_COSTS.timeReduction.increment);
    
    // Handlers
    const handleStart = () => {
        dispatch({ type: 'START_RECRUITMENT' });
    };

    const handleClaim = () => {
        dispatch({ type: 'CLAIM_CITIZENS', payload: { amount: citizensToClaim } });
    };

    const handleBuyItem = (itemType: 'citizenIncrease' | 'timeReduction') => {
        const cost = itemType === 'citizenIncrease' ? citizenIncreaseItemCost : timeReductionItemCost;
        if (citizens >= cost) {
            dispatch({ type: 'BUY_RECRUITER_ITEM', payload: { itemType, cost } });
        }
    };
    
    return (
        <div className="animate-fade-in space-y-8 max-w-4xl mx-auto pb-20">
            {/* Main Recruitment Section */}
            <div className="pixel-card p-8 text-center bg-[#fff7ed]">
                <h2 className="text-3xl font-bold text-[#1e3a8a] mb-4 border-b-4 border-[#4a3b32] pb-2 inline-block">🤝 国民の斡旋</h2>
                <p className="text-gray-600 mb-6 font-bold">定期的に新たな国民があなたの国にやってきます。</p>
                {recruiterState.startTime === null ? (
                    <>
                        <p className="text-lg mb-4 font-bold text-[#4a3b32]">次の斡旋で <span className="text-[#b45309] text-2xl">{citizensToClaim}人</span> の国民を獲得</p>
                        <button onClick={handleStart} className="w-full max-w-sm mx-auto bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold py-3 px-6 pixel-btn text-xl">
                            斡旋を開始する
                        </button>
                    </>
                ) : isReadyToClaim ? (
                    <>
                        <p className="text-xl text-[#b45309] mb-4 font-bold animate-bounce-pixel">国民が到着しました！</p>
                        <button onClick={handleClaim} className="w-full max-w-sm mx-auto bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-3 px-6 pixel-btn text-xl">
                            {citizensToClaim}人の国民を迎える
                        </button>
                    </>
                ) : (
                    <div>
                        <p className="text-2xl font-bold text-[#4a3b32] mb-4 font-mono">{formatTimeLeft(timeLeftMs)}</p>
                        <div className="w-full bg-gray-300 h-6 border-2 border-[#4a3b32]">
                            <div className="bg-[#16a34a] h-full" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p className="mt-4 text-gray-600 font-bold">到着予定: <span className="text-[#b45309]">{citizensToClaim}人</span></p>
                    </div>
                )}
            </div>

            {/* Item Shop */}
            <div className="pixel-card p-6 bg-[#f0f9ff]">
                <h3 className="text-2xl font-bold text-[#1e3a8a] mb-4 border-b-2 border-[#1e3a8a] pb-1">国民アイテム</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Increase Citizen Item */}
                    <div className="bg-white border-2 border-[#bae6fd] p-4 flex flex-col justify-between">
                        <div>
                            <h4 className="text-xl font-bold text-[#0369a1]">広報強化</h4>
                            <p className="text-sm text-gray-600 mt-2 font-bold">一度にやってくる国民の数を増やします。</p>
                        </div>
                        <div className="mt-4">
                             <div className="flex items-center justify-center text-lg mb-4 font-bold text-[#4a3b32]">
                                <CitizenIcon />
                                <span className="ml-2">コスト: {citizenIncreaseItemCost} 人</span>
                            </div>
                            <button
                                onClick={() => handleBuyItem('citizenIncrease')}
                                disabled={citizens < citizenIncreaseItemCost}
                                className="w-full bg-[#9333ea] hover:bg-[#7e22ce] disabled:bg-gray-400 text-white font-bold py-2 px-4 pixel-btn"
                            >
                                購入
                            </button>
                        </div>
                    </div>
                    {/* Reduce Time Item */}
                    <div className="bg-white border-2 border-[#bae6fd] p-4 flex flex-col justify-between">
                        <div>
                            <h4 className="text-xl font-bold text-[#0369a1]">手続きの効率化</h4>
                            <p className="text-sm text-gray-600 mt-2 font-bold">国民がやってくるまでの時間を短縮します。</p>
                        </div>
                         <div className="mt-4">
                            <div className="flex items-center justify-center text-lg mb-4 font-bold text-[#4a3b32]">
                                <CitizenIcon />
                                <span className="ml-2">コスト: {timeReductionItemCost} 人</span>
                            </div>
                            <button
                                onClick={() => handleBuyItem('timeReduction')}
                                disabled={citizens < timeReductionItemCost}
                                className="w-full bg-[#9333ea] hover:bg-[#7e22ce] disabled:bg-gray-400 text-white font-bold py-2 px-4 pixel-btn"
                            >
                                購入
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Effects Display */}
            <div className="pixel-card p-6 bg-[#e0f2fe]">
                <h3 className="text-2xl font-bold text-[#1e3a8a] mb-4 border-b-2 border-[#1e3a8a] pb-1">効果一覧</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="bg-white border-2 border-[#bae6fd] p-4">
                        <h4 className="text-lg font-bold text-[#0369a1]">広報強化</h4>
                        <p className="text-gray-600">購入数: <span className="font-bold text-[#2d1b2e]">{recruiterState.citizenIncreaseItems}</span></p>
                        <p className="text-gray-600">合計効果: <span className="font-bold text-[#b45309]">獲得国民 +{citizenIncreaseBonus}人</span></p>
                    </div>
                     <div className="bg-white border-2 border-[#bae6fd] p-4">
                        <h4 className="text-lg font-bold text-[#0369a1]">手続きの効率化</h4>
                        <p className="text-gray-600">購入数: <span className="font-bold text-[#2d1b2e]">{recruiterState.timeReductionItems}</span></p>
                        <p className="text-gray-600">合計効果: <span className="font-bold text-[#b45309]">獲得時間 -{timeReductionBonus / (1000 * 60)}分</span></p>
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default RecruiterView;
