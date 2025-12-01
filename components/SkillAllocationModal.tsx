import React, { useState, useEffect, useMemo } from 'react';
import { GameState, GameAction, SkillTree } from '../types';
import { SKILL_POINT_RESET_COST, SKILL_BONUSES } from '../constants';

interface SkillAllocationModalProps {
    isOpen: boolean;
    onClose: () => void;
    gameState: GameState;
    dispatch: React.Dispatch<GameAction>;
    totalSkillPoints: number;
}

type SkillCategory = keyof SkillTree;

const SKILL_DATA: Record<SkillCategory, { name: string, description: string }> = {
    cropTime: { name: '作物生育時間短縮', description: '作物の成長に必要な時間が短縮されます。' },
    mineTime: { name: '鉱山の採掘時間短縮', description: '鉱山での採掘時間が短縮されます。' },
    sellPrice: { name: '商品や作物の売却金額上昇', description: '全てのアイテムの売却価格が上昇します。' },
    fragmentChance: { name: '破片が落ちる確率を上昇', description: '収穫時に「なにかの破片」がドロップする確率が上昇します。' },
    countryTime: { name: '国の利益回収時間短縮', description: '征服した国からの利益回収時間が短縮されます。' },
    tenantTime: { name: 'テナントの利益回収時間短縮', description: 'テナントからの利益回収時間が短縮されます。' },
};

const SkillAllocationModal: React.FC<SkillAllocationModalProps> = ({ isOpen, onClose, gameState, dispatch, totalSkillPoints }) => {
    const [tempSkills, setTempSkills] = useState<SkillTree>(gameState.skillTree);

    useEffect(() => {
        if (isOpen) {
            setTempSkills(gameState.skillTree);
        }
    }, [isOpen, gameState.skillTree]);
    
    const allocatedPoints = useMemo(() => {
        return Object.values(tempSkills).reduce((sum: number, points: number) => sum + points, 0);
    }, [tempSkills]);

    const remainingPoints = totalSkillPoints - allocatedPoints;

    const handlePointChange = (skill: SkillCategory, amount: number) => {
        setTempSkills(prev => {
            const currentPoints = prev[skill];
            let newPoints = currentPoints + amount;
            
            if (amount > 0 && remainingPoints < amount) {
                newPoints = currentPoints + remainingPoints;
            }
            if (newPoints < 0) {
                newPoints = 0;
            }
            
            return { ...prev, [skill]: newPoints };
        });
    };
    
    const handleSetMax = (skill: SkillCategory) => {
        setTempSkills(prev => {
            const currentPoints = prev[skill];
            const newPoints = currentPoints + remainingPoints;
            return { ...prev, [skill]: newPoints };
        });
    }

    const handleConfirm = () => {
        dispatch({ type: 'ALLOCATE_SKILL_POINTS', payload: { newSkillTree: tempSkills } });
        onClose();
    };
    
    const handleReset = () => {
        if (window.confirm(`本当にスキルポイントをリセットしますか？\nコスト: ${SKILL_POINT_RESET_COST.toLocaleString()}円`)) {
            if (gameState.money >= SKILL_POINT_RESET_COST) {
                dispatch({ type: 'RESET_SKILL_POINTS', payload: { cost: SKILL_POINT_RESET_COST } });
            } else {
                alert('お金が足りません。');
            }
        }
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-slate-800/80 backdrop-blur-md rounded-lg shadow-xl p-6 w-full max-w-3xl m-4 flex flex-col animate-pop-in" style={{maxHeight: '90vh'}}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-green-300">スキルポイント振り分け</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl">&times;</button>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg mb-4 flex justify-around text-center border border-slate-700/50">
                    <div>
                        <p className="text-sm text-slate-400">合計ポイント</p>
                        <p className="text-2xl font-bold text-amber-300">{totalSkillPoints}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">使用済み</p>
                        <p className="text-2xl font-bold">{allocatedPoints}</p>
                    </div>
                     <div>
                        <p className="text-sm text-slate-400">残り</p>
                        <p className="text-2xl font-bold text-green-300">{remainingPoints}</p>
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto pr-2 space-y-4">
                    {(Object.keys(SKILL_DATA) as SkillCategory[]).map(skill => {
                        const bonus = tempSkills[skill] * SKILL_BONUSES[skill] * 100;
                        let bonusText = '';
                        if (skill === 'sellPrice' || skill === 'fragmentChance') {
                            bonusText = `+${bonus.toFixed(2)}%`;
                        } else {
                            bonusText = `-${bonus.toFixed(2)}%`;
                        }
                        
                        return (
                            <div key={skill} className="bg-slate-700/50 backdrop-blur-md p-4 rounded-lg flex items-center">
                                <div className="flex-grow">
                                    <p className="text-lg font-semibold">{SKILL_DATA[skill].name}</p>
                                    <p className="text-sm text-slate-400">{SKILL_DATA[skill].description}</p>
                                    <p className="text-amber-300 font-bold mt-1">現在の効果: {bonusText}</p>
                                </div>
                                <div className="flex items-center space-x-2 ml-4">
                                    <button onClick={() => handlePointChange(skill, -10)} disabled={tempSkills[skill] < 10} className="bg-red-600 hover:bg-red-500 text-white font-bold h-8 w-8 rounded-full disabled:bg-slate-600 transition-all duration-200 transform hover:scale-110">-10</button>
                                    <span className="text-xl font-mono w-12 text-center">{tempSkills[skill]}</span>
                                    <button onClick={() => handlePointChange(skill, 10)} disabled={remainingPoints < 10} className="bg-green-600 hover:bg-green-500 text-white font-bold h-8 w-8 rounded-full disabled:bg-slate-600 transition-all duration-200 transform hover:scale-110">+10</button>
                                    <button onClick={() => handleSetMax(skill)} disabled={remainingPoints <= 0} className="bg-sky-600 hover:bg-sky-500 text-white font-bold h-8 px-3 rounded-lg text-sm disabled:bg-slate-600 transition-all duration-200 transform hover:scale-105">MAX</button>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700 flex justify-between items-center">
                     <button 
                        onClick={handleReset} 
                        disabled={gameState.money < SKILL_POINT_RESET_COST}
                        className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg disabled:bg-slate-600 transition-all duration-200 transform hover:scale-105"
                     >
                        振り直し ({SKILL_POINT_RESET_COST.toLocaleString()}円)
                    </button>
                    <div className="flex space-x-2">
                        <button onClick={onClose} className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">キャンセル</button>
                        <button onClick={handleConfirm} className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">決定</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillAllocationModal;