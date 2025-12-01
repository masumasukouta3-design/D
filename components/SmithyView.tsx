
import React from 'react';
import { GameState, GameAction } from '../types';
import { INITIAL_WEAPONS, INITIAL_MINERALS } from '../constants';

interface SmithyViewProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const SmithyView: React.FC<SmithyViewProps> = ({ gameState, dispatch }) => {
  const { minerals } = gameState;

  const handleCraft = (weaponId: string) => {
    dispatch({ type: 'CRAFT_WEAPON', payload: { weaponId } });
  };

  return (
    <div className="animate-fade-in pb-20">
      <h2 className="text-3xl font-bold text-[#b45309] mb-6 text-center bg-[#fef3c7] border-4 border-[#4a3b32] p-4 inline-block shadow-[6px_6px_0px_0px_#4a3b32]">🔨 鍛冶屋</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.values(INITIAL_WEAPONS).map(weapon => {
          const canCraft = Object.entries(weapon.recipe).every(
            ([mineralId, required]) => (minerals[mineralId] || 0) >= required
          );

          return (
            <div key={weapon.id} className="pixel-card p-6 flex flex-col justify-between bg-[#fffaf0]">
              <div>
                <h3 className="text-2xl font-bold text-[#b91c1c] mb-2">{weapon.name}</h3>
                <p className="text-gray-600 mb-4">売値: <span className="text-[#b45309] font-bold">{new Intl.NumberFormat('ja-JP').format(weapon.sellPrice)} 円</span></p>
                <div className="border-t-2 border-[#d2b48c] pt-4">
                  <h4 className="font-bold text-[#4a3b32] mb-2">必要な材料:</h4>
                  <ul className="space-y-1 text-sm">
                    {Object.entries(weapon.recipe).map(([mineralId, required]) => {
                      const owned = minerals[mineralId] || 0;
                      const hasEnough = owned >= required;
                      return (
                        <li key={mineralId} className={`flex justify-between p-2 border border-[#e7e5e4] ${hasEnough ? 'bg-[#dcfce7] text-[#15803d]' : 'bg-[#fee2e2] text-[#b91c1c]'}`}>
                          <span className="font-bold">{INITIAL_MINERALS[mineralId].name}</span>
                          <span className="font-mono font-bold">{owned} / {required}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <button
                onClick={() => handleCraft(weapon.id)}
                disabled={!canCraft}
                className="w-full mt-6 bg-[#9333ea] hover:bg-[#7e22ce] disabled:bg-gray-400 text-white font-bold py-3 px-4 pixel-btn"
              >
                作成する
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SmithyView;
