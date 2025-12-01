import React from 'react';
import { Facility, Crop } from '../types';
import { ItemIcon } from './icons';

interface PlantingModalProps {
  isOpen: boolean;
  onClose: () => void;
  facility: Facility;
  seedsInStock: Record<string, number>;
  compatibleSeeds: Crop[];
  onConfirmPlant: (facilityId: string, cropId: string) => void;
}

const PlantingModal: React.FC<PlantingModalProps> = ({ isOpen, onClose, facility, seedsInStock, compatibleSeeds, onConfirmPlant }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-[#fff8dc] border-4 border-[#4a3b32] shadow-[8px_8px_0px_0px_#000] p-6 w-full max-w-md m-4 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-[#4a3b32] hover:text-red-600 text-2xl font-bold leading-none">&times;</button>
        <div className="mb-4 border-b-4 border-[#4a3b32] pb-2">
            <h2 className="text-xl font-bold text-[#4a3b32]">何を植えますか？</h2>
        </div>
        <p className="text-[#6b4423] mb-4 text-sm font-bold">{facility.name} (必要数: {facility.capacity})</p>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {compatibleSeeds.map(seed => {
                const hasEnough = (seedsInStock[seed.id] || 0) >= facility.capacity;
                return (
                    <div key={seed.id} className={`p-2 border-2 border-[#d2b48c] flex justify-between items-center transition-colors ${hasEnough ? 'bg-white hover:bg-[#fffacd]' : 'bg-gray-200 opacity-60'}`}>
                        <div className="flex items-center gap-2">
                            <ItemIcon id={seed.id} className="w-8 h-8 border border-gray-300" />
                            <div>
                                <p className="font-bold text-[#2d1b2e]">{seed.name}</p>
                                <p className="text-xs text-[#6b4423]">所持: {seedsInStock[seed.id] || 0}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => onConfirmPlant(facility.id, seed.id)}
                            disabled={!hasEnough}
                            className="bg-[#60a5fa] hover:bg-[#3b82f6] disabled:bg-gray-400 text-white font-bold py-1 px-3 text-xs pixel-btn"
                        >
                            植える
                        </button>
                    </div>
                );
            })}
             {compatibleSeeds.length === 0 && (
                <p className="text-center text-gray-500 p-4">植えられるものがありません。</p>
            )}
        </div>
        <button onClick={onClose} className="mt-6 w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 pixel-btn">
            キャンセル
        </button>
      </div>
    </div>
  );
};

export default PlantingModal;