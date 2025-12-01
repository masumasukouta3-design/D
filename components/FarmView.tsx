import React, { useState } from 'react';
import { GameState, GameAction, Facility, FacilityCategory, Crop } from '../types';
import { GROW_TIME_MS, CROP_CATEGORY_MAP, INITIAL_CROPS } from '../constants';
import PlantingModal from './PlantingModal';
import PixelArt from './PixelArt';
import { ItemIcon } from './icons';

interface FarmViewProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  now: number;
  bonuses: { cropTimeReduction: number };
}

const FacilityCard: React.FC<{ facility: Facility, now: number, onHarvest: () => void, onPlantClick: () => void, bonuses: { cropTimeReduction: number } }> = ({ facility, now, onHarvest, onPlantClick, bonuses }) => {
    const { plantedCrop } = facility;
    const effectiveGrowTime = GROW_TIME_MS * (1 - bonuses.cropTimeReduction);
    const isReady = plantedCrop && (now - plantedCrop.plantedAt >= effectiveGrowTime);
    
    const getTimeLeft = () => {
        if (!plantedCrop) return '';
        const timeLeftMs = (plantedCrop.plantedAt + effectiveGrowTime) - now;
        if (timeLeftMs <= 0) return '収穫可能';
        const minutes = Math.floor(timeLeftMs / 60000);
        const seconds = Math.floor((timeLeftMs % 60000) / 1000);
        return `残り ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Dynamic background prompt based on category
    const bgPrompt = 
        facility.category === FacilityCategory.Field ? "pixel art farm field, soil, earthy tones, agriculture" :
        facility.category === FacilityCategory.Sea ? "pixel art ocean water, blue waves, sea" :
        "pixel art ranch, grass, fence, livestock area";

    return (
        <div className="pixel-card p-4 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
             {/* Background Pixel Art for Facility */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                <PixelArt prompt={bgPrompt} className="w-full h-full" />
            </div>

            <div className="border-b-2 border-[#4a3b32] pb-2 mb-2 relative z-10 bg-white/80 p-2">
                <h3 className="text-lg font-bold text-[#4a3b32] flex items-center justify-between">
                    {facility.name}
                </h3>
                <p className="text-xs text-[#6b4423]">容量: {facility.capacity}</p>
            </div>
            
            <div className="flex-grow flex flex-col justify-center items-center h-32 bg-[#fffacd]/50 border-2 border-[#d2b48c] mb-4 p-2 relative z-10 backdrop-blur-sm">
                {plantedCrop ? (
                    <div className="w-full text-center flex flex-col items-center">
                        <ItemIcon id={plantedCrop.cropId} className="w-16 h-16 mb-2 border-2 border-white shadow-md bg-white" />
                        <p className="text-md font-bold text-[#2d1b2e] bg-white/90 px-2">{INITIAL_CROPS[plantedCrop.cropId].name}</p>
                        {!isReady && (
                             <div className="w-full bg-[#d2b48c] h-2 my-2 border border-[#4a3b32]">
                                <div 
                                    className="bg-[#4ade80] h-full transition-all duration-1000 ease-linear" 
                                    style={{ width: `${Math.min(100, ((now - plantedCrop.plantedAt) / effectiveGrowTime) * 100)}%` }}
                                ></div>
                            </div>
                        )}
                        <p className="text-xs font-mono font-bold bg-white/90 px-1">{getTimeLeft()}</p>
                    </div>
                ) : (
                    <p className="text-[#8b4513] font-bold bg-white/50 px-2">空き</p>
                )}
            </div>
            <div className="relative z-10">
                {plantedCrop ? (
                    <button
                        onClick={onHarvest}
                        disabled={!isReady}
                        className={`w-full font-bold py-2 px-4 pixel-btn ${
                            isReady
                            ? 'bg-[#fbbf24] hover:bg-[#f59e0b] text-[#2d1b2e] animate-bounce-pixel'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        {isReady ? '収穫する' : '育成中...'}
                    </button>
                ) : (
                    <button
                        onClick={onPlantClick}
                        className="w-full bg-[#60a5fa] hover:bg-[#3b82f6] text-white font-bold py-2 px-4 pixel-btn"
                    >
                        種を植える
                    </button>
                )}
            </div>
        </div>
    );
};

const PlantAllModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  seedsInStock: Record<string, number>;
  cropData: Record<string, Crop>;
  onConfirmPlantAll: (cropId: string) => void;
}> = ({ isOpen, onClose, seedsInStock, cropData, onConfirmPlantAll }) => {
  if (!isOpen) return null;

  const availableSeeds = Object.keys(seedsInStock)
    .filter((cropId) => seedsInStock[cropId] > 0)
    .map((cropId) => ({
      crop: cropData[cropId],
      quantity: seedsInStock[cropId],
    }));

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-[#fff8dc] border-4 border-[#4a3b32] shadow-[8px_8px_0px_0px_#000] p-6 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-4 border-b-4 border-[#4a3b32] pb-2">
            <h2 className="text-xl font-bold text-[#4a3b32]">まとめて植える</h2>
            <button onClick={onClose} className="text-[#4a3b32] hover:text-red-600 text-2xl font-bold">&times;</button>
        </div>
        <p className="text-[#6b4423] mb-4 text-sm">植えたい作物を選んでください。</p>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {availableSeeds.length > 0 ? availableSeeds.map(({ crop, quantity }) => (
                <div key={crop.id} className="p-2 border-2 border-[#d2b48c] flex justify-between items-center bg-white hover:bg-[#fffacd]">
                    <div className="flex items-center gap-2">
                        <ItemIcon id={crop.id} className="w-8 h-8 border border-gray-300" />
                        <div>
                            <p className="font-bold text-[#2d1b2e]">{crop.name}</p>
                            <p className="text-xs text-[#6b4423]">所持: {quantity}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => onConfirmPlantAll(crop.id)}
                        className="bg-[#60a5fa] text-white font-bold py-1 px-3 text-xs pixel-btn"
                    >
                        選択
                    </button>
                </div>
            )) : (
                <p className="text-center text-gray-500 p-4">種がありません。</p>
            )}
        </div>
        <button onClick={onClose} className="mt-6 w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 pixel-btn">
            キャンセル
        </button>
      </div>
    </div>
  );
};


