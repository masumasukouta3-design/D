import React, { useState, useMemo } from 'react';
import { GameState, GameAction, Crop, Facility, CropType, FacilityCategory, FacilityInfo } from '../types';
import { INITIAL_CROPS, FACILITIES_FOR_SALE } from '../constants';
import { ItemIcon } from './icons';

interface MarketViewProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const MarketView: React.FC<MarketViewProps> = ({ gameState, dispatch }) => {
  const [marketTab, setMarketTab] = useState<'seeds' | 'facilities'>('seeds');
  const facilityLimitReached = gameState.facilities.length >= 300;
  
  const facilityCounts = useMemo(() => gameState.facilities.reduce((acc, facility) => {
    acc[facility.name] = (acc[facility.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>), [gameState.facilities]);

  const handleBuySeed = (crop: Crop, quantity: number) => {
    const cost = crop.buyPrice * quantity;
    if (gameState.money >= cost) {
      dispatch({ type: 'BUY_SEEDS', payload: { cropId: crop.id, quantity, cost } });
    }
  };

  const handleBuyFacility = (facilityKey: string) => {
    if (facilityLimitReached) return;
    const facilityInfo = FACILITIES_FOR_SALE[facilityKey];
    if (gameState.money >= facilityInfo.price) {
        const newFacility: Facility = {
            id: `fac-${Date.now()}-${Math.random()}`,
            name: facilityInfo.name,
            category: facilityInfo.category,
            capacity: facilityInfo.capacity,
            plantedCrop: null
        }
        dispatch({ type: 'BUY_FACILITY', payload: { facility: newFacility, cost: facilityInfo.price } });
    }
  };
  
  const cropTypeNames: Record<CropType, string> = {
    [CropType.Plant]: '作物',
    [CropType.Fish]: '魚',
    [CropType.Livestock]: '家畜',
  };

  const groupedCrops = Object.values(INITIAL_CROPS).reduce((acc, crop) => {
      const type = crop.type;
      if (!acc[type]) {
          acc[type] = [];
      }
      acc[type].push(crop);
      return acc;
  }, {} as Record<CropType, Crop[]>);

  const facilityCategoryNames: Record<FacilityCategory, string> = {
    [FacilityCategory.Field]: '畑',
    [FacilityCategory.Sea]: '海',
    [FacilityCategory.Ranch]: '牧場',
  };

  const groupedFacilities = Object.entries(FACILITIES_FOR_SALE).reduce((acc, [key, facilityInfo]) => {
      const category = facilityInfo.category;
      if (!acc[category]) {
          acc[category] = [];
      }
      acc[category].push({ key, ...facilityInfo });
      return acc;
  }, {} as Record<FacilityCategory, (FacilityInfo & {key: string})[]>);


  return (
    <div className="animate-fade-in">
        <div className="flex justify-center mb-6 space-x-4">
            <button onClick={() => setMarketTab('seeds')} className={`px-6 py-2 font-bold text-lg transition-all pixel-btn ${marketTab === 'seeds' ? 'bg-[#4ade80] text-white translate-y-1 shadow-none' : 'bg-white text-[#4a3b32] hover:-translate-y-1'}`}>🌱 種・稚魚</button>
            <button onClick={() => setMarketTab('facilities')} className={`px-6 py-2 font-bold text-lg transition-all pixel-btn ${marketTab === 'facilities' ? 'bg-[#4ade80] text-white translate-y-1 shadow-none' : 'bg-white text-[#4a3b32] hover:-translate-y-1'}`}>🏠 施設</button>
        </div>

        {marketTab === 'seeds' && (
             <div className="space-y-6">
                {Object.entries(groupedCrops).map(([type, crops]) => (
                    <details key={type} className="pixel-card mb-4" open>
                        <summary className="font-bold text-xl p-4 cursor-pointer list-none text-[#1e3a8a] bg-[#e0f2fe] border-b-2 border-[#4a3b32]">{cropTypeNames[type as CropType]}</summary>
                        <div className="p-4">
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {crops.map(crop => (
                                    <div key={crop.id} className="bg-white border-2 border-[#4a3b32] p-4 flex flex-col justify-between shadow-[4px_4px_0px_0px_#d2b48c] relative">
                                        <ItemIcon id={crop.id} className="absolute top-4 right-4 w-12 h-12 border border-gray-200 bg-white" />
                                        <div className="mb-2 pr-12">
                                            <h3 className="text-xl font-bold text-[#2d1b2e]">{crop.name}</h3>
                                            <p className="text-gray-600 text-sm">単価: <span className="text-[#b45309] font-semibold">{new Intl.NumberFormat('ja-JP').format(crop.buyPrice)}</span> 円</p>
                                        </div>
                                        <div className="mt-4 grid grid-cols-2 gap-2">
                                            <button 
                                                onClick={() => handleBuySeed(crop, 100)}
                                                disabled={gameState.money < crop.buyPrice * 100}
                                                className="bg-[#84cc16] hover:bg-[#65a30d] disabled:bg-[#cbd5e1] text-white font-bold py-1 px-1 text-xs pixel-btn"
                                            >
                                                100個 ({new Intl.NumberFormat().format(crop.buyPrice * 100)}円)
                                            </button>
                                            <button 
                                                onClick={() => handleBuySeed(crop, 1000)}
                                                disabled={gameState.money < crop.buyPrice * 1000}
                                                className="bg-[#0ea5e9] hover:bg-[#0284c7] disabled:bg-[#cbd5e1] text-white font-bold py-1 px-1 text-xs pixel-btn"
                                            >
                                                1000個 ({new Intl.NumberFormat().format(crop.buyPrice * 1000)}円)
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </details>
                ))}
            </div>
        )}

        {marketTab === 'facilities' && (
             <div className="space-y-6">
                {facilityLimitReached && (
                    <div className="bg-[#fca5a5] border-4 border-[#b91c1c] text-[#7f1d1d] text-center p-3 font-bold">
                        施設の数が上限(300)に達しました。
                    </div>
                )}
                {Object.entries(groupedFacilities).map(([category, facilities]) => (
                    <details key={category} className="pixel-card mb-4" open>
                        <summary className="font-bold text-xl p-4 cursor-pointer list-none text-[#1e3a8a] bg-[#e0f2fe] border-b-2 border-[#4a3b32]">{facilityCategoryNames[category as FacilityCategory]}</summary>
                        <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {facilities.map(facility => {
                                    const currentCount = facilityCounts[facility.name] || 0;
                                    const specificFacilityLimitReached = currentCount >= 50;
                                    return (
                                        <div key={facility.key} className="bg-white border-2 border-[#4a3b32] p-4 flex flex-col justify-between shadow-[4px_4px_0px_0px_#d2b48c] relative">
                                             <ItemIcon id={facility.key} className="absolute top-4 right-4 w-12 h-12 border border-gray-200 bg-white" />
                                            <div className="pr-12">
                                                <h3 className="text-xl font-bold text-[#2d1b2e]">{facility.name}</h3>
                                                <p className="text-sm text-gray-600">容量: {facility.capacity}</p>
                                                <p className="text-sm text-gray-600">所持: {currentCount}/50</p>
                                                <p className="text-[#b45309] font-semibold text-lg">{new Intl.NumberFormat('ja-JP').format(facility.price)} 円</p>
                                            </div>
                                            <button
                                                onClick={() => handleBuyFacility(facility.key)}
                                                disabled={gameState.money < facility.price || facilityLimitReached || specificFacilityLimitReached}
                                                className="w-full mt-4 bg-[#16a34a] hover:bg-[#15803d] disabled:bg-[#cbd5e1] text-white font-bold py-2 px-4 pixel-btn"
                                            >
                                                {facilityLimitReached ? '上限(全体)' : specificFacilityLimitReached ? '上限です' : '購入する'}
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </details>
                ))}
            </div>
        )}
    </div>
  );
};

export default MarketView;