
import React, { useState, useMemo } from 'react';
import { GameState, FacilityCategory } from '../types';
import { 
    GROW_TIME_MS, 
    MINING_DURATION_MS, 
    RUIN_PROFIT_DURATION_MS, 
    TENANT_PROFIT_DURATION_MS,
    RECRUITMENT_BASE_DURATION_MS,
    RECRUITMENT_MIN_DURATION_MS,
    RECRUITER_ITEM_TIME_REDUCTION_BONUS_MS,
    NBA_CONFERENCE_COOLDOWN_MS
} from '../constants';
import { MiniMapIcon } from './icons';

interface MiniMapViewProps {
  gameState: GameState;
  now: number;
  bonuses: { 
      cropTimeReduction: number;
      mineTimeReduction: number;
      ruinTimeReduction: number;
      tenantTimeReduction: number;
  };
}

const formatTimeLeft = (ms: number) => {
    if (ms <= 0) return 'READY';
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

const categoryNames: Record<FacilityCategory, string> = {
    [FacilityCategory.Field]: '畑',
    [FacilityCategory.Sea]: '海',
    [FacilityCategory.Ranch]: '牧場',
};

const MiniMapView: React.FC<MiniMapViewProps> = ({ gameState, now, bonuses }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const summaryData = useMemo(() => {
    // Facility Counts
    const effectiveGrowTime = GROW_TIME_MS * (1 - bonuses.cropTimeReduction);
    const facilityCounts = {
        [FacilityCategory.Field]: { empty: 0, growing: 0, ready: 0 },
        [FacilityCategory.Sea]: { empty: 0, growing: 0, ready: 0 },
        [FacilityCategory.Ranch]: { empty: 0, growing: 0, ready: 0 },
    };

    gameState.facilities.forEach(facility => {
        const category = facility.category;
        if (!facility.plantedCrop) {
            facilityCounts[category].empty++;
        } else {
            const isReady = now - facility.plantedCrop.plantedAt >= effectiveGrowTime;
            if (isReady) {
                facilityCounts[category].ready++;
            } else {
                facilityCounts[category].growing++;
            }
        }
    });

    // Timers
    const effectiveMiningTime = MINING_DURATION_MS * (1 - bonuses.mineTimeReduction);
    const mineStartTime = gameState.mineState.startTime;
    const mineTimer = mineStartTime !== null ? (mineStartTime + effectiveMiningTime) - now : null;

    const effectiveRuinTime = RUIN_PROFIT_DURATION_MS * (1 - bonuses.ruinTimeReduction);
    const ruinStartTime = gameState.ruinProfitState.startTime;
    const ruinTimer = ruinStartTime !== null ? (ruinStartTime + effectiveRuinTime) - now : null;
    
    const timeReductionBonus = gameState.recruiterState.timeReductionItems * RECRUITER_ITEM_TIME_REDUCTION_BONUS_MS;
    const effectiveRecruitmentDuration = Math.max(RECRUITMENT_MIN_DURATION_MS, RECRUITMENT_BASE_DURATION_MS - timeReductionBonus);
    const recruiterStartTime = gameState.recruiterState.startTime;
    const recruiterTimer = recruiterStartTime !== null ? (recruiterStartTime + effectiveRecruitmentDuration) - now : null;

    const lastPlayed = gameState.nbaState.conference.lastPlayed;
    const nbaCooldownLeft = lastPlayed !== null ? ((lastPlayed ?? 0) + NBA_CONFERENCE_COOLDOWN_MS) - now : 0;
    const nbaReady = nbaCooldownLeft <= 0;

    // Tenants
    let tenantsReady = 0;
    const effectiveTenantProfitTime = TENANT_PROFIT_DURATION_MS * (1 - bonuses.tenantTimeReduction);
    gameState.tenants.forEach(t => {
        const profitState = gameState.tenantProfitState[t.id];
        if (profitState?.startTime !== null && profitState?.startTime !== undefined) {
            if (now - profitState.startTime >= effectiveTenantProfitTime) {
                tenantsReady++;
            }
        }
    });

    return {
        facilityCounts,
        mineTimer,
        ruinTimer,
        recruiterTimer,
        nbaCooldownLeft: nbaReady ? 0 : nbaCooldownLeft,
        tenantsReady
    };
  }, [gameState, now, bonuses]);

  if (!isExpanded) {
      return (
          <button 
            onClick={() => setIsExpanded(true)}
            className="fixed bottom-4 right-4 bg-[#fff8dc] border-4 border-[#4a3b32] p-2 shadow-lg z-40 hover:scale-105 transition-transform"
          >
            <MiniMapIcon />
          </button>
      )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-[#fff8dc] border-4 border-[#4a3b32] p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] z-40 w-64 font-mono text-xs animate-fade-in">
        <div className="flex justify-between items-center mb-2 border-b-2 border-[#4a3b32] pb-1">
            <h3 className="font-bold text-[#4a3b32] flex items-center gap-2"><MiniMapIcon /> 状況サマリ</h3>
            <button onClick={() => setIsExpanded(false)} className="text-lg font-bold text-[#4a3b32] hover:text-red-500 leading-none">&times;</button>
        </div>
        
        <div className="space-y-2">
            {/* Crops */}
            <div>
                <p className="font-bold text-[#15803d] mb-1 border-b border-[#d2b48c]">🌾 施設状況</p>
                {(Object.keys(summaryData.facilityCounts) as FacilityCategory[]).map(cat => {
                    const data = summaryData.facilityCounts[cat];
                    return (
                        <div key={cat} className="flex justify-between items-center pl-2">
                            <span>{categoryNames[cat]}</span>
                            <span className="space-x-1">
                                <span className="text-green-600 font-bold" title="収穫可能">{data.ready}</span>/
                                <span className="text-yellow-600" title="育成中">{data.growing}</span>/
                                <span className="text-gray-400" title="空き">{data.empty}</span>
                            </span>
                        </div>
                    )
                })}
            </div>

            {/* Timers */}
            <div>
                <p className="font-bold text-[#b45309] mb-1 border-b border-[#d2b48c]">⏱️ タイマー</p>
                
                <div className="flex justify-between items-center pl-2">
                    <span>⛏️ 鉱山</span>
                    <span className={summaryData.mineTimer !== null && summaryData.mineTimer <= 0 ? 'text-green-600 font-bold animate-pulse' : ''}>
                        {summaryData.mineTimer === null ? '待機中' : formatTimeLeft(summaryData.mineTimer)}
                    </span>
                </div>

                 <div className="flex justify-between items-center pl-2">
                    <span>🏛️ 遺跡</span>
                    <span className={summaryData.ruinTimer !== null && summaryData.ruinTimer <= 0 ? 'text-green-600 font-bold animate-pulse' : ''}>
                        {summaryData.ruinTimer === null ? '待機中' : formatTimeLeft(summaryData.ruinTimer)}
                    </span>
                </div>

                 <div className="flex justify-between items-center pl-2">
                    <span>🤝 斡旋</span>
                    <span className={summaryData.recruiterTimer !== null && summaryData.recruiterTimer <= 0 ? 'text-green-600 font-bold animate-pulse' : ''}>
                         {summaryData.recruiterTimer === null ? '待機中' : formatTimeLeft(summaryData.recruiterTimer)}
                    </span>
                </div>
            </div>

             {/* Status */}
             <div>
                <p className="font-bold text-[#1e3a8a] mb-1 border-b border-[#d2b48c]">🔔 通知</p>
                <div className="flex justify-between items-center pl-2">
                    <span>🏘️ テナント回収</span>
                    <span className={summaryData.tenantsReady > 0 ? 'text-green-600 font-bold animate-pulse' : 'text-gray-400'}>
                        {summaryData.tenantsReady > 0 ? `${summaryData.tenantsReady}件` : 'なし'}
                    </span>
                </div>
                 <div className="flex justify-between items-center pl-2">
                    <span>🏀 NBA参加</span>
                    <span className={summaryData.nbaCooldownLeft <= 0 ? 'text-green-600 font-bold animate-pulse' : 'text-gray-400'}>
                        {summaryData.nbaCooldownLeft <= 0 ? '可能' : formatTimeLeft(summaryData.nbaCooldownLeft)}
                    </span>
                </div>
             </div>
        </div>
    </div>
  );
};

export default MiniMapView;