const FarmView: React.FC<FarmViewProps> = ({ gameState, dispatch, now, bonuses }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPlantAllModalOpen, setIsPlantAllModalOpen] = useState(false);
    const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

    const handlePlantClick = (facility: Facility) => {
        setSelectedFacility(facility);
        setIsModalOpen(true);
    };

    const handleHarvest = (facilityId: string) => {
        dispatch({ type: 'HARVEST', payload: { facilityId } });
    };

    const handleHarvestAll = () => {
        dispatch({ type: 'HARVEST_ALL' });
    };
    
    const handleConfirmPlant = (facilityId: string, cropId: string) => {
        dispatch({ type: 'PLANT', payload: { facilityId, cropId } });
        setIsModalOpen(false);
        setSelectedFacility(null);
    }
    
    const handleConfirmPlantAll = (cropId: string) => {
        dispatch({ type: 'PLANT_ALL', payload: { cropId } });
        setIsPlantAllModalOpen(false);
    }
    
    const compatibleSeeds = Object.values(gameState.cropData).filter((crop: Crop) =>
        selectedFacility && CROP_CATEGORY_MAP[crop.type] === selectedFacility.category
    );

    const harvestableCount = gameState.facilities.filter(f => {
        if (!f.plantedCrop) return false;
        const effectiveGrowTime = GROW_TIME_MS * (1 - bonuses.cropTimeReduction);
        return now - f.plantedCrop.plantedAt >= effectiveGrowTime;
    }).length;

    const groupedFacilities = gameState.facilities.reduce((acc, facility) => {
        const category = facility.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(facility);
        return acc;
    }, {} as Record<FacilityCategory, Facility[]>);

    const categoryNames: Record<FacilityCategory, string> = {
        [FacilityCategory.Field]: '畑',
        [FacilityCategory.Sea]: '海',
        [FacilityCategory.Ranch]: '牧場',
    };

    return (
        <div className="animate-fade-in space-y-6">
            <div className="flex justify-end mb-4 space-x-4">
                <button
                    onClick={handleHarvestAll}
                    disabled={harvestableCount === 0}
                    className="bg-[#fbbf24] hover:bg-[#f59e0b] disabled:bg-gray-300 text-[#2d1b2e] font-bold py-2 px-4 pixel-btn flex items-center"
                >
                    すべて収穫
                    {harvestableCount > 0 && <span className="ml-2 bg-[#b45309] text-white text-xs font-bold px-2 py-1 rounded-none animate-bounce-pixel">{harvestableCount}</span>}
                </button>
                <button
                    onClick={() => setIsPlantAllModalOpen(true)}
                    className="bg-[#34d399] hover:bg-[#10b981] text-white font-bold py-2 px-4 pixel-btn"
                >
                    すべて生産
                </button>
            </div>
            {(Object.keys(groupedFacilities) as FacilityCategory[]).map(category => {
                const facilities = groupedFacilities[category];
                return (
                    <details key={category} className="pixel-card open:bg-[#fefce8] mb-4" open>
                        <summary className="text-lg font-bold p-4 cursor-pointer list-none text-[#4a3b32] bg-[#e7e5e4] hover:bg-[#d6d3d1] transition-colors border-b-2 border-[#4a3b32]">
                            {categoryNames[category as FacilityCategory]} ({facilities.length})
                        </summary>
                        <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {facilities.map(facility => (
                                    <FacilityCard 
                                        key={facility.id} 
                                        facility={facility}
                                        now={now}
                                        onHarvest={() => handleHarvest(facility.id)}
                                        onPlantClick={() => handlePlantClick(facility)}
                                        bonuses={bonuses}
                                    />
                                ))}
                            </div>
                        </div>
                    </details>
                )
            })}
            {selectedFacility && (
                 <PlantingModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    facility={selectedFacility}
                    seedsInStock={gameState.seeds}
                    compatibleSeeds={compatibleSeeds}
                    onConfirmPlant={handleConfirmPlant}
                />
            )}
             <PlantAllModal
                isOpen={isPlantAllModalOpen}
                onClose={() => setIsPlantAllModalOpen(false)}
                seedsInStock={gameState.seeds}
                cropData={gameState.cropData}
                onConfirmPlantAll={handleConfirmPlantAll}
            />
        </div>
    );
};

export default FarmView;