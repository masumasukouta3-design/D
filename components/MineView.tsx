
import React, { useState } from 'react';
import { GameState, GameAction } from '../types';
import { MINING_DURATION_MS, MINERALS_PER_RUN, MINERAL_TYPES, INITIAL_MINERALS } from '../constants';

interface MineViewProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  now: number;
  bonuses: { mineTimeReduction: number };
}

const CollectionModal: React.FC<{
  collected: Record<string, number>;
  onClose: () => void;
}> = ({ collected, onClose }) => {
  // Fix: Access array indices directly to ensure TypeScript correctly infers values as numbers
  const sortedCollection = Object.entries(collected).sort((a, b) => (b[1] as number) - (a[1] as number));

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#fff8dc] border-4 border-[#4a3b32] shadow-[8px_8px_0px_0px_#000] p-6 w-full max-w-md m-4 animate-pop-in">
        <h2 className="text-2xl font-bold text-[#b45309] mb-4 text-center border-b-4 border-[#4a3b32] pb-2">採掘成功！</h2>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
          {sortedCollection.map(([mineralId, quantity], index) => (
            <div
              key={mineralId}
              className="p-2 border-2 border-[#d2b48c] flex justify-between items-center bg-white"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <p className="font-bold text-[#2d1b2e]">{INITIAL_MINERALS[mineralId].name}</p>
              <p className="text-lg font-bold text-[#b45309]">x {quantity}</p>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="mt-6 w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-2 px-4 pixel-btn">
          素晴らしい！
        </button>
      </div>
    </div>
  );
};

const MineView: React.FC<MineViewProps> = ({ gameState, dispatch, now, bonuses }) => {
  const { mineState } = gameState;
  const [showCollection, setShowCollection] = useState<Record<string, number> | null>(null);

  const effectiveMiningTime = MINING_DURATION_MS * (1 - bonuses.mineTimeReduction);

  const { startTime } = mineState;
  const isMiningReady = typeof startTime === 'number' && now - startTime >= effectiveMiningTime;
  const timeLeftMs = typeof startTime === 'number' ? (startTime + effectiveMiningTime) - now : 0;

  const formatTimeLeft = (ms: number) => {
    if (ms <= 0) return '回収可能';
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `残り ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartMining = () => {
    dispatch({ type: 'START_MINING' });
  };

  const handleCollect = () => {
    const collected: Record<string, number> = {};
    for (let i = 0; i < MINERALS_PER_RUN; i++) {
        const mineralId = MINERAL_TYPES[Math.floor(Math.random() * MINERAL_TYPES.length)];
        collected[mineralId] = (collected[mineralId] || 0) + 1;
    }
    dispatch({ type: 'COLLECT_MINERALS', payload: { collected } });
    setShowCollection(collected);
  };

  return (
    <div className="animate-fade-in flex justify-center items-center h-full pb-20">
      <div className="pixel-card p-8 text-center max-w-lg w-full bg-[#fef3c7]">
        <h2 className="text-3xl font-bold text-[#b45309] mb-6 flex justify-center items-center gap-2">
            <span className="text-4xl">⛏️</span> 鉱山
        </h2>
        {mineState.startTime === null ? (
          <>
            <p className="text-[#6b4423] mb-6 text-lg">鉱山に入って貴重な鉱物を探しましょう。<br/>所要時間: {Math.floor(effectiveMiningTime / 3600000)}時間</p>
            <button
              onClick={handleStartMining}
              className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-3 px-6 text-xl pixel-btn"
            >
              鉱山に入る
            </button>
          </>
        ) : isMiningReady ? (
          <>
            <p className="text-[#6b4423] mb-6 text-xl font-bold">採掘が完了しました！</p>
            <button
              onClick={handleCollect}
              className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-[#2d1b2e] font-bold py-3 px-6 text-xl pixel-btn animate-bounce-pixel"
            >
              鉱物を回収する
            </button>
          </>
        ) : (
          <div>
            <p className="text-[#6b4423] mb-4 font-bold">鉱物を採掘中です...</p>
            <p className="text-2xl font-bold text-[#b45309] mb-4 font-mono">{formatTimeLeft(timeLeftMs)}</p>
            <div className="w-full bg-gray-300 h-6 border-2 border-[#4a3b32]">
              <div
                className="bg-[#16a34a] h-full transition-all duration-1000 ease-linear"
                style={{ width: `${100 - (timeLeftMs / effectiveMiningTime) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
      {showCollection && (
        <CollectionModal collected={showCollection} onClose={() => setShowCollection(null)} />
      )}
    </div>
  );
};

export default MineView;
