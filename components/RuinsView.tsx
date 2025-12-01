
import React, { useState } from 'react';
import { GameState, GameAction, RuinType } from '../types';
import { RUIN_DATA } from '../ruins';
import { FRAGMENTS_TO_RUIN_COST, RUIN_PROFIT_DURATION_MS, BASE_PROFIT_PER_RUIN } from '../constants';

interface RuinsViewProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  now: number;
  onClaimProfit: () => void;
  bonuses: { ruinTimeReduction: number };
}

const ExchangeModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onExchange: (fragmentId: string) => void;
}> = ({ isOpen, onClose, onExchange }) => {
  if (!isOpen) return null;

  const allFragments = Object.values(RUIN_DATA);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-[#fff8dc] border-4 border-[#4a3b32] shadow-[8px_8px_0px_0px_#000] p-6 w-full max-w-md m-4">
        <h2 className="text-xl font-bold text-[#4a3b32] mb-4 border-b-4 border-[#4a3b32] pb-2">破片を交換</h2>
        <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
          {allFragments.map(data => (
            <div key={data.fragmentId} className="p-2 border-2 border-[#d2b48c] flex justify-between items-center bg-white">
              <span className="text-sm font-bold text-[#2d1b2e]">{data.fragmentName}</span>
              <button onClick={() => onExchange(data.fragmentId)} className="bg-[#60a5fa] hover:bg-[#3b82f6] text-white font-bold py-1 px-3 text-xs pixel-btn">交換</button>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="mt-6 w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 pixel-btn">閉じる</button>
      </div>
    </div>
  );
};

const RuinsView: React.FC<RuinsViewProps> = ({ gameState, dispatch, now, onClaimProfit, bonuses }) => {
    const { fragments, ruins, ruinProfitState } = gameState;
    const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);

    const effectiveRuinTime = RUIN_PROFIT_DURATION_MS * (1 - bonuses.ruinTimeReduction);

    const totalRuins = Object.values(ruins).reduce((sum: number, count: number) => sum + count, 0);

    const { startTime } = ruinProfitState;
    // Fix: explicit check for null to avoid arithmetic on nullable types
    const isProfitReady = startTime !== null && (now - startTime >= effectiveRuinTime);
    const timeLeftMs = startTime !== null ? (startTime + effectiveRuinTime) - now : 0;
    
    const formatTimeLeft = (ms: number) => {
        if (ms <= 0) return '利益獲得可能';
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `残り ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleExchange = (toFragment: string) => {
        dispatch({ type: 'EXCHANGE_FRAGMENT', payload: { toFragment } });
    };

    const handleAssemble = (ruinType: RuinType) => {
        dispatch({ type: 'ASSEMBLE_RUIN', payload: { ruinType }});
    }
    
    const handleStartProfitCollection = () => {
        dispatch({ type: 'START_PROFIT_COLLECTION' });
    }

    return (
    <div className="animate-fade-in space-y-8 pb-20">
      {/* Profit Collection Section */}
      <div className="bg-[#e0e7ff] border-4 border-[#1e3a8a] p-6 shadow-[8px_8px_0px_0px_#1e3a8a]">
        <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4 flex items-center gap-2">🏛️ 遺跡からの利益</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white border-2 border-[#1e3a8a] p-4">
            <div className="text-center md:text-left">
                <p className="text-[#4b5563]">遺跡合計: <span className="font-bold text-[#1e3a8a] text-lg">{totalRuins}</span>個</p>
                <p className="text-[#4b5563]">獲得利益: <span className="font-bold text-[#b45309] text-lg">{new Intl.NumberFormat('ja-JP').format(totalRuins * BASE_PROFIT_PER_RUIN)} 円</span></p>
            </div>
            {ruinProfitState.startTime === null ? (
                 <button
                    onClick={handleStartProfitCollection}
                    disabled={totalRuins === 0}
                    className="w-full md:w-auto bg-[#16a34a] hover:bg-[#15803d] disabled:bg-gray-400 text-white font-bold py-3 px-6 pixel-btn"
                >
                    利益回収を開始
                </button>
            ) : isProfitReady ? (
                <button
                    onClick={onClaimProfit}
                    className="w-full md:w-auto bg-[#fbbf24] hover:bg-[#f59e0b] text-[#2d1b2e] font-bold py-3 px-6 pixel-btn animate-bounce-pixel"
                >
                    利益獲得 💰
                </button>
            ) : (
                <div className="text-center w-full md:w-48">
                    <p className="text-lg font-bold text-[#4b5563] font-mono">{formatTimeLeft(timeLeftMs)}</p>
                    <div className="w-full bg-gray-300 h-4 mt-2 border border-[#4a3b32]">
                        <div className="bg-[#16a34a] h-full" style={{ width: `${100 - (timeLeftMs / effectiveRuinTime) * 100}%` }}></div>
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* Fragment Exchange Section */}
      <div className="pixel-card p-6">
        <h2 className="text-xl font-bold text-[#4a3b32] mb-4">🧩 破片交換</h2>
        <div className="flex flex-col md:flex-row items-center justify-between bg-white border-2 border-[#d2b48c] p-4">
            <p className="text-lg font-bold text-[#4a3b32]">なにかの破片: <span className="text-[#b45309] text-xl">{fragments.something}</span> 個</p>
            <button onClick={() => setIsExchangeModalOpen(true)} disabled={fragments.something < 1} className="bg-[#60a5fa] hover:bg-[#3b82f6] disabled:bg-gray-400 text-white font-bold py-2 px-4 pixel-btn mt-4 md:mt-0">
                交換する
            </button>
        </div>
      </div>
      
      {/* Ruin Assembly Section */}
      <div>
        <h2 className="text-2xl font-bold text-[#4a3b32] mb-4 bg-[#ccfbf1] border-2 border-[#4a3b32] p-2 inline-block shadow-[4px_4px_0px_0px_#4a3b32]">✨ 遺跡復元</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(Object.keys(RUIN_DATA) as RuinType[]).map(ruinType => {
            const data = RUIN_DATA[ruinType as RuinType];
            const fragmentCount = fragments[data.fragmentId as keyof typeof fragments] || 0;
            const canAssemble = fragmentCount >= FRAGMENTS_TO_RUIN_COST;

            return (
              <div key={ruinType} className="pixel-card p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0f766e]">{data.name}</h3>
                  <p className="mt-2 text-sm text-[#4b5563]">所持数: <span className="font-bold">{ruins[ruinType]}</span></p>
                  <div className="mt-2">
                      <p className="text-xs text-[#4b5563] mb-1">{data.fragmentName}</p>
                      <div className="flex justify-between items-center text-sm font-bold">
                          <span>{fragmentCount}</span>
                          <span>/ {FRAGMENTS_TO_RUIN_COST}</span>
                      </div>
                       <div className="w-full bg-gray-300 h-3 mt-1 border border-[#4a3b32]">
                            <div className="bg-[#0d9488] h-full" style={{ width: `${Math.min(100, (fragmentCount / FRAGMENTS_TO_RUIN_COST) * 100)}%` }}></div>
                        </div>
                  </div>
                </div>
                <button
                  onClick={() => handleAssemble(ruinType)}
                  disabled={!canAssemble}
                  className="w-full mt-4 bg-[#9333ea] hover:bg-[#7e22ce] disabled:bg-gray-400 text-white font-bold py-2 px-4 pixel-btn"
                >
                  復元する
                </button>
              </div>
            )
          })}
        </div>
      </div>
      <ExchangeModal
        isOpen={isExchangeModalOpen}
        onClose={() => setIsExchangeModalOpen(false)}
        onExchange={handleExchange}
      />
    </div>
  );
};

export default RuinsView;
